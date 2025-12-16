import { useState } from "react";
import ManifestoDocs from "./ManifestoDocs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrafficLight } from "@fortawesome/free-solid-svg-icons";
import ConsultaSefazMDFe from "../pages/ConsultaSefazMDFe";
import BaixaManifesto from "../pages/BaixaManifesto";
import PercursoModal from "../pages/PercursoModal";
import ManifestoCargaPerigosa from "../pages/ManifestoCargaPerigosa";
import ManifestoSeguro from "../pages/ManifestoSeguro";
import ManifestoInfoComplementar from "../pages/ManifestoInfoComplementar";
import { useIconColor } from "../context/IconColorContext";
import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  Printer,
  Copy,
  Search,
  ChevronUp,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Download,
  Globe2,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helpers padrão (iguais ao CTePage.jsx)
function Label({ children, className = "" }) {
  return (
    <label
      className={`text-[12px] text-gray-600 flex items-center justify-end ${className}`}
    >
      {children}
    </label>
  );
}


function Txt({ className = "", readOnly = false, ...props }) {
  return (
    <input
      {...props}
      readOnly={readOnly}
      className={`
        border border-gray-300 rounded
        px-2 py-[2px] h-[26px] text-[13px]
        ${readOnly ? "bg-gray-100 text-gray-600" : "bg-white"}
        ${className}
      `}
    />
  );
}

function Sel({ children, className = "", ...rest }) {
  return (
    <select
      {...rest}
      className={`
        border border-gray-300 rounded
        px-2 py-[2px] h-[26px] text-[13px] bg-white
        ${className}
      `}
    >
      {children}
    </select>
  );
}
// Ícone de lápis
function IconeLapis({ onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded w-[24px] h-[22px] flex items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[13px] h-[13px]"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    </button>
  );
}

