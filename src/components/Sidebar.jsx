import { useState, useEffect } from "react"; // ✅ adiciona o useEffect aqui
import { io } from "socket.io-client"; // ✅ adiciona esta linha
import EmojiPicker from "emoji-picker-react";
import UsuarioAlterarSenha from "../pages/UsuarioAlterarSenha";
import { useIconColor } from "../context/IconColorContext";
import { useModulos } from "../context/ModulosContext";


import {
  FileText,
  FileSpreadsheet,
  BarChart3,
  ClipboardList,
  DollarSign,
  UserCircle2,
  LogOut,
  ChevronRight,
  MessageSquare,
  CircleDot,
  Circle,
  Send,
  X,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ open }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const { iconColor } = useIconColor()
  const { modulos } = useModulos();


  // === Estados do Chat ===
  const [chatOpen, setChatOpen] = useState(false);
  const [chatAtivo, setChatAtivo] = useState(null);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [mostrarEmoji, setMostrarEmoji] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  const [showAlterarSenha, setShowAlterarSenha] = useState(false);
  const [usuarios, setUsuarios] = useState([
    { nome: "Alan", online: true, ultimaMsg: "Olá, tudo bem?", naoLidas: 0 },
    { nome: "Admin", online: false, ultimaMsg: "CT-e finalizado com sucesso", naoLidas: 0 },
    { nome: "Fernanda", online: true, ultimaMsg: "Pode revisar o frete?", naoLidas: 0 },
    { nome: "Filipe", online: true, ultimaMsg: "Conferi a coleta 👍", naoLidas: 0 },
    { nome: "Gabriel", online: false, ultimaMsg: "Atualizando dados...", naoLidas: 0 },
    { nome: "Guilherme", online: true, ultimaMsg: "Nova viagem liberada", naoLidas: 0 },
    { nome: "Daniel", online: false, ultimaMsg: "Aguardando retorno", naoLidas: 0 },
  ]);
  const [contatosComMensagensNaoLidas, setContatosComMensagensNaoLidas] = useState(0);

  // === Socket.IO Conexão ===
  const [socket, setSocket] = useState(null);
  const usuarioLogado = localStorage.getItem("usuarioNome") || "Anônimo";

  useEffect(() => {
    const socketURL =
      window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://mantranweb-backend.onrender.com";

    const s = io(socketURL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
    });
    setSocket(s);

    s.on("connect", () => {
      console.log("✅ Conectado ao servidor Socket.io");
      s.emit("userOnline", usuarioLogado);
    });

    s.on("usersOnline", (lista) => {
      console.log("📡 Usuários online:", lista);
      setUsuarios((prev) =>
        prev.map((u) => ({ ...u, online: lista.includes(u.nome) }))
      );
    });

    s.on("novaMensagem", (msg) => {
      console.log("💬 Mensagem recebida:", msg);

      // ✅ Mostra apenas mensagens onde o usuário logado está envolvido
      if (msg.de === usuarioLogado || msg.para === usuarioLogado) {
        setMensagens((prev) => {
          const jaExiste = prev.some(
            (m) =>
              m.de === msg.de &&
              m.para === msg.para &&
              m.texto === msg.texto &&
              m.hora === msg.hora
          );
          if (jaExiste) return prev;
          return [...prev, msg];
        });

        // ✅ Atualiza a prévia apenas para o contato certo
        setUsuarios((prev) =>
          prev.map((u) => {
            if (u.nome === (msg.de === usuarioLogado ? msg.para : msg.de)) {
              return { ...u, ultimaMsg: msg.texto };
            }
            return u;
          })
        );

        // 🔴 Incrementa contador de mensagens não lidas
        if (msg.para === usuarioLogado) {
          setUsuarios((prev) =>
            prev.map((u) =>
              u.nome === msg.de
                ? { ...u, naoLidas: (u.naoLidas || 0) + 1, ultimaMsg: msg.texto }
                : u
            )
          );
        }
        // ✅ Atualiza contador de contatos com mensagens não lidas corretamente
        setUsuarios((prev) => {
          const atualizados = prev.map((u) =>
            u.nome === msg.de
              ? { ...u, naoLidas: (u.naoLidas || 0) + 1, ultimaMsg: msg.texto }
              : u
          );
          const total = atualizados.filter((u) => u.naoLidas > 0).length;
          setContatosComMensagensNaoLidas(total);
          return atualizados;
        });




      }
    });


    s.on("disconnect", () => {
      console.warn("⚠️ Desconectado do servidor Socket.io");
    });

    return () => {
      s.off("usersOnline");
      s.off("novaMensagem");
      s.off("connect");
      s.off("disconnect");
      s.disconnect();
    };
  }, []);



  const handleToggle = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    setActiveSubMenu(null);
  };

  const enviarMensagem = () => {
    if (!novaMensagem.trim() || !chatAtivo) return;

    const msg = {
      de: usuarioLogado,
      para: chatAtivo.nome,
      texto: novaMensagem.trim(),
      hora: new Date().toLocaleTimeString("pt-BR", { hour12: false }),
    };

    console.log("📤 Enviando mensagem:", msg);

    if (socket && socket.connected) {
      socket.emit("novaMensagem", msg);
    } else {
      console.warn("⚠️ Socket não está conectado");
    }

    setMensagens((prev) => [...prev, msg]);
    setNovaMensagem("");

    // Atualiza a prévia da última mensagem na lista
    setUsuarios((prev) =>
      prev.map((u) =>
        u.nome === chatAtivo.nome ? { ...u, ultimaMsg: msg.texto } : u
      )
    );
  };




  return (
    <>
      {/* === SIDEBAR PRINCIPAL === */}
      <aside
        className={`bg-white border-r border-gray-200 shadow-lg fixed left-0 top-[48px] h-[calc(100vh-48px)] z-50 transition-all duration-300 ${open ? "w-52 translate-x-0" : "w-14 -translate-x-full sm:translate-x-0"
          }`}
      >
        <nav className="p-2 text-sm text-gray-700 relative">

          {/* === CADASTROS === */}
          <div
            className="group relative"
            onMouseEnter={() => setActiveMenu("cadastros")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => handleToggle("cadastros")}
              className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
            >
              <FileText className={`w-5 h-5 ${iconColor}`} />

              {open && (
                <>
                  <span className="ml-3 flex-1 text-left">Cadastros</span>
                  <ChevronRight
                    size={14}
                    className={`text-gray-500 transition-transform ${activeMenu === "cadastros" ? "rotate-90" : ""
                      }`}
                  />
                </>
              )}
            </button>

            {/* Submenus de Cadastros */}
            {activeMenu === "cadastros" && (
              <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-[999]">
                <ul className="text-[13px] text-gray-700">
                  {[
                    "Empresa",
                    "Filial",
                    "Filial Parâmetro",
                    "Empresa Agregado",
                    "Parâmetro Fiscal",
                    "Motorista",
                    "Veículo",
                    "Cliente",
                    "Localidade",
                    "Eventos Despesas",
                    "Prazo de Entrega",
                    "Parâmetro GNRE",
                    "Parâmetro Módulo",
                    "Produto",
                    "Seguro",
                    "Ocorrência",
                    "Colaboradores",
                  ].map((item) => (

                    <li
                      key={item}
                      className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer relative"
                      onMouseEnter={() => {
                        if (item === "Cliente") setActiveSubMenu("Cliente");
                        if (item === "Parâmetro Fiscal") setActiveSubMenu("Parâmetro Fiscal");
                        if (item === "Localidade") setActiveSubMenu("Localidade");
                        if (item === "Produto") setActiveSubMenu("Produto");
                        if (item === "Ocorrência") setActiveSubMenu("Ocorrência");
                        if (item === "Seguro") setActiveSubMenu("Seguro");
                      }}

                      onMouseLeave={() => setActiveSubMenu(null)}
                    >
                      {/* Item padrão */}
                      {/* === Item Veículo (Com Submenu) === */}
                      {item === "Veículo" ? (
                        <div
                          className="relative"
                          onMouseEnter={() => setActiveSubMenu("Veículo")}
                          onMouseLeave={() => setActiveSubMenu(null)}
                        >
                          <div className="flex items-center justify-between px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700">
                            <span>Veículo</span>
                            <ChevronRight size={13} className="text-gray-500" />
                          </div>

                          {/* Submenu Nível 1 (Veículo) */}
                          {activeSubMenu?.startsWith("Veículo") && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-60 p-1 z-50">

                              {/* Cadastro de Veículo */}
                              <Link
                                to="/veiculo"
                                className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                              >
                                Cadastro de Veículo
                              </Link>

                              {/* Despesas */}
                              <div
                                className="relative"
                                onMouseEnter={() => setActiveSubMenu("Veículo-Despesas")}
                              >
                                <div className="flex items-center justify-between px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700">
                                  <span>Despesas</span>
                                  <ChevronRight size={13} className="text-gray-500" />
                                </div>

                                {/* Submenu Nível 2 (Despesas) */}
                                {activeSubMenu === "Veículo-Despesas" && (
                                  <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                                    {["IPVA", "Licenciamento", "Multas / Infrações", "Seguro"].map((subItem) => {
                                      const links = {
                                        "IPVA": "/veiculo-ipva",
                                        "Licenciamento": "/veiculo-licenciamento",
                                        "Multas / Infrações": "/veiculo-multa",
                                        "Seguro": "/veiculo-seguro",
                                      };
                                      return (
                                        <Link
                                          key={subItem}
                                          to={links[subItem] || "#"}
                                          className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                                        >
                                          {subItem}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* Adicional */}
                              <div
                                className="relative"
                                onMouseEnter={() => setActiveSubMenu("Veículo-Adicional")}
                              >
                                <div className="flex items-center justify-between px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700">
                                  <span>Adicional</span>
                                  <ChevronRight size={13} className="text-gray-500" />

                                </div>

                                {/* Submenu Nível 2 (Adicional) */}
                                {activeSubMenu === "Veículo-Adicional" && (
                                  <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                                    {["Modelo de Veiculo", "Carroceria", "Classe de Veiculo", "Tabela de Licenciamento", "Tipos de Combustivel"].map((subItem) => (
                                      <Link
                                        key={subItem}
                                        to={
                                          subItem === "Modelo de Veiculo"
                                            ? "/veiculo-modelo"
                                            : subItem === "Tipos de Combustivel"
                                              ? "/veiculo-combustivel"
                                              : subItem === "Carroceria"
                                                ? "/veiculo-carroceria"
                                                : subItem === "Tabela de Licenciamento"
                                                  ? "/veiculo-tabela-licenciamento"
                                                  : subItem === "Classe de Veiculo"
                                                    ? "/veiculo-classe"
                                                    : "#"
                                        }
                                        className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                                      >
                                        {subItem}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>

                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={
                            item === "Empresa"
                              ? "/empresa"
                              : item === "Filial"
                                ? "/filial"
                                : item === "Filial Parâmetro"
                                  ? "/empresa-filial-parametro"
                                  : item === "Empresa Agregado"
                                    ? "/empresa-agregado"
                                    : item === "Motorista"
                                      ? "/motorista"
                                      : item === "Eventos Despesas"
                                        ? "/evento-despesa"
                                        : item === "Prazo de Entrega"
                                          ? "/prazo-entrega"
                                          : item === "Seguro"
                                            ? "/seguradora"
                                            : "#"
                          }
                          className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                        >
                          {item}
                        </Link>
                      )}








                      {/* Submenu Cliente */}
                      {item === "Cliente" && activeSubMenu === "Cliente" && (
                        <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">

                          <Link to="/cliente" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Cliente
                          </Link>

                          <Link to="/atividade-economica" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Atividade Econômica
                          </Link>

                          <Link to="/cliente-condicao-pagamento" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Condição de Pagamento
                          </Link>

                          <Link to="/cliente-divisao" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Divisão Empresarial
                          </Link>

                          <Link to="/cliente-divisao-regiao" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Divisão Região
                          </Link>

                          <Link to="/cliente-embalagem" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Embalagem
                          </Link>

                          <Link to="/cliente-grupo-economico" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Grupo Econômico
                          </Link>

                          <Link to="/cliente-produto" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Produto
                          </Link>

                          <Link to="/cliente-operacao" className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700">
                            Operação
                          </Link>

                        </div>
                      )}



                      {/* === Submenu Seguro === */}
                      {item === "Seguro" && activeSubMenu === "Seguro" && (
                        <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-60 p-1 z-50">

                          <Link
                            to="/seguradora"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Seguradora
                          </Link>

                        </div>
                      )}

                      {/* === Submenu Ocorrência === */}
                      {item === "Ocorrência" && activeSubMenu === "Ocorrência" && (
                        <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-60 p-1 z-50">

                          <Link
                            to="/tipo-ocorrencia"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Tipos de Ocorrência
                          </Link>

                          <Link
                            to="/historico-ocorrencia"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Histórico de Ocorrências
                          </Link>

                        </div>
                      )}

                      {/* === Submenu Produto === */}
                      {item === "Produto" && activeSubMenu === "Produto" && (
                        <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">

                          <Link
                            to="/produto"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Produto
                          </Link>

                          <Link
                            to="/embalagem"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Embalagem
                          </Link>

                          <Link
                            to="/produto-predominante"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Predominante
                          </Link>

                        </div>
                      )}

                      {/* === Submenu Localidade === */}
                      {item === "Localidade" && activeSubMenu === "Localidade" && (
                        <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-64 p-1 z-50">

                          <Link
                            to="/localidade-adicional"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Localidade Adicional
                          </Link>

                          <Link
                            to="/cidade"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Cidade
                          </Link>

                          <Link
                            to="/regiao"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Região
                          </Link>

                          <Link
                            to="/estado"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Estado
                          </Link>

                          <Link
                            to="/feriado"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Feriado
                          </Link>

                          <Link
                            to="/aduaneira"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Aduaneira
                          </Link>

                        </div>
                      )}

                      {/* Submenu Parâmetro Fiscal */}
                      {item === "Parâmetro Fiscal" && activeSubMenu === "Parâmetro Fiscal" && (
                        <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">

                          <Link
                            to="/aliquota-icms"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Alíquota ICMS
                          </Link>

                          <Link
                            to="/cfop"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            CFOP
                          </Link>

                          <Link
                            to="/irrf"
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                          >
                            Tabela IRRF
                          </Link>

                        </div>
                      )}

                    </li>


                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* === OPERAÇÃO === */}
          <div
            className="group relative mt-1"
            onMouseEnter={() => setActiveMenu("operacao")}
            onMouseLeave={() => {
              setActiveMenu(null);
              setActiveSubMenu(null);
            }}
          >
            <button
              onClick={() => handleToggle("operacao")}
              className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
            >
              <ClipboardList className={`w-5 h-5 ${iconColor}`} />

              {open && (
                <>
                  <span className="ml-3 flex-1 text-left">Operação</span>
                  <ChevronRight
                    size={14}
                    className={`text-gray-500 transition-transform ${activeMenu === "operacao" ? "rotate-90" : ""
                      }`}
                  />
                </>
              )}
            </button>

            {activeMenu === "operacao" && (
              <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-[999]">
                <ul className="text-[13px] text-gray-700">
                  {["Coleta", "Conhecimento", "Viagem", "Nota Fiscal", "Manifesto", "Minuta"].map(
                    (item) => (
                      <li
                        key={item}
                        className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer relative"
                        onMouseEnter={() => setActiveSubMenu(item)}
                        onMouseLeave={() => setActiveSubMenu(null)}
                      >

                        {item}
                        {["Coleta", "Conhecimento", "Viagem", "Nota Fiscal", "Manifesto"].includes(
                          item
                        ) && (
                            <ChevronRight
                              size={13}
                              className="absolute right-3 top-2 text-gray-500"
                            />
                          )}

                        {/* === Submenu de Coleta === */}
                        {item === "Coleta" && activeSubMenu === item && (
                          <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                            <Link
                              to="/coleta"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Coleta
                            </Link>
                            <Link
                              to="/motivocoleta"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Motivo Coleta
                            </Link>
                          </div>
                        )}

                        {/* === Submenu de Conhecimento === */}
                        {item === "Conhecimento" && activeSubMenu === item && (
                          <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                            <Link
                              to="/cte"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Conhecimento
                            </Link>
                            {[
                              "Cancelar Lote",
                              "Consulta Sefaz",
                              "Parâmetro",
                              "Envio Sefaz",
                              "Baixa CTRC",
                              "Geração Automática",
                              "Integração MultiCTe",
                            ].map((sub) => (
                              <div
                                key={sub}
                                className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                              >
                                {sub}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* === Submenu de Viagem === */}
                        {item === "Viagem" && activeSubMenu === item && (
                          <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                            <Link
                              to="/viagem"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Viagem
                            </Link>
                            <Link
                              to="/acertocontas"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Acerto de Contas
                            </Link>
                          </div>
                        )}

                        {/* === Submenu de Nota Fiscal === */}
                        {item === "Nota Fiscal" && activeSubMenu === item && (
                          <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                            <Link
                              to="/notafiscaledi"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Nota Fiscal EDI
                            </Link>
                            <Link
                              to="/nfse"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Nota Fiscal Serviço
                            </Link>
                          </div>
                        )}

                        {/* === Submenu de Manifesto === */}
                        {item === "Manifesto" && activeSubMenu === item && (
                          <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                            <Link
                              to="/manifesto"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Manifesto
                            </Link>
                            <Link
                              to="/consultasefazmdfe"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Consulta Sefaz
                            </Link>
                            <Link
                              to="/parametromanifesto"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Parâmetro
                            </Link>
                            <Link
                              to="/baixamanifesto"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              Baixar Manifesto
                            </Link>
                          </div>
                        )}

                        {item === "Minuta" && (
                          <Link
                            to="/minuta"
                            className="absolute inset-0 px-3 py-[2px] flex items-center hover:bg-gray-100 rounded text-gray-700"
                          >
                            Minuta
                          </Link>
                        )}

                      </li>
                    )
                  )}


                </ul>
              </div>
            )}
          </div>

          {/* === TABELA FRETE === */}
          <Link
            to="/tabelafrete"
            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1 text-gray-700"
          >
            <FileSpreadsheet className={`w-5 h-5 ${iconColor}`} />

            {open && <span className="ml-3">Tabela Frete</span>}
          </Link>

          {/* === E-COMMERCE (DINÂMICO) === */}
          {modulos?.ecommerce && (
            <div
              className="group relative mt-1"
              onMouseEnter={() => setActiveMenu("ecommerce")}
              onMouseLeave={() => {
                setActiveMenu(null);
                setActiveSubMenu(null);
              }}
            >
              <button
                onClick={() => handleToggle("ecommerce")}
                className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
              >
                <ClipboardList className={`w-5 h-5 ${iconColor}`} />

                {open && (
                  <>
                    <span className="ml-3 flex-1 text-left">E-Commerce</span>
                    <ChevronRight
                      size={14}
                      className={`text-gray-500 transition-transform ${activeMenu === "ecommerce" ? "rotate-90" : ""
                        }`}
                    />
                  </>
                )}
              </button>

              {activeMenu === "ecommerce" && (
                <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-xl rounded-md w-60 p-1 z-[999]">
                  <ul className="text-[13px] text-gray-700">
                    {/* Operação Shopee */}
                    <li className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                      <Link to="/operacao-shopee" className="block w-full h-full">
                        Operação Shopee
                      </Link>
                    </li>

                    {/* IMPORTAÇÃO */}
                    <li
                      className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer relative"
                      onMouseEnter={() => setActiveSubMenu("ec-importacao")}
                    >
                      Importação
                      <ChevronRight size={13} className="absolute right-3 top-2 text-gray-500" />
                    </li>

                    {activeSubMenu === "ec-importacao" && (
                      <div className="absolute top-8 left-full bg-white border border-gray-200 shadow-md rounded-md w-72 p-1 z-50">
                        {[
                          { label: "Planilha Shopee", path: "/importacao-shopee" },
                          { label: "Planilha Agregado", path: "/importacao-planilha-agregado" },
                          { label: "Planilha Nota Fiscal Serviço", path: "#" },
                          { label: "Planilha Fatura", path: "#" },
                          { label: "Excluir Importação Shopee", path: "#" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="block px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* EXPORTAÇÃO */}
                    <li
                      className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer relative"
                      onMouseEnter={() => setActiveSubMenu("ec-exportacao")}
                    >
                      Exportação
                      <ChevronRight size={13} className="absolute right-3 top-2 text-gray-500" />
                    </li>

                    {activeSubMenu === "ec-exportacao" && (
                      <div className="absolute top-16 left-full bg-white border border-gray-200 shadow-md rounded-md w-72 p-1 z-50">
                        <Link to="/exportacao-planilha-shopee" className="block px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700">
                          Planilha Shopee
                        </Link>
                        <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                          Planilha NFSE/Fatura
                        </div>
                      </div>
                    )}

                    {/* Liberação NFSE */}
                    <li className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                      <Link to="/liberacao-nfse" className="block w-full h-full text-gray-700">
                        Liberação NFSE
                      </Link>
                    </li>

                    {/* Auditoria */}
                    <li className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                      <Link to="/auditoria-shopee" className="block w-full h-full text-gray-700">
                        Auditoria
                      </Link>
                    </li>
                    {/* Dashboard Shopee */}
                    <li className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                      <Link
                        to="/dashboard-shopee"
                        className="block py-[2px] hover:bg-gray-100 rounded text-gray-700 cursor-pointer"

                      >
                        Dashboard
                      </Link>
                    </li>

                  </ul>
                </div>
              )}
            </div>
          )}



          {/* === FATURAMENTO === */}
          <div
            className="group relative mt-1"
            onMouseEnter={() => setActiveMenu("faturamento")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => handleToggle("faturamento")}
              className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
            >
              <DollarSign className={`w-5 h-5 ${iconColor}`} />

              {open && (
                <>
                  <span className="ml-3 flex-1 text-left">Faturamento</span>
                  <ChevronRight
                    size={14}
                    className={`text-gray-500 transition-transform ${activeMenu === "faturamento" ? "rotate-90" : ""
                      }`}
                  />
                </>
              )}
            </button>

            {activeMenu === "faturamento" && (
              <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-[999]">
                {["Manual", "Automático"].map((sub) =>
                  sub === "Manual" ? (
                    <Link
                      key={sub}
                      to="/faturamento"
                      className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                    >
                      Manual
                    </Link>
                  ) : (
                    <Link
                      key={sub}
                      to="/faturamento-automatico"
                      className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                    >
                      Automático
                    </Link>
                  )
                )}

              </div>
            )}
          </div>

          {/* === RELATÓRIO === */}
          <button className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1">
            <BarChart3 className={`w-5 h-5 ${iconColor}`} />

            {open && <span className="ml-3">Relatório</span>}
          </button>

          {/* === SAC === */}
          <div
            className="group relative mt-1"
            onMouseEnter={() => setActiveMenu("sac")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => handleToggle("sac")}
              className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
            >
              <Headphones className={`w-5 h-5 ${iconColor}`} />

              {open && (
                <>
                  <span className="ml-3 flex-1 text-left">SAC</span>
                  <ChevronRight
                    size={14}
                    className={`text-gray-500 transition-transform ${activeMenu === "sac" ? "rotate-90" : ""
                      }`}
                  />
                </>
              )}
            </button>

            {activeMenu === "sac" && (
              <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-[999]">
                <Link
                  to="/sac-notafiscal"
                  className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                >
                  Nota Fiscal
                </Link>
                <Link
                  to="/sac-conhecimento"
                  className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                >
                  Conhecimento
                </Link>
                <Link
                  to="/sac-coleta"
                  className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                >
                  Coleta
                </Link>
              </div>
            )}
          </div>

          {/* === USUÁRIO === */}
          <div
            className="group relative mt-1"
            onMouseEnter={() => setActiveMenu("usuario")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => handleToggle("usuario")}
              className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
            >
              <UserCircle2 className={`w-5 h-5 ${iconColor}`} />

              {open && (
                <>
                  <span className="ml-3 flex-1 text-left">Usuário</span>
                  <ChevronRight
                    size={14}
                    className={`text-gray-500 transition-transform ${activeMenu === "usuario" ? "rotate-90" : ""
                      }`}
                  />
                </>
              )}
            </button>

            {activeMenu === "usuario" && (
              <div className="absolute top-0 left-full bg-white border border-gray-200 shadow-xl rounded-md w-56 p-1 z-50">
                {["Trocar Filial", "Alterar Senha"].map((sub) => (
                  <div
                    key={sub}
                    className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => {
                      if (sub === "Alterar Senha") setShowAlterarSenha(true);
                    }}
                  >
                    {sub}
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* === CHAT === */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1 relative"
          >
            <MessageSquare className={`w-5 h-5 ${iconColor}`} />

            {open && <span className="ml-3 flex-1 text-left">Chat</span>}

            {/* 🔴 Indicador dinâmico de contatos com mensagens não lidas */}
            {contatosComMensagensNaoLidas > 0 && (
              <span
                className="absolute top-1 right-3 bg-red-600 text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full shadow-md"
                title={`${contatosComMensagensNaoLidas} contato(s) com novas mensagens`}
              >
                {contatosComMensagensNaoLidas}
              </span>
            )}
          </button>
        </nav>

        {/* === BOTÃO DE LOGOUT === */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <button
            onClick={() => {
              if (typeof window.onLogout === "function") window.onLogout();
            }}
            className="bg-red-700 hover:bg-red-800 text-white p-3 rounded-full shadow transition"
            title="Sair do sistema"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {showAlterarSenha && (
        <UsuarioAlterarSenha onClose={() => setShowAlterarSenha(false)} />
      )}

      {/* === PAINEL LATERAL DO CHAT === */}
      {chatOpen && (
        <div className="fixed right-0 top-[48px] w-80 h-[calc(100vh-48px)] bg-white border-l border-gray-200 shadow-2xl z-30 flex flex-col">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="font-semibold text-gray-700 text-sm">
              {chatAtivo ? `Chat com ${chatAtivo.nome}` : "Mensagens"}
            </h2>
            <button
              onClick={() =>
                chatAtivo ? setChatAtivo(null) : setChatOpen(false)
              }
              className="text-red-700 hover:text-black"
            >
              <X size={16} />
            </button>
          </div>

          {/* Lista de contatos */}
          {!chatAtivo && (
            <div className="flex-1 overflow-y-auto">
              {usuarios.map((u) => (
                <div
                  key={u.nome}
                  onClick={() => {
                    setChatAtivo(u);

                    // ✅ Zera contador de mensagens não lidas do contato
                    setUsuarios((prev) => {
                      const atualizados = prev.map((x) =>
                        x.nome === u.nome ? { ...x, naoLidas: 0 } : x
                      );
                      // ✅ Atualiza contador geral (quantos contatos ainda têm mensagens não lidas)
                      const total = atualizados.filter((x) => x.naoLidas > 0).length;
                      setContatosComMensagensNaoLidas(total);
                      return atualizados;
                    });
                  }}




                  className="relative flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer border-b"

                >
                  <div>
                    <div className="flex items-center gap-2">
                      {u.online ? (
                        <CircleDot className="text-green-500 w-3 h-3" />
                      ) : (
                        <Circle className="text-gray-400 w-3 h-3" />
                      )}
                      <span className="font-medium text-sm">{u.nome}</span>
                    </div>
                    <div className="text-gray-500 text-xs truncate w-52">
                      {/* 🔴 Balão de mensagens não lidas */}
                      {u.naoLidas > 0 && (
                        <span
                          className="absolute right-3 top-2 bg-red-600 text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full shadow-md"
                          title={`${u.naoLidas} mensagens não lidas`}
                        >
                          {u.naoLidas}
                        </span>
                      )}



                      {u.ultimaMsg}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chat individual */}
          {chatAtivo && (
            <div className="flex flex-col flex-1">
              <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                {mensagens
                  .filter(
                    (m) =>
                      (m.de === usuarioLogado && m.para === chatAtivo.nome) ||
                      (m.para === usuarioLogado && m.de === chatAtivo.nome)
                  )
                  .map((m, i) => {
                    const isMinhaMsg = m.de === usuarioLogado;
                    return (
                      <div
                        key={i}
                        className={`mb-2 flex ${isMinhaMsg ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`inline-block max-w-[80%] rounded-lg px-3 py-1 shadow-sm ${isMinhaMsg
                            ? "bg-red-600 text-white text-right"
                            : "bg-gray-100 text-gray-800 text-left"
                            }`}
                        >
                          {!isMinhaMsg && <b>{m.de}: </b>}
                          {m.texto}
                          <div
                            className={`text-[10px] mt-1 ${isMinhaMsg ? "text-gray-200" : "text-gray-400"
                              }`}
                          >
                            {m.hora}
                          </div>
                        </div>
                      </div>
                    );
                  })}


              </div>
              <div className="flex border-t p-2 gap-2 relative">
                {/* Campo de texto */}
                <input
                  type="text"
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                  placeholder={`Mensagem para ${chatAtivo.nome}...`}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />

                {/* Botão de emoji */}
                <button
                  onClick={() => setMostrarEmoji(!mostrarEmoji)}
                  className="text-gray-500 hover:text-red-700"
                  title="Inserir emoji"
                >
                  😊
                </button>

                {/* Picker de emoji */}
                {mostrarEmoji && (
                  <div className="absolute bottom-10 right-14 z-50 shadow-lg">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        setNovaMensagem((prev) => prev + emojiData.emoji);
                        setMostrarEmoji(false);
                      }}
                      width={300}
                      height={350}
                    />
                  </div>
                )}

                {/* Botão de envio */}
                <button
                  onClick={enviarMensagem}
                  className="bg-red-700 text-white px-3 rounded flex items-center justify-center"
                >
                  <Send size={14} />
                </button>
              </div>

            </div>
          )}
        </div>
      )}
    </>
  );
}
