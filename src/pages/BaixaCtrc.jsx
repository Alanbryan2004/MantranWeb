// src/pages/BaixaCtrc.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    XCircle,
    RotateCcw,
    PlusCircle
} from "lucide-react";

import { useIconColor } from "../context/IconColorContext";

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

function Sel({ children, className = "", ...rest }) {
    return (
        <select
            {...rest}
            className={`border border-gray-300 rounded px-1 h-[26px] text-[13px] w-full ${className}`}
        >
            {children}
        </select>
    );
}

export default function BaixaCtrc() {
    const navigate = useNavigate();
    const { footerIconColorNormal, footerIconColorHover } = useIconColor();

    // ==========================
    // FORMATADORES
    // ==========================
    function formatarData(valor) {
        valor = valor.replace(/\D/g, "");

        if (valor.length > 2) valor = valor.replace(/^(\d{2})(\d)/, "$1/$2");
        if (valor.length > 5) valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

        return valor.slice(0, 10);
    }

    function formatarHora(valor) {
        valor = valor.replace(/\D/g, "");

        if (valor.length > 2)
            valor = valor.replace(/^(\d{2})(\d)/, "$1:$2");

        return valor.slice(0, 5);
    }

    function completarHora(valor) {
        valor = valor.replace(/\D/g, "");

        if (valor.length === 1) return `0${valor}:00`;
        if (valor.length === 2) return `${valor}:00`;
        if (valor.length === 3) return `${valor.slice(0, 2)}:${valor.slice(2).padEnd(2, "0")}`;
        if (valor.length === 4) return `${valor.slice(0, 2)}:${valor.slice(2)}`;

        return valor;
    }

    // ==========================
    // MOCK
    // ==========================
    const mock = {
        empresa: "001 - MANTRAN TRANSPORTES LTDA",
        filial: "001 - TESTE MANTRAN",
        ctrc: "",
        ctrcControle: "",
        minuta: "",
        gerarCteCompl: false,
        ocorrencia: "001 - ENTREGA REALIZADA NORMALMENTE",

        dtChegada: "",
        hrChegada: "",
        dtEntrega: "",
        hrEntrega: "",

        dtBaixa: "",
        hrBaixa: "",

        recebidoPor: "",
        rg: ""
    };

    const [dados, setDados] = useState(mock);
    const [modalMsg, setModalMsg] = useState(false);

    // GETDATE AUTOMATICAMENTE
    useEffect(() => {
        const agora = new Date();

        const dia = String(agora.getDate()).padStart(2, "0");
        const mes = String(agora.getMonth() + 1).padStart(2, "0");
        const ano = agora.getFullYear();

        const hh = String(agora.getHours()).padStart(2, "0");
        const mm = String(agora.getMinutes()).padStart(2, "0");

        setDados(prev => ({
            ...prev,
            dtBaixa: `${dia}/${mes}/${ano}`,
            hrBaixa: `${hh}:${mm}`
        }));
    }, []);


    // ==========================
    // FUNÇÕES
    // ==========================
    const limpar = () => setDados(mock);

    const incluir = () => {
        setModalMsg(true);
        limpar();
    };

    return (
        <>
            <div className="w-full h-full flex justify-center mt-6">
                <div className="bg-white w-[1100px] rounded shadow p-4 border border-gray-300">

                    <h2 className="text-center text-red-700 font-bold mb-4 text-[18px]">
                        BAIXAS DE CONHECIMENTO
                    </h2>

                    {/* ==========================
                        CARD 1
                    =========================== */}
                    <fieldset className="border border-gray-300 rounded p-3 mb-4">
                        <legend className="px-2 text-red-700 font-semibold">Parâmetros</legend>

                        {/* Linha 1 */}
                        <div className="grid grid-cols-12 gap-2 mb-2">
                            <Label className="col-span-2">Empresa</Label>
                            <Sel className="col-span-4" value={dados.empresa}>
                                <option>{dados.empresa}</option>
                            </Sel>

                            <Label className="col-span-2">Filial</Label>
                            <Sel className="col-span-4" value={dados.filial}>
                                <option>{dados.filial}</option>
                            </Sel>
                        </div>

                        {/* Linha 2 */}
                        <div className="grid grid-cols-12 gap-2 mb-2">
                            <Label className="col-span-2">N° CTRC</Label>
                            <Txt
                                className="col-span-2"
                                value={dados.ctrc}
                                onChange={e => setDados({ ...dados, ctrc: e.target.value })}
                            />

                            <Label className="col-span-2">N° CTRC Controle</Label>
                            <Txt
                                className="col-span-2"
                                value={dados.ctrcControle}
                                onChange={e => setDados({ ...dados, ctrcControle: e.target.value })}
                            />
                        </div>

                        {/* Linha 3 */}
                        <div className="grid grid-cols-12 gap-2 mb-2">
                            <Label className="col-span-2">N° Minuta</Label>
                            <Txt
                                className="col-span-2"
                                value={dados.minuta}
                                onChange={e => setDados({ ...dados, minuta: e.target.value })}
                            />

                            <div className="col-span-3 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={dados.gerarCteCompl}
                                    onChange={e => setDados({ ...dados, gerarCteCompl: e.target.checked })}
                                    className="h-[16px] w-[16px]"
                                />
                                <Label>Gerar CT-e Complementar</Label>
                            </div>
                        </div>

                        {/* Linha 4 */}
                        <div className="grid grid-cols-12 gap-2 mb-2">
                            <Label className="col-span-2">Ocorrência</Label>
                            <Sel
                                className="col-span-6"
                                value={dados.ocorrencia}
                                onChange={e => setDados({ ...dados, ocorrencia: e.target.value })}
                            >
                                <option>001 - ENTREGA REALIZADA NORMALMENTE</option>
                                <option>002 - RECUSADO</option>
                                <option>003 - ENDEREÇO NÃO LOCALIZADO</option>
                            </Sel>
                        </div>

                        {/* Linha 5 */}
                        <div className="grid grid-cols-12 gap-2 mb-2">
                            <Label className="col-span-2">Data Chegada</Label>
                            <Txt
                                className="col-span-2"
                                placeholder="dd/mm/aaaa"
                                value={dados.dtChegada}
                                onChange={e =>
                                    setDados({ ...dados, dtChegada: formatarData(e.target.value) })
                                }
                            />

                            <Label className="col-span-1">Hora</Label>
                            <Txt
                                className="col-span-2"
                                placeholder="hh:mm"
                                value={dados.hrChegada}
                                onChange={e =>
                                    setDados({ ...dados, hrChegada: formatarHora(e.target.value) })
                                }
                                onBlur={() =>
                                    setDados(prev => ({
                                        ...prev,
                                        hrChegada: completarHora(prev.hrChegada)
                                    }))
                                }
                            />
                        </div>

                        {/* Linha 6 */}
                        <div className="grid grid-cols-12 gap-2 mb-2">
                            <Label className="col-span-2">Data Entrega</Label>
                            <Txt
                                className="col-span-2"
                                placeholder="dd/mm/aaaa"
                                value={dados.dtEntrega}
                                onChange={e =>
                                    setDados({ ...dados, dtEntrega: formatarData(e.target.value) })
                                }
                            />

                            <Label className="col-span-1">Hora</Label>
                            <Txt
                                className="col-span-2"
                                placeholder="hh:mm"
                                value={dados.hrEntrega}
                                onChange={e =>
                                    setDados({ ...dados, hrEntrega: formatarHora(e.target.value) })
                                }
                                onBlur={() =>
                                    setDados(prev => ({
                                        ...prev,
                                        hrEntrega: completarHora(prev.hrEntrega)
                                    }))
                                }
                            />
                        </div>

                        {/* Linha 7 */}
                        <div className="grid grid-cols-12 gap-2 mb-2">
                            <Label className="col-span-2">Data Baixa</Label>
                            <Txt className="col-span-2 bg-gray-200" readOnly value={dados.dtBaixa} />

                            <Label className="col-span-1">Hora Baixa</Label>
                            <Txt className="col-span-2 bg-gray-200" readOnly value={dados.hrBaixa} />
                        </div>

                    </fieldset>

                    {/* ==========================
                        CARD 2
                    =========================== */}
                    <fieldset className="border border-gray-300 rounded p-3 mb-4">
                        <legend className="px-2 text-red-700 font-semibold">Recebimento</legend>

                        {/* Linha 1 */}
                        <div className="grid grid-cols-12 gap-2 mb-2">
                            <Label className="col-span-2">Recebido por</Label>
                            <Txt
                                className="col-span-6"
                                value={dados.recebidoPor}
                                onChange={e => setDados({ ...dados, recebidoPor: e.target.value })}
                            />
                        </div>

                        {/* Linha 2 */}
                        <div className="grid grid-cols-12 gap-2">
                            <Label className="col-span-2">N° RG</Label>
                            <Txt
                                className="col-span-3"
                                value={dados.rg}
                                onChange={e => setDados({ ...dados, rg: e.target.value })}
                            />
                        </div>
                    </fieldset>

                    {/* ==========================
                        RODAPÉ
                    =========================== */}
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

                    </div>

                </div>
            </div>

            {/* ==========================
                MODAL DE SUCESSO
            =========================== */}
            {modalMsg && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 shadow-lg rounded border text-center w-[300px]">
                        <p className="text-green-700 font-bold mb-4">
                            Baixa Realizada Com Sucesso!
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
        </>
    );
}
