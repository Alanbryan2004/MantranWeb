import { useState } from "react";
import Comex from "./Comex";
import InicioColetaModal from "./InicioColetaModal";
import EncerraColetaModal from "./EncerraColetaModal";
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
  Copy,
  FileText,
  Globe2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotasFiscalModal from "./NotasFiscalModal";

function Label({ children, className = "" }) {
  return (
    <label className={`text-[12px] text-gray-600 block text-center ${className}`}>
      {children}
    </label>
  );
}
function Txt(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] text-center " +
        (props.className || "")
      }
    />
  );
}
function Sel({ children, ...rest }) {
  return (
    <select
      {...rest}
      className="border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px]"
    >
      {children}
    </select>
  );
}

export default function Coleta({ open }) {
  const [showModalInicio, setShowModalInicio] = useState(false);
  const [showModalEncerrar, setShowModalEncerrar] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null); // já usado no Iniciar
  const [activeTab, setActiveTab] = useState("cadastro");
  const [showNotaFiscal, setShowNotaFiscal] = useState(false);
  const [showComex, setShowComex] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  const {
  footerIconColorNormal,
  footerIconColorHover
} = useIconColor();

  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col overflow-y-auto ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      {/* Título */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        CADASTRO DE COLETAS
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
      <div className="flex-1 p-1 bg-white border-x border-b border-gray-200 rounded-b-md flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {activeTab === "cadastro" ? (
          <>
            {/* CARD 1 — Dados Principais */}
            <div className="border border-gray-300 rounded p-2 bg-white space-y-2">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Dados Principais
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Label className="w-[70px] text-right">Empresa</Label>
                    <Sel className="flex-1">
                      <option>001 - MANTRAN TRANSPORTES LTDA</option>
                    </Sel>
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="w-[70px] text-right">Solicitação</Label>
                    <Txt type="date" className="w-[130px]" />
                    <Label className="w-[40px] text-right">Hora</Label>
                    <Txt type="time" className="w-[100px]" />
                    <Label className="w-[100px] text-right">Nº Solicitação</Label>
                    <Txt className="w-[120px]" />
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="w-[70px] text-right">Cadastro</Label>
                    <Txt type="date" className="w-[130px]" />
                    <Label className="w-[60px] text-right">Alteração</Label>
                    <Txt type="date" className="w-[130px]" />
                    <Label className="w-[50px] text-right">Status</Label>
                    <Txt
                      className="flex-1 bg-gray-100 text-gray-600"
                      defaultValue="EM ANDAMENTO"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Label className="w-[60px] text-right">Filial</Label>
                    <Sel className="flex-1">
                      <option>001 - TESTE MANTRAN</option>
                    </Sel>
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="w-[60px] text-right">Nº Coleta</Label>
                    <Txt className="w-[120px]" />
                    <Label className="w-[70px] text-right">Nº Viagem</Label>
                    <Txt className="w-[120px]" />
                    <Label className="w-[80px] text-right">Operador</Label>
                    <Txt className="flex-1" defaultValue="SUPORTE" />
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="w-[60px] text-right">Placa</Label>
                    <Txt className="w-[100px]" defaultValue="RXW4156" />
                    <Label className="w-[60px] text-right">Divisão</Label>
                    <Sel className="flex-1">
                      <option>LOGÍSTICA</option>
                      <option>ADMINISTRATIVO</option>
                    </Sel>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 — Participantes */}
            <div className="border border-gray-300 rounded p-2 bg-white space-y-2">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Participantes
              </h2>

              {["Solicitante", "Remetente", "Expedidor", "Destinatário"].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-3 flex-wrap">
                    <Label className="w-[100px] text-right">{item}</Label>
                    <Txt className="w-[180px]" placeholder="CNPJ" />
                    <Txt className="flex-1" placeholder="Razão Social" />
                    <Txt className="w-[420px]" placeholder="Cidade" />
                    <Txt
                      className="w-[40px] text-center"
                      maxLength={2}
                      placeholder="UF"
                    />
                  </div>
                )
              )}
            </div>

               {/* CARD 3 — Detalhes da Coleta */}
            <div className="border border-gray-300 rounded p-2 bg-white space-y-2">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Detalhes da Coleta
              </h2>

              <div className="flex items-center gap-3 flex-wrap">
                <Label className="w-[90px] text-right">Data Coleta</Label>
                <Txt type="date" className="w-[130px]" />
                <Label className="w-[40px] text-right">Hora</Label>
                <Txt type="time" className="w-[100px]" />
                <Label className="w-[70px] text-right">Restrição</Label>
                <Sel className="w-[120px]">
                  <option>ATÉ</option>
                  <option>ENTRE</option>
                </Sel>
                <Label className="w-[100px] text-right">Funcionamento</Label>
                <div className="flex items-center gap-1">
                  <Txt className="w-[70px]" defaultValue="08:00" />
                  <span>às</span>
                  <Txt className="w-[70px]" defaultValue="12:00" />
                  <span>-</span>
                  <Txt className="w-[70px]" defaultValue="13:00" />
                  <span>às</span>
                  <Txt className="w-[70px]" defaultValue="18:00" />
                </div>
                <Label className="w-[60px] text-right">Contato</Label>
                <Txt className="flex-1" />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Label className="w-[90px] text-right">Local Entrega</Label>
                <Txt className="w-[180px]" placeholder="CNPJ" />
                <Txt className="flex-1" placeholder="Razão Social" />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Label className="w-[90px] text-right">CEP</Label>
                <Txt className="w-[120px]" placeholder="00000-000" />
                <Label className="w-[60px] text-right">Cidade</Label>
                <Txt className="w-[250px]" placeholder="Cidade" />
                <Label className="w-[50px] text-right">UF</Label>
                <Txt className="w-[50px] text-center" maxLength={2} placeholder="UF" />
                <Label className="w-[50px] text-right">Bairro</Label>
                <Txt className="flex-1" placeholder="Bairro" />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Label className="w-[90px] text-right">Endereço</Label>
                <Txt className="flex-1" placeholder="Rua / Avenida" />
                <Label className="w-[20px] text-right">Nº</Label>
                <Txt className="w-[80px]" placeholder="Número" />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Label className="w-[90px] text-right">Produto</Label>
                <Txt className="w-[100px]" defaultValue="0000" />
                <Txt className="flex-1" placeholder="Descrição do Produto" />
                <Label className="w-[100px] text-right">Embalagem</Label>
                <Txt className="w-[100px]" defaultValue="000" />
                <Txt className="flex-1" placeholder="Tipo de Embalagem" />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Label className="w-[90px] text-right">Observação</Label>
                <Txt className="flex-1" placeholder="Observações sobre a coleta" />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Label className="w-[100px] text-right">Container</Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1 text-[12px]">
                    <input type="checkbox" /> Carga IMO
                  </label>
                  <label className="flex items-center gap-1 text-[12px]">
                    <input type="checkbox" /> Reefer Ligado
                  </label>
                  <label className="flex items-center gap-1 text-[12px]">
                    <input type="checkbox" /> Padrão Alimento
                  </label>
                  <label className="flex items-center gap-1 text-[12px]">
                    <input type="checkbox" /> Motorista
                  </label>
                </div>
              </div>
            </div>
            {/* CARD 4 — Notas Fiscais */}
