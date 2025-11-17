import { useState } from "react";
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

// 🔥 Usa APENAS o contexto unificado
import { useIconColor } from "../context/IconColorContext";

export default function Parametro() {
  const [modoCards, setModoCards] = useState(false);
  const [step, setStep] = useState(1);
  const [telaInicial, setTelaInicial] = useState("CTe");
  const [exibirDashboard, setExibirDashboard] = useState(true);
  const [corFundo, setCorFundo] = useState("#f3f4f6");
  const [abrirModalTaxas, setAbrirModalTaxas] = useState(false);

  // 🔥 Contexto unificado
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

  // === Cores base para Tailwind ===
  const coresBase = [
    { value: "red", label: "Vermelho" },
    { value: "blue", label: "Azul" },
    { value: "emerald", label: "Verde" },
    { value: "amber", label: "Laranja" },
    { value: "slate", label: "Cinza" },
    { value: "pink", label: "Rosa" },
  ];

  // === Estado dos ícones HEADER/SIDEBAR ===
  const [corBase, setCorBase] = useState(iconColor.split("-")[1]);
  const [intensidade, setIntensidade] = useState(iconColor.split("-")[2]);

  const atualizarCorIcones = (cor, nivel) => {
    const nova = `text-${cor}-${nivel}`;
    setCorBase(cor);
    setIntensidade(nivel);
    setIconColor(nova);
  };

  // === Estado do rodapé normal ===
  const [footerBase, setFooterBase] = useState(footerIconColorNormal.split("-")[1]);
  const [footerInt, setFooterInt] = useState(footerIconColorNormal.split("-")[2]);

  const atualizarRodapeNormal = (cor, nivel) => {
    const nova = `text-${cor}-${nivel}`;
    setFooterBase(cor);
    setFooterInt(nivel);
    setFooterIconColorNormal(nova);
  };

  // === Estado do rodapé hover ===
  const [footerHoverBase, setFooterHoverBase] = useState(
    footerIconColorHover.split("-")[1]
  );
  const [footerHoverInt, setFooterHoverInt] = useState(
    footerIconColorHover.split("-")[2]
  );

  const atualizarRodapeHover = (cor, nivel) => {
    const nova = `text-${cor}-${nivel}`;
    setFooterHoverBase(cor);
    setFooterHoverInt(nivel);
    setFooterIconColorHover(nova);
  };

  // === Salvar ===
  const salvarParametros = () => {
    localStorage.setItem("param_telaInicial", telaInicial);
    localStorage.setItem(
      "param_exibirDashboard",
      exibirDashboard ? "true" : "false"
    );
    localStorage.setItem("param_corFundo", corFundo);
    alert("✅ Parâmetros salvos com sucesso!");
  };

  // === Limpar ===
  const limparParametros = () => {
    setTelaInicial("CTe");
    setExibirDashboard(true);
    setCorFundo("#f3f4f6");

    setIconColor(DEFAULT_ICON_COLOR);
    setFooterIconColorNormal(DEFAULT_FOOTER_NORMAL);
    setFooterIconColorHover(DEFAULT_FOOTER_HOVER);

    localStorage.removeItem("param_telaInicial");
    localStorage.removeItem("param_exibirDashboard");
    localStorage.removeItem("param_corFundo");
    localStorage.removeItem("param_iconColor");
    localStorage.removeItem("param_footerIconColorNormal");
    localStorage.removeItem("param_footerIconColorHover");
  };

  // === Card Wrapper ===
  const Card = ({ title, children }) => (
    <div className="border border-gray-300 rounded-lg bg-white p-4 shadow-sm space-y-2">
      <h2 className="text-[14px] font-semibold text-red-700 border-b pb-1">
        {title}
      </h2>
      {children}
    </div>
  );

  const campos = (
    <>
      {/* Tela inicial */}
      <div className="flex items-center gap-3">
        <label className="w-[140px] text-right text-sm text-gray-700 font-medium">
          Tela Inicial:
        </label>
        <select
          value={telaInicial}
          onChange={(e) => setTelaInicial(e.target.value)}
          className="border border-gray-300 rounded px-2 py-[2px] h-[28px] text-[13px]"
        >
          <option>CTe</option>
          <option>Coleta</option>
          <option>NFSe</option>
          <option>Manifesto</option>
        </select>
      </div>

      {/* Dashboard */}
      <div className="flex items-center gap-3">
        <label className="w-[140px] text-right text-sm text-gray-700 font-medium">
          Exibir Dashboard ao Logar:
        </label>
        <input
          type="checkbox"
          checked={exibirDashboard}
          onChange={(e) => setExibirDashboard(e.target.checked)}
          className="w-4 h-4"
        />
      </div>

      {/* Cor Fundo */}
      <div className="flex items-center gap-3">
        <label className="w-[140px] text-right text-sm text-gray-700 font-medium">
          Cor de Fundo:
        </label>

        <input
          type="color"
          value={corFundo}
          onChange={(e) => setCorFundo(e.target.value)}
          className="w-[60px] h-[28px] border border-gray-300 rounded"
        />

        <div
          className="ml-3 px-4 py-2 rounded text-sm"
          style={{ backgroundColor: corFundo }}
        >
          Exemplo
        </div>
      </div>

      {/* Logo de Fundo */}
<div className="flex items-center gap-3 mt-3">
  <label className="w-[140px] text-right text-sm text-gray-700 font-medium">
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



      {/* Taxas */}
      <div className="flex items-center gap-3 mt-2">
        <label className="w-[140px] text-right text-sm text-gray-700 font-medium">
          Taxas do CT-e:
        </label>
        <button
          onClick={() => setAbrirModalTaxas(true)}
          className="flex items-center gap-1 text-sm border border-gray-300 rounded px-2 py-[4px] text-red-700 hover:bg-gray-100"
        >
          <Settings2 size={14} /> Selecionar Taxas
        </button>
      </div>

      {/* ============================== */}
      {/*   COR DOS ÍCONES TOPO/SIDEBAR  */}
      {/* ============================== */}
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

      {/* ============================== */}
      {/*     RODAPÉ — NORMAL            */}
      {/* ============================== */}
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

        <Palette
          size={22}
          className={`ml-2 text-${footerBase}-${footerInt}`}
        />

        <span className="text-xs">
          text-{footerBase}-{footerInt}
        </span>

        <button
          onClick={() => atualizarRodapeNormal("red", "700")}
          className="ml-2 text-xs border border-gray-300 rounded px-2 py-[3px] text-red-700 hover:bg-gray-100"
        >
          Padrão
        </button>
      </div>

      {/* ============================== */}
      {/*     RODAPÉ — HOVER             */}
      {/* ============================== */}
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

        <Palette
          size={22}
          className={`ml-2 text-${footerHoverBase}-${footerHoverInt}`}
        />

        <span className="text-xs">
          text-{footerHoverBase}-{footerHoverInt}
        </span>

        <button
          onClick={() => atualizarRodapeHover("red", "900")}
          className="ml-2 text-xs border border-gray-300 rounded px-2 py-[3px] text-red-700 hover:bg-gray-100"
        >
          Padrão
        </button>
      </div>
    </>
  );

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

        {/* Modo Cards */}
        <div className="flex justify-end p-2 text-sm text-gray-600">
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

        {/* Conteúdo */}
        <div className="p-4">{modoCards ? (
          <div className="space-y-3">
            {step === 1 && <Card title="Configuração">{campos}</Card>}
            {step === 2 && <Card title="Visualização">{campos}</Card>}
            {step === 3 && (
              <Card title="Finalização">
                <p className="text-sm text-gray-700 mb-2">
                  Revise suas configurações e clique em <strong>Salvar</strong>.
                </p>
                <button
                  onClick={salvarParametros}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  <CheckCircle size={14} className="inline mr-1" />
                  Salvar
                </button>
              </Card>
            )}

            <div className="flex justify-between mt-3">
              <button
                onClick={() => setStep((s) => Math.max(s - 1, 1))}
                disabled={step === 1}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-700 disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Voltar
              </button>

              <button
                onClick={() => setStep((s) => Math.min(s + 1, 3))}
                disabled={step === 3}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-700 disabled:opacity-40"
              >
                Avançar <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">{campos}</div>
        )}</div>

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

      {abrirModalTaxas && (
        <ParametroTaxa onClose={() => setAbrirModalTaxas(false)} />
      )}
    </div>
  );
}
