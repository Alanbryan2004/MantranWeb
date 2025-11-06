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
import ParametroTaxa from "./ParametroTaxa"; // ⬅️ Import do novo modal

export default function Parametro() {
  const [modoCards, setModoCards] = useState(false);
  const [step, setStep] = useState(1);
  const [telaInicial, setTelaInicial] = useState("CTe");
  const [exibirDashboard, setExibirDashboard] = useState(true);
  const [corFundo, setCorFundo] = useState("#f3f4f6");
  const [abrirModalTaxas, setAbrirModalTaxas] = useState(false); // ⬅️ Controle do modal

  const salvarParametros = () => {
    localStorage.setItem("param_telaInicial", telaInicial);
    localStorage.setItem("param_exibirDashboard", exibirDashboard ? "true" : "false");
    localStorage.setItem("param_corFundo", corFundo);
    alert("✅ Parâmetros salvos com sucesso!");
  };

  const limparParametros = () => {
    setTelaInicial("CTe");
    setExibirDashboard(true);
    setCorFundo("#f3f4f6");
    localStorage.removeItem("param_telaInicial");
    localStorage.removeItem("param_exibirDashboard");
    localStorage.removeItem("param_corFundo");
  };

  const Card = ({ title, children }) => (
    <div className="border border-gray-300 rounded-lg bg-white p-4 shadow-sm space-y-2">
      <h2 className="text-[14px] font-semibold text-red-700 border-b pb-1">{title}</h2>
      {children}
    </div>
  );

  const campos = (
    <>
      {/* Campo: Tela inicial */}
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

      {/* Campo: Exibir Dashboard */}
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

      {/* Campo: Cor de Fundo */}
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

      {/* NOVO: Botão de configuração de taxas */}
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
    </>
  );

  const renderPorCards = () => (
    <div className="space-y-3">
      {step === 1 && <Card title="Configuração da Tela Inicial">{campos}</Card>}
      {step === 2 && <Card title="Visualização">{campos}</Card>}
      {step === 3 && (
        <Card title="Finalização">
          <p className="text-sm text-gray-700 mb-2">
            Revise suas configurações e clique em <strong>Salvar</strong> para aplicar.
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

      {/* Navegação */}
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
  );

  const renderCompleto = () => <div className="space-y-3">{campos}</div>;

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

        {/* Alternância modo */}
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
        <div className="p-4">{modoCards ? renderPorCards() : renderCompleto()}</div>

        {/* Rodapé */}
        <div className="flex justify-between items-center bg-white border-t border-gray-300 px-4 py-2">
          <div className="flex gap-3">
            <button
              onClick={limparParametros}
              className="flex items-center gap-1 text-red-700 hover:text-red-800 text-sm"
            >
              <RotateCcw size={14} /> Limpar
            </button>
          </div>
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

      {/* Modal de seleção de taxas */}
      {abrirModalTaxas && <ParametroTaxa onClose={() => setAbrirModalTaxas(false)} />}
    </div>
  );
}
