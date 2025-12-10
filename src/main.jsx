// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { IconColorProvider } from "./context/IconColorContext";
import { ModulosProvider } from "./context/ModulosContext";
import { MenuRapidoProvider } from "./context/MenuRapidoContext";

// Provider da Agenda
import { AgendaProvider } from "./context/AgendaContext";

// Provider das Notificações
import { NotificacaoProvider } from "./context/NotificacaoContext";

// ✅ Provider do Menu Rápido do Financeiro (NOVO)
import { MenuRapidoFinanceiroProvider } from "./context/MenuRapidoFinanceiroContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <IconColorProvider>
        <ModulosProvider>

          {/* 🔥 Provider do Menu Rápido Operação */}
          <MenuRapidoProvider>

            {/* 🔥 Provider do Menu Rápido FINANCEIRO */}
            <MenuRapidoFinanceiroProvider>

              {/* Restante dos providers */}
              <AgendaProvider>
                <NotificacaoProvider>
                  <App />
                </NotificacaoProvider>
              </AgendaProvider>

            </MenuRapidoFinanceiroProvider>
          </MenuRapidoProvider>

        </ModulosProvider>
      </IconColorProvider>
    </BrowserRouter>
  </StrictMode>
);
