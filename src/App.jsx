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
import Dashboard from "./pages/Dashboard"; // 👈 ADICIONAR ESTA LINHA
import "./index.css";


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  // 👇 controla exibição inicial do Dashboard
  const [showDashboard, setShowDashboard] = useState(
    localStorage.getItem("hideDashboard") !== "true"
  );

  // função global para logout
  window.onLogout = () => setIsLogged(false);

  // 🔐 Tela de Login
  if (!isLogged) {
    return <Login onLogin={() => setIsLogged(true)} />;
  }

  // 🔄 Garante que ao logar, o sistema sempre inicie na tela padrão
  if (window.location.pathname !== "/") {
    window.history.pushState({}, "", "/");
  }

  // 🏠 Tela principal com rotas
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* TOPO */}
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} />

        {/* ÁREA CENTRAL */}
        <main className="flex-1 p-4 overflow-auto">
          <Routes>
            {/* Página do CTe */}
            <Route path="/cte" element={<CTePage open={sidebarOpen} />} />

            {/* Página Cliente Divisão */}
            <Route path="/cliente-divisao" element={<ClienteDivisao />} />

            {/* NFSE */}
            <Route path="/nfse" element={<NFSEPage open={sidebarOpen} />} />

            {/* Coleta */}
            <Route path="/coleta" element={<Coleta open={sidebarOpen} />} />
            
            {/* Manifesto */}
            <Route path="/manifesto" element={<Manifesto open={sidebarOpen} />} />
             {/* Viagem */}
            <Route path="/viagem" element={<Viagem open={sidebarOpen} />} />
            {/* Página padrão — Dashboard inicial */}
            <Route
              path="*"
              element={
                showDashboard ? (
                  <Dashboard
                    onClose={() => {
                      setShowDashboard(false);
                      if (
                        document.getElementById("hideDashboardFlag")?.checked
                      ) {
                        localStorage.setItem("hideDashboard", "true");
                      }
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center text-gray-500 italic text-lg h-full">
                    Selecione a Opção Desejada
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
