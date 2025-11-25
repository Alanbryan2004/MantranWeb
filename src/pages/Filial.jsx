// src/pages/Filial.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIconColor } from "../context/IconColorContext";
import FilialParametro from "./FilialParametro";
import FilialNumeracao from "./FilialNumeracao";

import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  SlidersHorizontal,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ========================= Helpers ========================= */
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
      className={
        "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] " +
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
        "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] " +
        className
      }
    >
      {children}
    </select>
  );
}

/* ========================= Máscaras (padrão Empresa.jsx) ========================= */
const onlyDigits = (v = "") => v.replace(/\D+/g, "");

const maskCNPJ = (v) =>
  onlyDigits(v)
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/(\d{4})(\d)/, "$1-$2");

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

/* ========================= Buscar CEP ========================= */
async function buscarCEP(cep, setFilial) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      setFilial((prev) => ({
        ...prev,
        endereco: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        uf: data.uf || "",
      }));
    }
  } catch (err) {
    console.log("Erro ao buscar CEP:", err);
  }
}


/* ========================= Component ========================= */

const initialFilial = {
  codigo: "",
  cnpj: "",
  razao: "",
  sigla: "",
  empresa: "001 - MANTRAN TRANSPORTES LTDA",
  cep: "",
  endereco: "",
  numero: "",
  cidade: "",
  uf: "SP",
  bairro: "",
  cnae: "",
  im: "",
  email: "",
  emailOcor: "",
  fone: "",
  fone2: "",
  ie: "",
  envio: "",
  receb: "",
  autotrac: "",
  apolice: "",
  codOtm: "",
  antt: "",
  pix: "",
  filialTerceiros: false,
};

const filiaisMock = [
  {
    codigo: "001",
    sigla: "003",
    cgc: "04086814000141",
    ie: "121611082117",
    nome: "TESTE MANTRAN",
    endereco: "RUA LOURDES",
    cidade: "SANTO ANDRE",
    cep: "09015-340",
  },
  {
    codigo: "005",
    sigla: "WMS",
    cgc: "35755290300110",
    ie: "121149486115",
    nome: "FILIAL WMS",
    endereco: "RUA LOURDES",
    cidade: "SANTO ANDRE",
    cep: "09000-000",
  },
];

