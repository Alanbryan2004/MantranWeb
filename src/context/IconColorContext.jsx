import { createContext, useContext, useEffect, useState } from "react";

const IconColorContext = createContext();

// Valores padrão
const DEFAULT_ICON_COLOR = "text-red-700";
const DEFAULT_FOOTER_NORMAL = "text-red-700";
const DEFAULT_FOOTER_HOVER = "text-red-900";

// === Função para obter prefixo do módulo ativo ===
function getModuloPrefix() {
  const modulo = localStorage.getItem("mantran_modulo") || "operacao";

  switch (modulo) {
    case "financeiro":
      return "fin_";
    case "comercial":
      return "com_";
    case "wms":
      return "wms_";
    default:
      return "op_";
  }
}

export function IconColorProvider({ children }) {
  const prefix = getModuloPrefix();

  // HEADER / SIDEBAR
  const [iconColor, setIconColor] = useState(
    localStorage.getItem(prefix + "iconColor") || DEFAULT_ICON_COLOR
  );

  // RODAPÉ normal
  const [footerIconColorNormal, setFooterIconColorNormal] = useState(
    localStorage.getItem(prefix + "footerNormal") || DEFAULT_FOOTER_NORMAL
  );

  // RODAPÉ hover
  const [footerIconColorHover, setFooterIconColorHover] = useState(
    localStorage.getItem(prefix + "footerHover") || DEFAULT_FOOTER_HOVER
  );

  // === Persistência ===
  useEffect(() => {
    localStorage.setItem(prefix + "iconColor", iconColor);
  }, [iconColor, prefix]);

  useEffect(() => {
    localStorage.setItem(prefix + "footerNormal", footerIconColorNormal);
  }, [footerIconColorNormal, prefix]);

  useEffect(() => {
    localStorage.setItem(prefix + "footerHover", footerIconColorHover);
  }, [footerIconColorHover, prefix]);

  return (
    <IconColorContext.Provider
      value={{
        iconColor,
        setIconColor,

        footerIconColorNormal,
        footerIconColorHover,
        setFooterIconColorNormal,
        setFooterIconColorHover,

        DEFAULT_ICON_COLOR,
        DEFAULT_FOOTER_NORMAL,
        DEFAULT_FOOTER_HOVER,
      }}
    >
      {children}
    </IconColorContext.Provider>
  );
}

export function useIconColor() {
  return useContext(IconColorContext);
}
