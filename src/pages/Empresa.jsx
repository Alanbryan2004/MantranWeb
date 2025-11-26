import { useState } from "react";
import EmpresaParametro from "./EmpresaParametro";
import EmpresaCIOT from "./EmpresaCIOT";
import EmpresaModulos from "./EmpresaModulos";
import { useIconColor } from "../context/IconColorContext";

import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  Settings,
  Waypoints,
  Boxes, // Ícone do botão Módulos
} from "lucide-react";

/* =============================
   Helpers visuais padrão Mantran
============================= */
function Label({ children, className = "" }) {
  return <label className={`text-[12px] text-gray-600 ${className}`}>{children}</label>;
}

function Txt(props) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] ${
        props.className || ""
      }`}
    />
  );
}

/* =============================
   Máscaras
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
   Componente Principal
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

  // 🔹 MOCK inicial para aparecer na grid
  const [lista, setLista] = useState([
    {
      codigo: "001",
      sigla: "MTR",
      cnpj: "12.345.678/0001-90",
      razao: "Mantran Tecnologia LTDA",
      fantasia: "MANTRAN",
      ie: "123.456.789.000",
      endereco: "Av. Exemplo, 123",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP",
      cep: "01234-000",
      fone: "(11) 99999-9999",
      email: "contato@mantran.com.br",
    },
  ]);

  const { footerIconColorNormal, footerIconColorHover } = useIconColor();

  const [showParametro, setShowParametro] = useState(false);
  const [showCIOT, setShowCIOT] = useState(false);
  const [showModulos, setShowModulos] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cnpj") value = maskCNPJ(value);
    if (name === "cep") value = maskCEP(value);
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

  const handleExcluir = () => {
    setLista(lista.filter((i) => i.codigo !== dados.codigo));
    handleLimpar();
  };

  const selecionarItem = (item) => setDados(item);

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
        {/* === CARD 1 === */}
        <fieldset className="border border-gray-300 rounded p-3 mb-3">
          <legend className="px-2 text-red-700 font-semibold">Parâmetros</legend>

          {/* Código / Sigla / CNPJ */}
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Label className="w-20">Código</Label>
              <Txt
                name="codigo"
                value={dados.codigo}
                onChange={handleChange}
                className="flex-1 ml-[45px]"
              />
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

          {/* Razão */}
          <div className="flex items-center gap-2 mb-2">
            <Label className="w-32">Razão Social</Label>
            <Txt
              name="razao"
              value={dados.razao}
              onChange={handleChange}
              className="flex-1 ml-[-3px]"
            />
          </div>

          {/* Fantasia / IE */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Label className="w-20">Fantasia</Label>
              <Txt
                name="fantasia"
                value={dados.fantasia}
                onChange={handleChange}
                className="flex-1 ml-[45px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label className="w-10">IE</Label>
              <Txt name="ie" value={dados.ie} onChange={handleChange} className="flex-1" />
            </div>
          </div>

          {/* CEP / Endereço */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Label className="w-16">CEP</Label>
              <Txt
                name="cep"
                value={dados.cep}
                onChange={handleChange}
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

          {/* Cidade / UF / Bairro */}
          <div className="grid grid-cols-[1fr_80px_1fr] gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Label className="w-20">Cidade</Label>
              <Txt
                name="cidade"
                value={dados.cidade}
                onChange={handleChange}
                className="flex-1 ml-[45px]"
              />
            </div>

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

          {/* Email */}
          <div className="flex items-center gap-2 mb-2">
            <Label className="w-16">Email</Label>
            <Txt
              name="email"
              value={dados.email}
              onChange={handleChange}
              className="flex-1 ml-[60px]"
            />
          </div>

          {/* Telefone */}
          <div className="flex items-center gap-2">
            <Label className="w-16">Fone</Label>
            <Txt
              name="fone"
              value={dados.fone}
              onChange={handleChange}
              className="flex-1 ml-[60px]"
            />
          </div>
        </fieldset>

        {/* === GRID === */}
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
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2 flex justify-between mt-auto z-10 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        {/* AÇÕES ESQUERDA */}
        <div className="flex gap-6">
          <button
            onClick={() => window.history.back()}
            title="Fechar"
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <XCircle size={18} />
            <span>Fechar</span>
          </button>

          <button
            onClick={handleLimpar}
            title="Limpar"
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <RotateCcw size={18} />
            <span>Limpar</span>
          </button>

          <button
            onClick={handleIncluir}
            title="Incluir"
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <PlusCircle size={18} />
            <span>Incluir</span>
          </button>

          <button
            onClick={handleAlterar}
            title="Alterar"
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <Edit size={18} />
            <span>Alterar</span>
          </button>

          <button
            onClick={handleExcluir}
            title="Excluir"
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <Trash2 size={18} />
            <span>Excluir</span>
          </button>
        </div>

        {/* AÇÕES DIREITA */}
        <div className="flex gap-6">
          <button
            onClick={() => setShowParametro(true)}
            title="Parâmetros"
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <Settings size={18} />
            <span>Parâmetros</span>
          </button>

          <button
            onClick={() => setShowCIOT(true)}
            title="CIOT"
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <Waypoints size={18} />
            <span>CIOT</span>
          </button>

          <button
            onClick={() => setShowModulos(true)}
            title="Módulos"
            className={`flex flex-col items-center text-[11px] transition ${footerIconColorNormal} hover:${footerIconColorHover}`}
          >
            <Boxes size={18} />
            <span>Módulos</span>
          </button>
        </div>
      </div>

      {/* MODAIS */}
      {showParametro && <EmpresaParametro onClose={() => setShowParametro(false)} />}
      {showCIOT && <EmpresaCIOT onClose={() => setShowCIOT(false)} />}

      {showModulos && <EmpresaModulos onClose={() => setShowModulos(false)} />}
    </div>
  );
}
