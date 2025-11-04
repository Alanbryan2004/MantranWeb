import { useState, useEffect } from "react";
import TabelaFreteTarifa from "./TabelaFreteTarifa";
import TabelaFreteIncluirTarifa from "./TabelaFreteIncluirTarifa";
import TabelaFreteIncluirFaixa from "./TabelaFreteIncluirFaixa";


import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  FileSpreadsheet,
  Upload,
  DollarSign,
  Truck,
  Settings,
  Navigation2,
  Percent,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Label({ children, className = "" }) {
  return <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>;
}
function Txt(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] " +
        (props.className || "")
      }
    />
  );
}
function Sel({ children, ...rest }) {
  return (
    <select
      {...rest}
      className="border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px]"
    >
      {children}
    </select>
  );
}

export default function TabelaFrete({ open }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tabelas");
  const [copiar, setCopiar] = useState("nao");
  const [mostrarTarifa, setMostrarTarifa] = useState(false);
  const [mostrarIncluirTarifa, setMostrarIncluirTarifa] = useState(false);
  const [mostrarIncluirFaixa, setMostrarIncluirFaixa] = useState(false);

useEffect(() => {
  const abrirIncluirTarifa = () => setMostrarIncluirTarifa(true);
  const abrirIncluirFaixa = () => setMostrarIncluirFaixa(true);

  window.addEventListener("abrirIncluirTarifa", abrirIncluirTarifa);
  window.addEventListener("abrirIncluirFaixa", abrirIncluirFaixa);

  return () => {
    window.removeEventListener("abrirIncluirTarifa", abrirIncluirTarifa);
    window.removeEventListener("abrirIncluirFaixa", abrirIncluirFaixa);
  };
}, []);

useEffect(() => {
  const abrirModal = () => setMostrarIncluirTarifa(true);
  window.addEventListener("abrirIncluirTarifa", abrirModal);
  return () => window.removeEventListener("abrirIncluirTarifa", abrirModal);
}, []);


  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      {/* ====== TÍTULO ====== */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        TABELA DE FRETE
      </h1>

      {/* ====== ABAS ====== */}
      <div className="flex border-b border-gray-300 bg-white">
        {["tabelas", "consulta"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${
              activeTab === tab
                ? "bg-white text-red-700 border-gray-300"
                : "bg-gray-100 text-gray-600 border-transparent"
            } ${tab !== "tabelas" ? "ml-1" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ====== CONTEÚDO ====== */}
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto flex flex-col gap-3">

        {/* ===================== ABA TABELAS ===================== */}
        {activeTab === "tabelas" && (
          <>
          {/* === CARD 1 - Dados da Tabela === */}
<fieldset className="border border-gray-300 rounded p-3">
  <legend className="text-red-700 font-semibold px-2">Dados da Tabela</legend>

  {/* Linha 1 */}
  <div className="grid grid-cols-12 gap-2 items-center">
    {/* Nº Tabela */}
    <div className="col-span-3 flex items-center gap-1">
      <Label className="whitespace-nowrap">Nº Tabela</Label>
      <Txt
        className="w-[150px] ml-[30px] text-center bg-gray-100 font-semibold tracking-[0.2em]"
        readOnly
        defaultValue="001230"
      />
    </div>

    {/* Descrição */}
    <div className="col-span-6 flex items-center gap-1">
      <Label>Descrição</Label>
      <Txt className="w-full" defaultValue="TABELA PADRAO" />
    </div>

    {/* ICMS / ISS Incluso (à direita) */}
    <div className="col-span-3 flex items-center justify-end gap-6">
      <label className="flex items-center gap-1">
        <input type="checkbox" defaultChecked /> ICMS Incluso
      </label>
      <label className="flex items-center gap-1">
        <input type="checkbox" defaultChecked /> ISS Incluso
      </label>
    </div>
  </div>

  {/* Linha 2 */}
  <div className="grid grid-cols-12 gap-2 items-center mt-2">
    {/* Vigência (de/até) */}
    <div className="col-span-5 flex items-center gap-1">
      <Label className="whitespace-nowrap">Vigência</Label>
      <Txt type="date" className="w-[150px] ml-[35px]" defaultValue="2018-01-01" />
      <Txt type="date" className="w-[150px] ml-[10px]" defaultValue="2099-12-31" />
    </div>

    {/* Tipo Tabela */}
    <div className="col-span-4 flex items-center justify-end gap-1">
  <Label className="whitespace-nowrap">Tipo Tabela</Label>
  <Sel className="w-full">
    <option>C - Cliente</option>
    <option>A - Agregado</option>
  </Sel>
</div>
  </div>
</fieldset>

{/* === CARD 2 - Valores e Percentuais === */}
<fieldset className="border border-gray-300 rounded p-2 mt-0">
 
  <div className="grid grid-cols-4 gap-4">
    {/* ==== COLUNA 1 ==== */}
    <div className="flex flex-col gap-[4px]">
      {[
        "Valor Despacho",
        "CAT",
        "ADEME %NF",
        "Vr. Mínimo ADEME",
        "% Desc. Devolução",
        "% Sobre Frete Comb.",
        "Taxa Emissão DTA",
        "% Dific. Acesso TDA",
        "Taxa Ajudante",
        "% Taxa ANVISA",
        "Vr. ANVISA",
        "% Peso Excedente",
        "Vr. KM Rodado",
      ].map((label, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <Label className="whitespace-nowrap mr-2">{label}</Label>
          <Txt className="w-[110px] text-right" defaultValue="0,00" />
        </div>
      ))}
    </div>

    {/* ==== COLUNA 2 ==== */}
    <div className="flex flex-col gap-[4px]">
      {[
        "Valor ITR",
        "Rateio Pedágio 100 Kg",
        "Fração Pedágio 100 Kg",
        "Faixa Pedágio",
        "Valor Mínimo Frete",
        "Alíquota PIS",
        "% Desc. Advalorem",
        "Vr. Min. Dific. Acesso",
        "Taxa Emissão CTRC",
        "% Taxa Cancelamento",
        "% Extra Frete",
        "Vr. Carga Refrigerada",
        "Qtde. KM Franquia",
      ].map((label, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <Label className="whitespace-nowrap mr-2">{label}</Label>
          <Txt className="w-[110px] text-right" defaultValue="0,00" />
        </div>
      ))}
    </div>

    {/* ==== COLUNA 3 ==== */}
    <div className="flex flex-col gap-[4px]">
      {[
        "Vr. Mínimo Total Frete",
        "Vr. Mínimo Devolução",
        "Vr. Mínimo Reentrega",
        "Vr. Mínimo Seguro",
        "% Sobre Frete NF",
        "Alíquota Cofins",
        "Valor KM Excedente",
        "% Restrição Trans-TRT",
        "% Impostos Suspensos",
        "% Taxa Frete Morto",
        "% Taxa Frete Retorno",
        "Carga Refrigerada",
        "% Montoramento",
      ].map((label, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <Label className="whitespace-nowrap mr-2">{label}</Label>
          <Txt className="w-[110px] text-right" defaultValue="0,00" />
        </div>
      ))}
    </div>

    {/* ==== COLUNA 4 ==== */}
    <div className="flex flex-col gap-[4px]">
      {[
        "% Desc. Reentrega",
        "Gris (% Sobre NF)",
        "Vr. Mínimo GRIS",
        "Fator conv. M³/P/Kg",
        "Faixa ITR",
        "% Dific. Entrega-TDE",
        "Vr. Min. Dific. Entrega",
        "TX Dev. Canhoto-TDC",
        "% VR IMO (Carga Perigosa)",
        "Vr. IMO (Carga Perigosa)",
        "Vr. IMO (Adeisivagem)",
        "% Ad. Dias Não-Úteis",
      ].map((label, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <Label className="whitespace-nowrap mr-2">{label}</Label>
          <Txt
            className={`w-[110px] text-right ${
              label === "Fator conv. M³/P/Kg"
                ? "font-semibold text-gray-800 bg-gray-50"
                : ""
            }`}
            defaultValue={label === "Fator conv. M³/P/Kg" ? "300,00" : "0,00"}
          />
        </div>
      ))}
    </div>
  </div>
</fieldset>

            {/* === LINHA COM 2 CARDS === */}
<div className="flex gap-2 mt-0">
  {/* === CARD 3 - Informações Rateio === */}
  <fieldset className="border border-gray-300 rounded p-3 flex-[2]">
    <legend className="text-red-700 font-semibold px-2">Informações Rateio</legend>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1">
          <input type="checkbox" defaultChecked />
          Rateio Frete
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" defaultChecked />
          Rateio Pedágio
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" defaultChecked />
          Rateio Frete ADV
        </label>
      </div>

      <Sel className="w-[220px]">
        <option>P - Rateio por Peso</option>
        <option>V - Rateio por Valor</option>
        <option>D - Rateio por Distância</option>
      </Sel>
    </div>
  </fieldset>

  {/* === CARD 4 - Informações Peso === */}
  <fieldset className="border border-gray-300 rounded p-3 flex-[1.2]">
    <legend className="text-red-700 font-semibold px-2">Informações Peso</legend>

    <div className="flex items-center justify-start gap-6">
      <label className="flex items-center gap-1">
        <input type="checkbox" />
        Somar tara ao peso
      </label>
      <label className="flex items-center gap-1">
        <input type="checkbox" />
        Arredonda Peso
      </label>
      <label className="flex items-center gap-1">
        <input type="checkbox" />
        Peso Excedente
      </label>
    </div>
  </fieldset>
</div>

           

{/* === CARD 6 - Informações Adicionais === */}
<fieldset className="border border-gray-300 rounded p-2 mt-0">
  <legend className="text-red-700 font-semibold px-2">Informações Adicionais</legend>

  <div className="flex items-center justify-between px-2">
    <label className="flex items-center gap-1">
      <input type="checkbox" defaultChecked />
      Faixa de CEP por referência (Padrão)
    </label>

    <label className="flex items-center gap-1">
      <input type="checkbox" />
      Assumir frete mínimo líquido
    </label>

    <label className="flex items-center gap-1">
      <input type="checkbox" />
      Não calc. % IMO peso excedente
    </label>

    <label className="flex items-center gap-1">
      <input type="checkbox" />
      Pedágio já pago pelo Cliente. Não embute valor no Frete
    </label>
  </div>
</fieldset>


           {/* === CARD 7 e 8 lado a lado === */}
<div className="flex gap-2 mt-3">
  {/* === CARD 7 - Tipo de Tabela === */}
  <fieldset className="border border-gray-300 rounded p-3 flex-[2]">
    <legend className="text-red-700 font-semibold px-2">Tipo de Tabela</legend>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-1">
          <input type="radio" name="tipoTabela" defaultChecked /> Faixa Peso
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="tipoTabela" /> Cubagem
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="tipoTabela" /> Paletes
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="tipoTabela" /> % Sobre NF
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="tipoTabela" /> Tipo de Veículo
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="tipoTabela" /> KM
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap">Qt. Fx Peso</Label>
        <Txt className="w-[60px] text-center" defaultValue="4" />
      </div>
    </div>
  </fieldset>

  {/* === CARD 8 - Ações === */}
<fieldset className="border border-gray-300 rounded p-3 mt-0">
  <legend className="text-red-700 font-semibold px-2">Outras Taxas</legend>

  <div className="flex items-center justify-between gap-2">
    {[
      { icon: FileSpreadsheet, label: "Plataforma" },
      { icon: Percent, label: "Agravo" },
      { icon: DollarSign, label: "Incentivo" },
      { icon: Truck, label: "Empresa" },
      { icon: Settings, label: "Estadia" },
    ].map(({ icon: Icon, label }) => (
      <button
        key={label}
        className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 text-[13px] hover:bg-gray-100 text-gray-700 transition"
      >
        <Icon size={15} className="text-red-700" />
        {label}
      </button>
    ))}
  </div>
</fieldset>
</div>


            {/* === CARD 9 - Adicionais === */}
            <fieldset className="border border-gray-300 rounded p-3">
              <legend className="text-red-700 font-semibold px-2">Adicionais</legend>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex items-center gap-2 col-span-2">
                  <Label>Observação</Label>
                  <Txt className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Operador</Label>
                  <Txt className="w-full text-center bg-gray-100" defaultValue="SUPORTE" readOnly />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Inclusão</Label>
                  <Txt className="w-full text-center bg-gray-100" defaultValue="04/11/2025" readOnly />
                </div>
              </div>
            </fieldset>
          </>
        )}

        {/* ===================== RODAPÉ ===================== */}
        <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center justify-between text-red-700 
  sticky bottom-0 left-0 right-0 z-50 shadow-md">

          <div className="flex items-center gap-5 text-red-700">
            {[
              { icon: XCircle, label: "Fechar", action: () => navigate(-1) },
              { icon: RotateCcw, label: "Limpar" },
              { icon: PlusCircle, label: "Incluir" },
              { icon: Edit, label: "Alterar" },
              { icon: Trash2, label: "Excluir" },
              { icon: DollarSign, label: "Tarifa", action: () => setMostrarTarifa(true) },
              { icon: Navigation2, label: "Percurso" },
              { icon: Percent, label: "Reajuste" },
              { icon: Upload, label: "Importar" },
            ].map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                title={label}
                className="flex flex-col items-center text-[11px] hover:text-red-800 transition"
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}

{mostrarTarifa && (
  <TabelaFreteTarifa
    open={open}
    onClose={() => setMostrarTarifa(false)}
  />
)}


{mostrarIncluirTarifa && (
  <TabelaFreteIncluirTarifa onClose={() => setMostrarIncluirTarifa(false)} />
)}

        {mostrarIncluirFaixa && (
  <TabelaFreteIncluirFaixa onClose={() => setMostrarIncluirFaixa(false)} />
)}    


          </div>
        </div>
      </div>
    </div>
  );
}
