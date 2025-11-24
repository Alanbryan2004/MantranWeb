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
    <label className={`text-[12px] text-gray-700 ${className}`}>{children}</label>
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

// input com máscara, reaproveitando o mesmo estilo do Txt


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
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
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
      cnpj: row.cgc,
      razao: row.nome,
      sigla: row.sigla,
      endereco: row.endereco,
      cidade: row.cidade,
      cep: row.cep,
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
                {/* Linha 1 - Código, CNPJ, Razão, Sigla, Empresa */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 flex items-center">
                    <Label className="mr-1">Código</Label>
                    <Txt
                      className="w-full text-center"
                      value={filial.codigo}
                      onChange={handleChange("codigo")}
                    />
                  </div>

                  <div className="col-span-3 flex items-center">
                    <Label className="mr-1 min-w-[40px]">CNPJ</Label>
                    <Txt
                      mask="99.999.999/9999-99"
                      className="w-full"
                      value={filial.cnpj}
                      onChange={handleChange("cnpj")}
                    />
                  </div>

                  <div className="col-span-5 flex items-center">
                    <Label className="mr-1 min-w-[80px]">Razão Social</Label>
                    <Txt
                      className="w-full"
                      value={filial.razao}
                      onChange={handleChange("razao")}
                    />
                  </div>

                  <div className="col-span-1 flex items-center">
                    <Label className="mr-1">Sigla</Label>
                    <Txt
                      className="w-full text-center"
                      value={filial.sigla}
                      onChange={handleChange("sigla")}
                    />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <Label className="mr-1">Empresa</Label>
                    <Sel
                      className="w-full"
                      value={filial.empresa}
                      onChange={handleChange("empresa")}
                    >
                      <option>001 - MANTRAN TRANSPORTES LTDA</option>
                      <option>002 - OUTRA EMPRESA</option>
                    </Sel>
                  </div>
                </div>

                {/* Linha 2 - CEP, Endereço, Nº */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-2 flex items-center">
                    <Label className="mr-1 min-w-[40px]">CEP</Label>
                    <Txt
                      mask="99999-999"
                      className="w-full"
                      value={filial.cep}
                      onChange={handleChange("cep")}
                    />
                  </div>

                  <div className="col-span-8 flex items-center">
                    <Label className="mr-1 min-w-[70px]">Endereço</Label>
                    <Txt
                      className="w-full"
                      value={filial.endereco}
                      onChange={handleChange("endereco")}
                    />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <Label className="mr-1">Nº</Label>
                    <Txt
                      className="w-full"
                      value={filial.numero}
                      onChange={handleChange("numero")}
                    />
                  </div>
                </div>

                {/* Linha 3 - Cidade, UF, Bairro, CNAE, IM */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 flex items-center">
                    <Label className="mr-1 min-w-[55px]">Cidade</Label>
                    <Txt
                      className="w-full"
                      value={filial.cidade}
                      onChange={handleChange("cidade")}
                    />
                  </div>

                  <div className="col-span-1 flex items-center">
                    <Label className="mr-1">UF</Label>
                    <Txt
                      className="w-full text-center bg-gray-200"
                      readOnly
                      value={filial.uf}
                    />
                  </div>

                  <div className="col-span-3 flex items-center">
                    <Label className="mr-1">Bairro</Label>
                    <Txt
                      className="w-full"
                      value={filial.bairro}
                      onChange={handleChange("bairro")}
                    />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <Label className="mr-1">CNAE</Label>
                    <Txt
                      className="w-full"
                      value={filial.cnae}
                      onChange={handleChange("cnae")}
                    />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <Label className="mr-1">I.M</Label>
                    <Txt
                      className="w-full"
                      value={filial.im}
                      onChange={handleChange("im")}
                    />
                  </div>
                </div>

                {/* Linha 4 - Email / Email Ocor */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6 flex items-center">
                    <Label className="mr-1 min-w-[45px]">E-mail</Label>
                    <Txt
                      className="w-full"
                      value={filial.email}
                      onChange={handleChange("email")}
                    />
                  </div>

                  <div className="col-span-6 flex items-center">
                    <Label className="mr-1 min-w-[70px]">E-mail Ocor</Label>
                    <Txt
                      className="w-full"
                      value={filial.emailOcor}
                      onChange={handleChange("emailOcor")}
                    />
                  </div>
                </div>

                {/* Linha 5 - Fones e IE */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 flex items-center">
                    <Label className="mr-1 min-w-[45px]">Fone</Label>
                    <Txt
                      mask="(99) 9999-9999"
                      className="w-full"
                      value={filial.fone}
                      onChange={handleChange("fone")}
                    />
                  </div>

                  <div className="col-span-4 flex items-center">
                    <Label className="mr-1 min-w-[45px]">Fone 2</Label>
                    <Txt
                      mask="(99) 9999-9999"
                      className="w-full"
                      value={filial.fone2}
                      onChange={handleChange("fone2")}
                    />
                  </div>

                  <div className="col-span-4 flex items-center">
                    <Label className="mr-1">Inscrição Estadual</Label>
                    <Txt
                      className="w-full"
                      value={filial.ie}
                      onChange={handleChange("ie")}
                    />
                  </div>
                </div>

                {/* Linha 6 - Envio, Receb., Autotrac */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 flex items-center">
                    <Label className="mr-1 min-w-[45px]">Envio</Label>
                    <Txt
                      className="w-full"
                      value={filial.envio}
                      onChange={handleChange("envio")}
                    />
                  </div>

                  <div className="col-span-4 flex items-center">
                    <Label className="mr-1 min-w-[55px]">Receb.</Label>
                    <Txt
                      className="w-full"
                      value={filial.receb}
                      onChange={handleChange("receb")}
                    />
                  </div>

                  <div className="col-span-4 flex items-center">
                    <Label className="mr-1 min-w-[70px]">Autotrac.</Label>
                    <Txt
                      className="w-full"
                      value={filial.autotrac}
                      onChange={handleChange("autotrac")}
                    />
                  </div>
                </div>

                {/* Linha 7 - Apólice, OTM, ANTT, PIX, Flag */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3 flex items-center">
                    <Label className="mr-1 min-w-[70px]">Nº Apólice</Label>
                    <Txt
                      className="w-full"
                      value={filial.apolice}
                      onChange={handleChange("apolice")}
                    />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <Label className="mr-1 min-w-[60px]">Cód. OTM</Label>
                    <Txt
                      className="w-full"
                      value={filial.codOtm}
                      onChange={handleChange("codOtm")}
                    />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <Label className="mr-1 min-w-[60px]">Nº ANTT</Label>
                    <Txt
                      className="w-full"
                      value={filial.antt}
                      onChange={handleChange("antt")}
                    />
                  </div>

                  <div className="col-span-3 flex items-center">
                    <Label className="mr-1 min-w-[40px]">PIX</Label>
                    <Txt
                      className="w-full"
                      value={filial.pix}
                      onChange={handleChange("pix")}
                    />
                  </div>

                  <div className="col-span-2 flex items-center justify-end">
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
              </div>
            </fieldset>

            {/* CARD 2 - Tributos (retrátil) */}
            <div className="border border-gray-300 rounded bg-white">
              <div
                className="flex justify-between items-center px-3 py-1 bg-gray-50 cursor-pointer select-none rounded-t"
                onClick={() => setShowTributos((prev) => !prev)}
              >
                <h2 className="text-red-700 font-semibold text-[13px]">
                  Tributos
                </h2>
                {showTributos ? (
                  <ChevronUp size={16} className="text-gray-600" />
                ) : (
                  <ChevronDown size={16} className="text-gray-600" />
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showTributos ? "max-h-[500px]" : "max-h-[0px]"
                }`}
              >
                <div className="p-3 grid md:grid-cols-4 gap-3 text-[12px]">
                  {/* Tributação */}
                  <fieldset className="border border-gray-300 rounded p-2">
                    <legend className="px-1 text-[11px] font-semibold">
                      TRIBUTAÇÃO
                    </legend>
                    <div className="space-y-1 mt-1">
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="accent-red-700" />
                        Optante Simples Nacional
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="accent-red-700" />
                        Lucro Real
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Lucro Presumido
                      </label>
                    </div>
                  </fieldset>

                  {/* Outros Tributos */}
                  <fieldset className="border border-gray-300 rounded p-2">
                    <legend className="px-1 text-[11px] font-semibold">
                      OUTROS TRIBUTOS
                    </legend>
                    <div className="space-y-2 mt-1">
                      <div className="flex items-center gap-1">
                        <span>% KG Col.</span>
                        <Txt className="w-[80px] text-right" defaultValue="0,000" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span>% Entrega</span>
                        <Txt className="w-[80px] text-right" defaultValue="0,00" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span>% Total Tributos - IBPT</span>
                      </div>
                      <Txt className="w-[100px] text-right" defaultValue="0,00" />
                    </div>
                  </fieldset>

                  {/* Imposto */}
                  <fieldset className="border border-gray-300 rounded p-2">
                    <legend className="px-1 text-[11px] font-semibold">
                      IMPOSTO
                    </legend>
                    <div className="grid grid-cols-2 gap-1 mt-1 items-center">
                      <span>PIS</span>
                      <Txt className="w-[80px] text-right" defaultValue="0,00" />
                      <span>Cofins</span>
                      <Txt className="w-[80px] text-right" defaultValue="0,00" />
                      <span>Sest/Senat</span>
                      <Txt className="w-[80px] text-right" defaultValue="2,50" />
                      <span>ISS</span>
                      <Txt className="w-[80px] text-right" defaultValue="0,00" />
                      <span>CSSL</span>
                      <Txt className="w-[80px] text-right" defaultValue="0,00" />
                      <span>IR</span>
                      <Txt className="w-[80px] text-right" defaultValue="0,00" />
                    </div>
                  </fieldset>

                  {/* Coleta */}
                  <fieldset className="border border-gray-300 rounded p-2">
                    <legend className="px-1 text-[11px] font-semibold">
                      COLETA
                    </legend>
                    <div className="space-y-2 mt-1">
                      <div className="flex items-center gap-1">
                        <span>Valor Coleta</span>
                        <Txt className="w-[80px] text-right" defaultValue="10,00" />
                      </div>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Rateio
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            {/* CARD 3 - Documentos / Parâmetros diversos (retrátil) */}
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
                <div className="p-3 grid md:grid-cols-3 gap-3 text-[12px]">
                  {/* CTE */}
                  <fieldset className="border border-gray-300 rounded p-2">
                    <legend className="px-1 text-[11px] font-semibold">CTE</legend>
                    <div className="space-y-1 mt-1">
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Permite Faturar CTe sem Baixa
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Fazer Rateio por Loja/Divisão
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="accent-red-700" />
                        Emitir CTe/MDFe em Contingência
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Permite Alterar Valores do CTe
                      </label>
                    </div>
                  </fieldset>

                  {/* Viagem */}
                  <fieldset className="border border-gray-300 rounded p-2">
                    <legend className="px-1 text-[11px] font-semibold">
                      VIAGEM
                    </legend>
                    <div className="space-y-1 mt-1">
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Permite Tabela de Agregado p/ Frotista
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Inicia Viagem com outra em Andamento
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="accent-red-700" />
                        Não permitir despesa sem saldo
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Numeração Automática Viagem
                      </label>
                    </div>
                  </fieldset>

                  {/* Outros */}
                  <fieldset className="border border-gray-300 rounded p-2">
                    <legend className="px-1 text-[11px] font-semibold">
                      OUTROS
                    </legend>
                    <div className="space-y-1 mt-1">
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-red-700"
                          defaultChecked
                        />
                        Permite Faturamento de Minutas
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="accent-red-700" />
                        Numeração de Fatura por Filial
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="accent-red-700" />
                        Bloquear Documentos Vencidos
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="accent-red-700" />
                        Validação de GRIS do Motorista
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
