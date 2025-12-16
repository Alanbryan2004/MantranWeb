import { X } from "lucide-react";

export default function InicioColetaModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[1180px] rounded shadow-lg border border-gray-300 flex flex-col">

        {/* ================= HEADER ================= */}
        <div className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-red-700 font-semibold text-[14px]">
            Início da Coleta
          </h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* ================= CONTEÚDO ================= */}
        <div className="p-3 space-y-3 text-[12px]">

          {/* ========= CARD 1 ========= */}
          <fieldset className="border border-gray-300 rounded p-3">
            <legend className="px-2 text-red-700 font-semibold">
              Dados do Início
            </legend>

            {/* LINHA 1 */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <label className="col-span-1 text-right">Início</label>

              <input
                type="date"
                defaultValue="2025-10-23"
                className="col-span-2 border rounded px-2 h-[26px]"
              />

              <input
                type="time"
                defaultValue="10:07"
                className="col-span-1 border rounded px-2 h-[26px]"
              />

              <label className="col-span-2 text-right">Veículo Solic.</label>
              <select className="col-span-4 border rounded px-2 h-[26px]">
                <option>01 - UTILITÁRIO</option>
                <option>02 - VAN</option>
                <option>03 - 3/4</option>
                <option>04 - TOCO</option>
                <option>05 - TRUCK</option>
                <option>06 - BITRUCK</option>
                <option>07 - CAVALO MECÂNICO</option>
              </select>
            </div>

            {/* LINHA 2 */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <label className="col-span-1 text-right">Motorista</label>

              <input
                defaultValue="01628446760"
                className="col-span-2 border rounded px-2 h-[26px]"
              />

              <input
                defaultValue="ALAN DA COSTA"
                readOnly
                className="col-span-4 border rounded px-2 h-[26px] bg-gray-200"
              />

              <label className="col-span-1 text-right">Placa</label>
              <input
                defaultValue="RXW4156"
                readOnly
                className="col-span-2 border rounded px-2 h-[26px] bg-gray-200"
              />

              <label className="col-span-1 flex items-center gap-1">
                <input type="checkbox" />
                Desligado
              </label>
            </div>

            {/* LINHA 3 */}
            <div className="grid grid-cols-12 gap-2 items-center mt-2">
              <label className="col-span-1 text-right">Tração</label>

              <input
                defaultValue="000050"
                className="col-span-2 border rounded px-2 h-[26px]"
              />

              <input
                defaultValue="RXW4156 - CAVALO MEC - ITAJAI"
                readOnly
                className="col-span-4 border rounded px-2 h-[26px] bg-gray-200"
              />

              <label className="col-span-1 text-right">Km Início</label>
              <input
                defaultValue="125554"
                className="col-span-1 border rounded px-2 h-[26px]"
              />

              <label className="col-span-1 text-right">Classe</label>
              <input
                defaultValue="CAVALO TRUCADO"
                readOnly
                className="col-span-2 border rounded px-2 h-[26px] bg-gray-200"
              />
            </div>





            {/* LINHA 5 */}
            <div className="grid grid-cols-12 gap-2 items-center mt-2">
              <label className="col-span-1 text-right">Reboque</label>

              <input
                defaultValue="0034811"
                className="col-span-2 border rounded px-2 h-[26px]"
              />

              <input
                defaultValue="RKW3E53 - CARRETA SIDER - ITAJAI"
                readOnly
                className="col-span-9 border rounded px-2 h-[26px] bg-gray-200"
              />
            </div>

            {/* LINHA 6 */}
            <div className="grid grid-cols-12 gap-2 items-center mt-2">
              <label className="col-span-1 text-right">Reboque 2</label>

              <input
                defaultValue="3599950"
                className="col-span-2 border rounded px-2 h-[26px]"
              />

              <input
                defaultValue="BSF4B77 - CARRETA - UTILITARIO - ITAJAI"
                readOnly
                className="col-span-9 border rounded px-2 h-[26px] bg-gray-200"
              />
            </div>

            {/* LINHA 7 */}
            <div className="grid grid-cols-12 gap-2 items-center mt-2">
              <label className="col-span-1 text-right">Transportador</label>

              <input
                defaultValue="16464947000193 - BEVIANI TRANSPORTES LTDA"
                readOnly
                className="col-span-11 border rounded px-2 h-[26px] bg-gray-200"
              />
            </div>
          </fieldset>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t border-gray-300 px-4 py-2 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border px-4 py-[4px] rounded text-[12px] hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button className="border px-6 py-[4px] rounded text-[12px] bg-blue-50 text-blue-700 hover:bg-blue-100">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
