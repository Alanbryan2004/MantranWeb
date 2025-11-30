// src/pages/VeiculoSeguro.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    XCircle,
    RotateCcw,
    PlusCircle,
    Edit,
    Trash2,
    Search,
} from "lucide-react";
import { useIconColor } from "../context/IconColorContext";

/* =============== Helpers =============== */
function Label({ children, className = "" }) {
    return (
        <label
            className={`text-[12px] text-gray-700 flex items-center ${className}`}
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
                "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] w-full " +
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
                "border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] w-full " +
                className
            }
        >
            {children}
        </select>
    );
}

/* =============== Utils =============== */
function parseMoeda(valor) {
    if (!valor) return 0;
    return (
        Number(
            valor.toString().replace(/\./g, "").replace(",", ".")
        ) || 0
    );
}

function formatMoeda(num) {
    return (num || 0).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/* =============== Mocks =============== */
const mockSeguros = [
    {
        id: "1",
        veiculoCodigo: "0000005",
        veiculoDescricao: "ABH3806 - SCANIA - CAVALO TRUCADO - LINS",
        placa: "ABH3806",
        uf: "SP",
        seguradoraCod: "001",
        seguradoraNome: "SOMPO SEGUROS",
        nrApolice: "453123134",
        dtVigDe: "2025-07-10",
        hrVigDe: "13:03:00",
        dtVigAte: "2026-07-10",
        hrVigAte: "13:03:00",
        segurado: "SOMPO",
        corretor: "JOAO",
        bonus: "0,00",
        valorFranquia: "2.000,00",
        valorSeguro: "5.000,00",
        limMaxInden: "3,00",
        cobertura: "REGIONAL",
        danosMateriais: "5.000,00",
        danosPessoais: "4.000,00",
    },
];

const mockSeguradoras = [
    { cod: "001", nome: "SOMPO SEGUROS" },
    { cod: "002", nome: "PORTO SEGURO" },
];

/* =============== Componente Principal =============== */

export default function VeiculoSeguro({ open }) {
    const navigate = useNavigate();
    const { footerIconColorNormal, footerIconColorHover } = useIconColor();

    const [abaAtiva, setAbaAtiva] = useState("seguro"); // "seguro" | "consulta"

    const [lista, setLista] = useState(mockSeguros);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [dados, setDados] = useState({
        veiculoCodigo: "",
        veiculoDescricao: "",
        placa: "",
        uf: "",
        seguradoraCod: "",
        seguradoraNome: "",
        nrApolice: "",
        dtVigDe: "",
        hrVigDe: "",
        dtVigAte: "",
        hrVigAte: "",
        segurado: "",
        corretor: "",
        bonus: "",
        valorFranquia: "",
        valorSeguro: "",
        limMaxInden: "",
        cobertura: "",
        danosMateriais: "",
        danosPessoais: "",
    });

    const handleCampo = (field) => (e) => {
        setDados((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const limpar = () => {
        setDados({
            veiculoCodigo: "",
            veiculoDescricao: "",
            placa: "",
            uf: "",
            seguradoraCod: "",
            seguradoraNome: "",
            nrApolice: "",
            dtVigDe: "",
            hrVigDe: "",
            dtVigAte: "",
            hrVigAte: "",
            segurado: "",
            corretor: "",
            bonus: "",
            valorFranquia: "",
            valorSeguro: "",
            limMaxInden: "",
            cobertura: "",
            danosMateriais: "",
            danosPessoais: "",
        });
        setSelectedIndex(null);
    };

    const incluir = () => {
        if (!dados.veiculoCodigo) {
            alert("Informe o código do veículo.");
            return;
        }

        const novo = {
            id: Date.now().toString(),
            ...dados,
        };

        setLista((prev) => [...prev, novo]);
        setSelectedIndex(lista.length);
    };

    const alterar = () => {
        if (selectedIndex === null) {
            alert("Selecione um registro para alterar.");
            return;
        }

        setLista((prev) =>
            prev.map((item, idx) =>
                idx === selectedIndex ? { ...item, ...dados } : item
            )
        );
    };

    const excluir = () => {
        if (selectedIndex === null) {
            alert("Selecione um registro para excluir.");
            return;
        }
        if (!window.confirm("Deseja excluir este registro?")) return;

        setLista((prev) => prev.filter((_, idx) => idx !== selectedIndex));
        setSelectedIndex(null);
        limpar();
    };

    const selecionarRegistro = (item, index) => {
        setSelectedIndex(index);
        setDados({
            veiculoCodigo: item.veiculoCodigo || "",
            veiculoDescricao: item.veiculoDescricao || "",
            placa: item.placa || "",
            uf: item.uf || "",
            seguradoraCod: item.seguradoraCod || "",
            seguradoraNome: item.seguradoraNome || "",
            nrApolice: item.nrApolice || "",
            dtVigDe: item.dtVigDe || "",
            hrVigDe: item.hrVigDe || "",
            dtVigAte: item.dtVigAte || "",
            hrVigAte: item.hrVigAte || "",
            segurado: item.segurado || "",
            corretor: item.corretor || "",
            bonus: item.bonus || "",
            valorFranquia: item.valorFranquia || "",
            valorSeguro: item.valorSeguro || "",
            limMaxInden: item.limMaxInden || "",
            cobertura: item.cobertura || "",
            danosMateriais: item.danosMateriais || "",
            danosPessoais: item.danosPessoais || "",
        });
        setAbaAtiva("seguro");
    };

    // Totais exemplo (soma Valor Seguro)
    const totalValorSeguro = formatMoeda(
        lista.reduce((acc, item) => acc + parseMoeda(item.valorSeguro), 0)
    );

    /* ======= Consulta ======= */
    const [filtros, setFiltros] = useState({
        veiculoCod: "",
        seguradoraCod: "",
        dtDe: "",
        dtAte: "",
    });
    const [resultadoConsulta, setResultadoConsulta] = useState(lista);

    const handleCampoConsulta = (field) => (e) => {
        setFiltros((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const pesquisar = () => {
        let filtrado = [...lista];

        if (filtros.veiculoCod) {
            filtrado = filtrado.filter((r) =>
                r.veiculoCodigo.includes(filtros.veiculoCod)
            );
        }

        if (filtros.seguradoraCod) {
            filtrado = filtrado.filter((r) =>
                r.seguradoraCod.includes(filtros.seguradoraCod)
            );
        }

        if (filtros.dtDe) {
            filtrado = filtrado.filter(
                (r) => !r.dtVigDe || r.dtVigDe >= filtros.dtDe
            );
        }

        if (filtros.dtAte) {
            filtrado = filtrado.filter(
                (r) => !r.dtVigAte || r.dtVigAte <= filtros.dtAte
            );
        }

        setResultadoConsulta(filtrado);
    };

    /* =============== Render =============== */

    return (
        <div
            className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50
      h-[calc(100vh-56px)] flex flex-col
      ${open ? "ml-[192px]" : "ml-[56px]"}`}
        >
            {/* TÍTULO */}
            <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
                SEGUROS DE VEÍCULOS
            </h1>

            {/* CONTEÚDO */}
            <div className="flex-1 p-3 overflow-y-auto bg-white border-x border-b border-gray-300 rounded-b-md flex flex-col gap-3">
                {/* Abas */}
                <div className="border-b border-gray-200 mb-2 flex gap-2 text-[12px]">
                    <button
                        onClick={() => setAbaAtiva("seguro")}
                        className={`px-3 py-1 rounded-t-md border-x border-t ${abaAtiva === "seguro"
                                ? "border-gray-300 bg-white text-red-700 font-semibold"
                                : "border-transparent bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        Seguro
                    </button>
                    <button
                        onClick={() => setAbaAtiva("consulta")}
                        className={`px-3 py-1 rounded-t-md border-x border-t ${abaAtiva === "consulta"
                                ? "border-gray-300 bg-white text-red-700 font-semibold"
                                : "border-transparent bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        Consulta
                    </button>
                </div>

                {/* ====== ABA SEGURO (CADASTRO) ====== */}
                {abaAtiva === "seguro" && (
                    <>
                        {/* PARÂMETROS */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold text-[13px]">
                                Parâmetros
                            </legend>

                            <div className="space-y-2">
                                {/* Linha 1 - Veículo */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <Label className="col-span-2">Veículo</Label>
                                    <Txt
                                        className="col-span-2"
                                        value={dados.veiculoCodigo}
                                        onChange={handleCampo("veiculoCodigo")}
                                    />
                                    <Txt
                                        className="col-span-5 bg-gray-200"
                                        readOnly
                                        value={dados.veiculoDescricao}
                                    />
                                    <Txt
                                        className="col-span-2 bg-gray-200"
                                        readOnly
                                        value={dados.placa}
                                    />
                                    <Txt
                                        className="col-span-1 bg-gray-200 text-center"
                                        readOnly
                                        value={dados.uf}
                                    />
                                </div>

                                {/* Linha 2 - Seguradora */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <Label className="col-span-2">Seguradora</Label>
                                    <Txt
                                        className="col-span-2"
                                        value={dados.seguradoraCod}
                                        onChange={handleCampo("seguradoraCod")}
                                    />
                                    <Txt
                                        className="col-span-8 bg-gray-200"
                                        readOnly
                                        value={
                                            dados.seguradoraNome ||
                                            mockSeguradoras.find(
                                                (s) => s.cod === dados.seguradoraCod
                                            )?.nome ||
                                            ""
                                        }
                                    />
                                </div>

                                {/* Linha 3 - Apólice */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <Label className="col-span-2">Nr. Apólice</Label>
                                    <Txt
                                        className="col-span-4"
                                        value={dados.nrApolice}
                                        onChange={handleCampo("nrApolice")}
                                    />
                                </div>

                                {/* Linha 4 - Vigência */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <Label className="col-span-2">Vigência de</Label>
                                    <Txt
                                        type="date"
                                        className="col-span-2"
                                        value={dados.dtVigDe}
                                        onChange={handleCampo("dtVigDe")}
                                    />
                                    <Txt
                                        type="time"
                                        className="col-span-2"
                                        value={dados.hrVigDe}
                                        onChange={handleCampo("hrVigDe")}
                                    />
                                    <Label className="col-span-1 justify-center">Até</Label>
                                    <Txt
                                        type="date"
                                        className="col-span-2"
                                        value={dados.dtVigAte}
                                        onChange={handleCampo("dtVigAte")}
                                    />
                                    <Txt
                                        type="time"
                                        className="col-span-2"
                                        value={dados.hrVigAte}
                                        onChange={handleCampo("hrVigAte")}
                                    />
                                </div>

                                {/* Linha 5 - Segurado / Bônus */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <Label className="col-span-2">Segurado</Label>
                                    <Txt
                                        className="col-span-7"
                                        value={dados.segurado}
                                        onChange={handleCampo("segurado")}
                                    />
                                    <Label className="col-span-1 justify-end">% Bônus</Label>
                                    <Txt
                                        className="col-span-2 text-right"
                                        value={dados.bonus}
                                        onChange={handleCampo("bonus")}
                                    />
                                </div>

                                {/* Linha 6 - Corretor */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <Label className="col-span-2">Corretor</Label>
                                    <Txt
                                        className="col-span-6"
                                        value={dados.corretor}
                                        onChange={handleCampo("corretor")}
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* COBERTURAS */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold text-[13px]">
                                Coberturas
                            </legend>

                            <div className="grid grid-cols-12 gap-2 items-center">
                                <Label className="col-span-2">Valor Franquia</Label>
                                <Txt
                                    className="col-span-2 text-right"
                                    value={dados.valorFranquia}
                                    onChange={handleCampo("valorFranquia")}
                                />

                                <Label className="col-span-2">Valor do Seguro</Label>
                                <Txt
                                    className="col-span-2 text-right"
                                    value={dados.valorSeguro}
                                    onChange={handleCampo("valorSeguro")}
                                />
                            </div>
                        </fieldset>

                        {/* CASCO */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold text-[13px]">
                                Casco
                            </legend>

                            <div className="grid grid-cols-12 gap-2 items-center">
                                <Label className="col-span-2">Lim. Máx. Inden.</Label>
                                <Txt
                                    className="col-span-2 text-right"
                                    value={dados.limMaxInden}
                                    onChange={handleCampo("limMaxInden")}
                                />

                                <Label className="col-span-2">Cobertura</Label>
                                <Txt
                                    className="col-span-6"
                                    value={dados.cobertura}
                                    onChange={handleCampo("cobertura")}
                                />
                            </div>
                        </fieldset>

                        {/* RCFV */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold text-[13px]">
                                R C F V - Limite Máximo de Indenização para
                            </legend>

                            <div className="grid grid-cols-12 gap-2 items-center">
                                <Label className="col-span-2">Danos Materiais</Label>
                                <Txt
                                    className="col-span-2 text-right"
                                    value={dados.danosMateriais}
                                    onChange={handleCampo("danosMateriais")}
                                />

                                <Label className="col-span-2">Danos Pessoais</Label>
                                <Txt
                                    className="col-span-2 text-right"
                                    value={dados.danosPessoais}
                                    onChange={handleCampo("danosPessoais")}
                                />
                            </div>
                        </fieldset>

                        {/* Totais (ex: total Valor Seguro) */}
                        <div className="grid grid-cols-12 gap-2 mt-2 text-[12px]">
                            <Label className="col-span-3">Total Valor Seguro</Label>
                            <Txt
                                className="col-span-3 bg-gray-200 text-right"
                                readOnly
                                value={totalValorSeguro}
                            />
                        </div>
                    </>
                )}

                {/* ====== ABA CONSULTA ====== */}
                {abaAtiva === "consulta" && (
                    <>
                        {/* CARD 1 - Filtros */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold text-[13px]">
                                Parâmetros de Consulta
                            </legend>

                            <div className="space-y-2">
                                {/* Linha 1 */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <Label className="col-span-2">Veículo</Label>
                                    <Txt
                                        className="col-span-2"
                                        value={filtros.veiculoCod}
                                        onChange={handleCampoConsulta("veiculoCod")}
                                    />
                                    <Label className="col-span-2">Seguradora</Label>
                                    <Txt
                                        className="col-span-2"
                                        value={filtros.seguradoraCod}
                                        onChange={handleCampoConsulta("seguradoraCod")}
                                    />
                                </div>

                                {/* Linha 2 - Vigência entre */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <Label className="col-span-2">Vigência entre</Label>
                                    <Txt
                                        type="date"
                                        className="col-span-2"
                                        value={filtros.dtDe}
                                        onChange={handleCampoConsulta("dtDe")}
                                    />
                                    <Label className="col-span-1 justify-center">e</Label>
                                    <Txt
                                        type="date"
                                        className="col-span-2"
                                        value={filtros.dtAte}
                                        onChange={handleCampoConsulta("dtAte")}
                                    />
                                </div>

                                {/* Linha 3 - Pesquisar alinhado à direita */}
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <div className="col-span-9" />
                                    <div className="col-span-3 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={pesquisar}
                                            className="flex items-center gap-1 px-3 py-[3px] border border-gray-300 rounded text-[12px] bg-white hover:bg-gray-100"
                                        >
                                            <Search size={14} />
                                            Pesquisar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        {/* CARD 2 - Grid */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold text-[13px]">
                                Resultados
                            </legend>

                            <div className="border border-gray-200 rounded max-h-[320px] overflow-y-auto">
                                <table className="w-full text-[12px]">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-2 py-1 text-left">Veículo</th>
                                            <th className="border px-2 py-1 text-left">
                                                Seguradora
                                            </th>
                                            <th className="border px-2 py-1 text-center">
                                                Nr. Apólice
                                            </th>
                                            <th className="border px-2 py-1 text-center">
                                                Vigência de
                                            </th>
                                            <th className="border px-2 py-1 text-center">
                                                Vigência até
                                            </th>
                                            <th className="border px-2 py-1 text-right">
                                                Valor Seguro
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultadoConsulta.map((r, idx) => (
                                            <tr
                                                key={r.id || idx}
                                                className="cursor-pointer hover:bg-red-100"
                                                onClick={() => selecionarRegistro(r, idx)}
                                            >
                                                <td className="border px-2 py-1">
                                                    {r.veiculoDescricao}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {r.seguradoraNome}
                                                </td>
                                                <td className="border px-2 py-1 text-center">
                                                    {r.nrApolice}
                                                </td>
                                                <td className="border px-2 py-1 text-center">
                                                    {r.dtVigDe}
                                                </td>
                                                <td className="border px-2 py-1 text-center">
                                                    {r.dtVigAte}
                                                </td>
                                                <td className="border px-2 py-1 text-right">
                                                    {r.valorSeguro}
                                                </td>
                                            </tr>
                                        ))}
                                        {resultadoConsulta.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="border px-2 py-2 text-center text-gray-500"
                                                >
                                                    Nenhum registro encontrado.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </fieldset>
                    </>
                )}
            </div>

            {/* RODAPÉ */}
            <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <XCircle size={20} />
                    <span>Fechar</span>
                </button>

                <button
                    onClick={limpar}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <RotateCcw size={20} />
                    <span>Limpar</span>
                </button>

                <button
                    onClick={incluir}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <PlusCircle size={20} />
                    <span>Incluir</span>
                </button>

                <button
                    onClick={alterar}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <Edit size={20} />
                    <span>Alterar</span>
                </button>

                <button
                    onClick={excluir}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <Trash2 size={20} />
                    <span>Excluir</span>
                </button>
            </div>
        </div>
    );
}
