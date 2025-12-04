// src/pages/SacNotaFiscal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, XCircle, RotateCcw } from "lucide-react";
import { useIconColor } from "../context/IconColorContext";

/* =============================
   Helpers padrão Mantran
============================= */
function Label({ children, className = "" }) {
    return (
        <label className={`text-[12px] text-gray-700 flex items-center ${className}`}>
            {children}
        </label>
    );
}

function Txt({ className = "", ...rest }) {
    return (
        <input
            {...rest}
            className={`border border-gray-300 rounded px-1 py-[2px] h-[26px] text-[13px] w-full ${className}`}
        />
    );
}

/* =============================
   MOCK de Notas Fiscais
============================= */
const mockNotas = [
    {
        numero: "86744654",
        serie: "DTA",
        emissao: "2025-11-25",
        qtd: 1,
        peso: "1,00",
        valor: "1,00",
        m3: "1,00",
        embalagem: "CAIXA",
        produto: "CAIXA PAPELÃO / DIVERSOS",

        empresa: "001",
        coleta: "264584",
        situacao: "COLETADA",
        dataCTRC: "2025-11-25",
        minuta: "",
        fatura: "",

        ctrc: "123456789",
        cnpjCliente: "50.220.190/0676-2",
        cnpjRemetente: "50.220.190/0676-2",
        cnpjDestinatario: "05.254.957/0073-52",
        cnpjConsignatario: "",
        cnpjRedespacho: "",

        modalidade: "CIF",
        condContrato: "",
        tipoFrete: "FATURADO",

        endereco: "RODOVIA BR101 KM110,8",
        bairro: "NARANDIBA",
        cidadeEntrega: "ALAGOINHAS",
        uf: "BA",
        cidadeOrigem: "PARNAMIRIM",
        observacao: "",

        placa: "XXX0000",
        motorista: "JOÃO DA SILVA",
        ocorrenciaAtual: "COLETADO",

        ocorrencias: [
            {
                data: "2025-11-26",
                hora: "10:20",
                placa: "XXX0000",
                motorista: "JOÃO",
                codigo: "01",
                descricao: "COLETADO",
                manifesto: "123",
                viagem: "456",
            },
        ],
    },

    // Versão duplicada com CNPJ diferente para testar o modal
    {
        numero: "86744654",
        serie: "ABC",
        cnpjRemetente: "11.222.333/0001-55",
        cnpjDestinatario: "98.765.432/0001-11",
        razao: "EMPRESA TESTE LTDA",
    },
];

