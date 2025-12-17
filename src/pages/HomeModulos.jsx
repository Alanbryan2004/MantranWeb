import { useEffect, useState } from "react";
import { useModulos } from "../context/ModulosContext";

import {
    Truck,
    DollarSign,
    FileCode,
    Wrench,
    BarChart3,
    FileText,
    Briefcase,
    Users,
    ShieldCheck,
    Boxes,
    ScanBarcode,
    Route,
    FileCheck,
    ShoppingBag,
    Ship,
    Anchor,
    ChevronDown,
    LogOut,
} from "lucide-react";

import Logo from "../assets/logo_mantran.png";

export default function HomeModulos() {
    const { modulos } = useModulos();
    const [menuAberto, setMenuAberto] = useState(false);

    // Se não estiver logado → volta para login
    useEffect(() => {
        const user = localStorage.getItem("usuarioNome");
        if (!user) window.location.href = "/login";
    }, []);

    // 🔥 Escuta logout vindo dos módulos abertos em outras abas
    useEffect(() => {
        const receberMensagem = (event) => {
            if (event.data?.action === "logout") {
                localStorage.removeItem("usuarioNome");
                window.location.href = "/login";
            }
        };

        window.addEventListener("message", receberMensagem);
        return () => window.removeEventListener("message", receberMensagem);
    }, []);

    // 🔗 Lista de módulos (chave = ModulosContext)
    const modulosLista = [
        { key: "operacao", nome: "Operação", rota: "/modulo-operacao", icon: <Truck size={36} /> },
        { key: "financeiro", nome: "Financeiro", rota: "/modulo-financeiro", icon: <DollarSign size={36} /> },
        { key: "ediXml", nome: "EDI XML", rota: "/modulo-edi-xml", icon: <FileCode size={36} /> },
        { key: "oficina", nome: "Oficina", rota: "/modulo-oficina", icon: <Wrench size={36} /> },
        { key: "bi", nome: "Indicadores", rota: "/modulo-indicadores", icon: <BarChart3 size={36} /> },
        { key: "relatorios", nome: "Gerador de Relatório", rota: "/modulo-relatorios", icon: <FileText size={36} /> },
        { key: "comercial", nome: "Comercial", rota: "/modulo-comercial", icon: <Briefcase size={36} /> },
        { key: "crm", nome: "CRM", rota: "/modulo-crm", icon: <Users size={36} /> },
        { key: "seguranca", nome: "Segurança", rota: "/modulo-seguranca", icon: <ShieldCheck size={36} /> },
        { key: "wms", nome: "WMS", rota: "/modulo-wms", icon: <Boxes size={36} /> },
        { key: "mobile", nome: "WMS Coletor", rota: "/modulo-wms-coletor", icon: <ScanBarcode size={36} /> },
        { key: "roteirizador", nome: "Roteirizador", rota: "/modulo-roteirizador", icon: <Route size={36} /> },
        { key: "baixaXml", nome: "Baixa XML", rota: "/modulo-baixa-xml", icon: <FileCheck size={36} /> },
        { key: "vendas", nome: "Mantran Vendas", rota: "/modulo-vendas", icon: <ShoppingBag size={36} /> },
        { key: "localize", nome: "Localize Cargas", rota: "/modulo-localize", icon: <Anchor size={36} /> },
        { key: "ecommerce", nome: "E-commerce", rota: "/modulo-ecommerce", icon: <Ship size={36} /> },
    ];

    const abrirModulo = (modulo) => {
        if (!modulos[modulo.key]) {
            alert("🚧 Módulo não contratado.");
            return;
        }
        window.open(modulo.rota, modulo.nome, "noopener,noreferrer");
    };

    return (
        <div className="h-screen bg-gray-100">

            {/* ===== HEADER SIMPLES ===== */}
            <header className="fixed top-0 left-0 right-0 z-50 h-[48px] bg-white border-b shadow-sm">
                <div className="h-full px-6 flex items-center justify-between">

                    {/* LOGO */}
                    <img src={Logo} className="h-7" alt="Mantran" />

                    {/* USUÁRIO */}
                    <div className="relative">
                        <button
                            onClick={() => setMenuAberto(!menuAberto)}
                            className="flex items-center gap-1 text-xl font-semibold text-red-700 hover:text-gray-700"
                        >
                            {localStorage.getItem("usuarioNome")}
                            <ChevronDown size={16} />
                        </button>

                        {menuAberto && (
                            <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow">
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("usuarioNome");
                                        window.location.href = "/login";
                                    }}
                                    className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-700
                                               hover:text-gray-700"
                                >
                                    <LogOut size={18} />
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ===== CONTEÚDO COM SCROLL ===== */}
            <div className="pt-[48px] p-6 h-full overflow-y-auto">

                {/* GRID DE MÓDULOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {modulosLista.map((m, idx) => (
                        <div
                            key={idx}
                            onClick={() => abrirModulo(m)}
                            className={`
                                cursor-pointer bg-white border border-gray-300
                                rounded-xl p-6 shadow transition-all
                                flex flex-col items-center text-center
                                ${modulos[m.key]
                                    ? "hover:shadow-xl hover:border-red-700"
                                    : "opacity-50 cursor-not-allowed"
                                }
                            `}
                        >
                            <div className="text-red-700 mb-3">{m.icon}</div>
                            <h2 className="font-semibold text-gray-700 text-lg">
                                {m.nome}
                            </h2>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
