import { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  BarChart3,
  ClipboardList,
  DollarSign,
  UserCircle2,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ open }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleToggle = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    setActiveSubMenu(null);
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 shadow-lg fixed left-0 top-[48px] h-[calc(100vh-48px)] z-30 transition-all duration-300 ${
        open ? "w-52 translate-x-0" : "w-14 -translate-x-full sm:translate-x-0"
      }`}
    >
      <nav className="p-2 text-sm text-gray-700 relative">

        {/* === CADASTROS === */}
        <div
          className="group relative"
          onMouseEnter={() => setActiveMenu("cadastros")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button
            onClick={() => handleToggle("cadastros")}
            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
          >
            <FileText className="w-5 h-5 text-red-700" />
            {open && (
              <>
                <span className="ml-3 flex-1 text-left">Cadastros</span>
                <ChevronRight
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    activeMenu === "cadastros" ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>

          {/* Submenus de Cadastros */}
          {activeMenu === "cadastros" && (
            <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-50">
              <ul className="text-[13px] text-gray-700">
                {[
                  "Empresa",
                  "Filial",
                  "Filial Parâmetro",
                  "Empresa Agregado",
                  "Parâmetro Fiscal",
                  "Motorista",
                  "Veículo",
                  "Cliente",
                  "Localidade",
                  "Eventos Despesas",
                  "Prazo de Entrega",
                  "Parâmetro GNRE",
                  "Parâmetro Módulo",
                  "Produto",
                  "Seguro",
                  "Ocorrência",
                  "Colaboradores",
                ].map((item) => (
                  <li
                    key={item}
                    className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer relative"
                    onMouseEnter={() => setActiveSubMenu(item)}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    {item}

                    {/* Submenu do CLIENTE */}
                    {item === "Cliente" && activeSubMenu === item && (
                      <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
                        {[
                          "Cliente",
                          "Atividade Econômica",
                          "Condição de Pagamento",
                          "Divisão Empresarial",
                          "Embalagem",
                          "Grupo Econômico",
                          "Produto",
                          "Operação",
                        ].map((sub) =>
                          sub === "Divisão Empresarial" ? (
                            <Link
                              key={sub}
                              to="/cliente-divisao"
                              className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
                            >
                              {sub}
                            </Link>
                          ) : (
                            <div
                              key={sub}
                              className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                            >
                              {sub}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* === OPERAÇÃO === */}
        <div
          className="group relative mt-1"
          onMouseEnter={() => setActiveMenu("operacao")}
          onMouseLeave={() => {
            setActiveMenu(null);
            setActiveSubMenu(null);
          }}
        >
          <button
            onClick={() => handleToggle("operacao")}
            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
          >
            <ClipboardList className="w-5 h-5 text-red-700" />
            {open && (
              <>
                <span className="ml-3 flex-1 text-left">Operação</span>
                <ChevronRight
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    activeMenu === "operacao" ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>

          {activeMenu === "operacao" && (
  <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-50">
    <ul className="text-[13px] text-gray-700">
      {["Coleta", "Conhecimento", "Viagem", "Nota Fiscal", "Manifesto", "Minuta"].map(
  (item) => (
    <li
      key={item}
      className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer relative"
      onMouseEnter={() => setActiveSubMenu(item)}
      onMouseLeave={() => setActiveSubMenu(null)}
    >
      {item}
      {["Conhecimento", "Viagem", "Nota Fiscal", "Manifesto"].includes(item) && (
        <ChevronRight
          size={13}
          className="absolute right-3 top-2 text-gray-500"
        />
      )}

      {/* === Submenu de Coleta === */}
      {item === "Coleta" && (
        <Link
          to="/coleta"
          className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
        >
      Coleta
        </Link>
      )}

      {/* === Submenu de Conhecimento === */}
      {item === "Conhecimento" && activeSubMenu === item && (
        <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
          <Link
            to="/cte"
            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
          >
            Conhecimento
          </Link>
          {[
            "Cancelar Lote",
            "Consulta Sefaz",
            "Parâmetro",
            "Envio Sefaz",
            "Baixa CTRC",
            "Geração Automática",
            "Integração MultiCTe",
          ].map((sub) => (
            <div
              key={sub}
              className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
            >
              {sub}
            </div>
          ))}
        </div>
      )}

      {/* === Submenu de Nota Fiscal === */}
      {item === "Nota Fiscal" && activeSubMenu === item && (
        <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-md rounded-md w-56 p-1 z-50">
          <div className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer">
            Nota Fiscal EDI
          </div>
          <Link
            to="/nfse"
            className="block px-3 py-[2px] hover:bg-gray-100 rounded text-gray-700"
          >
            Nota Fiscal Serviço
          </Link>
        </div>
      )}
    </li>
  )
)}

    </ul>
  </div>
)}
        </div>

        {/* === TABELA FRETE === */}
        <button className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1">
          <FileSpreadsheet className="w-5 h-5 text-red-700" />
          {open && <span className="ml-3">Tabela Frete</span>}
        </button>

        {/* === FATURAMENTO === */}
        <div
          className="group relative mt-1"
          onMouseEnter={() => setActiveMenu("faturamento")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button
            onClick={() => handleToggle("faturamento")}
            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
          >
            <DollarSign className="w-5 h-5 text-red-700" />
            {open && (
              <>
                <span className="ml-3 flex-1 text-left">Faturamento</span>
                <ChevronRight
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    activeMenu === "faturamento" ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>

          {activeMenu === "faturamento" && (
            <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl rounded-md w-52 p-1 z-50">
              {["Manual", "Automático"].map((sub) => (
                <div
                  key={sub}
                  className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                >
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === RELATÓRIO === */}
        <button className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1">
          <BarChart3 className="w-5 h-5 text-red-700" />
          {open && <span className="ml-3">Relatório</span>}
        </button>

        {/* === USUÁRIO === */}
        <div
          className="group relative mt-1"
          onMouseEnter={() => setActiveMenu("usuario")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button
            onClick={() => handleToggle("usuario")}
            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md transition"
          >
            <UserCircle2 className="w-5 h-5 text-red-700" />
            {open && (
              <>
                <span className="ml-3 flex-1 text-left">Usuário</span>
                <ChevronRight
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    activeMenu === "usuario" ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>
          {/* === CHAT === */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded-md mt-1 relative"
          >
            <MessageSquare className="w-5 h-5 text-red-700" />
            {open && <span className="ml-3 flex-1 text-left">Chat</span>}
            {/* Indicador de nova mensagem */}
            <span className="absolute top-1 right-3 bg-red-600 w-2 h-2 rounded-full"></span>
          </button>
          {activeMenu === "usuario" && (
            <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl rounded-md w-56 p-1 z-50">
              {["Trocar Usuário", "Trocar Filial", "Alterar Senha"].map((sub) => (
                <div
                  key={sub}
                  className="px-3 py-[2px] hover:bg-gray-100 rounded cursor-pointer"
                >
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* === BOTÃO DE LOGOUT === */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center">
        <button
          onClick={() => {
            if (typeof window.onLogout === "function") window.onLogout();
          }}
          className="bg-red-700 hover:bg-red-800 text-white p-3 rounded-full shadow transition"
          title="Sair do sistema"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