<div className="border border-gray-300 rounded p-2 bg-white space-y-2">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">
    Notas Fiscais
  </h2>

  {/* Agrupar cada label + input em uma coluna */}
  <div className="grid grid-cols-9 gap-3 items-start text-[12px] text-gray-600">
    {/* Qtd NF Inf. + botão */}
    <div className="flex flex-col items-center">
      <Label>Qtd NF Inf.</Label>
      <div className="flex items-center gap-1">
        <Txt className="w-[100px]" defaultValue="0" />
        <button
          title="Nota Fiscal"
          onClick={() => setShowNotaFiscal(true)}
          className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded p-[3px] flex items-center justify-center"
        >
          <FileText size={16} className="text-red-700" />
        </button>
      </div>
    </div>

    {/* Qtd NF Real */}
    <div className="flex flex-col items-center">
      <Label>Qtd NF Real</Label>
      <Txt className="w-[100px]" defaultValue="0" />
    </div>

    {/* Peso Inf. */}
    <div className="flex flex-col items-center">
      <Label>Peso Inf.</Label>
      <Txt className="w-[100px]" defaultValue="0,000" />
    </div>

    {/* Peso Real */}
    <div className="flex flex-col items-center">
      <Label>Peso Real</Label>
      <Txt className="w-[100px]" defaultValue="0" />
    </div>

    {/* Vol Inf. */}
    <div className="flex flex-col items-center">
      <Label>Vol Inf.</Label>
      <Txt className="w-[100px]" defaultValue="0,00" />
    </div>

    {/* Vol Real */}
    <div className="flex flex-col items-center">
      <Label>Vol Real</Label>
      <Txt className="w-[100px]" defaultValue="0,000" />
    </div>

    {/* Valor Inf. NF’s */}
    <div className="flex flex-col items-center">
      <Label>Valor Inf. NF’s</Label>
      <Txt className="w-[100px]" defaultValue="0,00" />
    </div>

    {/* Valor Real NF’s */}
    <div className="flex flex-col items-center">
      <Label>Valor Real NF’s</Label>
      <Txt className="w-[100px]" defaultValue="0,000" />
    </div>

    {/* Vr Kg Coleta */}
    <div className="flex flex-col items-center">
      <Label>Vr Kg Coleta</Label>
      <Txt className="w-[100px]" defaultValue="0,00" />
    </div>
  </div>
