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
    const [atalhos, setAtalhos] = useState(() => {
        const salvo = localStorage.getItem("menuRapido_financeiro");
        return salvo ? JSON.parse(salvo) : atalhosPadraoFinanceiro;
    });

    // Atualiza o localStorage quando houver alterações
    useEffect(() => {
        localStorage.setItem("menuRapido_financeiro", JSON.stringify(atalhos));
    }, [atalhos]);

    // Adicionar atalho
    const adicionarAtalho = (atalho) => {
        setAtalhos((prev) => [...prev, atalho]);
    };

    // Remover atalho por rota
    const removerAtalho = (rota) => {
        setAtalhos((prev) => prev.filter((a) => a.rota !== rota));
    };

    // Restaurar atalhos padrão
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
