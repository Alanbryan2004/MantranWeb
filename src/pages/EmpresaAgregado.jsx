import { useState } from "react";
import EmpresaAgregadoTabelaFrete from "./EmpresaAgregadoTabelaFrete";
import EmpresaAgregadoVeiculos from "./EmpresaAgregadoVeiculos";
import EmpresaAgregadoMotorista from "./EmpresaAgregadoMotorista";
import { useIconColor } from "../context/IconColorContext";




import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  FileSpreadsheet,
  Users,
  Truck,
  CalendarDays,
  Search,
} from "lucide-react";

/* ===============================
    Helpers
=============================== */
function Label({ children, className = "" }) {
  return (
    <label className={`text-[12px] text-gray-700 ${className}`}>
      {children}
    </label>
  );
}

function Txt(props) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] ${props.className || ""}`}
    />
  );
}

function Sel({ children, className = "", ...rest }) {
  return (
    <select
      {...rest}
      className={`border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] ${className}`}
    >
      {children}
    </select>
  );
}

/* ===============================
    Máscaras
=============================== */
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

const maskCEP = (v) =>
  onlyDigits(v)
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, "$1-$2");

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

/* ===============================
    ViaCEP
=============================== */
async function buscarCEP(cep) {
  try {
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const d = await r.json();
    if (!d.erro) {
      return {
        endereco: d.logradouro || "",
        bairro: d.bairro || "",
        cidade: d.localidade || "",
        uf: d.uf || "",
      };
    }
  } catch (e) {
    console.log("Erro CEP", e);
  }
  return {};
}

/* ===============================
    COMPONENTE PRINCIPAL
=============================== */
export default function EmpresaAgregado({ open }) {
  const [aba, setAba] = useState("cadastro");
  const [showAdicionais, setShowAdicionais] = useState(true);
  const [showTabelaFrete, setShowTabelaFrete] = useState(false);
  const [showVeiculos, setShowVeiculos] = useState(false);
  const [showMotoristas, setShowMotoristas] = useState(false);
const {
  footerIconColorNormal,
  footerIconColorHover
} = useIconColor();

  /* ======== ESTADO DO CADASTRO ======== */
  const [tpDoc, setTpDoc] = useState("CNPJ");
  const [doc, setDoc] = useState("");
  const [dados, setDados] = useState({
    ie: "",
    rntrc: "",
    tipo: "Agregado",
    tpAgregado: "TAC",
    razao: "",
    cep: "",
    endereco: "",
    bairro: "",
    cidade: "",
    uf: "",
    fone1: "",
    fone2: "",
    contrato: "",
    desligamento: "",
    filialVinculo: "",
    banco: "",
    agencia: "",
    conta: "",
    pix: "",
    contato: "",
    favorecido: "",
    obs: "",
    pis: "",
    dependentes: "",
    ciot: "",
    pagBloq: "",
    rg: "",
    dtemissao: "",
    ufemissao: "",
    cpf: "",
    estadoCivil: "",
    nascimento: "",
    localNasc: "",
    sexo: "",
    tabelaFrete: "",
    tipoConta: "",
    capacitador: "",
  });

  const handleDocChange = (e) => {
    const v = e.target.value;
    setDoc(tpDoc === "CNPJ" ? maskCNPJ(v) : maskCPF(v));
  };

  const handleChange = async (e) => {
    let { name, value } = e.target;

    if (name === "cep") {
      value = maskCEP(value);
      if (onlyDigits(value).length === 8) {
        const cepData = await buscarCEP(onlyDigits(value));
        setDados((prev) => ({ ...prev, ...cepData }));
      }
    }

    if (name === "fone1" || name === "fone2") {
      value = maskPhone(value);
    }

    setDados((prev) => ({ ...prev, [name]: value }));
  };

  /* ======== LISTA PARA CONSULTA ======== */
  const [lista, setLista] = useState([
  {
    id: 1,
    tpDoc: "CNPJ",
    doc: "06.083.981/0001-42",
    razao: "FRIENDS TRANSPORTES E COMUNICAÇÕES EIREL",
    ie: "254708108188",
    endereco: "ROD BR 101 - KM 120 SALA1",
    bairro: "SAO VICENTE",
    cidade: "ITAJAI",
    cep: "88301-600",
    uf: "SC",
    contrato: "2025-01-12",
    desligamento: "",
    fone1: "(47) 99999-1111",
    fone2: "",
    banco: "237",
    agencia: "1234",
    conta: "98765-0",
    obs: "",
    tipo: "Agregado",
    tpAgregado:"TAC",
    pagBloq: "Não",
    favorecido: "FRIENDS TRANSPORTES",
    pis: "123456",
    dependentes: "2",
    nascimento: "1990-05-12",
    ciot: "123456789",
    tabelaFrete: "000000 - TABELA PADRÃO",
    dtIncl: "2025-01-01",
    situacao: "Ativos",
  },

  {
    id: 2,
    tpDoc: "CNPJ",
    doc: "91.444.750/0001-03",
    razao: "FRIGORIFICO LAGOEANSE LTDA",
    ie: "1140041964",
    endereco: "EST RS 030",
    bairro: "LAGOA DOS BARROS",
    cidade: "SANTO ANTONIO",
    cep: "95500-000",
    uf: "RS",
    contrato: "2025-02-01",
    desligamento: "",
    fone1: "(51) 99888-2222",
    fone2: "",
    banco: "001",
    agencia: "0001",
    conta: "12345-6",
    obs: "",
    tipo: "Agregado",
    tpAgregado:"ETC",
    pagBloq: "Não",
    favorecido: "FRIGORIFICO LAGOEANSE",
    pis: "654321",
    dependentes: "1",
    nascimento: "1985-01-20",
    ciot: "",
    tabelaFrete: "000001 - MARFRIG",
    dtIncl: "2025-01-05",
    situacao: "Ativos",
  },
]);



  const [filtros, setFiltros] = useState({
    razao: "",
    cidade: "",
    doc: "",
    tipo: "Todos",
    tpAgregado: "Todos",
    empresa: "Todos",
    situacao: "Todos",
    dtIncl: "",
    usarData: false,
  });

 const handlePesquisar = () => {
  const res = lista.filter((l) => {
    const condRazao =
      !filtros.razao ||
      l.razao?.toLowerCase().includes(filtros.razao.toLowerCase());

    const condCidade =
      !filtros.cidade ||
      l.cidade?.toLowerCase().includes(filtros.cidade.toLowerCase());

    const condDoc =
      !filtros.doc ||
      l.doc.replace(/\D+/g, "").includes(filtros.doc.replace(/\D+/g, ""));

    const condTipo =
      filtros.tipo === "Todos" || l.tipo === filtros.tipo;

    const condTpAgregado =
      filtros.tpAgregado === "Todos" || l.tpAgregado === filtros.tpAgregado;

    const condEmpresa =
      filtros.empresa === "Todos" ||
      (filtros.empresa === "Pessoa Física" && l.doc.replace(/\D+/g, "").length <= 11) ||
      (filtros.empresa === "Pessoa Jurídica" && l.doc.replace(/\D+/g, "").length > 11);

    const condSituacao =
      filtros.situacao === "Todos" || l.situacao === filtros.situacao;

    const condData =
      !filtros.usarData || l.dtIncl === filtros.dtIncl;

    return (
      condRazao &&
      condCidade &&
      condDoc &&
      condTipo &&
      condTpAgregado &&
      condEmpresa &&
      condSituacao &&
      condData
    );
  });

  setResultados(res);
};

  const [resultados, setResultados] = useState([]);

  const handleIncluir = () => {
  const novo = {
    id: Date.now(),
    tpDoc,
    doc,
    ...dados,
    dtIncl: new Date().toISOString().slice(0, 10),
    situacao: "Ativos",
  };

  setLista((prev) => [...prev, novo]);
  alert("Registro incluído com sucesso!");
};


  const handleExcluir = () => {
    setLista((prev) => prev.filter((i) => i.doc !== doc));
    alert("Registro removido!");
  };

  const handleLimpar = () => {
    setDoc("");
    setDados({
      ...Object.keys(dados).reduce((o, k) => ({ ...o, [k]: "" }), {}),
    });
  };

  const selecionarLinha = (item) => {
    setAba("cadastro");
    setTpDoc(item.tpDoc);
    setDoc(item.doc);
    setDados({ ...item });
  };

  /* ===============================
      RENDER
  ================================ */
  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        EMPRESA AGREGADO
      </h1>

      {/* ======== ABAS ======== */}
      <div className="flex border-b bg-white">
        {["cadastro", "consulta"].map((t) => (
          <button
            key={t}
            onClick={() => setAba(t)}
            className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${
              aba === t
                ? "bg-white text-red-700 border-gray-300"
                : "bg-gray-100 text-gray-600 border-transparent"
            } ${t !== "cadastro" ? "ml-1" : ""}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto">

        {/* ==================================================
                ABA CADASTRO
        ================================================== */}
        {aba === "cadastro" && (
          <>
            {/* ---------------------------------------------------
                CARD 1 - DADOS EMPRESA
            --------------------------------------------------- */}
            <fieldset className="border border-gray-300 rounded p-3 mb-3">
  <legend className="px-2 text-red-700 font-semibold">Dados Empresa</legend>

 {/* ====== LINHA 1  ====== */}
<div className="grid grid-cols-[100px_180px_1fr_180px_1fr_120px_200px_140px_1fr] gap-3 items-center">
  
  {/* CNPJ / CPF */}
  <Sel
    value={tpDoc}
    onChange={(e) => {
      setTpDoc(e.target.value);
      setDoc("");
    }}
  >
    <option>CNPJ</option>
    <option>CPF</option>
  </Sel>

  {/* Nº do documento */}
  <Txt
    value={doc}
    onChange={handleDocChange}
    placeholder={tpDoc}
  />

  {/* IE */}
  <Label className="text-right">IE</Label>
  <Txt
    name="ie"
    value={dados.ie}
    onChange={handleChange}
  />

  {/* RNTRC */}
  <Label className="text-right">RNTRC</Label>
  <Txt
    name="rntrc"
    value={dados.rntrc}
    onChange={handleChange}
  />

  {/* Tipo */}
  <Label className="text-right">Tipo</Label>
  <Sel name="tipo" value={dados.tipo} onChange={handleChange}>
    <option>Agregado</option>
    <option>Terceirizado</option>
    <option>Cooperativa</option>
  </Sel>

  {/* TAC / ETC */}
  <Sel
    name="tpAgregado"
    value={dados.tpAgregado}
    onChange={handleChange}
  >
    <option>TAC</option>
    <option>ETC</option>
  </Sel>

</div>


  {/* ====== LINHA 2 ====== */}
  <div className="grid grid-cols-[100px_1fr] gap-3 mt-2">
    <Label className="text-right">Razão Social</Label>
    <Txt
      name="razao"
      value={dados.razao}
      onChange={handleChange}
    />
  </div>

  {/* ====== LINHA 3 ====== */}
  <div className="grid grid-cols-[100px_1fr_100px_1fr_80px_1fr] gap-3 mt-2">
    <Label className="text-right">CEP</Label>
    <Txt name="cep" value={dados.cep} onChange={handleChange} />

    <Label className="text-right">Endereço</Label>
    <Txt name="endereco" value={dados.endereco} onChange={handleChange} />

    <Label className="text-right">Bairro</Label>
    <Txt name="bairro" value={dados.bairro} onChange={handleChange} />
  </div>

  {/* ====== LINHA 4 ====== */}
  <div className="grid grid-cols-[100px_1fr_50px_1fr_60px_1fr_70px_1fr] gap-3 mt-2">
    <Label className="text-right">Cidade</Label>
    <Txt name="cidade" value={dados.cidade} onChange={handleChange} />

    <Label className="text-right">UF</Label>
    <Txt
      name="uf"
      maxLength={2}
      className="text-center"
      value={dados.uf}
      onChange={handleChange}
    />

    <Label className="text-right">Fone</Label>
    <Txt name="fone1" value={dados.fone1} onChange={handleChange} />

    <Label className="text-right">Fone 2</Label>
    <Txt name="fone2" value={dados.fone2} onChange={handleChange} />
  </div>

  {/* ====== LINHA 5 ====== */}
  <div className="grid grid-cols-[100px_1fr_110px_1fr_150px_1fr] gap-3 mt-2">
    <Label className="text-right">Contrato</Label>
    
    <Txt
      type="date"
      name="desligamento"
      value={dados.contrato}
      onChange={handleChange}
    />

    <Label className="text-right">Desligamento</Label>
    <Txt
      type="date"
      name="desligamento"
      value={dados.desligamento}
      onChange={handleChange}
    />

    <Label className="text-right">Filial Vinculo</Label>
    <Txt
      name="filialVinculo"
      value={dados.filialVinculo}
      onChange={handleChange}
    />
  </div>

  {/* ====== LINHA 6 ====== */}
<div className="grid grid-cols-[100px_70px_100px_90px_140px_120px_100px_1fr] gap-3 mt-2 items-center">

  <Label className="text-right">Cód. Banco</Label>
  <Txt
    name="banco"
    maxLength={3}
    value={dados.banco}
    onChange={handleChange}
  />

  <Label className="text-right">Agência</Label>
  <Txt
    name="agencia"
    maxLength={6}
    value={dados.agencia}
    onChange={handleChange}
  />

  <Label className="text-right">Conta Corrente</Label>
  <Txt
    name="conta"
    maxLength={10}
    value={dados.conta}
    onChange={handleChange}
  />

  <Label className="text-right">Chave Pix</Label>
  <Txt
    name="pix"
    value={dados.pix}
    onChange={handleChange}
  />

</div>

  {/* ====== LINHA 7 ====== */}
  <div className="grid grid-cols-[100px_1fr_120px_1fr] gap-3 mt-2">
     <Label className="text-right">Contato</Label>
    <Txt name="contato" value={dados.contato} onChange={handleChange} />
    <Label className="text-right">Favorecido Conta</Label>
    <Txt name="favorecido" value={dados.favorecido} onChange={handleChange} />
  </div>

  {/* ====== LINHA 8 ====== */}
  <div className="grid grid-cols-[100px_1fr] gap-3 mt-2">
    <Label className="text-right">Observação</Label>
    <textarea
      name="obs"
      value={dados.obs}
      onChange={handleChange}
      className="border border-gray-300 rounded px-2 py-1 text-[13px] w-full"
      rows={1}
    />
  </div>
</fieldset>


 {/* ---------------------------------------------------
    CARD 2 - ADICIONAIS
--------------------------------------------------- */}
<fieldset className="border border-gray-300 rounded mb-3">
  <legend
    className="px-2 text-red-700 font-semibold flex items-center justify-between cursor-pointer select-none"
    onClick={() => setShowAdicionais(!showAdicionais)}
  >
    Adicionais
    <span className="text-gray-500 text-sm">
      {showAdicionais ? "▲" : "▼"}
    </span>
  </legend>

  {showAdicionais && (
    <div className="p-3">

      {/* ======================= LINHA 1 ======================= */}
      <div
        className="
          grid
          grid-cols-[100px_200px_90px_60px_160px_200px_1fr_110px_100px]
          gap-3 items-center
        "
      >
        <Label className="text-right">PIS</Label>
        <Txt
          name="pis"
          value={dados.pis}
          onChange={handleChange}
        />

        <Label className="text-right">Dependentes</Label>
        <Txt
          name="dependentes"
          value={dados.dependentes}
          onChange={handleChange}
          className="w-[50px] text-center"
          maxLength={2}
        />

        <Label className="text-right">Nº Cartão CIOT</Label>
        <Txt
          name="ciot"
          value={dados.ciot}
          onChange={handleChange}
        />

        {/* coluna vazia para empurrar Pagto Bloq pro final */}
        <div></div>

        <Label className="text-right">Pagto Bloq.</Label>
        <Sel
          name="pagBloq"
          value={dados.pagBloq}
          onChange={handleChange}
          className="min-w-[100px]"
        >
          <option>Não</option>
          <option>Sim</option>
        </Sel>
      </div>

      {/* ======================= LINHA 2 ======================= */}
      <div
        className="
          grid
          grid-cols-[100px_160px_110px_140px_40px_80px_40px_150px_90px_150px]
          gap-3 items-center mt-2
        "
      >
        {/* RG */}
        <Label className="text-right">RG</Label>
        <Txt name="rg" value={dados.rg} onChange={handleChange} />

        {/* Data Emissão */}
        <Label className="text-right">DT Emissão</Label>
        <Txt
          type="date"
          name="dtemissao"
          value={dados.dtemissao}
          onChange={handleChange}
        />

        {/* UF Emissão */}
        <Label className="text-right">UF</Label>
        <Sel
          name="ufemissao"
          value={dados.ufemissao}
          onChange={handleChange}
          className="w-full"
        >
          {[
            "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
            "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
            "RO","RR","RS","SC","SP","SE","TO",
          ].map((uf) => (
            <option key={uf}>{uf}</option>
          ))}
        </Sel>

        {/* CPF */}
        <Label className="text-right">CPF</Label>
        <Txt
          name="cpf"
          value={dados.cpf}
          onChange={(e) =>
            setDados((p) => ({ ...p, cpf: maskCPF(e.target.value) }))
          }
        />

        {/* Estado Civil */}
        <Label className="text-right">Estado Civil</Label>
        <Sel
          name="estadoCivil"
          value={dados.estadoCivil}
          onChange={handleChange}
        >
          <option>Solteiro</option>
          <option>Casado</option>
          <option>Divorciado</option>
          <option>Separado</option>
          <option>Viúvo</option>
          <option>União Estável</option>
        </Sel>
      </div>

      {/* ======================= LINHA 3 ======================= */}
<div
  className="
    grid
    grid-cols-[100px_160px_100px_1fr_60px_70px_100px_150px]
    gap-3 items-center mt-2
  "
>
  <Label className="text-right">Data Nasc.</Label>
  <Txt
    type="date"
    name="nascimento"
    value={dados.nascimento}
    onChange={handleChange}
  />

  <Label className="text-right">Local Nasc.</Label>

  {/* Cidade */}
  <Txt
    name="localNascCidade"
    value={dados.localNascCidade}
    onChange={handleChange}
  />

  <Label className="text-right">UF</Label>

  {/* UF */}
  <Txt
    name="localNascUF"
    value={dados.localNascUF}
    maxLength={2}
    className="text-center"
    onChange={handleChange}
  />

  <Label className="text-right">Sexo</Label>
  <Sel
    name="sexo"
    value={dados.sexo}
    onChange={handleChange}
    className="w-full"
  >
    <option>Masculino</option>
    <option>Feminino</option>
  </Sel>
</div>


      {/* ======================= LINHA 4 ======================= */}
      <div
        className="
          grid
          grid-cols-[100px_200px_120px_1fr]
          gap-3 items-center mt-2
        "
      >
        <Label className="text-right">Tipo Conta</Label>
        <Sel
          name="tipoConta"
          value={dados.tipoConta}
          onChange={handleChange}
        >
          <option>Conta Corrente</option>
          <option>Poupança</option>
          <option>PIX</option>
        </Sel>

        <Label className="text-right">Tabela Frete</Label>
        <Sel
          name="tabelaFrete"
          value={dados.tabelaFrete}
          onChange={handleChange}
          className="w-full"
        >
          <option value="000000">000000 - TABELA PADRÃO</option>
          <option value="000001">000001 - MARFRIG EXPORTAÇÃO/MERCADO INTERNO</option>
          <option value="000002">000002 - ZANCHETTA VENDA</option>
          <option value="000003">000003 - TABELA LOGGI</option>
          <option value="000004">000004 - HEINEKEN CANAIS ESPECIAIS</option>
          <option value="000055">000055 - RODONAVES NATAL TESTE</option>
          <option value="000056">000056 - RODONAVES NATAL</option>
          <option value="000094">000094 - ADIMAX</option>
        </Sel>
      </div>

    </div>
  )}
</fieldset>




            {/* ---------------------------------------------------
                CARD 3 - BOTÕES ESPECIAIS
            --------------------------------------------------- */}
            <div className="flex gap-3 mb-4">
              <button
  onClick={() => setShowTabelaFrete(true)}
  className="border px-3 py-[4px] rounded flex items-center gap-1 text-sm hover:bg-gray-100"
>
  <FileSpreadsheet size={14} /> Tabela Frete
</button>
              <button
  onClick={() => setShowVeiculos(true)}
  className="border px-3 py-[4px] rounded flex items-center gap-1 text-sm hover:bg-gray-100"
>
  <Truck size={14} /> Veículos
</button>
<button
  onClick={() => setShowMotoristas(true)}
  className="border px-3 py-[4px] rounded flex items-center gap-1 text-sm hover:bg-gray-100"
>
  <Users size={14} /> Motoristas
</button>

              <button className="border px-3 py-[4px] rounded flex items-center gap-1 text-sm hover:bg-gray-100">
                <FileSpreadsheet size={14} /> Conta Corrente
              </button>
              <button className="border px-3 py-[4px] rounded flex items-center gap-1 text-sm hover:bg-gray-100">
                <CalendarDays size={14} /> Agend. Eventos
              </button>
            </div>

            {/* ---------------------------------------------------
                RODAPÉ
            --------------------------------------------------- */}
            <div className="flex gap-2 justify-end mt-4">
              <button
    onClick={() => window.history.back()}
    className={`flex flex-col items-center text-[11px] transition 
      ${footerIconColorNormal} hover:${footerIconColorHover}`}
  >
    <XCircle size={18} />
    <span>Fechar</span>
  </button>

  {/* Limpar */}
  <button
    onClick={handleLimpar}
    className={`flex flex-col items-center text-[11px] transition
      ${footerIconColorNormal} hover:${footerIconColorHover}`}
  >
    <RotateCcw size={18} />
    <span>Limpar</span>
  </button>

  {/* Incluir */}
  <button
    onClick={handleIncluir}
    className={`flex flex-col items-center text-[11px] transition
      ${footerIconColorNormal} hover:${footerIconColorHover}`}
  >
    <PlusCircle size={18} />
    <span>Incluir</span>
  </button>

  {/* Alterar */}
  <button
    className={`flex flex-col items-center text-[11px] transition
      ${footerIconColorNormal} hover:${footerIconColorHover}`}
  >
    <Edit size={18} />
    <span>Alterar</span>
  </button>

  {/* Excluir */}
  <button
    onClick={handleExcluir}
    className={`flex flex-col items-center text-[11px] transition
      ${footerIconColorNormal} hover:${footerIconColorHover}`}
  >
    <Trash2 size={18} />
    <span>Excluir</span>
  </button>

  {/* Exportar Excel */}
  <button
    className={`flex flex-col items-center text-[11px] transition
      ${footerIconColorNormal} hover:${footerIconColorHover}`}
  >
    <FileSpreadsheet size={18} />
    <span>Excel</span>
  </button>
            </div>
          </>
        )}

        {/* ==================================================
                ABA CONSULTA
        ================================================== */}
        {aba === "consulta" && (
          <>
           <fieldset className="border border-gray-300 rounded p-3 mb-3 max-w-full">
  <legend className="px-2 text-red-700 font-semibold">Parâmetros</legend>

  {/* LINHA 1 */}
  <div className="grid grid-cols-[100px_1fr_100px_1fr] gap-3 items-center w-full">

    <Label className="text-right">Razão Social</Label>
    <Txt
      value={filtros.razao}
      onChange={(e) => setFiltros({ ...filtros, razao: e.target.value })}
    />

    <Label className="text-right">Cidade</Label>
    <Txt
      value={filtros.cidade}
      onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
    />
  </div>

  {/* LINHA 2 */}
  <div className="grid grid-cols-[100px_1fr_100px_1fr_100px_1fr_100px_1fr] gap-3 mt-2 items-center w-full">

    {/* CPF/CNPJ */}
    <Label className="text-right">CPF/CNPJ</Label>
    <Txt
      value={filtros.doc}
      onChange={(e) =>
        setFiltros({
          ...filtros,
          doc:
            e.target.value.length <= 14
              ? maskCPF(e.target.value)
              : maskCNPJ(e.target.value),
        })
      }
    />

    <Label className="text-right">Tipo</Label>
    <Sel
      value={filtros.tipo}
      onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
    >
      <option>Todos</option>
      <option>Agregado</option>
      <option>Terceirizado</option>
      <option>Cooperativa</option>
    </Sel>

    <Label className="text-right">Tipo Agr.</Label>
    <Sel
      value={filtros.tpAgregado}
      onChange={(e) => setFiltros({ ...filtros, tpAgregado: e.target.value })}
    >
      <option>Todos</option>
      <option>TAC</option>
      <option>ETC</option>
    </Sel>

    <Label className="text-right">Empresa</Label>
    <Sel
      value={filtros.empresa}
      onChange={(e) => setFiltros({ ...filtros, empresa: e.target.value })}
    >
      <option>Todos</option>
      <option>Pessoa Física</option>
      <option>Pessoa Jurídica</option>
    </Sel>
  </div>

  {/* LINHA 3 */}
  <div className="grid grid-cols-[100px_1fr_100px_1fr_1fr_300px] gap-3 mt-2 items-center w-full">

    <Label className="text-right">Situação</Label>
    <Sel
      value={filtros.situacao}
      onChange={(e) => setFiltros({ ...filtros, situacao: e.target.value })}
    >
      <option>Todos</option>
      <option>Ativos</option>
      <option>Inativos</option>
    </Sel>

    <Label className="text-right">Dt Inclusão</Label>
    <Txt
      type="date"
      value={filtros.dtIncl}
      onChange={(e) => setFiltros({ ...filtros, dtIncl: e.target.value })}
    />

    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={filtros.usarData}
        onChange={(e) => setFiltros({ ...filtros, usarData: e.target.checked })}
      />
      Utilizar Data
    </div>

    {/* Botões ajustáveis */}
    <div className="flex justify-end gap-2">

      <button className="border px-3 py-[4px] rounded flex items-center gap-1 hover:bg-gray-100">
        <FileSpreadsheet size={14} /> Exportar
      </button>

      <button
        onClick={() => {
          setFiltros({
            razao: "",
            cidade: "",
            doc: "",
            tipo: "Todos",
            tpAgregado: "Todos",
            empresa: "Todos",
            situacao: "Todos",
            dtIncl: "",
            usarData: false,
          });
          setResultados([]);
        }}
        className="border px-3 py-[4px] rounded flex items-center gap-1 hover:bg-gray-100"
      >
        <RotateCcw size={14} /> Limpar
      </button>

      <button
        onClick={handlePesquisar}
        className="border px-3 py-[4px] rounded flex items-center gap-1 hover:bg-gray-100"
      >
        <Search size={14} /> Pesquisar
      </button>

    </div>
  </div>
</fieldset>


            {/* ------------------------- GRID ------------------------- */}
            <fieldset className="border border-gray-300 rounded p-3 min-w-0">
              <legend className="px-2 text-red-700 font-semibold">
                Resultados
              </legend>

              <div className="block w-full min-w-0 border border-gray-300 rounded bg-white mt-2 max-h-[400px] overflow-auto">
                <table className="min-w-[1600px] text-[12px] border-collapse">
                  <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                    <tr>
                      {[
                        "CNPJ/CPF",
                        "Razão Social",
                        "IE",
                        "Endereço",
                        "Bairro",
                        "Cidade",
                        "CEP",
                        "UF",
                        "Contrato",
                        "Fone",
                        "Fone 2",
                        "DT Contrato",
                        "Desligamento",
                        "Banco",
                        "Agência",
                        "Conta",
                        "Observação",
                        "Tipo",
                        "Pg Bloq",
                        "Favorecido",
                        "PIS",
                        "Dependentes",
                        "Nascimento",
                        "CIOT",
                        "Tabela Frete",
                      ].map((h) => (
                        <th
                          key={h}
                          className="border px-2 py-1 whitespace-nowrap text-left"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {resultados.map((item, i) => (
                      <tr
                        key={item.id}
                        onClick={() => selecionarLinha(item)}
                        className={`cursor-pointer ${
                          i % 2 === 0 ? "bg-orange-50" : "bg-white"
                        } hover:bg-gray-100`}
                      >
                        <td className="border px-2 whitespace-nowrap">{item.doc}</td>
                        <td className="border px-2 whitespace-nowrap">{item.razao}</td>
                        <td className="border px-2 whitespace-nowrap">{item.ie}</td>
                        <td className="border px-2 whitespace-nowrap">{item.endereco}</td>
                        <td className="border px-2 whitespace-nowrap">{item.bairro}</td>
                        <td className="border px-2 whitespace-nowrap">{item.cidade}</td>
                        <td className="border px-2 whitespace-nowrap">{item.cep}</td>
                        <td className="border px-2 whitespace-nowrap">{item.uf}</td>
                        <td className="border px-2 whitespace-nowrap">{item.contrato}</td>
                        <td className="border px-2 whitespace-nowrap">{item.fone1}</td>
                        <td className="border px-2 whitespace-nowrap">{item.fone2}</td>
                        <td className="border px-2 whitespace-nowrap"></td>
                        <td className="border px-2 whitespace-nowrap">{item.desligamento}</td>
                        <td className="border px-2 whitespace-nowrap">{item.banco}</td>
                        <td className="border px-2 whitespace-nowrap">{item.agencia}</td>
                        <td className="border px-2 whitespace-nowrap">{item.conta}</td>
                        <td className="border px-2 whitespace-nowrap">{item.obs}</td>
                        <td className="border px-2 whitespace-nowrap">{item.tipo}</td>
                        <td className="border px-2 whitespace-nowrap">{item.pagBloq}</td>
                        <td className="border px-2 whitespace-nowrap">{item.favorecido}</td>
                        <td className="border px-2 whitespace-nowrap">{item.pis}</td>
                        <td className="border px-2 whitespace-nowrap">{item.dependentes}</td>
                        <td className="border px-2 whitespace-nowrap">{item.nascimento}</td>
                        <td className="border px-2 whitespace-nowrap">{item.ciot}</td>
                        <td className="border px-2 whitespace-nowrap">{item.tabelaFrete}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right text-[12px] mt-2 text-gray-600">
                Total de Registros: {resultados.length}
              </div>
            </fieldset>
          </>
        )}
      </div>

  {/* === CHAMADA DO MODAL TABELA FRETE === */}
      {showTabelaFrete && (
        <EmpresaAgregadoTabelaFrete
          onClose={() => setShowTabelaFrete(false)}
          cnpj={doc}
          razao={dados.razao}
        />
      )}

      {showVeiculos && (
  <EmpresaAgregadoVeiculos
    onClose={() => setShowVeiculos(false)}
    onCadastroVeiculo={() => {
      setShowVeiculos(false);     // fecha a lista
      alert("Abrir tela Veiculo.jsx");  // aqui você chama sua tela real
    }}
  />
)}

{showMotoristas && (
  <EmpresaAgregadoMotorista
    onClose={() => setShowMotoristas(false)}
    onCadastroMotorista={() => {
      setShowMotoristas(false);
      alert("Abrir tela CadastroMotorista.jsx");
    }}
    onContratoCooperativa={() => {
      alert("Abrir tela ContratoCooperativa.jsx");
    }}
  />
)}


    </div>
  );
}
