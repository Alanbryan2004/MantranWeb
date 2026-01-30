// Minuta.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustosAdicionaisModal from "./CustosAdicionaisModal";
import NotaFiscalMinuta from "./NotaFiscalMinuta";
import Comex from "./Comex";
import NotasFiscalModal from "./NotasFiscalModal";
import { useIconColor } from "../context/IconColorContext";

import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  Printer,
  FileText,
  Globe2,
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

function IconeLapis({ title, onClick }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded w-[24px] h-[22px] flex items-center justify-center"
    >
      <i className="fa-solid fa-pen text-red-600 text-[11px]" />
    </button>
  );
}

const getHojeISO = () => new Date().toISOString().slice(0, 10);

/* ========================= Mocks ========================= */
const minutasMock = [
  {
    id: 1,
    status: "SEM CTRC",
    filial: "001",
    numeroMinuta: "36092",

    // ✅ CLIENTE (mock)
    clienteCnpj: "35912495000100",
    clienteRazao: "RODONAVES TRANSPORTES MULTIMODAL LTDA",
    clienteCidade: "SAO PAULO",
    clienteUf: "SP",

    // ✅ REMETENTE / DESTINATÁRIO (mock)
    remetenteCnpj: "50221019000136",
    remetente: "HNK-ITU (1) MATRIZ",
    destinatarioCnpj: "00000000000000",
    destinatario: "HNK-SALVADOR-AGUA MI",

    enderecoEntrega: "AV JEQUITAIÁ",
    bairro: "AGUA DE MENINOS",
    cidadeEntrega: "SALVADOR",
    uf: "BA",

    // ✅ MOTORISTA (mock)
    motorista: "ALAN DA COSTA",
    motoristaCnh: "01628446760",
    motoristaCpf: "13092060822",
    motoristaCelular: "71999999999",

    // ✅ TRAÇÃO / REBOQUE (mock)
    tracaoCodigo: "01",
    tracaoPlacaDesc: "RXW4156",
    reboqueCodigo: "01",
    reboquePlacaDesc: "ABC1D23",

    // antigos
    placa: "RXW4156",
    ddd: "71",
    fone: "000000000",
    contato: "",
  },
  {
    id: 2,
    status: "SEM CTRC",
    filial: "001",
    numeroMinuta: "360_sr4",

    // ✅ CLIENTE (mock)
    clienteCnpj: "00000000000000",
    clienteRazao: "CLIENTE TESTE",
    clienteCidade: "SAO PAULO",
    clienteUf: "SP",

    // ✅ REMETENTE / DESTINATÁRIO (mock)
    remetenteCnpj: "00000000000000",
    remetente: "TESTE",
    destinatarioCnpj: "00000000000000",
    destinatario: "ABC & VISUAL CONFECCOES",

    enderecoEntrega: "R ITINGUCU",
    bairro: "NA",
    cidadeEntrega: "SAO PAULO",
    uf: "SP",

    // ✅ MOTORISTA (mock)
    motorista: "JOSE MOTORISTA",
    motoristaCnh: "00000000000",
    motoristaCpf: "00000000000",
    motoristaCelular: "",

    // ✅ TRAÇÃO / REBOQUE (mock)
    tracaoCodigo: "02",
    tracaoPlacaDesc: "AAA0A00",
    reboqueCodigo: "",
    reboquePlacaDesc: "",

    // antigos
    placa: "AAA0A00",
    ddd: "11",
    fone: "999999999",
    contato: "",
  },
];

