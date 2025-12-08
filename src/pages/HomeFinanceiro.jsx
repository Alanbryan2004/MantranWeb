// src/pages/HomeFinanceiro.jsx
import { useEffect } from "react";
import { useIconColor } from "../context/IconColorContext";

export default function HomeFinanceiro() {
    const { setIconColor } = useIconColor();

    useEffect(() => {
        setIconColor("text-green-700");
    }, [setIconColor]);

    return (
        <main className="flex-1 p-4 overflow-auto">
            <h1 className="text-2xl font-bold text-green-700 mb-2">
                Módulo Financeiro
            </h1>

            <p className="text-gray-600">
                Selecione uma opção na barra lateral.
            </p>
        </main>
    );
}
