// ===============================
// VeiculoMulta.jsx
// ===============================
import { useState } from "react";
import {
    XCircle,
    RotateCcw,
    PlusCircle,
    Edit,
    Trash2,
    ArrowLeftRight,
    ChevronDown,
    ChevronRight,
    Search,
    FileText,
} from "lucide-react";
import { useIconColor } from "../context/IconColorContext";

/* Helpers */
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

/* Mock */
const mockMultas = [
    {
        id: 1,
        veiculoCodigo: "0000001",
        veiculoDescricao: "RENSJ17 - VW 24280 CRM 6X2 - BITRUCK",
        cidade: "BRASILIA",
        uf: "DF",
        dataInclusao: "2025-08-06",
        dataInfracao: "2025-08-01",
        horaInfracao: "14:48:31",
        grupo: "ABCD",
        nrAtuacao: "111",
        orgaoAutuacao: "111",
        cepOrigem: "13100000",
        cepOrigemCidade: "CAMPINAS",
        cepOrigemUF: "SP",
        cepDestino: "13170001",
        cepDestinoCidade: "SUMARE",
        cepDestinoUF: "SP",
        infracao: "ABCD",
        local: "AABB",
        velPermitida: "100,00",
        velConstatada: "120,00",
        pontuacao: "10",
        tituloCP: "",
        dataRecurso: "",
        indeferido: false,
        alegacao: "",
        motoristaCNH: "01268446760",
        motoristaNome: "ALAN DA COSTA",
        vencComDescData: "2025-08-06",
        vencComDescValor: "100,00",
        vencSemDescData: "2025-08-16",
        vencSemDescValor: "200,00",
        cobrarMotorista: false,
        dataDescMotorista: "",
        pagtoData: "",
        pagtoValor: "",
    },
];

/* ======================== */
/* COMPONENTE PRINCIPAL */
/* ======================== */