/* =============================
   Modal de Seleção
============================= */
function ModalSelecaoNF({ lista, onSelect, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[450px] rounded-md shadow-lg border border-gray-300">
                <h2 className="text-center text-red-700 font-semibold py-2 text-sm border-b">
                    Selecionar Nota Fiscal
                </h2>

                <div className="p-3 max-h-[300px] overflow-y-auto">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-1">CNPJ</th>
                                <th className="text-left py-1">Razão Social</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((nf, idx) => (
                                <tr
                                    key={idx}
                                    className="cursor-pointer hover:bg-red-100"
                                    onClick={() => onSelect(nf)}
                                >
                                    <td className="py-1">{nf.cnpjRemetente}</td>
                                    <td className="py-1">{nf.razao || "Remetente"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end px-4 py-2 border-t bg-gray-50">
                    <button
                        className="px-4 py-1 text-[13px] rounded border border-gray-300 hover:bg-gray-100"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

/* =============================
   Tela Principal
============================= */
export default function SacNotaFiscal({ open }) {
    const navigate = useNavigate();
    const { footerIconColorNormal, footerIconColorHover } = useIconColor();

    const [numeroNF, setNumeroNF] = useState("");
    const [dados, setDados] = useState(null);
    const [modalListaNF, setModalListaNF] = useState(null);

    /* =============================
       Função Pesquisar
    ============================= */
    const pesquisar = () => {
        if (!numeroNF.trim()) {
            alert("Informe o número da Nota Fiscal.");
            return;
        }

        const encontrados = mockNotas.filter((n) => n.numero === numeroNF.trim());

        if (encontrados.length === 0) {
            alert("Nenhuma Nota Fiscal encontrada.");
            return;
        }

        if (encontrados.length === 1) {
            // Achou apenas uma, carrega direto
            setDados(encontrados[0]);
            return;
        }

        // Achou várias → exibir modal
        setModalListaNF(encontrados);
    };

    const limpar = () => {
        setNumeroNF("");
        setDados(null);
    };

    const selecionarNF = (nf) => {
        setModalListaNF(null);
        setDados(nf);
    };

    /* =============================
       Render
    ============================= */
    return (
        <div
            className={`transition-all duration-300 mt-[44px] text-[13px]
      h-[calc(100vh-56px)] flex flex-col bg-gray-50 text-gray-700
      ${open ? "ml-[192px]" : "ml-[56px]"}`}
        >
            {/* Título */}
            <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
                SAC – Nota Fiscal
            </h1>

            {/* Conteúdo */}
            <div className="flex-1 p-3 overflow-y-auto bg-white border-x border-b border-gray-300 rounded-b-md space-y-3">

                {/* =============================
           CARD 1 — PARÂMETROS
        ============================= */}
                <fieldset className="border border-gray-300 rounded p-3 bg-white">
                    <legend className="px-2 text-red-700 font-semibold text-[13px]">
                        Parâmetros de Pesquisa
                    </legend>

                    <div className="grid grid-cols-12 gap-2 items-center">
                        <Label className="col-span-2">Número NF</Label>
                        <Txt
                            className="col-span-2"
                            value={numeroNF}
                            onChange={(e) => setNumeroNF(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && pesquisar()}
                        />

                        <button
                            onClick={pesquisar}
                            className="col-span-1 flex items-center justify-center bg-red-700 text-white rounded hover:bg-red-800"
                        >
                            <Search size={18} />
                        </button>
                    </div>
                </fieldset>

                {/* =============================
           CARD 2 — DADOS DA NF
        ============================= */}
                {dados && (
                    <fieldset className="border border-gray-300 rounded p-3 bg-white">
                        <legend className="px-2 text-red-700 font-semibold text-[13px]">
                            Dados da Nota Fiscal
                        </legend>

                        <div className="space-y-2">
                            {/* Linha 1 */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-2">Número NF</Label>
                                <Txt className="col-span-2 bg-gray-200" readOnly value={dados.numero} />

                                <Label className="col-span-1">Série</Label>
                                <Txt className="col-span-1 bg-gray-200" readOnly value={dados.serie} />

                                <Label className="col-span-1">Emissão</Label>
                                <Txt className="col-span-2 bg-gray-200" readOnly value={dados.emissao} />

                                <Label className="col-span-1">Qtd</Label>
                                <Txt className="col-span-1 bg-gray-200" readOnly value={dados.qtd} />

                                <Label className="col-span-1">Peso</Label>
                                <Txt className="col-span-1 bg-gray-200" readOnly value={dados.peso} />
                            </div>

                            {/* Linha 2 */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-1">Valor</Label>
                                <Txt className="col-span-2 bg-gray-200" readOnly value={dados.valor} />

                                <Label className="col-span-1">M³</Label>
                                <Txt className="col-span-1 bg-gray-200" readOnly value={dados.m3} />

                                <Label className="col-span-2">Embalagem</Label>
                                <Txt className="col-span-2 bg-gray-200" readOnly value={dados.embalagem} />

                                <Label className="col-span-1">Produto</Label>
                                <Txt className="col-span-2 bg-gray-200" readOnly value={dados.produto} />
                            </div>

                            {/* Linha 3 */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-1">Empresa</Label>
                                <Txt readOnly className="col-span-1 bg-gray-200" value={dados.empresa} />

                                <Label className="col-span-1">Coleta</Label>
                                <Txt readOnly className="col-span-1 bg-gray-200" value={dados.coleta} />

                                <Label className="col-span-1">Situação</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.situacao} />

                                <Label className="col-span-1">Data CTRC</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.dataCTRC} />

                                <Label className="col-span-1">Minuta</Label>
                                <Txt readOnly className="col-span-1 bg-gray-200" value={dados.minuta} />

                                <Label className="col-span-1">Fatura</Label>
                                <Txt readOnly className="col-span-1 bg-gray-200" value={dados.fatura} />
                            </div>

                            {/* Linha 4 */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-1">CTRC</Label>
                                <button
                                    className="col-span-2 text-blue-600 underline text-left"
                                    onClick={() => alert("Abrir SAC CTRC (futuro)")}
                                >
                                    {dados.ctrc}
                                </button>

                                <Label className="col-span-1">Cliente</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.cnpjCliente} />

                                <Label className="col-span-1">Remetente</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.cnpjRemetente} />

                                <Label className="col-span-1">Destinatário</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.cnpjDestinatario} />
                            </div>

                            {/* Linha 5 */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-2">Consignatário</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.cnpjConsignatario} />

                                <Label className="col-span-1">Redespacho</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.cnpjRedespacho} />

                                <Label className="col-span-1">Modalidade</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.modalidade} />

                                <Label className="col-span-1">Contrato</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.condContrato} />
                            </div>

                            {/* Linha 6 */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-1">Tipo Frete</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.tipoFrete} />

                                <Label className="col-span-1">Endereço</Label>
                                <Txt readOnly className="col-span-5 bg-gray-200" value={dados.endereco} />

                                <Label className="col-span-1">Bairro</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.bairro} />

                            </div>

                            {/* Linha 7 */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-2">Cidade Entrega</Label>
                                <Txt readOnly className="col-span-3 bg-gray-200" value={dados.cidadeEntrega} />

                                <Label className="col-span-1">UF</Label>
                                <Txt readOnly className="col-span-1 bg-gray-200" value={dados.uf} />

                                <Label className="col-span-2">Cidade Origem</Label>
                                <Txt readOnly className="col-span-3 bg-gray-200" value={dados.cidadeOrigem} />
                            </div>

                            {/* Linha 8 - Observação */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-2">Observação</Label>
                                <Txt readOnly className="col-span-10 bg-gray-200" value={dados.observacao} />
                            </div>

                            {/* Linha 9 */}
                            <div className="grid grid-cols-12 gap-2">
                                <Label className="col-span-1">Placa</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.placa} />

                                <Label className="col-span-1">Motorista</Label>
                                <Txt readOnly className="col-span-4 bg-gray-200" value={dados.motorista} />

                                <Label className="col-span-2">Ocorrência Atual</Label>
                                <Txt readOnly className="col-span-2 bg-gray-200" value={dados.ocorrenciaAtual} />
                            </div>
                        </div>
                    </fieldset>
                )}

                {/* =============================
           CARD 3 — GRID OCORRÊNCIAS
        ============================= */}
                {dados && (
                    <fieldset className="border border-gray-300 rounded p-3 bg-white">
                        <legend className="px-2 text-red-700 font-semibold text-[13px]">
                            Ocorrências
                        </legend>

                        <table className="w-full text-[13px] border">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="p-1 text-left">Data</th>
                                    <th className="p-1 text-left">Hora</th>
                                    <th className="p-1 text-left">Placa</th>
                                    <th className="p-1 text-left">Motorista</th>
                                    <th className="p-1 text-left">Código</th>
                                    <th className="p-1 text-left">Descrição</th>
                                    <th className="p-1 text-left">Manifesto</th>
                                    <th className="p-1 text-left">Viagem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados.ocorrencias?.map((o, idx) => (
                                    <tr key={idx} className="border-b">
                                        <td className="p-1">{o.data}</td>
                                        <td className="p-1">{o.hora}</td>
                                        <td className="p-1">{o.placa}</td>
                                        <td className="p-1">{o.motorista}</td>
                                        <td className="p-1">{o.codigo}</td>
                                        <td className="p-1">{o.descricao}</td>
                                        <td className="p-1">{o.manifesto}</td>
                                        <td className="p-1">{o.viagem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </fieldset>
                )}
            </div>

            {/* =============================
         RODAPÉ
      ============================= */}
            <div className="flex justify-end gap-4 px-4 py-2 border-t bg-white">
                <button
                    className={`flex items-center gap-1 px-3 py-1 rounded border border-gray-300 ${footerIconColorNormal} hover:${footerIconColorHover}`}
                    onClick={limpar}
                >
                    <RotateCcw size={16} /> Limpar
                </button>

                <button
                    className={`flex items-center gap-1 px-3 py-1 rounded border border-gray-300 ${footerIconColorNormal} hover:${footerIconColorHover}`}
                    onClick={() => navigate(-1)}
                >
                    <XCircle size={16} /> Fechar
                </button>
            </div>

            {/* Modal de seleção */}
            {modalListaNF && (
                <ModalSelecaoNF
                    lista={modalListaNF}
                    onSelect={selecionarNF}
                    onClose={() => setModalListaNF(null)}
                />
            )}
        </div>
    );
}
