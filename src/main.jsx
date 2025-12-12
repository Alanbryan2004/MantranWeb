// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { IconColorProvider } from "./context/IconColorContext";
import { ModulosProvider } from "./context/ModulosContext";

/* ===================== MENU RÁPIDO ===================== */
import { MenuRapidoProvider } from "./context/MenuRapidoContext"; // Operação
import { MenuRapidoFinanceiroProvider } from "./context/MenuRapidoFinanceiroContext"; // Financeiro
import { MenuRapidoWMSProvider } from "./context/MenuRapidoWMSContext"; // ✅ WMS

/* ===================== OUTROS PROVIDERS ===================== */
import { AgendaProvider } from "./context/AgendaContext";
import { NotificacaoProvider } from "./context/NotificacaoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <IconColorProvider>
        <ModulosProvider>

          {/* 🔥 MENU RÁPIDO OPERAÇÃO */}
          <MenuRapidoProvider>

            {/* 🔥 MENU RÁPIDO FINANCEIRO */}
            <MenuRapidoFinanceiroProvider>

              {/* 🔥 MENU RÁPIDO WMS */}
              <MenuRapidoWMSProvider>

                {/* Providers globais */}
                <AgendaProvider>
                  <NotificacaoProvider>
                    <App />
                  </NotificacaoProvider>
                </AgendaProvider>

              </MenuRapidoWMSProvider>
            </MenuRapidoFinanceiroProvider>
          </MenuRapidoProvider>

        </ModulosProvider>
      </IconColorProvider>
    </BrowserRouter>
  </StrictMode>
);
