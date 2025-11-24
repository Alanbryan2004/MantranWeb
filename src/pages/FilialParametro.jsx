// src/pages/FilialParametro.jsx
import { XCircle, CheckCircle2 } from "lucide-react";

function Label({ children, className = "" }) {
  return (
    <span className={`text-[12px] text-gray-700 ${className}`}>{children}</span>
  );
}

export default function FilialParametro({ onClose }) {
  const handleAlterar = () => {
    alert("Parâmetros da Filial alterados (mock).");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-w-[95vw] max-h-[90vh] rounded-md shadow-xl p-4 overflow-y-auto">
        <h2 className="text-center text-red-700 font-semibold text-[15px] mb-3">
          FILIAL PARÂMETRO
        </h2>

        <div className="grid md:grid-cols-3 gap-3 text-[12px]">
          {/* CONHECIMENTO */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold">
              CONHECIMENTO
            </legend>
            <div className="mt-1 space-y-1">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Al Dt. Emissão ao Autorizar</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Apenas CTRC de Serviço x Cliente</Label>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="accent-red-700"
                  defaultChecked
                />
                <Label>Custos Adicionais Opcionais</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>ICMS MultModal</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Impressão CTe em Lote</Label>
              </label>
            </div>
          </fieldset>

          {/* COLETA */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold">COLETA</legend>
            <div className="mt-1 space-y-1">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Baixa CTe Não Encerra Coleta</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Não Encerrar Coleta</Label>
              </label>
            </div>
          </fieldset>

          {/* VIAGEM */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold">VIAGEM</legend>
            <div className="mt-1 space-y-1">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="accent-red-700"
                  defaultChecked
                />
                <Label>Agregado por Placa</Label>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="accent-red-700"
                  defaultChecked
                />
                <Label>Gerar CP para Frota</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Não Calcular Impostos Viagem</Label>
              </label>
            </div>
          </fieldset>

          {/* MINUTA */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold">MINUTA</legend>
            <div className="mt-1 space-y-1">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Averba Minuta de Transporte</Label>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="accent-red-700"
                  defaultChecked
                />
                <Label>Gerar 1 Minuta por Coleta</Label>
              </label>
            </div>
          </fieldset>

          {/* FINANCEIRO */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold">
              FINANCEIRO
            </legend>
            <div className="mt-1 space-y-1">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Fatura Versão por NF</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Não Compactar Arquivos Fatura</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Filial Faturamento Automático</Label>
              </label>
            </div>
          </fieldset>

          {/* INTEGRAÇÃO */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold">
              INTEGRAÇÃO
            </legend>
            <div className="mt-1 space-y-1">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Gerar CTRC através de Integração</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Integração Microlied</Label>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-red-700" />
                <Label>Integração Sapiens</Label>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Rodapé */}
        <div className="mt-4 border-t border-gray-200 pt-2 flex justify-end gap-2 text-[13px]">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100"
          >
            <XCircle size={16} className="text-red-700" />
            Fechar
          </button>
          <button
            onClick={handleAlterar}
            className="flex items-center gap-1 px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800"
          >
            <CheckCircle2 size={16} />
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}
