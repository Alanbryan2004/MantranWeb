import { useEffect, useMemo } from "react";
import { useIconColor } from "../context/IconColorContext";

export default function HomeOperacao() {
    const { setIconColor } = useIconColor();

    useEffect(() => {
        // 🔴 Cor padrão do módulo Operação
        setIconColor("text-red-700");

        // 🏷️ Título da guia do navegador
        document.title = "Mantran - Operação";
    }, [setIconColor]);

    // Hoje você salva assim no Parametro.jsx: localStorage.setItem("param_logoBg", ...)
    // então a Home precisa ler a mesma chave:
    const logoBg = useMemo(() => localStorage.getItem("param_logoBg"), []);

    return (
        <div className="relative min-h-[calc(100vh-48px)] p-6">
            {/* Marca d'água */}
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

            {/* Conteúdo */}
            <div className="relative z-10">
                {/* seus cards/atalhos/etc */}
            </div>
        </div>
    );
}
