// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { IconColorProvider } from "./context/IconColorContext";
import { FooterIconColorProvider } from "./context/FooterIconColorContext";
import { ModulosProvider } from "./context/ModulosContext";
import { MenuRapidoProvider } from "./context/MenuRapidoContext";

// Provider da Agenda
import { AgendaProvider } from "./context/AgendaContext";

// Provider das Notificações (NOVO)
import { NotificacaoProvider } from "./context/NotificacaoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <IconColorProvider>
        <FooterIconColorProvider>
          <ModulosProvider>

            <MenuRapidoProvider>

              <AgendaProvider>

                <NotificacaoProvider>
                  <App />
                </NotificacaoProvider>

              </AgendaProvider>

            </MenuRapidoProvider>

          </ModulosProvider>
        </FooterIconColorProvider>
      </IconColorProvider>
    </BrowserRouter>
  </StrictMode>
);
