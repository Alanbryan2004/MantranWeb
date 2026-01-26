// src/pages/Relatorios/base/RelatorioBase.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

/* =========================================================
   CONFIG A4 (aprox @96dpi)
========================================================= */
const PAGE = {
    portrait: { width: 794, height: 1123 },
    landscape: { width: 1123, height: 794 },
};

const PAGE_PADDING = 40;
const HEADER_HEIGHT = 110;
const TABLE_HEADER_HEIGHT = 32;
const FOOTER_HEIGHT = 40;
const ROW_HEIGHT = 28;

/* =========================================================
   HELPERS
========================================================= */
function safeGet(row, accessor) {
    if (typeof accessor === "function") return accessor(row);
    return row?.[accessor] ?? "";
}

function toText(val) {
    if (val === null || val === undefined) return "";
    return String(val);
}

function clamp(n, a, b) {
    return Math.min(Math.max(n, a), b);
}

function guessFilename(titulo) {
    const base = (titulo || "Relatorio")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w]+/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g, "");
    return base || "Relatorio";
}

function guessImageFormat(logo) {
    const s = (logo || "").toLowerCase();
    if (s.includes("image/png")) return "PNG";
    if (s.includes("image/webp")) return "WEBP";
    if (s.includes("image/jpeg") || s.includes("image/jpg")) return "JPEG";
    return "PNG";
}