export default function Filial({ open }) {
  const navigate = useNavigate();
  const { footerIconColorNormal, footerIconColorHover } = useIconColor();

  const [activeTab, setActiveTab] = useState("cadastro");
  const [filial, setFilial] = useState(initialFilial);

  const [showTributos, setShowTributos] = useState(false);
  const [showDocumentos, setShowDocumentos] = useState(false);

  const [showParametroModal, setShowParametroModal] = useState(false);
  const [showNumeracaoModal, setShowNumeracaoModal] = useState(false);

  const handleChange = (field) => (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (field === "cnpj") value = maskCNPJ(value);
    if (field === "cep") {
  value = maskCEP(value);
  const dig = onlyDigits(value);

  if (dig.length === 8) {
    buscarCEP(dig, setFilial);
  }
}

    if (field === "fone" || field === "fone2") value = maskPhone(value);

    setFilial((prev) => ({ ...prev, [field]: value }));
  };

  const handleLimpar = () => {
    setFilial(initialFilial);
  };

  const handleSelecionarFilial = (row) => {
    setActiveTab("cadastro");
    setFilial((prev) => ({
      ...prev,
      codigo: row.codigo,
      cnpj: maskCNPJ(row.cgc),
      razao: row.nome,
      sigla: row.sigla,
      endereco: row.endereco,
      cidade: row.cidade,
      cep: maskCEP(row.cep),
    }));
  };

  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      {/* Título */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        CADASTRO FILIAL
      </h1>

      {/* Abas */}
      <div className="flex border-b border-gray-300 bg-white">
        {["cadastro", "consulta"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${
              activeTab === tab
                ? "bg-white text-red-700 border-gray-300"
                : "bg-gray-100 text-gray-600 border-transparent"
            } ${tab !== "cadastro" ? "ml-1" : ""}`}
          >
            {tab === "cadastro" ? "Filial" : "Consulta"}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto flex flex-col gap-3">
        {/* ================================== ABA CADASTRO ================================== */}
        {activeTab === "cadastro" && (
          <>
            {/* CARD 1 - Dados principais */}
            <fieldset className="border border-gray-300 rounded p-3 bg-white">
              <legend className="text-red-700 font-semibold text-[13px] px-2">
                Dados da Filial
              </legend>

              <div className="space-y-2">
                {/* Linha 1 - Código, CNPJ, Sigla, Empresa */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">Código</Label>
                  <Txt
                    className="col-span-1 text-center"
                    value={filial.codigo}
                    onChange={handleChange("codigo")}
                  />

                  <Label className="col-span-1">CNPJ</Label>
                  <Txt
                    className="col-span-2"
                    value={filial.cnpj}
                    onChange={handleChange("cnpj")}
                    placeholder="00.000.000/0000-00"
                  />

                  <Label className="col-span-1">Sigla</Label>
                  <Txt
                    className="col-span-1 text-center"
                    value={filial.sigla}
                    onChange={handleChange("sigla")}
                  />

                  <Label className="col-span-1">Empresa</Label>
                  <Sel
                    className="col-span-4"
                    value={filial.empresa}
                    onChange={handleChange("empresa")}
                  >
                    <option>001 - MANTRAN TRANSPORTES LTDA</option>
                    <option>002 - OUTRA EMPRESA</option>
                  </Sel>
                </div>

                {/* Linha 2 - Razão Social */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">Razão Social</Label>
                  <Txt
                    className="col-span-7"
                    value={filial.razao}
                    onChange={handleChange("razao")}
                  />
                  <Label className="col-span-1">IE</Label>
                  <Txt
                    className="col-span-3"
                    value={filial.ie}
                    onChange={handleChange("ie")}
                  />
                </div>

                {/* Linha 3 - CEP, Endereço, Nº */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">CEP</Label>
                  <Txt
                    className="col-span-2"
                    value={filial.cep}
                    onChange={handleChange("cep")}
                    placeholder="00000-000"
                  />

                  <Label className="col-span-1">Endereço</Label>
                  <Txt
                    className="col-span-6"
                    value={filial.endereco}
                    onChange={handleChange("endereco")}
                  />

                  <Label className="col-span-1">Nº</Label>
                  <Txt
                    className="col-span-1"
                    value={filial.numero}
                    onChange={handleChange("numero")}
                  />
                </div>

                {/* Linha 4 - Cidade, UF, Bairro */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">Cidade</Label>
                  <Txt
                    className="col-span-4"
                    value={filial.cidade}
                    onChange={handleChange("cidade")}
                  />

                  <Label className="col-span-1">UF</Label>
                  <Txt
                    className="col-span-1 text-center bg-gray-200"
                    readOnly
                    value={filial.uf}
                  />

                  <Label className="col-span-1">Bairro</Label>
                  <Txt
                    className="col-span-4"
                    value={filial.bairro}
                    onChange={handleChange("bairro")}
                  />
                </div>

                {/* Linha 5 - CNAE, IM */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">CNAE</Label>
                  <Txt
                    className="col-span-3"
                    value={filial.cnae}
                    onChange={handleChange("cnae")}
                  />

                  <Label className="col-span-1">I.M</Label>
                  <Txt
                    className="col-span-7"
                    value={filial.im}
                    onChange={handleChange("im")}
                  />
                </div>

                {/* Linha 6 - Email / Email Ocor */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">E-mail</Label>
                  <Txt
                    className="col-span-5"
                    value={filial.email}
                    onChange={handleChange("email")}
                  />

                  <Label className="col-span-1">E-mail Ocor</Label>
                  <Txt
                    className="col-span-5"
                    value={filial.emailOcor}
                    onChange={handleChange("emailOcor")}
                  />
                </div>

                {/* Linha 7 - Fones e IE */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">Fone</Label>
                  <Txt
                    className="col-span-2"
                    value={filial.fone}
                    onChange={handleChange("fone")}
                    placeholder="(00) 00000-0000"
                  />

                  <Label className="col-span-1">Fone 2</Label>
                  <Txt
                    className="col-span-2"
                    value={filial.fone2}
                    onChange={handleChange("fone2")}
                    placeholder="(00) 00000-0000"
                  />
                    <Label className="col-span-1">PIX</Label>
                  <Txt
                    className="col-span-5"
                    value={filial.pix}
                    onChange={handleChange("pix")}
                  />

                  
                </div>

                {/* Linha 8 - Envio, Receb., Autotrac */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">Envio</Label>
                  <Txt
                    className="col-span-3"
                    value={filial.envio}
                    onChange={handleChange("envio")}
                  />

                  <Label className="col-span-1">Receb.</Label>
                  <Txt
                    className="col-span-3"
                    value={filial.receb}
                    onChange={handleChange("receb")}
                  />

                  <Label className="col-span-1">Autotrac</Label>
                  <Txt
                    className="col-span-3"
                    value={filial.autotrac}
                    onChange={handleChange("autotrac")}
                  />
                </div>

                {/* Linha 9 - Apólice, OTM, ANTT */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1">Nº Apólice</Label>
                  <Txt
                    className="col-span-3"
                    value={filial.apolice}
                    onChange={handleChange("apolice")}
                  />

                  <Label className="col-span-1">Cód. OTM</Label>
                  <Txt
                    className="col-span-2"
                    value={filial.codOtm}
                    onChange={handleChange("codOtm")}
                  />

                  <Label className="col-span-1">Nº ANTT</Label>
                  <Txt
                    className="col-span-3"
                    value={filial.antt}
                    onChange={handleChange("antt")}
                  />
                  <label className="flex items-center gap-1 text-[12px]">
                      <input
                        type="checkbox"
                        className="accent-red-700"
                        checked={filial.filialTerceiros}
                        onChange={handleChange("filialTerceiros")}
                      />
                      Filial Terceiros
                    </label>
                </div>
</div>
            </fieldset>

           {/* CARD 2 - Tributos (retrátil) */}
<div className="border border-gray-300 rounded bg-white">
  <div
    className="flex justify-between items-center px-3 py-1 bg-gray-50 cursor-pointer select-none rounded-t"
    onClick={() => setShowTributos((prev) => !prev)}
  >
    <h2 className="text-red-700 font-semibold text-[13px]">Tributos</h2>
    {showTributos ? (
      <ChevronUp size={16} className="text-gray-600" />
    ) : (
      <ChevronDown size={16} className="text-gray-600" />
    )}
  </div>

  <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${
      showTributos ? "max-h-[800px]" : "max-h-[0px]"
    }`}
  >
    <div className="p-3 grid grid-cols-12 gap-3 text-[12px]">

      {/* ================= TRIBUTAÇÃO ================= */}
      <fieldset className="border border-gray-300 rounded p-2 col-span-3">
        <legend className="px-1 text-[11px] font-semibold">TRIBUTAÇÃO</legend>

        <div className="grid grid-cols-12 gap-2 mt-1">
          <label className="col-span-12 flex items-center gap-1">
            <input type="radio" name="tributacao" className="accent-red-700" />
            Optante Simples Nacional
          </label>

          <label className="col-span-12 flex items-center gap-1">
            <input type="radio" name="tributacao" className="accent-red-700" />
            Lucro Real
          </label>

          <label className="col-span-12 flex items-center gap-1">
            <input
              type="radio"
              name="tributacao"
              className="accent-red-700"
              defaultChecked
            />
            Lucro Presumido
          </label>
        </div>
      </fieldset>

      {/* ================= OUTROS TRIBUTOS ================= */}
      <fieldset className="border border-gray-300 rounded p-2 col-span-3">
        <legend className="px-1 text-[11px] font-semibold">OUTROS TRIBUTOS</legend>

        <div className="grid grid-cols-12 gap-2 mt-1">

          {/* Linha 1 */}
          <div className="col-span-12 grid grid-cols-12 gap-2 items-center">
            <span className="col-span-4">% KG Col.</span>
            <Txt className="col-span-2 text-right" defaultValue="0,000" />

            <span className="col-span-4">% Entrega</span>
            <Txt className="col-span-2 text-right" defaultValue="0,00" />
          </div>

          {/* Linha 2 */}
          <div className="col-span-12 grid grid-cols-12 gap-2 items-center">
            <span className="col-span-6">% Total Tributos - IBPT</span>
            <Txt className="col-span-2 text-right" defaultValue="0,00" />
          </div>

        </div>
      </fieldset>

      {/* ================= IMPOSTO ================= */}
      <fieldset className="border border-gray-300 rounded p-2 col-span-3">
        <legend className="px-1 text-[11px] font-semibold">IMPOSTO</legend>

        <div className="grid grid-cols-12 gap-2 mt-1">

          {/* Linha 1 */}
          <div className="col-span-12 grid grid-cols-12 gap-2 items-center">
            <span className="col-span-4">PIS</span>
            <Txt className="col-span-2 text-right" defaultValue="0,00" />

            <span className="col-span-4">Cofins</span>
            <Txt className="col-span-2 text-right" defaultValue="0,00" />
          </div>

          {/* Linha 2 */}
          <div className="col-span-12 grid grid-cols-12 gap-2 items-center">
            <span className="col-span-4">Sest/Senat</span>
            <Txt className="col-span-2 text-right" defaultValue="2,50" />

            <span className="col-span-4">ISS</span>
            <Txt className="col-span-2 text-right" defaultValue="0,00" />
          </div>

          {/* Linha 3 */}
          <div className="col-span-12 grid grid-cols-12 gap-2 items-center">
            <span className="col-span-4">CSSL</span>
            <Txt className="col-span-2 text-right" defaultValue="0,00" />

            <span className="col-span-4">IR</span>
            <Txt className="col-span-2 text-right" defaultValue="0,00" />
          </div>

        </div>
      </fieldset>

      {/* ================= COLETA ================= */}
      <fieldset className="border border-gray-300 rounded p-2 col-span-3">
        <legend className="px-1 text-[11px] font-semibold">COLETA</legend>

        <div className="grid grid-cols-12 gap-2 mt-1">

          <div className="col-span-12 flex items-center gap-2">
            <span>Valor Coleta</span>
            <Txt className="w-[100px] text-right" defaultValue="10,00" />
          </div>

          <label className="col-span-12 flex items-center gap-2">
            <input type="checkbox" className="accent-red-700" defaultChecked />
            Rateio
          </label>

        </div>
      </fieldset>

    </div>
  </div>
</div>


            {/* CARD 3 - Documentos / Regras (retrátil) */}
<div className="border border-gray-300 rounded bg-white">
  <div
    className="flex justify-between items-center px-3 py-1 bg-gray-50 cursor-pointer select-none rounded-t"
    onClick={() => setShowDocumentos((prev) => !prev)}
  >
    <h2 className="text-red-700 font-semibold text-[13px]">
      Documentos / Regras
    </h2>
    {showDocumentos ? (
      <ChevronUp size={16} className="text-gray-600" />
    ) : (
      <ChevronDown size={16} className="text-gray-600" />
    )}
  </div>

  <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${
      showDocumentos ? "max-h-[600px]" : "max-h-[0px]"
    }`}
  >
    {/* === GRID DE 12 COLUNAS PARA OS CARDS === */}
    <div className="p-3 grid grid-cols-12 gap-3 text-[12px]">

{/* CTE */}
<fieldset className="border border-gray-300 rounded p-2 col-span-6">
  <legend className="px-1 text-[11px] font-semibold">CTE</legend>

  {/* GRID INTERNO COM 2 COLUNAS */}
  <div className="grid grid-cols-2 gap-4 mt-1">

    {/* COLUNA 1 */}
    <div className="space-y-1">
      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Permite Faturar CTe sem Baixa
      </label>

      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Fazer Rateio por Loja/Divisão
      </label>

      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Emitir CTe/MDFe em Contingência
      </label>

      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Permite Alterar Valores do CTe
      </label>

      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Não Cobrar ICMS dentro da UF
      </label>
    </div>

    {/* COLUNA 2 */}
    <div className="space-y-1">
      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Controlar Baixa de Docs por NF
      </label>

      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Numeração Automática CTRC
      </label>

      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Isento ICMS tomador dentro do Estado
      </label>

      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Emite Nota Fiscal de Serviço
      </label>

      <label className="flex items-center gap-1">
        <input type="checkbox" className="accent-red-700" />
        Cobrar taxa de coleta sem geração de coleta
      </label>
    </div>

  </div>
</fieldset>

      {/* ================== CARD VIAGEM ================== */}
      <fieldset className="border border-gray-300 rounded p-2 col-span-3">
        <legend className="px-1 text-[11px] font-semibold">VIAGEM</legend>

        <div className="space-y-1 mt-1">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Permite Tabela de Agregado p/ Frotista
          </label>

          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Inicia Viagem com outra em Andamento
          </label>

          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Não permitir despesa de viagem sem saldo
          </label>

          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Numeração Automática Viagem
          </label>

          {/* === ITEM QUE FALTAVA === */}
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Inicia Viagem na Coleta
          </label>
        </div>
      </fieldset>

      {/* ================== CARD OUTROS ================== */}
      <fieldset className="border border-gray-300 rounded p-2 col-span-3">
        <legend className="px-1 text-[11px] font-semibold">OUTROS</legend>

        <div className="space-y-1 mt-1">

          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Permite Faturamento de Minutas
          </label>

          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Numeração de Fatura por Filial
          </label>

          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Acerto de Conta Mediante Protocolo Entrega
          </label>

          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Limpar Tela Contas Pagar
          </label>

          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-700" />
            Mostrar Apólice Cte
          </label>

        </div>
      </fieldset>

    </div>
  </div>
</div>

          </>
        )}

        {/* ================================== ABA CONSULTA ================================== */}
        {activeTab === "consulta" && (
          <div className="border border-gray-300 rounded bg-white p-2">
            <table className="w-full text-[12px] border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border p-1">Cód. Filial</th>
                  <th className="border p-1">Sigla</th>
                  <th className="border p-1">CGC</th>
                  <th className="border p-1">IE</th>
                  <th className="border p-1">Nome</th>
                  <th className="border p-1">Endereço</th>
                  <th className="border p-1">Cidade</th>
                  <th className="border p-1">CEP</th>
                </tr>
              </thead>
              <tbody>
                {filiaisMock.map((f) => (
                  <tr
                    key={f.codigo}
                    className="hover:bg-green-100 cursor-pointer"
                    onClick={() => handleSelecionarFilial(f)}
                  >
                    <td className="border p-1 text-center">{f.codigo}</td>
                    <td className="border p-1 text-center">{f.sigla}</td>
                    <td className="border p-1 text-center">{f.cgc}</td>
                    <td className="border p-1 text-center">{f.ie}</td>
                    <td className="border p-1">{f.nome}</td>
                    <td className="border p-1">{f.endereco}</td>
                    <td className="border p-1">{f.cidade}</td>
                    <td className="border p-1 text-center">{f.cep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">
        {/* Fechar */}
        <button
          onClick={() => navigate(-1)}
          title="Fechar Tela"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <XCircle size={20} />
          <span>Fechar</span>
        </button>

        {/* Limpar */}
        <button
          onClick={handleLimpar}
          title="Limpar Campos"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <RotateCcw size={20} />
          <span>Limpar</span>
        </button>

        {/* Incluir */}
        <button
          onClick={() => alert("Incluir Filial (mock).")}
          title="Incluir Filial"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <PlusCircle size={20} />
          <span>Incluir</span>
        </button>

        {/* Alterar */}
        <button
          onClick={() => alert("Alterar Filial (mock).")}
          title="Alterar Filial"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Edit size={20} />
          <span>Alterar</span>
        </button>

        {/* Excluir */}
        <button
          onClick={() => alert("Excluir Filial (mock).")}
          title="Excluir Filial"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Trash2 size={20} />
          <span>Excluir</span>
        </button>

        {/* Parametro */}
        <button
          onClick={() => setShowParametroModal(true)}
          title="Parâmetros da Filial"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <SlidersHorizontal size={20} />
          <span>Parâmetro</span>
        </button>

        {/* Alterar Nº Documentos */}
        <button
          onClick={() => setShowNumeracaoModal(true)}
          title="Alterar Numeração de Documentos"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <FileText size={20} />
          <span>Alt. Nº Doc.</span>
        </button>
      </div>

      {/* Modal Parâmetros */}
      {showParametroModal && (
        <FilialParametro onClose={() => setShowParametroModal(false)} />
      )}

      {/* Modal Numeração */}
      {showNumeracaoModal && (
        <FilialNumeracao onClose={() => setShowNumeracaoModal(false)} />
      )}
    </div>
  );
}
