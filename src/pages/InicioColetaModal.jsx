import { useState } from "react";

export default function InicioColetaModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[950px] rounded shadow-lg border border-gray-300 p-4">
        <h2 className="text-red-700 font-semibold text-[14px] mb-3 border-b pb-1">
          Início da Coleta
        </h2>

        {/* CAMPOS */}
        <div className="space-y-2 text-[12px]">
          {/* Linha 1 */}
          <div className="flex items-center gap-3">
            <label className="w-[60px] text-right">Início</label>
            <input
              type="date"
              defaultValue="2025-10-23"
              className="border border-gray-300 rounded px-2 h-[24px] w-[130px]"
            />
            <input
              type="time"
              defaultValue="10:07"
              className="border border-gray-300 rounded px-2 h-[24px] w-[80px]"
            />
            <span>Hs</span>
            <label className="w-[90px] text-right">Veículo Solic.</label>
            <select className="flex-1 border border-gray-300 rounded px-2 h-[24px]">
              <option>01 - UTILITÁRIO</option>
              <option>02 - VAN</option>
              <option>03 - 3/4</option>
              <option>04 - TOCO</option>
              <option>05 - TRUCK</option>
              <option>06 - BITRUCK</option>
              <option>07 - CAVALO MECÂNICO</option>
            </select>

            <div className="flex-1 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="border border-gray-300 bg-gray-50 px-3 rounded text-[12px] hover:bg-gray-100"
              >
                Sair
              </button>
              <button className="border border-gray-300 bg-blue-50 text-blue-700 px-4 rounded text-[12px] hover:bg-blue-100">
                OK
              </button>
            </div>
          </div>

          {/* Linha 2 */}
          <div className="flex items-center gap-3">
            <label className="w-[60px] text-right">Motorista</label>
            <input
              defaultValue="01628446760"
              className="w-[150px] border border-gray-300 rounded px-2 h-[24px]"
            />
            <input
              defaultValue="ALAN DA COSTA"
              className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
            />
            <label className="flex items-center gap-1 text-[12px]">
              <input type="checkbox" /> Visualizar Motorista desligado
            </label>
            <label className="w-[50px] text-right">Placa</label>
            <input
              defaultValue="RXW4156"
              className="w-[100px] border border-gray-300 rounded px-2 h-[24px]"
            />
          </div>

          {/* Linha 3 */}
          <div className="flex items-center gap-3">
            <label className="w-[60px] text-right">Tração</label>
            <input
              defaultValue="0035719"
              className="w-[100px] border border-gray-300 rounded px-2 h-[24px]"
            />
            <input
              defaultValue="RXW4156 - CAVALO MEC - ITAJAI"
              className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
            />
            <label className="w-[70px] text-right">Km Início</label>
            <input
              defaultValue="125554"
              className="w-[100px] border border-gray-300 rounded px-2 h-[24px]"
            />
            <label className="w-[50px] text-right">Classe</label>
            <input
              defaultValue="13"
              className="w-[60px] border border-gray-300 rounded px-2 h-[24px]"
            />
            <input
              defaultValue="CAVALO TRUCADO"
              className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
            />
          </div>

          {/* Linha 4 */}
          <div className="flex items-center gap-3">
            <label className="w-[60px] text-right">Reboque</label>
            <input
              defaultValue="0034811"
              className="w-[100px] border border-gray-300 rounded px-2 h-[24px]"
            />
            <input
              defaultValue="RKW3E53 - CARRETA SIDER - ITAJAI"
              className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
            />
            <label className="w-[80px] text-right">Carroceria</label>
            <input
              defaultValue="02"
              className="w-[60px] border border-gray-300 rounded px-2 h-[24px]"
            />
            <input
              defaultValue="BAU SIDER"
              className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
            />
          </div>

          {/* Linha 5 */}
          <div className="flex items-center gap-3">
            <label className="w-[60px] text-right">Reboque 2</label>
            <input
              defaultValue="3599950"
              className="w-[100px] border border-gray-300 rounded px-2 h-[24px]"
            />
            <input
              defaultValue="BSF4B77 - CARRETA - UTILITARIO - ITAJAI"
              className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
            />
          </div>

          {/* Linha 6 */}
          <div className="flex items-center gap-3">
            <label className="w-[90px] text-right">Transportador</label>
            <input
              defaultValue="16464947000193 - BEVIANI TRANSPORTES LTDA"
              className="flex-1 border border-gray-300 rounded px-2 h-[24px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
