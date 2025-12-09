import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import UsuarioAlterarSenha from "../pages/UsuarioAlterarSenha";
import { useIconColor } from "../context/IconColorContext";

import {
    FileText,
    DollarSign,
    Receipt,
    BarChart3,
    ChevronRight,
    Headphones,
    UserCircle2,
    MessageSquare,
    CircleDot,
    Circle,
    Send,
    X,
    LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function SidebarFinanceiro({ open }) {
    const { iconColor } = useIconColor();

    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const [chatOpen, setChatOpen] = useState(false);
    const [chatAtivo, setChatAtivo] = useState(null);
    const [novaMensagem, setNovaMensagem] = useState("");
    const [mostrarEmoji, setMostrarEmoji] = useState(false);
    const [mensagens, setMensagens] = useState([]);
    const [showAlterarSenha, setShowAlterarSenha] = useState(false);

    const [usuarios, setUsuarios] = useState([
        { nome: "Alan", online: true, ultimaMsg: "Olá!", naoLidas: 0 },
        { nome: "Admin", online: false, ultimaMsg: "Atualizando dados", naoLidas: 0 },
    ]);

    const [contatosComMensagensNaoLidas, setContatosComMensagensNaoLidas] = useState(0);

    const [socket, setSocket] = useState(null);
    const usuarioLogado = localStorage.getItem("usuarioNome") || "Financeiro";

    useEffect(() => {
        const socketURL =
            window.location.hostname === "localhost"
                ? "http://localhost:3001"
                : "https://mantranweb-backend.onrender.com";

        const s = io(socketURL, {
            transports: ["websocket"],
            reconnection: true,
        });

        setSocket(s);

        s.on("connect", () => {
            s.emit("userOnline", usuarioLogado);
        });

        s.on("usersOnline", (lista) => {
            setUsuarios((prev) =>
                prev.map((u) => ({ ...u, online: lista.includes(u.nome) }))
            );
        });

        s.on("novaMensagem", (msg) => {
            if (msg.de === usuarioLogado || msg.para === usuarioLogado) {
                setMensagens((prev) => [...prev, msg]);

                if (msg.para === usuarioLogado) {
                    setUsuarios((prev) =>
                        prev.map((u) =>
                            u.nome === msg.de ? { ...u, naoLidas: (u.naoLidas || 0) + 1 } : u
                        )
                    );
                }
            }
        });

        return () => s.disconnect();
    }, []);

    const enviarMensagem = () => {
        if (!novaMensagem.trim() || !chatAtivo) return;

        const msg = {
            de: usuarioLogado,
            para: chatAtivo.nome,
            texto: novaMensagem.trim(),
            hora: new Date().toLocaleTimeString("pt-BR", { hour12: false }),
        };

        socket?.emit("novaMensagem", msg);
        setMensagens((prev) => [...prev, msg]);
        setNovaMensagem("");
    };

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
        setActiveSubMenu(null);
    };

    return (
        <>
            {/* SIDEBAR */}
            <aside
                className={`bg-white border-r border-gray-200 shadow-lg fixed left-0 top-[48px] 
                h-[calc(100vh-48px)] z-50 transition-all duration-300 
                ${open ? "w-52 translate-x-0" : "w-14 -translate-x-full sm:translate-x-0"}`}
            >
                {/* NAV COM ALIGN IGUAL AO SIDEBAR PRINCIPAL */}
                <nav className="p-2 text-sm text-gray-700 relative">

                    {/* CADASTROS */}
                    <div
                        className="group relative"
                        onMouseEnter={() => setActiveMenu("cadastros")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button
                            onClick={() => toggleMenu("cadastros")}
                            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                            rounded-md transition"
                        >
                            <FileText className={`w-5 h-5 ${iconColor}`} />
                            {open && (
                                <>
                                    <span className="ml-3 flex-1 text-left">Cadastros</span>
                                    <ChevronRight
                                        size={14}
                                        className={`text-gray-500 transition-transform 
                                        ${activeMenu === "cadastros" ? "rotate-90" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        {activeMenu === "cadastros" && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 
                            shadow-xl rounded-md w-52 p-1 z-[999]">

                                {[
                                    { label: "Banco", rota: "#" },
                                    { label: "Agência", rota: "#" },
                                    { label: "Conta Corrente", rota: "#" },
                                    { label: "Cliente", rota: "/cliente" },
                                    { label: "Categoria", rota: "#" },
                                    { label: "CFOP", rota: "/cfop" },
                                    { label: "Condição Pagamento", rota: "#" },
                                    { label: "Centro de Custo", rota: "#" },
                                    { label: "Produto", rota: "/produto" },
                                    { label: "Moeda", rota: "#" },
                                    { label: "Fornecedor", rota: "#" },
                                    { label: "Fornecedor Produto", rota: "#" },
                                    { label: "Tipos de Pagamento", rota: "#" },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.rota}
                                        className="block px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* FATURAMENTO */}
                    <div
                        className="group relative mt-1"
                        onMouseEnter={() => setActiveMenu("faturamento")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button
                            onClick={() => toggleMenu("faturamento")}
                            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                            rounded-md transition"
                        >
                            <DollarSign className={`w-5 h-5 ${iconColor}`} />

                            {open && (
                                <>
                                    <span className="ml-3 flex-1 text-left">Faturamento</span>
                                    <ChevronRight
                                        size={14}
                                        className={`text-gray-500 transition-transform 
                                        ${activeMenu === "faturamento" ? "rotate-90" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        {activeMenu === "faturamento" && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 
                            shadow-xl rounded-md w-52 p-1 z-[999]">
                                {[
                                    { label: "Manual", rota: "/faturamento" },
                                    { label: "Automático", rota: "/faturamento-automatico" },
                                    { label: "Por Conhecimento", rota: "#" },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.rota}
                                        className="block px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* BOLETO */}
                    <div
                        className="group relative mt-1"
                        onMouseEnter={() => setActiveMenu("boleto")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button
                            onClick={() => toggleMenu("boleto")}
                            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                            rounded-md transition"
                        >
                            <Receipt className={`w-5 h-5 ${iconColor}`} />

                            {open && (
                                <>
                                    <span className="ml-3 flex-1 text-left">Boleto</span>
                                    <ChevronRight
                                        size={14}
                                        className={`text-gray-500 transition-transform 
                                        ${activeMenu === "boleto" ? "rotate-90" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        {activeMenu === "boleto" && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 
                            shadow-xl rounded-md w-52 p-1 z-[999]">
                                <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                    Geração de Boleto/Remessa
                                </div>
                                <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                    Arquivo Retorno / Leitura
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CONTAS A PAGAR */}
                    <div
                        className="group relative mt-1"
                        onMouseEnter={() => setActiveMenu("pagar")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button
                            onClick={() => toggleMenu("pagar")}
                            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                            rounded-md transition"
                        >
                            <DollarSign className={`w-5 h-5 ${iconColor}`} />

                            {open && (
                                <>
                                    <span className="ml-3 flex-1 text-left">Contas a Pagar</span>
                                    <ChevronRight
                                        size={14}
                                        className={`text-gray-500 transition-transform 
                                        ${activeMenu === "pagar" ? "rotate-90" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        {activeMenu === "pagar" && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 
                            shadow-xl rounded-md w-60 p-1 z-[999]">

                                {[
                                    "Títulos",
                                    "Baixa de Títulos (Lote)",
                                    "Integração Banco",
                                    "Arquivo de Retorno",
                                    "Nota Fiscal - Compra",
                                ].map((item) => (
                                    <div key={item}
                                        className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CONTAS A RECEBER */}
                    <div
                        className="group relative mt-1"
                        onMouseEnter={() => setActiveMenu("receber")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button
                            onClick={() => toggleMenu("receber")}
                            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                            rounded-md transition"
                        >
                            <DollarSign className={`w-5 h-5 ${iconColor}`} />

                            {open && (
                                <>
                                    <span className="ml-3 flex-1 text-left">Contas a Receber</span>
                                    <ChevronRight
                                        size={14}
                                        className={`text-gray-500 transition-transform 
                                        ${activeMenu === "receber" ? "rotate-90" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        {activeMenu === "receber" && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 
                            shadow-xl rounded-md w-60 p-1 z-[999]">

                                {[
                                    "Títulos",
                                    "Baixa de Título (Lote)",
                                    "Protesto de Duplicatas",
                                    "Cancelar Duplicatas",
                                ].map((item) => (
                                    <div key={item}
                                        className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RELATÓRIOS */}
                    <div
                        className="group relative mt-1"
                        onMouseEnter={() => setActiveMenu("relatorios")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button
                            onClick={() => toggleMenu("relatorios")}
                            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                            rounded-md transition"
                        >
                            <BarChart3 className={`w-5 h-5 ${iconColor}`} />

                            {open && (
                                <>
                                    <span className="ml-3 flex-1 text-left">Relatórios</span>
                                    <ChevronRight
                                        size={14}
                                        className={`text-gray-500 transition-transform 
                                        ${activeMenu === "relatorios" ? "rotate-90" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        {activeMenu === "relatorios" && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 
                            shadow-xl rounded-md w-60 p-1 z-[999]">

                                {/* PAGAR */}
                                <div
                                    className="relative px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                                    onMouseEnter={() => setActiveSubMenu("rel-pagar")}
                                >
                                    Contas a Pagar
                                    <ChevronRight size={13} className="absolute right-2 top-2" />
                                </div>

                                {activeSubMenu === "rel-pagar" && (
                                    <div className="absolute left-full top-0 bg-white border border-gray-200 
                                    shadow-xl rounded-md w-60 p-1 z-[999]">

                                        {[
                                            "Títulos em Aberto",
                                            "Títulos Pagos",
                                            "Categoria de Pagamentos",
                                            "Fluxo de Vencimentos",
                                            "Títulos Gerais",
                                        ].map((item) => (
                                            <div key={item}
                                                className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* RECEBER */}
                                <div
                                    className="relative px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                                    onMouseEnter={() => setActiveSubMenu("rel-receber")}
                                >
                                    Contas a Receber
                                    <ChevronRight size={13} className="absolute right-2 top-2" />
                                </div>

                                {activeSubMenu === "rel-receber" && (
                                    <div className="absolute left-full top-0 bg-white border border-gray-200 
                                    shadow-xl rounded-md w-60 p-1 z-[999]">

                                        {[
                                            "Títulos Recebidos",
                                            "Títulos em Aberto",
                                            "Duplicatas por Período",
                                            "Saldo de Clientes",
                                            "Doctos Recebidos",
                                            "Títulos Gerais",
                                        ].map((item) => (
                                            <div key={item}
                                                className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* FATURAMENTO */}
                                <div
                                    className="relative px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                                    onMouseEnter={() => setActiveSubMenu("rel-fat")}
                                >
                                    Faturamento
                                    <ChevronRight size={13} className="absolute right-2 top-2" />
                                </div>

                                {activeSubMenu === "rel-fat" && (
                                    <div className="absolute left-full top-0 bg-white border border-gray-200 
                                    shadow-xl rounded-md w-60 p-1 z-[999]">

                                        {[
                                            "Faturamento Geral",
                                            "Faturas Emitidas",
                                            "CTRCs não Faturados",
                                            "CTRCs por Cliente/Divisão",
                                            "Demonstrativo de Fatura",
                                            "Faturas por Portador",
                                            "Demonstrativo de Resultado",
                                            "Balancete",
                                        ].map((item) => (
                                            <div key={item}
                                                className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                    Fluxo de Caixa
                                </div>

                                <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                    Categorias
                                </div>

                                <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                    Histórico Financeiro
                                </div>

                                <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
                                    Fornecedor
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ORÇAMENTO */}
                    <Link
                        className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1 text-gray-700 transition"
                        to="#"
                    >
                        <BarChart3 className={`w-5 h-5 ${iconColor}`} />
                        {open && <span className="ml-3 text-left">Orçamento</span>}
                    </Link>

                    {/* SAC */}
                    <div
                        className="group relative mt-1"
                        onMouseEnter={() => setActiveMenu("sac")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button
                            onClick={() => toggleMenu("sac")}
                            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                            rounded-md transition"
                        >
                            <Headphones className={`w-5 h-5 ${iconColor}`} />

                            {open && (
                                <>
                                    <span className="ml-3 flex-1 text-left">SAC</span>
                                    <ChevronRight
                                        size={14}
                                        className={`text-gray-500 transition-transform 
                                        ${activeMenu === "sac" ? "rotate-90" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        {activeMenu === "sac" && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 
                            shadow-xl rounded-md w-52 p-1 z-[999]">
                                <Link to="/sac-notafiscal" className="block px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700">Nota Fiscal</Link>
                                <Link to="/sac-conhecimento" className="block px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700">Conhecimento</Link>
                                <Link to="/sac-coleta" className="block px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer text-gray-700">Coleta</Link>
                            </div>
                        )}
                    </div>

                    {/* USUÁRIO */}
                    <div
                        className="group relative mt-1"
                        onMouseEnter={() => setActiveMenu("usuario")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button
                            onClick={() => toggleMenu("usuario")}
                            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                            rounded-md transition"
                        >
                            <UserCircle2 className={`w-5 h-5 ${iconColor}`} />

                            {open && (
                                <>
                                    <span className="ml-3 flex-1 text-left">Usuário</span>
                                    <ChevronRight
                                        size={14}
                                        className={`text-gray-500 transition-transform 
                                        ${activeMenu === "usuario" ? "rotate-90" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        {activeMenu === "usuario" && (
                            <div className="absolute top-0 left-full bg-white border border-gray-200 
                            shadow-xl rounded-md w-56 p-1 z-[999]">
                                <div
                                    className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                                    onClick={() => setShowAlterarSenha(true)}
                                >
                                    Alterar Senha
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CHAT */}
                    <button
                        onClick={() => setChatOpen(!chatOpen)}
                        className="flex items-center w-full px-2 py-2 hover:bg-gray-100 
                        rounded-md mt-1 transition"
                    >
                        <MessageSquare className={`w-5 h-5 ${iconColor}`} />
                        {open && <span className="ml-3 flex-1 text-left">Chat</span>}

                        {contatosComMensagensNaoLidas > 0 && (
                            <span
                                className="ml-auto bg-red-600 text-white text-[10px] px-2 py-[1px] rounded-full"
                            >
                                {contatosComMensagensNaoLidas}
                            </span>
                        )}
                    </button>
                </nav>

                {/* LOGOUT */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center">
                    <button
                        onClick={() => {
                            if (window.opener) {
                                window.opener.postMessage({ action: "modulo-fechado" }, "*");
                            }
                            window.close();
                        }}
                        className="bg-red-700 hover:bg-red-800 text-white p-3 rounded-full shadow transition"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </aside>

            {/* MODAL ALTERAR SENHA */}
            {showAlterarSenha && (
                <UsuarioAlterarSenha onClose={() => setShowAlterarSenha(false)} />
            )}

            {/* CHAT */}
            {chatOpen && (
                <div className="fixed right-0 top-[48px] w-80 h-[calc(100vh-48px)] 
                bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col">
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

                    {/* LISTA */}
                    {!chatAtivo && (
                        <div className="flex-1 overflow-y-auto">
                            {usuarios.map((u) => (
                                <div
                                    key={u.nome}
                                    onClick={() => {
                                        setChatAtivo(u);
                                        setUsuarios((prev) =>
                                            prev.map((x) =>
                                                x.nome === u.nome ? { ...x, naoLidas: 0 } : x
                                            )
                                        );
                                    }}
                                    className="relative flex items-center justify-between px-3 py-2 
                                    hover:bg-gray-50 cursor-pointer border-b"
                                >
                                    <div className="flex items-center gap-2">
                                        {u.online ? (
                                            <CircleDot className="text-green-500 w-3 h-3" />
                                        ) : (
                                            <Circle className="text-gray-400 w-3 h-3" />
                                        )}
                                        <span className="font-medium text-sm">{u.nome}</span>
                                    </div>

                                    {u.naoLidas > 0 && (
                                        <span
                                            className="bg-red-600 text-white text-[10px] px-2 py-[1px] rounded-full"
                                        >
                                            {u.naoLidas}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CHAT INDIVIDUAL */}
                    {chatAtivo && (
                        <div className="flex flex-col flex-1">
                            <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                                {mensagens
                                    .filter(
                                        (m) =>
                                            (m.de === usuarioLogado && m.para === chatAtivo.nome) ||
                                            (m.para === usuarioLogado && m.de === chatAtivo.nome)
                                    )
                                    .map((m, i) => (
                                        <div
                                            key={i}
                                            className={`mb-2 flex ${m.de === usuarioLogado
                                                ? "justify-end"
                                                : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`inline-block max-w-[80%] rounded-lg px-3 py-1 shadow-sm 
                                                ${m.de === usuarioLogado
                                                        ? "bg-green-700 text-white"
                                                        : "bg-gray-200 text-gray-800"}`}
                                            >
                                                {m.texto}
                                                <div className="text-[10px] mt-1 opacity-70 text-right">
                                                    {m.hora}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="flex border-t p-2 gap-2 relative">
                                <input
                                    type="text"
                                    value={novaMensagem}
                                    onChange={(e) => setNovaMensagem(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                                    placeholder={`Mensagem para ${chatAtivo.nome}...`}
                                    className="flex-1 border rounded px-2 py-1 text-sm"
                                />

                                <button
                                    onClick={() => setMostrarEmoji(!mostrarEmoji)}
                                    className="text-gray-500 hover:text-green-700"
                                >
                                    😊
                                </button>

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

                                <button
                                    onClick={enviarMensagem}
                                    className="bg-green-700 text-white px-3 rounded"
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
