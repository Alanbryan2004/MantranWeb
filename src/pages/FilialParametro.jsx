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
      <div className="bg-white w-[1400px] max-w-[95vw] max-h-[95vh] rounded-md shadow-xl p-4 overflow-y-auto">
        <h2 className="text-center text-red-700 font-semibold text-[15px] mb-3">
          FILIAL PARÂMETRO
        </h2>

        {/* =================== GRID 4 COLUNAS =================== */}
        <div className="grid grid-cols-4 gap-4 text-[12px]">

          {/* ==================== COLUNA 1 ==================== */}
          <div className="flex flex-col gap-3">

            {/* CONHECIMENTO */}
            <fieldset className="border border-gray-300 rounded p-2">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                CONHECIMENTO
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Al Dt. Emissão ao Autorizar</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Apenas CTRC de Serviço x Cliente</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Corrigir Remetente e Destinatário</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" defaultChecked /><Label>Custos Adicionais Opcionais</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>ICMS MultiModal</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Impressão CTe em Lote</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Mesmo Remetente/Destinatário</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Não Gerar CTE s/ Rota</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Não Usar Endereço na Obs. CTe</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Soma VR_Container no VR_Mercadoria</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Usar Recebedor CTe</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Zerar Prest. CTe Complemento Imposto</Label></label>
              </div>
            </fieldset>

            {/* MINUTA */}
            <fieldset className="border border-gray-300 rounded p-2">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                MINUTA
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Averba Minuta de Transporte</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" defaultChecked /><Label>Gerar 1 Minuta por Coleta</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Minuta Não Cobrar ICMS</Label></label>
              </div>
            </fieldset>

          </div>


          {/* ==================== COLUNA 2 ==================== */}
          <div className="flex flex-col gap-3">

            {/* NFE */}
            <fieldset className="border border-gray-300 rounded p-2">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                NFE
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Assumir Valor Frete da NF</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Baixa NF Atualizar Cliente</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>NF EDI: Entrega Transportadora</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>NF EDI: Importar NF Bloqueada</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>NF EDI: Nota TP 0 Troca Rem x Des</Label></label>
              </div>
            </fieldset>

            {/* COLETA */}
            <fieldset className="border border-gray-300 rounded p-2 h-[140px]">

              <legend className="px-1 text-[11px] font-semibold text-red-700">
                COLETA
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Baixa CTe Não Encerra Coleta</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Não Encerrar Coleta</Label></label>
              </div>
            </fieldset>

            {/* MANIFESTO */}
            <fieldset className="border border-gray-300 rounded p-2 h-[100px]">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                MANIFESTO
              </legend>
              <div className="mt-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Não Emitir MDFE com Veículo nos Últimos 30 dias</Label></label>
              </div>
            </fieldset>

          </div>


          {/* ==================== COLUNA 3 ==================== */}
          <div className="flex flex-col gap-3">

            {/* SISTEMA */}
            <fieldset className="border border-gray-300 rounded p-2">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                SISTEMA
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Filial com CTE</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Filial com Logo Próprio</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Filial com MDFE</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Financeiro Híbrido</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Operação Híbrido</Label></label>
              </div>
            </fieldset>

            {/* FINANCEIRO */}
            <fieldset className="border border-gray-300 rounded p-2 h-[120px]">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                FINANCEIRO
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Fatura Versão por NF</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Não Compactar Arquivos Fatura</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Filial Faturamento Automático</Label></label>
              </div>
            </fieldset>

            {/* INTEGRAÇÃO */}
            <fieldset className="border border-gray-300 rounded p-2">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                INTEGRAÇÃO
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Gerar CTRC via Integração</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Integração Microlied</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Integração Sapiens</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Validar Liberação Gestão Entrega</Label></label>
              </div>
            </fieldset>

          </div>


          {/* ==================== COLUNA 4 ==================== */}
          <div className="flex flex-col gap-3">

            {/* VIAGEM */}
            <fieldset className="border border-gray-300 rounded p-2 h-[275px]">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                VIAGEM
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Agregado por Placa</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Gerar CP para Frota</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Habilita CP Despesa Viagem (A)</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Histórico Despesa Obrigatório</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Incluir Nova Viagem Mesma Placa</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Incluir Nova Viagem Mesma Placa (ETC)</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Não Calcular Impostos Viagem</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Permite TAC para Vários Agregados</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Validar Pagamento Container</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Viagem Busca Tabela por Cliente</Label></label>
              </div>
            </fieldset>

            {/* CADASTROS BÁSICOS */}
            <fieldset className="border border-gray-300 rounded p-2 h-[120px]">
              <legend className="px-1 text-[11px] font-semibold text-red-700">
                CADASTROS BÁSICOS
              </legend>
              <div className="mt-1 space-y-1">
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Bloquear Documentos Vencidos</Label></label>
                <label className="flex items-center gap-1"><input type="checkbox" className="accent-red-700" /><Label>Validação de GRIS do Motorista</Label></label>
              </div>
            </fieldset>

          </div>

        </div>


        {/* RODAPÉ */}
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
