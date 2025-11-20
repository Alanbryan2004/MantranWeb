import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CTePage from "./pages/CTePage";
import ClienteDivisao from "./pages/ClienteDivisao";
import NFSEPage from "./pages/NFSEPage";
import Login from "./components/Login";
import Coleta from "./pages/Coleta";
import Manifesto from "./pages/Manifesto";
import Viagem from "./pages/Viagem";
import Dashboard from "./pages/Dashboard";
import Parametro from "./pages/Parametro";
import "./index.css";
import TabelaFrete from "./pages/TabelaFrete";
import NotaFiscalEDI from "./pages/NotaFiscalEDI";
import Cliente from "./pages/Cliente";
import Empresa from "./pages/Empresa";
import EmpresaAgregado from "./pages/EmpresaAgregado";
import Veiculo from "./pages/Veiculo";
import Motorista from "./pages/Motorista";



// ------------------------------------------------------------
// 🔥 Componente invisível para forçar Tailwind a gerar as cores
// ------------------------------------------------------------
function TailwindColorHelper() {
  return (
    <div className="hidden">
      {/* NORMAL COLORS */}
      <span className="
        text-red-100 text-red-200 text-red-300 text-red-400 text-red-500 text-red-600 text-red-700 text-red-800 text-red-900
        text-blue-100 text-blue-200 text-blue-300 text-blue-400 text-blue-500 text-blue-600 text-blue-700 text-blue-800 text-blue-900
        text-emerald-100 text-emerald-200 text-emerald-300 text-emerald-400 text-emerald-500 text-emerald-600 text-emerald-700 text-emerald-800 text-emerald-900
        text-amber-100 text-amber-200 text-amber-300 text-amber-400 text-amber-500 text-amber-600 text-amber-700 text-amber-800 text-amber-900
        text-slate-100 text-slate-200 text-slate-300 text-slate-400 text-slate-500 text-slate-600 text-slate-700 text-slate-800 text-slate-900
        text-pink-100 text-pink-200 text-pink-300 text-pink-400 text-pink-500 text-pink-600 text-pink-700 text-pink-800 text-pink-900
      " />

      {/* HOVER COLORS */}
      <span className="
        hover:text-red-100 hover:text-red-200 hover:text-red-300 hover:text-red-400 hover:text-red-500 hover:text-red-600 hover:text-red-700 hover:text-red-800 hover:text-red-900
        hover:text-blue-100 hover:text-blue-200 hover:text-blue-300 hover:text-blue-400 hover:text-blue-500 hover:text-blue-600 hover:text-blue-700 hover:text-blue-800 hover:text-blue-900
        hover:text-emerald-100 hover:text-emerald-200 hover:text-emerald-300 hover:text-emerald-400 hover:text-emerald-500 hover:text-emerald-600 hover:text-emerald-700 hover:text-emerald-800 hover:text-emerald-900
        hover:text-amber-100 hover:text-amber-200 hover:text-amber-300 hover:text-amber-400 hover:text-amber-500 hover:text-amber-600 hover:text-amber-700 hover:text-amber-800 hover:text-amber-900
        hover:text-slate-100 hover:text-slate-200 hover:text-slate-300 hover:text-slate-400 hover:text-slate-500 hover:text-slate-600 hover:text-slate-700 hover:text-slate-800 hover:text-slate-900
        hover:text-pink-100 hover:text-pink-200 hover:text-pink-300 hover:text-pink-400 hover:text-pink-500 hover:text-pink-600 hover:text-pink-700 hover:text-pink-800 hover:text-pink-900
      " />
    </div>
  );
}



// ------------------------------------------------------------
// 🔥 APP PRINCIPAL
// ------------------------------------------------------------
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const bgLogo = localStorage.getItem("param_logoBg");
  // controla dashboard inicial
  const [showDashboard, setShowDashboard] = useState(
    localStorage.getItem("hideDashboard") !== "true"
  );

  // função global para logout
  window.onLogout = () => setIsLogged(false);

  // Tela de Login
  if (!isLogged) {
    return <Login onLogin={() => setIsLogged(true)} />;
  }

  // Se o usuário logou e está no /login, manda para a home
  if (isLogged && window.location.pathname === "/login") {
    window.history.pushState({}, "", "/");
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">

      {/* 👇 Força Tailwind a gerar as classes dinâmicas */}
      <TailwindColorHelper />

      {/* TOPO */}
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} />

        {/* ÁREA CENTRAL */}
        <main className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/cte" element={<CTePage open={sidebarOpen} />} />

            <Route path="/cliente-divisao" element={<ClienteDivisao />} />

            <Route path="/tabelafrete" element={<TabelaFrete open={sidebarOpen} />} />

            <Route path="/nfse" element={<NFSEPage open={sidebarOpen} />} />

            <Route path="/coleta" element={<Coleta open={sidebarOpen} />} />

            <Route path="/manifesto" element={<Manifesto open={sidebarOpen} />} />

            <Route path="/cliente" element={<Cliente open={sidebarOpen} />} />

            <Route path="/empresa" element={<Empresa open={sidebarOpen} />} />

            <Route path="/empresa-agregado" element={<EmpresaAgregado open={sidebarOpen} />} />

            <Route path="/veiculo" element={<Veiculo open={sidebarOpen} />} />

            <Route path="/motorista" element={<Motorista open={sidebarOpen} />} />


            <Route path="/viagem" element={<Viagem open={sidebarOpen} />} />

            <Route path="/parametros" element={<Parametro open={sidebarOpen} />} />

            <Route path="/notafiscaledi" element={<NotaFiscalEDI open={sidebarOpen} />} />

            <Route
              path="*"
              element={
                showDashboard ? (
                  <Dashboard
                    onClose={() => {
                      setShowDashboard(false);
                      if (document.getElementById("hideDashboardFlag")?.checked) {
                        localStorage.setItem("hideDashboard", "true");
                      }
                    }}
                  />
                ) : (
                 <div className="flex flex-col items-center justify-center h-full text-gray-500">

  {/* Logo do cliente (se existir) */}
  {bgLogo && (
    <img
      src={bgLogo}
      alt="Marca d’água"
      className="opacity-40 mb-4"
      style={{ width: "220px" }} // tamanho ajustável
    />
  )}

  {/* Texto abaixo */}
  <span className="italic text-lg">
    Selecione a Opção Desejada
  </span>
</div>

                )
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
