import { useState } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helpers padrão (iguais ao CTePage.jsx)
function Label({ children, className = "" }) {
  return <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>;
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
  const [isCollapsedConsulta, setIsCollapsedConsulta] = useState(false);
  const [isCollapsedEntregas, setIsCollapsedEntregas] = useState(false);
  const navigate = useNavigate();
  const [isCollapsedFilial, setIsCollapsedFilial] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

const handleCheckboxChange = (e) => {
  if (e.target.checked) {
    setSelectedCount((prev) => prev + 1);
  } else {
    setSelectedCount((prev) => Math.max(prev - 1, 0));
  }
};
  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
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
            className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${
              activeTab === tab
                ? "bg-white text-red-700 border-gray-300"
                : "bg-gray-100 text-gray-600 border-transparent"
            } ${tab !== "manifesto" ? "ml-1" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto flex flex-col gap-2">
        {/* ===================== ABA MANIFESTO ===================== */}
        {activeTab === "manifesto" && (
          <>
        {/* CARD 1 - Dados da Filial (com expandir/recolher ajustado) */}
<div className="border border-gray-300 rounded bg-white">
  {/* Cabeçalho do card */}
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

  {/* Conteúdo do card */}
<div
  className={`overflow-hidden transition-all duration-500 ease-in-out ${
    isCollapsedFilial ? "max-h-[115px]" : "max-h-[1000px]"
  }`}
>

    <div className="p-3 space-y-2">
      {/* Linha 01 */}
      <div className="flex items-center gap-2">
        <Label className="w-24">Nº Manifesto</Label>
        <Txt className="w-32" defaultValue="043559" />
        <Label className="ml-2 w-10 text-right">Data</Label>
        <Txt type="date" className="w-40" defaultValue="2025-10-13" />
        <Label className="ml-2 w-14 text-right">Nº MDF-e</Label>
        <Txt className="w-32" />
        <Label className="ml-4 w-[100px] text-right">Tp. Manifesto</Label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1 text-[13px]">
            <input type="radio" name="tpManifesto" defaultChecked /> Coleta / Entrega
          </label>
          <label className="flex items-center gap-1 text-[13px]">
            <input type="radio" name="tpManifesto" /> Transferência
          </label>
        </div>
        <button
          className="ml-auto border border-gray-300 text-gray-800 hover:bg-gray-100 rounded w-[140px] py-1 text-[12px] flex items-center justify-center gap-1"
          title="Enviar MDF-e"
        >
          <i className="fa-solid fa-paper-plane text-red-600"></i>
          <span>Enviar MDF-e</span>
        </button>
      </div>

      {/* Linha 02 */}
      <div className="flex items-center gap-2">
        <Label className="w-24">Empresa</Label>
        <Sel className="flex-1">
          <option>001 - MANTRAN TRANSPORTES LTDA</option>
        </Sel>
        <Label className="w-28 text-right">Filial Destino</Label>
        <Sel className="w-[calc(50%-150px)]">
          <option>001 - TESTE MANTRAN</option>
        </Sel>
        <button
          className="ml-auto border border-gray-300 text-gray-800 hover:bg-gray-100 rounded w-[140px] py-1 text-[12px] flex items-center justify-center gap-1"
          title="Visualizar Entregas"
        >
          <i className="fa-solid fa-truck text-red-600"></i>
          <span>Entregas</span>
        </button>
      </div>

      {/* Linha 03 */}
      <div className="flex items-center gap-2">
        <Label className="w-24">Filial Emitente</Label>
        <Sel className="flex-1">
          <option>001 - TESTE MANTRAN</option>
        </Sel>
        <Label className="w-28 text-right">Filial Trânsito</Label>
        <Sel className="w-[calc(50%-150px)]">
          <option>001 - TESTE MANTRAN</option>
        </Sel>
        <button
          className="ml-auto border border-gray-300 text-gray-800 hover:bg-gray-100 rounded w-[140px] py-1 text-[12px] flex items-center justify-center gap-1"
          title="Informar Carga Perigosa"
        >
          <i className="fa-solid fa-triangle-exclamation text-yellow-500"></i>
          <span>Carga Perigosa</span>
        </button>
      </div>

      {/* Linha 04 */}
      <div className="flex items-center gap-2">
        <Label className="w-24">Nº Lacres</Label>
        <Txt className="flex-1" />
        <Label className="w-28 text-right">Cargas Soltas</Label>
        <Txt className="w-24 text-center" defaultValue="0" />
        <Label className="ml-3 w-28 text-right">Acerto Conta</Label>
        <Txt className="w-32" />
      </div>

      {/* Linha 05 */}
      <div className="flex items-center gap-2">
        <Label className="w-24">Observação</Label>
        <Txt className="flex-1" />
      </div>

      {/* Linha 06 */}
      <div className="flex items-center gap-2">
        <Label className="w-24">Chave MDF-e</Label>
        <Txt className="flex-1" />
        <Label className="w-20 text-right">Protocolo</Label>
        <Txt className="w-48" />
        <Label className="w-20 text-right">Status</Label>
        <Txt className="w-40" />
      </div>
    </div>
  </div>
</div>



 {/* CARD 2 - Dados da Viagem */}
<div className="border border-gray-300 rounded bg-white">
  {/* Cabeçalho */}
  <div className="flex justify-between items-center px-3 py-0 bg-gray-50 rounded-t">
    <h2 className="text-red-700 font-semibold text-[13px]">Dados da Viagem</h2>
  </div>

  {/* Conteúdo */}
  <div className="p-3 space-y-2">
    {/* Linha 01 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Filial Origem</Label>
      <Sel className="flex-1">
        <option>001 - MANTRAN TECNOLOGIAS LTDA ME</option>
      </Sel>
      <Label className="w-24 text-right">Tipo Carga</Label>
      <Sel className="w-[180px]">
        <option>0 - FECHADA</option>
        <option>1 - FRACIONADA</option>
      </Sel>
      <Label className="w-24 text-right">Nº Viagem</Label>
      <Txt className="w-[120px]" defaultValue="079029" />
      <Label className="w-20 text-right">Nº Prog.</Label>
      <Txt className="w-[120px]" defaultValue="15304" />
    </div>

    {/* Linha 02 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Motorista</Label>
      <div className="flex items-center flex-1 gap-1">
        <Txt className="flex-1" defaultValue="01628446760" />
        <button
          title="Editar Motorista"
          className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
        >
          <i className="fa-solid fa-pen text-red-600"></i>
        </button>
        <Txt className="flex-[2]" defaultValue="ALAN DA COSTA" />
      </div>
      <Label className="w-24 text-right">Prev. Entrega</Label>
      <Txt type="date" className="w-[160px]" defaultValue="2025-10-13" />
      <Label className="w-20 text-right">Km Atual</Label>
      <Txt className="w-[100px] text-center" defaultValue="1" />
    </div>

    {/* Linha 03 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Tração</Label>
      <div className="flex flex-1 gap-1 items-center">
        <Txt className="w-[100px]" defaultValue="0035719" />
        <div className="flex items-center flex-1 gap-1">
          <Txt className="flex-1" defaultValue="RXW4I56 - CAVALO MEC - ITAJAÍ" />
          <button
            title="Editar Tração"
            className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
          >
            <i className="fa-solid fa-pen text-red-600"></i>
          </button>
        </div>
        <div className="flex items-center gap-1">
          <Txt className="w-[200px] text-center" defaultValue="AGREGADO" />
          <button
            title="Editar Frota"
            className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
          >
            <i className="fa-solid fa-pen text-red-600"></i>
          </button>
        </div>
      </div>
      <Label className="w-24 text-right">Capacidade</Label>
      <div className="flex items-center gap-1">
        <Txt className="w-[120px] text-center" defaultValue="12000" />
        <span className="text-[12px] text-gray-600">Kg</span>
      </div>
      <Label className="w-20 text-right">Km Início</Label>
      <Txt className="w-[100px] text-center" defaultValue="1" />
    </div>

    {/* Linha 04 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Reboque</Label>
      <div className="flex flex-1 items-center gap-1">
        <Txt className="w-[100px]" defaultValue="0034811" />
        <Txt className="flex-1" defaultValue="RKW3E53 - CARRETA SIDER - ITAJAÍ" />
        <button
          title="Editar Reboque"
          className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
        >
          <i className="fa-solid fa-pen text-red-600"></i>
        </button>
      </div>
      <Label className="w-24 text-right">Frete Combinado</Label>
      <div className="flex items-center gap-1">
        <Txt className="w-[120px]" />
        <button
          title="Editar Frete Combinado"
          className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
        >
          <i className="fa-solid fa-pen text-orange-500"></i>
        </button>
      </div>
      <Label className="w-20 text-right">Km Final</Label>
      <Txt className="w-[100px] text-center" defaultValue="0" />
    </div>

    {/* Linha 05 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Reboque 2</Label>
      <div className="flex flex-1 items-center gap-1">
        <Txt className="w-[100px]" defaultValue="0000006" />
        <Txt className="flex-1" defaultValue="ABV0229 - RANDON - MARINGÁ" />
        <button
          title="Editar Reboque 2"
          className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
        >
          <i className="fa-solid fa-pen text-red-600"></i>
        </button>
      </div>
      <Label className="w-24 text-right">Tab. Agregado</Label>
      <div className="flex items-center gap-1">
        <Txt className="w-[200px]" />
        <button
          title="Tabela Agregado"
          className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
        >
          <i className="fa-solid fa-dollar-sign text-green-600"></i>
        </button>
      </div>
    </div>
  </div>
</div>



            {/* CARD 3 - Informações Complementares */}
<div className="border border-gray-300 rounded bg-white">
  {/* Cabeçalho */}
  <div className="flex justify-between items-center px-3 py-0 bg-gray-50 rounded-t">
    <h2 className="text-red-700 font-semibold text-[13px]">
      Informações Complementares
    </h2>
  </div>

  {/* Conteúdo */}
  <div className="p-3 space-y-2">
    {/* Linha 01 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Local Carga</Label>
      <Txt className="w-[120px]" defaultValue="13312900" />
      <Txt className="flex-1" defaultValue="ITU" />
      <Txt className="w-[50px] text-center" defaultValue="SP" />

      <div className="flex items-center gap-2 ml-auto">
        <button
          title="Percurso"
          className="border border-gray-300 px-3 py-[3px] rounded hover:bg-gray-100 text-gray-700 flex items-center gap-1 w-[100px] justify-center"
        >
          <i className="fa-solid fa-route text-green-600"></i>
          <span>Percurso</span>
        </button>

        <button
          title="Seguro"
          className="border border-gray-300 px-3 py-[3px] rounded hover:bg-gray-100 text-gray-700 flex items-center gap-1 w-[100px] justify-center"
        >
          <i className="fa-solid fa-shield-halved text-orange-500"></i>
          <span>Seguro</span>
        </button>

        <button
          title="Informações Complementares"
          className="border border-gray-300 px-3 py-[3px] rounded hover:bg-gray-100 text-gray-700 flex items-center gap-1 w-[130px] justify-center"
        >
          <i className="fa-solid fa-circle-info text-blue-500"></i>
          <span>Info. Compl.</span>
        </button>
      </div>
    </div>

    {/* Linha 02 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Local Descarga</Label>
      <Txt className="w-[120px]" defaultValue="40000000" />
      <Txt className="flex-1" defaultValue="SALVADOR" />
      <Txt className="w-[50px] text-center" defaultValue="BA" />

      <Label className="w-16 text-right">Rota</Label>
      <Sel className="w-[180px]">
        <option>SP X PA</option>
      </Sel>

      <Txt className="w-[130px] text-right" defaultValue="1430,000" />
    </div>

    {/* Linha 03 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Remetente</Label>
      <Txt className="w-[200px]" defaultValue="50221019000136" />
      <Txt className="flex-1" defaultValue="HNK-ITU (1) MATRIZ" />
      <button
        title="Editar Remetente"
        className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
      >
        <i className="fa-solid fa-pen text-red-600"></i>
      </button>
    </div>

    {/* Linha 04 */}
    <div className="flex items-center gap-2">
      <Label className="w-28">Destinatário</Label>
      <Txt className="w-[200px]" defaultValue="05254957005651" />
      <Txt className="flex-1" defaultValue="HNK-SALVADOR: ÁGUA MI" />
      <button
        title="Editar Destinatário"
        className="border border-gray-300 px-[6px] py-[3px] rounded hover:bg-gray-100"
      >
        <i className="fa-solid fa-pen text-red-600"></i>
      </button>
    </div>
  </div>
</div>


           {/* CARD 4 - Averbação (sem título) */}
<div className="border border-gray-300 rounded p-2 bg-white">
  <div className="flex flex-wrap items-center gap-3">
    <Label className="w-[100px] text-right">Cadastro</Label>
    <Txt type="date" className="w-[140px]" defaultValue="2025-10-24" />
    <Label className="w-[100px] text-right">Usuário</Label>
    <Txt className="w-[160px]" defaultValue="SUPORTE" readOnly />
    <Label className="w-[120px] text-right">Protocolo</Label>
    <Txt className="flex-1" defaultValue="MFT20251024001" readOnly />
  </div>

  {/* Linha de Averbação */}
<p className="text-[12px] text-green-900 bg-green-200 py-1 text-center w-full rounded-sm mt-1">
  Averbado em <span className="font-semibold">15/10/2025</span> com o Nº Averbação:{" "}
  <span className="font-mono">06513102504086140001415700100005880134</span>{" "}
  e Protocolo: <span className="font-semibold">TESTE</span>
</p>
</div>

            {/* Rodapé */}
            <div className="border-t border-gray-300 bg-white py-0 px-3 flex items-center gap-3 text-red-700">
              <button onClick={() => navigate(-1)}>
                <XCircle title="Fechar Tela" />
              </button>
              <RotateCcw title="Limpar" />
              <PlusCircle title="Incluir" />
              <Edit title="Alterar" />
              <Trash2 title="Excluir" />
              <Printer title="Imprimir" />
              <Copy title="Duplicar" />
              <Search title="Pesquisar" />
            </div>
          </>
        )}

        {/* ===================== ABA CONSULTA ===================== */}
        {activeTab === "consulta" && (
          <>
            {/* CARD 1 - Filtro de Pesquisa (Expansível) */}
<div className="border border-gray-300 rounded p-2 bg-white">
  <div
    className="flex justify-between items-center cursor-pointer select-none"
    onClick={() => setIsCollapsedConsulta(!isCollapsedConsulta)}
  >
    <h2 className="text-red-700 font-semibold text-[13px]">Filtro de Pesquisa</h2>
    {isCollapsedConsulta ? (
      <ChevronDown size={18} className="text-gray-600" />
    ) : (
      <ChevronUp size={18} className="text-gray-600" />
    )}
  </div>

  <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${
      isCollapsedConsulta ? "max-h-[40px]" : "max-h-[800px]"
    }`}
  >
    <div className="p-3 space-y-2">
      {/* Linha 01 */}
      <div className="flex items-center gap-2">
        <Label className="w-28">Filial Vínculo</Label>
        <Sel className="flex-1">
          <option>001 - MANTRAN TECNOLOGIAS LTDA ME</option>
          <option>002 - MANTRAN TECNOLOGIAS FILIAL 002</option>
        </Sel>
        <Label className="w-24 text-right">Ocorrência</Label>
        <Sel className="w-[300px]">
          <option>Todos</option>
          <option>Manifesto Baixado</option>
          <option>Encerrado</option>
        </Sel>
      </div>

      {/* Linha 02 */}
      <div className="flex items-center gap-2">
        <Label className="w-28">Veículo</Label>
        <Txt className="w-[120px]" />
        <Txt className="flex-1" placeholder="Descrição / Placa" />

        <Label className="w-24 text-right">Motorista</Label>
        <Txt className="w-[160px]" placeholder="CNH / CPF" />
        <Txt className="flex-1" placeholder="Nome do Motorista" />
      </div>

      {/* Linha 03 */}
      <div className="flex items-center gap-2">
        <Label className="w-28">Período</Label>
        <Txt type="date" className="w-[160px]" defaultValue="2025-05-24" />
        <span>Até</span>
        <Txt type="date" className="w-[160px]" defaultValue="2025-10-24" />

        <Label className="w-28 text-right">Nº Manifesto</Label>
        <Txt className="w-[120px]" />

        <Label className="w-20 text-right">Nº MDF-e</Label>
        <Txt className="w-[120px]" />
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
           {/* CARD 1 - Filtro (Expansível) */}
<div className="border border-gray-300 rounded p-2 bg-white">
  {/* Cabeçalho do card */}
  <div
    className="flex justify-between items-center cursor-pointer select-none"
    onClick={() => setIsCollapsedEntregas(!isCollapsedEntregas)}
  >
    <h2 className="text-red-700 font-semibold text-[13px]">Filtro de Entregas</h2>
    {isCollapsedEntregas ? (
      <ChevronDown size={18} className="text-gray-600" />
    ) : (
      <ChevronUp size={18} className="text-gray-600" />
    )}
  </div>

  {/* Conteúdo expansível */}
  <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${
      isCollapsedEntregas ? "max-h-[45px]" : "max-h-[800px]"
    }`}
  >
    <div className="p-3 space-y-2">
      {/* Linha 1 */}
      <div className="flex items-center gap-3">
        <Label className="w-28">Filial Vínculo</Label>
        <Sel className="flex-1">
          <option>001 - MANTRAN TECNOLOGIAS LTDA ME </option>
          <option>002 - MANTRAN TECNOLOGIAS FILIAL VALINHOS</option>
        </Sel>

        <Label className="w-24 text-right">Ocorrência</Label>
        <Sel className="w-[300px]">
          <option>Todos</option>
          <option>Manifesto Baixado</option>
          <option>Em Trânsito</option>
          <option>Entregue</option>
        </Sel>
      </div>

      {/* Linha 2 */}
      <div className="flex items-center gap-3">
        <Label className="w-28">Veículo</Label>
        <div className="flex flex-1 gap-1">
          <Txt className="w-[120px]" defaultValue="0000001" />
          <Txt
            className="flex-1"
            defaultValue="RENSJ17 - VW 24280 CRM 6X2 - BITRUCK - BRASÍLIA"
          />
        </div>

        <Label className="w-24 text-right">Motorista</Label>
        <div className="flex flex-1 gap-1">
          <Txt className="w-[160px]" defaultValue="01628446760" />
          <Txt className="flex-1" defaultValue="ALAN DA COSTA" />
        </div>
      </div>

      {/* Linha 3 */}
      <div className="flex items-center gap-3">
        <Label className="w-28">Período</Label>
        <Txt type="date" className="w-[160px]" defaultValue="2025-10-24" />
        <span className="text-[12px] text-gray-600">Até</span>
        <Txt type="date" className="w-[160px]" defaultValue="2025-10-24" />
      </div>
    </div>
  </div>
</div>


         {/* CARD 2 - Botões */}
<div className="border border-gray-300 rounded p-2 bg-white flex justify-end gap-3">
  <button className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
    <FileText size={14} className="text-red-700" />
    <span>Rel. Ocorrência</span>
  </button>
  <button className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
    <Search size={14} className="text-red-700" />
    <span>Pesquisar</span>
  </button>
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
      </div>
    </div>
  );
}
