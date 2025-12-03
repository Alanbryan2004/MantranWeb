// src/pages/ImportacaoShopee.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    XCircle,
    FileSpreadsheet,
    FolderOpen,
} from "lucide-react";
import { useIconColor } from "../context/IconColorContext";

/* ================= Helpers ================= */

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

/* ============ Modal Mensagem (Sim / Não ou OK) ============ */

function MessageBox({ open, title, message, showCancel = true, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
            <div className="bg-white rounded-md shadow-lg border border-gray-300 w-[380px]">
                <div className="border-b border-gray-300 px-3 py-2 bg-gray-100">
                    <span className="text-[13px] font-semibold text-gray-800">
                        {title || "Mensagem"}
                    </span>
                </div>
                <div className="px-4 py-3 text-[13px] whitespace-pre-line">
                    {message}
                </div>
                <div className="border-t border-gray-200 px-3 py-2 flex justify-end gap-2">
                    {showCancel && (
                        <button
                            className="px-3 py-1 text-[12px] rounded border border-gray-300 bg-gray-100 hover:bg-gray-200"
                            onClick={onCancel}
                        >
                            Não
                        </button>
                    )}
                    <button
                        className="px-3 py-1 text-[12px] rounded border border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                        onClick={onConfirm}
                    >
                        {showCancel ? "Sim" : "OK"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ================= Mocks ================= */

// mocks de tomador/recebedor a partir do CNPJ
const mockParticipantes = {
    "42446277009653": {
        razao: "SHPX LOGISTICA LTDA.",
        cidade: "CAMPO GRANDE",
        uf: "MS",
    },
    "40418328000147": {
        razao: "A A TRANSPORTES",
        cidade: "NAVIRAI",
        uf: "MS",
    },
};

export default function ImportacaoShopee({ open }) {
    const navigate = useNavigate();
    const { footerIconColorNormal, footerIconColorHover } = useIconColor();
    const fileInputRef = useRef(null);

    /* ===== Card 1 – Dados ===== */
    const [processo, setProcesso] = useState("Line Haul XPT");
    const [tipo, setTipo] = useState("Pré Fatura");

    const [gerarViagem, setGerarViagem] = useState(false);
    const [devolucao, setDevolucao] = useState(false);
    const [manifesto, setManifesto] = useState(false);
    const [cteComplementar, setCteComplementar] = useState(false);

    const [diretorio, setDiretorio] = useState("");
    const [arquivoSelecionado, setArquivoSelecionado] = useState(null);

    const [tomador, setTomador] = useState({
        cnpj: "",
        razao: "",
        cidade: "",
        uf: "",
    });

    const [recebedor, setRecebedor] = useState({
        cnpj: "",
        razao: "",
        cidade: "",
        uf: "",
    });

    /* ===== Card 2 – Importação / Progresso ===== */

    const [totalLinhas, setTotalLinhas] = useState(0);
    const [progress, setProgress] = useState(0);
    const [importando, setImportando] = useState(false);
    const [statusImportacao, setStatusImportacao] = useState(
        "Aguardando seleção de arquivo..."
    );

    /* ===== Modal de mensagem ===== */

    const [msgConfig, setMsgConfig] = useState({
        open: false,
        title: "",
        message: "",
        showCancel: true,
        onConfirm: () => { },
        onCancel: () => { },
    });

    const abrirMensagem = (cfg) => {
        setMsgConfig({
            open: true,
            title: cfg.title || "Mensagem",
            message: cfg.message || "",
            showCancel: cfg.showCancel ?? true,
            onConfirm: () => {
                setMsgConfig((prev) => ({ ...prev, open: false }));
                cfg.onConfirm && cfg.onConfirm();
            },
            onCancel: () => {
                setMsgConfig((prev) => ({ ...prev, open: false }));
                cfg.onCancel && cfg.onCancel();
            },
        });
    };

    /* ===== Funções auxiliares ===== */

    const preencherParticipante = (cnpj, setFn) => {
        const limpo = cnpj.replace(/\D/g, "");
        const dados = mockParticipantes[limpo];
        if (dados) {
            setFn({
                cnpj: limpo,
                razao: dados.razao,
                cidade: dados.cidade,
                uf: dados.uf,
            });
        } else {
            setFn({
                cnpj: limpo,
                razao: "",
                cidade: "",
                uf: "",
            });
        }
    };

    const handleTomadorCnpjBlur = () => {
        preencherParticipante(tomador.cnpj, setTomador);
    };

    const handleRecebedorCnpjBlur = () => {
        preencherParticipante(recebedor.cnpj, setRecebedor);
    };

    const dispararSelecaoArquivo = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleArquivoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setArquivoSelecionado(file);
        setDiretorio(file.name);

        // Simula quantidade de linhas com base no tamanho do arquivo
        const linhasEstimadas = Math.max(10, Math.min(2000, Math.floor(file.size / 500)));

        setTotalLinhas(linhasEstimadas);
        setProgress(0);
        setStatusImportacao("Arquivo selecionado. Aguardando confirmação para importar.");

        abrirMensagem({
            title: "Confirmação de Importação",
            message:
                `Foi encontrado um total estimado de ${linhasEstimadas} linhas na planilha selecionada.\n\n` +
                `Deseja iniciar a importação?`,
            showCancel: true,
            onConfirm: () => iniciarImportacao(linhasEstimadas),
            onCancel: () => {
                setArquivoSelecionado(null);
                setDiretorio("");
                setTotalLinhas(0);
                setStatusImportacao("Importação cancelada pelo usuário.");
                if (fileInputRef.current) fileInputRef.current.value = "";
            },
        });
    };

    const iniciarImportacao = (linhas) => {
        if (!arquivoSelecionado) {
            abrirMensagem({
                title: "Atenção",
                message: "Nenhum arquivo foi selecionado.",
                showCancel: false,
            });
            return;
        }

        setTotalLinhas(linhas);
        setProgress(0);
        setImportando(true);
        setStatusImportacao("Importação iniciada...");
    };

    // Simula a subida da barra de progresso
    useEffect(() => {
        if (!importando) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const prox = prev + 8; // sobe devagar
                if (prox >= 100) {
                    clearInterval(interval);
                    setImportando(false);
                    setStatusImportacao("Importação concluída com sucesso!");

                    abrirMensagem({
                        title: "Importação Finalizada",
                        message: `Importação concluída com sucesso!\n\nTotal de ${totalLinhas} linhas importadas.`,
                        showCancel: false,
                        onConfirm: () => { },
                    });

                    return 100;
                }
                return prox;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [importando, totalLinhas]);

    const handleFechar = () => {
        navigate(-1);
    };

    const handleExcel = () => {
        // apenas mock – aqui você pode futuramente baixar o modelo de planilha
        abrirMensagem({
            title: "Excel",
            message:
                "Aqui será chamada a geração / download do modelo de planilha Shopee (mock).",
            showCancel: false,
        });
    };

    return (
        <div
            className={`transition-all duration-300 mt-[44px] text-[13px] text-gray-700 bg-gray-50
      h-[calc(100vh-56px)] flex flex-col
      ${open ? "ml-[192px]" : "ml-[56px]"}`}
        >
            {/* TÍTULO */}
            <h1 className="text-center text-red-700 font-semibold py-1 text-sm border-b border-gray-300">
                IMPORTAÇÃO DE PLANILHA SHOPEE
            </h1>

            {/* CONTEÚDO */}
            <div className="flex-1 p-3 overflow-y-auto bg-white border-x border-b border-gray-300 rounded-b-md flex flex-col gap-3">
                {/* CARD 1 - Selecione o arquivo */}
                <fieldset className="border border-gray-300 rounded p-3 bg-white">
                    <legend className="px-2 text-red-700 font-semibold text-[13px]">
                        Selecione o arquivo
                    </legend>

                    <div className="space-y-2">
                        {/* Linha 1 - Processo / Tipo */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-1">Processo</Label>
                            <Sel
                                className="col-span-3"
                                value={processo}
                                onChange={(e) => setProcesso(e.target.value)}
                            >
                                <option>Line Haul XPT</option>
                                <option>Last Mile XPT</option>
                            </Sel>

                            <Label className="col-span-1 justify-end">Tipo</Label>
                            <Sel
                                className="col-span-3"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option>Plano de Carregamento</option>
                                <option>Pré Fatura</option>
                            </Sel>
                        </div>

                        {/* Linha 2 - Flags */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-12 flex gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={gerarViagem}
                                        onChange={(e) => setGerarViagem(e.target.checked)}
                                    />
                                    Gerar Viagem
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={devolucao}
                                        onChange={(e) => setDevolucao(e.target.checked)}
                                    />
                                    Devolução
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={manifesto}
                                        onChange={(e) => setManifesto(e.target.checked)}
                                    />
                                    Manifesto
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={cteComplementar}
                                        onChange={(e) => setCteComplementar(e.target.checked)}
                                    />
                                    CTe Complementar
                                </label>
                            </div>
                        </div>

                        {/* Linha 3 - Diretório + pasta */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-1">Diretório</Label>
                            <Txt
                                className="col-span-10 bg-gray-200"
                                readOnly
                                value={diretorio}
                                placeholder="Selecione o arquivo .xlsx..."
                            />
                            <div className="col-span-1 flex items-center">
                                <button
                                    type="button"
                                    onClick={dispararSelecaoArquivo}
                                    className="w-full h-[26px] flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                                    title="Selecionar arquivo"
                                >
                                    <FolderOpen size={18} />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".xlsx"
                                    className="hidden"
                                    onChange={handleArquivoChange}
                                />
                            </div>
                        </div>

                        {/* Linha 4 - Tomador */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-2">CPF/CNPJ Tomador</Label>
                            <Txt
                                className="col-span-2"
                                value={tomador.cnpj}
                                onChange={(e) =>
                                    setTomador((prev) => ({ ...prev, cnpj: e.target.value }))
                                }
                                onBlur={handleTomadorCnpjBlur}
                            />
                            <Txt
                                className="col-span-4 bg-gray-200"
                                readOnly
                                value={tomador.razao}
                            />
                            <Txt
                                className="col-span-3 bg-gray-200"
                                readOnly
                                value={tomador.cidade}
                            />
                            <Txt
                                className="col-span-1 bg-gray-200 text-center"
                                readOnly
                                value={tomador.uf}
                            />
                        </div>

                        {/* Linha 5 - Recebedor */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-2">CPF/CNPJ Recebedor</Label>
                            <Txt
                                className="col-span-2"
                                value={recebedor.cnpj}
                                onChange={(e) =>
                                    setRecebedor((prev) => ({ ...prev, cnpj: e.target.value }))
                                }
                                onBlur={handleRecebedorCnpjBlur}
                            />
                            <Txt
                                className="col-span-4 bg-gray-200"
                                readOnly
                                value={recebedor.razao}
                            />
                            <Txt
                                className="col-span-3 bg-gray-200"
                                readOnly
                                value={recebedor.cidade}
                            />
                            <Txt
                                className="col-span-1 bg-gray-200 text-center"
                                readOnly
                                value={recebedor.uf}
                            />
                        </div>
                    </div>
                </fieldset>

                {/* CARD 2 – Barra de Progresso */}
                <fieldset className="border border-gray-300 rounded p-3 bg-white">
                    <legend className="px-2 text-red-700 font-semibold text-[13px]">
                        Importação
                    </legend>

                    <div className="space-y-2">
                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-2">Status</Label>
                            <div className="col-span-10 text-[12px] text-gray-700">
                                {statusImportacao}
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                            <Label className="col-span-2">Progresso</Label>
                            <div className="col-span-10">
                                <div className="w-full h-4 border border-gray-300 rounded bg-gray-100 overflow-hidden">
                                    <div
                                        className="h-full bg-green-600 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="text-[11px] mt-1 text-right text-gray-700">
                                    {progress.toFixed(0)}%{" "}
                                    {totalLinhas > 0 && `- ${totalLinhas} linhas`}
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>

            {/* RODAPÉ */}
            <div className="border-t border-gray-300 bg-white py-2 px-4 flex items-center gap-6">
                {/* FECHAR */}
                <button
                    onClick={handleFechar}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <XCircle size={20} />
                    <span>Fechar</span>
                </button>

                {/* EXCEL */}
                <button
                    onClick={handleExcel}
                    className={`flex flex-col items-center text-[11px] ${footerIconColorNormal} hover:${footerIconColorHover}`}
                >
                    <FileSpreadsheet size={20} />
                    <span>Excel</span>
                </button>
            </div>

            {/* Modal de mensagem */}
            <MessageBox
                open={msgConfig.open}
                title={msgConfig.title}
                message={msgConfig.message}
                showCancel={msgConfig.showCancel}
                onConfirm={msgConfig.onConfirm}
                onCancel={msgConfig.onCancel}
            />
        </div>
    );
}
