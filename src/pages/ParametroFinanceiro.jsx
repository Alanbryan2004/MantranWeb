// src/pages/ParametroFinanceiro.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
    ChevronLeft,
    CheckCircle,
    RotateCcw,
    XCircle,
    LayoutGrid,
    Palette,
    Settings2,
} from "lucide-react";

import { useIconColor } from "../context/IconColorContext";
import { useMenuRapidoFinanceiro } from "../context/MenuRapidoFinanceiroContext";

export default function ParametroFinanceiro({ onClose }) {
    const navigate = useNavigate();

    // Função interna para fechar: usa a prop se existir, senão navega para trás
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
        }
    };

    // =============================
    // CONTEXTOS
    // =============================
    const {
        iconColor,
        setIconColor,

        footerIconColorNormal,
        footerIconColorHover,
        setFooterIconColorNormal,
        setFooterIconColorHover,

        backgroundImage,
        setBackgroundImage,

        DEFAULT_ICON_COLOR,
        DEFAULT_FOOTER_NORMAL,
        DEFAULT_FOOTER_HOVER,
        resetColors,
    } = useIconColor();

    const {
        atalhos,
        adicionarAtalho,
        removerAtalho,
        restaurarPadrao,
    } = useMenuRapidoFinanceiro();

    // =============================
    // ESTADOS
    // =============================
    const [modoCards, setModoCards] = useState(false);
    const [exibirDashboard, setExibirDashboard] = useState(true);
    const [corFundo, setCorFundo] = useState("#f3f4f6");

    const coresBase = [
        { value: "red", label: "Vermelho" },
        { value: "blue", label: "Azul" },
        { value: "emerald", label: "Verde" },
        { value: "amber", label: "Laranja" },
        { value: "slate", label: "Cinza" },
        { value: "pink", label: "Rosa" },
    ];

    // ÍCONES
    const [corBase, setCorBase] = useState(iconColor.split("-")[1]);
    const [intensidade, setIntensidade] = useState(iconColor.split("-")[2]);

    const atualizarCorIcones = (c, n) => {
        setCorBase(c);
        setIntensidade(n);
        setIconColor(`text-${c}-${n}`);
    };

    // RODAPÉ NORMAL
    const [footerBase, setFooterBase] = useState(footerIconColorNormal.split("-")[1]);
    const [footerInt, setFooterInt] = useState(footerIconColorNormal.split("-")[2]);

    const atualizarRodapeNormal = (c, n) => {
        setFooterBase(c);
        setFooterInt(n);
        setFooterIconColorNormal(`text-${c}-${n}`);
    };

    // RODAPÉ HOVER
    const [footerHoverBase, setFooterHoverBase] = useState(footerIconColorHover.split("-")[1]);
    const [footerHoverInt, setFooterHoverInt] = useState(footerIconColorHover.split("-")[2]);

    const atualizarRodapeHover = (c, n) => {
        setFooterHoverBase(c);
        setFooterHoverInt(n);
        setFooterIconColorHover(`text-${c}-${n}`);
    };

    // =====================================
    // SALVAR / RESETAR
    // =====================================
    const salvar = () => {
        localStorage.setItem("financeiro_exibirDashboard", exibirDashboard);
        localStorage.setItem("financeiro_corFundo", corFundo);
        alert("Parâmetros salvos com sucesso!");
    };

    const limpar = () => {
        setExibirDashboard(true);
        setCorFundo("#f3f4f6");

        setIconColor(DEFAULT_ICON_COLOR);
        setFooterIconColorNormal(DEFAULT_FOOTER_NORMAL);
        setFooterIconColorHover(DEFAULT_FOOTER_HOVER);

        resetColors();
        restaurarPadrao();

        alert("Todos parâmetros foram restaurados.");
    };

    // =============================
    // CARD COMPONENTE
    // =============================
    const Card = ({ title, children }) => (
        <div className="border border-gray-300 rounded bg-white p-4 shadow-sm space-y-2">
            <h2 className="text-[14px] font-semibold text-red-700 border-b pb-1">{title}</h2>
            {children}
        </div>
    );

    // =============================
    // CAMPOS PRINCIPAIS
    // =============================
    const campos = (
        <>
            {/* DASHBOARD */}
            <div className="flex items-center gap-3">
                <label className="w-[160px] text-right text-sm font-medium text-gray-700">
                    Exibir Dashboard:
                </label>
                <input
                    type="checkbox"
                    checked={exibirDashboard}
                    onChange={(e) => setExibirDashboard(e.target.checked)}
                />
            </div>

            {/* COR DE FUNDO */}
            <div className="flex items-center gap-3">
                <label className="w-[160px] text-right text-sm font-medium">
                    Cor de Fundo:
                </label>

                <input
                    type="color"
                    value={corFundo}
                    onChange={(e) => setCorFundo(e.target.value)}
                    className="w-[60px] h-[28px] border rounded"
                />

                <div className="px-4 py-2 rounded text-sm"
                    style={{ backgroundColor: corFundo }}>
                    Exemplo
                </div>
            </div>

            {/* LOGO FUNDO */}
            <div className="flex items-center gap-3">
                <label className="w-[160px] text-right text-sm font-medium">
                    Logo de Fundo:
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const reader = new FileReader();
                        reader.onload = () => {
                            setBackgroundImage(reader.result);
                            alert("Logo salva!");
                        };
                        reader.readAsDataURL(file);
                    }}
                />

                <button
                    className="text-xs border px-2 py-[2px] rounded text-red-700"
                    onClick={() => {
                        setBackgroundImage(null);
                        alert("Logo removida.");
                    }}
                >
                    Remover
                </button>
            </div>

            {/* ================= ICONES ================ */}
            <div className="flex items-center gap-3 mt-3">
                <label className="w-[160px] text-right text-sm font-medium text-gray-700">
                    Cor dos Ícones:
                </label>

                <select
                    value={corBase}
                    onChange={(e) => atualizarCorIcones(e.target.value, intensidade)}
                    className="border rounded px-2 py-[4px] text-[13px]"
                >
                    {coresBase.map((c) => (
                        <option key={c.value} value={c.value}>
                            {c.label}
                        </option>
                    ))}
                </select>

                <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={intensidade}
                    onChange={(e) => atualizarCorIcones(corBase, e.target.value)}
                />

                <Palette size={20} className={`text-${corBase}-${intensidade}`} />
            </div>

            {/* ================= Rodapé Normal ================ */}
            <div className="flex items-center gap-3 mt-3">
                <label className="w-[160px] text-right text-sm font-medium text-gray-700">
                    Rodapé (Normal):
                </label>

                <select
                    value={footerBase}
                    onChange={(e) => atualizarRodapeNormal(e.target.value, footerInt)}
                    className="border rounded px-2 py-[4px] text-[13px]"
                >
                    {coresBase.map((c) => (
                        <option key={c.value} value={c.value}>
                            {c.label}
                        </option>
                    ))}
                </select>

                <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={footerInt}
                    onChange={(e) => atualizarRodapeNormal(footerBase, e.target.value)}
                />

                <Palette size={20} className={`text-${footerBase}-${footerInt}`} />
            </div>

            {/* ================= Rodapé Hover ================ */}
            <div className="flex items-center gap-3 mt-3">
                <label className="w-[160px] text-right text-sm font-medium text-gray-700">
                    Rodapé (Hover):
                </label>

                <select
                    value={footerHoverBase}
                    onChange={(e) => atualizarRodapeHover(e.target.value, footerHoverInt)}
                    className="border rounded px-2 py-[4px] text-[13px]"
                >
                    {coresBase.map((c) => (
                        <option key={c.value} value={c.value}>
                            {c.label}
                        </option>
                    ))}
                </select>

                <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={footerHoverInt}
                    onChange={(e) => atualizarRodapeHover(footerHoverBase, e.target.value)}
                />

                <Palette size={20} className={`text-${footerHoverBase}-${footerHoverInt}`} />
            </div>



            {/* ========= MENU RÁPIDO ========= */}
            <div className="mt-4">
                <label className="w-[160px] text-right text-sm font-medium text-gray-700">
                    Menu Rápido:
                </label>

                <div className="mt-2 border rounded p-2 bg-gray-50">
                    {atalhos.map((a) => (
                        <div key={a.id} className="flex items-center justify-between p-1">
                            <span className="text-[13px]">{a.label}</span>
                            <button
                                onClick={() => removerAtalho(a.rota)}
                                className="text-red-700 hover:text-black"
                            >
                                <XCircle size={16} />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={restaurarPadrao}
                        className="mt-2 text-xs text-red-700 underline"
                    >
                        Restaurar Padrão
                    </button>
                </div>
            </div>
        </>
    );

    // =============================
    // RENDER FINAL (MODAL)
    // =============================
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-[720px] bg-gray-100 rounded shadow-lg border border-gray-300 flex flex-col">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-red-700 to-black text-white px-4 py-2 rounded-t flex items-center justify-between">
                    <h1 className="text-sm font-semibold flex items-center gap-2">
                        <Settings2 size={16} /> PARÂMETROS DO FINANCEIRO
                    </h1>

                    <button
                        onClick={handleClose}
                        className="hover:text-gray-300 flex items-center gap-1"
                    >
                        <XCircle size={18} /> Fechar
                    </button>
                </div>

                {/* MODO CARDS */}
                <div className="flex justify-end p-2 text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={modoCards}
                            onChange={(e) => setModoCards(e.target.checked)}
                        />
                        <LayoutGrid size={16} className="text-red-700" />
                        Exibir por Cards
                    </label>
                </div>

                {/* CONTEÚDO */}
                <div className="p-4 overflow-auto max-h-[70vh]">
                    {modoCards ? (
                        <div className="space-y-3">
                            <Card title="Configurações">{campos}</Card>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setModoCards(false)}
                                    className="flex items-center gap-1 text-sm text-gray-700 hover:text-red-700"
                                >
                                    <ChevronLeft size={14} /> Voltar
                                </button>

                                <button
                                    onClick={salvar}
                                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    <CheckCircle size={14} /> Salvar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">{campos}</div>
                    )}
                </div>

                {/* RODAPÉ */}
                <div className="flex justify-between bg-white px-4 py-2 border-t rounded-b">
                    <button
                        onClick={limpar}
                        className="text-red-700 hover:text-red-800 text-sm flex items-center gap-1"
                    >
                        <RotateCcw size={14} /> Limpar
                    </button>

                    {!modoCards && (
                        <button
                            onClick={salvar}
                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        >
                            <CheckCircle size={14} /> Salvar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