export default function Manifesto({ open }) {
  const [activeTab, setActiveTab] = useState("manifesto");
  const [isPercursoOpen, setIsPercursoOpen] = useState(false);
  const [isSeguroOpen, setIsSeguroOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoComplOpen, setIsInfoComplOpen] = useState(false);
  const [isCargaPerigosaOpen, setIsCargaPerigosaOpen] = useState(false);
  const [isCollapsedConsulta, setIsCollapsedConsulta] = useState(false);
  const [isCollapsedEntregas, setIsCollapsedEntregas] = useState(false);
  const navigate = useNavigate();
  const [isCollapsedFilial, setIsCollapsedFilial] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isBaixaOpen, setIsBaixaOpen] = useState(false);
  const [statusTransito, setStatusTransito] = useState("verde");
  // valores possíveis: "verde", "amarelo", "vermelho"

  const { footerIconColorNormal, footerIconColorHover } = useIconColor();

  const sidebarWidth = open ? "192px" : "56px";

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedCount((prev) => prev + 1);
    } else {
      setSelectedCount((prev) => Math.max(prev - 1, 0));
    }
  };
  return (
    <div
      className="transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col"
    >

      <div
        className={`transition-all duration-300 ${open ? "ml-[192px]" : "ml-[56px]"
          } flex flex-col h-full`}
      >


        {/* Título */}
        <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
          MANIFESTO
        </h1>

        {/* Abas */}
        <div className="flex border-b border-gray-300 bg-white">
          {["manifesto", "consulta", "entregas"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${activeTab === tab
                ? "bg-white text-red-700 border-gray-300"
                : "bg-gray-100 text-gray-600 border-transparent"
                } ${tab !== "manifesto" ? "ml-1" : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 p-3 pb-[56px] bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto flex flex-col gap-2">
          {/* ===================== ABA MANIFESTO ===================== */}
          {activeTab === "manifesto" && (
            <>
              {/* CARD 1 - Dados da Filial */}
              <div className="border border-gray-300 rounded bg-white">
                {/* Cabeçalho */}
                <div
                  className="flex justify-between items-center px-3 py-1 bg-gray-50 cursor-pointer select-none rounded-t"
                  onClick={() => setIsCollapsedFilial(!isCollapsedFilial)}
                >
                  <h2 className="text-red-700 font-semibold text-[13px]">
                    Dados da Filial
                  </h2>
                  {isCollapsedFilial ? (
                    <ChevronDown size={16} className="text-gray-600" />
                  ) : (
                    <ChevronUp size={16} className="text-gray-600" />
                  )}
                </div>

                {/* Conteúdo */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isCollapsedFilial ? "max-h-[120px]" : "max-h-[1000px]"
                    }`}
                >
                  <div className="p-3 space-y-2">

                    {/* LINHA 01 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1 justify-end">Nº Manifesto</Label>
                      <Txt className="col-span-1" defaultValue="043559" />



                      <Label className="col-span-1 justify-end col-start-4">Nº MDF-e</Label>
                      <Txt className="col-span-1" />

                      <Label className="col-span-1 justify-end">Tp. Manifesto</Label>
                      <div className="col-span-3 flex items-center gap-4">
                        <label className="flex items-center gap-1 text-[12px]">
                          <input type="radio" name="tpManifesto" defaultChecked />
                          Coleta / Entrega
                        </label>
                        <label className="flex items-center gap-1 text-[12px]">
                          <input type="radio" name="tpManifesto" />
                          Transferência
                        </label>
                      </div>

                      <div className="col-span-3 flex justify-end">
                        <button
                          className="border border-gray-300 rounded px-3 py-[2px] text-[12px] flex items-center gap-1 hover:bg-gray-100"
                        >
                          <i className="fa-solid fa-paper-plane text-red-600"></i>
                          Enviar MDF-e
                        </button>
                      </div>
                    </div>

                    {/* LINHA 02 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1 justify-end">Empresa</Label>
                      <Sel className="col-span-4 w-full">
                        <option>001 - MANTRAN TRANSPORTES LTDA</option>
                      </Sel>

                      <Label className="col-span-1 justify-end">Filial Destino</Label>
                      <Sel className="col-span-4 w-full">
                        <option>001 - TESTE MANTRAN</option>
                      </Sel>

                      <div className="col-span-2 flex justify-end">
                        <button
                          className="border border-gray-300 rounded px-3 py-[2px] text-[12px] flex items-center gap-1 hover:bg-gray-100"
                        >
                          <i className="fa-solid fa-truck text-red-600"></i>
                          Entregas
                        </button>
                      </div>
                    </div>

                    {/* LINHA 03 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1 justify-end">Filial Emitente</Label>
                      <Sel className="col-span-4 w-full">
                        <option>001 - TESTE MANTRAN</option>
                      </Sel>

                      <Label className="col-span-1 justify-end">Filial Trânsito</Label>
                      <Sel className="col-span-4 w-full">
                        <option>001 - TESTE MANTRAN</option>
                      </Sel>

                      <div className="col-span-2 flex justify-end">
                        <button
                          onClick={() => setIsCargaPerigosaOpen(true)}
                          className="border border-gray-300 rounded px-3 py-[2px] text-[12px] flex items-center gap-1 hover:bg-gray-100"
                        >
                          <i className="fa-solid fa-triangle-exclamation text-yellow-500"></i>
                          Carga Perigosa
                        </button>
                      </div>
                    </div>

                    {/* LINHA 04 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1 justify-end">Nº Lacres</Label>
                      <Txt className="col-span-2" />

                      <Label className="col-span-1 justify-end">Cargas Soltas</Label>
                      <Txt className="col-span-1 text-center" defaultValue="0" />

                      <Label className="col-span-1 justify-end">Acerto Conta</Label>
                      <Txt className="col-span-2" />
                      <Label className="col-span-1 justify-end">Data</Label>
                      <Txt className="col-span-1 bg-gray-200" readOnly defaultValue="13/10/2025" />
                    </div>

                    {/* LINHA 05 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1 justify-end">Observação</Label>
                      <Txt className="col-span-11" />
                    </div>

                    {/* LINHA 06 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1 justify-end">Chave MDF-e</Label>
                      <Txt className="col-span-5" />

                      <Label className="col-span-1 justify-end">Protocolo</Label>
                      <Txt className="col-span-2" />

                      <Label className="col-span-1 justify-end">Status</Label>
                      <Txt className="col-span-2" />
                    </div>

                  </div>
                </div>
              </div>




              {/* CARD 2 - Dados da Viagem */}
              <div className="border border-gray-300 rounded bg-white">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center px-3 py-1 bg-gray-50 rounded-t">
                  <h2 className="text-red-700 font-semibold text-[13px]">
                    Dados da Viagem
                  </h2>
                </div>

                {/* Conteúdo */}
                <div className="p-3 space-y-2">

                  {/* LINHA 1 */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <Label className="col-span-1 justify-end">Filial Origem</Label>
                    <Sel className="col-span-5">
                      <option>001 - MANTRAN TECNOLOGIAS LTDA ME</option>
                    </Sel>

                    <Label className="col-span-1  justify-end">Tipo Carga</Label>
                    <Sel className="col-span-2">
                      <option>0 - FECHADA</option>
                      <option>1 - FRACIONADA</option>
                    </Sel>

                    <Label className="col-span-2 justify-end">Nº Viagem</Label>
                    <Txt className="col-span-1 bg-gray-200" readOnly defaultValue="079029" />


                  </div>

                  {/* LINHA 2 */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <Label className="col-span-1 justify-end">Motorista</Label>

                    {/* Documento + botão + nome */}
                    <div className="col-span-5 flex items-center gap-1 min-w-0">
                      {/* Documento */}
                      <Txt
                        className="w-[120px]"
                        defaultValue="01628446760"
                      />

                      {/* Nome */}
                      <Txt
                        className="flex-1 bg-gray-200"
                        readOnly
                        defaultValue="ALAN DA COSTA"
                      />

                      {/* Ícone pequeno, fora do cálculo */}
                      <button
                        className="border border-gray-300 rounded hover:bg-gray-100 
               h-[26px] w-[30px] flex items-center justify-center shrink-0"
                      >
                        <i className="fa-solid fa-pen text-red-600 text-[12px]"></i>
                      </button>
                    </div>


                    <Label className="col-span-1 justify-end">Prev. Entrega</Label>
                    <Txt type="date" className="col-span-2" defaultValue="2025-10-13" />

                    <Label className="col-span-2 justify-end">Km Atual</Label>
                    <Txt className="col-span-1 text-center" defaultValue="1" />
                  </div>

                  {/* LINHA 3 */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <Label className="col-span-1 justify-end">Tração</Label>

                    <div className="col-span-5 flex items-center gap-1 min-w-0">
                      {/* Documento */}
                      <Txt
                        className="w-[120px]"
                        defaultValue="0035719"
                      />

                      {/* Nome */}
                      <Txt
                        className="flex-1 bg-gray-200"
                        readOnly
                        defaultValue="RXW4I56 - CAVALO MEC - ITAJAÍ"
                      />

                      {/* Ícone pequeno, fora do cálculo */}
                      <button
                        className="border border-gray-300 rounded hover:bg-gray-100 
               h-[26px] w-[30px] flex items-center justify-center shrink-0"
                      >
                        <i className="fa-solid fa-pen text-red-600 text-[12px]"></i>
                      </button>
                    </div>

                    <Label className="col-span-1 justify-end">Capacidade</Label>
                    <div className="col-span-2 flex items-center gap-1 min-w-0">
                      {/* Campo */}
                      <Txt
                        className="flex-1 min-w-0 text-center"
                        defaultValue="12000"
                      />

                      {/* Unidade fixa */}
                      <span className="text-[12px] text-gray-600 shrink-0">
                        Kg
                      </span>
                    </div>


                    <Label className="col-span-2 justify-end">Km Início</Label>
                    <Txt className="col-span-1 text-center" defaultValue="1" />
                  </div>

                  {/* LINHA 4 */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <Label className="col-span-1 justify-end">Reboque</Label>

                    <div className="col-span-5 flex items-center gap-1 min-w-0">
                      {/* Código */}
                      <Txt
                        className="w-[120px]"
                        defaultValue="0034811"
                      />

                      {/* Descrição */}
                      <Txt
                        className="flex-1 bg-gray-200"
                        readOnly
                        defaultValue="RKW3E53 - CARRETA SIDER - ITAJAÍ"
                      />

                      {/* Ícone fixo (fora do cálculo de largura) */}
                      <button
                        className="border border-gray-300 rounded hover:bg-gray-100
               h-[26px] w-[30px] flex items-center justify-center shrink-0"
                      >
                        <i className="fa-solid fa-pen text-red-600 text-[12px]"></i>
                      </button>
                    </div>

                    <Label className="col-span-1 justify-end">Frete Combinado</Label>
                    <div className="col-span-2 flex items-center gap-1 min-w-0">
                      {/* Campo */}
                      <Txt className="flex-1 min-w-0" />

                      {/* Ícone fixo */}
                      <button
                        className="border border-gray-300 rounded hover:bg-gray-100
               h-[26px] w-[30px] flex items-center justify-center shrink-0"
                      >
                        <i className="fa-solid fa-pen text-orange-500 text-[12px]"></i>
                      </button>
                    </div>


                    <Label className="col-span-2 justify-end">Km Final</Label>
                    <Txt className="col-span-1 text-center" defaultValue="0" />
                  </div>

                  {/* LINHA 5 */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <Label className="col-span-1 justify-end">Reboque 2</Label>

                    <div className="col-span-5 flex items-center gap-1 min-w-0">
                      {/* Código */}
                      <Txt
                        className="w-[120px]"
                        defaultValue="0000006"
                      />

                      {/* Descrição */}
                      <Txt
                        className="flex-1 bg-gray-200"
                        readOnly
                        defaultValue="ABV0229 - RANDON - MARINGÁ"
                      />

                      {/* Ícone fixo */}
                      <button
                        className="border border-gray-300 rounded hover:bg-gray-100
               h-[26px] w-[30px] flex items-center justify-center shrink-0"
                      >
                        <i className="fa-solid fa-pen text-red-600 text-[12px]"></i>
                      </button>
                    </div>


                    <Label className="col-span-1 justify-end">Tab. Agregado</Label>
                    <div className="col-span-5 flex items-center gap-1">
                      <Txt className="flex-1" />
                      <button className="border border-gray-300 rounded hover:bg-gray-100 h-[26px] flex items-center justify-center">
                        <i className="fa-solid fa-dollar-sign text-green-600 text-[12px]"></i>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              <fieldset className="border border-gray-300 rounded p-3 bg-white">
                <legend className="px-2 text-red-700 font-semibold text-[13px]">
                  Informações Complementares
                </legend>

                {/* LINHA 01 — LOCAL CARGA + AÇÕES */}
                <div className="grid grid-cols-12 gap-2 mb-2">
                  <Label className="col-span-1">Local Carga</Label>

                  <Txt className="col-span-2" defaultValue="13312900" />

                  <Txt
                    className="col-span-5 bg-gray-200"
                    readOnly
                    defaultValue="ITU"
                  />

                  <Txt
                    className="col-span-1 text-center bg-gray-200"
                    readOnly
                    defaultValue="SP"
                  />

                  {/* Botões */}
                  <div className="col-span-3 flex justify-end gap-2">
                    <button
                      title="Percurso"
                      onClick={() => setIsPercursoOpen(true)}
                      className="border border-gray-300 rounded hover:bg-gray-100
                   px-3 h-[26px] flex items-center gap-1 text-[12px]"
                    >
                      <i className="fa-solid fa-route text-green-600"></i>
                      Percurso
                    </button>

                    <button
                      title="Seguro"
                      onClick={() => setIsSeguroOpen(true)}
                      className="border border-gray-300 rounded hover:bg-gray-100
                   px-3 h-[26px] flex items-center gap-1 text-[12px]"
                    >
                      <i className="fa-solid fa-shield-halved text-orange-500"></i>
                      Seguro
                    </button>

                    <button
                      title="Informações Complementares"
                      onClick={() => setIsInfoComplOpen(true)}
                      className="border border-gray-300 rounded hover:bg-gray-100
                   px-3 h-[26px] flex items-center gap-1 text-[12px]"
                    >
                      <i className="fa-solid fa-circle-info text-blue-500"></i>
                      Info. Compl.
                    </button>
                  </div>
                </div>

                {/* LINHA 02 — LOCAL DESCARGA / ROTA / DISTÂNCIA */}
                <div className="grid grid-cols-12 gap-2 mb-2">
                  <Label className="col-span-1">Local Descarga</Label>

                  <Txt className="col-span-2" defaultValue="40000000" />

                  <Txt
                    className="col-span-5 bg-gray-200"
                    readOnly
                    defaultValue="SALVADOR"
                  />

                  <Txt
                    className="col-span-1 text-center bg-gray-200"
                    readOnly
                    defaultValue="BA"
                  />

                  <Label className="col-span-1">Rota</Label>

                  <Sel className="col-span-2 w-full">
                    <option>SP x BA</option>
                  </Sel>
                </div>

                {/* LINHA 03 — REMETENTE */}
                <div className="grid grid-cols-12 gap-2 mb-2">
                  <Label className="col-span-1">Remetente</Label>

                  <Txt className="col-span-2" defaultValue="50221019000136" />

                  <Txt
                    className="col-span-8 bg-gray-200"
                    readOnly
                    defaultValue="HNK-ITU (1) MATRIZ"
                  />

                  <button
                    title="Editar Remetente"
                    className="col-span-1 border border-gray-300 rounded hover:bg-gray-100
                 h-[26px] flex items-center justify-center"
                  >
                    <i className="fa-solid fa-pen text-red-600 text-[12px]"></i>
                  </button>
                </div>

                {/* LINHA 04 — DESTINATÁRIO */}
                <div className="grid grid-cols-12 gap-2">
                  <Label className="col-span-1">Destinatário</Label>

                  <Txt className="col-span-2" defaultValue="05254957005651" />

                  <Txt
                    className="col-span-8 bg-gray-200"
                    readOnly
                    defaultValue="HNK-SALVADOR: ÁGUA MI"
                  />

                  <button
                    title="Editar Destinatário"
                    className="col-span-1 border border-gray-300 rounded hover:bg-gray-100
                 h-[26px] flex items-center justify-center"
                  >
                    <i className="fa-solid fa-pen text-red-600 text-[12px]"></i>
                  </button>
                </div>
              </fieldset>


              {/* CARD 4 - Averbação */}
              <div className="border border-gray-300 rounded p-3 bg-white">
                <div className="grid grid-cols-12 gap-2 items-center mb-2">
                  <Label className="col-span-1">Cadastro</Label>

                  <Txt
                    type="date"
                    className="col-span-2"
                    defaultValue="2025-10-24"
                  />

                  <Label className="col-span-2">Usuário</Label>

                  <Txt
                    className="col-span-2 bg-gray-200"
                    readOnly
                    defaultValue="SUPORTE"
                  />

                  <Label className="col-span-2">Protocolo</Label>

                  <Txt
                    className="col-span-3 bg-gray-200"
                    readOnly
                    defaultValue="MFT20251024001"
                  />
                </div>

                {/* Linha de Averbação */}
                <p className="text-[12px] text-green-900 bg-green-200 py-1 px-2 text-center rounded">
                  Averbado em{" "}
                  <span className="font-semibold">15/10/2025</span>{" "}
                  com o Nº Averbação:{" "}
                  <span className="font-mono">
                    06513102504086140001415700100005880134
                  </span>{" "}
                  e Protocolo:{" "}
                  <span className="font-semibold">TESTE</span>
                </p>
              </div>








            </>
          )}

          {/* ===================== ABA CONSULTA ===================== */}
          {activeTab === "consulta" && (
            <>
              {/* CARD 1 - Filtro de Pesquisa (Expansível) */}
              <div className="border border-gray-300 rounded bg-white">
                {/* Cabeçalho */}
                <div
                  className="flex justify-between items-center px-3 py-1 bg-gray-50 cursor-pointer select-none rounded-t"
                  onClick={() => setIsCollapsedConsulta(!isCollapsedConsulta)}
                >
                  <h2 className="text-red-700 font-semibold text-[13px]">
                    Filtro de Pesquisa
                  </h2>
                  {isCollapsedConsulta ? (
                    <ChevronDown size={18} className="text-gray-600" />
                  ) : (
                    <ChevronUp size={18} className="text-gray-600" />
                  )}
                </div>

                {/* Conteúdo */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isCollapsedConsulta ? "max-h-[40px]" : "max-h-[800px]"
                    }`}
                >
                  <div className="p-3 space-y-2">

                    {/* LINHA 01 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1">Filial Vínculo</Label>
                      <Sel className="col-span-5 w-full">
                        <option>001 - MANTRAN TECNOLOGIAS LTDA ME</option>
                        <option>002 - MANTRAN TECNOLOGIAS FILIAL 002</option>
                      </Sel>

                      <Label className="col-span-1">Ocorrência</Label>
                      <Sel className="col-span-5 w-full">
                        <option>Todos</option>
                        <option>Manifesto Baixado</option>
                        <option>Encerrado</option>
                      </Sel>
                    </div>

                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1">Veículo</Label>

                      {/* Código */}
                      <Txt className="col-span-1" />

                      <Txt
                        className="col-span-4 bg-gray-200"
                        readOnly
                        placeholder="Descrição / Placa"
                      />

                      <Label className="col-span-1">Motorista</Label>

                      {/* Documento */}
                      <Txt className="col-span-2" placeholder="CNH / CPF" />

                      {/* Nome — NÃO EDITÁVEL */}
                      <Txt
                        className="col-span-3 bg-gray-200"
                        readOnly
                        placeholder="Nome do Motorista"
                      />
                    </div>


                    {/* LINHA 03 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1">Período</Label>
                      <Txt
                        type="date"
                        className="col-span-2"
                        defaultValue="2025-05-24"
                      />

                      <Label className="col-span-1 text-center">Até</Label>
                      <Txt
                        type="date"
                        className="col-span-2"
                        defaultValue="2025-10-24"
                      />

                      <Label className="col-span-1">Nº Manifesto</Label>
                      <Txt className="col-span-1" />

                      <Label className="col-span-1">Nº MDF-e</Label>
                      <Txt className="col-span-1" />
                    </div>

                  </div>
                </div>
              </div>



              {/* CARD 2 - Botões (alinhados à direita) */}
              <div className="border border-gray-300 rounded p-2 bg-white flex justify-end gap-3">
                <button
                  className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1 text-sm"
                  title="Imprimir"
                >
                  <Printer size={14} className="text-red-700" /> Imprimir
                </button>

                <button
                  className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1 text-sm"
                  title="Imprimir CTRB"
                >
                  <FileSpreadsheet size={14} className="text-red-700" /> Imprimir CTRB
                </button>

                <button
                  className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1 text-sm"
                  title="Baixar Manifesto"
                >
                  <FileText size={14} className="text-red-700" /> Baixar Manif.
                </button>

                <button
                  className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1 text-sm"
                  title="Pesquisar"
                >
                  <Search size={14} className="text-red-700" /> Pesquisar
                </button>
              </div>


              {/* CARD 3 - Grid */}
              <div className="border border-gray-300 rounded p-2 bg-white">
                <table className="w-full text-[12px] border">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-1 border">Sel</th>
                      <th className="p-1 border">Manifesto</th>
                      <th className="p-1 border">Filial</th>
                      <th className="p-1 border">Motorista</th>
                      <th className="p-1 border">Data</th>
                      <th className="p-1 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-1 border text-center">
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange} // ✅ adiciona o evento
                          className="cursor-pointer accent-red-700"
                        />
                      </td>
                      <td className="p-1 border text-center">000001</td>
                      <td className="p-1 border text-center">002 - VTA</td>
                      <td className="p-1 border">LEONARDO COELHO</td>
                      <td className="p-1 border text-center">24/10/2025</td>
                      <td className="p-1 border text-center">ENCERRADO</td>
                    </tr>
                    <tr>
                      <td className="p-1 border text-center">
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange} // ✅ adiciona o evento
                          className="cursor-pointer accent-red-700"
                        />
                      </td>
                      <td className="p-1 border text-center">000002</td>
                      <td className="p-1 border text-center">002 - VTA</td>
                      <td className="p-1 border">ALAN DA COSTA</td>
                      <td className="p-1 border text-center">24/10/2025</td>
                      <td className="p-1 border text-center">EM TRANSITO</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* CARD 4 - Totais */}
              <div className="border border-gray-300 rounded p-2 bg-white flex justify-between text-[12px]">
                <span>Total de Registros: 2</span>
                <span>
                  Total Selecionados:{" "}
                  <span className="text-red-700 font-semibold">{selectedCount}</span>
                </span>
              </div>
            </>
          )}

          {/* ===================== ABA ENTREGAS ===================== */}
          {activeTab === "entregas" && (
            <>
              {/* CARD 1 - Filtro de Entregas (Expansível) */}
              <div className="border border-gray-300 rounded bg-white">
                {/* Cabeçalho */}
                <div
                  className="flex justify-between items-center px-3 py-1 bg-gray-50 cursor-pointer select-none rounded-t"
                  onClick={() => setIsCollapsedEntregas(!isCollapsedEntregas)}
                >
                  <h2 className="text-red-700 font-semibold text-[13px]">
                    Filtro de Entregas
                  </h2>
                  {isCollapsedEntregas ? (
                    <ChevronDown size={18} className="text-gray-600" />
                  ) : (
                    <ChevronUp size={18} className="text-gray-600" />
                  )}
                </div>

                {/* Conteúdo */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isCollapsedEntregas ? "max-h-[45px]" : "max-h-[800px]"
                    }`}
                >
                  <div className="p-3 space-y-2">

                    {/* LINHA 01 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1">Filial Vínculo</Label>
                      <Sel className="col-span-5 w-full">
                        <option>001 - MANTRAN TECNOLOGIAS LTDA ME</option>
                        <option>002 - MANTRAN TECNOLOGIAS FILIAL VALINHOS</option>
                      </Sel>

                      <Label className="col-span-2">Ocorrência</Label>
                      <Sel className="col-span-4 w-full">
                        <option>Todos</option>
                        <option>Manifesto Baixado</option>
                        <option>Em Trânsito</option>
                        <option>Entregue</option>
                      </Sel>
                    </div>

                    {/* LINHA 02 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1">Veículo</Label>

                      {/* Código */}
                      <Txt className="col-span-1" defaultValue="0000001" />

                      {/* Descrição (não editável) */}
                      <Txt
                        className="col-span-4 bg-gray-200"
                        readOnly
                        defaultValue="RENSJ17 - VW 24280 CRM 6X2 - BITRUCK - BRASÍLIA"
                      />

                      <Label className="col-span-2">Motorista</Label>

                      {/* Documento */}
                      <Txt className="col-span-1" defaultValue="01628446760" />

                      {/* Nome (não editável) */}
                      <Txt
                        className="col-span-3 bg-gray-200"
                        readOnly
                        defaultValue="ALAN DA COSTA"
                      />
                    </div>

                    {/* LINHA 03 */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <Label className="col-span-1">Período</Label>

                      <Txt
                        type="date"
                        className="col-span-2"
                        defaultValue="2025-10-24"
                      />

                      <Label className="col-span-1 text-center">Até</Label>

                      <Txt
                        type="date"
                        className="col-span-2"
                        defaultValue="2025-10-24"
                      />

                      {/* Espaço vazio para empurrar */}
                      <div className="col-span-2" />

                      {/* Botões à direita */}
                      <div className="col-span-4 flex justify-end gap-2">
                        <button className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                          <FileText size={14} className="text-red-700" />
                          <span>Rel. Ocorrência</span>
                        </button>

                        <button className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                          <Search size={14} className="text-red-700" />
                          <span>Pesquisar</span>
                        </button>
                      </div>
                    </div>


                  </div>
                </div>
              </div>





              {/* CARD 3 - Grid */}
              <div className="border border-gray-300 rounded p-2 bg-white">
                <table className="w-full text-[12px] border">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-1 border">Sel</th>
                      <th className="p-1 border">CTe</th>
                      <th className="p-1 border">Destinatário</th>
                      <th className="p-1 border">Cidade</th>
                      <th className="p-1 border">UF</th>
                      <th className="p-1 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-1 border text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="p-1 border text-center">002420</td>
                      <td className="p-1 border">HNK BR LOGÍSTICA</td>
                      <td className="p-1 border text-center">SALVADOR</td>
                      <td className="p-1 border text-center">BA</td>
                      <td className="p-1 border text-center">Entregue</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* CARD 4 - Totais */}
              <div className="border border-gray-300 rounded p-2 bg-white flex justify-between text-[12px]">
                <span>Total de Registros: 1</span>
                <span>Total Selecionados: 0</span>
              </div>
            </>
          )}


        </div> {/* 👈 FECHOU O WRAPPER */}
        {/* RODAPÉ FIXO – PADRÃO MANTRAN */}
        <div
          style={{
            left: sidebarWidth,
            width: `calc(100% - ${sidebarWidth})`,
          }}
          className="fixed bottom-0 z-50 border-t border-gray-300 bg-white"
        >


          {/* CONTAINER INTERNO (alinha com conteúdo) */}
          <div className="flex items-center gap-6 pl-9 pr-0 py-1">





            {/* Fechar */}
            <button
              onClick={() => navigate(-1)}
              title="Fechar Tela"
              className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <XCircle size={20} />
              <span>Fechar</span>
            </button>

            {/* Limpar */}
            <button
              title="Limpar Campos"
              className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <RotateCcw size={20} />
              <span>Limpar</span>
            </button>

            {/* Incluir */}
            <button
              title="Incluir Manifesto"
              className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <PlusCircle size={20} />
              <span>Incluir</span>
            </button>

            {/* Alterar */}
            <button
              title="Alterar Manifesto"
              className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <Edit size={20} />
              <span>Alterar</span>
            </button>

            {/* Excluir */}
            <button
              title="Excluir Manifesto"
              className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <Trash2 size={20} />
              <span>Excluir</span>
            </button>

            {/* Imprimir */}
            <button
              title="Imprimir Manifesto"
              className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <Printer size={20} />
              <span>Imprimir</span>
            </button>

            {/* Consulta Sefaz */}
            <button
              title="Consulta Sefaz"
              onClick={() => setIsModalOpen(true)}
              className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <Search size={20} />
              <span>Sefaz</span>
            </button>

            {/* Baixar */}
            <button
              title="Baixar Manifesto"
              onClick={() => setIsBaixaOpen(true)}
              className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <Download size={20} />
              <span>Baixar</span>
            </button>

            {/* Docs */}
            <button
              title="Documentos Vinculados"
              onClick={() => setIsDocsOpen(true)}
              className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <FileText size={20} />
              <span>Docs</span>
            </button>

            {/* Trânsito (semaforo) */}
            <button
              title={`Status de Trânsito (${statusTransito.toUpperCase()})`}
              onClick={() =>
                setStatusTransito(prev =>
                  prev === "verde"
                    ? "amarelo"
                    : prev === "amarelo"
                      ? "vermelho"
                      : "verde"
                )
              }
              className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <FontAwesomeIcon
                icon={faTrafficLight}
                className={`text-[18px] ${statusTransito === "verde"
                  ? "text-green-600"
                  : statusTransito === "amarelo"
                    ? "text-yellow-500"
                    : "text-red-600"
                  }`}
              />
              <span>Trânsito</span>
            </button>

            {/* Dúvidas */}
            <button
              title="Ajuda e Dúvidas"
              className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
            >
              <HelpCircle size={20} />
              <span>Dúvidas</span>
            </button>

          </div>
        </div>
        {/* === MODAL DE CONSULTA SEFAZ === */}
        {isModalOpen && (
          <ConsultaSefazMDFe onClose={() => setIsModalOpen(false)} />
        )}
        {/* === MODAL DE DOCUMENTOS === */}
        {isDocsOpen && <ManifestoDocs onClose={() => setIsDocsOpen(false)} />}
        {/* === MODAL DE BAIXA DE MANIFESTO === */}
        {isBaixaOpen && <BaixaManifesto onClose={() => setIsBaixaOpen(false)} />}
        {/* === MODAL DE PERCURSO === */}
        {isPercursoOpen && <PercursoModal onClose={() => setIsPercursoOpen(false)} />}
        {/* === MODAL DE SEGURO === */}
        {isSeguroOpen && <ManifestoSeguro onClose={() => setIsSeguroOpen(false)} />}
        {/* === MODAL DE CARGA PERIGOSA === */}
        {isCargaPerigosaOpen && (
          <ManifestoCargaPerigosa onClose={() => setIsCargaPerigosaOpen(false)} />
        )}


        {/* === MODAL DE INFORMAÇÕES COMPLEMENTARES === */}
        {isInfoComplOpen && (
          <ManifestoInfoComplementar onClose={() => setIsInfoComplOpen(false)} />
        )}
      </div>


    </div>
  );
}


