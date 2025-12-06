import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  XCircle,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function BaixaManifesto({ onClose }) {
  const isGlobalModal = !!onClose;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("conhecimentos");
  const [showSuccess, setShowSuccess] = useState(false);

  // mocks só pra visualizar as colunas
  const conhecimentos = [
    {
      empresa: "001",
      filial: "001",
      tp: "CT",
      serie: "001",
      nro: "058782",
      destinatario: "HNK-SALVADOR-AGUA MI",
      dtEntrega: "",
      hrEntrega: "",
      dtEmissao: "09/10/2025",
      nroControle: "058810",
    },
  ];
  const nfsCte = [
    {
      empresa: "001",
      filial: "001",
      nf: "123456",
      serie: "1",
      cnpjRemet: "12.345.678/0001-99",
      razaoRemet: "REMETENTE LTDA",
      nroControle: "98765",
      nroImpresso: "000123",
    },
  ];

  const handleBaixar = () => {
    // por enquanto só mostra a telinha de sucesso
    setShowSuccess(true);
  };

  return (
    <div className={isGlobalModal ? "fixed inset-0 z-50 bg-black/40 flex items-center justify-center" : "w-full h-full flex items-center justify-center"}>
      <div className="relative bg-white w-[1100px] max-w-[95vw] max-h-[92vh] overflow-y-auto rounded border border-gray-300 shadow-lg p-3">
        {/* Título */}
        <h1 className="text-center text-red-700 font-semibold border-b border-gray-300 pb-1 text-sm">
          BAIXA DE MANIFESTO / CONHECIMENTO
        </h1>

        {/* === CARD 1: Dados === */}
        <fieldset className="border border-gray-300 rounded p-3 bg-white mt-3">
          <legend className="text-red-700 font-semibold text-[13px] px-2">
            Dados
          </legend>

          {/* Linha 1 - Empresa e Filial */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="flex items-center gap-2">
              <label className="w-20 text-[12px]">Empresa</label>
              <select className="border border-gray-300 rounded h-[26px] text-[13px] px-2 flex-1">
                <option>001 - MANTRAN TRANSPORTES LTDA</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-12 text-[12px]">Filial</label>
              <select className="border border-gray-300 rounded h-[26px] text-[13px] px-2 flex-1">
                <option>001 - TESTE MANTRAN</option>
              </select>
            </div>
          </div>

          {/* Linha 2 - Nº Manifesto, Placa, KM Inicial (R), KM Final (R) */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="flex items-center gap-2">
              <label className="w-20 text-[12px]">Nº Manifesto</label>
              <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 w-[120px]" defaultValue="043558" />
              <label className="w-20 text-[12px]">Placa Veículo</label>
              <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 w-[120px]" defaultValue="RENSJ17" />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <label className="text-[12px]">KM Inicial</label>
              <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 w-[90px] text-right" defaultValue="10" />
              <label className="text-[12px]">KM Final</label>
              <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 w-[90px] text-right" defaultValue="100" />
            </div>
          </div>

          {/* Linha 3 - Data Chegada, Hora Chegada, Qt KM Rota (R), QT KM Excedido (R) */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="flex items-center gap-2">
              <label className="w-20 text-[12px]">Data Chegada</label>
              <input type="date" className="border border-gray-300 rounded h-[26px] text-[13px] px-2" defaultValue="2025-10-25" />
              <label className="w-20 text-[12px]">Hora Chegada</label>
              <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 w-[80px]" defaultValue="15:34" />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <label className="text-[12px]">QT KM Rota</label>
              <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 w-[110px] text-right" defaultValue="0,000" />
              <label className="text-[12px]">QT KM Excedido</label>
              <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 w-[110px] text-right" defaultValue="90" />
            </div>
          </div>

          {/* Linha 4 - Data Entrega, Hora Entrega, Ocorrência */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="flex items-center gap-2">
              <label className="w-20 text-[12px]">Data Entrega</label>
              <input type="date" className="border border-gray-300 rounded h-[26px] text-[13px] px-2" defaultValue="2025-10-25" />
              <label className="w-20 text-[12px]">Hora Entrega</label>
              <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 w-[80px]" defaultValue="15:34" />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-20 text-[12px]">Ocorrência</label>
              <select className="border border-gray-300 rounded h-[26px] text-[13px] px-2 flex-1">
                <option>001 - ENTREGA REALIZADA NORMALMENTE</option>
              </select>
            </div>
          </div>

          {/* Linha 5 - Motorista (L) + Docs Pendentes (R) */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-[12px]">Motorista</label>
            <input className="border border-gray-300 rounded h-[26px] text-[13px] px-2 flex-1" defaultValue="ADALTO RODRIGUES DE MACEDO" />
            <button
              className="ml-auto border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 text-[12px]"
              onClick={() => alert("Abrir Docs Pendentes")}
            >
              Docs Pendentes
            </button>
          </div>
        </fieldset>

        {/* === CARD 2: Grid com abas === */}
        <div className="border border-gray-300 rounded bg-white mt-3">
          {/* Abas */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex gap-1">
              {[
                { key: "conhecimentos", label: "Conhecimentos" },
                { key: "nfs", label: "NFs do CTe" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1 text-[12px] border rounded-t ${activeTab === tab.key
                      ? "bg-white text-red-700 border-gray-300"
                      : "bg-gray-100 text-gray-600 border-transparent"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* setinhas só ilustrativas */}
            <div className="flex gap-1 text-gray-500">
              <ChevronLeft size={16} />
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Tabela */}
          <div className="p-2 border-t border-gray-300 overflow-auto max-h-[260px]">
            {activeTab === "conhecimentos" ? (
              <table className="min-w-[1200px] w-full text-[12px] border">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    {[
                      "Empresa",
                      "Filial",
                      "TP",
                      "Série",
                      "Nº Docto",
                      "Destinatário",
                      "DT Entrega",
                      "HR Entrega",
                      "DT Emissão",
                      "Nº Controle",
                    ].map((c) => (
                      <th key={c} className="border p-1 text-left whitespace-nowrap">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {conhecimentos.map((r, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                      <td className="border p-1">{r.empresa}</td>
                      <td className="border p-1">{r.filial}</td>
                      <td className="border p-1">{r.tp}</td>
                      <td className="border p-1">{r.serie}</td>
                      <td className="border p-1">{r.nro}</td>
                      <td className="border p-1">{r.destinatario}</td>
                      <td className="border p-1">{r.dtEntrega}</td>
                      <td className="border p-1">{r.hrEntrega}</td>
                      <td className="border p-1">{r.dtEmissao}</td>
                      <td className="border p-1">{r.nroControle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="min-w-[1200px] w-full text-[12px] border">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    {[
                      "Empresa",
                      "Filial",
                      "NF",
                      "Série",
                      "CNPJ Remetente",
                      "Razão Social Remetente",
                      "Nº Controle",
                      "Nº Impresso",
                    ].map((c) => (
                      <th key={c} className="border p-1 text-left whitespace-nowrap">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nfsCte.map((r, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                      <td className="border p-1">{r.empresa}</td>
                      <td className="border p-1">{r.filial}</td>
                      <td className="border p-1">{r.nf}</td>
                      <td className="border p-1">{r.serie}</td>
                      <td className="border p-1">{r.cnpjRemet}</td>
                      <td className="border p-1">{r.razaoRemet}</td>
                      <td className="border p-1">{r.nroControle}</td>
                      <td className="border p-1">{r.nroImpresso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* === CARD 3: Rodapé === */}
        <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-5 text-red-700 justify-start">
          <button
            onClick={() => {
              if (onClose) onClose();
              else navigate("/");
            }}
            title="Fechar"
            className="flex flex-col items-center text-[11px] hover:text-red-800"
          >
            <XCircle size={20} />
            <span>Fechar</span>
          </button>

          <button
            onClick={() => console.log("limpar")}
            title="Limpar"
            className="flex flex-col items-center text-[11px] hover:text-red-800"
          >
            <RotateCcw size={20} />
            <span>Limpar</span>
          </button>

          <button
            onClick={handleBaixar}
            title="Baixar Manifesto"
            className="flex flex-col items-center text-[11px] hover:text-red-800"
          >
            <Download size={20} />
            <span>Baixar</span>
          </button>
        </div>

        {/* Telinha de sucesso (simples, por cima) */}
        {showSuccess && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded shadow-md border border-gray-300 p-5 w-[360px] text-center">
              <p className="text-green-700 font-semibold">
                Manifesto baixado com sucesso!
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="border border-gray-300 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 text-[12px]"
                >
                  OK
                </button>
                <button
                  onClick={onClose}
                  className="border border-gray-300 rounded px-3 py-1 bg-red-50 hover:bg-red-100 text-[12px] text-red-600"
                >
                  Fechar Tela
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
