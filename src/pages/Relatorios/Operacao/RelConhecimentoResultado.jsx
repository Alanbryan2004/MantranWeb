import { useNavigate, useLocation } from "react-router-dom";
import { XCircle, FileText, FileSpreadsheet } from "lucide-react";
import { useIconColor } from "../../../context/IconColorContext";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { utils, writeFile } from "xlsx";

/* ================= HELPERS ================= */
function LabelInfo({ children }) {
    return <span className="text-[12px] text-gray-600">{children}</span>;
}

const formatarDataBR = (data) => {
    if (!data) return "";
    if (data.includes("/")) return data;
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
};

// (opcional) se a emissão vier dd/mm/aaaa, mantém; se vier yyyy-mm-dd, converte
const formatarDataBRFlex = (data) => {
    if (!data) return "";
    return data.includes("-") ? formatarDataBR(data) : data;
};

/* ================= TELA ================= */
export default function RelConhecimentoResultado({ open }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { footerIconColorNormal, footerIconColorHover } = useIconColor();

    // ✅ logo vindo da tela Parametro
    const logoCliente = localStorage.getItem("param_logoBg");

    // filtros vindos da tela anterior
    const filtros = location.state || {
        cliente: "HNK-ITU (1) MATRIZ",
        dataIni: "2025-12-01",
        dataFim: "2025-12-16",
        status: "Autorizado",
        tipoData: "Emissão",
    };

    /* ================= MOCK (100 LINHAS) ================= */
    const baseDados = [
        { ctrc: "043001", cidade: "CAMPINAS/SP", peso: 1200, valor: 1540.75 },
        { ctrc: "043002", cidade: "SÃO PAULO/SP", peso: 980, valor: 1120.0 },
        { ctrc: "043003", cidade: "SOROCABA/SP", peso: 450, valor: 680.4 },
        { ctrc: "043004", cidade: "JUNDIAÍ/SP", peso: 300, valor: 420.1 },
        { ctrc: "043005", cidade: "RIBEIRÃO PRETO/SP", peso: 760, valor: 980.9 },
        { ctrc: "043006", cidade: "BAURU/SP", peso: 510, valor: 740.0 },
        { ctrc: "043007", cidade: "PIRACICABA/SP", peso: 640, valor: 860.3 },
        { ctrc: "043008", cidade: "LIMEIRA/SP", peso: 390, valor: 510.6 },
        { ctrc: "043009", cidade: "AMERICANA/SP", peso: 870, valor: 1190.2 },
        { ctrc: "043010", cidade: "TAUBATÉ/SP", peso: 560, valor: 790.0 },
    ];

    // 10 registros diferentes repetidos 10x = 100 linhas
    const dados = Array.from({ length: 10 }).flatMap((_, rep) =>
        baseDados.map((b, i) => {
            // varia a data só para você enxergar melhor no teste
            const dia = String((i + rep) % 28 + 1).padStart(2, "0");
            return {
                ctrc: b.ctrc,
                emissao: `${dia}/12/2025`,
                remetente: "HNK-ITU (1) MATRIZ",
                destinatario: "HNK-SP CD",
                cidade: b.cidade,
                peso: b.peso,
                valor: b.valor,
                status: "Autorizado",
            };
        })
    );

    const totalPeso = dados.reduce((s, d) => s + (Number(d.peso) || 0), 0);
    const totalValor = dados.reduce((s, d) => s + (Number(d.valor) || 0), 0);

    /* ================= EXPORTAR PDF (cabeçalho em todas páginas) ================= */
    const exportToPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        const desenharCabecalho = () => {
            // logo
            if (logoCliente) {
                // se der erro por formato, a gente troca o "PNG" por "JPEG"
                doc.addImage(logoCliente, "PNG", 14, 8, 30, 15);
            }

            doc.setFontSize(14);
            doc.text("Relatório de Conhecimentos Emitidos", 50, 14);

            doc.setFontSize(10);
            doc.text(
                `Período: ${formatarDataBR(filtros.dataIni)} até ${formatarDataBR(
                    filtros.dataFim
                )}`,
                50,
                20
            );
        };

        autoTable(doc, {
            head: [
                [
                    "CTRC",
                    "Emissão",
                    "Remetente",
                    "Destinatário",
                    "Cidade",
                    "Peso",
                    "Valor Frete",
                    "Status",
                ],
            ],
            body: dados.map((d) => [
                d.ctrc,
                formatarDataBRFlex(d.emissao),
                d.remetente,
                d.destinatario,
                d.cidade,
                (Number(d.peso) || 0).toLocaleString("pt-BR"),
                `R$ ${(Number(d.valor) || 0).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                })}`,
                d.status,
            ]),
            startY: 28,
            theme: "grid",
            styles: { fontSize: 9, cellPadding: 2, valign: "middle" },
            headStyles: { fillColor: [240, 240, 240], textColor: 20 },
            columnStyles: {
                5: { halign: "right" }, // Peso
                6: { halign: "right" }, // Valor
            },
            margin: { left: 14, right: 14 },

            // ✅ esse é o ponto: cabeçalho em TODAS as páginas, antes da tabela desenhar
            willDrawPage: () => {
                desenharCabecalho();
            },
        });

        const y = doc.lastAutoTable.finalY + 8;

        doc.setFontSize(10);
        doc.text(`Total CTRCs: ${dados.length}`, 14, y);
        doc.text(`Total Peso: ${totalPeso.toLocaleString("pt-BR")}`, 70, y);
        doc.text(
            `Total Valor: R$ ${totalValor.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
            })}`,
            140,
            y
        );

        doc.save("Relatorio_Conhecimentos_Emitidos.pdf");
    };

    /* ================= EXPORTAR EXCEL ================= */
    const exportToExcel = () => {
        const ws = utils.json_to_sheet(dados);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Relatório");
        writeFile(wb, "Relatorio_Conhecimentos_Emitidos.xlsx");
    };

    return (
        <div
            className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 
      bg-gray-50 h-[calc(100vh-56px)] flex flex-col
      ${open ? "ml-[192px]" : "ml-[56px]"}`}
        >
            {/* ================= CABEÇALHO DO RELATÓRIO ================= */}
            <div className="border-b border-gray-300 bg-white p-3">
                <div className="grid grid-cols-12 gap-3 items-center">
                    {/* LOGO CLIENTE */}
                    <div className="col-span-2 flex items-center justify-center border border-gray-300 h-[70px]">
                        {logoCliente ? (
                            <img
                                src={logoCliente}
                                alt="Logo Cliente"
                                className="max-h-[60px] object-contain"
                            />
                        ) : (
                            <span className="text-gray-400 text-[11px]">SEM LOGO</span>
                        )}
                    </div>

                    {/* TÍTULO */}
                    <div className="col-span-7 text-center">
                        <h2 className="text-red-700 font-semibold text-[15px]">
                            RELATÓRIO DE CONHECIMENTOS EMITIDOS
                        </h2>
                        <p className="text-[12px] text-gray-600">
                            Período: {formatarDataBR(filtros.dataIni)} até{" "}
                            {formatarDataBR(filtros.dataFim)}
                        </p>
                    </div>

                    {/* INFO EMPRESA */}
                    <div className="col-span-3 text-right">
                        <LabelInfo>Empresa: MANTRAN</LabelInfo>
                        <br />
                        <LabelInfo>Filial: 001</LabelInfo>
                        <br />
                        <LabelInfo>Gerado em: {new Date().toLocaleString("pt-BR")}</LabelInfo>
                    </div>
                </div>
            </div>

            {/* ================= SUBCABEÇALHO ================= */}
            <div className="bg-gray-100 border-b border-gray-300 p-2 grid grid-cols-12 gap-2 text-[12px]">
                <div className="col-span-4">
                    <b>Cliente:</b> {filtros.cliente}
                </div>
                <div className="col-span-4">
                    <b>Status CT-e:</b> {filtros.status}
                </div>
                <div className="col-span-4">
                    <b>Tipo Data:</b> {filtros.tipoData}
                </div>
            </div>

            {/* ================= GRID ================= */}
            <div className="flex-1 overflow-y-auto bg-white border-x border-b border-gray-300">
                <table className="w-full text-[12px]">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="border px-2 py-1">CTRC</th>
                            <th className="border px-2 py-1">Emissão</th>
                            <th className="border px-2 py-1">Remetente</th>
                            <th className="border px-2 py-1">Destinatário</th>
                            <th className="border px-2 py-1">Cidade</th>
                            <th className="border px-2 py-1 text-right">Peso</th>
                            <th className="border px-2 py-1 text-right">Valor Frete</th>
                            <th className="border px-2 py-1">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dados.map((d, idx) => (
                            <tr key={idx} className="hover:bg-red-100">
                                <td className="border px-2 py-1">{d.ctrc}</td>
                                <td className="border px-2 py-1">{formatarDataBRFlex(d.emissao)}</td>
                                <td className="border px-2 py-1">{d.remetente}</td>
                                <td className="border px-2 py-1">{d.destinatario}</td>
                                <td className="border px-2 py-1">{d.cidade}</td>
                                <td className="border px-2 py-1 text-right">
                                    {(Number(d.peso) || 0).toLocaleString("pt-BR")}
                                </td>
                                <td className="border px-2 py-1 text-right">
                                    R$ {(Number(d.valor) || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </td>
                                <td className="border px-2 py-1">{d.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= TOTAIS ================= */}
            <div className="bg-gray-100 border-t border-gray-300 px-4 py-2 text-[12px] flex gap-6">
                <b>Total CTRCs:</b> {dados.length}
                <b>Peso Total:</b> {totalPeso.toLocaleString("pt-BR")}
                <b>Valor Total:</b> R{"$ "}
                {totalValor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>

            {/* ================= RODAPÉ ================= */}
            <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <XCircle size={20} />
                    <span>Voltar</span>
                </button>

                <button
                    onClick={exportToPDF}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <FileText size={20} />
                    <span>PDF</span>
                </button>

                <button
                    onClick={exportToExcel}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <FileSpreadsheet size={20} />
                    <span>Excel</span>
                </button>
            </div>
        </div>
    );
}
