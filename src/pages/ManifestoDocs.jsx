import { useState } from "react";
import {
  Search,
  PlusCircle,
  Trash2,
  RotateCcw,
  FileDown,
  CheckSquare,
   XCircle, 
} from "lucide-react";

export default function ManifestoDocs({ onClose }) {
  const [docs, setDocs] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [manifestarDocs, setManifestarDocs] = useState([]);
 const [selectedManifestar, setSelectedManifestar] = useState([]);

// === Cálculo automático dos totais (baseado nos dados reais de cada documento) ===
const totais = docs.reduce(
  (acc, item) => {
    acc.pesoMerc += Number(item.pesoNota) || 0;
    acc.qtVol += Number(item.qtVol) || 0;
    acc.valorMerc += Number(item.valorMerc) || 0;
    acc.qtDocs += 1;
    acc.valorFrete += Number(item.valorFrete) || 0;
    return acc;
  },
  { pesoMerc: 0, qtVol: 0, valorMerc: 0, qtDocs: 0, valorFrete: 0 }
);


  
  // Adicionar chave digitada ao Card 4
  const handleAddChave = (e) => {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    const novaChave = e.target.value.trim();
    setDocs((prev) => [
      ...prev,
      {
        chave: novaChave,
        fantasia: "CLIENTE TESTE",
        endereco: "RUA EXEMPLO, 123",
        remetente: "12345678000190",
        pesoNota: 10, // 🔹 exemplo: peso em kg
        qtVol: 1,     // 🔹 quantidade de volumes
        valorMerc: 120.5, // 🔹 valor total da nota
        valorFrete: 45.7, // 🔹 valor do frete
      },
    ]);
    e.target.value = "";
  }
};


  // Selecionar todos / limpar seleção no Card 4
  const toggleSelectAllDocs = () => {
    if (selectedDocs.length === docs.length) setSelectedDocs([]);
    else setSelectedDocs(docs.map((_, i) => i));
  };

  // Excluir selecionados no Card 4
  const handleExcluirSelecionados = () => {
    setDocs(docs.filter((_, i) => !selectedDocs.includes(i)));
    setSelectedDocs([]);
  };

  // Selecionar todos / limpar seleção no Card 9
  const toggleSelectAllManifestar = () => {
    if (selectedManifestar.length === manifestarDocs.length)
      setSelectedManifestar([]);
    else setSelectedManifestar(manifestarDocs.map((_, i) => i));
  };

  // Adicionar ao Card 4
  const handleAdicionar = () => {
    const selecionados = manifestarDocs.filter((_, i) =>
      selectedManifestar.includes(i)
    );
    setDocs([...docs, ...selecionados]);
    setSelectedManifestar([]);
  };

   return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  <div className="bg-white w-[1100px] max-w-[95vw] rounded shadow-lg border border-gray-300 p-4 max-h-[90vh] overflow-y-auto relative">

        <h1 className="text-center text-red-700 font-semibold border-b border-gray-300 pb-1 text-sm">
          DOCUMENTOS DO MANIFESTO
        </h1>


      {/* ===== LINHA 1 - CARD 1 e CARD 2 ===== */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        {/* CARD 1 - Código de Barra */}
        <fieldset className="border border-gray-300 rounded p-3 bg-white relative">
  <legend className="text-red-700 font-semibold text-[13px] px-2">
    Código de Barra - CTe / NFe
  </legend>

  <label className="text-[12px] text-gray-600">Nº Chave</label>
  <input
    type="text"
    onKeyDown={handleAddChave}
    placeholder="Digite ou leia a chave e pressione Enter"
    className="border border-gray-300 rounded w-full px-2 py-[3px] text-[13px] mt-1"
  />
</fieldset>

        {/* CARD 2 - Digitação */}
<fieldset className="border border-gray-300 rounded p-3 bg-white relative">
  <legend className="text-red-700 font-semibold text-[13px] px-2">
    Digitação
  </legend>

  {/* Linha 1 */}
  <div className="flex items-center gap-3 mb-2 mt-1">
    {["CTe", "Coleta", "Minuta", "NFe", "Doc Ant"].map((tipo) => (
      <label key={tipo} className="flex items-center gap-1">
        <input type="radio" name="tipoDoc" /> {tipo}
      </label>
    ))}
  </div>

  {/* Linha 2 */}
  <div className="flex items-center gap-2 mb-2">
    <label className="w-16 text-[12px]">Empresa</label>
    <input
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] w-[80px]"
    />
    <label className="w-10 text-[12px] text-right">Filial</label>
    <input
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] w-[80px]"
    />
    <label className="w-14 text-[12px] text-right">Nº Docto</label>
    <input
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] w-[100px]"
    />
  </div>

  {/* Linha 3 */}
  <div className="flex items-center gap-2">
    <label className="w-20 text-[12px]">Remetente</label>
    <input
      type="text"
      placeholder="CNPJ"
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] w-[140px]"
    />
    <input
      type="text"
      placeholder="Razão Social"
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] flex-1"
    />
  </div>
