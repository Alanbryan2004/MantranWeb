import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustosAdicionaisModal from "./CustosAdicionaisModal";
import NotasFiscalModal from "./NotasFiscalModal";
import ValoresCte from "./ValoresCte";
import NotaFiscalCte from "./NotaFiscalCte";
import Comex from "./Comex";
import ConsultaSefazCte from "./ConsultaSefazCte";
import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  FileText,
  DollarSign,
  Globe2,
  FileSpreadsheet,
  Printer,
  Copy,
  Search,
} from "lucide-react";

// Helpers simples para consistência
function Label({ children, className = "" }) {
  return <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>;
}
function Txt(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 rounded px-1 py-[2px] h-[26px] " +
        (props.className || "")
      }
    />
  );
}
function Sel({ children, ...rest }) {
  return (
    <select
      {...rest}
      className="border border-gray-300 rounded px-1 py-[2px] h-[26px]"
    >
      {children}
    </select>
  );
}

// Ícone lápis reutilizável
function IconeLapis({ title = "", onClick }) {
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

export default function CTePage({ open }) {
  const [activeTab, setActiveTab] = useState("cte");
  const navigate = useNavigate();
  const [showCustos, setShowCustos] = useState(false);
  const [showNotaFiscal, setShowNotaFiscal] = useState(false);
  const [showComex, setShowComex] = useState(false);
  const [showValoresCte, setShowValoresCte] = useState(false);
  const [showNotaFiscalCte, setShowNotaFiscalCte] = useState(false);
  const [showConsultaSefaz, setShowConsultaSefaz] = useState(false);


  const abrirModal = (nome) => {
  if (nome === "custos") {
    setShowCustos(true); // abre o modal de Custos Adicionais
  } else if (nome === "notaFiscal") {
    setShowNotaFiscal(true); // abre o modal de Nota Fiscal
  } else {
    console.log("Abrir modal:", nome);
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
        CONHECIMENTO
      </h1>

      {/* Abas */}
      <div className="flex border-b border-gray-300 bg-white">
        <button
          onClick={() => setActiveTab("cte")}
          className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${
            activeTab === "cte"
              ? "bg-white text-red-700 border-gray-300"
              : "bg-gray-100 text-gray-600 border-transparent"
          }`}
        >
          CTe
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
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md flex flex-col gap-1 overflow-y-auto overflow-x-hidden">

        {activeTab === "cte" ? (
          <>
            {/* CARD 1 — Dados Principais */}
            <div className="border border-gray-300 rounded p-1 bg-white space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* COLUNA ESQUERDA */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="w-20 text-right">Empresa</Label>
                    <Sel className="flex-1" defaultValue="001 - MANTRAN TRANSPORTES LTDA">
                      <option>001 - MANTRAN TRANSPORTES LTDA</option>
                    </Sel>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="w-20 text-right">Data</Label>
                    <Txt type="date" className="w-36" defaultValue="2025-10-16" />
                    <Label className="w-20 text-right">Tipo Carga</Label>
                    <Sel className="flex-1" defaultValue="Fracionada">
                      <option>Fracionada</option>
                      <option>Fechada</option>
                    </Sel>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="w-20 text-right">Motorista</Label>
                    <Txt className="w-36" defaultValue="02047212806" />
                    <Txt className="flex-1" defaultValue="LEONARDO COELHO" />
                    <IconeLapis title="Abrir cadastro motorista" onClick={() => abrirModal("motorista")} />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="w-20 text-right">Tração</Label>
                    <Txt className="w-36" defaultValue="0000031" />
                    <Txt
                      className="flex-1"
                      defaultValue="FWH4B13 - R 450 6X2 - CAVALO MECÂNICO - CORDEIROPOLIS"
                    />
                    <IconeLapis title="Abrir cadastro tração" onClick={() => abrirModal("tracao")} />
                  </div>
                </div>

                {/* COLUNA DIREITA */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="w-20 text-right">Filial</Label>
                    <Sel className="w-56" defaultValue="002 - RODOVIÁRIO VTA LTDA EPP">
                      <option>002 - RODOVIÁRIO VTA LTDA EPP</option>
                    </Sel>
                    <Label className="w-12 text-right">Tipo</Label>
                    <Sel className="w-32" defaultValue="0 - Normal">
                      <option>0 - Normal</option>
                      <option>1 - Subcontratado</option>
                    </Sel>
                    <Label className="w-20 text-right ml-auto">Nº Controle</Label>
                    <Txt className="w-24" defaultValue="002444" />
                    <IconeLapis title="Abrir controle" onClick={() => abrirModal("controle")} />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="w-20 text-right">Nº Coleta</Label>
                    <Txt className="w-28" />
                    <Label className="w-20 text-right">Nº Viagem</Label>
                    <Txt className="w-28" defaultValue="000298" />
                    <Label className="w-16 text-right">Nº Minuta</Label>
                    <Txt className="w-20" defaultValue="0" />
                    <Label className="w-20 text-right ml-auto">Nº CTe</Label>
                    <Txt className="w-24" defaultValue="002420" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="w-20 text-right">Reboque</Label>
                    <Txt className="w-36" defaultValue="0000033" />
                    <Txt
                      className="flex-1"
                      defaultValue="GFN1J43 - CARRETA BRANCA 7 EIXOS - SEMI REBOQUE"
                    />
                    <IconeLapis title="Abrir cadastro reboque" onClick={() => abrirModal("reboque")} />
                    <Label className="w-16 text-right ml-auto">Série</Label>
                    <Txt className="w-20" defaultValue="001" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="w-28 text-right">Veículo Solicit.</Label>
                    <Sel className="w-48" defaultValue="Truck">
                      <option>Truck</option>
                      <option>Toco</option>
                      <option>Carreta</option>
                    </Sel>
                    <Label className="w-24 text-right">Nº Romaneio</Label>
                    <Txt className="flex-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 — Participantes */}
<div className="border border-gray-300 rounded p-1 bg-white space-y-2">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">Participantes</h2>

  {/* Cabeçalho */}
  <div className="grid grid-cols-[100px_180px_1fr_180px_60px_30px] gap-[4px] mb-1 items-center">
    <div></div>
    <div className="font-semibold text-xs text-gray-600">CGC / CPF</div>
    <div className="font-semibold text-xs text-gray-600">Razão Social</div>
    <div className="font-semibold text-xs text-gray-600">Cidade</div>
    <div className="font-semibold text-xs text-gray-600">UF</div>
    <div></div>
  </div>

  {/* Linhas */}
  {[
    ["Cliente", "50221019000136", "HNK BR INDUSTRIA DE BEBIDAS LTDA", "ITU", "SP"],
    ["Remetente", "50221019000136", "HNK BR INDUSTRIA DE BEBIDAS LTDA", "ITU", "SP"],
    ["Destinatário", "0525495700651", "HNK BR LOGISTICA E DISTRIBUICAO LTDA", "SALVADOR", "BA"],
    ["Expedidor", "", "", "", ""],
    ["Recebedor", "", "", "", ""],
    ["Seguradora", "002", "LIBERTY SEGUROS", "", ""],
  ].map(([label, cgc, razao, cidade, uf], i) => (
    <div
      key={i}
      className="grid grid-cols-[100px_180px_1fr_180px_60px_30px] gap-[4px] items-center"
    >
      <Label className="text-right pr-2">{label}</Label>

      {/* Campo CGC/CPF (ajustado só no Remetente) */}
      {label === "Remetente" ? (
        <div className="flex items-center gap-1">
          <Txt className="w-[150px]" defaultValue={cgc} />
          <button
            onClick={() => abrirModal("notaFiscal")}
            title="Notas Fiscais do Remetente"
            className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded w-[24px] h-[22px] flex items-center justify-center"
          >
            <FileText size={13} color="red" />
          </button>
        </div>
      ) : (
        <Txt className="w-[180px]" defaultValue={cgc} />
      )}

      <Txt defaultValue={razao} />
      <Txt defaultValue={cidade} />
      <Txt defaultValue={uf} className="text-center" />
      <IconeLapis
        title={`Abrir cadastro ${label}`}
        onClick={() => abrirModal(label.toLowerCase())}
      />
    </div>
  ))}
</div>


           {/* CARD 3 — Entrega e Modalidade */}
<div className="border border-gray-300 rounded p-1 bg-white space-y-2">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">Entrega e Modalidade</h2>

  {/* Linha 1 */}
  <div className="flex flex-wrap items-center gap-2">
    <Label className="w-24 text-right">End. Entrega</Label>
    <Txt className="w-[700px]" defaultValue="AV JEQUITAIÁ" />
    <Label className="w-6 text-right">UF</Label>
    <Txt className="w-[40px] text-center" defaultValue="SP" />
    <Label className="w-8 text-right">Nº</Label>
    <Txt className="w-[60px]" defaultValue="92" />
    <Label className="w-14 text-right">Bairro</Label>
    <Txt className="flex-1" defaultValue="AGUA DE MENINOS" />
  </div>

 <div className="flex items-center gap-2 w-full flex-wrap">
  <Label className="w-28 text-right">Origem Frete</Label>
  <Txt className="flex-1 min-w-[180px] max-w-[260px]" defaultValue="ITU" />
  <Label className="w-6 text-right">UF</Label>
  <Txt className="w-[50px] text-center" defaultValue="SP" />
  <Label className="w-32 text-right">Cidade Entrega</Label>
  <Txt className="flex-1 min-w-[200px] max-w-[260px]" defaultValue="SALVADOR" />
  <Label className="w-6 text-right">UF</Label>
  <Txt className="w-[50px] text-center" defaultValue="BA" />

  <div className="flex items-center gap-2 flex-grow justify-end">
    <Label className="w-32 text-right">Divisão/Loja</Label>
    <Sel className="flex-1 min-w-[160px] max-w-[220px]" defaultValue="1054 - Leo Campinas">
      <option>1054 - Leo Campinas</option>
      <option>1500 - Leo CD</option>
    </Sel>
  </div>
</div>


  {/* Linha 3 */}
  <div className="flex flex-wrap items-center gap-2">
    <Label className="w-24 text-right">Modalidade</Label>
    <Sel className="w-[180px]" defaultValue="C-CIF">
      <option>C-CIF</option>
      <option>F-FOB</option>
    </Sel>
    <Label className="w-20 text-right">Tp. Frete</Label>
    <Sel className="w-[160px]" defaultValue="F - FATURADO" disabled>
      <option>F - FATURADO</option>
    </Sel>
    <Label className="w-10 text-right">Rota</Label>
    <Sel className="w-[160px]" disabled>
      <option></option>
    </Sel>
    <Label className="w-10 text-right">Tipo</Label>
    <Txt className="w-[40px] text-center" defaultValue="N" />
    <Label className="w-16 text-right">Situação</Label>
    <Txt className="flex-1" defaultValue="I - Impresso" />
  </div>
</div>


{/* CARD 4 — Dados Complementares (4 linhas ajustadas) */}
<div className="border border-gray-300 rounded p-1 bg-white space-y-2">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">
    Dados Complementares
  </h2>

  {/* Linha 1: Centro Custo - Carga Imo - Custos Adicionais - Tab. Frete - Modal */}
<div className="flex items-center gap-2 w-full">
  {/* Centro de Custo */}
  <Label className="w-24 text-right">Centro Custo</Label>
  <Sel className="flex-1 min-w-[250px] max-w-[400px]" defaultValue="Operacional">
    <option>Operacional</option>
    <option>Administrativo</option>
    <option>Financeiro</option>
    <option>Comercial</option>
  </Sel>

  {/* Checkbox e botão */}
  <div className="flex items-center gap-1">
    <input type="checkbox" className="w-4 h-4" id="cargaImo" />
    <Label htmlFor="cargaImo">Carga IMO</Label>
  </div>

  <button
    onClick={() => abrirModal("custos")}
    className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-2 h-[24px] text-[12px]"
  >
    Custos Adicionais
  </button>

  {/* Tab. Frete */}
  <Label className="w-20 text-right">Tab. Frete</Label>
  <Sel className="flex-1 min-w-[300px] max-w-[600px]" defaultValue="000083 - TESTE HNK">
    <option>000083 - TESTE HNK</option>
    <option>000084 - MATRIZ</option>
    <option>000085 - CLIENTES MG</option>
  </Sel>

  {/* Modal alinhado à direita */}
  <div className="flex items-center justify-end flex-grow">
    <Label className="w-12 text-right">Modal</Label>
    <Sel className="w-[140px]" defaultValue="01 - Rodoviário">
      <option>01 - Rodoviário</option>
      <option>02 - Aéreo</option>
      <option>03 - Aquaviário</option>
    </Sel>
  </div>
</div>

  {/* Linha 2: CEP Origem - CEP Destino Calc - Peso Cálculo - Ocorrência (25) - Tp Serviço - Docs */}
<div className="flex items-center gap-2 w-full flex-wrap">
  <Label className="w-24 text-right">CEP Origem</Label>
  <Txt className="w-[100px] text-center" defaultValue="13300-000" />

  <Label className="w-28 text-right">CEP Destino Cálc</Label>
  <Txt className="w-[100px] text-center" defaultValue="40000-000" />

  <Label className="w-24 text-right">Peso Cálculo</Label>
  <Txt className="w-[80px] text-center" defaultValue="1.0000" />

  <Label className="w-24 text-right">Ocorrência</Label>
  {/* 25 caracteres visuais */}
  <Txt className="w-[25ch]" maxLength={25} defaultValue="Sem Ocorrência" />

  <Label className="w-20 text-right">Tp. Serviço</Label>
  <Sel className="w-[160px]" defaultValue="0 - Frete Normal">
    <option>0 - Frete Normal</option>
    <option>1 - Coleta</option>
    <option>2 - Entrega</option>
  </Sel>

  <div className="flex items-center gap-2 flex-grow justify-end">
    <button
      onClick={() => abrirModal("docs")}
      className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-1 h-[24px] text-[12px] shrink-0"
      title="Documentos"
    >
      Docs
    </button>
  </div>
</div>


  {/* Linha 3: Seguro - Chave CTe - Tarifa */}
  <div className="flex items-center gap-2 w-full flex-wrap">
    <Label className="w-24 text-right">Seguro</Label>
    <Sel className="w-[300px]" defaultValue="4 - Por conta do Emissor CTe">
      <option>4 - Por conta do Emissor CTe</option>
    </Sel>

    <Label className="w-28 text-right">Chave CTe</Label>
    <Txt
      className="flex-1 text-[12px]"
      defaultValue="35251004086140014157001000058801393009188"
    />

    <Label className="w-[60px] text-right">Tarifa</Label>
    <Txt className="w-[40px] text-center" defaultValue="1" />
  </div>

  {/* Linha 4: Cadastro - Atualizado em - Prev. Entrega - Operador - Nº Cotação - Nº Fatura */}
  <div className="flex items-center gap-2 w-full flex-wrap">
    <Label className="w-[70px] text-right">Cadastro</Label>
    <Txt type="date" className="w-[110px] flex-shrink-0" defaultValue="2025-10-15" />

    <Label className="w-[95px] text-right">Atualizado em</Label>
    <Txt type="date" className="w-[110px] flex-shrink-0" defaultValue="2025-10-15" />

    <Label className="w-[95px] text-right">Prev. Entrega</Label>
    <Txt type="date" className="w-[110px] flex-shrink-0" defaultValue="2025-10-15" />

    <Label className="w-[80px] text-right">Operador</Label>
    <Txt className="flex-1 min-w-[100px]" defaultValue="SUPORTE" />

    <Label className="w-[90px] text-right">Nº Cotação</Label>
    <Txt className="w-[100px] flex-shrink-0" />

    <Label className="w-[80px] text-right">Nº Fatura</Label>
    <Txt className="w-[100px] flex-shrink-0" />
  </div>
</div>


            {/* Faixa de Averbação */}
<div className="border border-gray-300 text-green-700 bg-white text-center py-1 px-3 mt-2 text-[12px] font-semibold rounded">
  Averbado em <span className="text-green-700 font-semibold">15/10/2025</span> com o Nº Averbação:{" "}
  <span className="text-green-700 font-semibold">06513102504086140001415700100005880134</span> e Protocolo:{" "}
  <span className="text-green-700 font-semibold">TESTE</span>
</div>

            {/* Rodapé */}
<div className="border-t border-gray-300 bg-white py-1 px-3 flex items-center justify-between text-red-700">
  {/* Ícones com legendas */}
  <div className="flex items-center gap-4">
    <button onClick={() => navigate("/")} className="flex flex-col items-center text-[11px]">
      <XCircle size={18} />
      <span>Fechar</span>
    </button>

    <div className="flex flex-col items-center text-[11px]">
      <RotateCcw size={18} />
      <span>Limpar</span>
    </div>

    <div className="flex flex-col items-center text-[11px]">
      <PlusCircle size={18} />
      <span>Incluir</span>
    </div>

    <div className="flex flex-col items-center text-[11px]">
      <Edit size={18} />
      <span>Alterar</span>
    </div>

    <div className="flex flex-col items-center text-[11px]">
      <Trash2 size={18} />
      <span>Excluir</span>
    </div>

   <button
  onClick={() => setShowNotaFiscalCte(true)}
  className="flex flex-col items-center text-[11px]"
  title="Notas Fiscais do CTe"
>
  <FileText size={18} />
  <span>Nota Fiscal</span>
</button>

    {/* === Botão que abre a tela de Valores do CTe === */}
   <button
  onClick={() => setShowValoresCte(true)}
  title="Valores do CTe"
  className="flex flex-col items-center text-[11px]"
>
  <DollarSign size={18} />
  <span>Valores</span>
</button>


    <button
      onClick={() => setShowComex(true)}
      className="flex flex-col items-center text-[11px]"
    >
      <Globe2 size={18} />
      <span>Comex</span>
    </button>

    <div className="flex flex-col items-center text-[11px]">
      <FileSpreadsheet size={18} />
      <span>GNRE</span>
    </div>

    <div className="flex flex-col items-center text-[11px]">
      <Printer size={18} />
      <span>Imprimir</span>
    </div>

    <div className="flex flex-col items-center text-[11px]">
      <Copy size={18} />
      <span>Duplicar</span>
    </div>

  <button
  onClick={() => setShowConsultaSefaz(true)}
  className="flex flex-col items-center text-[11px]"
  title="Consulta SEFAZ do CTe"
>
  <Search size={18} />
  <span>Sefaz</span>
</button>
  </div>
</div>

          </>
        ) : (
          <div className="flex-1 flex flex-col gap-2 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto">

  {/* CARD 1 — Filtros */}
  <div className="border border-gray-300 rounded p-2 bg-white">
    <h2 className="text-red-700 font-semibold text-[13px] mb-2">Parâmetros de Pesquisa</h2>

    {/* Linha 1 */}
    <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
      <div className="col-span-6 flex items-center gap-2">
        <label className="w-16 text-right">Empresa</label>
        <select className="flex-1 border border-gray-300 rounded px-2 h-[24px]">
          <option>001 - MANTRAN TRANSPORTES LTDA</option>
        </select>
      </div>
      <div className="col-span-6 flex items-center gap-2">
        <label className="w-14 text-right">Filial</label>
        <select className="flex-1 border border-gray-300 rounded px-2 h-[24px]">
          <option>001 - TESTE MANTRAN</option>
        </select>
      </div>
    </div>

    {/* Linha 2 */}
    <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
      <div className="col-span-6 flex items-center gap-2">
        <label className="w-16 text-right">Remetente</label>
        <input className="w-[190px] border border-gray-300 rounded px-2 h-[24px]" defaultValue="50221019000136" />
        <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" defaultValue="HNK BR INDUSTRIA DE BEBIDAS LTDA" />
      </div>
      <div className="col-span-6 flex items-center gap-2">
        <label className="w-14 text-right">Motorista</label>
        <input className="w-[160px] border border-gray-300 rounded px-2 h-[24px]" defaultValue="01620846760" />
        <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" defaultValue="ALAN DA COSTA" />
      </div>
    </div>

    {/* Linha 3 */}
    <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
      <div className="col-span-6 flex items-center gap-2">
        <label className="w-16 text-right">Destinatário</label>
        <input className="w-[190px] border border-gray-300 rounded px-2 h-[24px]" defaultValue="19900000000626" />
        <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" defaultValue="CERVEJARIAS KAISER BRASIL S.A" />
      </div>
      <div className="col-span-6 flex items-center gap-2">
        <label className="w-14 text-right">Veículo</label>
        <input className="w-[160px] border border-gray-300 rounded px-2 h-[24px]" defaultValue="0000005" />
        <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" defaultValue="ABH3B06 - SCANIA - CAVALO TRUCADO - LINS" />
      </div>
    </div>

    {/* Linha 4 */}
    <div className="grid grid-cols-12 gap-2 text-[12px] mb-2">
      <div className="col-span-6 flex items-center gap-2">
        <label className="w-16 text-right">Período</label>
        <input type="date" className="border border-gray-300 rounded px-2 h-[24px] w-[130px]" defaultValue="2025-10-14" />
        <span className="mx-1">até</span>
        <input type="date" className="border border-gray-300 rounded px-2 h-[24px] w-[130px]" defaultValue="2025-10-20" />
        <label className="w-14 text-right">Data de</label>
        <select className="border border-gray-300 rounded px-2 h-[24px] w-[140px]">
          <option>Cadastro</option>
          <option>Emissão</option>
          <option>Atualização</option>
        </select>
      </div>

      <div className="col-span-6 grid grid-cols-12 gap-2">
        <div className="col-span-4 flex items-center gap-2">
          <label className="w-20 text-right">Nº Controle</label>
          <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" />
        </div>
        <div className="col-span-4 flex items-center gap-2">
          <label className="w-20 text-right">Nº Impresso</label>
          <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" defaultValue="54623" />
        </div>
        <div className="col-span-4 flex items-center gap-2">
          <label className="w-16 text-right">Operador</label>
          <select className="flex-1 border border-gray-300 rounded px-2 h-[24px]">
            <option>TODOS</option>
          </select>
        </div>
      </div>
    </div>

    {/* Linha 5 */}
    <div className="grid grid-cols-12 gap-2 text-[12px]">
      <div className="col-span-6 flex items-center gap-2">
        <label className="w-16 text-right">Averbação</label>
        <select className="w-[180px] border border-gray-300 rounded px-2 h-[24px]">
          <option>TODOS</option>
          <option>Sim</option>
          <option>Não</option>
        </select>
        <label className="w-16 text-right">Status</label>
        <select className="w-[160px] border border-gray-300 rounded px-2 h-[24px]">
          <option>T - Todos</option>
          <option>I - Impresso</option>
          <option>A - Autorizado</option>
          <option>C - Cancelado</option>
          <option>E - Rejeitado</option>
        </select>
        <label className="w-24 text-right">Tracking Number</label>
        <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" />
      </div>

      <div className="col-span-6 grid grid-cols-12 gap-2">
        <div className="col-span-6 flex items-center gap-2">
          <label className="w-16 text-right">Nº Viagem</label>
          <input className="flex-1 border border-gray-300 rounded px-2 h-[24px]" />
        </div>

        {/* Botões */}
        <div className="col-span-6 flex items-center justify-end gap-2">
          <button className="border border-gray-300 text-[12px] px-3 py-[2px] rounded bg-gray-50 hover:bg-gray-100">
            Limpar
          </button>
          <button className="border border-gray-300 text-[12px] px-3 py-[2px] rounded bg-blue-50 hover:bg-blue-100 text-blue-700">
            Pesquisar
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* CARD 2 — Grid */}
  <div className="border border-gray-300 rounded p-2 bg-white">
    <h2 className="text-red-700 font-semibold text-[13px] mb-1">
      Relação de Conhecimentos Emitidos
    </h2>

    <div className="border border-gray-300 rounded overflow-auto">
      <table className="min-w-full text-[12px] border-collapse">
        <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
          <tr>
            <th className="px-2 py-1 border-r">Empresa</th>
            <th className="px-2 py-1 border-r">Filial</th>
            <th className="px-2 py-1 border-r">St.</th>
            <th className="px-2 py-1 border-r">Nº Controle</th>
            <th className="px-2 py-1 border-r">Nº Impresso</th>
            <th className="px-2 py-1 border-r">Série</th>
            <th className="px-2 py-1 border-r">Retorno SEFAZ</th>
            <th className="px-2 py-1 border-r">Dt. Emissão</th>
            <th className="px-2 py-1 border-r">Dt. Últ. Atualização</th>
            <th className="px-2 py-1 border-r">Remetente [Fantasia]</th>
            <th className="px-2 py-1 border-r">Destinatário [Fantasia]</th>
            <th className="px-2 py-1 border-r">Endereço Entrega</th>
            <th className="px-2 py-1 border-r">Bairro Entrega</th>
            <th className="px-2 py-1">Cidade Entrega</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["001","001","I","058840","058808","001","Autorizado o uso do CT-e","15/10/2025","15/10/2025","HNK-SALVADOR-AGUA MI","HNK-ITU (1) MATRIZ","AVENIDA PRIMO SCHINCARIOL","ITAIM","ITU/SP"],
            ["001","001","I","058839","058807","001","540 - Rejeição: Grupo de documentos","15/10/2025","15/10/2025","HNK-ITU (1) MATRIZ","HNK BR IN PARNAMIRIM","R RIO JORDAO","EMAUS","NATAL/RN"],
          ].map((r, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {r.map((c, j) => (
                <td key={j} className="border-t border-gray-200 px-2 py-[3px]">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* CARD 3 — Rodapé / Ações */}
  <div className="border border-gray-300 rounded p-2 bg-white flex items-center justify-between text-[12px]">
    <span className="text-gray-600">Total de registros: 9</span>
    <button className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-[2px] rounded">
      ⚙️ Ações
    </button>
  </div>
</div>

        )}
</div>

      {/* Modal de Custos Adicionais */}
      {showCustos && <CustosAdicionaisModal onClose={() => setShowCustos(false)} />}
      <NotasFiscalModal
  isOpen={showNotaFiscal}
  onClose={() => setShowNotaFiscal(false)}
/>

{showComex && <Comex onClose={() => setShowComex(false)} />}

{showValoresCte && <ValoresCte onClose={() => setShowValoresCte(false)} />}

  {showNotaFiscalCte && <NotaFiscalCte onClose={() => setShowNotaFiscalCte(false)} />}

  {showConsultaSefaz && <ConsultaSefazCte onClose={() => setShowConsultaSefaz(false)} />}      

    </div>
  );
}
