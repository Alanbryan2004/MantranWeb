import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsultaNFSE from "./ConsultaNFSE";
import NFSEDoc from "./NFSEDoc"; // <-- modal de documentos
import { useIconColor } from "../context/IconColorContext";
import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  Ban,
  Undo2,
  Send,
  Printer,
} from "lucide-react";

function Label({ children, className = "" }) {
  return (
    <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>
  );
}
function Txt(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 rounded px-2 py-[2px] h-[26px] " +
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
        "border border-gray-300 rounded px-2 py-[2px] h-[26px] " + className
      }
    >
      {children}
    </select>
  );
}

/* ===========================
   MOCK DE NOTAS NFSE
=========================== */
const nfseMock = [
  {
    id: 1,
    emp: "001",
    fil: "001",
    nf: "056555",
    serie: "5",
    dtISO: "2025-01-20",
    dtExib: "20/01/2025 00:00:00",
    cgc: "42446277004694",
    cliente: "SHPX LOGISTICA LTDA",
    valor: "0,00",
  },
  {
    id: 2,
    emp: "001",
    fil: "001",
    nf: "000274",
    serie: "1",
    dtISO: "2025-04-04",
    dtExib: "04/04/2025 00:00:00",
    cgc: "42446277000273",
    cliente: "SHPX LOGISTICA LTDA",
    valor: "0,00",
  },
  {
    id: 3,
    emp: "001",
    fil: "001",
    nf: "000274",
    serie: "1",
    dtISO: "2025-01-16",
    dtExib: "16/01/2025 00:00:00",
    cgc: "50221019000136",
    cliente: "HNK-ITU (1) MATRIZ",
    valor: "0,00",
  },
  {
    id: 4,
    emp: "001",
    fil: "001",
    nf: "000272",
    serie: "1",
    dtISO: "2025-05-06",
    dtExib: "06/05/2025 00:00:00",
    cgc: "0525495700651",
    cliente: "HNK-ITAJAI",
    valor: "100,00",
  },
  {
    id: 5,
    emp: "001",
    fil: "001",
    nf: "000001",
    serie: "005",
    dtISO: "2025-05-07",
    dtExib: "07/05/2025 00:00:00",
    cgc: "50221019000136",
    cliente: "HNK-ITU (1) MATRIZ",
    valor: "120,00",
  },
];

/* Helper para converter dtISO (yyyy-MM-dd) em string para input date */
function isoOrDefault(dtISO, fallback) {
  return dtISO || fallback;
}

