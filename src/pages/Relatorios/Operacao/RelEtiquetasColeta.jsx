// src/pages/Relatorios/Operacao/RelEtiquetasColeta.jsx
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EtiquetaBase from "../base/EtiquetaBase";

/* =========================================================
   HELPERS
========================================================= */
function onlyDigits(s) {
    return String(s || "").replace(/\D/g, "");
}

function padLeft(n, len = 6) {
    const d = onlyDigits(n);
    return d.padStart(len, "0");
}

function parseRange(ini, fim) {
    const a = Number(onlyDigits(ini || ""));
    const b = Number(onlyDigits(fim || ""));
    if (!a || !b) return null;
    return {
        start: Math.min(a, b),
        end: Math.max(a, b),
    };
}

/* =========================================================
   BARCODE (SVG) – visual estável para print
========================================================= */
function hashToBars(text) {
    const s = String(text || "");
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    const bars = [];
    for (let i = 0; i < 92; i++) {
        h ^= h << 13;
        h ^= h >>> 17;
        h ^= h << 5;
        bars.push((Math.abs(h) % 3) + 1);
    }
    return bars;
}

function BarcodeSVG({ value, heightMm = 18 }) {
    const bars = useMemo(() => hashToBars(value), [value]);
    const H = 120;
    let x = 10;

    return (
        <svg
            width="100%"
            height={`${heightMm}mm`}
            viewBox="0 0 420 120"
            preserveAspectRatio="none"
        >
            <rect width="420" height="120" fill="#fff" />
            {bars.map((w, i) => {
                const width = w * 2;
                const isBar = i % 2 === 0;
                const rect = isBar ? (
                    <rect key={i} x={x} y={0} width={width} height={H} fill="#000" />
                ) : null;
                x += width;
                return rect;
            })}
        </svg>
    );
}
/* =========================================================
   MOCK DA COLETA (substitui depois por WebApi)
========================================================= */
function makeMockColeta(coletaNumero) {
    const coleta = padLeft(coletaNumero, 6);

    return {
        coleta,
        notaFiscal: "00006036",
        diDta: "26/0182993-0",
        endereco: "AV BRIGADEIRO FARIA LIMA Nº 2232",
        cidade: "SAO PAULO",
        uf: "SP",
        volumesTotal: 21,
        barcodeValue: `${coleta}000060362601829930`.slice(0, 24),

        // EXTRAS (não entram no padrão)
        cliente: "HNK-ITU (1) MATRIZ",
        motorista: "ALAN DA COSTA",
        placaTracao: "RXW4156",
        placaReboque: "ABC1D23",
    };
}

/* =========================================================
   1 ETIQUETA POR VOLUME
========================================================= */
function buildItems(range) {
    if (!range) return [];
    const out = [];
    let guard = 0;

    for (let n = range.start; n <= range.end; n++) {
        const base = makeMockColeta(n);

        for (let v = 1; v <= base.volumesTotal; v++) {
            out.push({
                ...base,
                id: `${base.coleta}-${v}`,
                volumeAtual: v,
            });
            guard++;
            if (guard >= 2000) break;
        }
        if (guard >= 2000) break;
    }
    return out;
}
/* =========================================================
   RENDER DA ETIQUETA – LAYOUT OFICIAL
========================================================= */
function RenderEtiqueta({ item, visibleFieldIds, labelKind }) {
    const show = (id) => visibleFieldIds.includes(id);

    const cidadeUf = `${item.cidade}/${item.uf}`;
    const volumeTxt = `${item.volumeAtual} / ${item.volumesTotal}`;

    return (
        <div
            style={{
                padding: "4mm",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: 700,
                height: "100%",
                position: "relative",
            }}
        >
            {show("ordemColeta") && (
                <div>
                    Nº ORDEM DE COLETA:
                    <span style={{ fontSize: "16pt" }}> {item.coleta}</span>
                </div>
            )}

            {show("notaFiscal") && (
                <div style={{ marginTop: "2mm" }}>
                    Nº NOTA FISCAL:
                    <span style={{ fontSize: "16pt" }}> {item.notaFiscal}</span>
                </div>
            )}

            {show("diDta") && (
                <div style={{ marginTop: "1mm" }}>
                    DI / DTA:
                    <span style={{ fontSize: "16pt" }}> {item.diDta}</span>
                </div>
            )}

            {show("enderecoEntrega") && (
                <div style={{ marginTop: "3mm" }}>{item.endereco}</div>
            )}

            {show("cidadeUf") && (
                <div style={{ marginTop: "1mm" }}>{cidadeUf}</div>
            )}

            {show("volumes") && (
                <div style={{ marginTop: "6mm", textAlign: "center" }}>
                    <div>VOLUMES</div>
                    <div style={{ marginTop: "3mm" }}>
                        Nº Volume:
                        <span style={{ fontSize: "14pt" }}> {volumeTxt}</span>
                    </div>
                </div>
            )}

            {show("barcode") && labelKind === "barcode" && (
                <div style={{ position: "absolute", left: "4mm", right: "4mm", bottom: "6mm" }}>
                    <BarcodeSVG value={item.barcodeValue} />
                </div>
            )}

            {show("barcode") && labelKind === "qrcode" && (
                <div
                    style={{
                        position: "absolute",
                        right: "6mm",
                        bottom: "6mm",
                        width: "30mm",
                        height: "30mm",
                        border: "2px solid #000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "8pt",
                    }}
                >
                    QR
                </div>
            )}
        </div>
    );
}
export default function RelEtiquetasColeta() {
    const location = useLocation();
    const navigate = useNavigate();

    const ini = location?.state?.ini || "";
    const fim = location?.state?.fim || "";
    const labelKind = location?.state?.labelKind || "barcode";

    const range = useMemo(() => parseRange(ini, fim), [ini, fim]);
    const items = useMemo(() => buildItems(range), [range]);

    const labelConfig = {
        widthMm: 100,
        heightMm: 150,
        gapMm: 0,
        marginMm: 0,
        dpi: 203,
    };

    const templateId = "100x150";

    const template = {
        fieldsCatalog: [
            { id: "ordemColeta", label: "Nº Ordem de Coleta", required: true },
            { id: "notaFiscal", label: "Nº Nota Fiscal" },
            { id: "diDta", label: "DI / DTA" },
            { id: "enderecoEntrega", label: "Endereço da Entrega" },
            { id: "cidadeUf", label: "Cidade/UF" },
            { id: "volumes", label: "Volumes" },
            { id: "barcode", label: "Código" },

            // extras
            { id: "cliente", label: "Cliente" },
            { id: "motorista", label: "Motorista" },
            { id: "placaTracao", label: "Placa Tração" },
            { id: "placaReboque", label: "Placa Reboque" },
        ],

        defaultVisibleFieldIds: [
            "ordemColeta",
            "notaFiscal",
            "diDta",
            "enderecoEntrega",
            "cidadeUf",
            "volumes",
            "barcode",
        ],

        renderLabel: ({ item, visibleFieldIds }) => (
            <RenderEtiqueta
                item={item}
                visibleFieldIds={visibleFieldIds}
                labelKind={labelKind}
            />
        ),
    };

    return (
        <EtiquetaBase
            reportKey="operacao.etiquetas_coleta"
            templateId={templateId}
            labelKind={labelKind}
            labelConfig={labelConfig}
            template={template}
            items={items}
            onClose={() => navigate(-1)}
        />
    );
}
