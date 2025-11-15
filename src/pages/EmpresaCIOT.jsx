import { useState } from "react";
import { XCircle, RotateCcw, Edit } from "lucide-react";

function Label({ children, className = "" }) {
  return (
    <label className={`text-[12px] text-gray-700 ${className}`}>
      {children}
    </label>
  );
}

function Txt(props) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] w-full ${props.className || ""}`}
    />
  );
}

export default function EmpresaCIOT({ onClose }) {
  const [dados, setDados] = useState({
    operadora: "001 - E-FRETE",
    usuario: "",
    senha: "",
    ultimaRota: "",
    versao: "",
    ambiente: "P",
    operadoraUtilizada: false,
    gerarCP: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  const toggle = (f) => {
    setDados((prev) => ({ ...prev, [f]: !prev[f] }));
  };

  const handleLimpar = () => {
    setDados({
      operadora: "001 - E-FRETE",
      usuario: "",
      senha: "",
      ultimaRota: "",
      versao: "",
      ambiente: "P",
      operadoraUtilizada: false,
      gerarCP: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[550px] rounded shadow-lg border border-gray-300 p-4">

        {/* ===== Título ===== */}
        <h2 className="text-center text-red-700 font-semibold text-[15px] mb-3 border-b pb-1">
          PARÂMETROS OPERADORAS DE FRETE
        </h2>

        {/* ===== Grid principal ===== */}
        <div className="grid grid-cols-2 gap-3">

          <div className="col-span-2">
            <Label>Operadora</Label>
            <select
              name="operadora"
              value={dados.operadora}
              onChange={handleChange}
              className="border border-gray-300 rounded h-[26px] px-1 text-[13px] w-full"
            >
              <option>001 - PAMCARD</option>
              <option>002 - REPOM</option>
              <option>003 - PAGBEM</option>
            </select>
          </div>

          <div>
            <Label>Usuário</Label>
            <Txt name="usuario" value={dados.usuario} onChange={handleChange} />
          </div>

          <div>
            <Label>Senha</Label>
            <Txt
              type="password"
              name="senha"
              value={dados.senha}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Último Nº Rota</Label>
            <Txt
              name="ultimaRota"
              value={dados.ultimaRota}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              checked={dados.operadoraUtilizada}
              onChange={() => toggle("operadoraUtilizada")}
            />
            <Label className="m-0">Operadora Utilizada</Label>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              checked={dados.gerarCP}
              onChange={() => toggle("gerarCP")}
            />
            <Label className="m-0">Gerar Contas a Pagar</Label>
          </div>

          <div>
            <Label>Versão</Label>
            <Txt name="versao" value={dados.versao} onChange={handleChange} />
          </div>

          <div>
            <Label>Ambiente</Label>
            <select
              name="ambiente"
              value={dados.ambiente}
              onChange={handleChange}
              className="border border-gray-300 rounded h-[26px] px-1 text-[13px] w-full"
            >
              <option value="P">P - Produção</option>
              <option value="H">H - Homologação</option>
            </select>
          </div>
        </div>

        {/* ===== Botões ===== */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-red-700 hover:text-black"
          >
            <XCircle size={18} /> Fechar
          </button>

          <button
            onClick={handleLimpar}
            className="flex items-center gap-1 text-gray-700 hover:text-black"
          >
            <RotateCcw size={18} /> Limpar
          </button>

          <button className="flex items-center gap-1 text-gray-700 hover:text-black">
            <Edit size={18} /> Alterar
          </button>
        </div>
      </div>
    </div>
  );
}
