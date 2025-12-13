// src/pages/WMSNFSaida.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIconColor } from "../context/IconColorContext";

import {
    XCircle,
    RotateCcw,
    PlusCircle,
    Edit,
    Trash2,
    CalendarClock,
    AlertTriangle,
    Boxes,
    FileText,
    Search,
    Truck,
    PackageSearch,
    ChevronUp,
    ChevronDown,
} from "lucide-react";

/* ========================= Helpers (padrão Mantran) ========================= */
function Label({ children, className = "" }) {
    return (
        <label className={`text-[12px] text-gray-700 flex items-center ${className}`}>
            {children}
        </label>
    );
}

function Txt(props) {
    return (
        <input
            {...props}
            className={
                "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] w-full " +
                (props.className || "")
            }
        />
    );
}

function Sel({ children, className = "", ...rest }) {
    return (
        <select
            {...rest}
            className={
                "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] w-full " +
                className
            }
        >
            {children}
        </select>
    );
}

/* ========================= Data inteligente ========================= */
const getHojeISO = () => new Date().toISOString().slice(0, 10);

const fillTodayIfEmpty = (e) => {
    if (!e.target.value) e.target.value = getHojeISO();
};

const clearOnBackspace = (e) => {
    if (e.key === "Backspace") {
        e.preventDefault();
        e.target.value = "";
        e.target.dispatchEvent(new Event("input", { bubbles: true }));
        e.target.dispatchEvent(new Event("change", { bubbles: true }));
    }
};

const bindDateSmart = (onChange) => ({
    onFocus: fillTodayIfEmpty,
    onKeyDown: clearOnBackspace,
    onChange,
});

/* ========================= Format helpers ========================= */
const parseNumero = (v) => {
    if (!v) return 0;
    const s = String(v).trim();
    const norm = s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s;
    const n = Number(norm);
    return Number.isFinite(n) ? n : 0;
};

const formatNumero = (n) =>
    Number(n || 0).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const formatDataBR = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
};

/* ========================= Mocks ========================= */
const empresasMock = [{ value: "001", label: "001 - MANTRAN TRANSPORTES LTDA" }];

const filiaisMock = [
    { value: "001", label: "001 - TESTE MANTRAN" },
    { value: "002", label: "002 - FILIAL 002" },
];

const freteMock = [
    { value: "Sem Frete", label: "Sem Frete" },
    { value: "CIF", label: "CIF" },
    { value: "FOB", label: "FOB" },
];

const tipoVolumeMock = [
    { value: "CX", label: "CX" },
    { value: "FD", label: "FD" },
    { value: "PLT", label: "PLT" },
];

const tipoProdutoMock = [
    { value: "LEITE CONDENSADO", label: "LEITE CONDENSADO" },
    { value: "LATICINIOS", label: "LATICINIOS" },
];

