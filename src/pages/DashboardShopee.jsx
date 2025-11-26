// src/pages/DashboardShopee.jsx
import { useEffect, useState } from "react";
import {
  Search,
  CheckCircle,
  CircleDot,
  XCircle,
} from "lucide-react";
import { useIconColor } from "../context/IconColorContext";

// RECHARTS 🔥
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
} from "recharts";

/* Helpers visuais */
function Label({ children, className = "" }) {
  return (
    <label className={`text-[12px] text-gray-700 ${className}`}>
      {children}
    </label>
  );
}

function Txt({ className = "", ...rest }) {
  return (
    <input
      {...rest}
      className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] ${className}`}
    />
  );
}

function Sel({ children, className = "", ...rest }) {
  return (
    <select
      {...rest}
      className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] w-full ${className}`}
    >
      {children}
    </select>
  );
}

export default function DashboardShopee({ open }) {
  const { footerIconColorNormal, footerIconColorHover } = useIconColor();

  // Datas atuais
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtualIndex = hoje.getMonth();
  const dia = hoje.getDate();

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const quinzenaDefault = dia <= 15 ? "2ª Quinzena" : "1ª Quinzena";

  /* ============================ ESTADOS ============================ */
  const [filtros, setFiltros] = useState({
    processo: "LAST MILE XPT",
    ano: anoAtual,
    mes: meses[mesAtualIndex],
    quinzena: quinzenaDefault,
    manifesto: false,
    cteComplementar: false,
  });

  const [statusProc, setStatusProc] = useState({
    preFatura: "pendente",
    processando: "pendente",
    finalizado: "pendente",
  });

  const [mostrarGrafico, setMostrarGrafico] = useState(false);

  const [resumo, setResumo] = useState({
    ano: anoAtual,
    mes: meses[mesAtualIndex],
    quinzena: quinzenaDefault,
    importadosPlano: 118006,
    docsShopee: 118006,
    faltaGerar: 90,
    enviandoSefaz: 5,
    autorizadoSefaz: 12378,
    erroApiShopee: 670,
    erroSefaz: 77676,
    viagensCalcular: 0,
  });

  /* VOLUMETRIA */
  const [volumetria, setVolumetria] = useState({
    cteShopee: 80000,
    cteNormal: 20000,
    cteServico: 18006,
  });

  const totalCte =
    volumetria.cteShopee +
    volumetria.cteNormal +
    volumetria.cteServico;

  useEffect(() => {
    setResumo((prev) => ({
      ...prev,
      importadosPlano: totalCte,
      docsShopee: totalCte,
    }));
  }, [totalCte]);

  /* RECEITA / PAGAMENTO */
  const receitaCTe = resumo.autorizadoSefaz * 1.25;
  const receitaCTeServico = 0;
  const receitaTotal = receitaCTe + receitaCTeServico;
  const totalICMS = receitaTotal * 0.18;

  const pagamentoTotalDocs = resumo.autorizadoSefaz;
  const pagamentoFreteViagem = resumo.autorizadoSefaz * 0.8;

  /* ============================ RECHARTS DATA ============================ */
  const dadosGrafico = [
    { name: "Importados Plano", valor: resumo.importadosPlano },
    { name: "CT-e Shopee", valor: resumo.docsShopee },
    { name: "Falta Gerar", valor: resumo.faltaGerar },
    { name: "Enviar Sefaz", valor: resumo.enviandoSefaz },
    { name: "Autorizado", valor: resumo.autorizadoSefaz },
    { name: "Erro API", valor: resumo.erroApiShopee },
    { name: "A Calcular", valor: resumo.viagensCalcular },
  ];

  /* ============================ HANDLERS ============================ */
  const handleFiltroChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePesquisar = () => {
    setMostrarGrafico(true);

    setStatusProc({
      preFatura: "processando",
      processando: "pendente",
      finalizado: "pendente",
    });

    setTimeout(() => {
      setStatusProc((prev) => ({
        ...prev,
        preFatura: "finalizado",
        processando: "processando",
      }));
    }, 800);

    setTimeout(() => {
      setStatusProc({
        preFatura: "finalizado",
        processando: "finalizado",
        finalizado: "finalizado",
      });
    }, 1600);
  };

  /* ============================ RENDER ============================ */
  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 flex flex-col h-[calc(100vh-56px)] ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        DASHBOARD eCOMMERCE - SHOPEE
      </h1>

      <div className="flex-1 p-3 overflow-y-auto bg-white border-x border-b border-gray-300">

        {/* ================== PARÂMETROS ================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 mb-3">
          <fieldset className="border border-gray-300 rounded p-3">
            <legend className="px-2 text-red-700 font-semibold">
              Parâmetros de Pesquisa
            </legend>

            {/* Linha 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2">

              <div>
                <Label>Processo</Label>
                <Sel
                  name="processo"
                  value={filtros.processo}
                  onChange={handleFiltroChange}
                >
                  <option>LAST MILE XPT</option>
                  <option>LAST MILE HUB</option>
                  <option>LINE HAUL</option>
                </Sel>
              </div>

              <div>
                <Label>Ano</Label>
                <Txt
                  name="ano"
                  type="number"
                  value={filtros.ano}
                  onChange={handleFiltroChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label>Mês</Label>
                <Sel
                  name="mes"
                  value={filtros.mes}
                  onChange={handleFiltroChange}
                >
                  {meses.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </Sel>
              </div>

              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label>Quinzena</Label>
                  <Sel
                    name="quinzena"
                    value={filtros.quinzena}
                    onChange={handleFiltroChange}
                  >
                    <option>1ª Quinzena</option>
                    <option>2ª Quinzena</option>
                  </Sel>
                </div>

                <button
                  onClick={handlePesquisar}
                  className="h-[26px] px-3 bg-red-700 text-white rounded hover:bg-red-800 mt-5 flex items-center"
                >
                  <Search size={14} className="mr-1" /> Pesquisar
                </button>
              </div>
            </div>

            {/* Linha 2 */}
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="manifesto"
                  checked={filtros.manifesto}
                  onChange={handleFiltroChange}
                />
                Manifesto
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="cteComplementar"
                  checked={filtros.cteComplementar}
                  onChange={handleFiltroChange}
                />
                CT-e Complementar
              </label>
            </div>
          </fieldset>

          {/* ================== STATUS ================== */}
          <fieldset className="border border-gray-300 rounded p-3">
            <legend className="px-2 text-red-700 font-semibold">
              Status
            </legend>

            <div className="space-y-3 mt-1">

              {/* Pré-fatura */}
              <div className="flex items-center justify-between">
                <span>Pré-Fatura</span>
                <div className="flex items-center gap-2">
                  <CircleDot size={18} className={
                    statusProc.preFatura === "processando"
                      ? "text-red-700"
                      : statusProc.preFatura === "finalizado"
                      ? "text-green-600"
                      : "text-slate-400"
                  }/>

                  <span className="text-[12px]">
                    {statusProc.preFatura}
                  </span>
                </div>
              </div>

              {/* Processando */}
              <div className="flex items-center justify-between">
                <span>Processando</span>
                <div className="flex items-center gap-2">
                  <CircleDot size={18} className={
                    statusProc.processando === "processando"
                      ? "text-red-700"
                      : statusProc.processando === "finalizado"
                      ? "text-green-600"
                      : "text-slate-400"
                  }/>

                  <span className="text-[12px]">
                    {statusProc.processando}
                  </span>
                </div>
              </div>

              {/* Finalizado */}
              <div className="flex items-center justify-between border-t pt-3 mt-2">
                <span>Finalizado</span>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className={
                    statusProc.finalizado === "finalizado"
                      ? "text-green-600"
                      : "text-slate-400"
                  }/>
                  <span className="text-[12px]">
                    {statusProc.finalizado}
                  </span>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        {/* ================== RESUMO ================== */}
        <fieldset className="border border-gray-300 rounded p-3 mb-3">
          <legend className="px-2 text-red-700 font-semibold">
            Resumo por Período
          </legend>

          <div className="overflow-x-auto mt-1">
            <table className="w-full text-[12px]">
              <thead className="bg-gray-100 border">
                <tr>
                  {[
                    "Ano",
                    "Mês",
                    "Quinzena",
                    "Importados Plano",
                    "Docs Shopee",
                    "Falta Gerar",
                    "Enviando Sefaz",
                    "Autorizado",
                    "Erro API Shopee",
                    "Erro SEFAZ",
                    "A Calcular",
                  ].map((col) => (
                    <th key={col} className="border px-1 py-[4px]">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-red-50">
                  <td className="border px-1">{resumo.ano}</td>
                  <td className="border px-1">{resumo.mes}</td>
                  <td className="border px-1">{resumo.quinzena}</td>
                  <td className="border px-1">{resumo.importadosPlano.toLocaleString("pt-BR")}</td>
                  <td className="border px-1">{resumo.docsShopee.toLocaleString("pt-BR")}</td>
                  <td className="border px-1">{resumo.faltaGerar.toLocaleString("pt-BR")}</td>
                  <td className="border px-1">{resumo.enviandoSefaz.toLocaleString("pt-BR")}</td>
                  <td className="border px-1">{resumo.autorizadoSefaz.toLocaleString("pt-BR")}</td>
                  <td className="border px-1">{resumo.erroApiShopee.toLocaleString("pt-BR")}</td>
                  <td className="border px-1">{resumo.erroSefaz.toLocaleString("pt-BR")}</td>
                  <td className="border px-1">{resumo.viagensCalcular.toLocaleString("pt-BR")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>

        {/* ================== GRÁFICO (RECHARTS) ================== */}
        <fieldset className="border border-gray-300 rounded p-3 mb-3">
          <legend className="px-2 text-red-700 font-semibold">
            Gráfico Status Processamento
          </legend>

          <div className="w-full h-[260px]">
            {mostrarGrafico ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-25} textAnchor="end" height={60}/>
                  <YAxis />
                  <Tooltip formatter={(v) => v.toLocaleString("pt-BR")} />
                  <Bar dataKey="valor" fill="#1E90FF" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-400 py-6">
                Clique em <b>Pesquisar</b> para exibir o gráfico
              </div>
            )}
          </div>
        </fieldset>

        {/* ================== RECEITA / PAGAMENTO ================== */}
        <fieldset className="border border-gray-300 rounded p-3 mb-3">
          <legend className="px-2 text-red-700 font-semibold">
            Receita / Pagamento
          </legend>

          {/* RECEITA */}
          <div className="flex items-end gap-3 flex-wrap">
            <span className="font-semibold min-w-[70px]">RECEITA</span>

            <Label>CT-e</Label>
            <Txt readOnly value={receitaCTe.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})} className="w-24" />

            <Label>CT-e Serviço</Label>
            <Txt readOnly value={receitaCTeServico.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})} className="w-24" />

            <Label>Total</Label>
            <Txt readOnly value={receitaTotal.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})} className="w-24" />

            <Label>Total ICMS</Label>
            <Txt readOnly value={totalICMS.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})} className="w-24" />

            <button
              onClick={() => alert("Pesquisar Receita")}
              className="h-[26px] ml-auto px-3 bg-red-700 text-white rounded hover:bg-red-800"
            >
              <Search size={14} className="mr-1 inline-block" /> Pesquisar
            </button>
          </div>

          {/* PAGAMENTO */}
          <div className="flex items-end gap-3 flex-wrap mt-4">
            <span className="font-semibold min-w-[70px]">PAGAMENTO</span>

            <Label>Total Documentos</Label>
            <Txt readOnly value={pagamentoTotalDocs.toLocaleString("pt-BR")} className="w-24" />

            <Label>Total Frete Viagem</Label>
            <Txt readOnly value={pagamentoFreteViagem.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})} className="w-28" />

            <button
              onClick={() => alert("Pesquisar Pagamento")}
              className="h-[26px] ml-auto px-3 bg-red-700 text-white rounded hover:bg-red-800"
            >
              <Search size={14} className="mr-1 inline-block" /> Pesquisar
            </button>
          </div>
        </fieldset>

        {/* ================== VOLUMETRIA ================== */}
        <fieldset className="border border-gray-300 rounded p-3 mb-3">
          <legend className="px-2 text-red-700 font-semibold">
            Volumetria
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <div>
              <Label>CT-e Shopee</Label>
              <Txt readOnly value={volumetria.cteShopee.toLocaleString("pt-BR")} className="w-full" />
            </div>

            <div>
              <Label>CT-e Normal</Label>
              <Txt readOnly value={volumetria.cteNormal.toLocaleString("pt-BR")} className="w-full" />
            </div>

            <div>
              <Label>CT-e Serviço</Label>
              <Txt readOnly value={volumetria.cteServico.toLocaleString("pt-BR")} className="w-full" />
            </div>

            <div>
              <Label>Total CT-e</Label>
              <Txt readOnly value={totalCte.toLocaleString("pt-BR")} className="w-full font-semibold" />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert("Rejeitados")}
              className="h-[26px] px-3 bg-red-700 text-white hover:bg-red-800 border border-gray-300 rounded text-[12px]"
            >
              Rejeitados
            </button>

            <button
              onClick={() => alert("Notas Serviço")}
              className="h-[26px] px-3 bg-red-700 text-white hover:bg-red-800 border border-gray-300 rounded text-[12px]"
            >
              Notas Serviço
            </button>
          </div>
        </fieldset>
      </div>

      {/* ================= FOOTER ================== */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2 flex justify-between mt-auto z-10 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        <div className="flex gap-6">
          <button
            onClick={() => window.history.back()}
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <XCircle size={18} />
            <span>Fechar</span>
          </button>
        </div>

        <div />
      </div>
    </div>
  );
}
