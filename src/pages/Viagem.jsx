import { useState } from "react";
import ViagemDespesa from "./ViagemDespesa";
import ViagemCustosOperacionais from "./ViagemCustosOperacionais";
import ViagemInicio from "./ViagemInicio";
import ViagemEncerramento from "./ViagemEncerramento";

import {
  XCircle,
  CheckCircle,
  RotateCcw,
  PlayCircle,
  PlusCircle,
  Edit,
  Trash2,
  Printer,
  Copy,
  Search,
  FileText,
  FileSpreadsheet,
  Download,
  Truck,
  DollarSign,
  MapPin,
  Eraser,
  PanelBottom,
} from "lucide-react";



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

export default function Viagem({ open }) {
  const [activeTab, setActiveTab] = useState("viagem");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEncerrarOpen, setModalEncerrarOpen] = useState(false);
  const [modalPagamentoOpen, setModalPagamentoOpen] = useState(false);
  const [modalCustosOpen, setModalCustosOpen] = useState(false);
  const [modalInicioOpen, setModalInicioOpen] = useState(false);

  // Estados para o grid de adição e documentos da viagem
  const [docsAdicao, setDocsAdicao] = useState(
    [...Array(8)].map((_, i) => ({
      id: i,
      empresa: "001",
      filial: "001",
      razao: "HNK BR IND. BEBIDAS LTDA",
      controle: `0588${i}`,
      impresso: `0588${i}`,
      emissao: "20/10/2025",
      selecionado: false,
    }))
  );

// === GRID CONSULTA ===
const [gridConsulta, setGridConsulta] = useState(
  [...Array(10)].map((_, i) => ({
    id: i,
    status:
      i === 2
        ? "EM ANDAMENTO"
        : i === 5
        ? "ENCERRADA"
        : i === 7
        ? "CANCELADA"
        : "NÃO INICIADA",
    selecionado: false,
  }))
);

// Contadores
const totalConsulta = gridConsulta.length;
const totalSelConsulta = gridConsulta.filter((x) => x.selecionado).length;

// Funções
const selecionarTodosConsulta = () =>
  setGridConsulta((prev) => prev.map((x) => ({ ...x, selecionado: true })));

const limparSelecaoConsulta = () =>
  setGridConsulta((prev) => prev.map((x) => ({ ...x, selecionado: false })));


  
  const [docsViagem, setDocsViagem] = useState([]); // Documentos adicionados
 
  // === Estado das despesas ===
const [despesas, setDespesas] = useState([
  { id: 1, tipo: "Pedágio", descricao: "Praça de Itu", valor: 25, data: "2025-10-27", operador: "SUPORTE", selecionado: false },
]);

    const saldoFicha = docsViagem.length * 450; // exemplo — substitua com seu cálculo real

  // Adiciona os documentos selecionados à grid principal
const handleAdicionar = () => {
  const selecionados = docsAdicao.filter((d) => d.selecionado);
  if (selecionados.length === 0) return;

  setDocsViagem((prev) => [...prev, ...selecionados]);
  setDocsAdicao((prev) =>
    prev.map((d) => ({ ...d, selecionado: false }))
  );
};

// Remove os documentos selecionados da grid principal
const handleRemover = () => {
  setDocsViagem((prev) => prev.filter((d) => !d.selecionado));
};

// === Funções da aba Despesas ===
const handleAdicionarDespesa = () => {
  const nova = {
    id: Date.now(),
    tipo: "Despesa Manual",
    descricao: "Nova despesa incluída",
    valor: 100,
    data: new Date().toISOString().slice(0, 10),
    operador: "SUPORTE",
    selecionado: false,
  };
  setDespesas((prev) => [...prev, nova]);
};