/* =========================================================
   RELATORIO BASE (MOTOR)
========================================================= */
export default function RelatorioBase({
    titulo = "Relatório",
    periodo = "", // "dd/mm/aaaa a dd/mm/aaaa"
    logo = "", // base64/url
    orientation = "auto", // auto | portrait | landscape

    columns = [], // [{id,label,accessor,width,align}]
    rows = [],

    detail, // { enabled, key, columns:[], toggleColumnId?: "ctrc" }
    totals = [], // [{id,label,type:"sum"|"count", accessor, format?:"money"}]

    onExportPDF, // opcional (se passar, usa o seu; senão, usa o padrão abaixo)
    onExportExcel, // opcional (se passar, usa o seu; senão, usa o padrão abaixo)

    topOffsetPx = 56, // ajuste conforme seu header fixo
}) {
    const pagesRef = useRef([]);
    const scrollRef = useRef(null);

    const [pageCurrent, setPageCurrent] = useState(1);
    const [jumpPage, setJumpPage] = useState("1");
    const [expanded, setExpanded] = useState(() => new Set());

    // ✅ opções de impressão/exportação
    const [printMode, setPrintMode] = useState(false);
    const [includeDetail, setIncludeDetail] = useState(false); // tela: expand por clique
    const [printIncludeDetail, setPrintIncludeDetail] = useState(true); // impressão/PDF/Excel

    /* =====================================================
       1) ORIENTAÇÃO (AUTO)
    ====================================================== */
    const resolvedOrientation = useMemo(() => {
        if (orientation !== "auto") return orientation;

        const totalWidth = columns.reduce((s, c) => s + (c.width || 110), 0);
        return totalWidth > 750 ? "landscape" : "portrait";
    }, [orientation, columns]);

    const pageSize = PAGE[resolvedOrientation];

    /* =====================================================
       2) PAGINAÇÃO DE LINHAS (mestre)
    ====================================================== */
    const rowsPerPage = useMemo(() => {
        const usable =
            pageSize.height -
            PAGE_PADDING * 2 -
            HEADER_HEIGHT -
            TABLE_HEADER_HEIGHT -
            FOOTER_HEIGHT;

        return Math.max(8, Math.floor(usable / ROW_HEIGHT));
    }, [pageSize.height]);

    const pages = useMemo(() => {
        const result = [];
        for (let i = 0; i < rows.length; i += rowsPerPage) {
            result.push(rows.slice(i, i + rowsPerPage));
        }
        return result.length ? result : [[]];
    }, [rows, rowsPerPage]);

    const totalPages = pages.length;

    /* =====================================================
       3) EXPAND / COLLAPSE (por linha) - apenas na tela
    ====================================================== */
    const toggleRow = (rowId) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(rowId)) next.delete(rowId);
            else next.add(rowId);
            return next;
        });
    };

    const isExpanded = (rowId) => expanded.has(rowId);

    /* =====================================================
       4) NAVEGAÇÃO DE PÁGINA (scroll)
    ====================================================== */
    const goToPage = (p) => {
        const target = clamp(p, 1, totalPages);
        const ref = pagesRef.current[target - 1];
        if (ref && scrollRef.current) {
            ref.scrollIntoView({ behavior: "smooth", block: "start" });
            setPageCurrent(target);
            setJumpPage(String(target));
        }
    };

    /* =====================================================
       5) SCROLL -> detectar página atual
    ====================================================== */
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onScroll = () => {
            let best = 1;
            let bestDist = Infinity;

            pagesRef.current.forEach((ref, idx) => {
                if (!ref) return;
                const rect = ref.getBoundingClientRect();
                const dist = Math.abs(rect.top - 110);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = idx + 1;
                }
            });

            setPageCurrent(best);
            setJumpPage(String(best));
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    /* =====================================================
       6) IMPRIMIR
       - printMode ativa o CSS e "expansão forçada" conforme opção
    ====================================================== */
    useEffect(() => {
        const after = () => setPrintMode(false);
        window.addEventListener("afterprint", after);
        return () => window.removeEventListener("afterprint", after);
    }, []);

    const handlePrint = () => {
        setPrintMode(true);
        setTimeout(() => window.print(), 80);
    };

    /* =====================================================
       7) TOTAIS (só no final)
    ====================================================== */
    const totalsValues = useMemo(() => {
        const out = {};
        totals.forEach((t) => {
            if (t.type === "count") out[t.id] = rows.length;
            if (t.type === "sum") {
                out[t.id] = rows.reduce((s, r) => s + (Number(r[t.accessor]) || 0), 0);
            }
        });
        return out;
    }, [totals, rows]);

    /* =====================================================
       8) EXPORT PDF (padrão)
       - inclui/omite detalhes conforme printIncludeDetail
    ====================================================== */
    const exportPDFDefault = async () => {
        const file = `${guessFilename(titulo)}.pdf`;
        const pdf = new jsPDF({
            orientation: resolvedOrientation === "landscape" ? "landscape" : "portrait",
            unit: "mm",
            format: "a4",
        });

        const marginX = 10;
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();

        const addHeader = (page, total) => {
            const topY = 10;

            // LOGO
            if (logo && logo.startsWith("data:")) {
                try {
                    const fmt = guessImageFormat(logo);
                    pdf.addImage(logo, fmt, marginX, topY, 42, 14);
                } catch {
                    // ignora
                }
            }

            // TÍTULO
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(14);
            pdf.text(titulo || "Relatório", pageW / 2, topY + 6, { align: "center" });

            // PERÍODO
            if (periodo) {
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(10);
                pdf.text(`Período ${periodo}`, pageW / 2, topY + 12, { align: "center" });
            }

            // PAGINAÇÃO
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(9);
            pdf.text(`Página ${page} de ${total}`, pageW - marginX, topY + 6, { align: "right" });
        };

        const masterHead = [columns.map((c) => c.label)];
        const makeMasterBody = (pageRows) =>
            pageRows.map((r) => columns.map((c) => toText(safeGet(r, c.accessor))));

        const detailEnabled = !!(detail?.enabled && detail?.key && detail?.columns?.length);
        const includeDet = !!(detailEnabled && printIncludeDetail);

        // paginação mestre no PDF
        const pdfPages = [];
        for (let i = 0; i < rows.length; i += rowsPerPage) {
            pdfPages.push(rows.slice(i, i + rowsPerPage));
        }
        const pdfTotalPages = pdfPages.length || 1;

        pdfPages.forEach((pageRows, idx) => {
            if (idx > 0) pdf.addPage();

            addHeader(idx + 1, pdfTotalPages);

            // tabela mestre
            autoTable(pdf, {
                head: masterHead,
                body: makeMasterBody(pageRows),
                startY: 28,
                theme: "grid",
                styles: {
                    fontSize: 8.5,
                    cellPadding: 2,
                    valign: "middle",
                    lineWidth: 0.1,
                },
                headStyles: {
                    fillColor: [240, 240, 240],
                    textColor: 20,
                    fontStyle: "bold",
                },
                margin: { left: marginX, right: marginX },
                columnStyles: columns.reduce((acc, c, i) => {
                    if (c.align === "right") acc[i] = { halign: "right" };
                    return acc;
                }, {}),
            });

            let y = pdf.lastAutoTable?.finalY ?? 28;

            // detalhe por linha (NF)
            if (includeDet) {
                const dCols = detail.columns;
                const dHead = [["Relação Notas Fiscais do CTe", ...new Array(dCols.length - 1).fill("")]];
                const dHead2 = [dCols.map((c) => c.label)];

                for (const r of pageRows) {
                    const detRows = r?.[detail.key] || [];
                    if (!detRows.length) continue;

                    if (y > pageH - 40) {
                        pdf.addPage();
                        addHeader(idx + 1, pdfTotalPages);
                        y = 28;
                    }

                    autoTable(pdf, {
                        head: [dHead[0], dHead2[0]],
                        body: detRows.map((dr) => dCols.map((c) => toText(safeGet(dr, c.accessor)))),
                        startY: y + 2,
                        theme: "grid",
                        styles: {
                            fontSize: 8,
                            cellPadding: 2,
                            valign: "middle",
                            lineWidth: 0.1,
                        },
                        headStyles: {
                            fillColor: [230, 230, 230],
                            textColor: 20,
                            fontStyle: "bold",
                        },
                        margin: { left: marginX, right: marginX },
                        didParseCell: (data) => {
                            if (data.section === "head" && data.row.index === 0) {
                                data.cell.styles.fillColor = [255, 255, 255];
                                data.cell.styles.textColor = 20;
                                data.cell.styles.fontStyle = "bold";
                                data.cell.styles.halign = "left";
                            }
                        },
                        columnStyles: dCols.reduce((acc, c, i) => {
                            if (c.align === "right") acc[i] = { halign: "right" };
                            return acc;
                        }, {}),
                    });

                    y = pdf.lastAutoTable?.finalY ?? y + 8;

                    // totalizador das NFs
                    const totNFs = detRows.length;
                    const totPeso = detRows.reduce((s, x) => s + (Number(x.peso) || 0), 0);
                    const totValor = detRows.reduce((s, x) => s + (Number(x.valorNF) || 0), 0);

                    pdf.setFontSize(8.5);
                    pdf.setFont("helvetica", "bold");

                    const lineY = y + 5;
                    const colX = marginX;

                    pdf.text("Totais das NFs:", colX + 90, lineY);
                    pdf.text(String(totNFs), colX + 120, lineY, { align: "right" });
                    pdf.text(
                        totPeso.toLocaleString("pt-BR", { minimumFractionDigits: 3 }),
                        colX + 150,
                        lineY,
                        { align: "right" }
                    );
                    pdf.text(
                        totValor.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
                        colX + 190,
                        lineY,
                        { align: "right" }
                    );

                    pdf.setFont("helvetica", "normal");
                    y = lineY + 6;
                }
            }

            // Totais gerais só na última página do PDF
            if (idx === pdfTotalPages - 1 && totals?.length) {
                const startY = Math.min((pdf.lastAutoTable?.finalY ?? 28) + 10, pageH - 25);
                pdf.setFontSize(9.5);
                pdf.setFont("helvetica", "bold");

                let x = marginX;
                let yTot = startY;

                totals.forEach((t) => {
                    const val =
                        t.type === "count"
                            ? rows.length
                            : rows.reduce((s, r) => s + (Number(r[t.accessor]) || 0), 0);

                    const formatted =
                        t.format === "money"
                            ? `R$ ${Number(val || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                            : Number(val || 0).toLocaleString("pt-BR");

                    pdf.text(`${t.label}: ${formatted}`, x, yTot);
                    x += 60;
                    if (x > pageW - 60) {
                        x = marginX;
                        yTot += 6;
                    }
                });

                pdf.setFont("helvetica", "normal");
            }
        });

        pdf.save(file);
    };

    /* =====================================================
       9) EXPORT EXCEL (padrão)
       - inclui/omite aba Notas conforme printIncludeDetail
    ====================================================== */
    const exportExcelDefault = () => {
        const file = `${guessFilename(titulo)}.xlsx`;

        // Mestre
        const wsMasterData = [
            columns.map((c) => c.label),
            ...rows.map((r) => columns.map((c) => safeGet(r, c.accessor))),
        ];
        const wsMaster = XLSX.utils.aoa_to_sheet(wsMasterData);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wsMaster, "CTRC");

        // Detalhe (Notas)
        const detailEnabled = !!(detail?.enabled && detail?.key && detail?.columns?.length);
        const includeDet = !!(detailEnabled && printIncludeDetail);

        if (includeDet) {
            const dCols = detail.columns;

            const masterKeyCol = detail.toggleColumnId || columns?.[0]?.id;
            const masterKeyAccessor =
                columns.find((c) => c.id === masterKeyCol)?.accessor || columns?.[0]?.accessor;

            const detHeader = ["CTRC", ...dCols.map((c) => c.label)];
            const detRows = [];

            rows.forEach((r) => {
                const ctrcVal = safeGet(r, masterKeyAccessor);
                const det = r?.[detail.key] || [];
                det.forEach((dr) => {
                    detRows.push([ctrcVal, ...dCols.map((c) => safeGet(dr, c.accessor))]);
                });

                if (det.length) {
                    const totNFs = det.length;
                    const totPeso = det.reduce((s, x) => s + (Number(x.peso) || 0), 0);
                    const totValor = det.reduce((s, x) => s + (Number(x.valorNF) || 0), 0);
                    detRows.push(["", "Totais das NFs:", totNFs, "", "", totPeso, totValor]);
                    detRows.push([]);
                }
            });

            const wsDet = XLSX.utils.aoa_to_sheet([detHeader, ...detRows]);
            XLSX.utils.book_append_sheet(wb, wsDet, "Notas");
        }

        XLSX.writeFile(wb, file);
    };

    const handleExportPDF = () => {
        if (typeof onExportPDF === "function") return onExportPDF();
        return exportPDFDefault();
    };

    const handleExportExcel = () => {
        if (typeof onExportExcel === "function") return onExportExcel();
        return exportExcelDefault();
    };

    /* =====================================================
       10) RENDER
    ====================================================== */
    return (
        <div id="relatorio-print-root" className="w-full">
            {/* ================= TOOLBAR FIXA ================= */}
            <div className="sticky top-[44px] z-40 bg-white border-b border-gray-300">
                <div className="px-4 py-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[12px] text-gray-600">
                        <b className="text-gray-700">{titulo}</b>
                        {periodo ? <span className="text-gray-500">(Período {periodo})</span> : null}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* ✅ Opção de impressão/exportação */}
                        {detail?.enabled ? (
                            <label className="flex items-center gap-2 text-[12px] text-gray-600 select-none">
                                <input
                                    type="checkbox"
                                    checked={printIncludeDetail}
                                    onChange={(e) => setPrintIncludeDetail(e.target.checked)}
                                />
                                Imprimir/Exportar com Notas
                            </label>
                        ) : null}

                        {/* Página */}
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                            <span>Página</span>
                            <input
                                className="border border-gray-300 rounded px-2 h-[26px] w-[64px] text-center text-[13px]"
                                value={jumpPage}
                                onChange={(e) => setJumpPage(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") goToPage(Number(jumpPage || "1"));
                                }}
                            />
                            <span>de {totalPages}</span>

                            <button
                                className="border border-gray-300 rounded px-2 h-[26px] text-[12px]"
                                onClick={() => goToPage(pageCurrent - 1)}
                            >
                                ◀
                            </button>
                            <button
                                className="border border-gray-300 rounded px-2 h-[26px] text-[12px]"
                                onClick={() => goToPage(pageCurrent + 1)}
                            >
                                ▶
                            </button>
                        </div>

                        {/* Ações */}
                        <button
                            onClick={handlePrint}
                            className="px-3 h-[28px] bg-red-700 text-white rounded text-[12px]"
                            title={printIncludeDetail ? "Imprime com detalhes de NF" : "Imprime sem detalhes de NF"}
                        >
                            Imprimir
                        </button>

                        <button
                            onClick={handleExportPDF}
                            className="px-3 h-[28px] border border-gray-300 rounded text-[12px]"
                            title={printIncludeDetail ? "Exportar PDF (com Notas)" : "Exportar PDF (sem Notas)"}
                        >
                            PDF
                        </button>

                        <button
                            onClick={handleExportExcel}
                            className="px-3 h-[28px] border border-gray-300 rounded text-[12px]"
                            title={printIncludeDetail ? "Exportar Excel (com Notas)" : "Exportar Excel (sem Notas)"}
                        >
                            Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= VIEWPORT COM SCROLL ================= */}
            <div
                ref={scrollRef}
                className="bg-gray-200 w-full overflow-y-auto"
                style={{
                    height: `calc(100vh - ${topOffsetPx}px)`,
                }}
            >
                <div className="flex flex-col items-center gap-6 py-6">
                    {pages.map((pageRows, pageIndex) => (
                        <div
                            key={pageIndex}
                            ref={(el) => (pagesRef.current[pageIndex] = el)}
                            className="bg-white shadow"
                            style={{
                                width: pageSize.width,
                                minHeight: pageSize.height,
                                padding: PAGE_PADDING,
                            }}
                        >
                            {/* ============ HEADER REPETE EM TODAS ============ */}
                            <RelatorioHeader
                                logo={logo}
                                titulo={titulo}
                                periodo={periodo}
                                page={pageIndex + 1}
                                totalPages={totalPages}
                            />

                            {/* ============ TABELA ============ */}
                            <RelatorioTable
                                columns={columns}
                                rows={pageRows}
                                detail={detail}
                                isExpanded={isExpanded}
                                toggleRow={toggleRow}
                                // ✅ printMode decide se expande tudo; mas respeita printIncludeDetail
                                printMode={printMode}
                                printIncludeDetail={printIncludeDetail}
                            />

                            {/* ============ TOTAIS (SÓ NA ÚLTIMA) ============ */}
                            {pageIndex === totalPages - 1 && totals.length > 0 && (
                                <div className="mt-4 border-t pt-2 text-[12px] flex flex-wrap gap-x-6 gap-y-1">
                                    {totals.map((t) => {
                                        const val = totalsValues[t.id];
                                        const formatted =
                                            t.format === "money"
                                                ? `R$ ${Number(val || 0).toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                })}`
                                                : Number(val || 0).toLocaleString("pt-BR");
                                        return (
                                            <div key={t.id}>
                                                <b>{t.label}:</b> {formatted}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* ============ FOOTER PÁGINA ============ */}
                            <div className="mt-2 text-[10px] text-gray-500 flex justify-between">
                                <span>localhost</span>
                                <span>
                                    {new Date().toLocaleString("pt-BR")} | Página {pageIndex + 1}/{totalPages}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= PRINT CSS ================= */}
            <style>{`
        @media print {
          /* esconde tudo do app */
          body * { visibility: hidden !important; }

          /* deixa visível só o relatório */
          #relatorio-print-root, #relatorio-print-root * {
            visibility: visible !important;
          }

          /* posiciona o relatório no topo esquerdo */
          #relatorio-print-root {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
          }

          /* remove fundos/sombras */
          .bg-gray-200 { background: white !important; }
          .shadow { box-shadow: none !important; }

          /* some a toolbar */
          .sticky { display: none !important; }

          /* libera overflow/altura */
          .overflow-y-auto { overflow: visible !important; height: auto !important; }

          /* quebra páginas nas folhas */
          .bg-white.shadow { break-after: page; page-break-after: always; }
        }
      `}</style>
        </div>
    );
}

/* =========================================================
   HEADER
========================================================= */
function RelatorioHeader({ logo, titulo, periodo, page, totalPages }) {
    return (
        <div className="flex items-start mb-4">
            {/* LOGO */}
            <div className="w-[220px] h-[60px] flex items-center">
                {logo ? (
                    <img src={logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                ) : (
                    <div className="text-gray-400 text-xs">SEM LOGO</div>
                )}
            </div>

            {/* TÍTULO */}
            <div className="flex-1 text-center">
                <h1 className="text-red-700 font-semibold text-[16px]">{titulo}</h1>
                {periodo ? <div className="text-[12px] text-gray-600">Período {periodo}</div> : null}
            </div>

            {/* PAGINAÇÃO */}
            <div className="text-xs text-gray-500 text-right">
                Página {page} de {totalPages}
            </div>
        </div>
    );
}

/* =========================================================
   TABELA (com + dentro da coluna definida em toggleColumnId)
========================================================= */
function RelatorioTable({
    columns,
    rows,
    detail,
    isExpanded,
    toggleRow,
    printMode,
    printIncludeDetail,
}) {
    return (
        <table className="w-full border-collapse text-[12px]">
            <thead>
                <tr className="bg-gray-100">
                    {columns.map((col) => (
                        <th key={col.id} className="border px-2 py-1" style={{ width: col.width }}>
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows.map((row, idx) => (
                    <RelatorioRow
                        key={row.id ?? idx}
                        row={row}
                        rowId={row.id ?? String(idx)}
                        columns={columns}
                        detail={detail}
                        expanded={
                            // ✅ no print: expande tudo SOMENTE se o usuário marcou "com notas"
                            printMode ? !!printIncludeDetail : isExpanded(row.id ?? String(idx))
                        }
                        toggleRow={toggleRow}
                        printMode={printMode}
                    />
                ))}
            </tbody>
        </table>
    );
}

/* =========================================================
   LINHA (MESTRE + DETALHE)
========================================================= */
function RelatorioRow({ row, rowId, columns, detail, expanded, toggleRow, printMode }) {
    const hasDetail = !!(detail?.enabled && row?.[detail.key]?.length);

    return (
        <>
            <tr className="hover:bg-gray-50">
                {columns.map((col) => {
                    const value = safeGet(row, col.accessor);
                    const isToggleCol = detail?.enabled && detail?.toggleColumnId === col.id;

                    if (isToggleCol) {
                        return (
                            <td
                                key={col.id}
                                className={`border px-2 py-1 ${col.align === "right" ? "text-right" : ""}`}
                            >
                                <div className="flex items-center gap-2">
                                    {hasDetail && !printMode ? (
                                        <button
                                            className="w-[18px] h-[18px] border border-gray-500 text-[12px] leading-[16px] rounded text-center"
                                            onClick={() => toggleRow(rowId)}
                                            title={expanded ? "Recolher" : "Expandir"}
                                        >
                                            {expanded ? "-" : "+"}
                                        </button>
                                    ) : (
                                        <span className="w-[18px]" />
                                    )}
                                    <span className="font-medium">{value}</span>
                                </div>
                            </td>
                        );
                    }

                    return (
                        <td
                            key={col.id}
                            className={`border px-2 py-1 ${col.align === "right" ? "text-right" : ""}`}
                        >
                            {value}
                        </td>
                    );
                })}
            </tr>

            {/* DETALHE (NOTAS) */}
            {detail?.enabled && hasDetail && expanded && (
                <tr>
                    <td colSpan={columns.length} className="border p-2 bg-gray-50">
                        <RelatorioDetailTable columns={detail.columns} rows={row[detail.key]} />
                    </td>
                </tr>
            )}
        </>
    );
}

/* =========================================================
   SUBTABELA DETALHE (NOTAS) + TOTALIZADOR
========================================================= */
function RelatorioDetailTable({ columns, rows }) {
    const totais = useMemo(() => {
        const totalNFs = rows?.length || 0;
        const totalPeso = (rows || []).reduce((s, r) => s + (Number(r.peso) || 0), 0);
        const totalValor = (rows || []).reduce((s, r) => s + (Number(r.valorNF) || 0), 0);
        return { totalNFs, totalPeso, totalValor };
    }, [rows]);

    const has6 = (columns?.length || 0) >= 6;

    return (
        <table className="w-full border-collapse text-[11px]">
            <thead>
                <tr className="bg-white">
                    <th
                        colSpan={columns.length}
                        className="border border-gray-300 px-2 py-1 text-left font-semibold"
                    >
                        Relação Notas Fiscais do CTe
                    </th>
                </tr>
                <tr className="bg-gray-200">
                    {columns.map((c) => (
                        <th
                            key={c.id}
                            className={`border border-gray-300 px-2 py-1 ${c.align === "right" ? "text-right" : ""
                                }`}
                        >
                            {c.label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {(rows || []).map((r, i) => (
                    <tr key={i}>
                        {columns.map((c) => (
                            <td
                                key={c.id}
                                className={`border border-gray-300 px-2 py-1 ${c.align === "right" ? "text-right" : ""
                                    }`}
                            >
                                {safeGet(r, c.accessor)}
                            </td>
                        ))}
                    </tr>
                ))}

                {/* Totalizador igual ao print */}
                {has6 ? (
                    <tr className="bg-white">
                        <td
                            colSpan={3}
                            className="border border-gray-300 px-2 py-2 text-right font-semibold"
                        >
                            Totais das NFs:
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-right font-semibold">
                            {totais.totalNFs.toLocaleString("pt-BR")}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-right font-semibold">
                            {totais.totalPeso.toLocaleString("pt-BR", { minimumFractionDigits: 3 })}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-right font-semibold">
                            {totais.totalValor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                    </tr>
                ) : (
                    <tr className="bg-white">
                        <td
                            colSpan={columns.length}
                            className="border border-gray-300 px-2 py-2 text-right font-semibold"
                        >
                            Totais das NFs: {totais.totalNFs} | Peso:{" "}
                            {totais.totalPeso.toLocaleString("pt-BR", { minimumFractionDigits: 3 })} | Valor:{" "}
                            {totais.totalValor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
