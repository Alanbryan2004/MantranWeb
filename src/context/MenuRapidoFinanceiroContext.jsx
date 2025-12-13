// src/context/MenuRapidoFinanceiroContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

/* =====================================================
   CONTEXT
===================================================== */
const MenuRapidoFinanceiroContext = createContext();

/* =====================================================
   CATÁLOGO FINANCEIRO (fonte única da verdade)
   -> Igual ao conceito do WMS
===================================================== */
const CATALOGO_FINANCEIRO = [
    {
        id: "contas-pagar",
        label: "Contas a Pagar",
        rota: "/contas-pagar",
        icone: "fa-money-bill",
    },
    {
        id: "contas-receber",
        label: "Contas a Receber",
        rota: "/financeiro-receber",
        icone: "fa-file-invoice-dollar",
    },
    {
        id: "fluxo-caixa",
        label: "Fluxo de Caixa",
        rota: "/financeiro-fluxo",
        icone: "fa-chart-line",
    },
    {
        id: "faturamento",
        label: "Faturamento",
        rota: "/faturamento",
        icone: "fa-receipt",
    },
    {
        id: "boletos",
        label: "Boletos",
        rota: "/financeiro-boletos",
        icone: "fa-barcode",
    },
];

/* =====================================================
   NORMALIZAÇÃO CENTRAL DE ROTAS
===================================================== */
function normalizarRotaFinanceira(rota) {
    if (!rota) return "/modulo-financeiro";

    const rotaNormalizada = rota.startsWith("/") ? rota : `/${rota}`;

    if (rotaNormalizada.startsWith("/modulo-financeiro")) {
        return rotaNormalizada;
    }

    return `/modulo-financeiro${rotaNormalizada}`;
}

const STORAGE_KEY = "menuRapido_financeiro";

/* =====================================================
   PROVIDER
===================================================== */
export function MenuRapidoFinanceiroProvider({ children }) {
    const [atalhos, setAtalhos] = useState(() => {
        try {
            const salvo = localStorage.getItem(STORAGE_KEY);

            if (!salvo) {
                return CATALOGO_FINANCEIRO.map((a) => ({
                    ...a,
                    rota: normalizarRotaFinanceira(a.rota),
                    ativo: true,
                }));
            }

            const parsed = JSON.parse(salvo);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                return CATALOGO_FINANCEIRO.map((a) => ({
                    ...a,
                    rota: normalizarRotaFinanceira(a.rota),
                    ativo: true,
                }));
            }

            return parsed.map((a) => ({
                id: a.id ?? crypto.randomUUID(),
                label: a.label ?? "Atalho",
                rota: normalizarRotaFinanceira(a.rota),
                icone: a.icone ?? "fa-gear",
                ativo: a.ativo !== false,
            }));
        } catch {
            return CATALOGO_FINANCEIRO.map((a) => ({
                ...a,
                rota: normalizarRotaFinanceira(a.rota),
                ativo: true,
            }));
        }
    });

    /* =====================================================
       PERSISTÊNCIA
    ===================================================== */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(atalhos));
    }, [atalhos]);

    /* =====================================================
       FUNÇÕES
    ===================================================== */

    // ➕ Adiciona (ou reativa) atalho pela rota
    const adicionarAtalho = (atalho) => {
        setAtalhos((prev) => {
            const rotaNormalizada = normalizarRotaFinanceira(atalho.rota);

            const existe = prev.some((a) => a.rota === rotaNormalizada);

            if (existe) {
                return prev.map((a) =>
                    a.rota === rotaNormalizada
                        ? { ...a, ...atalho, rota: rotaNormalizada, ativo: true }
                        : a
                );
            }

            return [
                ...prev,
                {
                    ...atalho,
                    rota: rotaNormalizada,
                    ativo: true,
                },
            ];
        });
    };

    // ❌ Remove por ID ou ROTA
    const removerAtalho = (idOuRota) => {
        setAtalhos((prev) =>
            prev.filter(
                (a) => a.id !== idOuRota && a.rota !== normalizarRotaFinanceira(idOuRota)
            )
        );
    };

    // 🔄 Alterna ativo
    const toggleAtalho = (idOuRota) => {
        setAtalhos((prev) =>
            prev.map((a) =>
                a.id === idOuRota || a.rota === normalizarRotaFinanceira(idOuRota)
                    ? { ...a, ativo: !a.ativo }
                    : a
            )
        );
    };

    // ♻️ Restaurar padrão
    const restaurarPadrao = () => {
        setAtalhos(
            CATALOGO_FINANCEIRO.map((a) => ({
                ...a,
                rota: normalizarRotaFinanceira(a.rota),
                ativo: true,
            }))
        );
    };

    const value = useMemo(
        () => ({
            atalhos,
            adicionarAtalho,
            removerAtalho,
            toggleAtalho,
            restaurarPadrao,
            CATALOGO_FINANCEIRO,
        }),
        [atalhos]
    );

    return (
        <MenuRapidoFinanceiroContext.Provider value={value}>
            {children}
        </MenuRapidoFinanceiroContext.Provider>
    );
}

/* =====================================================
   HOOK
===================================================== */
export function useMenuRapidoFinanceiro() {
    return useContext(MenuRapidoFinanceiroContext);
}
