import { XCircle, RotateCcw, Edit, FilePlus2 } from "lucide-react";

export default function ManifestoInfoComplementar({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-[13px]">
      <div className="bg-white w-[750px] rounded shadow-lg border border-gray-300 p-4">
        {/* Título */}
        <h2 className="text-center text-red-700 font-semibold text-[14px] mb-3 border-b pb-1">
          INFORMAÇÕES COMPLEMENTARES
        </h2>

        <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
          {/* ===== CARD 1 - CIOT ===== */}
          <fieldset className="border border-gray-300 rounded p-3">
            <legend className="text-[13px] text-red-700 font-medium px-2">
              CIOT
            </legend>

            {/* Linha 1 */}
            <div className="flex items-center gap-2 mb-2">
              <label className="w-20 text-[12px]">Número</label>
              <input
                type="text"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] flex-1"
                defaultValue="3527534573452371"
              />
            </div>

            {/* Linha 2 */}
            <div className="flex items-center gap-2">
              <label className="w-20 text-[12px]">Responsável</label>
              <input
                type="text"
                placeholder="CNPJ"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] w-[180px]"
                defaultValue="50221019000136"
              />
              <input
                type="text"
                placeholder="Razão Social"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] flex-1"
                defaultValue="HNK-ITU (1) MATRIZ"
              />
            </div>
          </fieldset>

          {/* ===== CARD 2 - VALE PEDÁGIO ===== */}
          <fieldset className="border border-gray-300 rounded p-3">
            <legend className="text-[13px] text-red-700 font-medium px-2">
              Vale Pedágio
            </legend>

            {/* Linha 1 */}
            <div className="flex items-center gap-2 mb-2">
              <label className="w-20 text-[12px]">Fornecedor</label>
              <input
                type="text"
                placeholder="CNPJ"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] w-[180px]"
                defaultValue="07369701000141"
              />
              <input
                type="text"
                placeholder="Razão Social"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] flex-1"
                defaultValue="SEM PARAR"
              />
            </div>

            {/* Linha 2 */}
            <div className="flex items-center gap-2">
              <label className="w-20 text-[12px]">Comprovante</label>
              <input
                type="text"
                placeholder="Nº Comprovante"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] flex-1"
                defaultValue="456324652432"
              />
              <label className="ml-auto text-[12px]">Valor</label>
              <input
                type="text"
                placeholder="0,00"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-right w-[120px]"
                defaultValue="75,67"
              />
            </div>
          </fieldset>

          {/* ===== CARD 3 - CONTRATANTE ===== */}
          <fieldset className="border border-gray-300 rounded p-3">
            <legend className="text-[13px] text-red-700 font-medium px-2">
              Contratante
            </legend>

            {/* Linha 1 */}
            <div className="flex items-center gap-2 mb-2">
              <label className="w-24 text-[12px]">Contratante</label>
              <select className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-[13px] w-[200px]">
                <option>Emitente</option>
                <option>Remetente</option>
                <option>Destinatário</option>
                <option>Outros</option>
              </select>
            </div>

            {/* Linha 2 */}
            <div className="flex items-center gap-2">
              <label className="w-24 text-[12px]">CNPJ / CPF</label>
              <input
                type="text"
                placeholder="CNPJ / CPF"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] w-[180px]"
                defaultValue="04086814000141"
              />
              <input
                type="text"
                placeholder="Razão Social"
                className="border border-gray-300 rounded px-2 py-[2px] h-[24px] flex-1"
                defaultValue="MANTRAN TESTES"
              />
            </div>
          </fieldset>
        </div>

        {/* ===== CARD 4 - RODAPÉ ===== */}
        <div className="border-t border-gray-200 mt-4 pt-2 flex justify-start gap-4 text-[12px]">
          {/* Fechar */}
          <button
            onClick={onClose}
            className="flex flex-col items-center text-red-700 hover:text-red-800 transition"
          >
            <XCircle size={18} />
            <span>Fechar</span>
          </button>

          {/* Limpar */}
          <button className="flex flex-col items-center text-gray-600 hover:text-red-700 transition">
            <RotateCcw size={18} />
            <span>Limpar</span>
          </button>

          {/* Alterar */}
          <button className="flex flex-col items-center text-gray-600 hover:text-red-700 transition">
            <Edit size={18} />
            <span>Alterar</span>
          </button>

          {/* Gerar CIOT */}
          <button className="flex flex-col items-center text-green-700 hover:text-green-800 transition">
            <FilePlus2 size={18} />
            <span>Gerar CIOT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
