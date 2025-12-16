import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    XCircle,
    RotateCcw,
    Search,
    FileSpreadsheet,
} from "lucide-react";

import { useIconColor } from "../context/IconColorContext";

/* ======================
   COMPONENTES PADRÃO
====================== */
function Label({ children, className = "" }) {
    return (
        <label
            className={`text-[12px] text-gray-600 flex items-center justify-end ${className}`}
        >
            {children}
        </label>
    );
}

function Txt({ className = "", readOnly = false, ...props }) {
    return (
        <input
            {...props}
            readOnly={readOnly}
            className={`
        border border-gray-300 rounded
        px-2 py-[2px] h-[26px] text-[13px]
        ${readOnly ? "bg-gray-200 text-gray-600" : "bg-white"}
        ${className}
      `}
        />
    );
}

function Sel({ children, className = "", ...rest }) {
    return (
        <select
            {...rest}
            className={`
        border border-gray-300 rounded
        px-2 py-[2px] h-[26px] text-[13px] bg-white w-full
        ${className}
      `}
        >
            {children}
        </select>
    );
}

/* ======================
   TELA PRINCIPAL
====================== */
export default function RelConhecimento() {
    const navigate = useNavigate();
    const {
        footerIconColorNormal,
        footerIconColorHover,
    } = useIconColor();

    const [dados, setDados] = useState({
        empresa: "001",
        filial: "001",
        grupoEconomico: "01",
        statusCte: "1",
        tipoData: "1",
        modeloRelatorio: "1",
        clienteCodigo: "5022101900136",
        clienteNome: "HNK-ITU (1) MATRIZ",
        remetenteCodigo: "5022101900136",
        remetenteNome: "HNK-ITU (1) MATRIZ",
        destinatarioCodigo: "5022101900136",
        destinatarioNome: "HNK-ITU (1) MATRIZ",
        cidadeDestino: "1310000",
        cidadeNome: "CAMPINAS",
        ufDestino: "SP",
        dataIni: "2025-12-01",
        dataFim: "2025-12-16",
    });

    const handleChange = (campo) => (e) =>
        setDados({ ...dados, [campo]: e.target.value });

    const handleLimpar = () => {
        setDados({
            ...dados,
            clienteCodigo: "",
            clienteNome: "",
            remetenteCodigo: "",
            remetenteNome: "",
            destinatarioCodigo: "",
            destinatarioNome: "",
            cidadeDestino: "",
            cidadeNome: "",
            ufDestino: "",
            dataIni: "",
            dataFim: "",
        });
    };

    return (
        <div className="flex flex-col h-full p-4 gap-3">
            {/* ======================
          CARD FILTROS
      ====================== */}
            <fieldset className="border border-gray-300 rounded p-3 bg-white">
                <legend className="px-2 text-red-700 font-semibold text-[13px]">
                    Relatório de Conhecimentos
                </legend>

                <div className="space-y-2">
                    {/* LINHA 1 */}
                    <div className="grid grid-cols-12 gap-2">
                        <Label className="col-span-1">Empresa</Label>
                        <Sel
                            className="col-span-5"
                            value={dados.empresa}
                            onChange={handleChange("empresa")}
                        >
                            <option value="001">001 - MANTRAN TRANSPORTES LTDA</option>
                        </Sel>

                        <Label className="col-span-1">Cliente</Label>
                        <Txt className="col-span-2" value={dados.clienteCodigo} />
                        <Txt
                            className="col-span-3"
                            value={dados.clienteNome}
                            readOnly
                        />
                    </div>

                    {/* LINHA 2 */}
                    <div className="grid grid-cols-12 gap-2">
                        <Label className="col-span-1">Filial</Label>
                        <Sel
                            className="col-span-5"
                            value={dados.filial}
                            onChange={handleChange("filial")}
                        >
                            <option value="001">001 - TESTE MANTRAN</option>
                        </Sel>

                        <Label className="col-span-1">Remetente</Label>
                        <Txt className="col-span-2" value={dados.remetenteCodigo} />
                        <Txt
                            className="col-span-3"
                            value={dados.remetenteNome}
                            readOnly
                        />
                    </div>

                    {/* LINHA 3 */}
                    <div className="grid grid-cols-12 gap-2">
                        <Label className="col-span-1">Grupo Econ.</Label>
                        <Txt className="col-span-5" value="01 - HEINEKEN" readOnly />

                        <Label className="col-span-1">Destinatário</Label>
                        <Txt className="col-span-2" value={dados.destinatarioCodigo} />
                        <Txt
                            className="col-span-3"
                            value={dados.destinatarioNome}
                            readOnly
                        />
                    </div>

                    {/* LINHA 4 */}
                    <div className="grid grid-cols-12 gap-2">
                        <Label className="col-span-1">Status CT-e</Label>
                        <Sel
                            className="col-span-2"
                            value={dados.statusCte}
                            onChange={handleChange("statusCte")}
                        >
                            <option value="1">1 - Impresso</option>
                            <option value="2">2 - Autorizado</option>
                            <option value="3">3 - Cancelado</option>
                        </Sel>

                        <Label className="col-span-1">Tipo Data</Label>
                        <Sel
                            className="col-span-2"
                            value={dados.tipoData}
                            onChange={handleChange("tipoData")}
                        >
                            <option value="1">1 - Data Emissão</option>
                            <option value="2">2 - Data Autorização</option>
                        </Sel>

                        <Label className="col-span-1">Cidade Dest</Label>
                        <Txt className="col-span-2" value={dados.cidadeDestino} />
                        <Txt className="col-span-2" value={dados.cidadeNome} readOnly />
                        <Txt className="col-span-1" value={dados.ufDestino} readOnly />
                    </div>

                    {/* LINHA 5 */}
                    <div className="grid grid-cols-12 gap-2">
                        <Label className="col-span-1">Modelo Rel.</Label>
                        <Sel
                            className="col-span-5"
                            value={dados.modeloRelatorio}
                            onChange={handleChange("modeloRelatorio")}
                        >
                            <option value="1">1 - Conhecimentos Emitidos</option>
                        </Sel>

                        <Label className="col-span-1">Período</Label>
                        <Txt
                            type="date"
                            className="col-span-2"
                            value={dados.dataIni}
                            onChange={handleChange("dataIni")}
                        />
                        <Label className="col-span-1 text-center">Até</Label>
                        <Txt
                            type="date"
                            className="col-span-2"
                            value={dados.dataFim}
                            onChange={handleChange("dataFim")}
                        />
                    </div>
                </div>
            </fieldset>

            {/* ======================
          RODAPÉ
      ====================== */}
            <div className="mt-auto border-t pt-2 flex justify-end gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1"
                    style={{ color: footerIconColorNormal }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color = footerIconColorHover)
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color = footerIconColorNormal)
                    }
                >
                    <XCircle size={18} /> Fechar
                </button>

                <button
                    onClick={handleLimpar}
                    className="flex items-center gap-1"
                    style={{ color: footerIconColorNormal }}
                >
                    <RotateCcw size={18} /> Limpar
                </button>

                <button
                    className="flex items-center gap-1"
                    style={{ color: footerIconColorNormal }}
                >
                    <Search size={18} /> Gerar
                </button>

                <button
                    className="flex items-center gap-1"
                    style={{ color: footerIconColorNormal }}
                >
                    <FileSpreadsheet size={18} /> Exportar
                </button>
            </div>
        </div>
    );
}
