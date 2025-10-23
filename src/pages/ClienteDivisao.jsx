import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  Printer,
  FileSpreadsheet,
} from "lucide-react";

function Label({ children, className = "" }) {
  return <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>;
}
function Txt(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 rounded px-2 py-[2px] h-[26px] " +
        (props.className || "")
      }
    />
  );
}
function Sel({ children, ...rest }) {
  return (
    <select
      {...rest}
      className="border border-gray-300 rounded px-2 py-[2px] h-[26px]"
    >
      {children}
    </select>
  );
}

export default function ClienteDivisao() {
  const [divisoes] = useState([
    { codigo: "0001", nome: "LOGGI", flObs: "N", rateio: "", obsCte: "", carac: "" },
    { codigo: "0002", nome: "IMILES", flObs: "N", rateio: "", obsCte: "", carac: "" },
    { codigo: "0003", nome: "SHOPEE", flObs: "N", rateio: "", obsCte: "", carac: "" },
    { codigo: "0004", nome: "REFRIGERADO", flObs: "N", rateio: "", obsCte: "", carac: "" },
    { codigo: "0005", nome: "CLIENTE TESTE", flObs: "S", rateio: "", obsCte: "", carac: "REENTREGA, DEVOLUÇÃO" },
  ]);

  const navigate = useNavigate();
  return (
    <div className="transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ml-[192px]">
      {/* Título */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        CLIENTE - DIVISÃO EMPRESARIAL
      </h1>

      {/* Conteúdo */}
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md flex flex-col gap-3 overflow-y-auto">

        {/* CARD 1 — Dados principais */}
        <div className="border border-gray-300 rounded p-2 bg-white space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <Label className="w-[60px] text-right">Código</Label>
            <Txt className="w-[100px]" defaultValue="0006" />

            <div className="flex items-center gap-2 ml-4">
              <input type="checkbox" id="rateio" className="w-4 h-4" />
              <Label htmlFor="rateio" className="whitespace-nowrap">
                Divisão Rateio
              </Label>
            </div>

            <div className="flex items-center gap-2 ml-6">
              <input type="checkbox" id="complemento" className="w-4 h-4" />
              <Label htmlFor="complemento" className="whitespace-nowrap">
                Mostrar Complemento do CTe
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Label className="w-[60px] text-right">Nome</Label>
            <Txt className="flex-1" />
          </div>

          <div className="flex items-center gap-3">
            <Label className="w-[60px] text-right">Observação</Label>
            <Txt className="flex-1" />
          </div>

          <div className="flex items-center gap-3">
            <Label className="w-[100px] text-right">Carac. Adicionais</Label>
            <Txt className="flex-1" />
          </div>

          <div className="flex items-center gap-3">
            <Label className="w-[100px] text-right">Região Divisão</Label>
            <Sel className="flex-1">
              <option>Selecione uma região</option>
              <option>Sudeste</option>
              <option>Nordeste</option>
              <option>Sul</option>
            </Sel>
          </div>
        </div>

        {/* CARD 2 — Grid */}
        <div className="border border-gray-300 rounded p-2 bg-white">
          <h2 className="text-red-700 font-semibold text-[13px] mb-1">
            Divisões Cadastradas
          </h2>

          <div className="border border-gray-300 rounded overflow-auto">
            <table className="min-w-full text-[12px] border-collapse">
              <thead className="bg-gray-100 border-b border-gray-300 text-gray-700">
                <tr>
                  <th className="px-2 py-1 border-r">Código</th>
                  <th className="px-2 py-1 border-r">Nome</th>
                  <th className="px-2 py-1 border-r">FL Obs CTe</th>
                  <th className="px-2 py-1 border-r">Rateio</th>
                  <th className="px-2 py-1 border-r">Obs CTe</th>
                  <th className="px-2 py-1">Carac Adicional</th>
                </tr>
              </thead>
              <tbody>
                {divisoes.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border-t border-gray-200 px-2 py-[3px] text-center">{d.codigo}</td>
                    <td className="border-t border-gray-200 px-2 py-[3px]">{d.nome}</td>
                    <td className="border-t border-gray-200 px-2 py-[3px] text-center">{d.flObs}</td>
                    <td className="border-t border-gray-200 px-2 py-[3px] text-center">{d.rateio}</td>
                    <td className="border-t border-gray-200 px-2 py-[3px]">{d.obsCte}</td>
                    <td className="border-t border-gray-200 px-2 py-[3px]">{d.carac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARD 3 — Rodapé / Ações */}
<div className="border border-gray-300 rounded p-2 bg-white flex items-center justify-center gap-4 text-red-700">
  <button title="Fechar Tela" onClick={() => navigate("/")}>
    <XCircle />
  </button>
  <button title="Limpar">
    <RotateCcw />
  </button>
  <button title="Incluir">
    <PlusCircle />
  </button>
  <button title="Alterar">
    <Edit />
  </button>
  <button title="Excluir">
    <Trash2 />
  </button>
</div>


      </div>
    </div>
  );
}
