import { useState } from "react";
import {
  XCircle,
  Trash2,
  Edit,
  PlusCircle,
  RotateCcw,
  FileText,
} from "lucide-react";

function Label({ children, className = "" }) {
  return (
    <label
      className={`text-[12px] text-gray-700 font-medium whitespace-nowrap ${className}`}
    >
      {children}
    </label>
  );
}

function Txt(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 rounded px-2 h-[22px] text-[13px] " +
        (props.className || "")
      }
    />
  );
}

export default function Comex({ onClose }) {

  const [documentos, setDocumentos] = useState([]);
  const [novoDoc, setNovoDoc] = useState({
    di: "",
    processo: "",
    referencia: "",
    reserva: "",
    lacre: "",
  });

  const adicionarDocumento = () => {
    if (novoDoc.di.trim() === "") return;
    setDocumentos([...documentos, novoDoc]);
    setNovoDoc({
      di: "",
      processo: "",
      referencia: "",
      reserva: "",
      lacre: "",
    });
  };

  const removerDocumento = (index) => {
    const atualizados = documentos.filter((_, i) => i !== index);
    setDocumentos(atualizados);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white w-[1200px] rounded shadow-lg border border-gray-300">
        {/* TÍTULO */}
        <div className="bg-black text-white text-center py-1 font-semibold text-[14px]">
          COMEX
        </div>

        <div className="p-3 space-y-3 text-[13px]">
{/* CARD 1 - CONTROLE DO CONTAINER */}
<div className="border border-gray-300 rounded p-2 space-y-2">
  <h2 className="text-[13px] font-semibold text-gray-700 mb-1 text-center border-b pb-1">
    Controle do Container
  </h2>

  <div className="space-y-2">
    {/* Linha 1: Nº Container, Vr. Container, Tara, Impostos Suspensos */}
    <div className="flex items-center gap-2">
      <Label className="w-[120px] text-right">Nº Container</Label>
      <Txt className="w-[200px]" defaultValue="SIDU 123.456-7" />
      <Label className="w-[100px] text-right">Vr. Container</Label>
      <Txt className="w-[100px]" defaultValue="0,00" />
      <Label className="w-[60px] text-right">Tara</Label>
      <Txt className="w-[100px]" defaultValue="0" />
      <Label className="w-[140px] text-right">Impostos Suspensos</Label>
      <Txt className="w-[100px]" defaultValue="0,00" />
    </div>

    {/* Linha 2: Tipo, Navio */}
    <div className="flex items-center gap-2">
      <Label className="w-[120px] text-right">Tipo</Label>
      <Txt className="flex-1" defaultValue="40 REEFER HIGH CUBIC" />
      <Label className="w-[80px] text-right">Navio</Label>
      <Txt className="flex-1" defaultValue="CAPE TOWN - AFRICA DO SUL" />
    </div>

    {/* Linha 3: Armador */}
    <div className="flex items-center gap-2">
      <Label className="w-[120px] text-right">Armador</Label>
      <Txt className="w-[180px]" defaultValue="02084200000257" />
      <Txt className="flex-1" defaultValue="SANTOS BRASIL LTDA" />
    </div>

    {/* Linha 4: Exportador */}
    <div className="flex items-center gap-2">
      <Label className="w-[120px] text-right">Exportador</Label>
      <Txt className="w-[180px]" defaultValue="48167751000123" />
      <Txt className="flex-1" defaultValue="MSC SOLUCOES LTDA" />
    </div>

    {/* Linha 5: Local Embarque, Local Desembarque */}
    <div className="flex items-center gap-2">
      <Label className="w-[130px] text-right">Local Embarque</Label>
      <Txt className="w-[80px]" defaultValue="001" />
      <Txt className="flex-1" defaultValue="LIBRA PORT" />
      <Label className="w-[140px] text-right">Local Desembarque</Label>
      <Txt className="w-[80px]" defaultValue="002" />
      <Txt className="flex-1" defaultValue="SANTOS BRASIL PARTICIPAÇÕES" />
    </div>

    {/* Linha 6: Terminal Retirada, Terminal Entrega */}
    <div className="flex items-center gap-2">
      <Label className="w-[130px] text-right">Terminal Retirada</Label>
      <Txt className="w-[80px]" defaultValue="003" />
      <Txt className="flex-1" defaultValue="RODIRMAR" />
      <Label className="w-[140px] text-right">Terminal Entrega</Label>
      <Txt className="w-[80px]" defaultValue="005" />
      <Txt className="flex-1" defaultValue="SATEL CUBATAO" />
    </div>

    {/* Linha 7: Retirada Container, Dev. Container */}
    <div className="flex items-center gap-2">
      <Label className="w-[130px] text-right">Retirada Container</Label>
      <Txt className="w-[80px]" defaultValue="011" />
      <Txt className="flex-1" defaultValue="SANTOS" />
      <Label className="w-[140px] text-right">Dev. Container</Label>
      <Txt className="w-[80px]" defaultValue="989" />
      <Txt className="flex-1" defaultValue="GUARUJA" />
    </div>

{/* Linha 8: Data Programação (esq)  |  Devolve Container (dir) */}
<div className="flex items-center gap-2">
  {/* Grupo esquerdo */}
  <div className="flex items-center gap-2">
    <Label className="w-[130px] text-right">Data Programação</Label>
    <Txt type="datetime-local" className="w-[250px]" />
  </div>

  {/* Espaçador para jogar o próximo grupo à direita */}
  <div className="flex-1" />

  {/* Grupo direito (alinhado à direita) */}
  <div className="flex items-center gap-2">
    <Label className="w-[140px] text-right">Devolve Container</Label>
    <Txt type="datetime-local" className="w-[250px]" />
  </div>
</div>


    {/* Linha 9: Nº CTRC Master, Valor Dev. Container (alinhado à direita) */}
    <div className="flex items-center gap-2 justify-end">
      <Label className="w-[130px] text-right">Nº CTRC Master</Label>
      <Txt className="w-[150px]" defaultValue="123456" />
      <Label className="w-[150px] text-right">Valor Dev. Container</Label>
      <Txt className="w-[115px]" defaultValue="200" />
    </div>
  </div>
</div>


{/* CARD 2 - DOCUMENTOS ADUANEIROS */}
<div className="border border-gray-300 rounded p-2 space-y-2">
  <h2 className="text-[13px] font-semibold text-gray-700 mb-1">
    Documentos Aduaneiros
  </h2>

  <div className="space-y-2">
    {/* Linha 1: Nº DI / DTA | Nº Processo DI */}
    <div className="grid grid-cols-2 gap-x-6">
      <div className="flex items-center gap-2">
        <Label className="w-[130px] text-right">Nº DI / DTA</Label>
        <Txt
          className="flex-1"
          value={novoDoc.di}
          onChange={(e) => setNovoDoc({ ...novoDoc, di: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="w-[130px] text-right">Nº Processo DI</Label>
        <Txt
          className="flex-1"
          value={novoDoc.processo}
          onChange={(e) => setNovoDoc({ ...novoDoc, processo: e.target.value })}
        />
      </div>
    </div>

    {/* Linha 2: Nº Referência | Nº Lacre */}
    <div className="grid grid-cols-2 gap-x-6">
      <div className="flex items-center gap-2">
        <Label className="w-[130px] text-right">Nº Referência</Label>
        <Txt
          className="flex-1"
          value={novoDoc.referencia}
          onChange={(e) => setNovoDoc({ ...novoDoc, referencia: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="w-[130px] text-right">Nº Lacre</Label>
        <Txt
          className="flex-1"
          value={novoDoc.lacre}
          onChange={(e) => setNovoDoc({ ...novoDoc, lacre: e.target.value })}
        />
      </div>
    </div>

    {/* Linha 3: Nº Reserva | Nº Lacre Compl. */}
    <div className="grid grid-cols-2 gap-x-6">
      <div className="flex items-center gap-2">
        <Label className="w-[130px] text-right">Nº Reserva</Label>
        <Txt
          className="flex-1"
          value={novoDoc.reserva}
          onChange={(e) => setNovoDoc({ ...novoDoc, reserva: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="w-[130px] text-right">Nº Lacre Compl.</Label>
        <Txt
          className="flex-1"
          value={novoDoc.lacreCompl}
          onChange={(e) => setNovoDoc({ ...novoDoc, lacreCompl: e.target.value })}
        />
      </div>
    </div>

    {/* Linha 4: Nº CTRC House | Nº Invoice */}
    <div className="grid grid-cols-2 gap-x-6">
      <div className="flex items-center gap-2">
        <Label className="w-[130px] text-right">Nº CTRC House</Label>
        <Txt
          className="flex-1"
          value={novoDoc.ctrcHouse}
          onChange={(e) => setNovoDoc({ ...novoDoc, ctrcHouse: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="w-[130px] text-right">Nº Invoice</Label>
        <Txt
          className="flex-1"
          value={novoDoc.invoice}
          onChange={(e) => setNovoDoc({ ...novoDoc, invoice: e.target.value })}
        />
      </div>
    </div>

    {/* Linha 5: Nº Nota Fiscal + Botões */}
    <div className="flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2 flex-1">
        <Label className="w-[130px] text-right">Nº Nota Fiscal</Label>
        <Txt
          className="w-[250px]"
          value={novoDoc.notaFiscal}
          onChange={(e) => setNovoDoc({ ...novoDoc, notaFiscal: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-2 text-red-700">
       <button
              title="Limpar"
              className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-3 py-[4px] flex items-center gap-1 text-[12px] text-gray-700"
              onClick={() =>
                setNovoDoc({ di: "", processo: "", referencia: "", reserva: "", lacre: "" })
              }
            >
              <RotateCcw size={14} className="text-red-600" /> Limpar
            </button>

            <button
              title="Remover"
              onClick={() => removerDocumento(documentos.length - 1)}
              className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-3 py-[4px] flex items-center gap-1 text-[12px] text-gray-700"
            >
              <Trash2 size={14} className="text-red-600" /> Remover
            </button>

            <button
              title="Alterar"
              className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-3 py-[4px] flex items-center gap-1 text-[12px] text-gray-700"
            >
              <Edit size={14} className="text-red-600" /> Alterar
            </button>

            <button
              title="Adicionar"
              onClick={adicionarDocumento}
              className="border border-gray-300 bg-gray-50 hover:bg-gray-100 rounded px-3 py-[4px] flex items-center gap-1 text-[12px] text-gray-700"
            >
              <PlusCircle size={14} className="text-green-700" /> Adicionar
            </button>
      </div>
    </div>
  </div>
</div>



         
      

          {/* CARD 4 - GRID */}
          <div className="border border-gray-300 rounded mt-2">
            <table className="w-full text-[12px] text-gray-700">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left px-2 py-1">Nº DI/DTA</th>
                  <th className="text-left px-2 py-1">Nº Processo DI</th>
                  <th className="text-left px-2 py-1">Nº Referência</th>
                  <th className="text-left px-2 py-1">Nº Reserva</th>
                  <th className="text-left px-2 py-1">Nº Lacre</th>
                </tr>
              </thead>
              <tbody>
                {documentos.map((doc, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-2 py-1">{doc.di}</td>
                    <td className="px-2 py-1">{doc.processo}</td>
                    <td className="px-2 py-1">{doc.referencia}</td>
                    <td className="px-2 py-1">{doc.reserva}</td>
                    <td className="px-2 py-1">{doc.lacre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RODAPÉ */}
          <div className="flex items-center gap-4 mt-3 text-red-700">
            <button
  title="Fechar Tela"
  onClick={onClose}
  className="hover:opacity-80 transition"
>
  <XCircle />
</button>
            <button title="Limpar Tela">
              <RotateCcw />
            </button>
            <button title="Salvar">
              <FileText />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
