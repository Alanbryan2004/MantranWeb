import { useState, useEffect } from "react";
import {
  ChevronRight,
  RotateCcw,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Palette,
  LayoutGrid,
  SlidersHorizontal,
  Settings2,
} from "lucide-react";
import ParametroTaxa from "./ParametroTaxa";
import { useMenuRapido } from "../context/MenuRapidoContext";

import { useIconColor } from "../context/IconColorContext";

export default function Parametro() {
  // === IMPORTANTE: DEFINIR QUE ESTE PARAMETRO É DO MÓDULO OPERAÇÃO ===
  useEffect(() => {
    localStorage.setItem("mantran_modulo", "operacao");
  }, []);

  const [modoCards, setModoCards] = useState(false);
  const [exibirDashboard, setExibirDashboard] = useState(true);
  const [corFundo, setCorFundo] = useState("#f3f4f6");
  const [abrirModalTaxas, setAbrirModalTaxas] = useState(false);
  const { atalhos, adicionarAtalho, removerAtalho, restaurarPadrao } = useMenuRapido();
  const [showMenuRapido, setShowMenuRapido] = useState(false);

  const opcoesMenuRapido = [
    { label: "Viagem", rota: "/viagem", icone: "fa-truck-fast" },
    { label: "NFSe", rota: "/nfse", icone: "fa-file-invoice" },
    { label: "CTe", rota: "/cte", icone: "fa-file-lines" },
    { label: "Coleta", rota: "/coleta", icone: "fa-boxes-packing" },
    { label: "Manifesto", rota: "/manifesto", icone: "fa-file-contract" },
    { label: "Minuta", rota: "/minuta", icone: "fa-file-pen" },
    { label: "Veículo", rota: "/veiculo", icone: "fa-truck" },
    { label: "Motorista", rota: "/motorista", icone: "fa-id-card" },
    { label: "Agregado", rota: "/empresa-agregado", icone: "fa-people-carry-box" },
    { label: "Cliente", rota: "/cliente", icone: "fa-user-tie" },
    { label: "Fatura", rota: "/faturamento", icone: "fa-file-invoice-dollar" },
    { label: "Dashboard", rota: "/dashboard-shopee", icone: "fa-chart-line" },
  ];

  // === CONTEXTO ===
  const {
    iconColor,
    setIconColor,
    footerIconColorNormal,
    footerIconColorHover,
    setFooterIconColorNormal,
    setFooterIconColorHover,
    DEFAULT_ICON_COLOR,
    DEFAULT_FOOTER_NORMAL,
    DEFAULT_FOOTER_HOVER,
  } = useIconColor();

  // === CORES ===
  const coresBase = [
    { value: "red", label: "Vermelho" },
    { value: "blue", label: "Azul" },
    { value: "emerald", label: "Verde" },
    { value: "amber", label: "Laranja" },
    { value: "slate", label: "Cinza" },
    { value: "pink", label: "Rosa" },
  ];

  // === HEADER / SIDEBAR ===
  const [corBase, setCorBase] = useState(iconColor.split("-")[1]);
  const [intensidade, setIntensidade] = useState(iconColor.split("-")[2]);

  const atualizarCorIcones = (cor, nivel) => {
    const classe = `text-${cor}-${nivel}`;

    setCorBase(cor);
    setIntensidade(nivel);

    // Atualiza contexto
    setIconColor(classe);

    // Salva no módulo operação
    localStorage.setItem("op_iconColor", classe);
  };

  // === FOOTER NORMAL ===
  const [footerBase, setFooterBase] = useState(footerIconColorNormal.split("-")[1]);
  const [footerInt, setFooterInt] = useState(footerIconColorNormal.split("-")[2]);

  const atualizarRodapeNormal = (cor, nivel) => {
    const classe = `text-${cor}-${nivel}`;

    setFooterBase(cor);
    setFooterInt(nivel);

    setFooterIconColorNormal(classe);
    localStorage.setItem("op_footerNormal", classe);
  };

  // === FOOTER HOVER ===
  const [footerHoverBase, setFooterHoverBase] = useState(
    footerIconColorHover.split("-")[1]
  );
  const [footerHoverInt, setFooterHoverInt] = useState(
    footerIconColorHover.split("-")[2]
  );

  const atualizarRodapeHover = (cor, nivel) => {
    const classe = `text-${cor}-${nivel}`;

    setFooterHoverBase(cor);
    setFooterHoverInt(nivel);

    setFooterIconColorHover(classe);
    localStorage.setItem("op_footerHover", classe);
  };

  // === SALVAR CONFIGURAÇÕES ===
  const salvarParametros = () => {
    localStorage.setItem("param_exibirDashboard", exibirDashboard ? "true" : "false");
    localStorage.setItem("param_corFundo", corFundo);

    alert("✅ Parâmetros salvos com sucesso!");
  };

  // === LIMPAR ===
  const limparParametros = () => {
    setExibirDashboard(true);
    setCorFundo("#f3f4f6");

    // Reseta somente o módulo operação
    atualizarCorIcones("red", "700");
    atualizarRodapeNormal("red", "700");
    atualizarRodapeHover("red", "900");

    localStorage.removeItem("param_exibirDashboard");
    localStorage.removeItem("param_corFundo");
  };

  // === CARD COMPONENT ===
  const Card = ({ title, children }) => (
    <div className="border border-gray-300 rounded-lg bg-white p-4 shadow-sm space-y-2">
      <h2 className="text-[14px] font-semibold text-red-700 border-b pb-1">{title}</h2>
      {children}
    </div>
  );

  // === CAMPOS ===
  const campos = (
    <>
      {/* DASHBOARD */}
      <div className="flex items-center gap-3">
        <label className="w-[140px] text-right text-sm font-medium text-gray-700">
          Exibir Dashboard ao Logar:
        </label>
        <input
          type="checkbox"
          checked={exibirDashboard}
          onChange={(e) => setExibirDashboard(e.target.checked)}
          className="w-4 h-4"
        />
      </div>

      {/* MENU RÁPIDO */}
      <div className="mt-4">
        <label className="w-[140px] text-right text-sm font-medium text-gray-700">
          Menu Rápido:
        </label>

        <div className="relative mt-1">
          <button
            onClick={() => setShowMenuRapido((prev) => !prev)}
            className="w-full border border-gray-300 rounded px-3 py-[6px] bg-white text-left text-sm flex justify-between items-center"
          >
            Selecionar Atalhos
            <span className="text-gray-500">▼</span>
          </button>

          {showMenuRapido && (
            <div className="absolute z-50 bg-white border border-gray-300 rounded w-full mt-1 shadow-lg max-h-64 overflow-y-auto p-2">
              {opcoesMenuRapido.map((op, idx) => {
                const ativo = atalhos.some((a) => a.rota === op.rota);

                return (
                  <label
                    key={idx}
                    className="flex items-center gap-2 p-1 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={ativo}
                      onChange={(e) => {
                        if (e.target.checked) {
                          adicionarAtalho({
                            id: Date.now(),
                            label: op.label,
                            rota: op.rota,
                            icone: op.icone,
                          });
                        } else {
                          removerAtalho(op.rota);
                        }
                      }}
                    />

                    <i className={`fa-solid ${op.icone} text-gray-700`} />
                    {op.label}
                  </label>
                );
              })}

              <button
                onClick={restaurarPadrao}
                className="mt-2 w-full text-xs text-red-700 hover:text-red-900 underline"
              >
                Restaurar Padrão
              </button>
            </div>
          )}
        </div>
      </div>

      {/* COR DE FUNDO */}
      <div className="flex items-center gap-3">
        <label className="w-[140px] text-right text-sm font-medium text-gray-700">
          Cor de Fundo:
        </label>

        <input
          type="color"
          value={corFundo}
          onChange={(e) => setCorFundo(e.target.value)}
          className="w-[60px] h-[28px] border border-gray-300 rounded"
        />

        <div className="ml-3 px-4 py-2 rounded text-sm" style={{ backgroundColor: corFundo }}>
          Exemplo
        </div>
      </div>

      {/* LOGO */}
      <div className="flex items-center gap-3 mt-2">
        <label className="w-[140px] text-right text-sm font-medium text-gray-700">
          Logo de Fundo:
        </label>

        <input
          type="file"
          accept="image/png"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
              localStorage.setItem("param_logoBg", reader.result);
              alert("✅ Logo salva com sucesso!");
            };
            reader.readAsDataURL(file);
          }}
          className="text-[13px]"
        />

        <button
          onClick={() => {
            localStorage.removeItem("param_logoBg");
            alert("Logo removida.");
          }}
          className="text-xs border border-gray-300 rounded px-2 py-[3px] text-red-700 hover:bg-gray-100"
        >
          Remover
        </button>
      </div>

      {/* TAXAS */}
      <div className="flex items-center gap-3 mt-3">
        <label className="w-[140px] text-right text-sm font-medium text-gray-700">
          Taxas do CT-e:
        </label>

        <button
          onClick={() => setAbrirModalTaxas(true)}
          className="flex items-center gap-1 border border-gray-300 rounded px-2 py-[4px] text-red-700 hover:bg-gray-100 text-sm"
        >
          <Settings2 size={14} /> Selecionar Taxas
        </button>
      </div>

      {/* ========================== */}
      {/* COR DOS ÍCONES */}
      {/* ========================== */}

      <div className="flex items-center gap-3 mt-4">
        <label className="w-[140px] text-right text-sm font-medium text-gray-700">
          Cor dos Ícones:
        </label>

        <select
          value={corBase}
          onChange={(e) => atualizarCorIcones(e.target.value, intensidade)}
          className="border border-gray-300 rounded px-2 py-[4px] h-[28px] text-[13px]"
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
          className="w-[120px]"
        />

        <Palette size={22} className={`ml-2 text-${corBase}-${intensidade}`} />

        <span className="text-xs">text-{corBase}-{intensidade}</span>

        <button
          onClick={() => atualizarCorIcones("red", "700")}
          className="ml-2 text-xs border border-gray-300 rounded px-2 py-[3px] text-red-700 hover:bg-gray-100"
        >
          Padrão
        </button>
      </div>

      {/* ========================== */}
      {/* RODAPÉ NORMAL */}
      {/* ========================== */}

      <div className="flex items-center gap-3 mt-4">
        <label className="w-[140px] text-right text-sm font-medium text-gray-700">
          Cor Rodapé (Normal):
        </label>

        <select
          value={footerBase}
          onChange={(e) => atualizarRodapeNormal(e.target.value, footerInt)}
          className="border border-gray-300 rounded px-2 py-[4px] h-[28px] text-[13px]"
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
          className="w-[120px]"
        />

        <Palette size={22} className={`ml-2 text-${footerBase}-${footerInt}`} />

        <span className="text-xs">text-{footerBase}-{footerInt}</span>

        <button
          onClick={() => atualizarRodapeNormal("red", "700")}
          className="ml-2 text-xs border border-gray-300 rounded px-2 py-[3px] text-red-700 hover:bg-gray-100"
        >
          Padrão
        </button>
      </div>

      {/* ========================== */}
      {/* RODAPÉ HOVER */}
      {/* ========================== */}

      <div className="flex items-center gap-3 mt-4">
        <label className="w-[140px] text-right text-sm font-medium text-gray-700">
          Cor Rodapé (Hover):
        </label>

        <select
          value={footerHoverBase}
          onChange={(e) => atualizarRodapeHover(e.target.value, footerHoverInt)}
          className="border border-gray-300 rounded px-2 py-[4px] h-[28px] text-[13px]"
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
          className="w-[120px]"
        />

        <Palette size={22} className={`ml-2 text-${footerHoverBase}-${footerHoverInt}`} />

        <span className="text-xs">text-{footerHoverBase}-{footerHoverInt}</span>

        <button
          onClick={() => atualizarRodapeHover("red", "900")}
          className="ml-2 text-xs border border-gray-300 rounded px-2 py-[3px] text-red-700 hover:bg-gray-100"
        >
          Padrão
        </button>
      </div>
    </>
  );

  // ================================
  // RENDER FINAL
  // ================================
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-50 w-[700px] rounded shadow-lg border border-gray-300 flex flex-col">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-gradient-to-r from-red-700 to-black text-white px-4 py-2 rounded-t">
          <h1 className="text-sm font-semibold flex items-center gap-2">
            <SlidersHorizontal size={16} /> PARÂMETROS DO SISTEMA
          </h1>

          <button
            title="Fechar Tela"
            onClick={() => window.history.back()}
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <XCircle size={18} />
            <span className="text-[13px]">Fechar</span>
          </button>
        </div>

        {/* Cards / Campos */}
        <div className="flex justify-end p-2 text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={modoCards} onChange={(e) => setModoCards(e.target.checked)} />
            <LayoutGrid size={16} className="text-red-700" />
            Exibir por Cards
          </label>
        </div>

        <div className="p-4">
          {modoCards ? (
            <div className="space-y-3">
              <Card title="Configurações">{campos}</Card>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => setModoCards(false)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-700"
                >
                  <ChevronLeft size={16} /> Voltar
                </button>

                <button
                  onClick={salvarParametros}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  <CheckCircle size={14} /> Salvar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">{campos}</div>
          )}
        </div>

        {/* Rodapé */}
        <div className="flex justify-between items-center bg-white border-t border-gray-300 px-4 py-2">
          <button
            onClick={limparParametros}
            className="flex items-center gap-1 text-red-700 hover:text-red-800 text-sm"
          >
            <RotateCcw size={14} /> Limpar
          </button>

          {!modoCards && (
            <button
              onClick={salvarParametros}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              <CheckCircle size={14} /> Salvar
            </button>
          )}
        </div>
      </div>

      {abrirModalTaxas && <ParametroTaxa onClose={() => setAbrirModalTaxas(false)} />}
    </div>
  );
}
