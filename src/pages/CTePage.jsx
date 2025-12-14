import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustosAdicionaisModal from "./CustosAdicionaisModal";
import NotasFiscalModal from "./NotasFiscalModal";
import ValoresCte from "./ValoresCte";
import NotaFiscalCte from "./NotaFiscalCte";
import Comex from "./Comex";
import ConsultaSefazCte from "./ConsultaSefazCte";
import CteComplementar from "./CteComplementar";
import CteSubstituicao from "./CteSubstituicao";
import CteSubcontratado from "./CteSubcontratado";
import { useIconColor } from "../context/IconColorContext";



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
  Zap,
  Search,
  Pencil, // 👈 ADICIONAR
} from "lucide-react";

// Helpers simples para consistência
function Label({ children, className = "" }) {
  return (
    <label
      className={`flex items-center text-[12px] text-gray-600 ${className}`}
    >
      {children}
    </label>
  );
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
function Sel({ children, className = "", ...rest }) {
  return (
    <select
      {...rest}
      className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] ${className}`}
    >
      {children}
    </select>
  );
}


// Ícone lápis reutilizável


function IconeLapis({
  title = "",
  onClick,
  variant = "lapis", // "lapis" | "raio"
}) {
  const isRaio = variant === "raio";

  return (
    <button
      onClick={onClick}
      title={title}
      className={`border border-gray-300 rounded w-[24px] h-[22px] flex items-center justify-center
        ${isRaio ? "bg-yellow-50 hover:bg-yellow-100" : "bg-gray-50 hover:bg-gray-100"}
      `}
    >
      {isRaio ? (
        <Zap size={14} className="text-yellow-600" />
      ) : (
        <Pencil size={14} className="text-gray-600" />
      )}
    </button>
  );
}


export default function CTePage({ open }) {
  const [activeTab, setActiveTab] = useState("cte");
  const { footerIconColorNormal, footerIconColorHover } = useIconColor();
  const navigate = useNavigate();
  const [showCustos, setShowCustos] = useState(false);
  const [showNotaFiscal, setShowNotaFiscal] = useState(false);
  const [showComex, setShowComex] = useState(false);
  const [showValoresCte, setShowValoresCte] = useState(false);
  const [showNotaFiscalCte, setShowNotaFiscalCte] = useState(false);
  const [showConsultaSefaz, setShowConsultaSefaz] = useState(false);
  const [showComplementar, setShowComplementar] = useState(false);
  const [showSubstituicao, setShowSubstituicao] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [tpServico, setTpServico] = useState("0"); // armazena o código do Tp. Serviço
  // === Estados e funções da ABA CONSULTA ===
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selecionados, setSelecionados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [cteSelecionado, setCteSelecionado] = useState(null);

  const abrirCte = (registro) => {
    setCteSelecionado(registro);   // guarda a linha clicada
    setActiveTab("cte");           // muda para a aba CTe
  };

  const dados = [
    ["001", "001", "I", "058840", "000001", "001", "Autorizado o uso do CT-e", "15/10/2025", "15/10/2025", "HNK-SALVADOR", "HNK-ITU", "AV. PRIMO SCHINCARIOL", "ITAIM"],
    ["001", "001", "I", "058839", "000002", "001", "Autorizado o uso do CT-e", "15/10/2025", "15/10/2025", "HNK-ITU", "HNK PARNAMIRIM", "R RIO JORDAO", "NATAL/RN"],
    ["001", "001", "I", "058838", "000003", "001", "Autorizado o uso do CT-e", "15/10/2025", "15/10/2025", "HNK-SALVADOR", "HNK-ITU", "AV. PRIMO SCHINCARIOL", "ITU/SP"],
    ["001", "001", "I", "058837", "000004", "001", "540 - Rejeição", "15/10/2025", "15/10/2025", "HNK-ITU", "HNK PARNAMIRIM", "R RIO JORDAO", "NATAL/RN"],
    ["001", "001", "I", "058836", "000005", "001", "Autorizado o uso do CT-e", "15/10/2025", "15/10/2025", "HNK-SALVADOR", "HNK-ITU", "AV. PRIMO SCHINCARIOL", "ITU/SP"],
    ["001", "001", "I", "058835", "000006", "001", "Autorizado o uso do CT-e5", "15/10/2025", "15/10/2025", "HNK-ITU", "HNK PARNAMIRIM", "R RIO JORDAO", "NATAL/RN"],
    ["001", "001", "I", "058834", "000007", "001", "Autorizado o uso do CT-e", "15/10/2025", "15/10/2025", "HNK-SALVADOR", "HNK-ITU", "AV. PRIMO SCHINCARIOL", "ITU/SP"],
    ["001", "001", "I", "058833", "000008", "001", "240 - Evento Vinculado ao CT-e", "15/10/2025", "15/10/2025", "HNK-ITU", "HNK PARNAMIRIM", "R RIO JORDAO", "NATAL/RN"],
  ];

  const toggleSelecionado = (index) => {
    setSelecionados((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const toggleSelecionarTodos = () => {
    if (selecionados.length === dadosFiltrados.length) {
      setSelecionados([]);
    } else {
      setSelecionados(dadosFiltrados.map((_, i) => i));
    }
  };



  const handlePesquisar = () => {
    // futuramente aqui você usa os filtros
    // agora vamos usar mock controlado
    setDadosFiltrados(dados);
  };

  const handleExcluir = () => {
    if (selecionados.length === 0) {
      alert("Selecione pelo menos um CT-e para excluir.");
      return;
    }
    if (window.confirm("Deseja realmente excluir os CT-es selecionados?")) {
      const novos = dados.filter((_, i) => !selecionados.includes(i));
      console.log("CT-es excluídos:", selecionados);
      setSelecionados([]);
      // Aqui futuramente fará integração com backend
    }
  };




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
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${open ? "ml-[192px]" : "ml-[56px]"
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
          className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${activeTab === "cte"
            ? "bg-white text-red-700 border-gray-300"
            : "bg-gray-100 text-gray-600 border-transparent"
            }`}
        >
          CTe
        </button>
        <button
          onClick={() => setActiveTab("consulta")}
          className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ml-1 ${activeTab === "consulta"
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
            <fieldset className="border border-gray-300 rounded p-3 bg-white space-y-2">
              <legend className="px-2 text-red-700 font-semibold text-[13px]">
                Dados Principais
              </legend>

              {/* LINHA 1 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 flex items-center justify-end">Empresa</Label>
                <Sel className="col-span-3 w-full">
                  <option>001 - MANTRAN TRANSPORTES LTDA</option>
                </Sel>

                <Label className="col-span-1 flex items-center justify-end">Filial</Label>
                <Sel className="col-span-3 w-full">
                  <option>002 - RODOVIÁRIO VTA LTDA EPP</option>
                </Sel>

                <Label className="col-span-1 flex items-center justify-end">Tipo</Label>
                <Sel
                  className="col-span-1 w-full"
                  onChange={(e) => {
                    const valor = e.target.value;
                    if (valor.startsWith("1")) setShowComplementar(true);
                    else if (valor.startsWith("3")) setShowSubstituicao(true);
                  }}
                >
                  <option>0 - Normal</option>
                  <option>1 - Complementar</option>
                  <option>3 - Substituição</option>
                  <option>4 - Simplificado</option>
                </Sel>

                <Label className="col-span-1 flex items-center justify-end">Controle</Label>

                <div className="col-span-1 flex items-center gap-1">
                  <Txt className="w-full" defaultValue="002444" />
                  <IconeLapis
                    title="Enviar"
                    variant="raio"
                    onClick={() => abrirModal("controle")}
                  />
                </div>
              </div>

              {/* LINHA 2 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Data</Label>
                <Txt
                  type="date"
                  className="col-span-1"
                  defaultValue="2025-10-16"
                />

                <Label className="col-span-1 justify-end">Tipo Carga</Label>
                <Sel className="col-span-1 w-full">
                  <option>Fracionada</option>
                  <option>Fechada</option>
                </Sel>

                <Label className="col-span-1 justify-end">Coleta</Label>
                <Txt className="col-span-1" />

                <Label className="col-span-1 justify-end">Viagem</Label>
                <Txt className="col-span-1" defaultValue="000298" />

                <Label className="col-span-1 justify-end">Minuta</Label>
                <Txt className="col-span-1" defaultValue="0" />

                <Label className="col-span-1 justify-end">Nº CTe</Label>

                <div className="col-span-1 flex items-center gap-1 min-w-0">
                  {/* Nº CTe encolhe de verdade */}
                  <Txt
                    className="flex-1 min-w-0"
                    value={cteSelecionado ? cteSelecionado[3] : ""}
                    readOnly
                  />


                  {/* Série fixa 3 dígitos */}
                  <Txt
                    className="w-[36px] text-center bg-gray-200"
                    readOnly
                    defaultValue="001"
                    title="Série"
                  />
                </div>

              </div>


              {/* LINHA 3 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Motorista</Label>

                {/* Documento */}
                <Txt className="col-span-1" defaultValue="02047212806" />

                {/* Nome + Lápis NA MESMA COLUNA */}
                <div className="col-span-4 flex items-center gap-1 min-w-0">
                  <Txt
                    className="flex-1 min-w-0 bg-gray-200"
                    readOnly
                    defaultValue="LEONARDO COELHO"
                  />
                  <IconeLapis
                    title="Motorista"
                    onClick={() => abrirModal("motorista")}
                  />
                </div>
                <Label className="col-span-1 justify-end">Nº Romaneio</Label>
                <Txt className="col-span-1" />
                <Label className="col-span-1 justify-end">Veículo Solicit.</Label>
                <Sel className="col-span-3 w-full">
                  <option>3/4</option>
                  <option>Truck</option>
                  <option>Toco</option>
                  <option>Cavalo Mecânico</option>
                  <option>Vuc</option>
                </Sel>


              </div>


              {/* LINHA 4 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                {/* TRAÇÃO */}
                <Label className="col-span-1 justify-end">Tração</Label>
                <Txt className="col-span-1" defaultValue="0000031" />

                {/* Descrição Tração + Lápis */}
                <div className="col-span-4 flex items-center gap-1 min-w-0">
                  <Txt
                    className="flex-1 min-w-0 bg-gray-200"
                    readOnly
                    defaultValue="FWH4B13 - R 450 6X2 - CAVALO MECÂNICO - CORDEIROPOLIS"
                  />
                  <IconeLapis
                    title="Tração"
                    onClick={() => abrirModal("tracao")}
                  />
                </div>

                {/* REBOQUE */}
                <Label className="col-span-1 justify-end">Reboque</Label>
                <Txt className="col-span-1" defaultValue="0000033" />

                {/* Descrição Reboque + Lápis */}
                <div className="col-span-4 flex items-center gap-1 min-w-0">
                  <Txt
                    className="flex-1 min-w-0 bg-gray-200"
                    readOnly
                    defaultValue="GFN1J43 - CARRETA BRANCA 7 EIXOS - SEMI REBOQUE"
                  />
                  <IconeLapis
                    title="Reboque"
                    onClick={() => abrirModal("reboque")}
                  />
                </div>
              </div>


              {/* LINHA 7 */}
              <div className="grid grid-cols-12 gap-2 items-center">

              </div>

            </fieldset>


            {/* CARD 2 — Participantes */}
            <div className="border border-gray-300 rounded p-1 bg-white space-y-2">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Participantes
              </h2>

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

                  {/* CGC / CPF */}
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

                  {/* Razão Social — NÃO EDITÁVEL */}
                  <Txt
                    defaultValue={razao}
                    readOnly
                    className="bg-gray-200"
                  />

                  {/* Cidade — NÃO EDITÁVEL */}
                  <Txt
                    defaultValue={cidade}
                    readOnly
                    className="bg-gray-200"
                  />

                  {/* UF — NÃO EDITÁVEL */}
                  <Txt
                    defaultValue={uf}
                    readOnly
                    className="text-center bg-gray-200"
                  />

                  <IconeLapis
                    title={`Abrir cadastro ${label}`}
                    onClick={() => abrirModal(label.toLowerCase())}
                  />
                </div>
              ))}
            </div>



            {/* === CARD 3 — Entrega e Modalidade === */}
            <fieldset className="border border-gray-300 rounded p-3 bg-white space-y-2">
              <legend className="px-2 text-red-700 font-semibold text-[13px]">
                Entrega e Modalidade
              </legend>

              {/* LINHA 1 — Endereço de Entrega */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">End. Entrega</Label>
                <Txt className="col-span-6" defaultValue="AV JEQUITAIÁ" />


                <Txt className="col-span-1" defaultValue="92" />

                <Label className="col-span-1 justify-end">Bairro</Label>
                <Txt className="col-span-3" defaultValue="AGUA DE MENINOS" />
              </div>

              {/* LINHA 2 — Origem / Destino */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Origem</Label>
                <Txt className="col-span-2" defaultValue="ITU" />


                <Txt className="col-span-1 text-center" defaultValue="SP" />

                <Label className="col-span-1 justify-end">Cidade Entrega</Label>
                <Txt className="col-span-2" defaultValue="SALVADOR" />

                <Txt className="col-span-1 text-center" defaultValue="BA" />
                <Label className="col-span-1 justify-end">Divisão/Loja</Label>
                <Sel className="col-span-3 w-full" defaultValue="1054 - Leo Campinas">
                  <option>1054 - Leo Campinas</option>
                  <option>1500 - Leo CD</option>
                </Sel>
              </div>



              {/* LINHA 4 — Modalidade / Frete / Rota / Tipo / Situação */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Modalidade</Label>
                <Sel className="col-span-2 w-full" defaultValue="C-CIF">
                  <option>C-CIF</option>
                  <option>F-FOB</option>
                </Sel>

                <Label className="col-span-1 justify-end">Tp. Frete</Label>
                <Sel className="col-span-2 w-full bg-gray-200" disabled>
                  <option>F - FATURADO</option>
                </Sel>

                <Label className="col-span-1 justify-end">Rota</Label>
                <Sel className="col-span-1 w-full bg-gray-200" disabled>
                  <option></option>
                </Sel>

                {/* Tipo */}
                <Label className="col-span-1 justify-end">Tipo</Label>
                <Txt
                  className="col-span-1 text-center bg-gray-200"
                  readOnly
                  defaultValue="N"
                />

                {/* Situação (mesmo “peso visual”) */}
                <Label className="col-span-1 justify-end">Situação</Label>
                <Txt
                  className="col-span-1 bg-gray-200"
                  readOnly
                  defaultValue="I - Impresso"
                />
              </div>


              {/* LINHA 5 — Tipo / Situação */}
              <div className="grid grid-cols-12 gap-2 items-center">

              </div>
            </fieldset>

            {/* === CARD 4 — Dados Complementares === */}
            <div className="border border-gray-300 rounded p-3 bg-white space-y-2">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Dados Complementares
              </h2>

              {/* LINHA 1 — Centro Custo / Carga IMO / Custos / Tabela / Modal */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Centro Custo</Label>
                <Sel className="col-span-2 w-full">
                  <option>Operacional</option>
                  <option>Administrativo</option>
                  <option>Financeiro</option>
                  <option>Comercial</option>
                </Sel>

                <div className="col-span-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="cargaImo"
                    className="w-4 h-4 accent-red-700"
                  />
                  <Label htmlFor="cargaImo" className="justify-start">
                    Carga IMO
                  </Label>
                </div>


                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => abrirModal("custos")}
                    className="border border-gray-300 bg-white hover:bg-red-50 text-red-700 rounded px-3 h-[26px] text-[12px]"
                  >
                    Custos Adicionais
                  </button>
                </div>

                <Label className="col-span-1 justify-end">Tab. Frete</Label>
                <Sel className="col-span-2 w-full">
                  <option>000083 - TESTE HNK</option>
                  <option>000084 - MATRIZ</option>
                  <option>000085 - CLIENTES MG</option>
                </Sel>
                <Label className="col-span-1 justify-end">Modal</Label>
                <Sel className="col-span-2 w-full">
                  <option>01 - Rodoviário</option>
                  <option>02 - Aéreo</option>
                  <option>06 - Multimodal</option>
                </Sel>
              </div>

              {/* LINHA 2 — Modal / CEPs / Peso / Ocorrência */}
              <div className="grid grid-cols-12 gap-2 items-center">


                <Label className="col-span-1 justify-end">CEP Origem</Label>
                <Txt
                  className="col-span-2 text-center bg-gray-200"
                  readOnly
                  defaultValue="13300-000"
                />

                <Label className="col-span-1 justify-end">CEP Dest. Cálc</Label>
                <Txt
                  className="col-span-2 text-center bg-gray-200"
                  readOnly
                  defaultValue="40000-000"
                />

                <Label className="col-span-1 justify-end">Peso Cálc.</Label>
                <Txt className="col-span-2 text-center" defaultValue="1.0000" />
                <Label className="col-span-1 justify-end">Tp. Serviço</Label>

                <div className="col-span-2 flex items-center gap-2 min-w-0">
                  <Sel
                    className="flex-1 min-w-0"
                    value={tpServico}
                    onChange={(e) => setTpServico(e.target.value.split(" ")[0])}
                  >
                    <option value="0">0 - Frete Normal</option>
                    <option value="1">1 - Subcontratado</option>
                    <option value="2">2 - Redespacho</option>
                    <option value="3">3 - Redespacho Intermediário</option>
                    <option value="4">4 - Serv. Vinc. Multimodal</option>
                  </Sel>

                  <button
                    onClick={() => setShowDocs(true)}
                    disabled={!["1", "2", "3", "4"].includes(tpServico)}
                    className={`border border-gray-300 rounded px-2 h-[26px] text-[12px] whitespace-nowrap shrink-0
      ${["1", "2", "3", "4"].includes(tpServico)
                        ? "bg-white hover:bg-red-50 text-red-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Docs
                  </button>
                </div>

              </div>

              {/* LINHA 3 — Ocorrência / Tipo Serviço / Docs */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Ocorrência</Label>
                <Txt className="col-span-2" defaultValue="Sem Ocorrência" />



                <Label className="col-span-1 justify-end">Seguro</Label>
                <Sel className="col-span-2 w-full">
                  <option>4 - Por conta do Emissor CTe</option>
                </Sel>

                <Label className="col-span-1 justify-end">Chave CTe</Label>
                <Txt
                  className="col-span-3 bg-gray-200 text-[12px]"
                  readOnly
                  defaultValue="35251004086140014157001000058801393009188"
                />

                <Label className="col-span-1 justify-end">Tarifa</Label>
                <Txt className="col-span-1 text-center" defaultValue="1" />
              </div>

              {/* LINHA 5 — Datas / Operador / Cotação / Fatura */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Cadastro</Label>
                <Txt type="date" className="col-span-1 bg-gray-200" readOnly defaultValue="2025-10-15" />

                <Label className="col-span-1 justify-end">Atualizado</Label>
                <Txt type="date" className="col-span-1 bg-gray-200" readOnly defaultValue="2025-10-15" />

                <Label className="col-span-1 justify-end">Prev. Entrega</Label>
                <Txt type="date" className="col-span-1" defaultValue="2025-10-15" />

                <Label className="col-span-1 justify-end">Operador</Label>
                <Txt
                  className="col-span-1 bg-gray-200"
                  readOnly
                  defaultValue="SUPORTE"
                />

                <Label className="col-span-1 justify-end">Nº Cotação</Label>
                <Txt className="col-span-1 bg-gray-200" readOnly />

                <Label className="col-span-1 justify-end">Nº Fatura</Label>
                <Txt className="col-span-1 bg-gray-200" readOnly />
              </div>
            </div>


            {/* Faixa de Averbação */}
            <div className="border border-gray-300 text-green-700 bg-white text-center py-1 px-3 mt-2 text-[12px] font-semibold rounded">
              Averbado em <span className="text-green-700 font-semibold">15/10/2025</span> com o Nº Averbação:{" "}
              <span className="text-green-700 font-semibold">06513102504086140001415700100005880134</span> e Protocolo:{" "}
              <span className="text-green-700 font-semibold">TESTE</span>
            </div>
            {/* Rodapé */}
            <div className="border-t border-gray-300 bg-white py-1 px-3 flex items-center justify-between">
              <div className="flex items-center gap-4">

                {/* FECHAR */}
                <button
                  onClick={() => navigate(-1)}
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <XCircle size={18} />
                  <span>Fechar</span>
                </button>

                {/* LIMPAR */}
                <div
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <RotateCcw size={18} />
                  <span>Limpar</span>
                </div>

                {/* INCLUIR */}
                <div
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <PlusCircle size={18} />
                  <span>Incluir</span>
                </div>

                {/* ALTERAR */}
                <div
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <Edit size={18} />
                  <span>Alterar</span>
                </div>

                {/* EXCLUIR */}
                <div
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <Trash2 size={18} />
                  <span>Excluir</span>
                </div>

                {/* NOTA FISCAL */}
                <button
                  onClick={() => setShowNotaFiscalCte(true)}
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <FileText size={18} />
                  <span>Nota Fiscal</span>
                </button>

                {/* VALORES */}
                <button
                  onClick={() => setShowValoresCte(true)}
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <DollarSign size={18} />
                  <span>Valores</span>
                </button>

                {/* COMEX */}
                <button
                  onClick={() => setShowComex(true)}
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <Globe2 size={18} />
                  <span>Comex</span>
                </button>

                {/* GNRE */}
                <div
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <FileSpreadsheet size={18} />
                  <span>GNRE</span>
                </div>

                {/* IMPRIMIR */}
                <div
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <Printer size={18} />
                  <span>Imprimir</span>
                </div>

                {/* DUPLICAR */}
                <div
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <Copy size={18} />
                  <span>Duplicar</span>
                </div>

                {/* SEFAZ */}
                <button
                  onClick={() => setShowConsultaSefaz(true)}
                  className={`flex flex-col items-center text-[11px] cursor-pointer ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                  <Search size={18} />
                  <span>Sefaz</span>
                </button>

              </div>
            </div>

          </>
        ) : (
          <div className="flex-1 flex flex-col gap-2 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto">


            {/* ABA CONSULTA */}

            {/* CARD 1 — Parâmetros de Pesquisa */}
            <fieldset className="border border-gray-300 rounded p-3 bg-white space-y-2">
              <legend className="px-2 text-red-700 font-semibold text-[13px]">
                Parâmetros de Pesquisa
              </legend>

              {/* LINHA 1 — Empresa / Filial */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Empresa</Label>
                <Sel className="col-span-5 w-full">
                  <option>001 - MANTRAN TRANSPORTES LTDA</option>
                </Sel>

                <Label className="col-span-1 justify-end">Filial</Label>
                <Sel className="col-span-5 w-full">
                  <option>001 - TESTE MANTRAN</option>
                </Sel>
              </div>

              {/* LINHA 2 — Remetente / Motorista */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Remetente</Label>
                <Txt className="col-span-2" defaultValue="50221019000136" />

                <Txt
                  className="col-span-3 bg-gray-200"
                  readOnly
                  defaultValue="HNK BR INDUSTRIA DE BEBIDAS LTDA"
                />

                <Label className="col-span-1 justify-end">Motorista</Label>
                <Txt className="col-span-2" defaultValue="01620846760" />

                <Txt
                  className="col-span-3 bg-gray-200"
                  readOnly
                  defaultValue="ALAN DA COSTA"
                />
              </div>

              {/* LINHA 3 — Destinatário / Veículo */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Destinatário</Label>
                <Txt className="col-span-2" defaultValue="19900000000626" />

                <Txt
                  className="col-span-3 bg-gray-200"
                  readOnly
                  defaultValue="CERVEJARIAS KAISER BRASIL S.A"
                />

                <Label className="col-span-1 justify-end">Veículo</Label>
                <Txt className="col-span-2" defaultValue="0000005" />

                <Txt
                  className="col-span-3 bg-gray-200"
                  readOnly
                  defaultValue="ABH3B06 - SCANIA - CAVALO TRUCADO - LINS"
                />
              </div>

              {/* LINHA 3 — Período / Tipo Data / Controle / Impresso */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Período</Label>

                {/* Data Inicial */}
                <Txt
                  type="date"
                  className="col-span-2"
                  defaultValue="2025-10-14"
                />

                {/* Data Final (MENOR) */}
                <Txt
                  type="date"
                  className="col-span-1"
                  defaultValue="2025-10-20"
                />

                <Label className="col-span-1 justify-end">Data de</Label>

                {/* Tipo Data */}
                <Sel className="col-span-1 w-full">
                  <option>Cadastro</option>
                  <option>Emissão</option>
                  <option>Atualização</option>
                </Sel>

                <Label className="col-span-1 justify-end">Nº Controle</Label>
                <Txt className="col-span-1" />

                <Label className="col-span-1 justify-end">Nº Impresso</Label>
                <Txt className="col-span-1" defaultValue="54623" />
                <Label className="col-span-1 justify-end">Nº Viagem</Label>
                <Txt className="col-span-1" />
              </div>



              {/* LINHA 6 — Averbação / Status / Tracking / Viagem / Ações */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 justify-end">Tracking</Label>
                <Txt className="col-span-2" />
                <Label className="col-span-2 justify-end">Averbação</Label>
                <Sel className="col-span-1 w-full">
                  <option>TODOS</option>
                  <option>Sim</option>
                  <option>Não</option>
                </Sel>
                <Label className="col-span-1 justify-end">Operador</Label>
                <Sel className="col-span-2 w-full">
                  <option>TODOS</option>
                </Sel>


                <Label className="col-span-2 justify-end">Status</Label>
                <Sel className="col-span-1 w-full">
                  <option>T - Todos</option>
                  <option>I - Impresso</option>
                  <option>A - Autorizado</option>
                  <option>C - Cancelado</option>
                  <option>E - Rejeitado</option>
                </Sel>




              </div>

              {/* LINHA 7 — Botões */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-12 flex justify-end gap-2">
                  <button className="border border-gray-300 text-[12px] px-4 py-[2px] rounded bg-gray-50 hover:bg-gray-100">
                    Limpar
                  </button>
                  <button
                    onClick={handlePesquisar}
                    className="border border-gray-300 text-[12px] px-4 py-[2px] rounded bg-blue-50 hover:bg-blue-100 text-blue-700"
                  >
                    Pesquisar
                  </button>

                </div>
              </div>
            </fieldset>


            {/* CARD 2 — Grid de Conhecimentos */}
            <div className="border border-gray-300 rounded p-2 bg-white">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">
                Relação de Conhecimentos Emitidos
              </h2>

              <div className="border border-gray-300 rounded overflow-auto">
                <table className="min-w-full text-[12px] border-collapse">
                  <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
                    <tr>
                      {showCheckboxes && <th className="px-2 py-1 border-r w-[30px] text-center">✓</th>}
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
                      <th className="px-2 py-1">Cidade Entrega</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={14} className="text-center py-4 text-gray-400">
                          Nenhum registro encontrado
                        </td>
                      </tr>
                    ) : (
                      dadosFiltrados.map((r, i) => (
                        <tr
                          key={i}
                          className="hover:bg-gray-50 cursor-pointer"
                          onDoubleClick={() => abrirCte(r)}
                        >
                          {showCheckboxes && (
                            <td className="border-t border-gray-200 px-2 text-center">
                              <input
                                type="checkbox"
                                checked={selecionados.includes(i)}
                                onChange={() => toggleSelecionado(i)}
                              />
                            </td>
                          )}
                          {r.map((c, j) => (
                            <td key={j} className="border-t border-gray-200 px-2 py-[3px]">
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>

                </table>
              </div>
            </div>

            {/* CARD 3 — Rodapé / Ações */}
            <div className="border border-gray-300 rounded p-2 bg-white flex items-center justify-between text-[12px]">
              <span className="text-gray-600">Total de registros: {dadosFiltrados.length}</span>

              {!showCheckboxes ? (
                // Botão principal (⚙️ Ações)
                <button
                  onClick={() => setShowCheckboxes(true)}
                  className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-[2px] rounded"
                >
                  ⚙️ Ações
                </button>
              ) : (
                // Quando clica em Ações → mostra todos os botões abaixo
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <button
                    onClick={toggleSelecionarTodos}
                    className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-[2px] rounded"
                  >
                    {selecionados.length === dadosFiltrados.length
                      ? "☐ Limpar Seleção"
                      : "☑ Selecionar Todos"}

                  </button>

                  <button className="border border-gray-300 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-3 py-[2px] rounded">
                    ✏️ Alterar Status
                  </button>

                  <button
                    onClick={() => {
                      setShowCheckboxes(false);
                      setSelecionados([]);
                    }}
                    className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-[2px] rounded"
                  >
                    🔙 Cancelar
                  </button>

                  <button className="border border-gray-300 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-[2px] rounded">
                    🔄 Manifestar
                  </button>

                  <button className="border border-gray-300 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-[2px] rounded">
                    📨 Env. Sefaz
                  </button>

                  <button className="border border-gray-300 bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-[2px] rounded">
                    🔐 Averbar
                  </button>

                  <button
                    onClick={handleExcluir}
                    className="border border-gray-300 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-[2px] rounded"
                  >
                    ❌ Excluir
                  </button>
                </div>
              )}
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

      {showComplementar && (
        <CteComplementar onClose={() => setShowComplementar(false)} />
      )}

      {showSubstituicao && (
        <CteSubstituicao onClose={() => setShowSubstituicao(false)} />
      )}



      {showDocs && (
        <CteSubcontratado
          tpServico={tpServico} // passa o tipo de serviço
          onClose={() => setShowDocs(false)}
        />
      )}



    </div>
  );
}
