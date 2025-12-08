// src/components/HeaderFinanceiro.jsx
import { LogOut } from "lucide-react";

export default function HeaderFinanceiro({ toggleSidebar }) {
    return (
        <header className="h-[50px] bg-gradient-to-r from-green-700 to-black text-white flex items-center px-4 shadow">
            {/* Botão para abrir/fechar o sidebar */}
            <button
                onClick={toggleSidebar}
                className="mr-4 text-white hover:text-green-300"
            >
                <i className="fa-solid fa-bars text-xl"></i>
            </button>

            {/* Título do módulo */}
            <h1 className="text-lg font-semibold flex-1">Financeiro</h1>

            {/* Botão Logout */}
            <button
                className="flex items-center gap-1 text-white hover:text-green-300"
                onClick={() => window.onLogout && window.onLogout()}
            >
                <LogOut size={20} />
                <span className="hidden md:inline">Sair</span>
            </button>
        </header>
    );
}
