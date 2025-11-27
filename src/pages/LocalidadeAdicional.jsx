// src/pages/LocalidadeAdicional.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { useIconColor } from "../context/IconColorContext";

import {
  XCircle,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  Search,
} from "lucide-react";

/* ========================= Helpers ========================= */
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
      className={
        "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] " +
        (props.className || "")
      }
    />
  );
}

function Sel({ children, className = "", ...rest }) {
  return (
    <select
      {...rest}
      className={
        "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] " +
        className
      }
    >
      {children}
    </select>
  );
}

/* ========================= Máscaras / Utils ========================= */
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

/* ========================= Buscar CEP (ViaCEP) ========================= */
async function buscarCEP(cep, setForm) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      setForm((prev) => ({
        ...prev,
        endereco: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        uf: data.uf || "",
      }));
    }
  } catch (err) {
    console.log("Erro ao buscar CEP:", err);
  }
}

/* ========================= Mocks ========================= */

// Empresas para busca por CNPJ / Nome
const empresasMock = [
  {
    cnpj: "04086814000141",
    razao: "MANTRAN TRANSPORTES LTDA",
  },
  {
    cnpj: "16464947000193",
    razao: "BEVANNI TRANSPORTES LTDA",
  },
  {
    cnpj: "12345678000199",
    razao: "AMBEV LOGISTICA LTDA",
  },
  {
    cnpj: "98765432000100",
    razao: "BEV LOG TRANSPORTES",
  },
];

// Localidades adicionais mock para consulta
const localidadesMock = [
  {
    cnpj: "04086814000141",
    razao: "MANTRAN TRANSPORTES LTDA",
    codLocalidade: "0001",
    endereco: "RUA LOURDES",
    numero: "100",
    complemento: "SALA 01",
    bairro: "CENTRO",
    cidade: "SANTO ANDRE",
    uf: "SP",
    cep: "09015-340",
  },
  {
    cnpj: "16464947000193",
    razao: "BEVANNI TRANSPORTES LTDA",
    codLocalidade: "0002",
    endereco: "AV. DOS ESTADOS",
    numero: "2000",
    complemento: "",
    bairro: "INDUSTRIAL",
    cidade: "SANTO ANDRE",
    uf: "SP",
    cep: "09000-000",
  },
];

/* ========================= Modal Seleção Empresa ========================= */