</div>


        {/* CARD 5 — Rodapé */}


<div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">

  {/* FECHAR */}
  <button
    title="Fechar Tela"
    onClick={() => navigate(-1)}
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Undo2 size={18} />
    <span>Fechar</span>
  </button>

  {/* LIMPAR */}
  <button
    title="Limpar Tela"
    className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <RotateCcw size={18} />
    <span>Limpar</span>
  </button>

  {/* INCLUIR */}
  <button
    title="Incluir"
    className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <PlusCircle size={18} />
    <span>Incluir</span>
  </button>

  {/* ALTERAR */}
  <button
    title="Alterar"
    className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Edit size={18} />
    <span>Alterar</span>
  </button>

  {/* COMEX */}
  <button
    title="Comex"
    onClick={() => setShowComex(true)}
    className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Globe2 size={18} />
    <span>Comex</span>
  </button>

  {/* DUPLICAR */}
  <button
    title="Duplicar Coleta"
    className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Copy size={18} />
    <span>Duplicar</span>
  </button>

  {/* ETIQUETAS EM LOTE */}
  <button
    title="Imprimir Etiquetas em Lote"
    className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <FileText size={18} />
    <span>Etiquetas</span>
  </button>

  {/* IMPRIMIR COLETA */}
  <button
    title="Imprimir Coleta"
    className={`flex flex-col items-center text-[11px]
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Printer size={18} />
    <span>Imprimir</span>
  </button>

</div>


{showNotaFiscal && (
  <NotasFiscalModal
    isOpen={showNotaFiscal}
    onClose={() => setShowNotaFiscal(false)}
  />
)}

{/* Modal de COMEX */}
{showComex && (
  <Comex
    isOpen={showComex}
    onClose={() => setShowComex(false)}
  />
)}
          </>
        ) : (
          <div className="flex  justify-center text-gray-500 italic h-full">
            {/* CONSULTA DE COLETAS */}
{activeTab === "consulta" ? (
    <div className="flex-1 flex flex-col bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto overflow-x-hidden pt-0">             {/* CARD 1 — Filtro de Pesquisa com colapso */}
            <div className="border border-gray-300 rounded p-2 bg-white mt-[4px] mx-2 mb-2 shadow-sm transition-all duration-300 ease-in-out">
              <div
                className="flex justify-between items-center cursor-pointer select-none"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                  Filtro de Pesquisa
                </h2>
                {isCollapsed ? (
                  <ChevronDown size={18} className="text-gray-600" />
                ) : (
                  <ChevronUp size={18} className="text-gray-600" />
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isCollapsed ? "max-h-[95px]" : "max-h-[2000px]"
                }`}
              >
                {/* LINHA 1 — Filial, Status */}
                <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
                  <div className="col-span-6 flex items-center gap-2">
                    <label className="w-[60px] text-right">Filial</label>
                    <select className="flex-1 border border-gray-300 rounded px-2 h-[24px]">
                      <option>008 - TRANSPORTADORA RODO IMPORT LTDA</option>
                      <option>001 - MATRIZ</option>
                    </select>
                  </div>
                  <div className="col-span-6 flex items-center gap-2">
                    <label className="w-[60px] text-right">Status</label>
                    <select className="flex-1 border border-gray-300 rounded px-2 h-[24px]">
                      <option>TODOS</option>
                      <option>NÃO INICIADO</option>
                      <option>EM ANDAMENTO</option>
                      <option>ENCERRADA</option>
                    </select>
                  </div>
                </div>

                {/* LINHA 2 — Período, Motorista */}
                <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
                  <div className="col-span-6 flex items-center gap-2">
                    <label className="w-[60px] text-right">Período</label>
                    <input
                      type="date"
                      defaultValue="2025-05-01"
                      className="border border-gray-300 rounded px-2 h-[24px] w-[130px]"
                    />
                    <span className="mx-1">até</span>
                    <input
                      type="date"
                      defaultValue="2025-10-22"
                      className="border border-gray-300 rounded px-2 h-[24px] w-[130px]"
                    />
                  </div>
                  <div className="col-span-6 flex items-center gap-2">
                    <label className="w-[70px] text-right">Motorista</label>
                    <input
                      className="w-[130px] border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="01628446760"
                    />
                    <input
                      className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="ALAN DA COSTA"
                    />
                  </div>
                </div>

                {/* LINHA 3 — Solicitante, Nº Coleta, CTRC */}
                <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
                  <div className="col-span-5 flex items-center gap-2">
                    <label className="w-[70px] text-right">Solicitante</label>
                    <input
                      className="w-[150px] border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="50221019000136"
                    />
                    <input
                      className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="HNK-ITU (1) MATRIZ"
                    />
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <label className="w-[70px] text-right">Nº Coleta</label>
                    <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" />
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <label className="w-[50px] text-right">CTRC</label>
                    <select className="flex-1 border border-gray-300 rounded px-2 h-[24px]">
                      <option>Ambos</option>
                      <option>Emitido</option>
                      <option>Não Emitido</option>
                    </select>
                  </div>
                </div>

                {/* LINHA 4 — Destinatário, Nº Solicitação */}
                <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
                  <div className="col-span-8 flex items-center gap-2">
                    <label className="w-[70px] text-right">Destinatário</label>
                    <input
                      className="w-[150px] border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="05254957005651"
                    />
                    <input
                      className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="HNK-SALVADOR-AGUA MI"
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <label className="w-[100px] text-right">Nº Solicitação</label>
                    <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" />
                  </div>
                </div>

                {/* LINHA 5 — Nº GMCI, Tipo, Nº Container, Carga IMO */}
                <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
                  <div className="col-span-3 flex items-center gap-2">
                    <label className="w-[70px] text-right">Nº GMCI</label>
                    <input
                      className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="1234654"
                    />
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <label className="w-[40px] text-right">Tipo</label>
                    <select className="flex-1 border border-gray-300 rounded px-2 h-[24px]">
                      <option>40 REEFER HIGH CUBIC</option>
                      <option>20 PÉS</option>
                      <option>DRY CARGO</option>
                    </select>
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <label className="w-[100px] text-right">Nº Container</label>
                    <input
                      className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="BICU 123.45G-7"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <label className="flex items-center gap-1">
                      <input type="checkbox" /> Carga IMO
                    </label>
                  </div>
                </div>

                {/* LINHA 6 — Nome Navio, Postergada, Com Postergada */}
                <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
                  <div className="col-span-5 flex items-center gap-2">
                    <label className="w-[70px] text-right">Nome Navio</label>
                    <input
                      className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
                      defaultValue="CAPE TOWN - AFRICA DO SUL"
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <label className="w-[80px] text-right">Postergada</label>
                    <input
                      type="datetime-local"
                      defaultValue="2025-10-22T17:39"
                      className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
                    />
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <label className="flex items-center gap-1">
                      <input type="checkbox" /> Com Postergada
                    </label>
                  </div>
                </div>

                {/* LINHA 7 — Botões */}
                <div className="flex justify-end gap-2 mt-2">
                  <button className="border border-gray-300 text-[12px] px-3 py-[2px] rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Pesquisar
                  </button>

                  <button className="border border-gray-300 text-[12px] px-3 py-[2px] rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6h18M3 12h18M3 18h18"
                      />
                    </svg>
                    Limpar
                  </button>
                </div>
              </div>
            </div>

   {/* CARD 2 — Grid de Coletas */}
