// src/pages/Relatorios/Operacao/RelMinuta.jsx
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DocumentoBase from "../base/DocumentoBase";

/* =========================================================
   Helpers
========================================================= */
const onlyDigits = (s) => (s || "").replace(/\D/g, "");

const formatCNPJ = (cnpj) => {
    const d = onlyDigits(cnpj);
    if (d.length !== 14) return cnpj || "";
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(
        8,
        12
    )}-${d.slice(12, 14)}`;
};

const n2 = (v) =>
    Number(v || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 });

function getDefaultTemplateId() {
    return "padrao";
}

/* =========================================================
   MOCK (troca por API depois)
========================================================= */
function mockMinuta(numero = "15284") {
    return {
        templateId: "padrao",

        topo: {
            filialNome: "W L S BARROS - RECIFE",
            filialEndereco: "R ITAMARACA, 335 - IMBIRIBEIRA - RECIFE - PE",
            filialExtra: "()",
        },

        minuta: {
            dataCadastro: "27/01/2026",
            numero,
        },

        cliente: {
            cnpj: "35912495000100",
            razao: "RODONAVES TRANSPORTES MULTIMODAL LTDA",
            endereco: "AV ALEXANDRE COLARES",
            numero: "500",
            bairro: "VILA JAGUARA",
            cidade: "SAO PAULO",
            uf: "SP",
        },

        remetente: {
            cnpj: "80078934000185",
            razao: "BISCOM BRASIL EXP E INP DE ACESSORIOS",
            endereco: "RUA AFONSO MEISTER",
            numero: "352",
            bairro: "GLORIA",
            cidade: "JOINVILLE",
            uf: "SC",
        },

        destinatario: {
            cnpj: "06626253063315",
            razao: "EMPREENDIMENTOS PAGUE MENOS SA",
            endereco: "RUA RIACHAO",
            numero: "807",
            bairro: "MURIBECA",
            cidade: "JABOATAO DOS GUARARA",
            uf: "PE",

            // bloco da direita (sem labels, como no PDF)
            contatoNome: "DANILO GONCALVES DE MELO",
            contatoEndereco: "RUA GARULHOS",
            contatoNumero: "121",
            contatoBairro: "CENTRO",
            contatoCidade: "JABOATAO DOS GUAR",
            contatoUf: "PE",
        },

        motoristaVeiculo: {
            motorista: "MARIA DO SOCORRO GOMES BARROS",
            veiculo: "NXW855",
            isento: "ISENTO",
        },

        notaFiscal: {
            numero: "00038566",
            emissao: "27/01/2026",
            qtdeVol: "1",
            pesoNF: "0,84",
            cubagem: "0,00",
            valorNF: "282,29",
        },

        valores: {
            cat: "0,00",
            despacho: "0,00",
            pedagio: "0,00",
            fretePeso: "400,00",
            freteValor: "0,00",
            coletaEntrega: "0,00",
            outros: "0,00",
            total: "400,00",
        },

        observacao: "DEDICADO",

        aviso:
            "Após a conferência física e protocolo de recebimento, a transportadora não se responsabiliza por quaisquer danos, falta e/ou, avarias que porventura virem a ocorrer nas mercadorias entregues.\nPara sua segurança acompanhe o recebimento e conferencia.",
    };
}

/* =========================================================
   PÁGINA
========================================================= */
export default function RelMinuta() {
    const navigate = useNavigate();
    const location = useLocation();

    const numeroMinuta = location?.state?.numeroMinuta || "15284";
    const templateId = location?.state?.templateId || getDefaultTemplateId();
    const logo = localStorage.getItem("param_logoBg") || "";

    const doc = useMemo(() => {
        const d = mockMinuta(numeroMinuta);
        return { ...d, templateId };
    }, [numeroMinuta, templateId]);

    /* =========================================================
       +Campos (catálogo por zona)
    ========================================================= */
    const fieldsCatalog = useMemo(() => {
        return [
            // TOPO
            { id: "topo_filial_nome", label: "Topo - Filial Nome", group: "Topo" },
            { id: "topo_filial_end", label: "Topo - Filial Endereço", group: "Topo" },
            { id: "topo_filial_extra", label: "Topo - Filial Extra", group: "Topo" },

            // MINUTA
            { id: "minuta_data", label: "Minuta - Data Cadastro", group: "Minuta" },
            { id: "minuta_numero", label: "Minuta - Número", group: "Minuta" },

            // CLIENTE
            { id: "cli_cnpj", label: "Cliente - CNPJ", group: "Cliente" },
            { id: "cli_razao", label: "Cliente - Razão Social", group: "Cliente" },
            { id: "cli_endereco", label: "Cliente - Endereço", group: "Cliente" },
            { id: "cli_bairro", label: "Cliente - Bairro / Cidade/UF", group: "Cliente" },

            // REMETENTE
            { id: "rem_cnpj", label: "Remetente - CNPJ", group: "Remetente" },
            { id: "rem_razao", label: "Remetente - Razão Social", group: "Remetente" },
            { id: "rem_endereco", label: "Remetente - Endereço", group: "Remetente" },
            { id: "rem_bairro", label: "Remetente - Bairro / Cidade/UF", group: "Remetente" },

            // DESTINATÁRIO
            { id: "dst_cnpj", label: "Destinatário - CNPJ", group: "Destinatário" },
            { id: "dst_razao", label: "Destinatário - Razão Social", group: "Destinatário" },
            { id: "dst_endereco", label: "Destinatário - Endereço", group: "Destinatário" },
            { id: "dst_bairro", label: "Destinatário - Bairro / Cidade/UF", group: "Destinatário" },

            { id: "dst_contato_bloco", label: "Destinatário - Bloco (Direita)", group: "Destinatário" },

            // MOTORISTA / VEÍCULO
            { id: "mv_motorista", label: "Motorista - Nome", group: "Motorista/Veículo" },
            { id: "mv_veiculo", label: "Veículo - Placa", group: "Motorista/Veículo" },
            { id: "mv_isento", label: "Veículo - Isento", group: "Motorista/Veículo" },

            // NOTA FISCAL
            { id: "nf_numero", label: "NF - Nº NF", group: "Nota Fiscal" },
            { id: "nf_emissao", label: "NF - Emissão", group: "Nota Fiscal" },
            { id: "nf_vol", label: "NF - Qtde Vol", group: "Nota Fiscal" },
            { id: "nf_peso", label: "NF - Peso NF", group: "Nota Fiscal" },
            { id: "nf_cub", label: "NF - Cubagem", group: "Nota Fiscal" },
            { id: "nf_valor", label: "NF - Valor NF", group: "Nota Fiscal" },

            // VALORES
            { id: "v_cat", label: "Valores - CAT", group: "Valores" },
            { id: "v_despacho", label: "Valores - Despacho", group: "Valores" },
            { id: "v_pedagio", label: "Valores - Valor Pedágio", group: "Valores" },
            { id: "v_frete_peso", label: "Valores - Frete Peso", group: "Valores" },
            { id: "v_frete_valor", label: "Valores - Frete Valor", group: "Valores" },
            { id: "v_coleta", label: "Valores - Coleta / Entrega", group: "Valores" },
            { id: "v_outros", label: "Valores - Outros", group: "Valores" },
            { id: "v_total", label: "Valores - Valor Frete Total", group: "Valores" },

            // OBS / AVISO
            { id: "obs", label: "Observação", group: "Rodapé" },
            { id: "aviso", label: "Aviso (texto)", group: "Rodapé" },
            { id: "receb_ass", label: "Data Recebimento / Ass.", group: "Rodapé" },
        ];
    }, []);

    // ✅ vem tudo marcado por padrão
    const defaultVisibleFieldIds = useMemo(
        () => fieldsCatalog.map((f) => f.id),
        [fieldsCatalog]
    );

    const template = useMemo(() => {
        return {
            fieldsCatalog,
            defaultVisibleFieldIds,
            defaultOptions: { templateVariant: "padrao", copies: 1 },
            pages: [
                {
                    id: "p1",
                    render: ({ data, visibleFieldIds, logo, options }) => (
                        <MinutaTemplateA4
                            data={data}
                            visibleFieldIds={visibleFieldIds}
                            logo={logo}
                            options={options}
                        />
                    ),
                },
            ],
        };
    }, [fieldsCatalog, defaultVisibleFieldIds]);

    return (
        <DocumentoBase
            reportKey={`operacao.minuta.${templateId}`}
            title="MINUTA"
            logo={logo}
            orientation="portrait"
            templateId={templateId}
            template={template}
            data={doc}
            onClose={() => navigate(-1)}
            topOffsetPx={56}
            stickyTopPx={44}
        />
    );
}

/* =========================================================
   TEMPLATE A4
   - 2 vias (meia folha) igual PDF
   - trava altura pra não quebrar nem gerar página extra
========================================================= */
function MinutaTemplateA4({ data, visibleFieldIds, logo, options }) {
    const variant = options?.templateVariant || "padrao";

    const renderVia = (key) => (
        <MinutaVia
            key={key}
            data={data}
            visibleFieldIds={visibleFieldIds}
            logo={logo}
        />
    );

    return (
        <div className="w-full h-full text-[11px] text-black">
            <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { height: auto !important; }
          .no-break { break-inside: avoid; page-break-inside: avoid; }
          .no-page-after { page-break-after: avoid; break-after: avoid; }
        }
      `}</style>

            <div className="absolute left-[40px] top-[38px] right-[40px] bottom-[30px] overflow-hidden no-break no-page-after">
                {variant === "inteiro" ? (
                    <div className="h-full overflow-hidden">{renderVia("via1")}</div>
                ) : (
                    <div className="h-full flex flex-col">
                        {(() => {
                            const usableH = 1046; // mesma conta que usamos no Coleta
                            const cutH = 18;
                            const viaH = Math.floor((usableH - cutH) / 2) - 6;

                            return (
                                <>
                                    <div style={{ height: `${viaH}px` }} className="overflow-hidden">
                                        {renderVia("via1")}
                                    </div>

                                    <div style={{ height: `${cutH}px` }} className="flex items-center">
                                        <div className="w-full border-t border-dashed border-gray-400" />
                                    </div>

                                    <div style={{ height: `${viaH}px` }} className="overflow-hidden">
                                        {renderVia("via2")}
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
}

/* =========================================================
   VIA (meia folha)
========================================================= */
function MinutaVia({ data, visibleFieldIds, logo }) {
    const v = new Set(visibleFieldIds || []);
    const topo = data?.topo || {};
    const min = data?.minuta || {};
    const cli = data?.cliente || {};
    const rem = data?.remetente || {};
    const dst = data?.destinatario || {};
    const mv = data?.motoristaVeiculo || {};
    const nf = data?.notaFiscal || {};
    const val = data?.valores || {};
    const obs = data?.observacao || "";
    const aviso = data?.aviso || "";

    const Label = ({ children, w = 90 }) => (
        <div className="font-bold text-[11px]" style={{ width: `${w}px` }}>
            {children}
        </div>
    );

    const Value = ({ children, className = "" }) => (
        <div className={`font-medium truncate ${className}`}>{children}</div>
    );

    const Row = ({ children, className = "" }) => (
        <div className={`flex items-center gap-3 ${className}`}>{children}</div>
    );

    const Box = ({ children, className = "" }) => (
        <div className={`border border-black rounded-[10px] ${className}`}>
            {children}
        </div>
    );

    const BigBox = ({ children, className = "" }) => (
        <div className={`border border-black rounded-[10px] ${className}`}>
            {children}
        </div>
    );

    const HeaderMini = () => (
        <div className="border-b border-black text-center font-bold text-[14px] py-1 rounded-t-[10px]">
            MINUTA
        </div>
    );

    // tabela de valores
    const ValCol = ({ title, value, big = false, borderL = true }) => (
        <div className={`flex-1 h-full ${borderL ? "border-l border-black" : ""}`}>
            <div className="px-2 pt-2 text-[11px] font-bold">{title}</div>
            <div className={`px-2 pb-2 ${big ? "text-[20px] font-extrabold text-right" : "text-[13px] font-medium text-right"}`}>
                {value}
            </div>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col">
            {/* ===== TOP ===== */}
            <div className="flex items-start justify-between">
                {/* esquerda: reserva logo + textos */}
                <div className="flex items-start gap-3">
                    <div className="w-[120px] h-[40px] flex items-center justify-start overflow-hidden">
                        {logo ? (
                            <img
                                src={logo}
                                alt="Logo"
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : null}
                    </div>

                    <div className="leading-[16px] pt-1">
                        {v.has("topo_filial_nome") && (
                            <div className="font-bold text-[18px]">{topo.filialNome}</div>
                        )}
                        {v.has("topo_filial_end") && (
                            <div className="font-bold text-[13px]">{topo.filialEndereco}</div>
                        )}
                        {v.has("topo_filial_extra") && (
                            <div className="text-[12px]">{topo.filialExtra}</div>
                        )}
                    </div>
                </div>

                {/* direita: box MINUTA */}
                <div className="w-[320px]">
                    <Box>
                        <HeaderMini />
                        <div className="px-4 py-2">
                            <div className="flex justify-between items-center">
                                {v.has("minuta_data") ? (
                                    <div className="font-bold text-[12px]">
                                        Data Cadastro{" "}
                                        <span className="font-medium ml-3">{min.dataCadastro}</span>
                                    </div>
                                ) : (
                                    <div />
                                )}
                            </div>

                            {v.has("minuta_numero") ? (
                                <div className="text-right mt-1">
                                    <span className="font-bold text-[16px]">Nº</span>{" "}
                                    <span className="font-extrabold text-[22px]">
                                        {String(min.numero).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    </Box>
                </div>
            </div>

            {/* ===== CLIENTE / REMETENTE ===== */}
            <BigBox className="mt-3 p-0 overflow-hidden">
                <div className="grid grid-cols-12">
                    {/* CLIENTE */}
                    <div className="col-span-6 p-3">
                        <div className="font-bold text-[13px] mb-1">Cliente:</div>

                        {v.has("cli_cnpj") && (
                            <Row>
                                <Label w={90}>CNPJ</Label>
                                <Value>{onlyDigits(cli.cnpj)}</Value>
                            </Row>
                        )}

                        {v.has("cli_razao") && (
                            <Row>
                                <Label w={90}>Razão Social</Label>
                                <Value>{cli.razao}</Value>
                            </Row>
                        )}

                        {v.has("cli_endereco") && (
                            <Row>
                                <Label w={90}>Endereço</Label>
                                <Value className="flex-1">
                                    {cli.endereco} {cli.numero ? ` ${cli.numero}` : ""}
                                </Value>
                                <div className="font-bold ml-2">Nº</div>
                                <div className="font-medium w-[40px] text-right">
                                    {cli.numero}
                                </div>
                            </Row>
                        )}

                        {v.has("cli_bairro") && (
                            <Row>
                                <Label w={90}>Bairro</Label>
                                <Value className="flex-1">{cli.bairro}</Value>
                                <div className="font-medium w-[160px] text-right">
                                    {cli.cidade} {cli.uf}
                                </div>
                            </Row>
                        )}
                    </div>

                    {/* divisor */}
                    <div className="col-span-1 border-l border-black" />

                    {/* REMETENTE */}
                    <div className="col-span-5 p-3">
                        <div className="font-bold text-[13px] mb-1">Remetente:</div>

                        {v.has("rem_cnpj") && (
                            <Row>
                                <Label w={90}>CNPJ</Label>
                                <Value>{onlyDigits(rem.cnpj)}</Value>
                            </Row>
                        )}

                        {v.has("rem_razao") && (
                            <Row>
                                <Label w={90}>Razão Social</Label>
                                <Value>{rem.razao}</Value>
                            </Row>
                        )}

                        {v.has("rem_endereco") && (
                            <Row>
                                <Label w={90}>Endereço</Label>
                                <Value className="flex-1">
                                    {rem.endereco} {rem.numero ? ` ${rem.numero}` : ""}
                                </Value>
                                <div className="font-bold ml-2">Nº</div>
                                <div className="font-medium w-[40px] text-right">
                                    {rem.numero}
                                </div>
                            </Row>
                        )}

                        {v.has("rem_bairro") && (
                            <Row>
                                <Label w={90}>Bairro</Label>
                                <Value className="flex-1">{rem.bairro}</Value>
                                <div className="font-medium w-[150px] text-right">
                                    {rem.cidade} {rem.uf}
                                </div>
                            </Row>
                        )}
                    </div>
                </div>
            </BigBox>

            {/* ===== DESTINATÁRIO ===== */}
            <BigBox className="mt-3 p-0 overflow-hidden">
                <div className="grid grid-cols-12">
                    {/* esquerda: com labels */}
                    <div className="col-span-7 p-3">
                        <div className="font-bold text-[13px] mb-1">Destinatário:</div>

                        {v.has("dst_cnpj") && (
                            <Row>
                                <Label w={90}>CNPJ</Label>
                                <Value>{onlyDigits(dst.cnpj)}</Value>
                            </Row>
                        )}

                        {v.has("dst_razao") && (
                            <Row>
                                <Label w={90}>Razão Social</Label>
                                <Value>{dst.razao}</Value>
                            </Row>
                        )}

                        {v.has("dst_endereco") && (
                            <Row>
                                <Label w={90}>Endereço</Label>
                                <Value className="flex-1">
                                    {dst.endereco} {dst.numero ? ` ${dst.numero}` : ""}
                                </Value>
                                <div className="font-bold ml-2">Nº</div>
                                <div className="font-medium w-[40px] text-right">
                                    {dst.numero}
                                </div>
                            </Row>
                        )}

                        {v.has("dst_bairro") && (
                            <Row>
                                <Label w={90}>Bairro</Label>
                                <Value className="flex-1">{dst.bairro}</Value>
                                <div className="font-medium w-[170px] text-right">
                                    {dst.cidade} {dst.uf}
                                </div>
                            </Row>
                        )}
                    </div>

                    {/* divisor */}
                    <div className="col-span-1 border-l border-black" />

                    {/* direita: bloco sem labels */}
                    <div className="col-span-4 p-3 flex flex-col justify-center">
                        {v.has("dst_contato_bloco") ? (
                            <div className="leading-[16px] text-right">
                                <div className="font-bold">{dst.contatoNome}</div>
                                <div className="font-medium">
                                    {dst.contatoEndereco}{" "}
                                    <span className="inline-block w-[50px] text-right">
                                        {dst.contatoNumero}
                                    </span>
                                </div>
                                <div className="font-medium">
                                    {dst.contatoBairro}{" "}
                                    <span className="inline-block w-[140px] text-right">
                                        {dst.contatoCidade} {dst.contatoUf}
                                    </span>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </BigBox>

            {/* ===== MOTORISTA / VEÍCULO ===== */}
            <BigBox className="mt-3 px-3 py-2 rounded-[10px]">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="font-bold w-[80px]">Motorista</div>
                        {v.has("mv_motorista") ? (
                            <div className="font-medium truncate">{mv.motorista}</div>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="font-bold">Veículo</div>
                        {v.has("mv_veiculo") ? (
                            <div className="font-medium w-[90px]">{mv.veiculo}</div>
                        ) : null}
                        {v.has("mv_isento") ? (
                            <div className="font-bold">{mv.isento}</div>
                        ) : null}
                    </div>
                </div>
            </BigBox>

            {/* ===== DADOS NOTA FISCAL ===== */}
            <div className="mt-3 text-[12px]">
                <span className="font-bold">Dados Nota Fiscal</span>
            </div>

            <div className="grid grid-cols-12 mt-1 text-[12px]">
                <div className="col-span-2">
                    <div className="font-bold">Nº NF</div>
                    {v.has("nf_numero") ? <div className="font-medium">{nf.numero}</div> : null}
                </div>
                <div className="col-span-2">
                    <div className="font-bold">Emissão</div>
                    {v.has("nf_emissao") ? <div className="font-medium">{nf.emissao}</div> : null}
                </div>
                <div className="col-span-2">
                    <div className="font-bold">Qtde Vol</div>
                    {v.has("nf_vol") ? <div className="font-medium">{nf.qtdeVol}</div> : null}
                </div>
                <div className="col-span-2">
                    <div className="font-bold">Peso NF</div>
                    {v.has("nf_peso") ? <div className="font-medium">{nf.pesoNF}</div> : null}
                </div>
                <div className="col-span-2">
                    <div className="font-bold">Cubagem</div>
                    {v.has("nf_cub") ? <div className="font-medium">{nf.cubagem}</div> : null}
                </div>
                <div className="col-span-2">
                    <div className="font-bold">Valor NF</div>
                    {v.has("nf_valor") ? <div className="font-medium">{nf.valorNF}</div> : null}
                </div>
            </div>

            {/* ===== TABELA VALORES ===== */}
            <div className="mt-4 border border-black rounded-[10px] overflow-hidden">
                <div className="grid grid-cols-8">
                    <div className="col-span-7 grid grid-cols-7">
                        <div className="border-r border-black">
                            <div className="px-2 pt-2 text-[11px] font-bold">CAT</div>
                            <div className="px-2 pb-2 text-right font-medium text-[13px]">
                                {v.has("v_cat") ? val.cat : ""}
                            </div>
                        </div>

                        <div className="border-r border-black">
                            <div className="px-2 pt-2 text-[11px] font-bold">Despacho</div>
                            <div className="px-2 pb-2 text-right font-medium text-[13px]">
                                {v.has("v_despacho") ? val.despacho : ""}
                            </div>
                        </div>

                        <div className="border-r border-black">
                            <div className="px-2 pt-2 text-[11px] font-bold">Valor Pedágio</div>
                            <div className="px-2 pb-2 text-right font-medium text-[13px]">
                                {v.has("v_pedagio") ? val.pedagio : ""}
                            </div>
                        </div>

                        <div className="border-r border-black">
                            <div className="px-2 pt-2 text-[11px] font-bold">Frete Peso</div>
                            <div className="px-2 pb-2 text-right font-medium text-[13px]">
                                {v.has("v_frete_peso") ? val.fretePeso : ""}
                            </div>
                        </div>

                        <div className="border-r border-black">
                            <div className="px-2 pt-2 text-[11px] font-bold">Frete Valor</div>
                            <div className="px-2 pb-2 text-right font-medium text-[13px]">
                                {v.has("v_frete_valor") ? val.freteValor : ""}
                            </div>
                        </div>

                        <div className="border-r border-black">
                            <div className="px-2 pt-2 text-[11px] font-bold">Coleta / Entrega</div>
                            <div className="px-2 pb-2 text-right font-medium text-[13px]">
                                {v.has("v_coleta") ? val.coletaEntrega : ""}
                            </div>
                        </div>

                        <div>
                            <div className="px-2 pt-2 text-[11px] font-bold">Outros</div>
                            <div className="px-2 pb-2 text-right font-medium text-[13px]">
                                {v.has("v_outros") ? val.outros : ""}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 border-l border-black">
                        <div className="px-2 pt-2 text-[11px] font-bold">Valor Frete Total</div>
                        <div className="px-2 pb-2 text-right text-[20px] font-extrabold">
                            {v.has("v_total") ? val.total : ""}
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== OBS ===== */}
            <div className="mt-3 border border-black rounded-[8px] px-3 py-2">
                {v.has("obs") ? (
                    <div className="text-[12px]">
                        <span className="font-bold">Observação:</span>{" "}
                        <span className="font-medium">{obs}</span>
                    </div>
                ) : null}
            </div>

            {/* ===== AVISO + RECEBIMENTO ===== */}
            <div className="mt-3 border border-black rounded-[10px] overflow-hidden flex">
                <div className="w-[44%] p-2 text-[10px] whitespace-pre-wrap leading-[13px]">
                    {v.has("aviso") ? aviso : ""}
                </div>
                <div className="flex-1 border-l border-black p-2">
                    {v.has("receb_ass") ? (
                        <div className="flex items-center gap-6 text-[12px]">
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Data Recebimento:</span>
                                <span className="font-mono">____/____/______</span>
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                                <span className="font-bold">Ass.:</span>
                                <div className="border-b border-black flex-1" />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* trava final pra não “empurrar” e quebrar */}
            <div className="h-[2px]" />
        </div>
    );
}
