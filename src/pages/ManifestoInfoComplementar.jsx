import { XCircle, RotateCcw, Edit, FilePlus2 } from "lucide-react";

// ===== Helpers padrão Mantran =====
function Label({ children, className = "" }) {
  return (
    <label
      className={`text-[12px] text-gray-600 flex items-center justify-end ${className}`}
    >
      {children}
    </label>
  );
}

function Txt({ className = "", readOnly = false, ...props }) {
  return (
    <input
      {...props}
      readOnly={readOnly}
      className={`
        border border-gray-300 rounded
        px-2 py-[2px] h-[26px] text-[13px]
        ${readOnly ? "bg-gray-200 text-gray-600" : "bg-white"}
        ${className}
      `}
    />
  );
}

function Sel({ children, className = "", ...rest }) {
  return (
    <select
      {...rest}
      className={`
        border border-gray-300 rounded
        px-2 py-[2px] h-[26px] text-[13px] bg-white
        ${className}
      `}
    >
      {children}
    </select>
  );
}

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
          <fieldset className="border border-gray-300 rounded p-3 bg-white">
            <legend className="text-[13px] text-red-700 font-medium px-2">
              CIOT
            </legend>

            {/* LINHA 01 */}
            <div className="grid grid-cols-12 gap-2 items-center mb-2">
              <Label className="col-span-2">Número</Label>

              <Txt
                className="col-span-10"
                defaultValue="3527534573452371"
              />
            </div>

            {/* LINHA 02 */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <Label className="col-span-2">Responsável</Label>

              {/* CNPJ */}
              <Txt
                className="col-span-3"
                defaultValue="50221019000136"
                placeholder="CNPJ"
              />

              {/* Razão Social — NÃO EDITÁVEL */}
              <Txt
                className="col-span-7 bg-gray-200"
                readOnly
                defaultValue="HNK-ITU (1) MATRIZ"
                placeholder="Razão Social"
              />
            </div>
          </fieldset>


          {/* ===== CARD 2 - VALE PEDÁGIO ===== */}
          <fieldset className="border border-gray-300 rounded p-3 bg-white">
            <legend className="text-[13px] text-red-700 font-medium px-2">
              Vale Pedágio
            </legend>

            {/* LINHA 01 — FORNECEDOR */}
            <div className="grid grid-cols-12 gap-2 items-center mb-2">
              <Label className="col-span-2">Fornecedor</Label>

              {/* CNPJ */}
              <Txt
                className="col-span-3"
                defaultValue="07369701000141"
                placeholder="CNPJ"
              />

              {/* Razão Social — NÃO EDITÁVEL */}
              <Txt
                className="col-span-7 bg-gray-200"
                readOnly
                defaultValue="SEM PARAR"
                placeholder="Razão Social"
              />
            </div>

            {/* LINHA 02 — COMPROVANTE / VALOR */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <Label className="col-span-2">Comprovante</Label>

              <Txt
                className="col-span-6"
                defaultValue="456324652432"
                placeholder="Nº Comprovante"
              />

              <Label className="col-span-2">Valor</Label>

              <Txt
                className="col-span-2 text-right"
                defaultValue="75,67"
                placeholder="0,00"
              />
            </div>
          </fieldset>

          {/* ===== CARD 3 - CONTRATANTE ===== */}
          <fieldset className="border border-gray-300 rounded p-3 bg-white">
            <legend className="text-[13px] text-red-700 font-medium px-2">
              Contratante
            </legend>

            {/* LINHA 01 */}
            <div className="grid grid-cols-12 gap-2 items-center mb-2">
              <Label className="col-span-2">Contratante</Label>

              <Sel className="col-span-3 w-full">
                <option>Emitente</option>
                <option>Remetente</option>
                <option>Destinatário</option>
                <option>Outros</option>
              </Sel>
            </div>

            {/* LINHA 02 */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <Label className="col-span-2">CNPJ / CPF</Label>

              {/* Documento */}
              <Txt
                className="col-span-3"
                defaultValue="04086814000141"
                placeholder="CNPJ / CPF"
              />

              {/* Razão Social — NÃO EDITÁVEL */}
              <Txt
                className="col-span-7 bg-gray-200"
                readOnly
                defaultValue="MANTRAN TESTES"
                placeholder="Razão Social"
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