function EmpresaSelecaoModal({ open, resultados, onSelect, onClose }) {
  if (!open) return null;

  return (
    <>
      {/* Fundo escurecido */}
      <div
        className="fixed inset-0 bg-black/40 z-[200]"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      ></div>

      {/* MODAL FIXO CENTRALIZADO */}
      <div
        className="
          fixed left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          z-[201]
          w-[650px] max-w-[95vw]
          bg-white border border-gray-300 rounded shadow-xl
        "
      >
        {/* Cabeçalho */}
 
        {/* Conteúdo */}
        <div className="p-3 text-[13px]">
          <div className="border rounded overflow-y-auto max-h-[350px]">
            <table className="w-full text-[12px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1 text-left">CNPJ</th>
                  <th className="border px-2 py-1 text-left">Razão Social</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((emp, idx) => (
                  <tr
                    key={idx}
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => onSelect(emp)}
                  >
                    <td className="border px-2 py-1">
                      {maskCNPJ(emp.cnpj)}
                    </td>
                    <td className="border px-2 py-1">{emp.razao}</td>
                  </tr>
                ))}

                {resultados.length === 0 && (
                  <tr>
                    <td
                      colSpan={2}
                      className="border px-2 py-3 text-center text-gray-500"
                    >
                      Nenhum registro encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={onClose}
              className="border border-gray-300 rounded px-3 py-[4px] text-[12px] hover:bg-gray-100"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ========================= Componente Principal ========================= */

const initialForm = {
  cnpj: "",
  razao: "",
  codLocalidade: "",
  cep: "",
  cidade: "",
  uf: "",
  bairro: "",
  endereco: "",
  numero: "",
  complemento: "",
};

export default function LocalidadeAdicional({ open }) {
  const navigate = useNavigate();
  const { footerIconColorNormal, footerIconColorHover } = useIconColor();

  const [form, setForm] = useState(initialForm);
  const [localidades, setLocalidades] = useState([]);
  const [selecionado, setSelecionado] = useState(null);

  // Modal de seleção de empresa
  const [empresaModalOpen, setEmpresaModalOpen] = useState(false);
  const [empresaResultados, setEmpresaResultados] = useState([]);

  /* ========= Handlers ========= */

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    if (field === "cep") {
      value = maskCEP(value);
      const dig = onlyDigits(value);
      if (dig.length === 8) {
        buscarCEP(dig, setForm);
      }
    }

    // No CNPJ não mascaramos aqui para permitir texto ("BEV", etc.)
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePesquisarLocalidades = () => {
    // Carrega todos os mocks na grid
    setLocalidades(localidadesMock);
    setSelecionado(null);
  };

  const preencherEmpresa = (emp) => {
    setForm((prev) => ({
      ...prev,
      cnpj: maskCNPJ(emp.cnpj),
      razao: emp.razao,
    }));
  };

  const handleCNPJKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const termo = form.cnpj.trim();
    if (!termo) return;

    const termoLower = termo.toLowerCase();
    const termoDigits = onlyDigits(termo);

    const resultados = empresasMock.filter((emp) => {
      const cnpjDigits = onlyDigits(emp.cnpj);
      const razaoLower = emp.razao.toLowerCase();

      const matchCNPJ =
        termoDigits && cnpjDigits.includes(termoDigits);
      const matchRazao = razaoLower.includes(termoLower);

      return matchCNPJ || matchRazao;
    });

    if (resultados.length === 0) {
      alert("Nenhum registro encontrado.");
      return;
    }

    if (resultados.length === 1) {
      preencherEmpresa(resultados[0]);
      return;
    }

    // Mais de um → abre modal de seleção
    setEmpresaResultados(resultados);
    setEmpresaModalOpen(true);
  };

  const handleGridSelect = (row, index) => {
    setSelecionado(index);
    setForm({
      cnpj: maskCNPJ(row.cnpj),
      razao: row.razao,
      codLocalidade: row.codLocalidade,
      cep: row.cep,
      cidade: row.cidade,
      uf: row.uf,
      bairro: row.bairro,
      endereco: row.endereco,
      numero: row.numero,
      complemento: row.complemento,
    });
  };

  const handleLimpar = () => {
    setForm(initialForm);
    setSelecionado(null);
  };

  const handleIncluir = () => {
    if (!form.cnpj || !form.codLocalidade) {
      alert("Informe pelo menos CNPJ e Cód. Localidade.");
      return;
    }

    const novo = {
      cnpj: onlyDigits(form.cnpj),
      razao: form.razao,
      codLocalidade: form.codLocalidade,
      endereco: form.endereco,
      numero: form.numero,
      complemento: form.complemento,
      bairro: form.bairro,
      cidade: form.cidade,
      uf: form.uf,
      cep: form.cep,
    };

    setLocalidades((prev) => [...prev, novo]);
    handleLimpar();
  };

  const handleAlterar = () => {
    if (selecionado === null) {
      alert("Selecione um registro na grid para alterar.");
      return;
    }

    const atualizado = {
      cnpj: onlyDigits(form.cnpj),
      razao: form.razao,
      codLocalidade: form.codLocalidade,
      endereco: form.endereco,
      numero: form.numero,
      complemento: form.complemento,
      bairro: form.bairro,
      cidade: form.cidade,
      uf: form.uf,
      cep: form.cep,
    };

    setLocalidades((prev) =>
      prev.map((item, idx) => (idx === selecionado ? atualizado : item))
    );

    handleLimpar();
  };

  const handleExcluir = () => {
    if (selecionado === null) {
      alert("Selecione um registro na grid para excluir.");
      return;
    }

    if (!window.confirm("Confirma exclusão da localidade selecionada?"))
      return;

    setLocalidades((prev) =>
      prev.filter((_, idx) => idx !== selecionado)
    );
    handleLimpar();
  };

  return (
    <div
      className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50 h-[calc(100vh-56px)] flex flex-col ${
        open ? "ml-[192px]" : "ml-[56px]"
      }`}
    >
      {/* Título */}
      <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
        CADASTRO LOCALIDADE ADICIONAL
      </h1>

      {/* Conteúdo */}
      <div className="flex-1 p-3 bg-white border-x border-b border-gray-200 rounded-b-md overflow-y-auto flex flex-col gap-3">
        {/* ================= CARD 1 - Parâmetros ================= */}
        <fieldset className="border border-gray-300 rounded p-3 bg-white">
          <legend className="text-red-700 font-semibold text-[13px] px-2">
            Parâmetros
          </legend>

          <div className="space-y-2">
            {/* Linha 1 - CGC/CPF, Razão, Cód. Localidade, Pesquisar */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <Label className="col-span-1">CGC/CPF</Label>

              <Txt
                className="col-span-2"
                value={form.cnpj}
                onChange={handleChange("cnpj")}
                onKeyDown={handleCNPJKeyDown}
                placeholder="CNPJ ou parte do nome"
              />

              <Txt
                className="col-span-5 bg-gray-200"
                value={form.razao}
                readOnly
                placeholder="Razão Social"
              />

              <Label className="col-span-1 text-right">
                Cód. Localidade
              </Label>
              <Txt
                className="col-span-1 text-center"
                value={form.codLocalidade}
                onChange={handleChange("codLocalidade")}
              />

              <button
                className="col-span-2 border border-gray-300 rounded px-2 py-[4px] text-[12px] flex items-center justify-center gap-1 hover:bg-gray-100"
                onClick={handlePesquisarLocalidades}
              >
                <Search size={14} className="text-red-700" />
                Pesquisar
              </button>
            </div>

            {/* Linha 2 - CEP, Cidade, UF, Bairro */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <Label className="col-span-1">CEP</Label>
              <Txt
                className="col-span-2"
                value={form.cep}
                onChange={handleChange("cep")}
                placeholder="00000-000"
              />

              <Label className="col-span-1">Cidade</Label>
              <Txt
                className="col-span-4"
                value={form.cidade}
                onChange={handleChange("cidade")}
              />

              
              <Txt
                className="col-span-1 text-center bg-gray-200"
                value={form.uf}
                readOnly
              />

              <Label className="col-span-1">Bairro</Label>
              <Txt
                className="col-span-2"
                value={form.bairro}
                onChange={handleChange("bairro")}
              />
            </div>

            {/* Linha 3 - Endereço, Nº, Complemento */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <Label className="col-span-1">Endereço</Label>
              <Txt
                className="col-span-7"
                value={form.endereco}
                onChange={handleChange("endereco")}
              />

             
              <Txt
                className="col-span-1"
                value={form.numero}
                onChange={handleChange("numero")}
              />

              <Label className="col-span-1">Compl.</Label>
              <Txt
                className="col-span-2"
                value={form.complemento}
                onChange={handleChange("complemento")}
              />
            </div>
          </div>
        </fieldset>

        {/* ================= CARD 2 - Localidades Adicionais ================= */}
        <fieldset className="border border-gray-300 rounded p-3 bg-white">
          <legend className="text-red-700 font-semibold text-[13px] px-2">
            Localidades Adicionais
          </legend>

          <div className="border border-gray-200 rounded max-h-[360px] overflow-y-auto">
            <table className="w-full text-[12px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">CNPJ</th>
                  <th className="border px-2 py-1">Razão Social</th>
                  <th className="border px-2 py-1">Cód. Localidade</th>
                  <th className="border px-2 py-1">Endereço</th>
                  <th className="border px-2 py-1">Nº</th>
                  <th className="border px-2 py-1">Compl.</th>
                  <th className="border px-2 py-1">Bairro</th>
                  <th className="border px-2 py-1">Cidade</th>
                  <th className="border px-2 py-1">UF</th>
                  <th className="border px-2 py-1">CEP</th>
                </tr>
              </thead>
              <tbody>
                {localidades.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer hover:bg-red-100 ${
                      selecionado === idx ? "bg-red-200" : ""
                    }`}
                    onClick={() => handleGridSelect(row, idx)}
                  >
                    <td className="border px-2 py-1">
                      {maskCNPJ(row.cnpj)}
                    </td>
                    <td className="border px-2 py-1">{row.razao}</td>
                    <td className="border px-2 py-1 text-center">
                      {row.codLocalidade}
                    </td>
                    <td className="border px-2 py-1">{row.endereco}</td>
                    <td className="border px-2 py-1 text-center">
                      {row.numero}
                    </td>
                    <td className="border px-2 py-1">{row.complemento}</td>
                    <td className="border px-2 py-1">{row.bairro}</td>
                    <td className="border px-2 py-1">{row.cidade}</td>
                    <td className="border px-2 py-1 text-center">
                      {row.uf}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {row.cep}
                    </td>
                  </tr>
                ))}
                {localidades.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="border px-2 py-2 text-center text-gray-500"
                    >
                      Nenhuma localidade carregada. Clique em "Pesquisar" para
                      listar ou utilize Incluir.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>

      {/* Rodapé */}
      <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">
        {/* Fechar */}
        <button
          onClick={() => navigate(-1)}
          title="Fechar Tela"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <XCircle size={20} />
          <span>Fechar</span>
        </button>

        {/* Limpar */}
        <button
          onClick={handleLimpar}
          title="Limpar Campos"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <RotateCcw size={20} />
          <span>Limpar</span>
        </button>

        {/* Incluir */}
        <button
          onClick={handleIncluir}
          title="Incluir Localidade"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <PlusCircle size={20} />
          <span>Incluir</span>
        </button>

        {/* Alterar */}
        <button
          onClick={handleAlterar}
          title="Alterar Localidade"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Edit size={20} />
          <span>Alterar</span>
        </button>

        {/* Excluir */}
        <button
          onClick={handleExcluir}
          title="Excluir Localidade"
          className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover} transition`}
        >
          <Trash2 size={20} />
          <span>Excluir</span>
        </button>
      </div>

      {/* Modal Seleção Empresa */}
      <EmpresaSelecaoModal
        open={empresaModalOpen}
        resultados={empresaResultados}
        onSelect={(emp) => {
          preencherEmpresa(emp);
          setEmpresaModalOpen(false);
        }}
        onClose={() => setEmpresaModalOpen(false)}
      />
    </div>
  );
}
