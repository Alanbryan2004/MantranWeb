import { useState } from "react";
import { XCircle, Edit } from "lucide-react";


function Label({ children, className = "" }) {
  return (
    <label className={`text-[12px] text-gray-700 ${className}`}>
      {children}
    </label>
  );
}

function Txt(props) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] w-full ${props.className || ""}`}
    />
  );
}

export default function EmpresaParametro({ onClose }) {
  // Campos locais (poderão ser integrados com backend futuramente)
  const [dados, setDados] = useState({
    empresa: "ELITE LOG TRANSPORTES LTDA",
    pastaXML: "",
    numeroLicenca: "",
    seqCorrentista: "",
    seqEventual: "",
    numViagem: "",
    emailSAC: "",
    flags: {
      reiniciaFatura: false,
      diffFatura: false,
      usarRemetente: false,
      usarFilial: false,
      integracaoCIOT: false,
      baixaXML: false,
      acessoMilk: false,
      integracaoIntel: false,
      integracaoATM: false,
      atmWeb: false,
      enviarCTRC: false,
      enviarWhats: false,
      numViagemPorEmpresa: false,
      drePadrao: false,
    },
  });

  const toggle = (f) => {
    setDados((prev) => ({
      ...prev,
      flags: { ...prev.flags, [f]: !prev.flags[f] },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[800px] rounded shadow-lg border border-gray-300 p-4">

        {/* Título */}
        <h2 className="text-center text-red-700 font-semibold text-[15px] mb-3 border-b pb-1">
          EMPRESA PARÂMETRO
        </h2>

        {/* EMPRESA */}
        <div className="mb-3">
          <Label>Empresa</Label>
          <Txt value={dados.empresa} disabled className="bg-gray-100" />
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-2 gap-4">

          {/* Coluna Esquerda */}
          <div className="space-y-2">

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.reiniciaFatura}
                onChange={() => toggle("reiniciaFatura")}
              />
              Reinicia a numeração das faturas mensalmente
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.diffFatura}
                onChange={() => toggle("diffFatura")}
              />
              Numeração diferenciada de faturas por Correntista e Eventual
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.usarRemetente}
                onChange={() => toggle("usarRemetente")}
              />
              Usar como Remetente do CT-e o Solicitante da Coleta
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.usarFilial}
                onChange={() => toggle("usarFilial")}
              />
              Usar Filial Faturamento
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.integracaoCIOT}
                onChange={() => toggle("integracaoCIOT")}
              />
              Integração com CIOT
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.baixaXML}
                onChange={() => toggle("baixaXML")}
              />
              Baixa XML de Nota Fiscal
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.acessoMilk}
                onChange={() => toggle("acessoMilk")}
              />
              Acesso ao módulo Milk Run
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.integracaoIntel}
                onChange={() => toggle("integracaoIntel")}
              />
              Integração com a Intelpost
            </label>
            
            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.integracaoIntel}
                onChange={() => toggle("integracaoIntel")}
              />
              Integração com ATM
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.integracaoIntel}
                onChange={() => toggle("integracaoIntel")}
              />
              Enviar Email Cte Sometente para Tomador
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.integracaoIntel}
                onChange={() => toggle("integracaoIntel")}
              />
              Enviar Documentos por mensagem Whatsapp
            </label>

          </div>

          {/* Coluna Direita */}
          <div className="space-y-2">

            

        <div>
  <Label>Número de licença Mobile</Label>
  <Txt
    name="numeroLicenca"
    value={dados.numeroLicenca}
    onChange={(e) =>
      setDados({ ...dados, numeroLicenca: e.target.value.replace(/\D/g, "") })
    }
  />
</div>

            <div>
              <Label>Sequência de Fatura Correntista</Label>
              <Txt />
            </div>

            <div>
              <Label>Sequência de Fatura Eventual</Label>
              <Txt />
            </div>

            <div>
              <Label>Numeração de Viagem</Label>
              <Txt />
            </div>

            <div>
              <Label>Email SAC</Label>
              <Txt />
            </div>

            <label className="flex items-center gap-2 text-[12px] mt-2">
              <input
                type="checkbox"
                checked={dados.flags.numViagemPorEmpresa}
                onChange={() => toggle("numViagemPorEmpresa")}
              />
              Numeração de Viagem por Empresa
            </label>

            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={dados.flags.drePadrao}
                onChange={() => toggle("drePadrao")}
              />
              DRE Padrão
            </label>

          </div>
        </div>

        {/* BOTÕES */}
        <div className="flex justify-center gap-4 mt-5">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-red-700 hover:text-black"
          >
            <XCircle size={18} /> Fechar
          </button>

          <button className="flex items-center gap-1 text-gray-700 hover:text-black">
            <Edit size={18} /> Alterar
          </button>
        </div>
      </div>
    </div>
  );
}
