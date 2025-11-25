// src/pages/FilialNumeracao.jsx
import { XCircle, CheckCircle2 } from "lucide-react";

function Label({ children, className = "" }) {
  return (
    <label className={`text-[12px] text-gray-700 ${className}`}>{children}</label>
  );
}

function Txt(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 rounded px-1 py-[2px] h-[24px] text-[12px] " +
        (props.className || "")
      }
    />
  );
}

export default function FilialNumeracao({ onClose }) {
  const handleAlterar = () => {
    alert("Numeração de documentos alterada (mock).");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-w-[95vw] rounded-md shadow-xl p-4">
        <h2 className="text-center text-red-700 font-semibold text-[15px] mb-3">
          NUMERAÇÃO DOCUMENTOS
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-[12px]">
          {/* Bloco 1 */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold text-red-700">
              CONTROLE / CTe / Coleta / Viagem
            </legend>
            <div className="mt-1 space-y-2">
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Último Controle</Label>
                <Txt className="flex-1 text-right" defaultValue="264730" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Último CTe</Label>
                <Txt className="flex-1 text-right" defaultValue="264375" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Série do CTe</Label>
                <Txt className="flex-1 text-right" defaultValue="001" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Última Coleta</Label>
                <Txt className="flex-1 text-right" defaultValue="185708" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Última Viagem</Label>
                <Txt className="flex-1 text-right" defaultValue="079036" />
              </div>
            </div>
          </fieldset>

          {/* Bloco 2 */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold text-red-700">
              FATURA / OS / OCORRÊNCIA / ROMANEIO
            </legend>
            <div className="mt-1 space-y-2">
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Última Fatura</Label>
                <Txt className="flex-1 text-right" defaultValue="046496" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Última OS</Label>
                <Txt className="flex-1 text-right" defaultValue="001452" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Última Ocorrência</Label>
                <Txt className="flex-1 text-right" defaultValue="029275" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Último Romaneio</Label>
                <Txt className="flex-1 text-right" defaultValue="000001" />
              </div>
            </div>
          </fieldset>

          {/* Bloco 3 */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="px-1 text-[11px] font-semibold text-red-700">
              NF SERVIÇO / MANIFESTO
            </legend>
            <div className="mt-1 space-y-2">
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Última NF Serviço</Label>
                <Txt className="flex-1 text-right" defaultValue="014051" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº NF Saída</Label>
                <Txt className="flex-1 text-right" defaultValue="000024" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Série NF Serviço</Label>
                <Txt className="flex-1 text-right" defaultValue="005" />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[150px]">Nº Último Manifesto</Label>
                <Txt className="flex-1 text-right" defaultValue="043565" />
              </div>
            </div>
          </fieldset>

          {/* Bloco 4 */}
<fieldset className="border border-gray-300 rounded p-2">
  <legend className="px-1 text-[11px] font-semibold text-red-700">
    MDF-e / NSU / SÉRIES
  </legend>
  <div className="mt-1 space-y-2">
    <div className="flex items-center gap-2">
      <Label className="w-[150px]">Nº Último MDF-e</Label>
      <Txt className="flex-1 text-right" defaultValue="001374" />
    </div>

    <div className="flex items-center gap-2">
      <Label className="w-[150px]">Nº Série MDF-e</Label>
      <Txt className="flex-1 text-right" defaultValue="000" />
    </div>

    <div className="flex items-center gap-2">
      <Label className="w-[150px]">Nº Último NSU</Label>
      <Txt
        className="flex-1 text-right"
        defaultValue="000000000587843"
      />
    </div>

    <div className="flex items-center gap-2">
      <Label className="w-[150px]">Créd Série</Label>
      <Txt className="flex-1 text-right" defaultValue="001" />
    </div>

    <div className="flex items-center gap-2">
      <Label className="w-[150px]">Deb Série</Label>
      <Txt className="flex-1 text-right" defaultValue="001" />
    </div>
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
