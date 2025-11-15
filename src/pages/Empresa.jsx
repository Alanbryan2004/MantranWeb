import { useState } from "react";
import EmpresaParametro from "./EmpresaParametro";
import EmpresaCIOT from "./EmpresaCIOT";

import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  Settings,
  Waypoints,
} from "lucide-react";

/* =============================
   🔹 Helpers visuais padrão Mantran
============================= */
function Label({ children, className = "" }) {
  return <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>;
}

function Txt(props) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] ${props.className || ""}`}
    />
  );
}

/* =============================
   🔹 Máscaras
============================= */
const onlyDigits = (v = "") => v.replace(/\D+/g, "");

const maskCNPJ = (v) =>
  onlyDigits(v)
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/(\d{4})(\d)/, "$1-$2");

const maskCEP = (v) =>
  onlyDigits(v)
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, "$1-$2");

const maskPhone = (v) => {
  v = onlyDigits(v).slice(0, 11);
  if (v.length <= 10)
    return v
      .replace(/^(\d{0,2})/, "($1")
      .replace(/^\((\d{2})(\d{0,4})/, "($1) $2")
      .replace(/^\((\d{2})\) (\d{4})(\d{0,4})/, "($1) $2-$3");
  return v
    .replace(/^(\d{0,2})/, "($1")
    .replace(/^\((\d{2})(\d{0,5})/, "($1) $2")
    .replace(/^\((\d{2})\) (\d{5})(\d{0,4})/, "($1) $2-$3");
};

/* =============================
   🔹 ViaCEP
============================= */


/* =============================
   🔹 Componente Principal
============================= */
export default function Empresa({ open }) {
  const [dados, setDados] = useState({
    codigo: "",
    sigla: "",
    cnpj: "",
    razao: "",
    fantasia: "",
    ie: "",
    cep: "",
    endereco: "",
    bairro: "",
    cidade: "",
    uf: "",
    email: "",
    fone: "",
  });

  const [lista, setLista] = useState([]);

  const [showParametro, setShowParametro] = useState(false);
  const [showCIOT, setShowCIOT] = useState(false);

  const handleChange = async (e) => {
    let { name, value } = e.target;

    if (name === "cnpj") value = maskCNPJ(value);
    if (name === "cep") {
      value = maskCEP(value);
      if (onlyDigits(value).length === 8) {
        const cepInfo = await buscarCEP(onlyDigits(value));
        if (cepInfo) {
          setDados((prev) => ({ ...prev, ...cepInfo }));
        }
      }
    }
    if (name === "fone") value = maskPhone(value);

    setDados({ ...dados, [name]: value });
  };

  const handleLimpar = () => {
    setDados({
      codigo: "",
      sigla: "",
      cnpj: "",
      razao: "",
      fantasia: "",
      ie: "",
      cep: "",
      endereco: "",
      bairro: "",
      cidade: "",
      uf: "",
      email: "",
      fone: "",
    });
  };

  const handleIncluir = () => {
    if (!dados.codigo) return alert("Informe o código!");
    setLista([...lista, dados]);
    handleLimpar();
  };

  const handleAlterar = () => {
    setLista(lista.map((i) => (i.codigo === dados.codigo ? dados : i)));
  };


  async function buscarCEP(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      setDados((prev) => ({
        ...prev,
        endereco: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        uf: data.uf || "",
      }));
    }
  } catch (err) {
    console.log("Erro ao buscar CEP", err);
  }
}
  const handleExcluir = () => {
    setLista(lista.filter((i) => i.codigo !== dados.codigo));
    handleLimpar();
  };

  const selecionarItem = (item) => {
    setDados(item);
  };

  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 flex flex-col h-[calc(100vh-56px)] ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        EMPRESA
      </h1>

      <div className="flex-1 p-3 overflow-y-auto bg-white border-x border-b border-gray-300">

       {/* =============== CARD 1 =============== */}
<fieldset className="border border-gray-300 rounded p-3 mb-3">
  <legend className="px-2 text-red-700 font-semibold">Parâmetros</legend>

  {/* === LINHA 1: Código | Sigla | CNPJ === */}
  <div className="grid grid-cols-3 gap-4 mb-2">
    <div className="flex items-center gap-2">
      <Label className="w-20 ">Código</Label>
      <Txt name="codigo" value={dados.codigo} onChange={handleChange} className="flex-1 ml-[45px]" />
    </div>

    <div className="flex items-center gap-2">
      <Label className="w-20">Sigla</Label>
      <Txt name="sigla" value={dados.sigla} onChange={handleChange} className="flex-1" />
    </div>

    <div className="flex items-center gap-2">
      <Label className="w-16">CNPJ</Label>
      <Txt name="cnpj" value={dados.cnpj} onChange={handleChange} className="flex-1" />
    </div>
  </div>

  {/* === LINHA 2: Razão Social === */}
  <div className="flex items-center gap-2 mb-2">
    <Label className="w-32">Razão Social</Label>
    <Txt name="razao" value={dados.razao} onChange={handleChange} className="flex-1 ml-[-3px]" />
  </div>

  {/* === LINHA 3: Fantasia | IE === */}
  <div className="grid grid-cols-2 gap-4 mb-2">
    <div className="flex items-center gap-2">
      <Label className="w-20">Fantasia</Label>
      <Txt name="fantasia" value={dados.fantasia} onChange={handleChange} className="flex-1 ml-[45px]" />
    </div>

    <div className="flex items-center gap-2">
      <Label className="w-10">IE</Label>
      <Txt name="ie" value={dados.ie} onChange={handleChange} className="flex-1" />
    </div>
  </div>

  {/* === LINHA 4: CEP | Endereço (CEP AUTOMÁTICO) === */}
  <div className="grid grid-cols-2 gap-4 mb-2">
    <div className="flex items-center gap-2">
      <Label className="w-16">CEP</Label>
      <Txt
        name="cep"
        value={dados.cep}
        onChange={(e) => {
          handleChange(e);
          const value = e.target.value.replace(/\D/g, "");
          if (value.length === 8) buscarCEP(value);
        }}
        className="flex-1 ml-[60px]"
      />
    </div>

    <div className="flex items-center gap-2">
      <Label className="w-24">Endereço</Label>
      <Txt
        name="endereco"
        value={dados.endereco}
        onChange={handleChange}
        className="flex-1"
      />
    </div>
  </div>

 {/* === LINHA 5: Cidade | UF | Bairro === */}
<div className="grid grid-cols-[1fr_80px_1fr] gap-4 mb-2">

  {/* Cidade */}
  <div className="flex items-center gap-2">
    <Label className="w-20">Cidade</Label>
    <Txt
      name="cidade"
      value={dados.cidade}
      onChange={handleChange}
      className="flex-1 ml-[45px]"
    />
  </div>

  {/* UF */}
  <div className="flex items-center gap-2">
    <Label className="w-10">UF</Label>
    <Txt
      name="uf"
      maxLength={2}
      value={dados.uf}
      onChange={handleChange}
      className="w-full text-center"
    />
  </div>

  {/* Bairro */}
  <div className="flex items-center gap-2">
    <Label className="w-16">Bairro</Label>
    <Txt
      name="bairro"
      value={dados.bairro}
      onChange={handleChange}
      className="flex-1"
    />
  </div>

</div>


  {/* === LINHA 6: Email === */}
  <div className="flex items-center gap-2 mb-2">
    <Label className="w-16">Email</Label>
    <Txt name="email" value={dados.email} onChange={handleChange} className="flex-1 ml-[60px]" />
  </div>

  {/* === LINHA 7: Telefone === */}
  <div className="flex items-center gap-2">
    <Label className="w-16 ">Fone</Label>
    <Txt
      name="fone"
      value={dados.fone}
      onChange={handleChange}
      placeholder="(99) 99999-9999"
      className="flex-1 ml-[60px]"
    />
  </div>
</fieldset>


        {/* =============== CARD 2 (GRID) =============== */}
        <fieldset className="border border-gray-300 rounded p-3">
          <legend className="px-2 text-red-700 font-semibold">Registros</legend>

          <table className="w-full text-[12px] mt-2">
            <thead className="bg-gray-100 border">
              <tr>
                {[
                  "Código",
                  "Sigla",
                  "CGC/CPF",
                  "IE",
                  "Razão Social",
                  "Fantasia",
                  "Endereço",
                  "Bairro",
                  "Cidade",
                  "UF",
                  "CEP",
                  "Fone",
                  "E-mail",
                ].map((c) => (
                  <th key={c} className="border px-1 py-[4px] text-left">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {lista.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-red-50 cursor-pointer"
                  onClick={() => selecionarItem(item)}
                >
                  <td className="border px-1">{item.codigo}</td>
                  <td className="border px-1">{item.sigla}</td>
                  <td className="border px-1">{item.cnpj}</td>
                  <td className="border px-1">{item.ie}</td>
                  <td className="border px-1">{item.razao}</td>
                  <td className="border px-1">{item.fantasia}</td>
                  <td className="border px-1">{item.endereco}</td>
                  <td className="border px-1">{item.bairro}</td>
                  <td className="border px-1">{item.cidade}</td>
                  <td className="border px-1">{item.uf}</td>
                  <td className="border px-1">{item.cep}</td>
                  <td className="border px-1">{item.fone}</td>
                  <td className="border px-1">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>

      </div>

      {/* ================= FOOTER FIXO ================== */}
      {/* === RODAPÉ FIXO VISÍVEL AO FINAL === */}
<div className="sticky bottom-0 bg-white border-t border-gray-200 p-2 flex justify-between mt-auto z-10 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
  <div className="flex gap-3">
    <button onClick={() => window.history.back()} className="flex items-center gap-1 text-red-700 hover:text-gray-700 text-[13px]">
      <XCircle size={16} /> Fechar
    </button>

    <button onClick={handleLimpar} className="flex items-center gap-1 text-red-700 hover:text-gray-700 text-[13px]">
      <RotateCcw size={16} /> Limpar
    </button>

    <button onClick={handleIncluir} className="flex items-center gap-1 text-red-700 hover:text-gray-700 text-[13px]">
      <PlusCircle size={16} /> Incluir
    </button>

    <button onClick={handleAlterar} className="flex items-center gap-1 text-red-700 hover:text-gray-700 text-[13px]">
      <Edit size={16} /> Alterar
    </button>

    <button onClick={handleExcluir} className="flex items-center gap-1 text-red-700 hover:text-gray-700 text-[13px]">
      <Trash2 size={16} /> Excluir
    </button>
  </div>

  <div className="flex gap-3">
    <button onClick={() => setShowParametro(true)} className="flex items-center gap-1 text-red-700 hover:text-gray-700 text-[13px]">
      <Settings size={16} /> Parâmetros
    </button>

    <button onClick={() => setShowCIOT(true)} className="flex items-center gap-1 text-red-700 hover:text-gray-700 text-[13px]">
      <Waypoints size={16} /> CIOT
    </button>
  </div>
</div>


      {/* ========== MODAIS ========== */}
      {showParametro && (
        <EmpresaParametro onClose={() => setShowParametro(false)} />
      )}

      {showCIOT && <EmpresaCIOT onClose={() => setShowCIOT(false)} />}

    </div>
  );
}
