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
  FileText,
  FileSpreadsheet,
  Download,
  Truck,
  DollarSign,
  MapPin,
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

  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${
        open ? "ml-[192px]" : "ml-[56px]"
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
            className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${
              activeTab === tab
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
              <div className="flex items-center gap-2">
                <Label>Nº Viagem</Label>
                <Txt className="w-32" />
                
                <Txt className="w-16 text-center" maxLength={1} />
                <Txt className="w-40 text-center"  defaultValue="TRANSFERÊNCIA"/>
                <Label className="w-16 text-right">Tipo</Label>
                <Sel className="w-40">
                  <option>Normal</option>
                  <option>Complementar</option>
                </Sel>
                <Label className="ml-3">Manifesto</Label>
                <Txt className="w-32" />
                <Label className="w-16 text-right">Coleta</Label>
                <Txt className="w-32" />
                <Label className="w-16 text-right">Status</Label>
                <Txt className="w-40 text-center bg-gray-100" defaultValue="Em Andamento" readOnly />
              </div>

              {/* Linha 2 */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Empresa</Label>
                <Sel className="flex-1">
                  <option>001 - MANTRAN TRANSPORTES LTDA</option>
                </Sel>
                <Label className="w-20 text-right">Filial</Label>
                <Sel className="w-[300px]">
                  <option>001 - CAMPINAS</option>
                </Sel>
                <Label className="w-24 text-right">Tipo Carga</Label>
                <Sel className="w-[180px]">
                  <option>Fracionada</option>
                  <option>Fechada</option>
                </Sel>
              </div>
            </fieldset>

            {/* === CARD 2 - Origem === */}
            <fieldset className="border border-gray-300 rounded p-3">
              <legend className="text-red-700 font-semibold px-2">Origem</legend>

              {/* Linha 1 */}
              <div className="flex items-center gap-2">
                <Label>Cliente</Label>
                <Txt className="w-30" placeholder="CNPJ" />
                <Txt className="flex-1" placeholder="Razão Social" />
                <Label className="w-24 text-right">Expedidor</Label>
                <Txt className="w-40" placeholder="CNPJ" />
                <Txt className="flex-1" placeholder="Razão Social" />
              </div>

              {/* Linha 2 */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Remetente</Label>
                <Txt className="w-40" placeholder="CNPJ" />
                <Txt className="flex-1" placeholder="Razão Social" />
                <Label className="w-24 text-right">Origem</Label>
                <Txt className="w-32" placeholder="CEP" />
                <Txt className="flex-1" placeholder="Cidade" />
                <Txt className="w-12 text-center" placeholder="UF" />
              </div>

              {/* Linha 3 */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Tab. Frete</Label>
                <Sel className="w-[140px]">
                  <option>000083 - TABELA TESTE HNK</option>
               </Sel>
                <Sel className="w-[140px]">
                  <option>CEVA</option>
                  <option>GB</option>
                  <option>NF</option>
                </Sel>
                <label className="flex items-center gap-1 text-[12px]">
                  <input type="checkbox" /> Rateio Frete (Contrato)
                </label>
                <Label className="ml-auto">Veículo Solicitado</Label>
                <Sel className="w-[180px]">
                  <option>01 - UTILITARIO</option>
                  <option>02 - VAN</option>
                  <option>03 - 3/4</option>
                  <option>04 - TOCO</option>
                  <option>05 - TRUCK</option>
                  <option>06 - BITRUCK</option>
                  <option>07 - CAVALO MECÂNICO</option>
                  <option>08 - CAVALO TRUCADO</option>

                </Sel>
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-3 py-[3px] flex items-center gap-1">
                  <DollarSign size={14} className="text-red-700" />
                  Custos Adicionais
                </button>
              </div>

              {/* Linha 4 */}
              <div className="flex items-center gap-2 mt-2">
                <Label>Divisão</Label>
                <Sel className="w-[200px]">
                  <option>Logística</option>
                  <option>Administrativo</option>
                </Sel>
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
    {/* ====== CARD 1 - FILTROS ====== */}
    <fieldset className="border border-gray-300 rounded p-3 flex-1">
      <legend className="text-red-700 font-semibold px-2">Filtros</legend>

      <div className="space-y-2">
        {/* Linha 1 */}
        <div className="flex items-center gap-2">
          <Label>Filial Origem</Label>
          <Sel className="flex-1">
            <option>001 - TESTE MANTRAN</option>
          </Sel>
          <Label className="w-[90px] text-right">Tp. Carga</Label>
          <Sel className="w-[160px]">
            <option>TODAS</option>
            <option>FRACIONADA</option>
            <option>FECHADA</option>
          </Sel>
          <Label className="w-[110px] text-right">Status Viagem</Label>
          <Sel className="w-[160px]">
            <option>TODOS</option>
            <option>NÃO INICIADA</option>
            <option>EM ANDAMENTO</option>
            <option>ENCERRADA</option>
          </Sel>
        </div>

        {/* Linha 2 */}
        <div className="flex items-center gap-2">
          <Label>Cliente</Label>
          <Txt className="w-[160px]" placeholder="CNPJ" />
          <Txt className="flex-1" placeholder="Razão Social" />
          <label className="flex items-center gap-1 text-[12px]">
            <input type="checkbox" /> Listar Apenas Veículos Agregados
          </label>
          <label className="flex items-center gap-1 text-[12px]">
            <input type="checkbox" /> Listar Apenas Viagens s/ valor de Frete
          </label>
        </div>

        {/* Linha 3 */}
        <div className="flex items-center gap-2">
          <Label>Remetente</Label>
          <Txt className="w-[160px]" placeholder="CNPJ" />
          <Txt className="flex-1" placeholder="Razão Social" />
          <Label className="w-[60px] text-right">Origem</Label>
          <Txt className="w-[100px]" placeholder="CEP" />
          <Txt className="w-[200px]" placeholder="Cidade" />
          <Txt className="w-[40px] text-center" placeholder="UF" />
        </div>

        {/* Linha 4 */}
        <div className="flex items-center gap-2">
          <Label>Destinatário</Label>
          <Txt className="w-[160px]" placeholder="CNPJ" />
          <Txt className="flex-1" placeholder="Razão Social" />
          <Label className="w-[60px] text-right">Destino</Label>
          <Txt className="w-[100px]" placeholder="CEP" />
          <Txt className="w-[200px]" placeholder="Cidade" />
          <Txt className="w-[40px] text-center" placeholder="UF" />
        </div>

        {/* Linha 5 */}
        <div className="flex items-center gap-2">
          <Label>Agregado</Label>
          <Txt className="w-[160px]" placeholder="CNPJ" />
          <Txt className="flex-1" placeholder="Nome do Agregado" />
          <Label className="w-[60px] text-right">Divisão</Label>
          <Sel className="w-[180px]">
            <option>TODAS</option>
            <option>LOGÍSTICA</option>
            <option>ADMINISTRATIVO</option>
          </Sel>
        </div>

        {/* Linha 6 */}
        <div className="flex items-center gap-2">
          <Label>Motorista</Label>
          <Txt className="w-[160px]" placeholder="CNH" />
          <Txt className="flex-1" placeholder="Nome do Motorista" />
        </div>

        {/* Linha 7 */}
        <div className="flex items-center gap-2">
          <Label>Período</Label>
          <Txt type="date" className="w-[150px]" />
          <Label>a</Label>
          <Txt type="date" className="w-[150px]" />
          <label className="flex items-center gap-1 text-[12px] ml-2">
            <input type="checkbox" /> Dt. Início Prev.
          </label>
          <Label className="w-[80px] text-right">Viagem</Label>
          <Txt className="w-[80px]" />
          <Label className="w-[80px] text-right">Coleta</Label>
          <Txt className="w-[80px]" />
          <Label className="w-[60px] text-right">CTRC</Label>
          <Txt className="w-[80px]" />
          <Label className="w-[60px] text-right">Veículo</Label>
          <Txt className="w-[100px]" />
          <Label className="w-[100px] text-right">Nº Solicitação</Label>
          <Txt className="w-[100px]" />
        </div>
      </div>
    </fieldset>

    {/* ====== CARD 2 - BOTÕES LATERAIS ====== */}
    <div className="flex flex-col gap-2 w-[140px]">
      <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded py-2 text-[13px] text-gray-700">
        Pesquisar
      </button>
      <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded py-2 text-[13px] text-gray-700">
        Limpar
      </button>
      <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded py-2 text-[13px] text-gray-700">
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
        {[...Array(10)].map((_, i) => (
          <tr
            key={i}
            className={i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
          >
            <td className="border text-center px-2">
              <input type="checkbox" />
            </td>
            <td className="border px-2 text-red-600 font-semibold">
              {i === 2 ? "EM ANDAMENTO" : "NÃO INICIADA"}
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
        ))}
      </tbody>
    </table>
  </div>
)}

{/* ====== CARD 4 - TOTAL / BOTÕES ====== */}
{activeTab === "consulta" && (
  <div className="flex justify-between items-center mt-2">
    <div className="text-[13px] text-gray-700">
      Total Selecionados: <b>2</b> de <b>3</b>
    </div>
    <div className="flex gap-2">
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px]">
        Selecionar Todos
      </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px]">
        Limpar Seleção
      </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-blue-600">
        Iniciar
      </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-green-600">
        Encerrar
      </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-yellow-600">
        Cancelar
      </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-red-600">
        Estornar
      </button>
      <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-gray-600">
        Excluir
      </button>
    </div>
  </div>
)}


{/* ===================== ABA DOCTOS ===================== */}
{activeTab === "doctos" && (
  <div className="flex flex-col gap-2 overflow-hidden p-2">
     {/* <div className="flex flex-row gap-2"> */}
    {/* === CARD 1 - Documentos da Viagem === */}
    <fieldset className="border border-gray-300 rounded p-3 w-full">
      <legend className="text-red-700 font-semibold px-2">Documentos da Viagem</legend>

      {/* ===== GRID COM ROLAGEM ===== */}
      <div className="relative border border-gray-300 rounded bg-white mt-2 max-h-[300px] overflow-y-auto overflow-x-auto">
        <div className="min-w-[2400px]">
          <table className="w-full text-[12px] border-collapse">
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
              {[...Array(2)].map((_, i) => (
                <tr
                  key={i}
                  className={`${
                    i === 0 ? "bg-red-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="border text-center">
                    <input type="checkbox" defaultChecked={i === 0} />
                  </td>
                  <td className="border text-center">{i === 0 ? "I" : ""}</td>
                  <td className="border text-center">001</td>
                  <td className="border text-center">001</td>
                  <td className="border px-2">HNK BR LOGISTICA E DISTRIBUICAO LTDA</td>
                  <td className="border text-center">58846</td>
                  <td className="border text-center">58818</td>
                  <td className="border text-center">27/10/2025</td>
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
                  <td className="border text-center font-mono">
                    3525104086814000145700100000588181582686539
                  </td>
                  <td className="border text-center">001</td>
                  <td className="border text-center"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              className={`border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] ${
                btn === "Remover" ? "text-red-600" : ""
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
    <fieldset className="border border-gray-300 rounded p-3 w-full">
      <legend className="text-red-700 font-semibold px-2">Adicionar CTRC's na Viagem</legend>

      {/* === FILTROS === */}
      <div className="flex flex-col gap-2 mb-2">
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

        <div className="flex items-center gap-2">
          <Label>Remetente</Label>
          <Txt className="w-[160px]" placeholder="CNPJ" />
          <Txt className="flex-1" placeholder="Razão Social" />
          <Label className="w-[60px] text-right">Filial</Label>
          <Sel className="w-[180px]">
            <option>TODAS</option>
          </Sel>
          <Label className="w-[80px] text-right">Tipo Docs</Label>
          <Sel className="w-[180px]">
            <option>CTe - Controle</option>
          </Sel>
          <label className="flex items-center gap-1 text-[12px] ml-3">
            <input type="checkbox" /> Doctos não encerrados
          </label>
          <label className="flex items-center gap-1 text-[12px]">
            <input type="checkbox" /> Incluir Cancelados
          </label>
        </div>
      </div>

      {/* ===== GRID DE ADIÇÃO ===== */}
      <div className="relative border border-gray-300 rounded bg-white mt-2 max-h-[300px] overflow-y-auto overflow-x-auto">
        <div className="min-w-[2400px]">
          <table className="w-full text-[12px] border-collapse">
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
              {[...Array(8)].map((_, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-orange-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="border text-center">001</td>
                  <td className="border text-center">001</td>
                  <td className="border px-2">HNK BR IND. BEBIDAS LTDA</td>
                  <td className="border text-center">0588{i}</td>
                  <td className="border text-center">0588{i}</td>
                  <td className="border text-center">20/10/2025</td>
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
      </div>

      {/* === RODAPÉ === */}
      <div className="flex justify-between mt-2 flex-wrap">
        <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px]">
          Rel. Armazém
        </button>
        <div className="flex gap-2 flex-wrap">
          <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px]">
            Selecionar Todos
          </button>
          <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px]">
            Limpar Seleção
          </button>
          <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 text-[13px] text-green-700">
            Adicionar
          </button>
        </div>
      </div>
    </fieldset>
  </div>
)}




      </div>
    </div>
  );
}