</fieldset>

      </div>

      {/* ===== CARD 4 - GRID PRINCIPAL ===== */}
      <div className="border border-gray-300 rounded p-2 bg-white mt-3 overflow-auto max-h-[200px]">
        <table className="min-w-[1800px] text-[12px] border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {[
                "Chk",
                "Doc",
                "Empresa",
                "Filial",
                "SQ",
                "Série",
                "Nº Controle",
                "Nº Impresso",
                "Cidade Entrega",
                "U",
                "Peso Nota",
                "Peso Cálculo",
                "Qt Vol",
                "Valor Mercadoria",
                "CGC/CPF Cliente",
                "Fantasia Cliente",
                "Endereço Entrega",
                "Chave CTe",
                "CGC/CPF Remetente",
              ].map((col) => (
                <th key={col} className="border p-1 text-left whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, idx) => (
              <tr
                key={idx}
                className={`${
                  selectedDocs.includes(idx) ? "bg-red-50" : ""
                }`}
              >
                <td className="border text-center p-1">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(idx)}
                    onChange={() =>
                      setSelectedDocs((prev) =>
                        prev.includes(idx)
                          ? prev.filter((i) => i !== idx)
                          : [...prev, idx]
                      )
                    }
                  />
                </td>
                <td className="border p-1 text-center">{idx + 1}</td>
                <td className="border p-1 text-center">001</td>
                <td className="border p-1 text-center">001</td>
                <td className="border p-1 text-center">1</td>
                <td className="border p-1 text-center">1</td>
                <td className="border p-1 text-center">12345</td>
                <td className="border p-1 text-center">001</td>
                <td className="border p-1 text-center">CAMPINAS</td>
                <td className="border p-1 text-center">SP</td>
<td className="border p-1 text-center">{doc.pesoNota}</td>
<td className="border p-1 text-center">{doc.pesoNota}</td>
<td className="border p-1 text-center">{doc.qtVol}</td>
<td className="border p-1 text-right">
  {doc.valorMerc.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
</td>

                <td className="border p-1 text-center">{doc.remetente}</td>
                <td className="border p-1">{doc.fantasia}</td>
                <td className="border p-1">{doc.endereco}</td>
                <td className="border p-1 font-mono">{doc.chave}</td>
                <td className="border p-1 text-center">{doc.remetente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== CARD 5 - Botões ===== */}
      <div className="border border-gray-300 rounded p-2 bg-white mt-2 flex justify-between">
        <div className="flex gap-2">
          <button
            onClick={toggleSelectAllDocs}
            className="border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 text-[12px] flex items-center gap-1"
          >
            <CheckSquare size={14} /> Selecionar Todos
          </button>
          <button
            onClick={() => setSelectedDocs([])}
            className="border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 text-[12px] flex items-center gap-1"
          >
            <RotateCcw size={14} /> Limpar Seleção
          </button>
          <button className="border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 text-[12px] flex items-center gap-1">
            <FileDown size={14} /> Importar Doc Ant
          </button>
        </div>
        <button
          onClick={handleExcluirSelecionados}
          className="border border-gray-300 rounded px-3 py-1 bg-red-50 hover:bg-red-100 text-[12px] flex items-center gap-1 text-red-700"
        >
          <Trash2 size={14} /> Excluir
        </button>
      </div>

      {/* ===== CARD 6 - Totais (automático) ===== */}
<div className="border border-gray-300 rounded p-2 bg-white mt-3 flex justify-between items-center">
  {/* Totais à esquerda */}
  <div className="flex gap-3 text-[12px] text-gray-700">
    <span>
      Peso Mercadoria:{" "}
      <strong className="text-red-700">
        {totais.pesoMerc.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </strong>
    </span>
    <span>
      Qtde Volume:{" "}
      <strong className="text-red-700">{totais.qtVol}</strong>
    </span>
    <span>
      Valor Mercadoria:{" "}
      <strong className="text-red-700">
        R$ {totais.valorMerc.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </strong>
    </span>
    <span>
      Qtde Docs:{" "}
      <strong className="text-red-700">{totais.qtDocs}</strong>
    </span>
    <span>
      Valor Frete:{" "}
      <strong className="text-red-700">
        R$ {totais.valorFrete.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </strong>
    </span>
  </div>

  {/* Totais à direita */}
  <div className="flex gap-3 text-[12px] text-gray-700">
    <span>
      Peso Excedido:{" "}
      <strong className="text-red-700">1</strong>
    </span>
    <span>
      Capacidade Veículo:{" "}
      <strong className="text-red-700">0</strong>
    </span>
  </div>
</div>

    {/* ===== CARD 7 - Relação de Doctos para Manifestar ===== */}
<fieldset className="border border-gray-300 rounded p-3 bg-white mt-3">
  <legend className="text-red-700 font-semibold text-[13px] px-2">
    Relação de Doctos para Manifestar
  </legend>

  {/* Linha 1 */}
  <div className="flex items-center gap-2 mb-2 mt-1">
    <label className="w-20 text-[12px]">Filial Terc.</label>
    <select className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-[13px] w-[250px]">
      <option>001 - TESTE MANTRAN</option>
      <option>002 - MANTRAN VALINHOS</option>
    </select>

    <label className="flex items-center gap-1 ml-2 text-[12px]">
      <input type="checkbox" /> Apenas CT-e’s de Serviço
    </label>

    <div className="ml-auto flex items-center gap-2">
      <label className="text-[12px] text-gray-700">Placa</label>
      <input
        type="text"
        className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-[13px] w-[120px]"
      />
    </div>
  </div>

  {/* Linha 2 */}
  <div className="flex items-center gap-2 mb-2">
    <label className="w-16 text-[12px]">Cliente</label>
    <input
      type="text"
      placeholder="CNPJ"
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-[13px] w-[150px]"
    />
    <input
      type="text"
      placeholder="Razão Social"
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] flex-1 text-[13px]"
    />

    <label className="ml-4 text-[12px]">Período</label>
    <input
      type="date"
      defaultValue="2025-10-01"
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-[13px] w-[140px]"
    />
    <span className="text-[12px] text-gray-700">até</span>
    <input
      type="date"
      defaultValue="2025-10-25"
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-[13px] w-[140px]"
    />
  </div>

  {/* Linha 3 */}
  <div className="flex items-center gap-2">
    <label className="w-20 text-[12px]">Cidade Dest</label>
    <input
      type="text"
      placeholder="CEP"
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-[13px] w-[100px]"
    />
    <input
      type="text"
      placeholder="Nome da Cidade"
      className="border border-gray-300 rounded px-2 py-[2px] h-[24px] flex-1 text-[13px]"
    />

    <label className="ml-4 text-[12px]">Tipo Doc</label>
    <select className="border border-gray-300 rounded px-2 py-[2px] h-[24px] text-[13px] w-[180px]">
      <option>TODOS</option>
      <option>CTe</option>
      <option>Coleta</option>
      <option>Minuta</option>
      <option>Nota Fiscal</option>
    </select>
  </div>
</fieldset>


{/* ===== CARD 8 - GRID SECUNDÁRIA ===== */}
<div className="border border-gray-300 rounded p-2 bg-white mt-2 overflow-auto max-h-[200px]">
  <table className="min-w-[1500px] text-[12px] border">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        {[
          "Chk",
          "Doc",
          "Nº Documento",
          "CNPJ/CPF",
          "Razão Social",
          "Cidade Entrega",
          "DT Emissão",
          "Empresa",
          "Filial",
          "CNPJ/CPF Remetente",
        ].map((col) => (
          <th key={col} className="border p-1 text-left whitespace-nowrap">
            {col}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[
        {
          doc: "Coleta",
          nr: "185706",
          cnpj: "50221109000136",
          razao: "HNK BR INDÚSTRIA DE BEBIDAS LTDA",
          cidade: "IGREJINHA",
          emissao: "14/10/2025",
          empresa: "001",
          filial: "001",
          remetente: "60841494000169",
        },
        {
          doc: "CTe",
          nr: "000004",
          cnpj: "42446274000147",
          razao: "SHPX LOGÍSTICA LTDA",
          cidade: "ALPINÓPOLIS",
          emissao: "07/10/2025",
          empresa: "001",
          filial: "001",
          remetente: "42446274000147",
        },
      ].map((item, idx) => (
        <tr
          key={idx}
          className={`${
            selectedManifestar.includes(idx) ? "bg-red-50" : ""
          }`}
        >
          <td className="border text-center p-1">
            <input
              type="checkbox"
              checked={selectedManifestar.includes(idx)}
              onChange={() =>
                setSelectedManifestar((prev) =>
                  prev.includes(idx)
                    ? prev.filter((i) => i !== idx)
                    : [...prev, idx]
                )
              }
            />
          </td>
          <td className="border p-1 text-center">{item.doc}</td>
          <td className="border p-1 text-center">{item.nr}</td>
          <td className="border p-1 text-center">{item.cnpj}</td>
          <td className="border p-1">{item.razao}</td>
          <td className="border p-1 text-center">{item.cidade}</td>
          <td className="border p-1 text-center">{item.emissao}</td>
          <td className="border p-1 text-center">{item.empresa}</td>
          <td className="border p-1 text-center">{item.filial}</td>
          <td className="border p-1 text-center">{item.remetente}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* ===== CARD 9 - BOTÕES ===== */}
<div className="border border-gray-300 rounded p-2 bg-white mt-2 flex justify-between">
  <div className="flex gap-2">
    <button
      onClick={toggleSelectAllManifestar}
      className="border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 text-[12px] flex items-center gap-1"
    >
      <CheckSquare size={14} /> Selecionar Todos
    </button>
    <button
      onClick={() => setSelectedManifestar([])}
      className="border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 text-[12px] flex items-center gap-1"
    >
      <RotateCcw size={14} /> Limpar Seleção
    </button>
      <button
      onClick={onClose}
      className="border border-gray-300 rounded px-3 py-1 bg-red-50 hover:bg-red-100 text-[12px] flex items-center gap-1 text-red-600"
    >
      <XCircle size={14} /> Fechar
    </button>

  </div>

  <div className="flex gap-2">
    <button
      onClick={() => setSelectedManifestar([])}
      className="border border-gray-300 rounded px-3 py-1 bg-yellow-50 hover:bg-yellow-100 text-[12px] flex items-center gap-1"
    >
      <RotateCcw size={14} /> Limpar
    </button>


    <button
    
      onClick={handleAdicionar}
      className="border border-gray-300 rounded px-3 py-1 bg-green-50 hover:bg-green-100 text-[12px] flex items-center gap-1"
    >
      <PlusCircle size={14} className="text-green-700" /> Adicionar
    </button>
    <button className="border border-gray-300 rounded px-3 py-1 bg-blue-50 hover:bg-blue-100 text-[12px] flex items-center gap-1">
      <Search size={14} className="text-blue-600" /> Pesquisar
    </button>
  </div>
</div>

       </div>
    </div>
  );
}
