import { useState } from "react";
import NotasFiscalModal from "./NotasFiscalModal";
import { useNavigate } from "react-router-dom";
import ConsultaNFSE from "./ConsultaNFSE";
import { useIconColor } from "../context/IconColorContext";
import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  Ban,
  Undo2,
  Send,
  Printer,
} from "lucide-react";

function Label({ children, className = "" }) {
  return <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>;
}
function Txt(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 rounded px-2 py-[2px] h-[26px] " +
        (props.className || "")
      }
    />
  );
}
function Sel({ children, ...rest }) {
  return (
    <select
      {...rest}
      className="border border-gray-300 rounded px-2 py-[2px] h-[26px]"
    >
      {children}
    </select>
  );
}

export default function NFSEPage({ open }) {
  const [activeTab, setActiveTab] = useState("cadastro");
  const [showNotaFiscal, setShowNotaFiscal] = useState(false);
  const [showConsultaNFSE, setShowConsultaNFSE] = useState(false);
  const navigate = useNavigate();
  const { footerIconColorNormal, footerIconColorHover } = useIconColor();  
  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      {/* Título */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        NOTA FISCAL DE SERVIÇO (NFSE)
      </h1>

      {/* Abas */}
      <div className="flex border-b border-gray-300 bg-white">
        <button
          onClick={() => setActiveTab("cadastro")}
          className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ${
            activeTab === "cadastro"
              ? "bg-white text-red-700 border-gray-300"
              : "bg-gray-100 text-gray-600 border-transparent"
          }`}
        >
          Cadastro
        </button>
        <button
          onClick={() => setActiveTab("consulta")}
          className={`px-4 py-1 text-sm font-medium border-t border-x rounded-t-md ml-1 ${
            activeTab === "consulta"
              ? "bg-white text-red-700 border-gray-300"
              : "bg-gray-100 text-gray-600 border-transparent"
          }`}
        >
          Consulta
        </button>
      </div>

      {/* Conteúdo */}
     <div className="p-3 bg-white border-x border-b border-gray-200 rounded-b-md flex flex-col gap-3 max-h-[calc(100vh-160px)] overflow-y-auto">


        {activeTab === "cadastro" ? (
          <>
            {/* --- CADASTRO (sem alterações) --- */}
 {/* CARD 1 — Dados da Nota */}
<div className="border border-gray-300 rounded p-2 bg-white space-y-2">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">Dados da Nota</h2>

  {/* Linha 01 - Empresa, Filial e Nº NFSE */}
  <div className="flex items-center gap-3 flex-wrap">
    <Label className="w-[70px] text-right">Empresa</Label>
    <Sel className="flex-[1.3] min-w-[220px]">
      <option>001 - MANTRAN TRANSPORTES LTDA</option>
    </Sel>
    <Label className="w-[60px] text-right">Filial</Label>
    <Sel className="flex-[1] min-w-[180px]">
      <option>001 - TESTE MANTRAN</option>
    </Sel>
    <Label className="w-[70px] text-right">Nº NFSE</Label>
    <Txt className="w-[100px]" />
  </div>

{/* Linha 02 - Nº NF, Série, Cancelamento, Nº Fatura, Cadastro e CFOP */}
<div className="flex items-center gap-2 flex-wrap">
  <Label className="w-[60px] text-right">Nº NF</Label>
  <Txt className="w-[90px]" />
  <Label className="w-[40px] text-right">Série</Label>
  <Txt className="w-[60px]" />
  <Label className="w-[90px] text-right">Cancelamento</Label>
  <Txt className="w-[130px] text-center text-gray-600 bg-gray-100" readOnly defaultValue="20/10/2025" />
  <Label className="w-[70px] text-right">Nº Fatura</Label>
  <Txt className="w-[80px] text-center" maxLength={9} />
  <Label className="w-[70px] text-right">Cadastro</Label>
  <Txt type="date" className="w-[130px]" defaultValue="2025-10-20" />
  <Label className="w-[100px] text-right">CFOP</Label>
  <Txt className="w-[90px] text-center" maxLength={4} />
</div>


  {/* Linha 03 - Cliente (CNPJ, Razão Social, Cidade, UF) */}
  <div className="flex items-center gap-3 flex-wrap">
    <Label className="w-[70px] text-right">Cliente</Label>
    <Txt className="w-[140px]" maxLength={14} placeholder="CNPJ" />
    <Txt className="w-[570px]" maxLength={50} placeholder="Razão Social" />
    <Txt className="w-[280px]" placeholder="Cidade" />
    <Txt className="w-[50px] text-center" placeholder="UF" maxLength={2} />
  </div>

  {/* Linha 04 - Natureza da Operação, Tipo Serviço, Vencimento e Impressão */}
  <div className="flex items-center gap-3 flex-wrap">
    <Label className="w-[130px] text-right">Natureza da Operação</Label>
    <Sel className="flex-[1.3] min-w-[220px]">
      <option>PRESTAÇÃO DE SERVIÇO</option>
      <option>DEVOLUÇÃO DE SERVIÇO</option>
    </Sel>
    <Label className="w-[90px] text-right">Tipo Serviço</Label>
    <Sel className="w-[200px]">
      <option>TRANSPORTES</option>
      <option>SERVIÇOS GERAIS</option>
      <option>REEMBOLSO</option>
      <option>REEMBOLSO ARMAZÉM</option>
      <option>REEMBOLSO DESCARGA</option>
      <option>ESCOLTA</option>
    </Sel>
    <Label className="w-[90px] text-right">Vencimento</Label>
    <Txt type="date" className="w-[150px]" />
    <Label className="w-[80px] text-right">Impressão</Label>
    <Sel className="w-[150px]">
      <option>01 - Normal</option>
      <option>02 - Simplificada</option>
    </Sel>
  </div>
</div>


       {/* CARD 2 — Itens da Nota */}
<div className="border border-gray-300 rounded p-2 bg-white space-y-2">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">
    Itens da Nota Fiscal de Serviço
  </h2>

  {/* Linha superior de entrada de itens */}
  <div className="flex items-center gap-2">
    <Label className="w-[60px] text-right">QT Item</Label>
    <Txt className="w-[70px]" />

    <Label className="w-[60px] text-right">Nº Item</Label>
    <Txt className="w-[70px]" />

    <Label className="w-[80px] text-right">Valor Item</Label>
    <Txt className="w-[90px] text-right" defaultValue="0,00" />

    <Label className="w-[70px] text-right">Total Item</Label>
    <Txt className="w-[90px] text-right" defaultValue="0,00" />

    {/* Ícone Incluir */}
<button
  title="Incluir Item"
  onClick={() => setShowNotaFiscal(true)}
  className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded p-[3px] flex items-center justify-center"
>
  <PlusCircle size={16} className="text-green-700" />
</button>
  </div>

  {/* Grid + Botões laterais */}
  <div className="flex gap-2">
    {/* GRID */}
    <div className="border border-gray-300 rounded overflow-auto flex-1">
      <table className="min-w-full text-[12px] border-collapse">
        <thead className="bg-gray-100 border-b border-gray-300 text-gray-700">
          <tr>
            <th className="px-2 py-1 border-r">Empresa</th>
            <th className="px-2 py-1 border-r">Filial</th>
            <th className="px-2 py-1 border-r">Descrição do Item</th>
            <th className="px-2 py-1 border-r">Qtde</th>
            <th className="px-2 py-1 border-r">Valor</th>
            <th className="px-2 py-1 border-r">Total Item</th>
            <th className="px-2 py-1">Natureza</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border-t border-gray-200 px-2 py-[3px] text-center">001</td>
            <td className="border-t border-gray-200 px-2 py-[3px] text-center">001</td>
            <td className="border-t border-gray-200 px-2 py-[3px]">Serviço de Transporte</td>
            <td className="border-t border-gray-200 px-2 py-[3px] text-center">1</td>
            <td className="border-t border-gray-200 px-2 py-[3px] text-center">1.000,00</td>
            <td className="border-t border-gray-200 px-2 py-[3px] text-center">1.000,00</td>
            <td className="border-t border-gray-200 px-2 py-[3px] text-center">N</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Ícones laterais */}
    <div className="flex flex-col justify-start gap-2">
      <button
        title="Limpar"
        className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded p-[4px]"
      >
        <Edit size={15} className="text-yellow-600" />
      </button>

      <button
        title="Adicionar"
        className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded p-[4px]"
      >
        <PlusCircle size={15} className="text-green-700" />
      </button>

      <button
        title="Excluir"
        className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded p-[4px]"
      >
        <Trash2 size={15} className="text-red-700" />
      </button>
    </div>
  </div>
</div>


            {/* CARD 3 — Tributações */}
<div className="border border-gray-300 rounded p-2 bg-white space-y-2">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">
    Tributações da Nota Fiscal de Serviço
  </h2>

  {/* Linha 1 */}
  <div className="flex items-center gap-2 flex-wrap text-[12px]">
    <Label className="w-[80px] text-right">%VR Líquido</Label>
    <Txt className="w-[70px] text-center" defaultValue="0" />

    <Label className="w-[60px] text-right">Trib ISS</Label>
    <Sel className="w-[120px]">
      <option>EXIGIVEL</option>
      <option>NÃO INCIDÊNCIA</option>
      <option>ISENÇÃO</option>
      <option>EXPORTAÇÃO</option>
      <option>IMUNIDADE</option>
      <option>EXIGIBILIDADE SUSPENSA</option>
    </Sel>

    <Label className="w-[50px] text-right">Retido?</Label>
    <input type="checkbox" className="w-4 h-4" />

    <Label className="w-[70px] text-right">VR ISSQN</Label>
    <Txt className="w-[70px] text-center" defaultValue="0" />

    <Label className="w-[40px] text-right">%PIS</Label>
    <Txt className="w-[60px] text-center" defaultValue="0,00" />

    <Label className="w-[55px] text-right">%COFINS</Label>
    <Txt className="w-[60px] text-center" defaultValue="0,00" />

    <Label className="w-[90px] text-right">Divisão/Loja</Label>
    <Sel className="flex-1 min-w-[160px] max-w-[250px]">
      <option>1054 - LEO CAMPINAS</option>
      <option>1500 - LEO CD</option>
    </Sel>
  </div>

  {/* Linha 2 */}
  <div className="flex items-center gap-2 flex-wrap text-[12px]">
    <Label className="w-[80px] text-right">Total Serviço</Label>
    <Txt className="w-[70px] text-center" defaultValue="0" />

    <Label className="w-[40px] text-right">%IRRF</Label>
    <Txt className="w-[60px] text-center" defaultValue="0" />

    <Label className="w-[70px] text-right">Valor IRRF</Label>
    <Txt className="w-[70px] text-center" defaultValue="0" />

    <Label className="w-[40px] text-right">%ISQN</Label>
    <Txt className="w-[60px] text-center" defaultValue="0" />

    
    <Sel className="flex-1 min-w-[160px] max-w-[250px]">
      <option>Operação Tributável (Base de Calculo = Valor da Operação alíquota normal)</option>
      <option>Operação Tributável (Base de Calculo = Valor da Operação alíquota diferenciada)</option>
      <option>Operação Tributável (Base de Calculo = quantidade vendida  x aliquota por unidade)</option>
      <option>Operação Tributável (Tributação monofásica(alíquota zero))</option>
      <option>Operação Tributável (Substituição Tributária)</option>
      <option>Operação Tributável (alíquota zero)</option>
      <option>Operação Isenta da Contribuição</option>
    </Sel>
  </div>

  {/* Linha 3 - Observação */}
  <div className="flex items-center gap-2 text-[12px]">
    <Label className="w-[80px] text-right">Observação</Label>
    <Txt className="flex-1" placeholder="Digite aqui observações adicionais..." />
  </div>
</div>


           <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">

  {/* FECHAR */}
  <button
    onClick={() => navigate("/")}
    title="Fechar Tela"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <XCircle size={18} />
    <span>Fechar</span>
  </button>

  {/* LIMPAR */}
  <button
    title="Limpar Tela"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <RotateCcw size={18} />
    <span>Limpar</span>
  </button>

  {/* INCLUIR */}
  <button
    title="Incluir"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <PlusCircle size={18} />
    <span>Incluir</span>
  </button>

  {/* ALTERAR */}
  <button
    title="Alterar"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Edit size={18} />
    <span>Alterar</span>
  </button>

  {/* EXCLUIR */}
  <button
    title="Excluir"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Trash2 size={18} />
    <span>Excluir</span>
  </button>

  {/* CANCELAR */}
  <button
    title="Cancelar"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Ban size={18} />
    <span>Cancelar</span>
  </button>

  {/* ESTORNAR */}
  <button
    title="Estornar"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Undo2 size={18} />
    <span>Estornar</span>
  </button>

  {/* ENVIAR */}
  <button
    onClick={() => setShowConsultaNFSE(true)}
    title="Enviar"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Send size={18} />
    <span>Enviar</span>
  </button>

  {/* IMPRIMIR */}
  <button
    title="Imprimir"
    className={`flex flex-col items-center text-[11px] 
      ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
  >
    <Printer size={18} />
    <span>Imprimir</span>
  </button>

</div>
          </>
        ) : (
          <>
            {/* --- CONSULTA --- */}
            {/* CARD 1 - Filtros */}
<div className="border border-gray-300 rounded p-2 bg-white space-y-2">
  <h2 className="text-red-700 font-semibold text-[13px] mb-1">Parâmetros de Pesquisa</h2>

{/* Linha 1 - Empresa e Filial ocupando toda a largura do card */}
<div className="flex items-center gap-3 w-full">
  <Label className="w-[70px] text-right">Empresa</Label>
  <Sel className="flex-[1.5]">
    <option>001 - MANTRAN TRANSPORTES LTDA</option>
  </Sel>
  <Label className="w-[300px] text-right">Filial</Label>
  <Sel className="flex-[1]">
    <option>001 - MANTRAN TECNOLOGIAS LTDA ME      </option>
    <option>002 - MANTRAN TECNOLOGIAS FILIAL 002      </option>
    <option>003 - MANTRAN TECNOLOGIAS FILIAL 003      </option>
  </Sel>
</div>



  {/* Linha 2 - Nº NF, Série, Cliente (CNPJ e Razão), Período */}
  <div className="flex items-center gap-3">
    <Label className="w-[70px] text-right">Nº NF</Label>
    <Txt className="w-[100px]" />
    <Label className="w-[40px] text-right">Série</Label>
    <Txt className="w-[80px]" />
    <Label className="w-[60px] text-right">Cliente</Label>
    <Txt className="w-[160px]" maxLength={14} placeholder="CNPJ" />
    <Txt className="flex-1" maxLength={50} placeholder="Razão Social" />
    <Label className="w-[60px] text-right">Período</Label>
    <Txt type="date" className="w-[130px]" defaultValue="2025-01-01" />
    <Label className="w-[20px] text-center">até</Label>
    <Txt type="date" className="w-[130px]" defaultValue="2025-10-20" />
  </div>

  {/* Linha 3 - Botão Pesquisar alinhado à direita */}
  <div className="flex justify-end mt-2">
    <button className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-4 h-[28px] text-[12px] text-gray-700 font-medium">
      Pesquisar
    </button>
  </div>
</div>


            {/* CARD 2 - Grid */}
            <div className="border border-gray-300 rounded p-2 bg-white flex flex-col">
              <h2 className="text-red-700 font-semibold text-[13px] mb-1">Relação de Notas Fiscais de Serviço</h2>

              <div className="border border-gray-300 rounded overflow-auto">
                <table className="min-w-full text-[12px] border-collapse">
                  <thead className="bg-gray-100 border-b border-gray-300 text-gray-700">
                    <tr>
                      <th className="px-2 py-1 border-r">Empresa</th>
                      <th className="px-2 py-1 border-r">Filial</th>
                      <th className="px-2 py-1 border-r">Nº NF</th>
                      <th className="px-2 py-1 border-r">Série</th>
                      <th className="px-2 py-1 border-r">DT Cadastro</th>
                      <th className="px-2 py-1 border-r">CGC</th>
                      <th className="px-2 py-1 border-r">Cliente</th>
                      <th className="px-2 py-1">Valor NF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { emp: "001", fil: "001", nf: "056555", serie: "5", dt: "20/01/2025 00:00:00", cgc: "42446277004694", cliente: "SHPX LOGISTICA LTDA", valor: "0,00" },
                      { emp: "001", fil: "001", nf: "000274", serie: "1", dt: "04/04/2025 00:00:00", cgc: "42446277000273", cliente: "SHPX LOGISTICA LTDA", valor: "0,00" },
                      { emp: "001", fil: "001", nf: "000274", serie: "1", dt: "16/01/2025 00:00:00", cgc: "50221019000136", cliente: "HNK-ITU (1) MATRIZ", valor: "0,00" },
                      { emp: "001", fil: "001", nf: "000272", serie: "1", dt: "06/05/2025 00:00:00", cgc: "0525495700651", cliente: "HNK-ITAJAI", valor: "100,00" },
                      { emp: "001", fil: "001", nf: "000001", serie: "005", dt: "07/05/2025 00:00:00", cgc: "50221019000136", cliente: "HNK-ITU (1) MATRIZ", valor: "120,00" },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">{row.emp}</td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">{row.fil}</td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">{row.nf}</td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">{row.serie}</td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">{row.dt}</td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-center">{row.cgc}</td>
                        <td className="border-t border-gray-200 px-2 py-[3px]">{row.cliente}</td>
                        <td className="border-t border-gray-200 px-2 py-[3px] text-right">{row.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total de Notas */}
              <div className="flex justify-between items-center mt-1 text-[12px] text-gray-700">
                <span>Total de Notas: 5</span>
              </div>
            </div>
          </>
        )}
      </div>

      {showNotaFiscal && (
  <NotasFiscalModal
    isOpen={showNotaFiscal}
    onClose={() => setShowNotaFiscal(false)}
  />
)}

{showConsultaNFSE && (
  <ConsultaNFSE isOpen={showConsultaNFSE} onClose={() => setShowConsultaNFSE(false)} />
)}
    </div>
  );
}
