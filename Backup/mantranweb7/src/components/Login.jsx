import { useState } from "react";
import Logo from "../assets/logo_mantran.png";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && pass) {
      onLogin?.();
    } else {
      alert("Informe usuário e senha!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-800 via-white to-gray-700">
      {/* CARD CENTRAL */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[360px] text-center border border-gray-300 animate-[fadeIn_0.8s_ease-out]">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src={Logo}
            alt="Mantran Tecnologias"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* TÍTULO */}
        <h2 className="text-lg font-bold mb-6 text-gray-800">
          Acesso ao Sistema
        </h2>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* USUÁRIO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuário
            </label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          {/* SENHA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-md transition-all shadow-md"
          >
            Entrar
          </button>
        </form>

        {/* RODAPÉ */}
        <p className="text-xs text-gray-500 mt-6">
          © 2025 Mantran Tecnologias. Todos os direitos reservados.
        </p>
      </div>

      {/* ANIMAÇÃO CSS */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