<div className="border border-gray-300 rounded p-2 bg-white">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">
    Relação de Coletas
  </h2>

  <div className="border border-gray-300 rounded overflow-auto">
    <table className="min-w-full text-[12px] text-gray-700 font-normal border-collapse">
      <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
        <tr className="text-center">
          <th className="px-2 py-[4px] border-r w-[30px]">
            <input type="checkbox" />
          </th>
          <th className="px-2 py-[4px] border-r">Status</th>
          <th className="px-2 py-[4px] border-r">Filial</th>
          <th className="px-2 py-[4px] border-r">Nº Coleta</th>
          <th className="px-2 py-[4px] border-r">Data Coleta</th>
          <th className="px-2 py-[4px] border-r">Cliente</th>
          <th className="px-2 py-[4px] border-r">Cidade</th>
          <th className="px-2 py-[4px] border-r">UF</th>
          <th className="px-2 py-[4px] border-r">Motorista</th>
          <th className="px-2 py-[4px]">Placa</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {[
          { status: "ENCERRADA", cor: "text-green-700" },
          { status: "EM ANDAMENTO", cor: "text-blue-700" },
          { status: "NÃO INICIADO", cor: "text-red-700" },
        ].map((item, i) => (
          <tr
            key={i}
            className="hover:bg-gray-50 border-t border-gray-200"
          >
            <td className="px-2 py-[4px] border-r">
             <input
  type="checkbox"
  onChange={() => setSelectedStatus(item.status)}
  name="coleta"
  className="cursor-pointer"
/>
            </td>
            <td className={`px-2 py-[4px] font-semibold border-r ${item.cor}`}>
              {item.status}
            </td>
            <td className="px-2 py-[4px] border-r">001</td>
            <td className="px-2 py-[4px] border-r">18570{i}</td>
            <td className="px-2 py-[4px] border-r">14/10/2025</td>
            <td className="px-2 py-[4px] border-r">HNK-ITU (1) MATRIZ</td>
            <td className="px-2 py-[4px] border-r">ITU</td>
            <td className="px-2 py-[4px] border-r">SP</td>
            <td className="px-2 py-[4px] border-r">ALAN DA COSTA</td>
            <td className="px-2 py-[4px]">RXW4156</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    {/* CARD 3 — Rodapé */}
    <div className="border border-gray-300 rounded p-2 bg-white flex items-center justify-between text-[12px]">
      <span className="text-gray-600">Total de registros: 3</span>

      <div className="flex gap-2">
<button
  disabled={selectedStatus !== "NÃO INICIADO"}
  onClick={() => selectedStatus === "NÃO INICIADO" && setShowModalInicio(true)}
  className={`border border-gray-300 px-3 py-[2px] rounded ${
    selectedStatus === "NÃO INICIADO"
      ? "bg-blue-50 hover:bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-400 cursor-not-allowed"
  }`}
>
  Iniciar
</button>

<button
  disabled={selectedStatus !== "EM ANDAMENTO"}
  onClick={() => selectedStatus === "EM ANDAMENTO" && setShowModalEncerrar(true)}
  className={`border border-gray-300 px-3 py-[2px] rounded ${
    selectedStatus === "EM ANDAMENTO"
      ? "bg-green-50 hover:bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-400 cursor-not-allowed"
  }`}
>
  Encerrar
</button>

        <button className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-[2px] rounded">
          Cancelar
        </button>
        <button className="border border-gray-300 bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-[2px] rounded">
          Estornar
        </button>
      </div>
    </div>
    <InicioColetaModal
  isOpen={showModalInicio}
  onClose={() => setShowModalInicio(false)}
/>
<EncerraColetaModal
  isOpen={showModalEncerrar}
  onClose={() => setShowModalEncerrar(false)}
/>
  </div>
) : (
  <div className="flex items-center justify-center text-gray-500 italic ">
    Tela de Cadastro — em construção
  </div>
)}

          </div>
        )}
      </div>
      
    </div>
  );
}
