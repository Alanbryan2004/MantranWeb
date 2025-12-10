// src/context/MenuRapidoFinanceiroContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// --- ATALHOS PADRÃO DO FINANCEIRO ---
const atalhosPadraoFinanceiro = [
    { id: 1, label: "Títulos a Pagar", rota: "/financeiro-pagar", icone: "fa-money-bill" },
    { id: 2, label: "Títulos a Receber", rota: "/financeiro-receber", icone: "fa-file-invoice-dollar" },
    { id: 3, label: "Fluxo de Caixa", rota: "/financeiro-fluxo", icone: "fa-chart-line" },
    { id: 4, label: "Faturamento", rota: "/faturamento", icone: "fa-receipt" },
    { id: 5, label: "Boletos", rota: "/financeiro-boletos", icone: "fa-barcode" },
];

const MenuRapidoFinanceiroContext = createContext();

export function MenuRapidoFinanceiroProvider({ children }) {

    // Carregar atalhos do localStorage com fallback seguro
    const [atalhos, setAtalhos] = useState(() => {
        try {
            const salvo = localStorage.getItem("menuRapido_financeiro");

            if (!salvo) return atalhosPadraoFinanceiro;

            const parsed = JSON.parse(salvo);

            // Segurança: se corrompido, volta ao default
            if (!Array.isArray(parsed)) return atalhosPadraoFinanceiro;

            return parsed;
        } catch {
            return atalhosPadraoFinanceiro;
        }
    });

    // Atualiza o localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem("menuRapido_financeiro", JSON.stringify(atalhos));
    }, [atalhos]);

    // ➕ ADICIONAR NOVO ATALHO — impede duplicidade por rota
    const adicionarAtalho = (atalho) => {
        setAtalhos((prev) => {
            if (prev.some((a) => a.rota === atalho.rota)) return prev; // evita duplicação
            return [...prev, atalho];
        });
    };

    // ❌ REMOVER atalho por rota
    const removerAtalho = (rota) => {
        setAtalhos((prev) => prev.filter((a) => a.rota !== rota));
    };

    // 🔄 RESTAURAR padrão
    const restaurarPadrao = () => {
        setAtalhos(atalhosPadraoFinanceiro);
    };

    return (
        <MenuRapidoFinanceiroContext.Provider
            value={{ atalhos, adicionarAtalho, removerAtalho, restaurarPadrao }}
        >
            {children}
        </MenuRapidoFinanceiroContext.Provider>
    );
}

export function useMenuRapidoFinanceiro() {
    return useContext(MenuRapidoFinanceiroContext);
}
