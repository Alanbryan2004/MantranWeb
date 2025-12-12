// src/context/MenuRapidoFinanceiroContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// --- ATALHOS PADRÃO DO FINANCEIRO ---
const atalhosPadraoFinanceiro = [
    { id: 1, label: "Contas a Pagar", rota: "/contas-pagar", icone: "fa-money-bill" },
    { id: 2, label: "Contas a Receber", rota: "/financeiro-receber", icone: "fa-file-invoice-dollar" },
    { id: 3, label: "Fluxo de Caixa", rota: "/financeiro-fluxo", icone: "fa-chart-line" },
    { id: 4, label: "Faturamento", rota: "/faturamento", icone: "fa-receipt" },
    { id: 5, label: "Boletos", rota: "/financeiro-boletos", icone: "fa-barcode" },
];

// 🔒 NORMALIZAÇÃO CENTRAL
function normalizarRotaFinanceira(rota) {
    if (!rota) return "/modulo-financeiro";

    // Garante barra inicial
    const rotaNormalizada = rota.startsWith("/") ? rota : `/${rota}`;

    // Se já for financeiro, mantém
    if (rotaNormalizada.startsWith("/modulo-financeiro")) {
        return rotaNormalizada;
    }

    // Prefixa automaticamente
    return `/modulo-financeiro${rotaNormalizada}`;
}

const MenuRapidoFinanceiroContext = createContext();

export function MenuRapidoFinanceiroProvider({ children }) {

    const [atalhos, setAtalhos] = useState(() => {
        try {
            const salvo = localStorage.getItem("menuRapido_financeiro");

            const base = salvo ? JSON.parse(salvo) : atalhosPadraoFinanceiro;

            if (!Array.isArray(base)) return atalhosPadraoFinanceiro;

            // 🔒 NORMALIZA TODAS AS ROTAS AO CARREGAR
            return base.map((a) => ({
                ...a,
                rota: normalizarRotaFinanceira(a.rota),
            }));
        } catch {
            return atalhosPadraoFinanceiro.map((a) => ({
                ...a,
                rota: normalizarRotaFinanceira(a.rota),
            }));
        }
    });

    // Atualiza o localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem("menuRapido_financeiro", JSON.stringify(atalhos));
    }, [atalhos]);

    // ➕ ADICIONAR NOVO ATALHO
    const adicionarAtalho = (atalho) => {
        setAtalhos((prev) => {
            const rotaNormalizada = normalizarRotaFinanceira(atalho.rota);

            if (prev.some((a) => a.rota === rotaNormalizada)) return prev;

            return [
                ...prev,
                {
                    ...atalho,
                    rota: rotaNormalizada,
                },
            ];
        });
    };

    // ❌ REMOVER atalho por rota
    const removerAtalho = (rota) => {
        const rotaNormalizada = normalizarRotaFinanceira(rota);

        setAtalhos((prev) => prev.filter((a) => a.rota !== rotaNormalizada));
    };

    // 🔄 RESTAURAR padrão
    const restaurarPadrao = () => {
        setAtalhos(
            atalhosPadraoFinanceiro.map((a) => ({
                ...a,
                rota: normalizarRotaFinanceira(a.rota),
            }))
        );
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
