import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import UsuarioAlterarSenha from "../pages/UsuarioAlterarSenha";
import { useIconColor } from "../context/IconColorContext";
import { Link } from "react-router-dom";

import {
    Boxes,
    Users,
    Warehouse,
    Map,
    ClipboardList,
    Package,
    FileText,
    BarChart3,
    UploadCloud,
    ChevronRight,
    UserCircle2,
    MessageSquare,
    CircleDot,
    Circle,
    Send,
    LogOut,
    X,
} from "lucide-react";

export default function SidebarWMS({ open }) {
    const { iconColor } = useIconColor();

    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    /* ===================== CHAT (PADRÃO MANTRAN) ===================== */
    const [chatOpen, setChatOpen] = useState(false);
    const [chatAtivo, setChatAtivo] = useState(null);
    const [novaMensagem, setNovaMensagem] = useState("");
    const [mostrarEmoji, setMostrarEmoji] = useState(false);
    const [mensagens, setMensagens] = useState([]);
    const [showAlterarSenha, setShowAlterarSenha] = useState(false);
    const [contatosComMensagensNaoLidas, setContatosComMensagensNaoLidas] = useState(0);

    const [usuarios, setUsuarios] = useState([
        { nome: "Alan", online: true, ultimaMsg: "Olá!", naoLidas: 0 },
        { nome: "Admin", online: false, ultimaMsg: "Atualizando dados", naoLidas: 0 },
        { nome: "Fernanda", online: true, ultimaMsg: "Pode revisar o estoque?", naoLidas: 0 },
        { nome: "Filipe", online: true, ultimaMsg: "Recebimento OK 👍", naoLidas: 0 },
    ]);

    const [socket, setSocket] = useState(null);
    const usuarioLogado = localStorage.getItem("usuarioNome") || "WMS";

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

                setUsuarios((prev) => {
                    const atualizados = prev.map((u) =>
                        u.nome === (msg.de === usuarioLogado ? msg.para : msg.de)
                            ? {
                                ...u,
                                ultimaMsg: msg.texto,
                                naoLidas:
                                    msg.para === usuarioLogado
                                        ? (u.naoLidas || 0) + 1
                                        : u.naoLidas,
                            }
                            : u
                    );

                    setContatosComMensagensNaoLidas(
                        atualizados.filter((u) => u.naoLidas > 0).length
                    );

                    return atualizados;
                });
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
            {/* ================= SIDEBAR ================= */}
            <aside
                className={`bg-white border-r border-gray-200 shadow-lg fixed left-0 top-[48px]
                h-[calc(100vh-48px)] z-50 transition-all duration-300
                ${open ? "w-52" : "w-14"}`}
            >
                <nav className="p-2 text-sm text-gray-700">

                    {/* CADASTRO */}
                    <Menu icon={Boxes} label="Cadastro" menuKey="cadastro" items={[
                        "Empresa",
                        "Filial",
                        "Produto",
                        "Embalagem",
                        "Unidade Medida",
                        "Tipo Palete",
                        "Tabela de Cores",
                        "Cliente Produto",
                    ]} />

                    <MenuSimples icon={Users} label="Cliente" />

                    <Menu icon={Warehouse} label="Armazém" menuKey="armazem" items={[
                        "Depósito",
                        "Área",
                        "Endereço",
                        "Operador",
                        {
                            label: "Recebimento",
                            children: [
                                "Status NF Entrada",
                                "Agenda de Recebimento",
                                "Painel Conferência Entrada",
                                "Divergência Entrada",
                            ],
                        },
                        {
                            label: "Expedição",
                            children: [
                                "OS Carregamento",
                                "OS Carregamento CrossDocking",
                                "OS Carregamento Embalagem",
                                "Painel Separação Saída",
                                "Conferência Embarque",
                            ],
                        },
                        "Movimentação Armazém",
                        "Tabela Preço Armazenamento",
                        "Cobrança Armazenamento",
                    ]} />

                    <MenuSimples icon={Map} label="Mapa" />

                    <Menu icon={ClipboardList} label="Ordem de Serviço" menuKey="os" items={[
                        "Packlist Entrada",
                        "Packlist Nota Fiscal",
                        "Separação Saída",
                        "Pedido Carga",
                    ]} />

                    <Menu icon={Package} label="Estoque" menuKey="estoque" items={[
                        "Consultas",
                        "Inventário Inicial",
                        "Inventário",
                        "Correção Estoque",
                    ]} />

                    <Menu icon={FileText} label="Nota Fiscal" menuKey="nf" items={[
                        { label: "Entrada", to: "/modulo-wms/nf-entrada" },
                        { label: "Saída", to: "/modulo-wms/nf-saida" },
                        "Parâmetros NFe",
                        "NFe CCE",
                    ]} />

                    <Menu icon={BarChart3} label="Relatórios" menuKey="rel" items={[
                        {
                            label: "Estoque Armazém",
                            children: [
                                "Estoque Analítico / Sintético",
                                "Movimentação",
                                "Notas Fiscais",
                                "Estoque em Trânsito",
                                "Rastreabilidade Produto",
                                "Reserva Liberada",
                                "Produto Cliente",
                            ],
                        },
                        "Etiqueta Conferência",
                        "Etiqueta Endereçamento",
                    ]} />

                    <Menu icon={UploadCloud} label="XML" menuKey="xml" items={[
                        "Importação de Nota",
                        "Importação de Notas em Lote",
                    ]} />

                    <MenuSimples icon={BarChart3} label="Gráficos" />

                    <Menu
                        icon={UserCircle2}
                        label="Usuário"
                        menuKey="usuario"
                        items={[
                            {
                                label: "Alterar Senha",
                                action: () => setShowAlterarSenha(true),
                            },
                        ]}
                    />

                    {/* CHAT */}
                    <button
                        onClick={() => setChatOpen(!chatOpen)}
                        className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1 relative"
                    >
                        <MessageSquare className={`w-5 h-5 ${iconColor}`} />
                        {open && <span className="ml-3">Chat</span>}
                        {contatosComMensagensNaoLidas > 0 && (
                            <span className="absolute right-2 top-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                {contatosComMensagensNaoLidas}
                            </span>
                        )}
                    </button>
                </nav>

                {/* LOGOUT */}
                <div className="absolute bottom-4 w-full flex justify-center">
                    <button
                        onClick={() => window.close()}
                        className="bg-red-700 hover:bg-red-800 text-white p-3 rounded-full"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {showAlterarSenha && (
                <UsuarioAlterarSenha onClose={() => setShowAlterarSenha(false)} />
            )}

            {/* ================= PAINEL CHAT ================= */}
            {chatOpen && (
                <div className="fixed right-0 top-[48px] w-80 h-[calc(100vh-48px)] bg-white border-l shadow-xl z-40 flex flex-col">
                    <div className="flex justify-between items-center p-3 border-b">
                        <span className="font-semibold text-sm">
                            {chatAtivo ? `Chat com ${chatAtivo.nome}` : "Mensagens"}
                        </span>
                        <button onClick={() => chatAtivo ? setChatAtivo(null) : setChatOpen(false)}>
                            <X size={16} />
                        </button>
                    </div>

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
                                    className="px-3 py-2 border-b hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        {u.online ? (
                                            <CircleDot className="text-green-500 w-3 h-3" />
                                        ) : (
                                            <Circle className="text-gray-400 w-3 h-3" />
                                        )}
                                        <span className="text-sm font-medium">{u.nome}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">{u.ultimaMsg}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {chatAtivo && (
                        <>
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
                                            className={`mb-2 flex ${m.de === usuarioLogado ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`px-3 py-1 rounded-lg text-sm shadow
                                                ${m.de === usuarioLogado
                                                    ? "bg-red-600 text-white"
                                                    : "bg-white text-gray-800"}`}
                                            >
                                                {m.texto}
                                                <div className="text-[10px] opacity-70">{m.hora}</div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="flex items-center gap-2 border-t p-2">
                                <input
                                    value={novaMensagem}
                                    onChange={(e) => setNovaMensagem(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                                    className="flex-1 border rounded px-2 py-1 text-sm"
                                    placeholder={`Mensagem para ${chatAtivo.nome}`}
                                />

                                <button onClick={() => setMostrarEmoji(!mostrarEmoji)}>😊</button>

                                {mostrarEmoji && (
                                    <div className="absolute bottom-14 right-14 z-50">
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setNovaMensagem((p) => p + e.emoji);
                                                setMostrarEmoji(false);
                                            }}
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={enviarMensagem}
                                    className="bg-red-700 text-white p-2 rounded"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );

    /* ================= COMPONENTES AUXILIARES ================= */

    function Menu({ icon: Icon, label, menuKey, items }) {
        return (
            <div
                className="group relative mt-1"
                onMouseEnter={() => setActiveMenu(menuKey)}
                onMouseLeave={() => {
                    setActiveMenu(null);
                    setActiveSubMenu(null);
                }}
            >
                <button
                    onClick={() => toggleMenu(menuKey)}
                    className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md"
                >
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                    {open && (
                        <>
                            <span className="ml-3 flex-1 text-left">{label}</span>
                            <ChevronRight
                                size={14}
                                className={`transition-transform ${activeMenu === menuKey ? "rotate-90" : ""}`}
                            />
                        </>
                    )}
                </button>

                {activeMenu === menuKey && (
                    <div className="absolute top-0 left-full bg-white border shadow-xl rounded-md w-56 p-1 z-[999]">
                        {items.map((item) =>
                            typeof item === "string" ? (
                                <div key={item} className="px-3 py-[2px] hover:bg-gray-100 rounded">
                                    {item}
                                </div>
                            ) : item.to ? (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                                    onClick={() => toggleMenu(menuKey)} // fecha submenu se quiser
                                >
                                    {item.label}
                                </Link>
                            ) : item.action ? (
                                <button
                                    key={item.label}
                                    onClick={item.action}
                                    className="w-full text-left px-3 py-[2px] hover:bg-gray-100 rounded"
                                >
                                    {item.label}
                                </button>
                            ) : (
                                <div
                                    key={item.label}
                                    className="relative px-3 py-[2px] hover:bg-gray-100 rounded"
                                    onMouseEnter={() => setActiveSubMenu(item.label)}
                                >
                                    {item.label}
                                    <ChevronRight size={13} className="absolute right-2 top-2" />

                                    {activeSubMenu === item.label && (
                                        <div className="absolute left-full top-0 bg-white border shadow-xl rounded-md w-64 p-1">
                                            {item.children.map((sub) => (
                                                <div key={sub} className="px-3 py-[2px] hover:bg-gray-100 rounded">
                                                    {sub}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        );
    }

    function MenuSimples({ icon: Icon, label }) {
        return (
            <button className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1">
                <Icon className={`w-5 h-5 ${iconColor}`} />
                {open && <span className="ml-3">{label}</span>}
            </button>
        );
    }
}