export default function VeiculoMulta({ open, onClose }) {
    const { footerIconColorNormal, footerIconColorHover } = useIconColor();

    const [aba, setAba] = useState("cadastro");

    const [lista, setLista] = useState(mockMultas);
    const [editIndex, setEditIndex] = useState(null);

    /* Retráteis */
    const [localOpen, setLocalOpen] = useState(false);
    const [recursoOpen, setRecursoOpen] = useState(false);
    const [motoristaOpen, setMotoristaOpen] = useState(false);
    const [valoresOpen, setValoresOpen] = useState(false);

    const toggle = (fn) => fn((prev) => !prev);

    /* Dados */
    const [dados, setDados] = useState({
        atuacaoTipo: "notificacao",
        dataInclusao: "",
        dataInfracao: "",
        horaInfracao: "",
        grupo: "",
        nrAtuacao: "",
        orgaoAutuacao: "",
        veiculoCodigo: "",
        veiculoDescricao: "",
        modelo: "",
        cidade: "",
        uf: "",
        cepOrigem: "",
        cepOrigemCidade: "",
        cepOrigemUF: "",
        cepDestino: "",
        cepDestinoCidade: "",
        cepDestinoUF: "",
        infracao: "",
        local: "",
        velPermitida: "",
        velConstatada: "",
        pontuacao: "",
        tituloCP: "",
        dataRecurso: "",
        indeferido: false,
        alegacao: "",
        motoristaCNH: "",
        motoristaNome: "",
        vencComDescData: "",
        vencComDescValor: "",
        vencSemDescData: "",
        vencSemDescValor: "",
        cobrarMotorista: false,
        dataDescMotorista: "",
        pagtoData: "",
        pagtoValor: "",
    });

    const handle = (field) => (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setDados((prev) => ({ ...prev, [field]: value }));
    };

    /* Funções */
    const limpar = () => {
        setEditIndex(null);
        setDados({
            atuacaoTipo: "notificacao",
            dataInclusao: "",
            dataInfracao: "",
            horaInfracao: "",
            grupo: "",
            nrAtuacao: "",
            orgaoAutuacao: "",
            veiculoCodigo: "",
            veiculoDescricao: "",
            modelo: "",
            cidade: "",
            uf: "",
            cepOrigem: "",
            cepOrigemCidade: "",
            cepOrigemUF: "",
            cepDestino: "",
            cepDestinoCidade: "",
            cepDestinoUF: "",
            infracao: "",
            local: "",
            velPermitida: "",
            velConstatada: "",
            pontuacao: "",
            tituloCP: "",
            dataRecurso: "",
            indeferido: false,
            alegacao: "",
            motoristaCNH: "",
            motoristaNome: "",
            vencComDescData: "",
            vencComDescValor: "",
            vencSemDescData: "",
            vencSemDescValor: "",
            cobrarMotorista: false,
            dataDescMotorista: "",
            pagtoData: "",
            pagtoValor: "",
        });
    };

    const incluir = () => {
        setLista([...lista, dados]);
        limpar();
    };

    const alterar = () => {
        if (editIndex === null) return;
        const nova = [...lista];
        nova[editIndex] = dados;
        setLista(nova);
    };

    const excluir = () => {
        if (editIndex === null) return;
        setLista(lista.filter((_, i) => i !== editIndex));
        limpar();
    };

    const selecionar = (item, index) => {
        setDados(item);
        setEditIndex(index);
        setAba("cadastro");
    };

    /* MODAL CP */
    const [modalCP, setModalCP] = useState(false);
    const [modalMsg, setModalMsg] = useState(false);

    /* ============================== */
    /* RENDER */
    /* ============================== */

    return (
        <div
            className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50
      h-[calc(100vh-56px)] flex flex-col
      ${open ? "ml-[192px]" : "ml-[56px]"}`}
        >
            {/* TÍTULO */}
            <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
                MULTAS / INFRAÇÕES
            </h1>

            {/* CONTEÚDO */}
            <div className="flex-1 p-3 overflow-y-auto bg-white border-x border-b border-gray-300 rounded-b-md flex flex-col gap-3">
                {/* ABAS */}
                <div className="border-b border-gray-200 mb-2 flex gap-2 text-[12px]">
                    <button
                        onClick={() => setAba("cadastro")}
                        className={`px-3 py-1 rounded-t-md border-x border-t ${aba === "cadastro"
                            ? "border-gray-300 bg-white text-red-700 font-semibold"
                            : "border-transparent bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        Cadastro
                    </button>

                    <button
                        onClick={() => setAba("consulta")}
                        className={`px-3 py-1 rounded-t-md border-x border-t ${aba === "consulta"
                            ? "border-gray-300 bg-white text-red-700 font-semibold"
                            : "border-transparent bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        Consulta
                    </button>
                </div>

                {/* ===========================================================
           ABA CADASTRO
        =========================================================== */}
                {aba === "cadastro" && (
                    <>
                        {/* CARD 1 - ATUAÇÃO */}
                        <div className="border border-gray-300 rounded p-3 bg-white">
                            <Label className="col-span-12 font-semibold">Atuação</Label>

                            <div className="flex gap-4 mt-2 ml-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="atuacao"
                                        value="notificacao"
                                        checked={dados.atuacaoTipo === "notificacao"}
                                        onChange={handle("atuacaoTipo")}
                                    />
                                    Notificação
                                </label>

                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="atuacao"
                                        value="multa"
                                        checked={dados.atuacaoTipo === "multa"}
                                        onChange={handle("atuacaoTipo")}
                                    />
                                    Multa
                                </label>
                            </div>
                        </div>

                        {/* CARD 2 - IDENTIFICAÇÃO DA AUTUAÇÃO */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold">
                                Identificação da Autuação
                            </legend>

                            <div className="space-y-2">
                                {/* Linha 1 */}
                                <div className="grid grid-cols-12 gap-2">
                                    <Label className="col-span-2">Data Inclusão</Label>
                                    <Txt
                                        type="date"
                                        className="col-span-2"
                                        value={dados.dataInclusao}
                                        onChange={handle("dataInclusao")}
                                    />
                                </div>

                                {/* Linha 2 */}
                                <div className="grid grid-cols-12 gap-2">
                                    <Label className="col-span-2">Data Infração</Label>
                                    <Txt
                                        type="date"
                                        className="col-span-2"
                                        value={dados.dataInfracao}
                                        onChange={handle("dataInfracao")}
                                    />

                                    <Label className="col-span-1">Hora</Label>
                                    <Txt
                                        type="time"
                                        className="col-span-2"
                                        value={dados.horaInfracao}
                                        onChange={handle("horaInfracao")}
                                    />

                                    <Label className="col-span-1">Grupo</Label>
                                    <Txt
                                        className="col-span-2"
                                        value={dados.grupo}
                                        onChange={handle("grupo")}
                                    />

                                    <Label className="col-span-1">Nº Atuação</Label>
                                    <Txt
                                        className="col-span-1"
                                        value={dados.nrAtuacao}
                                        onChange={handle("nrAtuacao")}
                                    />
                                </div>

                                {/* Linha 3 */}
                                <div className="grid grid-cols-12 gap-2">
                                    <Label className="col-span-2">Órgão Autuação</Label>
                                    <Txt
                                        className="col-span-3"
                                        value={dados.orgaoAutuacao}
                                        onChange={handle("orgaoAutuacao")}
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* CARD 3 - IDENTIFICAÇÃO DO VEÍCULO */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold">
                                Identificação do Veículo
                            </legend>

                            <div className="grid grid-cols-12 gap-2 items-center">
                                <Label className="col-span-2">Veículo</Label>
                                <Txt
                                    className="col-span-2"
                                    value={dados.veiculoCodigo}
                                    onChange={handle("veiculoCodigo")}
                                />
                                <Txt
                                    className="col-span-4 bg-gray-200"
                                    readOnly
                                    value={dados.veiculoDescricao}
                                />
                                <Txt
                                    className="col-span-2 bg-gray-200"
                                    readOnly
                                    value={dados.cidade}
                                />
                                <Txt
                                    className="col-span-2 bg-gray-200 text-center"
                                    readOnly
                                    value={dados.uf}
                                />
                            </div>
                        </fieldset>

                        {/* CARD 4 - LOCAL DA INFRAÇÃO (RETRÁTIL) */}
                        <fieldset className="border border-gray-300 rounded bg-white">
                            <legend
                                className="px-2 text-red-700 font-semibold flex items-center cursor-pointer"
                                onClick={() => toggle(setLocalOpen)}
                            >
                                {localOpen ? (
                                    <ChevronDown className="mr-1" size={16} />
                                ) : (
                                    <ChevronRight className="mr-1" size={16} />
                                )}
                                Identificação do Local da Infração
                            </legend>

                            {localOpen && (
                                <div className="p-3 space-y-2">
                                    {/* Linha 1 - CEP Origem */}
                                    <div className="grid grid-cols-12 gap-2">
                                        <Label className="col-span-2">CEP Origem</Label>
                                        <Txt
                                            className="col-span-2"
                                            value={dados.cepOrigem}
                                            onChange={handle("cepOrigem")}
                                        />
                                        <Txt
                                            className="col-span-3 bg-gray-200"
                                            readOnly
                                            value={dados.cepOrigemCidade}
                                        />
                                        <Txt
                                            className="col-span-1 bg-gray-200 text-center"
                                            readOnly
                                            value={dados.cepOrigemUF}
                                        />
                                    </div>

                                    {/* Linha 2 - CEP Destino */}
                                    <div className="grid grid-cols-12 gap-2">
                                        <Label className="col-span-2">CEP Destino</Label>
                                        <Txt
                                            className="col-span-2"
                                            value={dados.cepDestino}
                                            onChange={handle("cepDestino")}
                                        />
                                        <Txt
                                            className="col-span-3 bg-gray-200"
                                            readOnly
                                            value={dados.cepDestinoCidade}
                                        />
                                        <Txt
                                            className="col-span-1 bg-gray-200 text-center"
                                            readOnly
                                            value={dados.cepDestinoUF}
                                        />
                                    </div>

                                    {/* Linha 3 - Infração */}
                                    <div className="grid grid-cols-12 gap-2">
                                        <Label className="col-span-2">Infração</Label>
                                        <Txt
                                            className="col-span-4"
                                            value={dados.infracao}
                                            onChange={handle("infracao")}
                                        />
                                    </div>

                                    {/* Linha 4 - Local */}
                                    <div className="grid grid-cols-12 gap-2">
                                        <Label className="col-span-2">Local</Label>
                                        <Txt
                                            className="col-span-8"
                                            value={dados.local}
                                            onChange={handle("local")}
                                        />
                                    </div>

                                    {/* Linha 5 - Velocidades */}
                                    <div className="grid grid-cols-12 gap-2">
                                        <Label className="col-span-2">Vel. Permitida</Label>
                                        <Txt
                                            className="col-span-2 text-right"
                                            value={dados.velPermitida}
                                            onChange={handle("velPermitida")}
                                        />

                                        <Label className="col-span-2">Vel. Constatada</Label>
                                        <Txt
                                            className="col-span-2 text-right"
                                            value={dados.velConstatada}
                                            onChange={handle("velConstatada")}
                                        />

                                        <Label className="col-span-1">Pontuação</Label>
                                        <Txt
                                            className="col-span-1 text-right"
                                            value={dados.pontuacao}
                                            onChange={handle("pontuacao")}
                                        />

                                        <Label className="col-span-1">Título CP</Label>
                                        <Txt
                                            className="col-span-1 bg-gray-200"
                                            readOnly
                                            value={dados.tituloCP}
                                        />
                                    </div>
                                </div>
                            )}
                        </fieldset>

                        {/* CARD 5 - RECURSO (RETRÁTIL) */}
                        <fieldset className="border border-gray-300 rounded bg-white">
                            <legend
                                className="px-2 text-red-700 font-semibold flex items-center cursor-pointer"
                                onClick={() => toggle(setRecursoOpen)}
                            >
                                {recursoOpen ? (
                                    <ChevronDown className="mr-1" size={16} />
                                ) : (
                                    <ChevronRight className="mr-1" size={16} />
                                )}
                                Recurso
                            </legend>

                            {recursoOpen && (
                                <div className="p-3 space-y-2">
                                    {/* Linha 1 */}
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <Label className="col-span-2">Data Recurso</Label>
                                        <Txt
                                            type="date"
                                            className="col-span-2"
                                            value={dados.dataRecurso}
                                            onChange={handle("dataRecurso")}
                                        />

                                        <Label className="col-span-2 flex items-center gap-1">
                                            <input
                                                type="checkbox"
                                                checked={dados.indeferido}
                                                onChange={handle("indeferido")}
                                            />
                                            Recurso Indeferido
                                        </Label>
                                    </div>

                                    {/* Linha 2 */}
                                    <div className="grid grid-cols-12 gap-2">
                                        <Label className="col-span-2">Alegação</Label>
                                        <Txt
                                            className="col-span-10"
                                            value={dados.alegacao}
                                            onChange={handle("alegacao")}
                                        />
                                    </div>
                                </div>
                            )}
                        </fieldset>

                        {/* CARD 6 - MOTORISTA (RETRÁTIL) */}
                        <fieldset className="border border-gray-300 rounded bg-white">
                            <legend
                                className="px-2 text-red-700 font-semibold flex items-center cursor-pointer"
                                onClick={() => toggle(setMotoristaOpen)}
                            >
                                {motoristaOpen ? (
                                    <ChevronDown className="mr-1" size={16} />
                                ) : (
                                    <ChevronRight className="mr-1" size={16} />
                                )}
                                Identificação do Motorista
                            </legend>

                            {motoristaOpen && (
                                <div className="p-3 space-y-2">
                                    <div className="grid grid-cols-12 gap-2">
                                        <Label className="col-span-2">Motorista</Label>
                                        <Txt
                                            className="col-span-3"
                                            value={dados.motoristaCNH}
                                            onChange={handle("motoristaCNH")}
                                        />
                                        <Txt
                                            className="col-span-4 bg-gray-200"
                                            readOnly
                                            value={dados.motoristaNome}
                                        />
                                    </div>
                                </div>
                            )}
                        </fieldset>

                        {/* CARD 7 - VALORES (RETRÁTIL) */}
                        <fieldset className="border border-gray-300 rounded bg-white">
                            <legend
                                className="px-2 text-red-700 font-semibold flex items-center cursor-pointer"
                                onClick={() => toggle(setValoresOpen)}
                            >
                                {valoresOpen ? (
                                    <ChevronDown className="mr-1" size={16} />
                                ) : (
                                    <ChevronRight className="mr-1" size={16} />
                                )}
                                Valores
                            </legend>

                            {valoresOpen && (
                                <div className="p-3 space-y-3">
                                    {/* Linha 1 */}
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <Label className="col-span-2">Com Desconto</Label>
                                        <Txt
                                            type="date"
                                            className="col-span-2"
                                            value={dados.vencComDescData}
                                            onChange={handle("vencComDescData")}
                                        />
                                        <Label className="col-span-1 text-right">Valor</Label>
                                        <Txt
                                            className="col-span-2 text-right"
                                            value={dados.vencComDescValor}
                                            onChange={handle("vencComDescValor")}
                                        />
                                    </div>

                                    {/* Linha 2 */}
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <Label className="col-span-2">Sem Desconto</Label>
                                        <Txt
                                            type="date"
                                            className="col-span-2"
                                            value={dados.vencSemDescData}
                                            onChange={handle("vencSemDescData")}
                                        />
                                        <Label className="col-span-1 text-right">Valor</Label>
                                        <Txt
                                            className="col-span-2 text-right"
                                            value={dados.vencSemDescValor}
                                            onChange={handle("vencSemDescValor")}
                                        />
                                    </div>

                                    {/* Linha 3 */}
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <Label className="col-span-3 flex items-center gap-1">
                                            <input
                                                type="checkbox"
                                                checked={dados.cobrarMotorista}
                                                onChange={handle("cobrarMotorista")}
                                            />
                                            Cobrar do Motorista
                                        </Label>

                                        <Label className="col-span-2">Data Desconto</Label>
                                        <Txt
                                            type="date"
                                            className="col-span-2"
                                            value={dados.dataDescMotorista}
                                            onChange={handle("dataDescMotorista")}
                                        />
                                    </div>

                                    {/* Linha 4 – Pagamento */}
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <Label className="col-span-2">Pagamento</Label>
                                        <Txt
                                            type="date"
                                            className="col-span-2"
                                            value={dados.pagtoData}
                                            onChange={handle("pagtoData")}
                                        />
                                        <Label className="col-span-1 text-right">Valor</Label>
                                        <Txt
                                            className="col-span-2 text-right"
                                            value={dados.pagtoValor}
                                            onChange={handle("pagtoValor")}
                                        />
                                    </div>
                                </div>
                            )}
                        </fieldset>
                    </>
                )}

                {/* ===========================================================
           ABA CONSULTA
        =========================================================== */}
                {aba === "consulta" && (
                    <>
                        {/* CARD 1 – FILTROS */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold">
                                Parâmetros de Consulta
                            </legend>

                            <div className="space-y-2">
                                {/* Linha 1 – Veículo */}
                                <div className="grid grid-cols-12 gap-2">
                                    <Label className="col-span-2">Veículo</Label>
                                    <Txt className="col-span-2" />
                                    <Txt className="col-span-4 bg-gray-200" readOnly />
                                </div>

                                {/* Linha 2 – Motorista */}
                                <div className="grid grid-cols-12 gap-2">
                                    <Label className="col-span-2">Motorista</Label>
                                    <Txt className="col-span-3" />
                                    <Txt className="col-span-4 bg-gray-200" readOnly />
                                </div>

                                {/* Linha 3 – Infração + Vencimento */}
                                <div className="grid grid-cols-12 gap-2">
                                    <Label className="col-span-2">Infração entre</Label>
                                    <Txt type="date" className="col-span-2" />
                                    <Label className="col-span-1 text-center">e</Label>
                                    <Txt type="date" className="col-span-2" />

                                    <Label className="col-span-2">Vencimento entre</Label>
                                    <Txt type="date" className="col-span-2" />
                                </div>

                                {/* Linha 4 – Recursos + Pagos */}
                                <div className="grid grid-cols-12 gap-2">
                                    <Label className="col-span-2">Recursos entre</Label>
                                    <Txt type="date" className="col-span-2" />
                                    <Label className="col-span-1 text-center">e</Label>
                                    <Txt type="date" className="col-span-2" />

                                    <Label className="col-span-2">Pagos entre</Label>
                                    <Txt type="date" className="col-span-2" />
                                </div>

                                {/* Linha 5 – Radio + Botão */}
                                <div className="grid grid-cols-12 gap-2 items-center mt-2">
                                    <div className="col-span-6 flex gap-4 ml-4">
                                        <label className="flex items-center gap-1">
                                            <input type="radio" name="mTipo" defaultChecked />
                                            Ambos
                                        </label>
                                        <label className="flex items-center gap-1">
                                            <input type="radio" name="mTipo" />
                                            Notificação
                                        </label>
                                        <label className="flex items-center gap-1">
                                            <input type="radio" name="mTipo" />
                                            Multa
                                        </label>
                                    </div>

                                    <div className="col-span-6 flex justify-end">
                                        <button className="flex items-center gap-1 px-3 py-[3px] border border-gray-300 rounded text-[12px] bg-white hover:bg-gray-100">
                                            <Search size={14} />
                                            Pesquisar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        {/* CARD 2 – GRID */}
                        <fieldset className="border border-gray-300 rounded p-3 bg-white">
                            <legend className="px-2 text-red-700 font-semibold">
                                Resultados
                            </legend>

                            <div className="border border-gray-200 rounded max-h-[320px] overflow-y-auto">
                                <table className="w-full text-[12px]">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-2 py-1">Nº Placa / Veículo</th>
                                            <th className="border px-2 py-1">Data Vencimento</th>
                                            <th className="border px-2 py-1">VR Multa c/ Desc</th>
                                            <th className="border px-2 py-1">Venc sem Desc</th>
                                            <th className="border px-2 py-1">VR Multa s/ Desc</th>
                                            <th className="border px-2 py-1">Data Pagto</th>
                                            <th className="border px-2 py-1">Motorista</th>
                                            <th className="border px-2 py-1">Data Multa</th>
                                            <th className="border px-2 py-1">Hora</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {lista.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="cursor-pointer hover:bg-red-100"
                                                onClick={() => selecionar(item, index)}
                                            >
                                                <td className="border px-2 py-1">
                                                    {item.veiculoDescricao}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {item.vencComDescData}
                                                </td>
                                                <td className="border px-2 py-1 text-right">
                                                    {item.vencComDescValor}
                                                </td>
                                                <td className="border px-2 py-1 text-right">
                                                    {item.vencSemDescData}
                                                </td>
                                                <td className="border px-2 py-1 text-right">
                                                    {item.vencSemDescValor}
                                                </td>
                                                <td className="border px-2 py-1">{item.pagtoData}</td>
                                                <td className="border px-2 py-1">{item.motoristaNome}</td>
                                                <td className="border px-2 py-1">{item.dataInfracao}</td>
                                                <td className="border px-2 py-1">
                                                    {item.horaInfracao}
                                                </td>
                                            </tr>
                                        ))}
                                        {lista.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={10}
                                                    className="text-center text-gray-500 py-3"
                                                >
                                                    Nenhum registro encontrado
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

            {/* ===========================================================
         RODAPÉ
      =========================================================== */}
            <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">
                {/* Fechar */}
                <button
                    onClick={onClose}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <XCircle size={20} />
                    <span>Fechar</span>
                </button>

                {/* Limpar */}
                <button
                    onClick={limpar}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <RotateCcw size={20} />
                    <span>Limpar</span>
                </button>

                {/* Incluir */}
                <button
                    onClick={incluir}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <PlusCircle size={20} />
                    <span>Incluir</span>
                </button>

                {/* Alterar */}
                <button
                    onClick={alterar}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <Edit size={20} />
                    <span>Alterar</span>
                </button>

                {/* Excluir */}
                <button
                    onClick={excluir}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <Trash2 size={20} />
                    <span>Excluir</span>
                </button>

                {/* Gerar CP */}
                <button
                    onClick={() => setModalCP(true)}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <FileText size={20} />
                    <span>Gerar CP</span>
                </button>

                {/* Estornar */}
                <button
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <ArrowLeftRight size={20} />
                    <span>Estornar</span>
                </button>
            </div>

            {/* ===========================================================
         MODAL – GERAR CP  (igual ao IPVA)
      =========================================================== */}
            {modalCP && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg w-[600px] border">
                        <h3 className="text-center text-red-700 font-bold mb-3">
                            MULTA – GERAR CONTAS A PAGAR
                        </h3>

                        <fieldset className="border border-gray-300 rounded p-3 mb-3">
                            <legend className="px-2 text-red-700 font-semibold">
                                Dados para Contas a Pagar
                            </legend>

                            {/* A Crédito de */}
                            <div className="grid grid-cols-12 gap-2 mb-2">
                                <Label className="col-span-2">A Crédito de</Label>
                                <Txt className="col-span-3 bg-gray-200" readOnly value="12345678000199" />
                                <Txt className="col-span-7 bg-gray-200" readOnly value="EMPRESA TESTE" />
                            </div>

                            {/* Número Título */}
                            <div className="grid grid-cols-12 gap-2 mb-2">
                                <Label className="col-span-2">Nº Título</Label>
                                <Txt className="col-span-3" />

                                <Label className="col-span-2">Nº Parcela</Label>
                                <Txt className="col-span-1 bg-gray-200" readOnly value="1" />

                                <Label className="col-span-2">Qt Parcela</Label>
                                <Txt className="col-span-1 bg-gray-200" readOnly value="1" />

                                <Label className="col-span-2">Valor a Pagar</Label>
                                <Txt
                                    className="col-span-1 bg-gray-200"
                                    readOnly
                                    value={dados.vencSemDescValor}
                                />
                            </div>

                            {/* Categoria / Subcategoria */}
                            <div className="grid grid-cols-12 gap-2 mb-2">
                                <Label className="col-span-2">DT Vencto</Label>
                                <Txt type="date" className="col-span-3" />

                                <Label className="col-span-2">Categoria</Label>
                                <Sel className="col-span-2">
                                    <option>IMPOSTOS / TAXAS</option>
                                </Sel>

                                <Label className="col-span-2">Subcategoria</Label>
                                <Sel className="col-span-3">
                                    <option>MULTAS</option>
                                </Sel>
                            </div>

                            {/* Observação */}
                            <div className="grid grid-cols-12 gap-2 mb-2">
                                <Label className="col-span-2">Observação</Label>
                                <Txt className="col-span-10" />
                            </div>
                        </fieldset>

                        {/* Rodapé modal */}
                        <div className="flex justify-center gap-6 mt-3">
                            <button
                                className="text-red-700 flex items-center gap-1"
                                onClick={() => setModalCP(false)}
                            >
                                <XCircle size={20} />
                                Fechar
                            </button>

                            <button
                                className="text-green-700 flex items-center gap-1"
                                onClick={() => {
                                    setModalCP(false);
                                    setModalMsg(true);
                                }}
                            >
                                <FileText size={20} />
                                Gerar CP
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Sucesso */}
            {modalMsg && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 shadow-lg rounded border text-center w-[300px]">
                        <p className="text-green-700 font-bold mb-4">
                            Título gerado com sucesso!
                        </p>
                        <button
                            className="px-3 py-1 bg-red-700 text-white rounded"
                            onClick={() => setModalMsg(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
