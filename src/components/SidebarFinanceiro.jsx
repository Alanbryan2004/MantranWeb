// src/components/SidebarFinanceiro.jsx
import { useState } from "react";
import {
    BarChart3,
    DollarSign,
    FileText,
    Receipt,
    Settings,
    ChevronRight,
} from "lucide-react";

export default function SidebarFinanceiro({ open }) {
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <aside
            className={`
                ${open ? "w-60" : "w-14"}
                bg-white border-r border-gray-300 h-full
                transition-all duration-300 flex flex-col
            `}
        >
            {/* MENU */}
            <nav className="flex-1 overflow-y-auto mt-2">

                {/* DASHBOARD */}
                <SidebarItem
                    open={open}
                    label="Dashboard"
                    icon={<BarChart3 className="text-green-700" size={20} />}
                    rota="/financeiro-dashboard"
                />

                {/* CONTAS A RECEBER */}
                <SidebarItem
                    open={open}
                    label="Contas a Receber"
                    icon={<DollarSign className="text-green-700" size={20} />}
                    rota="/financeiro-receber"
                />

                {/* CONTAS A PAGAR */}
                <SidebarItem
                    open={open}
                    label="Contas a Pagar"
                    icon={<Receipt className="text-green-700" size={20} />}
                    rota="/financeiro-pagar"
                />

                {/* FATURAMENTO */}
                <SidebarItem
                    open={open}
                    label="Faturamento"
                    icon={<FileText className="text-green-700" size={20} />}
                    rota="/financeiro-faturamento"
                />

                {/* PARAMETROS */}
                <SidebarItem
                    open={open}
                    label="Parâmetros"
                    icon={<Settings className="text-green-700" size={20} />}
                    rota="/financeiro-parametros"
                />

            </nav>
        </aside>
    );
}

function SidebarItem({ open, icon, label, rota }) {
    return (
        <a
            href={rota}
            className="
                flex items-center gap-3 px-3 py-2
                text-[14px] text-gray-700
                hover:bg-green-100 hover:text-green-700
                transition-all cursor-pointer
            "
        >
            {icon}
            {open && <span>{label}</span>}
        </a>
    );
}
