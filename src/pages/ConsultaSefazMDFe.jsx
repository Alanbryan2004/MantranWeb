import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Printer,
  Send,
  FileText,
  XCircle,
  StopCircle,
  RotateCcw,
  CheckSquare,
} from "lucide-react";

export default function ConsultaSefazMDFe({ onClose }) {
  const isGlobalModal = !!onClose;
  const navigate = useNavigate();
  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) setSelectedCount((prev) => prev + 1);
    else setSelectedCount((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={isGlobalModal ? "fixed inset-0 bg-black/40 flex items-center justify-center z-50" : "w-full h-full flex items-center justify-center"}>
      <div className="bg-white w-[1100px] rounded shadow-lg border border-gray-300 p-4">
        <h2 className="text-center text-red-700 font-semibold text-[14px] border-b pb-2">
          MANIFESTO ELETRÔNICO
        </h2>

        {/* CARD 1 - Filtros */}
        <div className="border border-gray-300 rounded p-3 bg-white mt-3">
          <div className="flex flex-col gap-2">
            {/* Linha 1 */}
            <div className="flex items-center gap-3">
              <label className="w-28 text-[12px] text-gray-700">Filtrar MDF-e</label>
              <select className="border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] w-[200px]">
                <option>TODOS</option>
                <option>AUTORIZADOS</option>
                <option>ENCERRADOS</option>
                <option>REJEITADOS</option>
              </select>

              {/* Motorista alinhado mais à direita */}
              <div className="ml-auto flex items-center gap-2">
                <label className="w-24 text-right text-[12px] text-gray-700">Motorista</label>
                <input
                  type="text"
                  placeholder="CNH"
                  className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[120px] text-[13px]"
                />
                <input
                  type="text"
                  placeholder="Nome do Motorista"
                  className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[300px] text-[13px]"
                />
              </div>
            </div>

            {/* Linha 2 */}
            <div className="flex items-center gap-3">
              <label className="w-28 text-[12px] text-gray-700">Período</label>
              <input
                type="date"
                defaultValue="2025-10-01"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] w-[160px]"
              />
              <span className="text-[12px] text-gray-700">à</span>
              <input
                type="date"
                defaultValue="2025-10-24"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] w-[160px]"
              />

              <label className="w-28 text-right text-[12px] text-gray-700">Veículo</label>
              <input
                type="text"
                placeholder="Código"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[100px] text-[13px]"
              />
              <input
                type="text"
                placeholder="Placa / Descrição"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] flex-1 text-[13px]"
              />
            </div>

            {/* Linha 3 */}
            <div className="flex items-center gap-3 justify-between">
              <div className="flex items-center gap-2">
                <label className="w-28 text-[12px] text-gray-700">Nº MDF-e</label>
                <input
                  type="text"
                  placeholder="Inicial"
                  className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[100px] text-[13px]"
                />
                <span className="text-[12px] text-gray-700">à</span>
                <input
                  type="text"
                  placeholder="Final"
                  className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[100px] text-[13px]"
                />
                <label className="flex items-center gap-1 ml-4 text-[12px] text-gray-700">
                  <input type="checkbox" /> Emitir em Contingência
                </label>
              </div>

              {/* Botão à direita */}
              <button className="border border-gray-300 rounded px-4 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1 text-sm">
                <Search size={14} className="text-blue-600" /> Pesquisar
              </button>
            </div>
          </div>
        </div>


        {/* CARD 2 - Grid */}
        <div className="border border-gray-300 rounded p-2 bg-white mt-3">
          <div className="overflow-auto max-h-[260px]">
            <table className="min-w-[1200px] text-[12px] border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-1 border">Sel</th>
                  <th className="p-1 border">Manifesto</th>
                  <th className="p-1 border">MDFe</th>
                  <th className="p-1 border">DT Emissão</th>
                  <th className="p-1 border">Status MDF-e</th>
                  <th className="p-1 border">Retorno SEFAZ</th>
                  <th className="p-1 border">Chave MDF-e</th>
                  <th className="p-1 border">Protocolo</th>
                  <th className="p-1 border">Recibo</th>
                  <th className="p-1 border">Contingência MDF-e</th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    nr: "043556",
                    mdfe: "001370",
                    data: "09/10/2025 13:17:17",
                    status: "Autorizado",
                    retorno: "100 - Autorizado o uso do MDF-e",
                    chave: "35251004086140001415800000137014862727725302",
                    protocolo: "135250004853457",
                    recibo: "2510048354123",
                    contigencia: "N",
                  },
                  {
                    nr: "043557",
                    mdfe: "001369",
                    data: "09/10/2025 11:59:35",
                    status: "Encerrado",
                    retorno: "135 - MDF-e encerrado com sucesso",
                    chave: "35251004086140001415800000136910128033347",
                    protocolo: "135250004853458",
                    recibo: "2510048354124",
                    contigencia: "S",
                  },
                  // 🔁 Duplicar esses registros até completar 10 linhas
                  ...Array.from({ length: 8 }, (_, i) => ({
                    nr: `04356${i + 8}`,
                    mdfe: `00136${i + 8}`,
                    data: "09/10/2025 10:00:00",
                    status: "Autorizado",
                    retorno: "100 - Autorizado o uso do MDF-e",
                    chave: `35251004086140001415800000136${i + 8}10128033347`,
                    protocolo: `1352500048534${i + 8}`,
                    recibo: `25100483541${i + 8}`,
                    contigencia: i % 2 === 0 ? "N" : "S",
                  })),
                ].map((item, idx, arr) => (
                  <tr key={idx}>
                    <td className="p-1 border text-center">
                      <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        className="cursor-pointer accent-red-700"
                      />
                    </td>
                    <td className="p-1 border text-center">{item.nr}</td>
                    <td className="p-1 border text-center">{item.mdfe}</td>
                    <td className="p-1 border text-center">{item.data}</td>
                    <td className="p-1 border text-center">{item.status}</td>
                    <td className="p-1 border text-left text-gray-700">{item.retorno}</td>
                    <td className="p-1 border text-center font-mono">{item.chave}</td>
                    <td className="p-1 border text-center">{item.protocolo}</td>
                    <td className="p-1 border text-center">{item.recibo}</td>
                    <td className="p-1 border text-center">{item.contigencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rodapé de totais */}
          <div className="text-[12px] text-gray-700 flex justify-between mt-1">
            <span>Total de Registros: 10</span>
            <span>
              Total Selecionado:{" "}
              <span className="text-red-700 font-semibold">{selectedCount}</span>
            </span>
          </div>
        </div>


        {/* CARD 3 - Botões */}
        <div className="border-t border-gray-300 bg-white mt-3 pt-2 flex justify-between items-center text-[12px]">
          <div className="flex items-center gap-2">
            <button className="border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
              <CheckSquare size={14} className="text-green-700" /> Selecionar Todos
            </button>
            <button className="border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
              <RotateCcw size={14} className="text-gray-700" /> Limpar Seleção
            </button>

            <button
              className="border border-gray-300 rounded px-3 py-1 bg-green-50 hover:bg-green-100 flex items-center gap-1"
              onClick={() => {
                if (onClose) onClose();
                else navigate("/");
              }}
            >
              <XCircle size={14} className="text-green-700" /> Fechar Tela
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="border border-gray-300 rounded px-3 py-1 bg-blue-50 hover:bg-blue-100 flex items-center gap-1">
              <Send size={14} className="text-blue-600" /> Enviar
            </button>

            <button className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
              <Printer size={14} className="text-red-700" /> Imprimir
            </button>

            <button className="border border-gray-300 rounded px-3 py-1 bg-yellow-50 hover:bg-yellow-100 flex items-center gap-1">
              <FileText size={14} className="text-yellow-600" /> Consulta
            </button>



            <button
              className="border border-gray-300 rounded px-3 py-1 bg-red-50 hover:bg-red-100 flex items-center gap-1"
              onClick={onClose}
            >
              <XCircle size={14} className="text-red-600" /> Cancelar
            </button>

            <button className="border border-gray-300 rounded px-3 py-1 bg-red-600 hover:bg-red-700 text-white flex items-center gap-1">
              <StopCircle size={14} /> Encerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
