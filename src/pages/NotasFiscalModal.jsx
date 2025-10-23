import { useState } from "react";
import { XCircle, RotateCcw, PlusCircle, Edit, Trash2 } from "lucide-react";
export default function NotaFiscalModal({ isOpen, onClose }) {
  const [dados, setDados] = useState({
    chave: "",
    numero: "",
    serie: "",
    emissao: "",
    volume: "",
    peso: "",
    valor: "",
    tipo: "N",
    icms: "",
    frete: "",
    viagem: "",
    prod: "",
    emb: "",
  });

  const [notas, setNotas] = useState([]);
  const [filtros, setFiltros] = useState({
    filial: "TODAS",
    calculoPor: "",
    periodoDe: "",
    periodoAte: "",
    veiculo: "",
    divisao: "",
  });

  const [registros, setRegistros] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  if (!isOpen) return null;

  // === Adicionar nota manual (Card 1) ===
  const handleAdicionar = () => {
    if (!dados.numero || !dados.chave) {
      alert("Preencha ao menos a Chave e o Nº da Nota.");
      return;
    }
    setNotas((prev) => [
      ...prev,
      {
        serie: dados.serie || "",
        numero: dados.numero || "",
        vols: dados.volume || "0",
        emissao: dados.emissao || "",
        peso: dados.peso || "0,000",
        valor: dados.valor || "0,00",
        cubagem: "0,000",
        pesoCalc: "0,000",
        emb: dados.emb || "",
        prod: dados.prod || "",
        descVol: "",
      },
    ]);
    setDados({
      chave: "",
      numero: "",
      serie: "",
      emissao: "",
      volume: "",
      peso: "",
      valor: "",
      tipo: "N",
      icms: "",
      frete: "",
      viagem: "",
      prod: "",
      emb: "",
    });
  };

  // === Pesquisa de notas no banco (Card 3) ===
  const handlePesquisar = () => {
    // Exemplo: aqui futuramente entrará o fetch() para buscar notas reais
    alert("Pesquisar notas com filtros aplicados (exemplo).");
    setRegistros([
      { id: 1, numero: "12543", serie: "1", emissao: "2025-10-15", valor: "1200,00" },
      { id: 2, numero: "12544", serie: "1", emissao: "2025-10-18", valor: "800,00" },
    ]);
  };

  const handleLimpar = () => {
    setFiltros({
      filial: "TODAS",
      calculoPor: "",
      periodoDe: "",
      periodoAte: "",
      veiculo: "",
      divisao: "",
    });
    setRegistros([]);
    setSelecionados([]);
  };

  const handleSelecionarTodos = () => {
    if (selecionados.length === registros.length) {
      setSelecionados([]);
    } else {
      setSelecionados(registros.map((r) => r.id));
    }
  };

  const handleAdicionarSelecionados = () => {
    if (selecionados.length === 0) {
      alert("Nenhum registro selecionado!");
      return;
    }
    alert(`${selecionados.length} nota(s) adicionada(s)!`);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-[13px]">
      <div className="bg-white w-[850px] rounded shadow-lg border border-gray-300 p-3">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center border-b pb-1 mb-2">
          <h2 className="text-[14px] font-semibold text-gray-700">Notas Fiscais</h2>
          <button
            onClick={onClose}
            className="border border-gray-400 text-[12px] px-3 py-[2px] rounded hover:bg-gray-100"
          >
            Fechar
          </button>
        </div>

        {/* === CARD 1 - FORMULÁRIO DE INCLUSÃO === */}
        <div>
          {/* LINHA 1 */}
          <div className="flex items-center gap-2 mb-[3px]">
            <label className="w-[50px] text-right">Chave</label>
            <input
              type="text"
              value={dados.chave}
              onChange={(e) => setDados({ ...dados, chave: e.target.value })}
              className="border border-gray-300 rounded px-2 h-[22px] flex-1"
            />
            <label className="flex items-center gap-1 text-[12px] ml-2">
              <input type="checkbox" className="w-3 h-3" /> DTA
            </label>
            <label className="w-[20px] text-right">Nº</label>
            <input
              type="text"
              value={dados.numero}
              onChange={(e) => setDados({ ...dados, numero: e.target.value })}
              className="w-[55px] border border-gray-300 rounded px-2 h-[22px]"
            />
            <label className="w-[35px] text-right">Série</label>
            <input
              type="text"
              value={dados.serie}
              onChange={(e) => setDados({ ...dados, serie: e.target.value })}
              className="w-[45px] border border-gray-300 rounded px-2 h-[22px]"
            />
            <label className="w-[55px] text-right">Emissão</label>
            <input
              type="date"
              value={dados.emissao}
              onChange={(e) => setDados({ ...dados, emissao: e.target.value })}
              className="w-[130px] border border-gray-300 rounded px-2 h-[22px]"
            />
          </div>

          {/* LINHA 2 */}
          <div className="flex items-center gap-2 mb-[3px]">
            <label className="w-[30px] text-right">Vol.</label>
            <input
              type="number"
              value={dados.volume}
              onChange={(e) => setDados({ ...dados, volume: e.target.value })}
              className="w-[50px] border border-gray-300 rounded px-2 h-[22px]"
            />
            <label className="w-[35px] text-right">Peso</label>
            <input
              type="text"
              value={dados.peso}
              onChange={(e) => setDados({ ...dados, peso: e.target.value })}
              className="w-[70px] border border-gray-300 rounded px-2 h-[22px]"
            />
            <label className="w-[40px] text-right">Valor</label>
            <input
              type="text"
              value={dados.valor}
              onChange={(e) => setDados({ ...dados, valor: e.target.value })}
              className="w-[70px] border border-gray-300 rounded px-2 h-[22px]"
            />
            <label className="w-[80px] text-right">Situação NF</label>
            <select className="w-[140px] border border-gray-300 rounded px-2 h-[22px]">
              <option>C - Coletada</option>
              <option>E - Emitida</option>
            </select>
            <label className="w-[60px] text-right">ID Vol.</label>
            <input type="text" className="w-[70px] border border-gray-300 rounded px-2 h-[22px]" />
          </div>

          {/* LINHA 3 */}
          <div className="flex items-center gap-2 mb-[3px]">
            <label className="w-[20px] text-right">M³</label>
            <input type="text" className="w-[55px] border border-gray-300 rounded px-2 h-[22px]" />
            <label className="w-[60px] text-right">Peso Calc.</label>
            <input type="text" className="w-[70px] border border-gray-300 rounded px-2 h-[22px]" />
            <label className="w-[35px] text-right">Tipo</label>
            <input
              type="text"
              value={dados.tipo}
              onChange={(e) => setDados({ ...dados, tipo: e.target.value })}
              className="w-[35px] border border-gray-300 rounded px-2 h-[22px] text-center"
            />
            <label className="w-[60px] text-right">M³ → Peso</label>
            <input type="text" className="w-[60px] border border-gray-300 rounded px-2 h-[22px]" />
            <label className="w-[70px] text-right">QT Pallets</label>
            <input type="text" className="w-[60px] border border-gray-300 rounded px-2 h-[22px]" />
            <label className="w-[40px] text-right">ICMS</label>
            <input
              type="text"
              value={dados.icms}
              onChange={(e) => setDados({ ...dados, icms: e.target.value })}
              className="w-[70px] border border-gray-300 rounded px-2 h-[22px]"
            />
          </div>

          {/* LINHA 4 */}
          <div className="flex items-center gap-2 mb-[3px]">
            <label className="w-[40px] text-right">Emb.</label>
            <input
              type="text"
              value={dados.emb}
              onChange={(e) => setDados({ ...dados, emb: e.target.value })}
              className="w-[110px] border border-gray-300 rounded px-2 h-[22px]"
            />
            <label className="w-[40px] text-right">Prod.</label>
            <input
              type="text"
              value={dados.prod}
              onChange={(e) => setDados({ ...dados, prod: e.target.value })}
              className="flex-1 border border-gray-300 rounded px-2 h-[22px]"
            />
          </div>
        </div>

        {/* === CARD 2 - GRID DE NOTAS ADICIONADAS === */}
        <div className="mt-3 border border-gray-300 rounded overflow-hidden">
          <div className="grid grid-cols-11 bg-gray-100 border-b border-gray-300 text-[12px] font-semibold text-gray-700 text-center">
            <div className="py-[3px] border-r">Série</div>
            <div className="py-[3px] border-r">Nº Nota</div>
            <div className="py-[3px] border-r">Vols</div>
            <div className="py-[3px] border-r">DT Emissão</div>
            <div className="py-[3px] border-r">Peso NF</div>
            <div className="py-[3px] border-r">Valor NF</div>
            <div className="py-[3px] border-r">Vol. M³</div>
            <div className="py-[3px] border-r">Cub/Peso Calc</div>
            <div className="py-[3px] border-r">Emb.</div>
            <div className="py-[3px] border-r">Prod.</div>
            <div className="py-[3px]">Descrição Vol.</div>
          </div>

          {notas.length > 0 ? (
            notas.map((n, i) => (
              <div
                key={i}
                className="grid grid-cols-11 border-t border-gray-200 text-[12px] text-center hover:bg-gray-50"
              >
                <div className="py-[3px] border-r">{n.serie}</div>
                <div className="py-[3px] border-r">{n.numero}</div>
                <div className="py-[3px] border-r">{n.vols}</div>
                <div className="py-[3px] border-r">{n.emissao}</div>
                <div className="py-[3px] border-r">{n.peso}</div>
                <div className="py-[3px] border-r">{n.valor}</div>
                <div className="py-[3px] border-r">{n.cubagem}</div>
                <div className="py-[3px] border-r">{n.pesoCalc}</div>
                <div className="py-[3px] border-r">{n.emb}</div>
                <div className="py-[3px] border-r">{n.prod}</div>
                <div className="py-[3px]">{n.descVol}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-2 text-[12px]">
              Nenhuma nota adicionada.
            </div>
          )}
        </div>

        {/* Totais */}
        <div className="flex items-center gap-2 mt-1 border-t border-gray-300 pt-1 text-[12px] text-gray-700">
          <label className="w-[40px] text-right">Vols</label>
          <input
            type="text"
            className="w-[50px] border border-gray-300 rounded px-1 h-[20px] text-right"
            value={notas.reduce((a, n) => a + Number(n.vols || 0), 0)}
            readOnly
          />
          <label className="w-[50px] text-right">QT NFs</label>
          <input
            type="text"
            className="w-[50px] border border-gray-300 rounded px-1 h-[20px] text-right"
            value={notas.length}
            readOnly
          />
        </div>

        {/* === CARD 3 - NOTAS FISCAIS DO REMETENTE === */}
        <div className="border border-gray-300 rounded p-3 mt-3 text-[13px] bg-white">
          <h2 className="text-[14px] font-semibold text-gray-700 mb-2">
            Notas Fiscais do Remetente
          </h2>

          {/* LINHA 1 */}
          <div className="flex items-center gap-2 mb-[4px]">
            <label className="w-[40px] text-right">Filial</label>
            <select
              className="w-[140px] border border-gray-300 rounded px-2 h-[22px]"
              value={filtros.filial}
              onChange={(e) => setFiltros({ ...filtros, filial: e.target.value })}
            >
              <option>TODAS</option>
              <option>001</option>
              <option>002</option>
            </select>

            <label className="w-[70px] text-right">Cálculo por</label>
            <select
              className="w-[150px] border border-gray-300 rounded px-2 h-[22px]"
              value={filtros.calculoPor}
              onChange={(e) => setFiltros({ ...filtros, calculoPor: e.target.value })}
            >
              <option></option>
              <option>Data</option>
              <option>Período</option>
              <option>Veículo</option>
            </select>

            <label className="w-[55px] text-right">Período</label>
            <input
              type="date"
              value={filtros.periodoDe}
              onChange={(e) => setFiltros({ ...filtros, periodoDe: e.target.value })}
              className="w-[130px] border border-gray-300 rounded px-2 h-[22px]"
            />

            <label className="w-[25px] text-right">Até</label>
            <input
              type="date"
              value={filtros.periodoAte}
              onChange={(e) => setFiltros({ ...filtros, periodoAte: e.target.value })}
              className="w-[130px] border border-gray-300 rounded px-2 h-[22px]"
            />

            <button
              onClick={handleLimpar}
              className="border border-gray-400 px-3 py-[2px] rounded text-[12px] hover:bg-gray-100"
            >
              Limpar
            </button>
            <button
              onClick={handlePesquisar}
              className="border border-blue-500 text-blue-600 px-3 py-[2px] rounded text-[12px] hover:bg-blue-50"
            >
              Pesquisar
            </button>
          </div>

          {/* LINHA 2 */}
          <div className="flex items-center gap-2 mb-[6px]">
            <label className="w-[50px] text-right">Veículo</label>
            <input
              type="text"
              value={filtros.veiculo}
              onChange={(e) => setFiltros({ ...filtros, veiculo: e.target.value })}
              className="w-[180px] border border-gray-300 rounded px-2 h-[22px]"
            />
            <label className="w-[50px] text-right">Divisão</label>
            <select
              className="w-[180px] border border-gray-300 rounded px-2 h-[22px]"
              value={filtros.divisao}
              onChange={(e) => setFiltros({ ...filtros, divisao: e.target.value })}
            >
              <option></option>
              <option>1054 - Leo Campinas</option>
              <option>1500 - Leo CD</option>
            </select>
          </div>

          {/* GRID PLACEHOLDER */}
          <div className="border border-gray-300 rounded text-center py-2 text-[12px] text-gray-500">
            {registros.length === 0
              ? "Nenhum registro encontrado."
              : `${registros.length} registro(s) carregado(s).`}
          </div>

          {/* RODAPÉ */}
          <div className="flex justify-between items-center mt-2 text-[12px]">
            <div className="flex gap-2">
              <button
                onClick={handleSelecionarTodos}
                className="border border-gray-400 rounded px-2 py-[2px] flex items-center gap-1 hover:bg-gray-100"
              >
                ☑️ Selecionar Todos
              </button>
              <button
                onClick={() => setSelecionados([])}
                className="border border-gray-400 rounded px-2 py-[2px] flex items-center gap-1 hover:bg-gray-100"
              >
                ❌ Cancelar Seleção
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span>Total Registros:</span>
              <input
                type="text"
                readOnly
                value={registros.length}
                className="w-[50px] border border-gray-300 rounded px-1 h-[20px] text-right"
              />
              <span>Selecionados:</span>
              <input
                type="text"
                readOnly
                value={selecionados.length}
                className="w-[50px] border border-gray-300 rounded px-1 h-[20px] text-right"
              />
            </div>

            <button
              onClick={handleAdicionarSelecionados}
              className="bg-green-600 text-white px-4 py-[2px] rounded hover:bg-green-700 text-[13px]"
            >
              + Adicionar
            </button>
          </div>
        </div>

        {/* === RODAPÉ FINAL DO MODAL === */}
        {/* Rodapé com ícones */}
<div className="border-t border-gray-300 bg-white py-2 px-3 flex items-center gap-3 text-red-700 mt-3">
  <button title="Voltar">
    <RotateCcw size={18} strokeWidth={1.8} />
  </button>
  <button title="Limpar Tela">
    <XCircle size={18} strokeWidth={1.8} />
  </button>
  <button title="Incluir">
    <PlusCircle size={18} strokeWidth={1.8} />
  </button>
  <button title="Alterar">
    <Edit size={18} strokeWidth={1.8} />
  </button>
  <button title="Excluir">
    <Trash2 size={18} strokeWidth={1.8} />
  </button>
</div>
      </div>
    </div>
  );
}