export default function NFSEPage({ open }) {
  const [activeTab, setActiveTab] = useState("cadastro");
  const [showConsultaNFSE, setShowConsultaNFSE] = useState(false);

  // ====== FORM CADASTRO (apenas para exibir seleção da consulta) ======
  const [selectedNF, setSelectedNF] = useState(null);

  const cadastroKey = selectedNF
    ? `${selectedNF.emp}-${selectedNF.fil}-${selectedNF.nf}-${selectedNF.serie}`
    : "novo";

  // ====== FILTROS / RESULTADO CONSULTA (MOCK) ======
  const [filtros, setFiltros] = useState({
    empresa: "001",
    filial: "001",
    nf: "",
    serie: "",
    cgc: "",
    cliente: "",
    dtInicio: "2025-01-01",
    dtFim: "2025-10-20",
  });

  // ====== ITENS DA NF (CARD 2) ======
  // continue usando MOCK, mas agora controlado por estado
  const [itens, setItens] = useState([
    {
      id: 1,
      descricao: "Serviço de Transporte",
      qtde: 1,
      valor: "1.000,00",
      total: "1.000,00",
      natureza: "N",
    },
  ]);

  const [linhaSelecionadaId, setLinhaSelecionadaId] = useState(null);
    const [showDoc, setShowDoc] = useState(false);

  // chamado pelo modal NFSEDoc ao confirmar
  const handleConfirmItensModal = (itensDoModal) => {
    // itensDoModal deve ser um array de itens no mesmo formato do estado itens
    setItens(itensDoModal || []);
    setLinhaSelecionadaId(null);
  };

  const handleExcluirItemCard2 = () => {
    if (!linhaSelecionadaId) return;
    setItens((prev) => prev.filter((i) => i.id !== linhaSelecionadaId));
    setLinhaSelecionadaId(null);
  };

  const [resultadoConsulta, setResultadoConsulta] = useState(nfseMock);

  const handleFiltroChange = (campo) => (e) => {
    setFiltros((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const handlePesquisar = () => {
    let dados = [...nfseMock];

    if (filtros.empresa) {
      dados = dados.filter((n) => n.emp === filtros.empresa);
    }
    if (filtros.filial) {
      dados = dados.filter((n) => n.fil === filtros.filial);
    }
    if (filtros.nf) {
      dados = dados.filter((n) =>
        n.nf.toLowerCase().includes(filtros.nf.toLowerCase())
      );
    }
    if (filtros.serie) {
      dados = dados.filter((n) =>
        n.serie.toLowerCase().includes(filtros.serie.toLowerCase())
      );
    }
    if (filtros.cgc) {
      dados = dados.filter((n) =>
        n.cgc.toLowerCase().includes(filtros.cgc.toLowerCase())
      );
    }
    if (filtros.cliente) {
      dados = dados.filter((n) =>
        n.cliente.toLowerCase().includes(filtros.cliente.toLowerCase())
      );
    }

    if (filtros.dtInicio) {
      dados = dados.filter((n) => n.dtISO >= filtros.dtInicio);
    }
    if (filtros.dtFim) {
      dados = dados.filter((n) => n.dtISO <= filtros.dtFim);
    }

    setResultadoConsulta(dados);
  };

  const handleSelecionarNota = (row) => {
    setSelectedNF(row);
    setActiveTab("cadastro");
  };

  const navigate = useNavigate();
  const { footerIconColorNormal, footerIconColorHover } = useIconColor();

  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      {/* Título */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        NOTA FISCAL DE SERVIÇO (NFSE)
      </h1>

      {/* Abas */}
      <div className="flex border-b border-gray-300 bg-white">
        <button
          onClick={() => setActiveTab("cadastro")}
          className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${
            activeTab === "cadastro"
              ? "bg-white text-red-700 border-gray-300"
              : "bg-gray-100 text-gray-600 border-transparent"
          }`}
        >
          Cadastro
        </button>
        <button
          onClick={() => setActiveTab("consulta")}
          className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ml-1 ${
            activeTab === "consulta"
              ? "bg-white text-red-700 border-gray-300"
              : "bg-gray-100 text-gray-600 border-transparent"
          }`}
        >
          Consulta
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-3 bg-white border-x border-b border-gray-200 rounded-b-md flex flex-col gap-3 max-h-[calc(100vh-160px)] overflow-y-auto">
        {activeTab === "cadastro" ? (
          <>
            {/* --- CARD 1 - NÃO ALTERADO --- */}
            <fieldset
              key={cadastroKey}
              className="border border-gray-300 rounded p-2 bg-white space-y-3"
            >
             

              {/* Linha 01 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                {/* Empresa */}
                <Label className="col-span-1 text-right">Empresa</Label>
                <Sel
                  className="col-span-3 min-w-[200px]"
                  defaultValue={selectedNF?.emp || "001"}
                >
                  <option value="001">001 - MANTRAN TRANSPORTES LTDA</option>
                </Sel>

                {/* Filial */}
                <Label className="col-span-1 text-right">Filial</Label>
                <Sel
                  className="col-span-3 min-w-[180px]"
                  defaultValue={selectedNF?.fil || "001"}
                >
                  <option value="001">001 - TESTE MANTRAN</option>
                </Sel>

                <Label className="col-span-1 text-right">Fatura</Label>
                <Txt className="col-span-1 text-center" maxLength={9} />

                {/* Nº NFSE — sempre no fim da linha */}
                <Label className="col-span-1 text-right">Nº NFSE</Label>
                <Txt className="col-span-1 w-[100px]" />
              </div>

              {/* Linha 02 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Nº NF</Label>

                {/* Nº NF */}
                <Txt
                  className="col-span-1 w-[130px]"
                  defaultValue={selectedNF?.nf || ""}
                />

                {/* Série, coladinho e 3 dígitos */}
                <Txt
                  className="col-span-1 w-[50px] text-center ml-10"
                  maxLength={3}
                  defaultValue={selectedNF?.serie || ""}
                />

                <Label className="col-span-2 text-right">Cadastro</Label>
                <Txt
                  type="date"
                  className="col-span-3"
                  defaultValue={isoOrDefault(selectedNF?.dtISO, "2025-10-20")}
                />

                <Label className="col-span-3 text-right">CFOP</Label>
                <Txt className="col-span-1 text-center" maxLength={4} />
              </div>

              {/* Linha 03 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Cliente</Label>

                <Txt
                  className="col-span-2"
                  maxLength={14}
                  placeholder="CNPJ"
                  defaultValue={selectedNF?.cgc || ""}
                />

                <Txt
                  className="col-span-4"
                  maxLength={50}
                  placeholder="Razão Social"
                  defaultValue={selectedNF?.cliente || ""}
                />

                <Txt className="col-span-4" placeholder="Cidade" />
                <Txt
                  className="col-span-1 text-center"
                  placeholder="UF"
                  maxLength={2}
                />
              </div>

              {/* Linha 04 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Natureza</Label>
                <Sel className="col-span-3">
                  <option>PRESTAÇÃO DE SERVIÇO</option>
                  <option>DEVOLUÇÃO DE SERVIÇO</option>
                </Sel>

                <Label className="col-span-1 text-right">Tipo Serv.</Label>
                <Sel className="col-span-2">
                  <option>TRANSPORTES</option>
                  <option>SERVIÇOS GERAIS</option>
                  <option>REEMBOLSO</option>
                  <option>REEMBOLSO ARMAZÉM</option>
                  <option>REEMBOLSO DESCARGA</option>
                  <option>ESCOLTA</option>
                </Sel>

                {/* Cancelamento somente leitura */}
                <Label className="col-span-3 text-right">Cancelamento</Label>
                <Txt
                  className="col-span-2 text-center bg-gray-100 text-gray-600"
                  readOnly
                  defaultValue="20/10/2025"
                />
              </div>
            </fieldset>

            {/* --- CARD 2 — NOVO LAYOUT (GRID + BOTÕES) --- */}
            <div className="border border-gray-300 rounded p-2 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-red-700 font-semibold text-[13px]">
                  Itens da Nota Fiscal de Serviço
                </h2>

                <div className="flex gap-2">
                  {/* Incluir abre NFSEDoc */}
                  <button
                    type="button"
                    onClick={() => setShowDoc(true)}
                    className="flex items-center gap-1 border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-2 py-[3px] text-[12px]"
                    title="Incluir itens via documentos"
                  >
                    <PlusCircle size={15} className="text-green-700" />
                    <span>Incluir</span>
                  </button>

                  {/* Excluir item selecionado */}
                  <button
                    type="button"
                    onClick={handleExcluirItemCard2}
                    className="flex items-center gap-1 border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-2 py-[3px] text-[12px]"
                    title="Excluir item selecionado"
                  >
                    <Trash2 size={15} className="text-red-700" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>

              {/* Grid de itens */}
              <div className="border border-gray-300 rounded overflow-auto max-h-[260px]">
                <table className="min-w-full text-[12px] border-collapse">
                  <thead className="bg-gray-100 border-b border-gray-300 text-gray-700">
                    <tr>
                      <th className="px-2 py-1 border-r text-left">
                        Descrição do Item
                      </th>
                      <th className="px-2 py-1 border-r text-center">Qtde</th>
                      <th className="px-2 py-1 border-r text-center">Valor</th>
                      <th className="px-2 py-1 border-r text-center">
                        Total Item
                      </th>
                      <th className="px-2 py-1 text-center">Natureza</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.map((linha) => (
                      <tr
                        key={linha.id}
                        className={`cursor-pointer ${
                          linhaSelecionadaId === linha.id
                            ? "bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setLinhaSelecionadaId(linha.id)}
                      >
                        <td className="border-t border-gray-200 px-2 py-[3px]">
                          {linha.descricao}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {linha.qtde}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {linha.valor}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {linha.total}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {linha.natureza}
                        </td>
                      </tr>
                    ))}

                    {itens.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="border-t border-gray-200 px-2 py-2 text-center text-gray-500"
                        >
                          Nenhum item lançado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CARD 3 — Tributações (sem alterações) */}
            <div className="border border-gray-300 rounded p-2 bg-white space-y-2">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Tributações da Nota Fiscal de Serviço
              </h2>

              {/* Linha 1 */}
              <div className="flex items-center gap-2 flex-wrap text-[12px]">
                <Label className="w-[80px] text-right">%VR Líquido</Label>
                <Txt className="w-[70px] text-center" defaultValue="0" />

                <Label className="w-[60px] text-right">Trib ISS</Label>
                <Sel className="w-[120px]">
                  <option>EXIGIVEL</option>
                  <option>NÃO INCIDÊNCIA</option>
                  <option>ISENÇÃO</option>
                  <option>EXPORTAÇÃO</option>
                  <option>IMUNIDADE</option>
                  <option>EXIGIBILIDADE SUSPENSA</option>
                </Sel>

                <Label className="w-[50px] text-right">Retido?</Label>
                <input type="checkbox" className="w-4 h-4" />

                <Label className="w-[70px] text-right">VR ISSQN</Label>
                <Txt className="w-[70px] text-center" defaultValue="0" />

                <Label className="w-[40px] text-right">%PIS</Label>
                <Txt className="w-[60px] text-center" defaultValue="0,00" />

                <Label className="w-[55px] text-right">%COFINS</Label>
                <Txt className="w-[60px] text-center" defaultValue="0,00" />

                <Label className="w-[90px] text-right">Divisão/Loja</Label>
                <Sel className="flex-1 min-w-[160px] max-w-[250px]">
                  <option>1054 - LEO CAMPINAS</option>
                  <option>1500 - LEO CD</option>
                </Sel>
              </div>

              {/* Linha 2 */}
              <div className="flex items-center gap-2 flex-wrap text-[12px]">
                <Label className="w-[80px] text-right">Total Serviço</Label>
                <Txt className="w-[70px] text-center" defaultValue="0" />

                <Label className="w-[40px] text-right">%IRRF</Label>
                <Txt className="w-[60px] text-center" defaultValue="0" />

                <Label className="w-[70px] text-right">Valor IRRF</Label>
                <Txt className="w-[70px] text-center" defaultValue="0" />

                <Label className="w-[40px] text-right">%ISQN</Label>
                <Txt className="w-[60px] text-center" defaultValue="0" />

                <Sel className="flex-1 min-w-[160px] max-w-[250px]">
                  <option>
                    Operação Tributável (Base de Calculo = Valor da Operação
                    alíquota normal)
                  </option>
                  <option>
                    Operação Tributável (Base de Calculo = Valor da Operação
                    alíquota diferenciada)
                  </option>
                  <option>
                    Operação Tributável (Base de Calculo = quantidade vendida x
                    aliquota por unidade)
                  </option>
                  <option>
                    Operação Tributável (Tributação monofásica(alíquota zero))
                  </option>
                  <option>Operação Tributável (Substituição Tributária)</option>
                  <option>Operação Tributável (alíquota zero)</option>
                  <option>Operação Isenta da Contribuição</option>
                </Sel>
              </div>

              {/* Linha 3 - Observação */}
              <div className="flex items-center gap-2 text-[12px]">
                <Label className="w-[80px] text-right">Observação</Label>
                <Txt
                  className="flex-1"
                  placeholder="Digite aqui observações adicionais..."
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* --- CONSULTA (SEM ALTERAÇÃO) --- */}
            {/* CARD 1 - Filtros */}
            <div className="border border-gray-300 rounded p-2 bg-white space-y-2">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Parâmetros de Pesquisa
              </h2>

              {/* Linha 1 - Empresa e Filial ocupando toda a largura do card */}
              <div className="flex items-center gap-3 w-full">
                <Label className="w-[70px] text-right">Empresa</Label>
                <Sel
                  className="flex-[1.5]"
                  value={filtros.empresa}
                  onChange={handleFiltroChange("empresa")}
                >
                  <option value="001">001 - MANTRAN TRANSPORTES LTDA</option>
                </Sel>
                <Label className="w-[300px] text-right">Filial</Label>
                <Sel
                  className="flex-[1]"
                  value={filtros.filial}
                  onChange={handleFiltroChange("filial")}
                >
                  <option value="001">
                    001 - MANTRAN TECNOLOGIAS LTDA ME
                  </option>
                  <option value="002">
                    002 - MANTRAN TECNOLOGIAS FILIAL 002
                  </option>
                  <option value="003">
                    003 - MANTRAN TECNOLOGIAS FILIAL 003
                  </option>
                </Sel>
              </div>

              {/* Linha 2 - Nº NF, Série, Cliente (CNPJ e Razão), Período */}
              <div className="flex items-center gap-3">
                <Label className="w-[70px] text-right">Nº NF</Label>
                <Txt
                  className="w-[100px]"
                  value={filtros.nf}
                  onChange={handleFiltroChange("nf")}
                />
                <Label className="w-[40px] text-right">Série</Label>
                <Txt
                  className="w-[80px]"
                  value={filtros.serie}
                  onChange={handleFiltroChange("serie")}
                />
                <Label className="w-[60px] text-right">Cliente</Label>
                <Txt
                  className="w-[160px]"
                  maxLength={14}
                  placeholder="CNPJ"
                  value={filtros.cgc}
                  onChange={handleFiltroChange("cgc")}
                />
                <Txt
                  className="flex-1"
                  maxLength={50}
                  placeholder="Razão Social"
                  value={filtros.cliente}
                  onChange={handleFiltroChange("cliente")}
                />
                <Label className="w-[60px] text-right">Período</Label>
                <Txt
                  type="date"
                  className="w-[130px]"
                  value={filtros.dtInicio}
                  onChange={handleFiltroChange("dtInicio")}
                />
                <Label className="w-[20px] text-center">até</Label>
                <Txt
                  type="date"
                  className="w-[130px]"
                  value={filtros.dtFim}
                  onChange={handleFiltroChange("dtFim")}
                />
              </div>

              {/* Linha 3 - Botão Pesquisar alinhado à direita */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={handlePesquisar}
                  className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-4 h-[28px] text-[12px] text-gray-700 font-medium"
                >
                  Pesquisar
                </button>
              </div>
            </div>

            {/* CARD 2 - Grid */}
            <div className="border border-gray-300 rounded p-2 bg-white flex flex-col">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Relação de Notas Fiscais de Serviço
              </h2>

              <div className="border border-gray-300 rounded overflow-auto">
                <table className="min-w-full text-[12px] border-collapse">
                  <thead className="bg-gray-100 border-b border-gray-300 text-gray-700">
                    <tr>
                      <th className="px-2 py-1 border-r">Empresa</th>
                      <th className="px-2 py-1 border-r">Filial</th>
                      <th className="px-2 py-1 border-r">Nº NF</th>
                      <th className="px-2 py-1 border-r">Série</th>
                      <th className="px-2 py-1 border-r">DT Cadastro</th>
                      <th className="px-2 py-1 border-r">CGC</th>
                      <th className="px-2 py-1 border-r">Cliente</th>
                      <th className="px-2 py-1">Valor NF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultadoConsulta.map((row, i) => (
                      <tr
                        key={row.id}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        onClick={() => handleSelecionarNota(row)}
                      >
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {row.emp}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {row.fil}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {row.nf}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {row.serie}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {row.dtExib}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">
                          {row.cgc}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px]">
                          {row.cliente}
                        </td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-right">
                          {row.valor}
                        </td>
                      </tr>
                    ))}
                    {resultadoConsulta.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center text-gray-500 py-2"
                        >
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total de Notas */}
              <div className="flex justify-between items-center mt-1 text-[12px] text-gray-700">
                <span>Total de Notas: {resultadoConsulta.length}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* RODAPÉ - sempre visível (como Motorista) */}
      <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">
        {/* FECHAR */}
        <button
          onClick={() => navigate("/")}
          title="Fechar Tela"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <XCircle size={18} />
          <span>Fechar</span>
        </button>

        {/* LIMPAR */}
        <button
          title="Limpar Tela"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <RotateCcw size={18} />
          <span>Limpar</span>
        </button>

        {/* INCLUIR */}
        <button
          title="Incluir"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <PlusCircle size={18} />
          <span>Incluir</span>
        </button>

        {/* ALTERAR */}
        <button
          title="Alterar"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Edit size={18} />
          <span>Alterar</span>
        </button>

        {/* EXCLUIR */}
        <button
          title="Excluir"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Trash2 size={18} />
          <span>Excluir</span>
        </button>

        {/* CANCELAR */}
        <button
          title="Cancelar"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Ban size={18} />
          <span>Cancelar</span>
        </button>

        {/* ESTORNAR */}
        <button
          title="Estornar"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Undo2 size={18} />
          <span>Estornar</span>
        </button>

        {/* ENVIAR */}
        <button
          onClick={() => setShowConsultaNFSE(true)}
          title="Enviar"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Send size={18} />
          <span>Enviar</span>
        </button>

        {/* IMPRIMIR */}
        <button
          title="Imprimir"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Printer size={18} />
          <span>Imprimir</span>
        </button>
      </div>

      {/* Modais */}
      {showConsultaNFSE && (
        <ConsultaNFSE
          isOpen={showConsultaNFSE}
          onClose={() => setShowConsultaNFSE(false)}
        />
      )}

          
  {showDoc && (
  <NFSEDoc
    isOpen={showDoc}
    onClose={() => setShowDoc(false)}
    onConfirm={(item) => setItens((prev) => [...prev, item])}
  />
)}


    </div>
  );
}
