// src/pages/HomeFinanceiro.jsx
import { useEffect, useMemo } from "react";
import { useIconColor } from "../context/IconColorContext";

export default function HomeFinanceiro() {
    const { setIconColor } = useIconColor();

    useEffect(() => {
        setIconColor("text-green-700");
    }, [setIconColor]);

    // Mesmo padrão usado no Operação
    const logoBg = useMemo(() => localStorage.getItem("param_logoBg"), []);

    return (
        <main className="relative flex-1 min-h-[calc(100vh-48px)] p-4 overflow-auto mt-4 ml-4">
            {/* MARCA D'ÁGUA */}
            {logoBg && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `url(${logoBg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "35%",
                        opacity: 0.28,
                    }}
                />
            )}

            {/* CONTEÚDO REAL */}
            <div className="relative z-10">
                {/* cards, gráficos, grids do financeiro */}
            </div>
        </main>
    );
}
