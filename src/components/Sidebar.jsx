import { useState, useEffect } from "react"; // ✅ adiciona o useEffect aqui
import { io } from "socket.io-client"; // ✅ adiciona esta linha

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
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ open }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // === Estados do Chat ===
  const [chatOpen, setChatOpen] = useState(false);
  const [chatAtivo, setChatAtivo] = useState(null);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
const [usuarios, setUsuarios] = useState([
  { nome: "Alan", online: true, ultimaMsg: "Olá, tudo bem?", naoLidas: 0 },
  { nome: "Admin", online: false, ultimaMsg: "CT-e finalizado com sucesso", naoLidas: 0 },
  { nome: "Fernanda", online: true, ultimaMsg: "Pode revisar o frete?", naoLidas: 0 },
  { nome: "Filipe", online: true, ultimaMsg: "Conferi a coleta 👍", naoLidas: 0 },
  { nome: "Gabriel", online: false, ultimaMsg: "Atualizando dados...", naoLidas: 0 },
  { nome: "Guilherme", online: true, ultimaMsg: "Nova viagem liberada", naoLidas: 0 },
  { nome: "Daniel", online: false, ultimaMsg: "Aguardando retorno", naoLidas: 0 },
]);

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
         className={`bg-white border-r border-gray-200 shadow-lg fixed left-0 top-[48px] h-[calc(100vh-48px)] z-50 transition-all duration-300 ${
          open ? "w-52 translate-x-0" : "w-14 -translate-x-full sm:translate-x-0"
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
            <FileText className="w-5 h-5 text-red-700" />
            {open && (
              <>
                <span className="ml-3 flex-1 text-left">Cadastros</span>
                <ChevronRight
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    activeMenu === "cadastros" ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>

          {/* Submenus de Cadastros */}
          {activeMenu === "cadastros" && (
            <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-[999]">
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
                    onMouseEnter={() => setActiveSubMenu(item)}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    {item}

                    {/* Submenu do CLIENTE */}
                    {item === "Cliente" && activeSubMenu === item && (
                      <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                        {[
                          "Cliente",
                          "Atividade Econômica",
                          "Condição de Pagamento",
                          "Divisão Empresarial",
                          "Embalagem",
                          "Grupo Econômico",
                          "Produto",
                          "Operação",
                        ].map((sub) =>
                          sub === "Divisão Empresarial" ? (
                            <Link
                              key={sub}
                              to="/cliente-divisao"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              {sub}
                            </Link>
                          ) : (
                            <div
                              key={sub}
                              className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                            >
                              {sub}
                            </div>
                          )
                        )}
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
            <ClipboardList className="w-5 h-5 text-red-700" />
            {open && (
              <>
                <span className="ml-3 flex-1 text-left">Operação</span>
                <ChevronRight
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    activeMenu === "operacao" ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>

          {activeMenu === "operacao" && (
<div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-[999]">
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
      {["Conhecimento", "Viagem", "Nota Fiscal", "Manifesto"].includes(item) && (
        <ChevronRight
          size={13}
          className="absolute right-3 top-2 text-gray-500"
        />
      )}

      {/* === Submenu de Coleta === */}
      {item === "Coleta" && (
        <Link
          to="/coleta"
          className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
        >
      Coleta
        </Link>
      )}

      {/* === Submenu de Conhecimento === */}
      {item === "Conhecimento" && activeSubMenu === item && (
        <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
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

      {/* === Submenu de Nota Fiscal === */}
      {item === "Nota Fiscal" && activeSubMenu === item && (
        <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
          <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
            Nota Fiscal EDI
          </div>
          <Link
            to="/nfse"
            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
          >
            Nota Fiscal Serviço
          </Link>
        </div>
      )}
    </li>
  )
)}

    </ul>
  </div>
)}
        </div>

        {/* === TABELA FRETE === */}
        <button className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1">
          <FileSpreadsheet className="w-5 h-5 text-red-700" />
          {open && <span className="ml-3">Tabela Frete</span>}
        </button>

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
            <DollarSign className="w-5 h-5 text-red-700" />
            {open && (
              <>
                <span className="ml-3 flex-1 text-left">Faturamento</span>
                <ChevronRight
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    activeMenu === "faturamento" ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>

          {activeMenu === "faturamento" && (
            <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-[999]">
              {["Manual", "Automático"].map((sub) => (
                <div
                  key={sub}
                  className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                >
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === RELATÓRIO === */}
        <button className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1">
          <BarChart3 className="w-5 h-5 text-red-700" />
          {open && <span className="ml-3">Relatório</span>}
        </button>

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
            <UserCircle2 className="w-5 h-5 text-red-700" />
            {open && (
              <>
                <span className="ml-3 flex-1 text-left">Usuário</span>
                <ChevronRight
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    activeMenu === "usuario" ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>
          {/* === CHAT === */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1 relative"
          >
            <MessageSquare className="w-5 h-5 text-red-700" />
            {open && <span className="ml-3 flex-1 text-left">Chat</span>}
            {/* Indicador de nova mensagem */}
            <span className="absolute top-1 right-3 bg-red-600 w-2 h-2 rounded-full"></span>
          </button>
          {activeMenu === "usuario" && (
            <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl rounded-md w-56 p-1 z-50">
              {["Trocar Usuário", "Trocar Filial", "Alterar Senha"].map((sub) => (
                <div
                  key={sub}
                  className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                >
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
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
  // ✅ Zera contador de mensagens não lidas
  setUsuarios((prev) =>
    prev.map((x) =>
      x.nome === u.nome ? { ...x, naoLidas: 0 } : x
    )
  );
}}

                  className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer border-b"
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
  <div className="bg-red-600 text-white text-[11px] px-[6px] py-[2px] rounded-full">
    {u.naoLidas}
  </div>
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
          className={`inline-block max-w-[80%] rounded-lg px-3 py-1 shadow-sm ${
            isMinhaMsg
              ? "bg-red-600 text-white text-right"
              : "bg-gray-100 text-gray-800 text-left"
          }`}
        >
          {!isMinhaMsg && <b>{m.de}: </b>}
          {m.texto}
          <div
            className={`text-[10px] mt-1 ${
              isMinhaMsg ? "text-gray-200" : "text-gray-400"
            }`}
          >
            {m.hora}
          </div>
        </div>
      </div>
    );
  })}


              </div>
              <div className="flex border-t p-2 gap-2">
                <input
                  type="text"
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                  placeholder={`Mensagem para ${chatAtivo.nome}...`}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
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
