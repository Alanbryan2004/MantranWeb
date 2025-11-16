import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { IconColorProvider } from "./context/IconColorContext";
import { FooterIconColorProvider } from "./context/FooterIconColorContext"; // 👈 NOVO IMPORT

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <IconColorProvider>
        <FooterIconColorProvider>
          <App />
        </FooterIconColorProvider>
      </IconColorProvider>
    </BrowserRouter>
  </StrictMode>
);
