import { createContext, useContext, useState } from "react";

const ModulosContext = createContext();

export function ModulosProvider({ children }) {
  const [modulos, setModulos] = useState({
    operacao: false,
    ecommerce: false,
    financeiro: false,
    ediXml: false,
    oficina: false,
    bi: false,
    relatorios: false,
    comercial: false,
    crm: false,
    seguranca: false,
    wms: false,
    roteirizador: false,
    baixaXml: false,
    vendas: false,
    localize: false,
    mobile: false,
  });

  return (
    <ModulosContext.Provider value={{ modulos, setModulos }}>
      {children}
    </ModulosContext.Provider>
  );
}

export function useModulos() {
  return useContext(ModulosContext);
}
