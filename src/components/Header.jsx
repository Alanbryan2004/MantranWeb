import {
  Bell,
  ChevronDown,
  Menu,
  UserRound,
  Building2,
  Lock,
  RefreshCcw,
  Settings,
  Image as ImageIcon,
} from "lucide-react";
import Logo from "../assets/logo_mantran.png";
import { useState } from "react";
import { Link } from "react-router-dom"; // 👈 Import para navegação
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const usuarioLogado = localStorage.getItem("usuarioNome") || "Suporte";
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
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
    <header className="flex justify-between items-center bg-white shadow-sm px-6 py-1.5 border-b h-[48px] fixed top-0 left-0 right-0 z-50">
      {/* Botão + Logo + Atalhos principais */}
      <div className="flex items-center gap-5">
        {/* Botão Menu */}
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-red-700"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <img src={Logo} alt="Mantran" className="h-7" />

        {/* Atalhos principais */}
        <div className="flex gap-8 text-red-700 text-sm ml-6">
          <Link
            to="/viagem"
            className="flex flex-col items-center cursor-pointer hover:text-black"
          >
            <i className="fa-solid fa-truck-fast text-lg"></i>
            <span>Viagem</span>
          </Link>

<Link
  to="/nfse"
  className="flex flex-col items-center cursor-pointer hover:text-black"
>
  <i className="fa-solid fa-file-invoice text-lg"></i>
  <span>NFSe</span>
</Link>

          <Link
            to="/cte"
            className="flex flex-col items-center cursor-pointer hover:text-black"
          >
            <i className="fa-solid fa-file-lines text-lg"></i>
            <span>CTe</span>
          </Link>

<Link
  to="/coleta"
  className="flex flex-col items-center cursor-pointer hover:text-black"
>
  <i className="fa-solid fa-boxes-packing text-lg"></i>
  <span>Coleta</span>
</Link>

          <Link
            to="/manifesto"
            className="flex flex-col items-center cursor-pointer hover:text-black"
          >
            <i className="fa-solid fa-file-contract text-lg"></i>
            <span>Manifesto</span>
          </Link>
        </div>
      </div>

      {/* Notificações e Usuário */}
      <div className="flex items-center gap-6">
        {/* Notificações */}
        <div className="relative">
          <button
            className="text-red-700 hover:text-black relative"
            onClick={() => setShowNotifications(!showNotifications)}
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

        {/* Menu do Usuário */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 text-gray-700 hover:text-black"
          >
            <UserRound className="text-red-700" size={18} />
            <span className="uppercase">{usuarioLogado}</span>
            <ChevronDown size={16} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50 py-1">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <RefreshCcw className="text-red-700" size={16} />
                Trocar Usuário
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Building2 className="text-red-700" size={16} />
                Trocar Filial
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Lock className="text-red-700" size={16} />
                Alterar Senha
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <ImageIcon className="text-red-700" size={16} />
                Alterar Foto
              </button>
<button
  onClick={() => navigate("/parametros")}
  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
>
  <Settings className="text-red-700" size={16} />
  Configuração
</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
