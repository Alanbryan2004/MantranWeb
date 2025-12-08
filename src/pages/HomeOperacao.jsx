// src/pages/HomeOperacao.jsx
import { useEffect } from "react";
import { useIconColor } from "../context/IconColorContext";

export default function HomeOperacao() {
    const { setIconColor } = useIconColor();

    useEffect(() => {
        setIconColor("text-red-700");
    }, [setIconColor]);

    return (
        <div className="p-6">

        </div>
    );
}
