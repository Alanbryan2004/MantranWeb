// src/pages/HomeModulos.jsx
import { useEffect } from "react";
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
    LogOut,
} from "lucide-react";

export default function HomeModulos() {
    // Evita logout ao atualizar aba
    useEffect(() => {
        const user = localStorage.getItem("usuarioNome");
        if (!user) window.location.href = "/login";
    }, []);

    const modulos = [
        { nome: "Operação", rota: "/modulo-operacao", icon: <Truck size={36} />, ativo: true },
        { nome: "Financeiro", rota: "/modulo-financeiro", icon: <DollarSign size={36} />, ativo: false },
        { nome: "EDI", rota: "/modulo-edi", icon: <FileCode size={36} />, ativo: false },
        { nome: "EDI XML", rota: "/modulo-edi-xml", icon: <FileCode size={36} />, ativo: false },
        { nome: "Oficina", rota: "/modulo-oficina", icon: <Wrench size={36} />, ativo: false },
        { nome: "Indicadores", rota: "/modulo-indicadores", icon: <BarChart3 size={36} />, ativo: false },
        { nome: "Gerador de Relatório", rota: "/modulo-relatorios", icon: <FileText size={36} />, ativo: false },
        { nome: "Comercial", rota: "/modulo-comercial", icon: <Briefcase size={36} />, ativo: false },
        { nome: "CRM", rota: "/modulo-crm", icon: <Users size={36} />, ativo: false },
        { nome: "Segurança", rota: "/modulo-seguranca", icon: <ShieldCheck size={36} />, ativo: false },
        { nome: "WMS", rota: "/modulo-wms", icon: <Boxes size={36} />, ativo: false },
        { nome: "WMS Coletor", rota: "/modulo-wms-coletor", icon: <ScanBarcode size={36} />, ativo: false },
        { nome: "Roteirizador", rota: "/modulo-roteirizador", icon: <Route size={36} />, ativo: false },
        { nome: "Baixa XML", rota: "/modulo-baixa-xml", icon: <FileCheck size={36} />, ativo: false },
        { nome: "Mantran Vendas", rota: "/modulo-vendas", icon: <ShoppingBag size={36} />, ativo: false },
        { nome: "Marítimo", rota: "/modulo-maritimo", icon: <Ship size={36} />, ativo: false },
        { nome: "Costado", rota: "/modulo-costado", icon: <Anchor size={36} />, ativo: false },
    ];

    const abrirModulo = (modulo) => {
        if (!modulo.ativo) {
            alert("🚧 Este módulo ainda não está disponível.");
            return;
        }
        window.open(modulo.rota, modulo.nome, "noopener,noreferrer");
    };

    return (
        <div className="p-6 pt-4">

            {/* ================= HEADER SUPERIOR ================= */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-700">
                    Mantran Web — Módulos Disponíveis
                </h1>

                {/* Botão Logout */}
                <button
                    onClick={() => {
                        localStorage.removeItem("usuarioNome");
                        window.close(); // fecha aba do módulo
                        window.location.href = "/login"; // fallback
                    }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 
                               text-white px-4 py-2 rounded-lg shadow"
                >
                    <LogOut size={18} /> Sair
                </button>
            </div>

            {/* ================= GRID DE MÓDULOS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {modulos.map((m, idx) => (
                    <div
                        key={idx}
                        onClick={() => abrirModulo(m)}
                        className={`
                            cursor-pointer bg-white border border-gray-300 
                            rounded-xl p-6 shadow hover:shadow-xl 
                            transition-all flex flex-col items-center text-center
                            ${m.ativo ? "hover:border-red-700" : "opacity-50 cursor-not-allowed"}
                        `}
                    >
                        <div className="text-red-700 mb-3">{m.icon}</div>
                        <h2 className="font-semibold text-gray-700 text-lg">{m.nome}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