const handleRemoverDespesa = () => {
  setDespesas((prev) => prev.filter((d) => !d.selecionado));
};


  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${open ? "ml-[192px]" : "ml-[56px]"
        }`}
    >
      {/* TÍTULO */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        VIAGEM
      </h1>

      {/* ABAS */}
      <div className="flex border-b border-gray-300 bg-white">
        {["viagem", "consulta", "doctos", "despesas", "entregas", "ficha"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${activeTab === tab
              ? "bg-white text-red-700 border-gray-300"
              : "bg-gray-100 text-gray-600 border-transparent"
              } ${tab !== "viagem" ? "ml-1" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* CONTEÚDO */}
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto flex flex-col gap-2">

        {/* ===================== ABA VIAGEM ===================== */}
        {activeTab === "viagem" && (
          <>
         {/* === CARD 1 - Dados da Viagem === */}
<fieldset className="border border-gray-300 rounded p-3">
  <legend className="text-red-700 font-semibold px-2">Viagem</legend>

  {/* Linha 1 */}
  <div className="grid grid-cols-12 gap-2 items-center">
    {/* Nº Viagem */}
    <div className="col-span-2 flex items-center gap-1">
      <Label className="whitespace-nowrap">Nº Viagem</Label>
      <Txt className="w-full" />
    </div>

    {/* SQ + Transferência + botão (+) */}
    <div className="col-span-3 flex items-center gap-1">
      <Txt className="w-[50px] text-center" maxLength={1} />
      <Txt className="w-[130px] text-center" defaultValue="TRANSFERÊNCIA" />
      <button
        title="Adicionar"
        className="border border-gray-300 rounded p-[4px] hover:bg-gray-100 flex items-center justify-center"
      >
        <PlusCircle size={16} className="text-green-600" />
      </button>
    </div>

    {/* Tipo */}
    <div className="col-span-2 flex items-center gap-1 justify-end">
      <Label className="whitespace-nowrap">Tipo</Label>
      <Sel className="w-full">
        <option>Normal</option>
        <option>Complementar</option>
      </Sel>
    </div>

    {/* Manifesto */}
    <div className="col-span-2 flex items-center gap-1 justify-end">
      <Label className="whitespace-nowrap">Manifesto</Label>
      <Txt className="w-full" />
    </div>

    {/* Coleta */}
    <div className="col-span-1 flex items-center gap-1 justify-end">
      <Label className="whitespace-nowrap">Coleta</Label>
      <Txt className="w-full" />
    </div>

    {/* Status */}
    <div className="col-span-2 flex items-center gap-1 justify-end">
      <Label className="whitespace-nowrap">Status</Label>
      <Txt
        className="w-full text-center bg-gray-100 font-medium"
        defaultValue="Em Andamento"
        readOnly
      />
    </div>
  </div>

  {/* Linha 2 */}
  <div className="grid grid-cols-12 gap-2 mt-2 items-center">
    {/* Empresa */}
    <div className="col-span-4 flex items-center gap-1">
      <Label className="whitespace-nowrap">Empresa</Label>
      <Sel className="w-full">
        <option>001 - MANTRAN TRANSPORTES LTDA</option>
      </Sel>
    </div>

    {/* Filial (abaixo do Tipo e depois de Empresa) */}
    <div className="col-span-3 flex items-center gap-1 justify-end">
      <Label className="whitespace-nowrap">Filial</Label>
      <Sel className="w-full">
        <option>001 - MANTRAN TRANSPORTES LTDA</option>
      </Sel>
    </div>

    {/* Tipo Carga */}
    <div className="col-span-3 flex items-center gap-1 justify-end">
      <Label className="whitespace-nowrap">Tipo Carga</Label>
      <Sel className="w-full">
        <option>Fracionada</option>
        <option>Fechada</option>
      </Sel>
    </div>

    {/* Divisão (no final da linha) */}
    <div className="col-span-2 flex items-center gap-1 justify-end">
      <Label className="whitespace-nowrap">Divisão</Label>
      <Sel className="w-full">
        <option>Logística</option>
        <option>Administrativo</option>
      </Sel>
    </div>
  </div>
</fieldset>


           {/* === CARD 2 - Origem === */}
<fieldset className="border border-gray-300 rounded p-3">
  <legend className="text-red-700 font-semibold px-2">Origem</legend>

  {/* Linha 1 */}
  <div className="grid grid-cols-12 gap-2 items-center">
    {/* Cliente */}
    <div className="col-span-2 flex items-center gap-1">
      <Label className="ml-[20px]" >Cliente</Label>
      <Txt className="w-full" placeholder="CNPJ" />
    </div>

    <div className="col-span-3">
      <Txt className="w-full" placeholder="Razão Social" />
    </div>

    {/* Expedidor */}
    <div className="col-span-3 flex items-center gap-1 justify-end">
      <Label className="ml-[5px]">Expedidor</Label>
      <Txt className="w-[45%]" placeholder="CNPJ" />
    </div>

    <div className="col-span-4">
      <Txt className="w-full" placeholder="Razão Social" />
    </div>
  </div>

  {/* Linha 2 */}
  <div className="grid grid-cols-12 gap-2 mt-2 items-center">
    {/* Remetente */}
    <div className="col-span-2 flex items-center gap-1">
      <Label>Remetente</Label>
      <Txt className="w-full" placeholder="CNPJ" />
    </div>

    <div className="col-span-3">
      <Txt className="w-full" placeholder="Razão Social" />
    </div>

    {/* Origem */}
    <div className="col-span-1 flex justify-end">
      <Label className="whitespace-nowrap">Origem</Label>
    </div>

    <div className="col-span-2">
      <Txt className="w-[full]" placeholder="CEP" />
    </div>

    <div className="col-span-3">
      <Txt className="w-full" placeholder="Cidade" />
    </div>

    <div className="col-span-1">
      <Txt className="w-full text-center" placeholder="UF" />
    </div>
  </div>

  {/* Linha 3 */}
  <div className="grid grid-cols-12 gap-2 mt-2 items-center">
    {/* Tab. Frete */}
    <div className="col-span-2 flex items-center gap-1">
      <Label className="whitespace-nowrap">Tab. Frete</Label>
      <Sel className="w-full">
        <option>000083 - TABELA TESTE HNK</option>
      </Sel>
    </div>

    <div className="col-span-2">
      <Sel className="w-full">
        <option>CEVA</option>
        <option>GB</option>
        <option>NF</option>
      </Sel>
    </div>

    {/* Rateio Frete */}
    <div className="col-span-3 flex items-center gap-1">
      <label className="flex items-center gap-1 text-[12px]">
        <input type="checkbox" /> Rateio Frete (Contrato)
      </label>
    </div>

    {/* Veículo Solicitado */}
    <div className="col-span-3 flex items-center gap-1 justify-end">
      <Label className="whitespace-nowrap">Veículo Solicitado</Label>
      <Sel className="w-full">
        <option>01 - UTILITÁRIO</option>
        <option>02 - VAN</option>
        <option>03 - 3/4</option>
        <option>04 - TOCO</option>
        <option>05 - TRUCK</option>
        <option>06 - BITRUCK</option>
        <option>07 - CAVALO MECÂNICO</option>
        <option>08 - CAVALO TRUCADO</option>
      </Sel>
    </div>

    {/* Botão Custos Adicionais */}
    <div className="col-span-2 flex justify-end">
      <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-3 py-[4px] flex items-center gap-1">
        <DollarSign size={14} className="text-red-700" />
        Custos Adicionais
      </button>
    </div>
  </div>
</fieldset>


            {/* === CARD 3 - Destino === */}
            <fieldset className="border border-gray-300 rounded p-3">
              <legend className="text-red-700 font-semibold px-2">Destino</legend>

              {/* Linha 1 — Destinatário + Cidade (à direita) */}
              <div className="flex items-center gap-2">
                <Label>Destinatário</Label>
                <Txt className="w-40" placeholder="CNPJ" defaultValue="05254957006551" />
                <Txt className="flex-1" placeholder="Razão Social" defaultValue="HNK-SALVADOR-AGUA MI" />

                <div className="flex items-center gap-2 ml-auto">
                  <Label className="w-[88px] text-right">Cidade Dest.</Label>
                  <Txt className="w-[120px]" placeholder="CEP" defaultValue="40000000" />
                  <Txt className="w-[280px]" placeholder="Cidade" defaultValue="SALVADOR" />
                  <Txt className="w-[50px] text-center" placeholder="UF" defaultValue="BA" />
                </div>
              </div>

              {/* Linha 2 — Motorista + (Agregado, KM Inicial, Nº Ficha à direita) */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Motorista</Label>
                <Txt className="w-[160px]" placeholder="CNH" defaultValue="01628446760" />
                <Txt className="flex-1" placeholder="Nome" defaultValue="ALAN DA COSTA" />

                <div className="flex items-center gap-2 ml-auto">
                  <Label className="w-[80px] text-right">Agregado</Label>
                  <Txt className="w-[180px]" defaultValue="AGREGADO" />
                  <Label className="w-[70px] text-right">KM Inicial</Label>
                  <Txt className="w-[80px] text-center" defaultValue="1" />
                  <Label className="w-[70px] text-right">Nº Ficha</Label>
                  <Txt className="w-[120px]" defaultValue="" />
                </div>
              </div>

              {/* Linha 3 — Tração + Tipo (Agregado) + Reboque */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Tração</Label>
                <Txt className="w-[110px]" placeholder="Cód." defaultValue="0035719" />
                <Txt
                  className="flex-1"
                  placeholder="Placa / Descrição"
                  defaultValue="RXW4I56 - CAVALO MEC - CAVALO TRUCADO - ITAJAÍ"
                />

                <div className="flex items-center gap-2 ml-auto">
                  <Label className="w-[140px] text-right">Tipo de Veículo</Label>
                  <Txt className="w-[140px]" defaultValue="CAVALO TRUCADO" />
                  <Label className="w-[80px] text-right">Reboque</Label>
                  <Txt className="w-[110px]" placeholder="Cód." defaultValue="0034811" />
                  <Txt
                    className="w-[360px]"
                    placeholder="Placa / Descrição"
                    defaultValue="RKW3E53 - CARRETA SIDER - CARRETA SYDER - ITAJAÍ"
                  />
                </div>
              </div>

              {/* Linha 4 — Recebedor + (Km Atual, Classe à direita) */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Recebedor</Label>
                <Txt className="w-[160px]" placeholder="CNPJ" defaultValue="05254957006551" />
                <Txt className="flex-1" placeholder="Razão Social" defaultValue="HNK-SALVADOR-AGUA MI" />

                <div className="flex items-center gap-2 ml-auto">
                  <Label className="w-[70px] text-right">Km Atual</Label>
                  <Txt className="w-[90px] text-center" defaultValue="1" />
                  <Label className="w-[110px] text-right">1ª Classe</Label>
                  <Txt className="w-[70px]" placeholder="Cód." defaultValue="13" />
                  <Txt className="w-[200px]" placeholder="Descrição" defaultValue="CAVALO TRUCADO" />
                </div>
              </div>

              {/* Linha 5 — Datas/Horas e KM Final */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Cadastro</Label>
                <Txt type="date" className="w-[150px]" defaultValue="2025-10-20" />

                <Label className="w-[88px] text-right">Início Prev.</Label>
                <Txt type="date" className="w-[150px]" defaultValue="2025-10-20" />
                <Label className="w-[30px] text-right">Hs</Label>
                <Txt type="time" className="w-[90px]" defaultValue="16:31" />

                <Label className="w-[70px] text-right">KM Final</Label>
                <Txt className="w-[90px] text-center" defaultValue="0" />

                <Label className="w-[110px] text-right">Chegada Prev.</Label>
                <Txt type="date" className="w-[150px]" defaultValue="2025-10-26" />
                <Label className="w-[30px] text-right">Hs</Label>
                <Txt type="time" className="w-[90px]" defaultValue="16:00" />
              </div>

              {/* Linha 6 — Observação */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Observação</Label>
                <Txt className="flex-1" defaultValue="" placeholder="Observações gerais da viagem" />
              </div>

              {/* Linha 7 — Tab. Agreg., Lucratividade, Peso Total (peso à direita) */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Tab. Agreg.</Label>
                <Sel className="w-[260px]">
                  <option>000000 - FRETE COMBINADO</option>
                </Sel>

                <Label className="w-[120px] text-right">Lucratividade (%)</Label>
                <Txt className="w-[120px] text-center" defaultValue="0,00" />

                <div className="flex items-center gap-2 ml-auto">
                  <Label className="w-[80px] text-right">Peso Total</Label>
                  <Txt className="w-[180px]" defaultValue="" />
                </div>
              </div>

              {/* Linha 8 — Rota/KM Prev + (Custo/Valor à direita) */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Rota Viagem</Label>
                <Sel className="w-[320px]">
                  <option>0003 - SHOPEE</option>
                </Sel>

                <Label className="w-[110px] text-right">Km Rota Prev</Label>
                <Txt className="w-[90px] text-center" defaultValue="0" />

                <div className="flex items-center gap-2 ml-auto">
                  <Label className="w-[100px] text-right">Custo Viagem</Label>
                  <Txt className="w-[160px]" defaultValue="0" />
                  <Label className="w-[90px] text-right">Valor Frete</Label>
                  <Txt className="w-[160px]" defaultValue="0" />
                </div>
              </div>

              {/* Linha 9 — Operador/Data + botões à direita */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Operador</Label>
                <Txt className="w-[200px]" defaultValue="SUPORTE" />
                <Txt type="date" className="w-[150px]" defaultValue="2025-10-20" />

                <div className="ml-auto flex items-center gap-2">
                  <button
                    className="border border-gray-300 text-gray-800 hover:bg-gray-100 rounded px-3 py-[6px] text-[12px] flex items-center gap-1"
                    title="Montar Minuta"
                  >
                    Montar Minuta
                  </button>
                  <button
                    className="border border-gray-300 text-gray-800 hover:bg-gray-100 rounded px-3 py-[6px] text-[12px] flex items-center gap-1"
                    title="Montar CTe"
                  >
                    Montar CTe
                  </button>
                </div>
              </div>
            </fieldset>


            {/* === CARD 4 - Notas Fiscais === */}
            <fieldset className="border border-gray-300 rounded p-3">
              <legend className="text-red-700 font-semibold px-2">Notas Fiscais</legend>

              <div className="flex items-center gap-2">
                <Label>Quantidade NFs</Label>
                <Txt className="w-24 text-center" defaultValue="0" />
              </div>

              <div className="overflow-auto mt-2">
                <table className="min-w-full border text-[12px]">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      {[
                        "Filial",
                        "Nº NF",
                        "Série",
                        "Tipo Doc",
                        "Nº Controle",
                        "Nº Impresso",
                        "CNPJ Remetente",
                        "Data Emissão",
                      ].map((h) => (
                        <th key={h} className="border px-2 py-1 text-left">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1">001</td>
                        <td className="border px-2 py-1">12345</td>
                        <td className="border px-2 py-1">1</td>
                        <td className="border px-2 py-1">NF-e</td>
                        <td className="border px-2 py-1">000987</td>
                        <td className="border px-2 py-1">IMP-01</td>
                        <td className="border px-2 py-1">45.333.888/0001-10</td>
                        <td className="border px-2 py-1">10/10/2025</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </fieldset>

            {/* === CARD 5 - Botões Rodapé === */}
            <div className="flex justify-between mt-3">
              <div className="flex gap-2">
                <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1">
                  <XCircle size={16} className="text-red-600" /> Fechar
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1">
                  <RotateCcw size={16} /> Limpar
                </button>
              </div>

              <div className="flex gap-2">
                <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1">
                  <PlusCircle size={16} className="text-green-600" /> Incluir
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1">
                  <Edit size={16} className="text-blue-600" /> Alterar
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1">
                  <Trash2 size={16} className="text-red-600" /> Excluir
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1">
                  <DollarSign size={16} className="text-yellow-600" /> Pagtos
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1">
                  <Truck size={16} className="text-red-600" /> Monitoramento
                </button>
              </div>
            </div>
          </>
        )}

        {/* ===================== ABA CONSULTA ===================== */}
        {activeTab === "consulta" && (
          <div className="flex flex-row gap-2">
           {/* ====== CARD 1 - FILTROS (compacto, sem scroll de página) ====== */}
<fieldset className="border border-gray-300 rounded p-2 flex-1">
  <legend className="text-red-700 font-semibold px-2">Filtros</legend>

  <div className="space-y-1 text-[12px]">
    {/* Linha 1 */}
    <div className="flex items-center gap-1">
      <Label>Filial Origem</Label>
      <Sel className="flex-1 min-w-[220px]">
        <option>001 - TESTE MANTRAN</option>
      </Sel>

      <Label className="w-[80px] text-right">Tp. Carga</Label>
      <Sel className="w-[140px]">
        <option>TODAS</option>
        <option>FRACIONADA</option>
        <option>FECHADA</option>
      </Sel>

      <Label className="w-[100px] text-right">Status</Label>
      <Sel className="w-[160px]">
        <option>TODOS</option>
        <option>NÃO INICIADA</option>
        <option>EM ANDAMENTO</option>
        <option>ENCERRADA</option>
      </Sel>
    </div>

    {/* Linha 2 */}
    <div className="flex items-center gap-1">
      <Label>Cliente</Label>
      <Txt className="w-[130px] ml-[35px]" placeholder="CNPJ" />
      <Txt className="flex-1" placeholder="Razão Social" />

      <label className="ml-[135px]">
        <input type="checkbox" /> Apenas Agregados
      </label>
      <label className="flex items-center gap-1">
        <input type="checkbox" /> Viagens s/ Frete
      </label>
    </div>

    {/* Linha 3 */}
    <div className="flex items-center gap-1">
      <Label>Remetente</Label>
      <Txt className="w-[130px] ml-[13px]" placeholder="CNPJ" />
      <Txt className="flex-1" placeholder="Razão Social" />

      <Label className="w-[52px] text-right">Origem</Label>
      <Txt className="w-[90px]" placeholder="CEP" />
      <Txt className="w-[170px]" placeholder="Cidade" />
      <Txt className="w-[36px] text-center" placeholder="UF" />
    </div>

    {/* Linha 4 */}
    <div className="flex items-center gap-1">
      <Label>Destinatário</Label>
      <Txt className="w-[130px] ml-[8px]" placeholder="CNPJ" />
      <Txt className="flex-1" placeholder="Razão Social" />

      <Label className="w-[52px] text-right">Destino</Label>
      <Txt className="w-[90px]" placeholder="CEP" />
      <Txt className="w-[170px]" placeholder="Cidade" />
      <Txt className="w-[36px] text-center" placeholder="UF" />
    </div>

    {/* Linha 5 */}
    <div className="flex items-center gap-1">
      <Label>Agregado</Label>
      <Txt className="w-[130px] ml-[20px]" placeholder="CNPJ" />
      <Txt className="flex-1" placeholder="Nome do Agregado" />

      <Label className="ml-[160px] w-[56px] text-right">Divisão</Label>
      <Sel className="w-[160px]">
        <option>TODAS</option>
        <option>LOGÍSTICA</option>
        <option>ADMINISTRATIVO</option>
      </Sel>
    </div>

    {/* Linha 6 */}
    <div className="flex items-center gap-1">
      <Label>Motorista</Label>
      <Txt className="w-[130px] ml-[22px]" placeholder="CNH" />
      <Txt className="flex-1" placeholder="Nome do Motorista" />
      <Label className=" w-[52px] text-right">Veículo</Label>
      <Txt className="w-[90px]" placeholder="Placa" />
        <Txt className="w-[210px]" />
    </div>

    {/* Linha 7 (com wrap só dos campos do lado direito) */}
    <div className="flex items-center gap-1">
      <Label>Período</Label>
      <Txt type="date" className="w-[130px] ml-[30px]" />
      <Label>a</Label>
      <Txt type="date" className="w-[130px]" />

      <div className="flex items-center gap-1 flex-wrap ml-2">
        <label className="flex items-center gap-1">
          <input type="checkbox" /> Dt. Início Prev.
        </label>

        <Label className="w-[64px] text-right">Viagem</Label>
        <Txt className="w-[72px]" />

        <Label className="w-[64px] text-right">Coleta</Label>
        <Txt className="w-[72px]" />

        <Label className="w-[52px] text-right">CTRC</Label>
        <Txt className="w-[72px]" />



        <Label className="w-[96px] text-right">Nº Solicitação</Label>
        <Txt className="w-[96px]" />
      </div>
    </div>
  </div>
</fieldset>


            {/* ====== CARD 2 - BOTÕES LATERAIS ====== */}
{/* ====== CARD 2 - BOTÕES LATERAIS ====== */}
<div className="flex flex-col gap-2 w-[140px]">
  <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded py-2 text-[13px] text-gray-700 flex items-center justify-center gap-2">
    <Search size={16} className="text-red-700" />
    Pesquisar
  </button>

  <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded py-2 text-[13px] text-gray-700 flex items-center justify-center gap-2">
   <Eraser size={16} className="text-red-700" />
    Limpar
  </button>

  <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded py-2 text-[13px] text-gray-700 flex items-center justify-center gap-2">
    <Truck size={16} className="text-red-700" />
    Tracking
  </button>
</div>
          </div>
        )}

       {/* ====== CARD 3 - GRID PRINCIPAL ====== */}
{activeTab === "consulta" && (
  <div className="mt-2 border border-gray-300 rounded bg-white overflow-auto">
    <table className="min-w-[2200px] text-[12px] border-collapse">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          {[
            "CK",
            "Status",
            "Filial",
            "Nº Viagem",
            "SQ",
            "Tração",
            "Reboque",
            "Motorista",
            "Origem",
            "Destino",
            "Início Viagem",
            "Remetente",
            "Destinatário",
            "Pagador Frete",
            "CNH",
            "Carga",
            "Nº Ficha",
            "Dt. Acerto",
            "Nº Acerto",
            "Nº Coleta",
            "Tp. Mot.",
            "Vr. Frete",
            "Frete Agregado",
          ].map((h) => (
            <th key={h} className="border px-2 py-1 whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {gridConsulta.map((row, i) => {
          const corStatus =
            row.status === "NÃO INICIADA"
              ? "text-red-600"
              : row.status === "EM ANDAMENTO"
              ? "text-blue-600"
              : row.status === "ENCERRADA"
              ? "text-green-600"
              : row.status === "CANCELADA"
              ? "text-black"
              : "text-gray-700";

          return (
            <tr
              key={row.id}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
            >
              <td className="border text-center px-2">
                <input
                  type="checkbox"
                  checked={row.selecionado}
                  onChange={() =>
                    setGridConsulta((prev) =>
                      prev.map((x) =>
                        x.id === row.id
                          ? { ...x, selecionado: !x.selecionado }
                          : x
                      )
                    )
                  }
                />
              </td>
              <td className={`border px-2 font-semibold ${corStatus}`}>
                {row.status}
              </td>
              <td className="border px-2">001</td>
              <td className="border px-2">07903{i}</td>
              <td className="border px-2">1</td>
              <td className="border px-2">RXW4I56</td>
              <td className="border px-2">RKW3E53</td>
              <td className="border px-2">ALAN DA COSTA</td>
              <td className="border px-2">ITU</td>
              <td className="border px-2">SALVADOR</td>
              <td className="border px-2">20/10/2025 16:31</td>
              <td className="border px-2">HNK BR IND. BEBIDAS LTDA</td>
              <td className="border px-2">HNK BR IND. BEBIDAS LTDA RN</td>
              <td className="border px-2">HNK BR IND. BEBIDAS LTDA</td>
              <td className="border px-2">01628446760</td>
              <td className="border px-2">CARGA</td>
              <td className="border px-2">1</td>
              <td className="border px-2">26/10/2025</td>
              <td className="border px-2">123</td>
              <td className="border px-2">185704</td>
              <td className="border px-2">TP01</td>
              <td className="border px-2 text-right">1.250,00</td>
              <td className="border px-2 text-right">950,00</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}

{/* ====== CARD 4 - TOTAL / BOTÕES ====== */}
{activeTab === "consulta" && (
  <div className="flex justify-between items-center mt-2 flex-wrap">
    <div className="text-[13px] text-gray-700">
      Total Selecionados: <b>{totalSelConsulta}</b> de <b>{totalConsulta}</b>
    </div>

    <div className="flex flex-wrap justify-between w-full mt-2">
      {/* === Botões à esquerda === */}
      <div className="flex gap-2">
        <button
          onClick={selecionarTodosConsulta}
          className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1"
        >
          <CheckCircle size={14} className="text-green-600" />
          Selecionar Todos
        </button>
        <button
          onClick={limparSelecaoConsulta}
          className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1"
        >
          <RotateCcw size={14} className="text-red-600" />
          Limpar Seleção
        </button>
      </div>

      {/* === Botões à direita === */}
      <div className="flex gap-2">
     <button
  onClick={() => setModalInicioOpen(true)} 
  className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1 text-black-600"
>
  <PlayCircle size={14} className="text-red-700" />
  Iniciar
</button>
        <button
  onClick={() => setModalEncerrarOpen(true)} 
  className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1 text-black-600"
>
  <CheckCircle size={14} className="text-green-600" />
  Encerrar
</button>
        <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1 text-black-600">
          <XCircle size={14} className="text-red-700"/>
          Cancelar
        </button>
        <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1 text-black-600">
          <RotateCcw size={14} className="text-red-700"/>
          Estornar
        </button>
        <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1 text-black-600">
          <Trash2 size={14} className="text-red-700"/>
          Excluir
        </button>
      </div>
    </div>
  </div>
)}



        {/* ===================== ABA DOCTOS ===================== */}
        {activeTab === "doctos" && (
          <div className="flex flex-col gap-2 p-2 min-w-0">
            {/* <div className="flex flex-row gap-2"> */}
            {/* === CARD 1 - Documentos da Viagem === */}
            <fieldset className="border border-gray-300 rounded p-3 w-full min-w-0">
              <legend className="text-red-700 font-semibold px-2">Documentos da Viagem</legend>

              {/* ===== GRID COM ROLAGEM ===== */}
              <div className="block border border-gray-300 rounded bg-white mt-2 max-h-[300px] overflow-x-auto overflow-y-auto">
                <table className="min-w-[2400px] text-[12px] border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      {[
                        "OK",
                        "St.",
                        "Emp.",
                        "Filial Doc.",
                        "Razão Social Destinatário",
                        "Nº Controle",
                        "Nº Impresso",
                        "Dt. Emissão",
                        "Vols",
                        "Peso Real",
                        "Valor Frete",
                        "Tp Cif/Fob",
                        "Vr. Mercadoria",
                        "Data Entrega",
                        "Série CT",
                        "Manifesto",
                        "VR ICMS",
                        "Status",
                        "Doc",
                        "Chave CTe",
                        "Filial Viagem",
                        "Substituído",
                      ].map((h) => (
                        <th key={h} className="border px-2 py-1 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {docsViagem.map((doc, i) => (
                      <tr key={i} className="bg-white hover:bg-gray-100 transition">
                        <td className="border text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="border text-center">I</td>
                        <td className="border text-center">{doc.empresa}</td>
                        <td className="border text-center">{doc.filial}</td>
                        <td className="border px-2">{doc.razao}</td>
                        <td className="border text-center">{doc.controle}</td>
                        <td className="border text-center">{doc.impresso}</td>
                        <td className="border text-center">{doc.emissao}</td>
                        <td className="border text-right">1,000</td>
                        <td className="border text-right">1,000</td>
                        <td className="border text-right">125,00</td>
                        <td className="border text-center">CIF</td>
                        <td className="border text-right">1,00</td>
                        <td className="border text-center">--</td>
                        <td className="border text-center">001</td>
                        <td className="border text-center">--</td>
                        <td className="border text-right">8,75</td>
                        <td className="border text-center">I</td>
                        <td className="border text-center">CT</td>
                        <td className="border text-center font-mono">--</td>
                        <td className="border text-center">001</td>
                        <td className="border text-center"></td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* === LEGENDA DE STATUS === */}
              <div className="flex items-center gap-3 mt-2 text-[12px] flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-300 border"></div>
                  <span>Não Iniciada</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-400 border"></div>
                  <span>Entregues</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-400 border"></div>
                  <span>Circs c/ IDR</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-400 border"></div>
                  <span>Não Entregues</span>
                </div>

                <div className="flex items-center gap-2 ml-auto flex-wrap">
                  {[
                    "Selecionar Todos",
                    "Minuta",
                    "Baixar",
                    "Manifestar",
                    "Imprimir",
                    "SEFAZ",
                    "Remover",
                  ].map((btn) => (
                    <button
                      key={btn}
                      className={`border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] ${btn === "Remover" ? "text-red-600" : ""
                        }`}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>

              {/* === TOTAIS === */}
              <div className="flex items-center justify-between mt-3 flex-wrap">
                <div className="flex items-center gap-3 text-[13px] flex-wrap">
                  <Label>QT Docs</Label>
                  <Txt className="w-[60px]" defaultValue="1" />
                  <Label>Vr. Mercadoria</Label>
                  <Txt className="w-[80px]" defaultValue="125" />
                  <Label>Frete</Label>
                  <Txt className="w-[80px]" defaultValue="125,00" />
                  <Label>Cubagem</Label>
                  <Txt className="w-[80px]" defaultValue="0" />
                  <Label>Frete Peso</Label>
                  <Txt className="w-[80px]" defaultValue="125,00" />
                  <Label>Frete Líquido</Label>
                  <Txt className="w-[80px]" defaultValue="116,25" />
                </div>
              </div>
            </fieldset>

            {/* === CARD 2 - Adicionar CTRC's === */}
            {/* === CARD 2 - Adicionar CTRC's === */}
            <fieldset className="border border-gray-300 rounded p-3 w-full min-w-0">
              <legend className="text-red-700 font-semibold px-2">Adicionar CTRC's na Viagem</legend>

              {/* === FILTROS === */}
              <div className="flex flex-col gap-2 mb-2">
                {/* === LINHA 1 === */}
                <div className="flex items-center gap-2">
                  <Label>Cliente</Label>
                  <Txt className="w-[160px]" placeholder="CNPJ" />
                  <Txt className="flex-1" placeholder="Razão Social" />
                  <Label className="w-[80px] text-right">Nº Doc.</Label>
                  <Txt className="w-[120px]" />
                  <Label className="w-[80px] text-right">Período</Label>
                  <Txt type="date" className="w-[140px]" />
                  <Label className="w-[30px] text-center">até</Label>
                  <Txt type="date" className="w-[140px]" />
                </div>

                {/* === LINHA 2 === */}
                <div className="flex items-center gap-2">
                  <Label>Remetente</Label>
                  <Txt className="w-[160px]" placeholder="CNPJ" />
                  <Txt className="flex-1" placeholder="Razão Social" />
                  <label className="flex items-center gap-1 text-[12px] ml-3">
                    <input type="checkbox" /> Doctos não encerrados
                  </label>
                  <label className="flex items-center gap-1 text-[12px]">
                    <input type="checkbox" /> Incluir Cancelados
                  </label>
                </div>

                {/* === LINHA 3 (Filial, Tipo Docs e Botões) === */}
                <div className="flex items-center gap-2">
                  <Label className="w-[60px] text-right">Filial</Label>
                  <Sel className="w-[220px]">
                    <option>TODAS</option>
                  </Sel>

                  <Label className="w-[80px] text-right">Tipo Docs</Label>
                  <Sel className="w-[220px]">
                    <option>Coleta</option>
                    <option>CTe - Impresso</option>
                    <option>CTe - Controle</option>
                    <option>Minuta</option>
                    <option>Doc Ant</option>
                  </Sel>

                  <div className="ml-auto flex items-center gap-2">
                    <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded px-4 py-[4px] text-[13px] text-gray-700">
                      Protocolos
                    </button>
                    <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded px-4 py-[4px] text-[13px] text-gray-700">
                      Pesquisar
                    </button>

                  </div>
                </div>
              </div>


              {/* ===== GRID DE ADIÇÃO ===== */}
              <div className="block w-full min-w-0 border border-gray-300 rounded bg-white mt-2 max-h-[300px] overflow-auto">
                <table className="min-w-[2400px] text-[12px] border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      {[
                        "Empresa",
                        "Filial",
                        "Razão Social",
                        "Nº Controle",
                        "Nº Impresso",
                        "Data Emissão",
                        "Volume",
                        "Peso",
                        "VR Frete",
                        "Tipo Cif/Fob",
                        "VR Mercadoria",
                        "Data Entrega",
                        "Data Baixa",
                        "Nº Viagem",
                        "Situação",
                        "Tipo Docto",
                        "Nº Coleta",
                        "Cód. Ocorrência",
                        "Desc. Ocorrência",
                      ].map((h) => (
                        <th key={h} className="border px-2 py-1 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {docsAdicao.map((doc, i) => (
                      <tr
                        key={doc.id}
                        className={`${i % 2 === 0 ? "bg-orange-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="border text-center">
                          <input
                            type="checkbox"
                            checked={doc.selecionado}
                            onChange={() => {
                              setDocsAdicao((prev) =>
                                prev.map((d) =>
                                  d.id === doc.id ? { ...d, selecionado: !d.selecionado } : d
                                )
                              );
                            }}
                          />
                        </td>
                        <td className="border text-center">{doc.empresa}</td>
                        <td className="border text-center">{doc.filial}</td>
                        <td className="border px-2">{doc.razao}</td>
                        <td className="border text-center">{doc.controle}</td>
                        <td className="border text-center">{doc.impresso}</td>
                        <td className="border text-center">{doc.emissao}</td>
                        <td className="border text-right">{(i + 1) * 3}</td>
                        <td className="border text-right">{(i + 1) * 3},000</td>
                        <td className="border text-right">100,00</td>
                        <td className="border text-center">C</td>
                        <td className="border text-right">3,00</td>
                        <td className="border text-center">--</td>
                        <td className="border text-center">--</td>
                        <td className="border text-center">Impresso</td>
                        <td className="border text-center">CT</td>
                        <td className="border text-center">18570{i}</td>
                        <td className="border text-center">--</td>
                        <td className="border text-center">--</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </fieldset>

            {/* === CARD FINAL - Botões Rodapé === */}
            <fieldset className="border border-gray-300 rounded p-3 w-full mt-2 bg-white">
              <div className="flex justify-between items-center">
                {/* Lado esquerdo */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setDocsAdicao((prev) => prev.map((d) => ({ ...d, selecionado: true })))
                    }
                    className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1 text-[13px]"
                  >
                    Selecionar Todos
                  </button>

                  <button
                    onClick={() =>
                      setDocsAdicao((prev) => prev.map((d) => ({ ...d, selecionado: false })))
                    }
                    className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1 text-[13px]"
                  >
                    Limpar Seleção
                  </button>
                </div>

                {/* Lado direito */}
                <div>
                  <button
                    onClick={() => {
                      const selecionados = docsAdicao.filter((d) => d.selecionado);
                      setDocsViagem((prev) => [...prev, ...selecionados]);
                      setDocsAdicao((prev) =>
                        prev.map((d) => ({ ...d, selecionado: false }))
                      );
                    }}
                    className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-1 text-[13px] text-green-700 font-medium"
                  >
                    <PlusCircle size={14} className="text-green-700" />
                    Adicionar
                  </button>
                </div>
              </div>
            </fieldset>

          </div>
        )}

        {/* ===================== ABA DESPESAS ===================== */}
        {activeTab === "despesas" && (
          <div className="flex flex-col gap-3 p-2 min-w-0">

            {/* === CARD 1 - Valores de Frete de Terceiros === */}
<fieldset className="border border-gray-300 rounded p-3 bg-white">
  <legend className="text-red-700 font-semibold px-2">Valores de Frete de Terceiros</legend>

  <div className="space-y-2">

    {/* ===== LINHA 1 ===== */}
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-2 flex items-center gap-1">
        <Label>CIOT</Label>
        <Txt className="w-full" />
      </div>

      <div className="col-span-1 flex justify-start">
        <button
          type="button" title="CIOT"
          className="border border-gray-300 rounded px-3 py-[4px] text-[12px] hover:bg-gray-100 flex items-center justify-center"
        >
          
          
          <DollarSign size={14} className="text-green-600" />
        </button>
      </div>

      <div className="col-span-1 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">Sest/Senat</Label>
        <Txt className="w-full text-right" defaultValue="0" />
      </div>

      <div className="col-span-1 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">INSS</Label>
        <Txt className="w-full text-right" defaultValue="0" />
      </div>

      <div className="col-span-1 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">IRRF</Label>
        <Txt className="w-full text-right" defaultValue="0" />
      </div>

      <div className="col-span-1 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">Descarga</Label>
        <Txt className="w-full text-right" defaultValue="0,00" />
      </div>

      <div className="col-span-3 col-start-10 flex items-center justify-end gap-2">
        <Label className="whitespace-nowrap">Valor Total</Label>
        <Txt className="w-[120px] text-right bg-gray-100" defaultValue="1450,00" readOnly />
      </div>
    </div>

    {/* ===== LINHA 2 ===== */}
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-2 flex items-center gap-1">
        <Label>Frete Tabela</Label>
        <Txt className="w-full text-right" defaultValue="1450,00" />
      </div>

      <div className="col-span-2 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">Cooperativa</Label>
        <Txt className="w-full text-right" defaultValue="0" />
      </div>

      <div className="col-span-2 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">Adiantamento</Label>
        <Txt className="w-full text-right" defaultValue="0" />
      </div>

      <div className="col-span-2 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">Adicional</Label>
        <Txt className="w-full text-right" defaultValue="0,00" />
      </div>

      <div className="col-span-2 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">Pacotes</Label>
        <Txt className="w-[45%] text-right" defaultValue="0" />
        <span>/</span>
        <Txt className="w-[45%] text-right" defaultValue="0" />
      </div>

      <div className="col-span-2 flex items-center gap-1 justify-end">
        <Label className="whitespace-nowrap">Vr. Pacote</Label>
        <Txt className="w-[80px] text-right" defaultValue="0,00" />
      </div>
    </div>

    {/* ===== LINHA 3 ===== */}
<div className="grid grid-cols-12 gap-2 items-center">
  <div className="col-span-2 flex items-center gap-1">
    <Label>Nº CTRB/Seq</Label>
    <Txt className="w-[70px]" defaultValue="079032" />
    <Txt className="w-[40px]" defaultValue="1" />
  </div>

  <div className="col-span-2 flex items-center gap-1 justify-end">
    <Label>Pedágio</Label>
    <Txt className="w-full" />
  </div>

  <div className="col-span-3">
    <Txt className="w-full" placeholder="Campo longo..." />
  </div>

  <div className="col-span-2 flex items-center gap-1 justify-end">
    <Label className="whitespace-nowrap">Nº Comp. Pedágio</Label>
    <Txt className="w-full" />
  </div>

  {/* Vr. Pedágio + Botão Alterar no final */}
  <div className="col-span-3 flex items-center gap-2 justify-end">
    <Label className="whitespace-nowrap">Pedágio</Label>
    <Txt className="w-[80px] text-right" defaultValue="0,00" />
    <button
      type="button"
      className="border border-gray-300 rounded px-3 py-[4px] text-[12px] hover:bg-gray-100 flex items-center gap-1 text-red-700"
      title="Alterar"
    >
      <Edit size={14} className="text-red-700" />
      Alterar
    </button>
  </div>
</div>

    
  </div>
</fieldset>



          {/* === CARD 2 - Despesas Diversas === */}
<fieldset className="border border-gray-300 rounded p-2 bg-white">
  <legend className="text-red-700 font-semibold px-2">Despesas Diversas</legend>

  <div className="space-y-2">

    {/* ===== LINHA 1 ===== */}
<div className="flex justify-end gap-8">
  <div className="flex items-center gap-2">
    <Label>DT Acerto Conta</Label>
    <Txt className="w-[140px]" />
  </div>

  <div className="flex items-center gap-2">
    <Label>Saldo Ficha</Label>
   <Txt
  className="w-5/6 text-right"
  value={despesas.reduce((acc, d) => acc + d.valor, 0).toFixed(2)}
  readOnly
/>
  </div>
</div>


    {/* ===== LINHA 2 ===== */}
    <div className="flex justify-between gap-8">
      <div className="flex items-center gap-2 flex-1">
        <Label>Cidade Origem</Label>
        <Txt className="flex-1 w-5/6 ml-[10px]" defaultValue="CAMPINAS" />
        <Txt className="w-[60px] text-center" defaultValue="SP" />
      </div>
      <div className="flex items-center gap-2 flex-1 ">
        <Label>Cidade Destino</Label>
        <Txt className="flex-1 w-5/6" defaultValue="JUNDIAÍ" />
        <Txt className="w-[60px] text-center" defaultValue="SP" />
      </div>
    </div>

    {/* ===== LINHA 3 ===== */}
    <div className="flex justify-between gap-8">
      <div className="flex items-center gap-2 flex-1">
        <Label>Data </Label>
        <Txt type="date" className="w-[135px] ml-[70px]" defaultValue="2025-10-28" />
        <Label>Hora </Label>
        <Txt type="time" className="w-[120px]" defaultValue="12:23" />
        <button className="border border-gray-300 rounded px-3 py-[4px] text-[12px] hover:bg-gray-100">
          Abastecimento
        </button>
      </div>
      <div className="flex items-center gap-2 flex-1 ">
        <Label> Filial</Label>
        <Txt className="w-[100px] ml-[60px]" />
        <Label>Nº Frota</Label>
        <Txt className="w-5/6" />
      </div>
    </div>

    {/* ===== LINHA 4 ===== */}
    <div className="flex justify-between gap-8">
 <div className="flex items-center gap-2 flex-1">
  <Label>Evento</Label>
  <Txt className="w-[80px] text-center ml-[60px]" defaultValue="027" />
  <Txt className="flex-1 w-5/6" defaultValue="ABASTECIMENTO" />
  <Txt className="w-[50px] text-center" defaultValue="D" />
</div>
      <div className="flex items-center gap-2 flex-1 ">
        <Label>Complemento</Label>
        <Txt className="w-5/6 ml-[10px]" defaultValue="TESTE" />
      </div>
    </div>

    {/* ===== LINHA 5 ===== */}
    <div className="flex justify-between gap-8">
      <div className="flex items-center gap-2 flex-1">
        <Label>Categoria</Label>
        <Txt className="w-[80px] text-center ml-[45px]" defaultValue="2" />
        <Txt className="flex-1 w-5/6" defaultValue="DESPESAS OPERACIONAIS" />
      </div>
      <div className="flex items-center gap-2 flex-1 ">
        <Label>Sub Categoria</Label>
        <Txt className="ml-[10px] w-[80px] text-center" defaultValue="33" />
        <Txt className="ml-[10px] flex-1 w-5/6" defaultValue="COMBUSTÍVEL" />
      </div>
    </div>

    {/* ===== LINHA 6 ===== */}
    <div className="flex justify-between gap-8">
      <div className="flex items-center gap-2 flex-1">
        <Label>Tipo Pagto</Label>
        <Txt className="w-[80px] text-center ml-[40px]" defaultValue="5" />
        <Txt className="flex-1 w-5/6" defaultValue="DÉBITO OU CRÉDITO" />
      </div>
      <div className="flex items-center gap-2 flex-1 ">
        <Label>Status Viagem</Label>
        <Txt className="ml-[10px] w-5/6" defaultValue="ATIVA" />
      </div>
    </div>

   {/* ===== LINHA 7 ===== */}
<div className="flex justify-between gap-8">
  <div className="flex items-center gap-2 flex-1">
    <Label>Valor</Label>
    <Txt className="w-[180px] text-right ml-[70px]" defaultValue="450,00" />
  </div>
  <div className="flex items-center gap-2 flex-1 ">
    <Label>Conta Corrente</Label>
    <Txt className="w-[120px] text-center" defaultValue="000000" />
    <Txt className="w-[80px] text-center" defaultValue="999" />
    <Txt className="w-[100px] text-center" defaultValue="0000-0" />
  </div>
</div>

{/* ===== LINHA 8 - BOTÕES ===== */}
<div className="flex justify-end gap-2 mt-2">
<button
  onClick={() => setModalPagamentoOpen(true)}
  className="border border-gray-300 rounded px-3 py-[4px] text-[12px] flex items-center gap-1 text-green-700"
>
  <DollarSign size={14} /> Pagamento
</button>
<button className="border border-gray-300 rounded px-3 py-[4px] text-[12px] hover:bg-gray-100 flex items-center gap-1 text-red-600"> 
  <RotateCcw size={14} /> Estornar </button>

</div>

  </div>
</fieldset>



         {/* === CARD 3 - GRID DE DESPESAS === */}
<fieldset className="border border-gray-300 rounded p-3 bg-white w-full min-w-0">
  <legend className="text-red-700 font-semibold px-2">Lista de Despesas</legend>

  <div className="block border border-gray-300 rounded bg-white mt-2 max-h-[300px] overflow-x-auto overflow-y-auto">

    <table className="min-w-[2200px] text-[12px] border-collapse">
      <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
        <tr>
          {[
            "✓", // checkbox
            "Nº Título",
            "Data Lancto",
            "Hora Lancto",
            "Data Venc.",
            "Data Pagto",
            "Cód. Evento",
            "Descrição do Evento",
            "D_C",
            "Complemento",
            "Cód. Pagto",
            "Descrição Pagto",
            "Valor Lancto",
            "Observação",
            "Cidade Origem",
            "UF",
            "Cidade Entrega",
            "UF",
            "Nº Viagem",
            "Cód. CNH",
            "Placa Veículo",
            "Cat.",
            "Sub.",
            "SQ",
          ].map((h) => (
            <th
              key={h}
              className="border px-2 py-1 text-center whitespace-nowrap bg-gray-100"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {despesas.map((d, i) => (
          <tr
            key={d.id}
            className={`${
              i % 2 === 0 ? "bg-orange-50" : "bg-white"
            } hover:bg-gray-100`}
          >
            <td className="border text-center">
              <input
                type="checkbox"
                checked={d.selecionado}
                onChange={() =>
                  setDespesas((prev) =>
                    prev.map((x) =>
                      x.id === d.id
                        ? { ...x, selecionado: !x.selecionado }
                        : x
                    )
                  )
                }
              />
            </td>
            <td className="border text-center">0001</td>
            <td className="border text-center">{d.data}</td>
            <td className="border text-center">12:23:50</td>
            <td className="border text-center">--</td>
            <td className="border text-center">--</td>
            <td className="border text-center">001</td>
            <td className="border px-2">{d.tipo}</td>
            <td className="border text-center">D</td>
            <td className="border px-2">{d.descricao}</td>
            <td className="border text-center">2</td>
            <td className="border text-center">DÉBITO</td>
            <td className="border text-right">
              {d.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </td>
            <td className="border text-left">TESTE</td>
            <td className="border text-left">CAMPINAS</td>
            <td className="border text-center">SP</td>
            <td className="border text-left">JUNDIAÍ</td>
            <td className="border text-center">SP</td>
            <td className="border text-center">079032</td>
            <td className="border text-center">01628446760</td>
            <td className="border text-center">RXW4I56</td>
            <td className="border text-center">100</td>
            <td className="border text-center">2</td>
            <td className="border text-center">{i + 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</fieldset>


           {/* === CARD 4 - BOTÕES === */}
<fieldset className="border border-gray-300 rounded p-3 bg-white mt-3">
  <div className="flex justify-between items-center flex-wrap gap-2">

    {/* === BOTÕES À ESQUERDA === */}
    <div className="flex gap-2 flex-wrap">
 <button
    onClick={() => setModalCustosOpen(true)}
    className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1"
  >
    <DollarSign size={14} className="text-yellow-600" />
    Custos Operacionais
  </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1">
        <FileText size={14} className="text-gray-700" />
        Observação
      </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] flex items-center gap-1">
        <Printer size={14} className="text-blue-600" />
        Imprimir
      </button>
    </div>

    {/* === BOTÕES À DIREITA === */}
    <div className="flex gap-2 flex-wrap ml-auto">
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-green-700 flex items-center gap-1">
        <CheckCircle size={14} />
        Encerrar
      </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-yellow-600 flex items-center gap-1">
        <RotateCcw size={14} />
        Reabrir
      </button>
      <button
  onClick={handleAdicionarDespesa}
  className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-green-700 flex items-center gap-1"
>
  <PlusCircle size={14} />
  Adicionar
</button>

<button
  onClick={handleRemoverDespesa}
  className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-red-600 flex items-center gap-1"
>
  <Trash2 size={14} />
  Remover
</button>

      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-gray-700 flex items-center gap-1">
        <RotateCcw size={14} />
        Limpar
      </button>
    </div>
  </div>
</fieldset>
          </div> 
        )} 
  {/* === MODAIS === */}
        {modalPagamentoOpen && (
          <ViagemDespesa
            isOpen={modalPagamentoOpen}
            onClose={() => setModalPagamentoOpen(false)}
          />
        )}

        {modalCustosOpen && (
          <ViagemCustosOperacionais
            isOpen={modalCustosOpen}
            onClose={() => setModalCustosOpen(false)}
          />
        )}
      
{modalEncerrarOpen && (
  <ViagemEncerramento
    isOpen={modalEncerrarOpen}
    onClose={() => setModalEncerrarOpen(false)}
    onConfirm={(dados) => console.log("Encerramento da viagem:", dados)}
  />
)}

      {modalInicioOpen && (
  <ViagemInicio
    isOpen={modalInicioOpen}
    onClose={() => setModalInicioOpen(false)}
    onConfirm={(dados) => console.log("Início da viagem:", dados)}
  />
)}
      </div> 
    </div> 
  );
}
