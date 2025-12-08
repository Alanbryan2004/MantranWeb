// src/pages/HomeFinanceiro.jsx
import { useEffect } from "react";
import { useIconColor } from "../context/IconColorContext";

export default function HomeFinanceiro() {
    const { setIconColor } = useIconColor();

    useEffect(() => {
        setIconColor("text-green-700");
    }, [setIconColor]);

    return (
        <main className="flex-1 p-4 overflow-auto mt-4 ml-4">

        </main>
    );
}
