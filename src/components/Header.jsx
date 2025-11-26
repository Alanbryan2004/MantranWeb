import {
  Bell,
  ChevronDown,
  Menu,
  UserRound,
  Building2,
  Lock,
  Settings,
  Image as ImageIcon
} from "lucide-react";

import Logo from "../assets/logo_mantran.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsuarioAlterarSenha from "../pages/UsuarioAlterarSenha";
import { useIconColor } from "../context/IconColorContext";

// ⬅️ IMPORTA O CONTEXTO CORRETO
import { useMenuRapido } from "../context/MenuRapidoContext";

function AppDotsIcon({ size = 20, color = "#b91c1c" }) {
  const dotSize = size / 5;
  const gap = dotSize * 0.8;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: gap,
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}

export default function Header({ toggleSidebar }) {
  const usuarioLogado = localStorage.getItem("usuarioNome") || "Suporte";

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAlterarSenha, setShowAlterarSenha] = useState(false);

  const navigate = useNavigate();
  const { iconColor } = useIconColor();

  // ⬅️ AQUI — agora usamos o contexto correto
  const { atalhos } = useMenuRapido();

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Novo CT-e emitido com sucesso.", read: false },
    { id: 2, message: "Backup concluído às 14:00h.", read: false },
    { id: 3, message: "Manifesto encerrado.", read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <>
      <header className="flex justify-between items-center bg-white shadow-sm px-6 py-1.5 border-b h-[48px] fixed top-0 left-0 right-0 z-50">

        {/* --- LADO ESQUERDO (logo, menu, atalhos) --- */}
        <div className="flex items-center gap-5">

          <button
            onClick={toggleSidebar}
            className={`text-gray-700 hover:text-black ${iconColor}`}
          >
            <Menu size={20} />
          </button>

          <img src={Logo} alt="Mantran" className="h-7" />

          {/* ATALHOS DO MENU RÁPIDO — AGORA FUNCIONANDO */}
          <div className={`flex gap-8 text-sm ml-6 ${iconColor}`}>
            {atalhos.slice(0, 7).map((item) => (
              <Link
                key={item.id}
                to={item.rota}
                className="flex flex-col items-center cursor-pointer hover:text-black"
              >
                <i className={`fa-solid ${item.icone} text-lg`} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

        </div>

        {/* --- LADO DIREITO (notificações, apps, usuário) --- */}
        <div className="flex items-center gap-6">

          {/* 🔔 Notificações */}
          <div className="relative">
            <button
              className={`${iconColor} hover:text-black relative`}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowAppsMenu(false);
                setShowUserMenu(false);
              }}
            >
              <Bell size={18} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-0 right-0 bg-red-600 w-2 h-2 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg border z-50">
                <div className="p-3 font-semibold border-b text-gray-700">
                  Notificações
                </div>

                {notifications.length === 0 ? (
                  <p className="text-sm text-center text-gray-500 p-4">
                    Nenhuma notificação
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex justify-between items-center px-4 py-2 text-sm ${
                        n.read ? "text-gray-400" : "text-gray-800 bg-gray-50"
                      }`}
                    >
                      <span>{n.message}</span>

                      {!n.read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Marcar como lido
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* 🟦 MENU DE APPS */}
          <div className="relative">
            <button
              onClick={() => {
                setShowAppsMenu(!showAppsMenu);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              className={`${iconColor} hover:text-black flex items-center justify-center`}
              style={{ height: "20px" }}
            >
              <AppDotsIcon size={18} />
            </button>

            {showAppsMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg border z-50 p-3 grid grid-cols-3 gap-4">
                {[
                  { icon: "fa-truck-fast", label: "Operação" },
                  { icon: "fa-money-check-dollar", label: "Financeiro" },
                  { icon: "fa-chart-pie", label: "BI Relatórios" },
                  { icon: "fa-key", label: "Segurança" },
                  { icon: "fa-file-contract", label: "EDI" },
                  { icon: "fa-chart-column", label: "Indicadores" },
                  { icon: "fa-box", label: "Container" },
                  { icon: "fa-screwdriver-wrench", label: "Oficina" },
                  { icon: "fa-file-circle-check", label: "Baixa XML" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="flex flex-col items-center text-red-700 hover:text-black text-sm"
                  >
                    <i className={`fa-solid ${item.icon} text-xl`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 👤 Menu do Usuário */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowAppsMenu(false);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-black"
            >
              <UserRound className={iconColor} size={18} />
              <span className="uppercase">{usuarioLogado}</span>
              <ChevronDown size={16} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50 py-1">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                  <Building2 className={iconColor} size={16} />
                  Trocar Filial
                </button>

                <button
                  onClick={() => setShowAlterarSenha(true)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Lock className={iconColor} size={16} />
                  Alterar Senha
                </button>

                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                  <ImageIcon className={iconColor} size={16} />
                  Alterar Foto
                </button>

                <button
                  onClick={() => navigate("/parametros")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Settings className={iconColor} size={16} />
                  Configuração
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {showAlterarSenha && (
        <UsuarioAlterarSenha onClose={() => setShowAlterarSenha(false)} />
      )}
    </>
  );
}
