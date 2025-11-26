import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { IconColorProvider } from "./context/IconColorContext";
import { FooterIconColorProvider } from "./context/FooterIconColorContext";
import { ModulosProvider } from "./context/ModulosContext";
import { MenuRapidoProvider } from "./context/MenuRapidoContext";  // ⬅️ usar apenas este!

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <IconColorProvider>
        <FooterIconColorProvider>
          <ModulosProvider>

            {/* ⬅️ Provider correto do Menu Rápido */}
            <MenuRapidoProvider>
              <App />
            </MenuRapidoProvider>

          </ModulosProvider>
        </FooterIconColorProvider>
      </IconColorProvider>
    </BrowserRouter>
  </StrictMode>
);
