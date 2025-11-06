import { useState } from "react";
import {
  Search,
  Printer,
  Send,
  FileText,
  XCircle,
  RotateCcw,
  CheckSquare,
  Mail,
  StopCircle,
} from "lucide-react";

export default function ConsultaSefazCte({ onClose }) {
  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) setSelectedCount((prev) => prev + 1);
    else setSelectedCount((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[1100px] rounded shadow-lg border border-gray-300 p-4">
        <h2 className="text-center text-red-700 font-semibold text-[14px] border-b pb-2">
          CONHECIMENTO ELETRÔNICO
        </h2>

        {/* === CARD 1 - Filtros === */}
        <div className="border border-gray-300 rounded p-3 bg-white mt-3">
          <div className="flex flex-col gap-2">
            {/* Linha 1 */}
            <div className="flex items-center gap-3">
              <label className="w-28 text-[12px] text-gray-700">Filtrar CTe</label>
              <select className="border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] w-[180px]">
                <option>TODOS</option>
                <option>AUTORIZADOS</option>
                <option>CANCELADOS</option>
                <option>REJEITADOS</option>
              </select>

              <label className="w-20 text-right text-[12px] text-gray-700">Cliente</label>
              <input
                type="text"
                placeholder="CNPJ"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[140px] text-[13px]"
              />
              <input
                type="text"
                placeholder="Razão Social"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] flex-1 text-[13px]"
              />
            </div>

            {/* Linha 2 */}
            <div className="flex items-center gap-3">
              <label className="w-28 text-[12px] text-gray-700">Período</label>
              <input
                type="date"
                defaultValue="2025-11-06"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] w-[150px]"
              />
              <span className="text-[12px] text-gray-700">à</span>
              <input
                type="date"
                defaultValue="2025-11-06"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] text-[13px] w-[150px]"
              />

              <label className="w-20 text-right text-[12px] text-gray-700">Remetente</label>
              <input
                type="text"
                placeholder="CNPJ"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[140px] text-[13px]"
              />
              <input
                type="text"
                placeholder="Razão Social"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] flex-1 text-[13px]"
              />
            </div>

            {/* Linha 3 */}
            <div className="flex items-center gap-3">
              <label className="w-28 text-[12px] text-gray-700">Nº CTe</label>
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

              <label className="w-20 text-right text-[12px] text-gray-700">Destinatário</label>
              <input
                type="text"
                placeholder="CNPJ"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[140px] text-[13px]"
              />
              <input
                type="text"
                placeholder="Razão Social"
                className="border border-gray-300 rounded px-2 py-[2px] h-[26px] flex-1 text-[13px]"
              />
            </div>

            {/* Linha 4 */}
            <div className="flex items-center gap-3 justify-between">
              <div className="flex items-center gap-2">
                <label className="w-28 text-[12px] text-gray-700">Nº Controle</label>
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

                <label className="w-20 text-right text-[12px] text-gray-700">Nº Viagem</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[100px] text-[13px]"
                />

                <label className="w-24 text-right text-[12px] text-gray-700">Qtd Página</label>
                <input
                  type="number"
                  defaultValue={50}
                  className="border border-gray-300 rounded px-2 py-[2px] h-[26px] w-[70px] text-[13px] text-center"
                />

                <label className="flex items-center gap-1 text-[12px] text-gray-700 ml-4">
                  <input type="checkbox" className="accent-red-700" /> Filtrar CTe c/ GNRE
                </label>
              </div>

              <button className="border border-gray-300 rounded px-3 py-[4px] bg-gray-50 hover:bg-gray-100 flex items-center gap-1 text-sm">
                <Search size={14} className="text-blue-600" /> Pesquisar
              </button>
            </div>
          </div>
        </div>

        {/* === CARD 2 - Grid === */}
        <div className="border border-gray-300 rounded p-2 bg-white mt-3">
          <div className="overflow-auto max-h-[260px]">
            <table className="min-w-[1200px] text-[12px] border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-1 border">Chk</th>
                  <th className="p-1 border">Nº Controle</th>
                  <th className="p-1 border">Nº CTe</th>
                  <th className="p-1 border">Emissão</th>
                  <th className="p-1 border">Status CTe</th>
                  <th className="p-1 border">Retorno Sefaz</th>
                  <th className="p-1 border">Email</th>
                  <th className="p-1 border">Chave CTe</th>
                  <th className="p-1 border">Protocolo</th>
                  <th className="p-1 border">Recibo</th>
                  <th className="p-1 border">Nº CCe</th>
                  <th className="p-1 border">Protocolo CCe</th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-1 border text-center">
                      <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        className="accent-red-700"
                      />
                    </td>
                    <td className="p-1 border text-center">00025{idx}</td>
                    <td className="p-1 border text-center">001{idx}</td>
                    <td className="p-1 border text-center">06/11/2025</td>
                    <td className="p-1 border text-center">Autorizado</td>
                    <td className="p-1 border text-left">100 - Autorizado o uso do CT-e</td>
                    <td className="p-1 border text-center">sim@teste.com</td>
                    <td className="p-1 border text-center font-mono">
                      35251100000000000000000000000000000000000
                    </td>
                    <td className="p-1 border text-center">13525000{idx}</td>
                    <td className="p-1 border text-center">2510048{idx}</td>
                    <td className="p-1 border text-center">01</td>
                    <td className="p-1 border text-center">98765{idx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rodapé da Grid */}
          <div className="text-[12px] text-gray-700 flex justify-between mt-1">
            <span>Total de Registros: 6</span>
            <span>
              Total Selecionado:{" "}
              <span className="text-red-700 font-semibold">{selectedCount}</span>
            </span>
          </div>
        </div>

        {/* === CARD 3 - Botões === */}
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
              onClick={onClose}
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
              <FileText size={14} className="text-yellow-600" /> CCe
            </button>

            <button className="border border-gray-300 rounded px-3 py-1 bg-yellow-50 hover:bg-yellow-100 flex items-center gap-1">
              <Mail size={14} className="text-yellow-600" /> E-mail
            </button>

            <button className="border border-gray-300 rounded px-3 py-1 bg-red-50 hover:bg-red-100 flex items-center gap-1">
              <XCircle size={14} className="text-red-600" /> Cancelar
            </button>

            <button className="border border-gray-300 rounded px-3 py-1 bg-red-600 hover:bg-red-700 text-white flex items-center gap-1">
              <StopCircle size={14} /> GNRE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
