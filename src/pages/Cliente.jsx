import { useState } from "react";
import CobrancaBancariaModal from "./CobrancaBancariaModal";
import ClienteContato from "./ClienteContato";
import ClienteAgenda from "./ClienteAgenda";
import ClienteContrato from "./ClienteContrato";
import ClienteTabelaFrete from "./ClienteTabelaFrete";
import { useNavigate } from "react-router-dom";
import { useIconColor } from "../context/IconColorContext";



import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  FileSpreadsheet,
  Users,
  Search,
  FileText,
  Briefcase,
  BookUser,
  Phone,
  CalendarDays,
  FileUp,
} from "lucide-react";

function Label({ children, className = "" }) {
  return <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>;
}
function Txt(props) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] ${props.className || ""}`}
    />
  );
}
function Sel({ children, ...rest }) {
  return (
    <select
      {...rest}
      className="border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px]"
    >
      {children}
    </select>
  );
}

export default function Cliente({ open }) {
  const [activeTab, setActiveTab] = useState("cliente");
  const [showParametros, setShowParametros] = useState(false);
  const navigate = useNavigate();

  // 🏠 Endereço (ViaCEP)
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [showCobranca, setShowCobranca] = useState(false);
  const [showContato, setShowContato] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);
  const [showContrato, setShowContrato] = useState(false);
  const [showTabelaFrete, setShowTabelaFrete] = useState(false);
  const { footerIconColorNormal, footerIconColorHover } = useIconColor();


  async function buscarEndereco(valorCep) {
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${valorCep}/json/`);
      const data = await resp.json();
      if (!data.erro) {
        setEndereco(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setUf(data.uf || "");
      }
    } catch (e) {
      console.error("Erro ao buscar CEP:", e);
    }
  }


  // 🔧 ESTADOS E FUNÇÕES DO CARD 1
  const [tpDoc, setTpDoc] = useState("CNPJ");
  const [estrangeiro, setEstrangeiro] = useState(false);
  const [doc, setDoc] = useState("");
  const [fone1, setFone1] = useState("");
  const [fone2, setFone2] = useState("");
  const [operacao, setOperacao] = useState("NORMAL");
  // Estados para a aba de consulta
  const [filtros, setFiltros] = useState({
    filial: "TODAS",
    cidade: "",
    uf: "",
    tipoCliente: "Todos",
    tipoDoc: "CNPJ",
    doc: "",
    fantasia: "",
    razao: "",
  });
  const [resultados, setResultados] = useState([]);

  // Simulação de base local (substituir depois por fetch real)
  const baseClientes = [
    {
      filial: "001",
      doc: "50.221.019/0001-36",
      fantasia: "HNK ITU",
      razao: "HNK BR INDUSTRIA DE BEBIDAS LTDA",
      cidade: "ITU",
      uf: "SP",
      tipo: "Correntista",
    },
    {
      filial: "002",
      doc: "12.345.678/0001-90",
      fantasia: "NATURA",
      razao: "NATURA COSMÉTICOS LTDA",
      cidade: "CAJAMAR",
      uf: "SP",
      tipo: "Eventual",
    },
  ];

  const handlePesquisar = () => {
    const f = filtros;
    const filtrados = baseClientes.filter((c) =>
      (f.filial === "TODAS" || c.filial === f.filial) &&
      (f.cidade === "" || c.cidade.toLowerCase().includes(f.cidade.toLowerCase())) &&
      (f.uf === "" || c.uf.toLowerCase() === f.uf.toLowerCase()) &&
      (f.tipoCliente === "Todos" || c.tipo === f.tipoCliente) &&
      (f.doc === "" || c.doc.replace(/\D/g, "").includes(f.doc.replace(/\D/g, ""))) &&
      (f.fantasia === "" || c.fantasia.toLowerCase().includes(f.fantasia.toLowerCase())) &&
      (f.razao === "" || c.razao.toLowerCase().includes(f.razao.toLowerCase()))
    );
    setResultados(filtrados);
  };

  const handleLimpar = () => {
    setFiltros({
      filial: "TODAS",
      cidade: "",
      uf: "",
      tipoCliente: "Todos",
      tipoDoc: "CNPJ",
      doc: "",
      fantasia: "",
      razao: "",
    });
    setResultados([]);
  };


  const onlyDigits = (v = "") => v.replace(/\D+/g, "");

  const maskCNPJ = (v) =>
    onlyDigits(v)
      .slice(0, 14)
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/(\d{4})(\d)/, "$1-$2");

  const maskCPF = (v) =>
    onlyDigits(v)
      .slice(0, 11)
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const maskPhone = (v) => {
    v = onlyDigits(v).slice(0, 11);
    if (v.length <= 10)
      return v
        .replace(/^(\d{0,2})/, "($1")
        .replace(/^\((\d{2})(\d{0,4})/, "($1) $2")
        .replace(/^\((\d{2})\) (\d{4})(\d{0,4})/, "($1) $2-$3");
    return v
      .replace(/^(\d{0,2})/, "($1")
      .replace(/^\((\d{2})(\d{0,5})/, "($1) $2")
      .replace(/^\((\d{2})\) (\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const handleDocChange = (e) => {
    const v = e.target.value;
    if (estrangeiro) return setDoc(v);
    setDoc(tpDoc === "CNPJ" ? maskCNPJ(v) : maskCPF(v));
  };

  const toggleParametros = () => setShowParametros(!showParametros);


  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${open ? "ml-[192px]" : "ml-[56px]"
        }`}
    >
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        CADASTRO DE CLIENTE
      </h1>

      {/* === ABAS === */}
      <div className="flex border-b border-gray-300 bg-white">
        {["cliente", "consulta"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${activeTab === tab
              ? "bg-white text-red-700 border-gray-300"
              : "bg-gray-100 text-gray-600 border-transparent"
              } ${tab !== "cliente" ? "ml-1" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* === CONTEÚDO === */}
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto flex flex-col gap-2">

        {/* === ABA CLIENTE === */}
        {activeTab === "cliente" && (
          <>
            {/* === CARD 1 - DADOS CLIENTE === */}
            <div className="border border-gray-300 rounded p-2 bg-white space-y-2 w-full">
              {/* === Linha 1 === */}
              <div className="grid grid-cols-[100px_260px_100px_200px_120px_1fr] gap-2 items-center">
                <Label className="text-right">Filial</Label>
                <Sel defaultValue="001 - MANTRAN TRANSPORTES">
                  <option>001 - MANTRAN TRANSPORTES</option>
                  <option>002 - FILIAL EXEMPLO</option>
                </Sel>

                <Label className="text-right">Tp. Cliente</Label>
                <Sel defaultValue="Correntista">
                  <option>Correntista</option>
                  <option>Eventual</option>
                </Sel>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={estrangeiro}
                    onChange={(e) => setEstrangeiro(e.target.checked)}
                  />
                  Estrangeiro
                </label>

                <div className="flex items-center gap-2 justify-end">
                  <Sel
                    className="w-[120px]"
                    value={tpDoc}
                    onChange={(e) => {
                      setTpDoc(e.target.value);
                      setDoc("");
                    }}
                    disabled={estrangeiro}
                  >
                    <option value="CNPJ">CNPJ</option>
                    <option value="CPF">CPF</option>
                  </Sel>
                  <Txt
                    placeholder={estrangeiro ? "Documento Livre" : tpDoc}
                    value={doc}
                    onChange={handleDocChange}
                    inputMode="numeric"
                    className="w-[220px]"
                  />
                </div>
              </div>

              {/* === Linha 2 === */}
              <div className="grid grid-cols-[100px_1fr_100px_1fr] gap-2 items-center">
                <Label className="text-right">Razão Social</Label>
                <Txt />
                <Label className="text-right">Fantasia</Label>
                <Txt />
              </div>

              {/* === Linha 3 === */}
              <div className="grid grid-cols-[100px_1fr_100px_1fr_100px_1fr_100px_1fr] gap-2 items-center">
                <Label className="text-right">Inscr. Estadual</Label>
                <Txt />
                <Label className="text-right">Inscr. Municipal</Label>
                <Txt />
                <Label className="text-right">% Comissão</Label>
                <Txt inputMode="decimal" className="text-right" />
                <Label className="text-right">% Redução ICMS</Label>
                <Txt inputMode="decimal" className="text-right" />
              </div>

              {/* === Linha 4 - CEP, Cidade, UF, Bairro === */}
              <div className="grid grid-cols-[100px_150px_100px_1fr_100px_80px_100px_1fr] gap-2 items-center">
                <Label className="text-right">CEP</Label>
                <Txt
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                    setCep(value.replace(/(\d{5})(\d)/, "$1-$2"));
                    if (value.length === 8) buscarEndereco(value);
                  }}
                  onBlur={() => {
                    const clean = cep.replace(/\D/g, "");
                    if (clean.length === 8) buscarEndereco(clean);
                  }}
                />
                <Label className="text-right">Cidade</Label>
                <Txt value={cidade} onChange={(e) => setCidade(e.target.value)} />

                <Label className="text-right">UF</Label>
                <Txt
                  value={uf}
                  onChange={(e) => setUf(e.target.value.toUpperCase().slice(0, 2))}
                  className="text-center"
                />

                <Label className="text-right">Bairro</Label>
                <Txt value={bairro} onChange={(e) => setBairro(e.target.value)} />
              </div>

              {/* === Linha 5 - Endereço, Nº, Compl === */}
              <div className="grid grid-cols-[100px_1fr_100px_150px_100px_1fr] gap-2 items-center">
                <Label className="text-right">Endereço</Label>
                <Txt value={endereco} onChange={(e) => setEndereco(e.target.value)} />

                <Label className="text-right">Nº</Label>
                <Txt className="text-center" />

                <Label className="text-right">Compl</Label>
                <Txt />
              </div>

              {/* === Linha 6 - Fone, Fone 2, Ativ. Econômica === */}
              <div className="grid grid-cols-[100px_1fr_100px_1fr_130px_1fr] gap-2 items-center">
                <Label className="text-right">Fone</Label>
                <Txt
                  value={fone1}
                  onChange={(e) => setFone1(maskPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  inputMode="numeric"
                />

                <Label className="text-right">Fone 2</Label>
                <Txt
                  value={fone2}
                  onChange={(e) => setFone2(maskPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  inputMode="numeric"
                />

                <Label className="text-right">Ativ. Econômica</Label>
                <Sel>
                  <option>0001 - SERVIÇO DA MESMA NATUREZA TRAN</option>
                  <option>0002 - ESTAB. INDUSTRIAL NORMAL</option>
                  <option>0003 - ESTAB. INDUSTRIAL EXPORTAÇÃO</option>
                  <option>0004 - ESTAB. DE PREST. SERV. COMUNIC</option>
                  <option>0005 - ESTAB. GER. OU DIST. ENE. ELET</option>
                  <option>0006 - DE PRODUTOR RURAL</option>
                  <option>0007 - SERV. TRANSP. A NAO CONTRIB.</option>
                  <option>0008 - ESTAB. COMERCIAL EXPORTAÇÃO</option>
                  <option>0009 - ESTAB. INDUSTRIAL IMPORTAÇÃO</option>
                  <option>0010 - ESTAB. PRESTAÇÃO COMERCIAL</option>
                  <option>0011 - ESTAB. COMERCIAL IMPORTAÇÃO</option>
                  <option>0012 - HEINEKEN PARANAGUA PONTA GROSS</option>
                  <option>0013 - COM VAREJISTA DE MAT ELET</option>
                  <option>0014 - ESTAB. PREST SERV SEGURO</option>
                  <option>0015 - MOAGEM FAB. PROD. OR VEGETAL</option>
                  <option>0016 - COM A VAREJO DE AUTOMOVEIS</option>
                </Sel>
              </div>

              {/* === Linha 7 - Tipo de Carga, Situação, Operação, Cond. ICMS === */}
              <div className="grid grid-cols-[100px_1fr_100px_1fr_100px_1fr_100px_1fr] gap-2 items-center">
                <Label className="text-right">Tipo de Carga</Label>
                <Sel defaultValue="Mista">
                  <option>Mista</option>
                  <option>Fracionada</option>
                  <option>Fechada</option>
                </Sel>

                <Label className="text-right">Situação</Label>
                <Sel defaultValue="NORMAL">
                  <option>NORMAL</option>
                  <option>FORNECEDOR</option>
                  <option>PROSPECT</option>
                  <option>INATIVO</option>
                </Sel>

                <Label className="text-right">Operação</Label>
                <Sel value={operacao} onChange={(e) => setOperacao(e.target.value)}>
                  <option value="NORMAL">NORMAL</option>
                  <option value="BLOQUEADO">BLOQUEADO</option>
                </Sel>

                <Label className="text-right">Cond. ICMS</Label>
                <Sel defaultValue="Regime de Estimativa">
                  <option>Regime de Estimativa</option>
                  <option>Pessoa Fisica</option>
                  <option>Isento</option>
                  <option>Micro Empresa</option>
                  <option>Substituição Tributária</option>
                </Sel>
              </div>

              {/* === Linha 8 - Seguradora, Flags e Vendedor === */}
              <div className="grid grid-cols-[100px_1fr_100px_120px_100px_1fr] gap-2 items-center">
                <Label className="text-right">Seguradora</Label>
                <Sel>
                  <option>002 - LIBERTY SEGUROS</option>
                  <option>003 - PORTO</option>
                  <option>004 - TOKIO</option>
                </Sel>

                <label className="flex items-center gap-2">
                  <input type="checkbox" /> RCF-DC
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> RCTR-C
                </label>

                <Label className="text-right">Vendedor</Label>
                <Txt placeholder="Nome do vendedor" />
              </div>
              {/* === Linha 9 - Tabela de Seguro, Vr Frete Adic., Instrução Protesto === */}
              <div className="grid grid-cols-[100px_1fr_130px_1fr_140px_1fr] gap-2 items-center">
                <Label className="text-right">Tabela de Seguro</Label>
                <Sel defaultValue="">
                  <option value=""> </option>
                  <option>001 - PADRÃO</option>
                  <option>002 - ESPECIAL</option>
                  <option>003 - PERSONALIZADA</option>
                </Sel>

                <Label className="text-right">Vr. Frete Adic.</Label>
                <Txt inputMode="decimal" className="text-right" placeholder="0,00" />

                <Label className="text-right">Instrução Protesto</Label>
                <Txt placeholder="Informe instrução..." />
              </div>

              {/* === Linha 10 - Cód Cliente, Cód Contábil, Cta Reduzida, Cta Compl === */}
              <div className="grid grid-cols-[100px_1fr_100px_1fr_100px_1fr_100px_1fr] gap-2 items-center">
                <Label className="text-right">Cód. Cliente</Label>
                <Txt placeholder="Código interno" />

                <Label className="text-right">Cód. Contábil</Label>
                <Txt placeholder="Conta contábil" />

                <Label className="text-right">Cta Reduzida</Label>
                <Txt />

                <Label className="text-right">Cta Compl.</Label>
                <Txt />
              </div>

              {/* === Linha 11 - Prazo Entrega, Rede/Varejo, Modelo Fatura Dif. === */}
              <div className="grid grid-cols-[100px_100px_30px_1fr_100px_1fr] gap-2 items-center">
                <Label className="text-right">Prazo Entrega</Label>
                <div className="flex items-center gap-1">
                  <Txt inputMode="numeric" className="w-[80px] text-right" />
                  <span className="text-[12px] text-gray-600">Hr.</span>
                </div>

                <div className="flex items-center gap-4 col-span-2">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" /> Rede
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" /> Varejo
                  </label>
                </div>

                <Label className="text-right">Mod. Fatura Dif.</Label>
                <Txt placeholder="Ex: .rpt" />
              </div>

              {/* === Linha 12 - Observação === */}
              <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                <Label className="text-right mt-[4px]">Observação</Label>
                <textarea
                  className="border border-gray-300 rounded px-2 py-1 text-[13px] w-full min-h-[50px] resize-y"
                  placeholder="Digite observações gerais do cliente..."
                ></textarea>
              </div>

              {/* === Linha 13 - Info Fixa CTe === */}
              <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                <Label className="text-right mt-[4px]">Info. Fixa CT-e</Label>
                <textarea
                  className="border border-gray-300 rounded px-2 py-1 text-[13px] w-full min-h-[50px] resize-y"
                  placeholder="Informações fixas que aparecerão no CT-e..."
                ></textarea>
              </div>

            </div>


            {/* === CARD 2 - PARÂMETROS === */}
            <div className="border border-gray-300 rounded bg-white">
              {/* Cabeçalho do card */}
              <div
                onClick={toggleParametros}
                className="flex justify-between items-center px-3 py-1 bg-gray-50 cursor-pointer select-none rounded-t"
              >
                <h2 className="text-red-700 font-semibold text-[13px]">Parâmetros</h2>
                <span className="text-[12px] text-gray-600">
                  {showParametros ? "Ocultar ▲" : "Exibir ▼"}
                </span>
              </div>

              {/* Conteúdo expansível */}
              {showParametros && (
                <div className="p-3 grid grid-cols-4 gap-x-4 gap-y-1 text-[13px]">
                  {[
                    "Cobrar Reentrega",
                    "Inclusão via EDI",
                    "Exibir Tomador",
                    "Apenas CTRC de Serviço",
                    "Localidade Adicional",
                    "Desmonstrativo CTe/NF",
                    "Entrega Diferenciada",
                    "Mostrar observação cliente",
                    "Não permite taxa de coleta CTe Manual",
                    "Origem Frete na Filial",
                    "Destacar ICMS Exportação",
                    "End. entrega observação EDI",
                    "Agrupar CTe por Coleta",
                    "Reter ICMS na emissão da fatura",
                    "Embutir ICMS Analiticamente",
                    "Utiliza crédito de combustível",
                    "ISS Retido",
                    "Considerar Valor Recebimento XML (MultiCTe)",
                    "Gerar CTRC Automático (Serviço)",
                  ].map((label) => (
                    <label key={label} className="flex items-center gap-2 whitespace-nowrap">
                      <input type="checkbox" className="accent-red-700" />
                      {label}
                    </label>
                  ))}
                </div>
              )}

              {/* Linha inferior fixa (status dinâmico) */}
              <div className="border-t border-gray-200 p-2 text-[12px] flex justify-between text-gray-600">
                <div>
                  Status:{" "}
                  <span
                    className={`font-semibold ${operacao === "NORMAL"
                      ? "text-green-700"
                      : operacao === "BLOQUEADO"
                        ? "text-red-700"
                        : "text-gray-500"
                      }`}
                  >
                    {operacao === "NORMAL"
                      ? "Ativo"
                      : operacao === "BLOQUEADO"
                        ? "Bloqueado"
                        : "Indefinido"}
                  </span>
                </div>
                <div>Operador: ADMIN</div>
                <div>Cadastro: 11/11/2025</div>
                <div>Atualização: 11/11/2025</div>
              </div>

            </div>



            {/* === MODAL DE COBRANÇA BANCÁRIA === */}
            <CobrancaBancariaModal
              isOpen={showCobranca}
              onClose={() => setShowCobranca(false)}
            />

            {/* === MODAL DE CONTATO === */}
            <ClienteContato
              isOpen={showContato}
              onClose={() => setShowContato(false)}
            />

            {/* === MODAL DE AGENDA === */}
            <ClienteAgenda
              isOpen={showAgenda}
              onClose={() => setShowAgenda(false)}
            />


            {/* === MODAL DE CONTRATO === */}
            <ClienteContrato
              isOpen={showContrato}
              onClose={() => setShowContrato(false)}
            />

            {/* === MODAL DE TABELA FRETE === */}
            <ClienteTabelaFrete
              isOpen={showTabelaFrete}
              onClose={() => setShowTabelaFrete(false)}
            />

          </>
        )}

        {/* === ABA CONSULTA === */}
        {activeTab === "consulta" && (
          <>
            {/* === CARD DE FILTROS === */}
            <fieldset className="border border-gray-300 rounded p-3">
              <legend className="text-red-700 font-semibold px-2">
                Parâmetros de Pesquisa
              </legend>

              {/* === LINHA 1 === */}
              <div className="grid grid-cols-[100px_250px_100px_1fr_60px_80px_120px_1fr] gap-2 items-center">
                <Label className="text-right">Filial</Label>
                <Sel
                  value={filtros.filial}
                  onChange={(e) => setFiltros({ ...filtros, filial: e.target.value })}
                >
                  <option>TODAS</option>
                  <option>001 - MANTRAN TECNOLOGIAS LTDA ME</option>
                  <option>002 - MANTRAN TECNOLOGIAS VALINHOS</option>
                </Sel>

                <Label className="text-right">Cidade</Label>
                <Txt
                  value={filtros.cidade}
                  onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
                />

                <Label className="text-right">UF</Label>
                <Txt
                  value={filtros.uf}
                  onChange={(e) =>
                    setFiltros({
                      ...filtros,
                      uf: e.target.value.toUpperCase().slice(0, 2),
                    })
                  }
                  className="text-center w-[60px]"
                  maxLength={2}
                />

                <Label className="text-right">Tipo Cliente</Label>
                <Sel
                  value={filtros.tipoCliente}
                  onChange={(e) => setFiltros({ ...filtros, tipoCliente: e.target.value })}
                >
                  <option>Todos</option>
                  <option>Eventual</option>
                  <option>Correntista</option>
                </Sel>
              </div>

              {/* === LINHA 2 === */}
              <div className="grid grid-cols-[100px_120px_200px_100px_1fr_100px_1fr] gap-2 items-center mt-2">
                <Label className="text-right">Documento</Label>
                <Sel
                  className="w-[100px]"
                  value={filtros.tipoDoc}
                  onChange={(e) => setFiltros({ ...filtros, tipoDoc: e.target.value })}
                >
                  <option value="CNPJ">CNPJ</option>
                  <option value="CPF">CPF</option>
                </Sel>
                <Txt
                  value={filtros.doc}
                  onChange={(e) => setFiltros({ ...filtros, doc: e.target.value })}
                  placeholder={
                    filtros.tipoDoc === "CNPJ"
                      ? "00.000.000/0000-00"
                      : "000.000.000-00"
                  }
                />

                <Label className="text-right">Fantasia</Label>
                <Txt
                  value={filtros.fantasia}
                  onChange={(e) => setFiltros({ ...filtros, fantasia: e.target.value })}
                />

                <Label className="text-right">Razão Social</Label>
                <Txt
                  value={filtros.razao}
                  onChange={(e) => setFiltros({ ...filtros, razao: e.target.value })}
                />
              </div>

              {/* === LINHA 3 === */}
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={handleLimpar}
                  className="flex items-center gap-1 border border-gray-300 rounded px-3 py-[4px] text-[12px] hover:bg-gray-100"
                >
                  <RotateCcw size={14} /> Limpar
                </button>
                <button
                  onClick={handlePesquisar}
                  className="flex items-center gap-1 border border-gray-300 rounded px-3 py-[4px] text-[12px] hover:bg-gray-100 text-red-700"
                >
                  <Search size={14} /> Pesquisar
                </button>
              </div>
            </fieldset>

            {/* === GRID DE RESULTADOS === */}
            <fieldset className="border border-gray-300 rounded p-3 mt-2">
              <legend className="text-red-700 font-semibold px-2">Clientes</legend>

              <div className="border border-gray-300 rounded max-h-[400px] overflow-auto mt-2">
                <table className="min-w-full text-[12px] border-collapse">
                  <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                    <tr>
                      {[
                        "Filial",
                        "CNPJ/CPF",
                        "Fantasia",
                        "Razão Social",
                        "Cidade",
                        "UF",
                        "Tp Cliente",
                      ].map((col) => (
                        <th key={col} className="border px-2 py-1 text-left">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center text-gray-400 italic py-2 border"
                        >
                          Nenhum registro encontrado
                        </td>
                      </tr>
                    ) : (
                      resultados.map((c, i) => (
                        <tr
                          key={i}
                          onClick={() => setActiveTab("cliente")}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="border px-2 py-1">{c.filial}</td>
                          <td className="border px-2 py-1">{c.doc}</td>
                          <td className="border px-2 py-1">{c.fantasia}</td>
                          <td className="border px-2 py-1">{c.razao}</td>
                          <td className="border px-2 py-1">{c.cidade}</td>
                          <td className="border px-2 py-1">{c.uf}</td>
                          <td className="border px-2 py-1">{c.tipo}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-[12px] text-gray-600 mt-2 text-right">
                Total de Registros: {resultados.length}
              </div>
            </fieldset>
          </>
        )}



      </div>
      {/* === RODAPÉ FIXO VISÍVEL AO FINAL === */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2 flex justify-between mt-auto z-10 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          {[
            { icon: XCircle, label: "Fechar", action: () => navigate(-1) },

            { icon: RotateCcw, label: "Limpar" },
            { icon: PlusCircle, label: "Incluir" },
            { icon: Edit, label: "Alterar" },
            { icon: Trash2, label: "Excluir" },
          ].map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              onClick={action}
              className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}

            >

              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Botões à direita */}
        <div className="flex gap-3">
          {[
            { icon: FileText, label: "Cobrança Bancária", action: () => setShowCobranca(true) },
            { icon: BookUser, label: "Contato", action: () => setShowContato(true) },
            { icon: CalendarDays, label: "Agenda", action: () => setShowAgenda(true) },
            { icon: Briefcase, label: "Contrato", action: () => setShowContrato(true) },
            { icon: FileSpreadsheet, label: "Tabela Frete", action: () => setShowTabelaFrete(true) },
            { icon: FileUp, label: "Exportar Excel" },
          ].map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              onClick={action}
              className={`flex items-center gap-1 text-[13px] ${footerIconColorNormal} hover:${footerIconColorHover}`}

            >
              <Icon size={16} />
              {label}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}
