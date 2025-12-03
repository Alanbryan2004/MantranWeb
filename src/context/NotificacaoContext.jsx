import { createContext, useContext, useEffect, useState } from "react";
import { useAgenda } from "./AgendaContext";

const NotificacaoContext = createContext();

export function useNotificacao() {
    return useContext(NotificacaoContext);
}

export function NotificacaoProvider({ children }) {
    const { getEventosVisiveis } = useAgenda();
    const [notificacoes, setNotificacoes] = useState([]);

    useEffect(() => {
        // roda uma vez ao montar
        verificarEventos();

        // depois verifica a cada 30s
        const interval = setInterval(() => verificarEventos(), 30 * 1000);
        return () => clearInterval(interval);
    }, [getEventosVisiveis]);

    function verificarEventos() {
        const agora = new Date();
        const eventos = getEventosVisiveis();

        setNotificacoes((prev) => {
            const novas = eventos
                // só eventos com lembrete configurado
                .filter((ev) => ev.lembreteMinutosAntes > 0)
                // só eventos dentro da janela de lembrete → evento futuro, mas lembrete já disparou
                .filter((ev) => {
                    const eventoData = new Date(ev.start);
                    const lembreteData = new Date(
                        eventoData.getTime() - ev.lembreteMinutosAntes * 60000
                    );
                    return lembreteData <= agora && eventoData >= agora;
                })
                // monta a notificação mantendo o "lido" se já existia
                .map((ev) => {
                    const existente = prev.find((n) => n.id === ev.id);
                    return {
                        id: ev.id,
                        titulo: ev.titulo,
                        start: ev.start,
                        tipo: ev.tipo,
                        origem: "agenda",
                        lido: existente?.lido ?? false,
                    };
                });

            return novas;
        });
    }

    function marcarComoLido(id) {
        setNotificacoes((prev) =>
            prev.map((n) => (n.id === id ? { ...n, lido: true } : n))
        );
    }

    return (
        <NotificacaoContext.Provider value={{ notificacoes, marcarComoLido }}>
            {children}
        </NotificacaoContext.Provider>
    );
}