/* ========================= Componente Principal ========================= */
export default function Minuta({ open }) {
  const navigate = useNavigate();
  const { footerIconColorNormal, footerIconColorHover } = useIconColor();

  const [activeTab, setActiveTab] = useState("cadastro");

  const [showNotasRemetente, setShowNotasRemetente] = useState(false);

  // truque pra resetar campos não-controlados
  const [formKey, setFormKey] = useState(0);

  // ✅ campos controlados (pra trazer da aba Consulta e imprimir completo)
  const [dadosMinuta, setDadosMinuta] = useState({
    numero: "",
    motoristaCnh: "",
    motoristaNome: "",

    // ✅ novos (motorista)
    motoristaCpf: "",
    motoristaCelular: "",

    // ✅ novos (cliente)
    clienteCnpj: "",
    clienteRazao: "",
    clienteCidade: "",
    clienteUf: "",

    // já existiam
    remetenteCnpj: "",
    remetenteRazao: "",
    destinatarioCnpj: "",
    destinatarioRazao: "",
    cidadeDestino: "",
    ufDestino: "",

    // ✅ novos (Tração / Reboque)
    tracaoCodigo: "",
    tracaoPlacaDesc: "",
    reboqueCodigo: "",
    reboquePlacaDesc: "",
  });

  // filtros / lista da aba Consulta
  const [filtros, setFiltros] = useState({
    filial: "001 - TESTE MANTRAN",
    status: "SEM CTRC",
    periodoDe: "2025-05-01",
    periodoAte: getHojeISO(),
    solicitacao: "",
    motoristaCnh: "",
    motoristaNome: "",
    remetenteCnpj: "",
    remetenteRazao: "",
    numeroMinuta: "",
    dataTipo: "Solicitação",
    destinatarioCnpj: "",
    destinatarioRazao: "",
    baixada: "TODAS",
    faturada: "TODAS",
    semViagem: false,
  });

  const [listaConsulta, setListaConsulta] = useState([]);
  const [openValores, setOpenValores] = useState(false);

  // modais
  const [showCustos, setShowCustos] = useState(false);
  const [showNotas, setShowNotas] = useState(false);
  const [showComex, setShowComex] = useState(false);
  const [showImprimirMenu, setShowImprimirMenu] = useState(false);
  // ========================= Impressão (payload) =========================
  function buildPrintPayload() {
    // Monte aqui no formato que o RelMinuta.jsx espera
    return {
      empresa: {
        nomeTopo: "W L S BARROS - RECIFE",
        enderecoTopo: "R ITAMARACA, 335 - IMBIRIBEIRA - RECIFE - PE",
        foneTopo: "()",
      },

      minuta: {
        // Se depois você controlar o campo Data, substitui por ele
        dataCadastro: new Date().toLocaleDateString("pt-BR"),
        numero: dadosMinuta.numero || "",
      },

      // ✅ Cliente agora vem do state (preenche na tela e no relatório)
      cliente: {
        cnpj: dadosMinuta.clienteCnpj || "35912495000100",
        razao: dadosMinuta.clienteRazao || "RODONAVES TRANSPORTES MULTIMODAL LTDA",
        endereco: "AV ALEXANDRE COLARES",
        numero: "500",
        bairro: "VILA JAGUARA",
        cidade: dadosMinuta.clienteCidade || "SAO PAULO",
        uf: dadosMinuta.clienteUf || "SP",
      },

      remetente: {
        cnpj: dadosMinuta.remetenteCnpj || "",
        razao: dadosMinuta.remetenteRazao || "",
        endereco: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
      },

      destinatario: {
        cnpj: dadosMinuta.destinatarioCnpj || "",
        razao: dadosMinuta.destinatarioRazao || "",
        endereco: "",
        numero: "",
        bairro: "",
        cidade: dadosMinuta.cidadeDestino || "",
        uf: dadosMinuta.ufDestino || "",
      },

      // Recebedor / Redespacho ainda não está controlado (por enquanto vai vazio)
      redespacho: {
        nome: "",
        endereco: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
      },

      motorista: {
        nome: dadosMinuta.motoristaNome || "",
        cpf: dadosMinuta.motoristaCpf || "",
        celular: dadosMinuta.motoristaCelular || "",
      },

      // ✅ Tração e Reboque agora vão no payload
      veiculo: {
        placa: dadosMinuta.tracaoPlacaDesc || "",
        reboque: dadosMinuta.reboquePlacaDesc || "",
        isento: "ISENTO",
      },

      // Nota ainda não está no state
      nota: {
        nf: "",
        emissao: "",
        qtdeVol: 0,
        peso: 0,
        cubagem: 0,
        valorNF: 0,
      },

      // Valores do frete hoje estão em inputs com defaultValue (não-controlados)
      // então por enquanto vai zerado. Depois a gente controla e manda certinho.
      valores: {
        cat: 0,
        despacho: 0,
        pedagio: 0,
        fretePeso: 400, // ✅ aqui você coloca o valor
        freteValor: 0,
        coletaEntrega: 0,
        outros: 0,
        freteTotal: 400,
      },

      // Observação da tela também não está controlada hoje, então vai vazio.
      observacao: "",

      aviso:
        "Após a conferência física e protocolo de recebimento, a transportadora não se responsabiliza por quaisquer danos, falta e/ou, avarias que porventura vierem a ocorrer nas mercadorias entregues.\nPara sua segurança acompanhe o recebimento e conferência.",
    };
  }

  /* ========================= Handlers ========================= */

  const handleDadosChange = (field) => (e) => {
    setDadosMinuta((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFiltroChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFiltros((prev) => ({ ...prev, [field]: value }));
  };

  const handleLimpar = () => {
    setDadosMinuta({
      numero: "",
      motoristaCnh: "",
      motoristaNome: "",
      motoristaCpf: "",
      motoristaCelular: "",

      clienteCnpj: "",
      clienteRazao: "",
      clienteCidade: "",
      clienteUf: "",

      remetenteCnpj: "",
      remetenteRazao: "",
      destinatarioCnpj: "",
      destinatarioRazao: "",
      cidadeDestino: "",
      ufDestino: "",

      tracaoCodigo: "",
      tracaoPlacaDesc: "",
      reboqueCodigo: "",
      reboquePlacaDesc: "",
    });
    setFormKey((k) => k + 1);
  };

  const handleIncluir = () => {
    alert("Minuta incluída (mock).");
  };

  const handleAlterar = () => {
    alert("Minuta alterada (mock).");
  };

  const handleExcluir = () => {
    if (window.confirm("Confirma exclusão da minuta? (mock)")) {
      alert("Minuta excluída (mock).");
    }
  };

  const handlePesquisarConsulta = () => {
    // filtro bem simples só por status (mock)
    const lista = minutasMock.filter((m) => {
      if (filtros.status && filtros.status !== "TODOS") {
        return m.status === filtros.status;
      }
      return true;
    });
    setListaConsulta(lista);
  };

  const handleSelecionarMinuta = (m) => {
    setDadosMinuta({
      numero: m.numeroMinuta,

      motoristaCnh: m.motoristaCnh || "01628446760",
      motoristaNome: m.motorista || "",
      motoristaCpf: m.motoristaCpf || "",
      motoristaCelular: m.motoristaCelular || "",

      clienteCnpj: m.clienteCnpj || "",
      clienteRazao: m.clienteRazao || "",
      clienteCidade: m.clienteCidade || "",
      clienteUf: m.clienteUf || "",

      remetenteCnpj: m.remetenteCnpj || "50221019000136",
      remetenteRazao: m.remetente || "",
      destinatarioCnpj: m.destinatarioCnpj || "00000000000000",
      destinatarioRazao: m.destinatario || "",
      cidadeDestino: m.cidadeEntrega || "",
      ufDestino: m.uf || "",

      tracaoCodigo: m.tracaoCodigo || "",
      tracaoPlacaDesc: m.tracaoPlacaDesc || (m.placa ? `${m.placa}` : ""),
      reboqueCodigo: m.reboqueCodigo || "",
      reboquePlacaDesc: m.reboquePlacaDesc || "",
    });

    setActiveTab("cadastro");
  };
  /* ========================= Render ========================= */
  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${open ? "ml-[192px]" : "ml-[56px]"
        }`}
    >
      {/* Título */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        MINUTA DE TRANSPORTE
      </h1>

      {/* Abas */}
      <div className="flex border-b border-gray-300 bg-white">
        {[
          { id: "cadastro", label: "Minutas" },
          { id: "consulta", label: "Consulta" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${activeTab === tab.id
              ? "bg-white text-red-700 border-gray-300"
              : "bg-gray-100 text-gray-600 border-transparent"
              } ${tab.id !== "cadastro" ? "ml-1" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto flex flex-col gap-2">
        {/* ======================= ABA CADASTRO ======================= */}
        {activeTab === "cadastro" && (
          <div key={formKey} className="space-y-2">
            {/* CARD 1 - Dados Gerais */}
            <div className="border border-gray-300 rounded p-3 bg-white space-y-2">
              {/* Linha 1 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Nº Minuta</Label>
                <Txt
                  className="col-span-1 bg-gray-200"
                  value={dadosMinuta.numero}
                  readOnly
                  onChange={handleDadosChange("numero")}
                />

                <Txt
                  className="col-span-2 bg-gray-200 text-center"
                  readOnly
                  value="SEM CTRC"
                />
                <Label className="col-span-1 text-right">Nº Viagem</Label>
                <Txt className="col-span-1 bg-gray-200" readOnly />
                <Label className="col-span-1 text-right">Nº Fatura</Label>
                <Txt className="col-span-1 bg-gray-200" readOnly />
                <Label className="col-span-2 text-right">Operador</Label>
                <Txt className="col-span-2 bg-gray-200" readOnly defaultValue="SUPORTE" />
              </div>

              {/* Linha 2 - Empresa / Filial / Divisão */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Empresa</Label>
                <Sel
                  className="col-span-3 w-full"
                  defaultValue="001 - MANTRAN TRANSPORTES LTDA"
                >
                  <option>001 - MANTRAN TRANSPORTES LTDA</option>
                </Sel>

                <Label className="col-span-1 text-right">Filial</Label>
                <Sel className="col-span-3 w-full" defaultValue="001 - TESTE MANTRAN">
                  <option>001 - TESTE MANTRAN</option>
                </Sel>

                <Label className="col-span-2 text-right">Divisão</Label>
                <Sel className="col-span-2 w-full" defaultValue="0001 - GERAL">
                  <option>0001 - GERAL</option>
                </Sel>
              </div>

              {/* Linha 3 - Viagem / Coleta / Solicitação / Data / Hora / Veículo */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Data</Label>
                <Txt type="date" className="col-span-2" defaultValue={getHojeISO()} />

                <Txt
                  maxLength={5}
                  placeholder="00:00"
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.length >= 3) v = v.replace(/(\d{2})(\d)/, "$1:$2");
                    e.target.value = v;
                  }}
                  className="col-span-1"
                />

                <Label className="col-span-1 text-right">Nº Coleta</Label>
                <Txt className="col-span-1" />

                <Label className="col-span-1 text-right">Nº Solicitação</Label>
                <Txt className="col-span-1" />

                <Label className="col-span-2 text-right">Veículo</Label>
                <Sel className="col-span-2 w-full">
                  <option>VAN</option>
                  <option>3/4</option>
                  <option>TOCO</option>
                  <option>TRUCK</option>
                  <option>CAVALO MECANICO</option>
                </Sel>
              </div>

              {/* Linha 4 - Motorista / Cotação / Fatura / NF Serviço */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Motorista</Label>
                <Txt
                  className="col-span-1"
                  placeholder="CNH"
                  value={dadosMinuta.motoristaCnh}
                  onChange={handleDadosChange("motoristaCnh")}
                />
                <Txt
                  className="col-span-3"
                  placeholder="Nome do Motorista"
                  value={dadosMinuta.motoristaNome}
                  onChange={handleDadosChange("motoristaNome")}
                />
                <IconeLapis
                  title="Abrir cadastro Motorista"
                  onClick={() => navigate("/motorista")}
                />

                <Label className="col-span-1 text-right">Cotação</Label>
                <Txt className="col-span-1" />

                <Label className="col-span-2 text-right">NF Serviço</Label>
                <Txt className="col-span-2" />
              </div>

              {/* Linha 5 - Tração / Reboque (CONTROLADOS) */}
              <div className="grid grid-cols-12 gap-2 items-center">
                {/* === Tração === */}
                <Label className="col-span-1 text-right">Tração</Label>
                <Txt
                  className="col-span-1"
                  placeholder="Código"
                  value={dadosMinuta.tracaoCodigo}
                  onChange={handleDadosChange("tracaoCodigo")}
                />
                <Txt
                  className="col-span-3"
                  placeholder="Placa / Descrição"
                  value={dadosMinuta.tracaoPlacaDesc}
                  onChange={handleDadosChange("tracaoPlacaDesc")}
                />

                {/* Bloco Lápis + A (Agora col-span-1) */}
                <div className="col-span-1 flex items-center gap-1">
                  <IconeLapis
                    title="Abrir cadastro Veículo"
                    onClick={() => navigate("/veiculo")}
                  />
                  <Txt
                    className="w-[100px] text-center px-1"
                    placeholder="AGREGADO"
                    maxLength={1}
                  />
                </div>

                {/* === Reboque === */}
                <Label className="col-span-1 text-right">Reboque</Label>
                <Txt
                  className="col-span-1"
                  placeholder="Código"
                  value={dadosMinuta.reboqueCodigo}
                  onChange={handleDadosChange("reboqueCodigo")}
                />

                {/* Ícone + Placa/Descrição juntos */}
                <div className="col-span-4 flex items-center gap-1">
                  <IconeLapis
                    title="Abrir cadastro Veículo"
                    onClick={() => navigate("/veiculo")}
                  />

                  <Txt
                    className="flex-1"
                    placeholder="Placa / Descrição"
                    value={dadosMinuta.reboquePlacaDesc}
                    onChange={handleDadosChange("reboquePlacaDesc")}
                  />
                </div>
              </div>

              {/* Linha 6 - Reboque (mantida como estava) */}
              <div className="grid grid-cols-12 gap-2 items-center"></div>

              {/* Participantes (Cliente / Remetente / Destinatário / Expedidor / Recebedor) */}
              <div className="border border-gray-300 rounded p-2 bg-white space-y-1 mt-2">
                {/* Cabeçalho */}
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 mb-1">
                  <div className="col-span-1" />
                  <div className="col-span-2">CGC / CPF</div>
                  <div className="col-span-4">Razão Social</div>
                  <div className="col-span-3">Cidade</div>
                  <div className="col-span-1">UF</div>
                  <div className="col-span-1" />
                </div>

                {/* Cliente (CONTROLADO) */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1 text-right">Cliente</Label>
                  <Txt
                    className="col-span-2"
                    value={dadosMinuta.clienteCnpj}
                    onChange={handleDadosChange("clienteCnpj")}
                  />
                  <Txt className="col-span-4 bg-gray-200" readOnly value={dadosMinuta.clienteRazao} />
                  <Txt className="col-span-3 bg-gray-200" readOnly value={dadosMinuta.clienteCidade} />
                  <Txt className="col-span-1 bg-gray-200 text-center" readOnly value={dadosMinuta.clienteUf} />
                  <div className="col-span-1 flex justify-center">
                    <IconeLapis title="Abrir cadastro Cliente" onClick={() => { }} />
                  </div>
                </div>

                {/* Remetente */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1 text-right">Remetente</Label>

                  {/* CNPJ + Botão de Notas Fiscais */}
                  <div className="col-span-2 flex items-center gap-1">
                    <Txt
                      className="w-full"
                      value={dadosMinuta.remetenteCnpj}
                      onChange={handleDadosChange("remetenteCnpj")}
                    />

                    {/* Botão igual ao CTe */}
                    <button
                      onClick={() => setShowNotasRemetente(true)}
                      title="Notas Fiscais do Remetente"
                      className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded w-[24px] h-[22px] flex items-center justify-center"
                    >
                      <FileText size={13} color="red" />
                    </button>
                  </div>

                  {/* Razão Social */}
                  <Txt
                    className="col-span-4 bg-gray-200"
                    readOnly
                    value={dadosMinuta.remetenteRazao}
                  />

                  {/* Cidade */}
                  <Txt className="col-span-3 bg-gray-200" readOnly />

                  {/* UF */}
                  <Txt className="col-span-1 bg-gray-200 text-center" readOnly />

                  {/* Ícone lápis (já existia) */}
                  <div className="col-span-1 flex justify-center">
                    <IconeLapis title="Abrir cadastro Remetente" onClick={() => { }} />
                  </div>
                </div>

                {/* Destinatário */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1 text-right">Destinatário</Label>
                  <Txt
                    className="col-span-2"
                    value={dadosMinuta.destinatarioCnpj}
                    onChange={handleDadosChange("destinatarioCnpj")}
                  />
                  <Txt
                    className="col-span-4 bg-gray-200"
                    readOnly
                    value={dadosMinuta.destinatarioRazao}
                  />
                  <Txt
                    className="col-span-3 bg-gray-200"
                    readOnly
                    value={dadosMinuta.cidadeDestino}
                  />
                  <Txt
                    className="col-span-1 bg-gray-200 text-center"
                    readOnly
                    value={dadosMinuta.ufDestino}
                  />
                  <div className="col-span-1 flex justify-center">
                    <IconeLapis title="Abrir cadastro Destinatário" onClick={() => { }} />
                  </div>
                </div>

                {/* Expedidor */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1 text-right">Expedidor</Label>
                  <Txt className="col-span-2" />
                  <Txt className="col-span-4 bg-gray-200" readOnly />
                  <Txt className="col-span-3 bg-gray-200" readOnly />
                  <Txt className="col-span-1 bg-gray-200 text-center" readOnly />
                  <div className="col-span-1 flex justify-center">
                    <IconeLapis title="Abrir cadastro Expedidor" onClick={() => { }} />
                  </div>
                </div>

                {/* Recebedor */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Label className="col-span-1 text-right">Recebedor</Label>
                  <Txt className="col-span-2" />
                  <Txt className="col-span-4 bg-gray-200" readOnly />
                  <Txt className="col-span-3 bg-gray-200" readOnly />
                  <Txt className="col-span-1 bg-gray-200 text-center" readOnly />
                  <div className="col-span-1 flex justify-center">
                    <IconeLapis title="Abrir cadastro Recebedor" onClick={() => { }} />
                  </div>
                </div>
              </div>

              {/* Linha 13 - Cidade Origem / Destino */}
              <div className="grid grid-cols-12 gap-2 items-center mt-2">
                <Label className="col-span-1 text-right">Cidade Origem</Label>
                <Txt className="col-span-1" placeholder="CEP" />
                <Txt className="col-span-3 bg-gray-200" readOnly />
                <Txt className="col-span-1 bg-gray-200" readOnly />

                <Label className="col-span-2 text-right">Cidade Destino</Label>
                <Txt className="col-span-1" placeholder="CEP" />
                <Txt className="col-span-2 bg-gray-200" readOnly value={dadosMinuta.cidadeDestino} />
                <Txt className="col-span-1 bg-gray-200 text-center" readOnly value={dadosMinuta.ufDestino} />
              </div>

              {/* Linha 14 - Rota / Peso / Volume / Seguro */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Tab. Frete</Label>
                <Sel className="col-span-3 w-full">
                  <option>000083 - TESTE HNK</option>
                </Sel>
                <div className="col-span-2">
                  <button
                    type="button"
                    onClick={() => setShowCustos(true)}
                    className="w-full border border-gray-300 rounded px-2 py-[3px] text-[12px] bg-gray-50 hover:bg-gray-100"
                  >
                    Custos Adicionais
                  </button>
                </div>
                <Label className="col-span-1 text-right">Peso</Label>
                <Txt className="col-span-1" />

                <Label className="col-span-1 text-right">Volume</Label>
                <Txt className="col-span-1" />
                <Label className="col-span-1 text-right">VR Mercadoria</Label>
                <Txt className="col-span-1 bg-gray-200 text-right" readOnly />
              </div>

              {/* Linha 15 - Observação / Seguro / TP Frete */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Observação</Label>
                <Txt className="col-span-6" />
                <Label className="col-span-1 text-right">Seguro</Label>
                <Sel className="col-span-2 w-full">
                  <option>0 - Por conta do Remetente</option>
                  <option>1 - Por conta do Destinatário</option>
                </Sel>

                <Label className="col-span-1 text-right">TP Frete</Label>
                <Sel className="col-span-1 w-full" defaultValue="F">
                  <option value="F">F - Faturado</option>
                  <option value="A">A - A Pagar</option>
                  <option value="P">P - Pago</option>
                  <option value="C">C - Cortesia</option>
                </Sel>
              </div>
            </div>

            <fieldset className="border border-gray-300 rounded p-3 bg-white space-y-2">
              <legend
                className="text-red-700 font-semibold text-[13px] px-2 flex items-center justify-between cursor-pointer"
                onClick={() => setOpenValores(!openValores)}
              >
                Valores do Frete
                <span className="text-gray-600 text-[11px] ml-3">
                  {openValores ? "▲" : "▼"}
                </span>
              </legend>

              {/* SEMPRE EXIBIR — Linha 1 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Frete Peso</Label>
                <Txt className="col-span-1 text-right" defaultValue="0,00" />

                <Label className="col-span-1 text-right">Frete Valor</Label>
                <Txt className="col-span-1 text-right" defaultValue="0,00" />

                <Label className="col-span-1 text-right">Despacho</Label>
                <Txt className="col-span-1 text-right" defaultValue="0,00" />

                <Label className="col-span-1 text-right">CAT</Label>
                <Txt className="col-span-1 text-right" defaultValue="0,00" />

                <Label className="col-span-1 text-right">Pedágio</Label>
                <Txt className="col-span-1 text-right" defaultValue="0,00" />

                <Label className="col-span-1 text-right">GRIS</Label>
                <Txt className="col-span-1 text-right" defaultValue="0,00" />

                <div className="col-span-2" />
              </div>

              {/* CONTEÚDO EXPANDIDO */}
              {openValores && (
                <>
                  {/* Linha 2 */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <Label className="col-span-1 text-right">Valor Outros</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">VR Pernoite</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">Taxa Coleta</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">Adval</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">Ajudante</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">DTA</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <div className="col-span-3" />
                  </div>

                  {/* Linha 3 */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <Label className="col-span-1 text-right">Taxa Entrega</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">Escolta</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">Estadia</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">Estaciona.</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-3 text-right">CFOP</Label>
                    <Txt className="col-span-1" />

                    <div className="col-span-3" />
                  </div>

                  {/* Linha 4 */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <Label className="col-span-3 text-right">Base ICMS</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">AL ICMS</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">VR ICMS</Label>
                    <Txt className="col-span-1 text-right" defaultValue="0,00" />

                    <Label className="col-span-1 text-right">Tarifa</Label>
                    <Txt className="col-span-1 bg-gray-200 text-right" readOnly />

                    <Label className="col-span-1 text-right">Total</Label>
                    <Txt
                      className="col-span-1 text-right bg-gray-200"
                      readOnly
                      defaultValue="0,00"
                    />
                  </div>
                </>
              )}

              {/* Linha 6 (mantida como estava) */}
              <div className="grid grid-cols-12 gap-2 items-center"></div>
            </fieldset>

            {/* CARD 3 - Não Averbado + Cadastro/Subtotal */}
            <div className="text-center text-red-700 font-semibold text-[13px]">
              Não Averbado
            </div>
          </div>
        )}
        {/* ======================= ABA CONSULTA ======================= */}
        {activeTab === "consulta" && (
          <>
            {/* CARD 1 - Filtros */}
            <div className="border border-gray-300 rounded p-3 bg-white space-y-2">
              {/* Linha 1 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Filial</Label>
                <Sel
                  className="col-span-4 w-full"
                  value={filtros.filial}
                  onChange={handleFiltroChange("filial")}
                >
                  <option>001 - TESTE MANTRAN</option>
                </Sel>

                <Label className="col-span-1 text-right">Status</Label>
                <Sel
                  className="col-span-1 w-full"
                  value={filtros.status}
                  onChange={handleFiltroChange("status")}
                >
                  <option value="SEM CTRC">SEM CTRC</option>
                  <option value="COM CTRC">COM CTRC</option>
                  <option value="TODOS">TODOS</option>
                </Sel>

                <Label className="col-span-1 text-right">Nº Minuta</Label>
                <Txt
                  className="col-span-1"
                  value={filtros.numeroMinuta}
                  onChange={handleFiltroChange("numeroMinuta")}
                />

                <div className="col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handlePesquisarConsulta}
                    className="border border-gray-300 rounded px-4 py-[4px] text-[12px] bg-gray-50 hover:bg-gray-100"
                  >
                    Pesquisar
                  </button>
                </div>
              </div>

              {/* Linha 2 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Período</Label>
                <Txt
                  type="date"
                  className="col-span-2"
                  value={filtros.periodoDe}
                  onChange={handleFiltroChange("periodoDe")}
                />
                <Label className="col-span-1 text-center">até</Label>
                <Txt
                  type="date"
                  className="col-span-2"
                  value={filtros.periodoAte}
                  onChange={handleFiltroChange("periodoAte")}
                />

                <Label className="col-span-2 text-right">Motorista</Label>
                <Txt
                  className="col-span-1"
                  placeholder="CNH"
                  value={filtros.motoristaCnh}
                  onChange={handleFiltroChange("motoristaCnh")}
                />
                <Txt
                  className="col-span-3 bg-gray-200"
                  readOnly
                  placeholder="Nome do Motorista"
                  value={filtros.motoristaNome}
                  onChange={() => { }}
                />
              </div>

              {/* Linha 3 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Remetente</Label>
                <Txt
                  className="col-span-2"
                  value={filtros.remetenteCnpj}
                  onChange={handleFiltroChange("remetenteCnpj")}
                />
                <Txt
                  className="col-span-4 bg-gray-200"
                  readOnly
                  value={filtros.remetenteRazao}
                  onChange={() => { }}
                />

                <Label className="col-span-1 text-right">Nº Solicitação</Label>
                <Txt
                  className="col-span-1"
                  value={filtros.solicitacao}
                  onChange={handleFiltroChange("solicitacao")}
                />

                <Label className="col-span-1 text-right">Data de</Label>
                <Sel
                  className="col-span-1 w-full"
                  value={filtros.dataTipo}
                  onChange={handleFiltroChange("dataTipo")}
                >
                  <option>Solicitação</option>
                  <option>Cadastro</option>
                </Sel>
              </div>

              {/* Linha 4 */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <Label className="col-span-1 text-right">Destinatário</Label>
                <Txt
                  className="col-span-2"
                  value={filtros.destinatarioCnpj}
                  onChange={handleFiltroChange("destinatarioCnpj")}
                />
                <Txt
                  className="col-span-4 bg-gray-200"
                  readOnly
                  value={filtros.destinatarioRazao}
                  onChange={() => { }}
                />

                <Label className="col-span-1 text-right">Baixada</Label>
                <Sel
                  className="col-span-1 w-full"
                  value={filtros.baixada}
                  onChange={handleFiltroChange("baixada")}
                >
                  <option value="SIM">SIM</option>
                  <option value="NAO">NÃO</option>
                  <option value="TODAS">TODAS</option>
                </Sel>

                <Label className="col-span-1 text-right">Faturada</Label>
                <Sel
                  className="col-span-1 w-full"
                  value={filtros.faturada}
                  onChange={handleFiltroChange("faturada")}
                >
                  <option value="SIM">SIM</option>
                  <option value="NAO">NÃO</option>
                  <option value="TODAS">TODAS</option>
                </Sel>

                <div className="col-span-1 flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="accent-red-700"
                    checked={filtros.semViagem}
                    onChange={handleFiltroChange("semViagem")}
                  />
                  <span className="text-[12px]">Sem Viagem</span>
                </div>
              </div>
            </div>

            {/* CARD 2 - Grid de Minutas */}
            <div className="border border-gray-300 rounded bg-white p-2">
              <div className="overflow-x-auto">
                <table className="w-full text-[12px] border">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="border p-1 w-[30px]">Sel</th>
                      <th className="border p-1">Status</th>
                      <th className="border p-1">Filial</th>
                      <th className="border p-1">Nº Minuta</th>
                      <th className="border p-1">Remetente</th>
                      <th className="border p-1">Destinatário</th>
                      <th className="border p-1">Endereço Entrega</th>
                      <th className="border p-1">Bairro</th>
                      <th className="border p-1">Cidade Entrega</th>
                      <th className="border p-1">UF</th>
                      <th className="border p-1">Motorista</th>
                      <th className="border p-1">Placa</th>
                      <th className="border p-1">DDD</th>
                      <th className="border p-1">Fone</th>
                      <th className="border p-1">Contato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaConsulta.map((m) => (
                      <tr
                        key={m.id}
                        className="hover:bg-orange-100 cursor-pointer"
                        onClick={() => handleSelecionarMinuta(m)}
                      >
                        <td className="border p-1 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="border p-1 text-center">{m.status}</td>
                        <td className="border p-1 text-center">{m.filial}</td>
                        <td className="border p-1 text-center">{m.numeroMinuta}</td>
                        <td className="border p-1">{m.remetente}</td>
                        <td className="border p-1">{m.destinatario}</td>
                        <td className="border p-1">{m.enderecoEntrega}</td>
                        <td className="border p-1">{m.bairro}</td>
                        <td className="border p-1">{m.cidadeEntrega}</td>
                        <td className="border p-1 text-center">{m.uf}</td>
                        <td className="border p-1">{m.motorista}</td>
                        <td className="border p-1 text-center">{m.placa}</td>
                        <td className="border p-1 text-center">{m.ddd}</td>
                        <td className="border p-1 text-center">{m.fone}</td>
                        <td className="border p-1">{m.contato}</td>
                      </tr>
                    ))}

                    {listaConsulta.length === 0 && (
                      <tr>
                        <td colSpan={15} className="border p-2 text-center text-gray-500">
                          Nenhuma minuta localizada. Informe os filtros e clique em Pesquisar.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-1 text-[12px] flex justify-between">
                <span>
                  Total de Registros: <strong>{listaConsulta.length}</strong>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ======================== RODAPÉ ======================== */}
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
          onClick={handleIncluir}
          title="Incluir Minuta"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <PlusCircle size={20} />
          <span>Incluir</span>
        </button>

        {/* Alterar */}
        <button
          onClick={handleAlterar}
          title="Alterar Minuta"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Edit size={20} />
          <span>Alterar</span>
        </button>

        {/* Excluir */}
        <button
          onClick={handleExcluir}
          title="Excluir Minuta"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Trash2 size={20} />
          <span>Excluir</span>
        </button>

        {/* Imprimir com submenu */}
        <div className="relative">
          <button
            onClick={() => setShowImprimirMenu((prev) => !prev)}
            title="Imprimir"
            className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
          >
            <Printer size={20} />
            <span>Imprimir</span>
          </button>

          {showImprimirMenu && (
            <div className="absolute bottom-[44px] left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-md text-[12px] min-w-[220px] py-1 z-50">
              {["Padrão", "Etiqueta em Lote", "Minuta de Retirada", "Minuta de Devolução"].map(
                (opt) => (
                  <button
                    key={opt}
                    className="w-full text-left px-3 py-[3px] hover:bg-gray-100"
                    onClick={() => {
                      setShowImprimirMenu(false);

                      // 1) valida igual você já faz no Padrão
                      if (!dadosMinuta.numero) {
                        alert("Informe/seleciona uma minuta antes de imprimir.");
                        return;
                      }

                      // 2) payload base (o mesmo que você já usa)
                      const payload = buildPrintPayload();

                      // 3) decide rota conforme opção
                      if (opt === "Padrão") {
                        navigate("/relatorios/operacao/minuta", {
                          state: {
                            numeroMinuta: dadosMinuta.numero,
                            templateId: "padrao",
                            data: payload,
                          },
                        });
                        return;
                      }

                      if (opt === "Minuta de Devolução") {
                        // monta no formato que o RelMinutaDevolContainer espera
                        const devolPayload = {
                          templateId: "padrao",
                          empresa: {
                            nome: payload?.empresa?.nomeTopo || "",
                            // ✅ aqui é o CNPJ que você quer no topo da minuta
                            cnpj: dadosMinuta.clienteCnpj || payload?.cliente?.cnpj || "",
                            fone: payload?.empresa?.foneTopo || "",
                          },
                          devol: {
                            terminal: "",
                            endereco: "",
                            textoSolicitacao:
                              "Solicitamos gentilmente a recepção do equipamento, conforme dados abaixo:",

                            transportadora: payload?.empresa?.nomeTopo || "",
                            contato: "",

                            importador:
                              dadosMinuta.destinatarioRazao ||
                              dadosMinuta.clienteRazao ||
                              "",

                            container: "",
                            tipoEquipamento: "",
                            quantidade: "",
                            pesoCargaKg: "",
                            navio: "",
                            armador: "",

                            motorista: dadosMinuta.motoristaNome || "",
                            cpf: dadosMinuta.motoristaCpf || "",
                            cnh: dadosMinuta.motoristaCnh || "",
                            celular: dadosMinuta.motoristaCelular || "",

                            // ✅ placas agora preenchem
                            placaCavalo: dadosMinuta.tracaoPlacaDesc || "",
                            placaCarreta: dadosMinuta.reboquePlacaDesc || "",

                            idNextel: "",

                            // ✅ agora é Nº Minuta
                            numeroMinuta: dadosMinuta.numero || "",
                          },
                        };

                        navigate("/relatorios/operacao/minuta-devolucao-container", {
                          state: {
                            templateId: "padrao",
                            numeroMinuta: dadosMinuta.numero,
                            data: devolPayload,
                          },
                        });

                        return;
                      }

                      // opcional: se ainda não criou o relatório de retirada, fica mock
                      // ✅ Minuta de Retirada
                      if (opt === "Minuta de Retirada") {
                        const payload = buildPrintPayload();

                        // monta no formato que o RelMinutaRetContainer espera
                        const retPayload = {
                          templateId: "padrao",
                          empresa: {
                            // você pode decidir de onde vem o CNPJ do topo (cliente ou empresa)
                            // no exemplo do seu relatório, você exibiu CNPJ no topo,
                            // então vou usar o cnpj do Cliente (igual você fez na devolução)
                            nome: payload?.empresa?.nomeTopo || "",
                            cnpj: payload?.cliente?.cnpj || "",
                            fone: payload?.empresa?.foneTopo || "",
                          },
                          ret: {
                            terminal: "",
                            endereco: "",
                            textoSolicitacao:
                              "Solicitamos gentilmente a liberação do equipamento, conforme dados abaixo:",

                            transportadora: payload?.empresa?.nomeTopo || "",
                            contato: "",

                            // no PDF da retirada normalmente é Exportador e Booking
                            exportador:
                              payload?.remetente?.razao ||
                              payload?.destinatario?.razao ||
                              payload?.cliente?.razao ||
                              "",

                            booking: "",

                            tipoEquipamento: "",
                            quantidade: "",
                            pesoCargaKg: "",
                            navio: "",
                            armador: "",

                            motorista: payload?.motorista?.nome || dadosMinuta.motoristaNome || "",
                            celular: "",

                            cpf: "",
                            cnh: dadosMinuta.motoristaCnh || "",

                            // ⚠️ aqui você queria preencher Tração/Reboque:
                            // como na sua tela esses campos ainda não estão controlados por state,
                            // vai ficar vazio por enquanto (assim que você controlar eu plugo aqui)
                            placaCavalo: "",
                            placaCarreta: "",

                            idNextel: "",

                            // ✅ agora é Nº Minuta
                            numeroMinuta: dadosMinuta.numero || "",
                          },
                        };

                        navigate("/relatorios/operacao/minuta-retirada-container", {
                          state: {
                            templateId: "padrao",
                            numeroMinuta: dadosMinuta.numero, // topo do relatório
                            data: retPayload,
                          },
                        });

                        return;
                      }


                      // fallback
                      alert(`${opt} (mock).`);
                    }}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Notas Fiscal */}
        <button
          onClick={() => setShowNotas(true)}
          title="Notas Fiscal"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <FileText size={20} />
          <span>Notas Fiscal</span>
        </button>

        {/* Comex */}
        <button
          onClick={() => setShowComex(true)}
          title="Comex"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Globe2 size={20} />
          <span>Comex</span>
        </button>
      </div>

      {/* ======================== MODAIS ======================== */}
      {showCustos && <CustosAdicionaisModal onClose={() => setShowCustos(false)} />}

      <NotaFiscalMinuta isOpen={showNotas} onClose={() => setShowNotas(false)} />

      <NotasFiscalModal isOpen={showNotasRemetente} onClose={() => setShowNotasRemetente(false)} />

      {showComex && <Comex onClose={() => setShowComex(false)} />}
    </div>
  );
}