/* ========================= Tela Principal ========================= */
export default function WMSNFSaida({ open }) {
    const navigate = useNavigate();
    const { footerIconColorNormal, footerIconColorHover } = useIconColor();

    const [activeTab, setActiveTab] = useState("nota");
    const [isTranspOpen, setIsTranspOpen] = useState(true);

    /* ========================= Card 1 - Nota ========================= */
    const [nota, setNota] = useState({
        empresa: "001",
        filial: "001",
        agenda: "0",

        clienteCnpj: "02089969003474",
        clienteNome: "LATICINIOS BELA VIST",
        clienteCidade: "ARARAQUARA",
        clienteUF: "SP",

        nrNF: "",
        serie: "1",
        chave: "",
        emissao: getHojeISO(),
        saida: getHojeISO(),

        nrPedido: "",
    });

    const setN = (campo) => (e) =>
        setNota((p) => ({ ...p, [campo]: e.target.value }));

    /* ========================= Card 2 - Item ========================= */
    const [item, setItem] = useState({
        produtoCod: "",
        produtoDesc: "",
        nrLote: "",
        validade: "",
        nrItem: "",
        qtdItem: "",
        vrUnit: "",
        cst: "",
        totalItem: "0,00",
        ncm: "",
        unidade: "UN",
        corCod: "",
    });

    const setI = (campo) => (e) =>
        setItem((p) => ({ ...p, [campo]: e.target.value }));

    const [itens, setItens] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const total = parseNumero(item.qtdItem) * parseNumero(item.vrUnit);
        setItem((p) => ({ ...p, totalItem: formatNumero(total) }));
    }, [item.qtdItem, item.vrUnit]);

    const totalNF = useMemo(
        () => itens.reduce((a, it) => a + Number(it.qtd || 0) * Number(it.vrUnit || 0), 0),
        [itens]
    );

    /* ========================= Transporte ========================= */
    const [transp, setTransp] = useState({
        frete: "Sem Frete",
        qtVolume: "0",
        tipoVolume: "CX",
        tipoProduto: "LEITE CONDENSADO",
        pesoBruto: "0,00",
        pesoLiquido: "0,00",
        observacao: "",
    });

    /* ========================= Render ========================= */
    return (
        <div
            className={`transition-all duration-300 mt-[44px] bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${open ? "ml-[192px]" : "ml-[56px]"
                }`}
        >
            <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
                Nota Fiscal Saída
            </h1>

            <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 overflow-y-auto flex flex-col gap-2">
                {/* CARD 1 */}
                <fieldset className="border border-gray-300 rounded p-3 bg-white">
                    <legend className="px-2 text-red-700 font-semibold text-[13px]">
                        Dados da Nota
                    </legend>

                    <div className="space-y-2">
                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-1 justify-end">Empresa</Label>
                            <Sel className="col-span-4" value={nota.empresa} onChange={setN("empresa")}>
                                {empresasMock.map((e) => (
                                    <option key={e.value} value={e.value}>
                                        {e.label}
                                    </option>
                                ))}
                            </Sel>

                            <Label className="col-span-1 justify-end">Filial</Label>
                            <Sel className="col-span-4" value={nota.filial} onChange={setN("filial")}>
                                {filiaisMock.map((f) => (
                                    <option key={f.value} value={f.value}>
                                        {f.label}
                                    </option>
                                ))}
                            </Sel>

                            <Label className="col-span-1 justify-end">Agenda</Label>
                            <Txt className="col-span-1 bg-gray-200 text-center" readOnly value={nota.agenda} />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-1 justify-end">Cliente</Label>
                            <Txt className="col-span-2" value={nota.clienteCnpj} />
                            <Txt className="col-span-6 bg-gray-200" readOnly value={nota.clienteNome} />
                            <Txt className="col-span-2 bg-gray-200" readOnly value={nota.clienteCidade} />
                            <Txt className="col-span-1 bg-gray-200 text-center" readOnly value={nota.clienteUF} />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-1 justify-end">NF</Label>
                            <Txt className="col-span-1" value={nota.nrNF} onChange={setN("nrNF")} />

                            <Label className="col-span-1 justify-end">Série</Label>
                            <Txt className="col-span-1 text-center" value={nota.serie} />

                            <Label className="col-span-1 justify-end">Emissão</Label>
                            <Txt
                                type="date"
                                className="col-span-2"
                                value={nota.emissao}
                                {...bindDateSmart(setN("emissao"))}
                            />

                            <Label className="col-span-1 justify-end">Saída</Label>
                            <Txt
                                type="date"
                                className="col-span-2"
                                value={nota.saida}
                                {...bindDateSmart(setN("saida"))}
                            />
                        </div>
                    </div>
                </fieldset>

                {/* GRID */}
                <fieldset className="border border-gray-300 rounded p-3 bg-white">
                    <legend className="px-2 text-red-700 font-semibold text-[13px]">
                        Itens da Nota
                    </legend>

                    <div className="border border-gray-300 rounded max-h-[320px] overflow-y-auto">
                        <table className="w-full text-[12px]">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    {[
                                        "Item",
                                        "Código",
                                        "Descrição",
                                        "Lote",
                                        "Qtd",
                                        "Valor",
                                    ].map((h) => (
                                        <th key={h} className="border px-2 py-1 text-left">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {itens.map((it, idx) => (
                                    <tr key={idx}>
                                        <td className="border px-2">{it.nrItem}</td>
                                        <td className="border px-2">{it.cod}</td>
                                        <td className="border px-2">{it.desc}</td>
                                        <td className="border px-2">{it.lote}</td>
                                        <td className="border px-2 text-right">{it.qtd}</td>
                                        <td className="border px-2 text-right">
                                            {formatNumero(it.qtd * it.vrUnit)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-2">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <span className="text-[12px] font-semibold">Total NF</span>
                            <Txt
                                className="w-[140px] bg-gray-200 text-right"
                                readOnly
                                value={formatNumero(totalNF)}
                            />
                        </div>
                    </div>
                </fieldset>
            </div>

            {/* Rodapé */}
            <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <XCircle size={20} />
                    <span>Fechar</span>
                </button>
            </div>
        </div>
    );
}
