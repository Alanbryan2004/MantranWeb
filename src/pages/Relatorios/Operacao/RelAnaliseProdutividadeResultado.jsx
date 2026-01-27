// src/pages/Relatorios/Operacao/RelAnaliseProdutividadeResultado.jsx
import { useLocation } from "react-router-dom";
import RelatorioBase from "../base/RelatorioBase";

/* =========================================================
   HELPERS
========================================================= */
function onlyDigits(s) {
    return String(s || "").replace(/\D/g, "");
}

function brMoney(n) {
    const v = Number(n || 0);
    return v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function parseISO(d) {
    // aceita "aaaa-mm-dd" ou "dd/mm/aaaa"
    if (!d) return null;
    if (String(d).includes("/")) {
        const [dd, mm, aa] = String(d).split("/");
        return new Date(Number(aa), Number(mm) - 1, Number(dd));
    }
    const dt = new Date(d);
    return Number.isNaN(dt.getTime()) ? null : dt;
}

function inRange(dateISO, ini, fim) {
    const d = parseISO(dateISO);
    const a = parseISO(ini);
    const b = parseISO(fim);
    if (!d || !a || !b) return true;
    return d >= a && d <= b;
}

/* =========================================================
   AGRUPAMENTO (Motorista ou Veículo)
   - cria linhas "sintéticas" sem mexer no RelatorioBase
========================================================= */
function buildGroupedRows(items, agruparPor) {
    const byMotorista = String(agruparPor || "2") === "1";

    const sorted = [...items].sort((a, b) => {
        const kA = byMotorista ? String(a.nomeMotorista || "") : String(a.placa || "");
        const kB = byMotorista ? String(b.nomeMotorista || "") : String(b.placa || "");
        const c = kA.localeCompare(kB);
        if (c !== 0) return c;

        const fa = onlyDigits(a.filialCod);
        const fb = onlyDigits(b.filialCod);
        if (fa !== fb) return fa.localeCompare(fb);

        return String(a.nrViagem || a.nrManifesto || "").localeCompare(
            String(b.nrViagem || b.nrManifesto || "")
        );
    });

    const out = [];
    let lastKey = null;

    let sumFrete = 0;
    let sumDesp = 0;
    let sumRes = 0;

    const flushTotal = () => {
        if (!lastKey) return;
        out.push({
            id: `tot_${lastKey}_${out.length}`,
            __type: "total",
            totalFrete: sumFrete,
            totalDesp: sumDesp,
            totalRes: sumRes,
        });
        sumFrete = 0;
        sumDesp = 0;
        sumRes = 0;
    };

    sorted.forEach((r, i) => {
        const groupKey = byMotorista ? String(r.nomeMotorista || "") : `${r.placa || ""} ${r.descVeiculo || ""}`.trim();

        if (groupKey !== lastKey) {
            flushTotal();
            lastKey = groupKey;

            out.push({
                id: `grp_${groupKey}_${i}`,
                __type: "group",
                groupLabel: groupKey,
            });
        }

        const vrFrete = Number(r.vrFrete || 0);
        const vrDesp = Number(r.vrDespesa || 0);
        const vrRes = vrFrete - vrDesp;

        sumFrete += vrFrete;
        sumDesp += vrDesp;
        sumRes += vrRes;

        out.push({
            ...r,
            id: r.id || `r_${i}`,
            resultado: vrRes,
            perc: vrFrete > 0 ? (vrRes / vrFrete) * 100 : 0,
        });
    });

    flushTotal();
    return out;
}

/* =========================================================
   RESULTADO
========================================================= */
export default function RelAnaliseProdutividadeResultado() {
    const logo = localStorage.getItem("param_logoBg") || "";
    const { state } = useLocation();
    const filtros = state?.filtros || {};

    const titulo = "Produção Veículo";
    const periodo = filtros?.dtIni && filtros?.dtFim ? `${filtros.dtIni} a ${filtros.dtFim}` : "";

    /* =========================================================
       1) CATÁLOGO COMPLETO (+Campos)
    ========================================================= */
    const catalogColumns = [
        {
            id: "nr",
            label: "Nº Viag",
            width: 85,
            accessor: (r) => {
                if (r?.__type === "group") return r.groupLabel || "";
                if (r?.__type === "total") return "";
                return filtros?.opcao === "M" ? (r.nrManifesto || "") : (r.nrViagem || "");
            },
        },
        {
            id: "filialPlaca",
            label: "Filial Placa",
            width: 110,
            accessor: (r) => {
                if (r?.__type === "group") return "";
                if (r?.__type === "total") return "TOTAL";
                if (!r?.id) return "";
                return `${String(r.filialCod || "").padStart(3, "0")}  ${r.placa || ""}`;
            },
        },
        {
            id: "tp",
            label: "TP",
            width: 45,
            accessor: (r) => (r?.__type ? "" : (r.tpVeiculo || "")),
            align: "center",
        },
        {
            id: "descVeiculo",
            label: "Descrição Veículo",
            width: 170,
            accessor: (r) => (r?.__type ? "" : (r.descVeiculo || "")),
        },
        {
            id: "nomeMotorista",
            label: "Nome Motorista",
            width: 230,
            accessor: (r) => (r?.__type ? "" : (r.nomeMotorista || "")),
        },
        {
            id: "vrFrete",
            label: "Vr Frete",
            width: 90,
            accessor: (r) => (r?.__type === "total" ? brMoney(r.totalFrete) : r?.__type ? "" : brMoney(r.vrFrete)),
            align: "right",
        },
        {
            id: "vrDespesa",
            label: "Vr Despesa",
            width: 90,
            accessor: (r) => (r?.__type === "total" ? brMoney(r.totalDesp) : r?.__type ? "" : brMoney(r.vrDespesa)),
            align: "right",
        },
        {
            id: "resultado",
            label: "Resultado",
            width: 90,
            accessor: (r) => (r?.__type === "total" ? brMoney(r.totalRes) : r?.__type ? "" : brMoney(r.resultado)),
            align: "right",
        },
        {
            id: "perc",
            label: "Perc.",
            width: 70,
            accessor: (r) => {
                if (r?.__type) return "";
                const p = Number(r.perc || 0);
                return `${p.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%`;
            },
            align: "right",
        },

        // ===== EXTRAS (+Campos) =====
        { id: "empresa", label: "Empresa", accessor: "empresa", width: 140 },
        { id: "dtEmissao", label: "Emissão", accessor: "dtEmissao", width: 95 },
        { id: "km", label: "KM", accessor: "km", width: 70, align: "right" },
        { id: "peso", label: "Peso", accessor: "peso", width: 85, align: "right" },
        { id: "nrManifesto", label: "Manifesto", accessor: "nrManifesto", width: 90 },
        { id: "nrViagem", label: "Viagem", accessor: "nrViagem", width: 90 },
    ];

    /* =========================================================
       2) LAYOUT PADRÃO (igual print)
    ========================================================= */
    const layoutPadrao = [
        "nr",
        "filialPlaca",
        "tp",
        "descVeiculo",
        "nomeMotorista",
        "vrFrete",
        "vrDespesa",
        "resultado",
        "perc",
    ];

    const columns = layoutPadrao.map((id) => catalogColumns.find((c) => c.id === id)).filter(Boolean);

    /* =========================================================
       3) MOCK (substitui depois por WebApi)
    ========================================================= */
    const base = [
        // Motorista 1
        {
            empresa: "DIFALUX",
            filialCod: "003",
            filialNome: "FILIAL 03",
            dtEmissao: "2026-01-05",
            nrViagem: "079377",
            nrManifesto: "M-12001",
            placa: "FFG-0326",
            tpVeiculo: "F",
            descVeiculo: "TRUCK",
            nomeMotorista: "ADENILSON SOUZA SILVA",
            vrFrete: 0,
            vrDespesa: 63.87,
            km: 120,
            peso: 9800,
        },
        {
            empresa: "DIFALUX",
            filialCod: "003",
            filialNome: "FILIAL 03",
            dtEmissao: "2026-01-08",
            nrViagem: "079423",
            nrManifesto: "M-12005",
            placa: "FFG-0326",
            tpVeiculo: "F",
            descVeiculo: "TRUCK",
            nomeMotorista: "ADENILSON SOUZA SILVA",
            vrFrete: 7207.89,
            vrDespesa: 271.68,
            km: 420,
            peso: 11200,
        },

        // Motorista 2
        {
            empresa: "DIFALUX",
            filialCod: "003",
            filialNome: "FILIAL 03",
            dtEmissao: "2026-01-09",
            nrViagem: "079811",
            nrManifesto: "M-12110",
            placa: "CUX-0118",
            tpVeiculo: "F",
            descVeiculo: "FH 460",
            nomeMotorista: "ADRIANO RODRIGUES DO NASCIMENTO",
            vrFrete: 0,
            vrDespesa: 117.80,
            km: 85,
            peso: 3200,
        },
        {
            empresa: "DIFALUX",
            filialCod: "003",
            filialNome: "FILIAL 03",
            dtEmissao: "2026-01-12",
            nrViagem: "079500",
            nrManifesto: "M-12180",
            placa: "CUX-0118",
            tpVeiculo: "F",
            descVeiculo: "FH 460",
            nomeMotorista: "ADRIANO RODRIGUES DO NASCIMENTO",
            vrFrete: 3999.17,
            vrDespesa: 350.64,
            km: 610,
            peso: 15800,
        },

        // Motorista 3
        {
            empresa: "MANTRAN",
            filialCod: "002",
            filialNome: "FILIAL 02",
            dtEmissao: "2026-01-18",
            nrViagem: "078538",
            nrManifesto: "M-99001",
            placa: "GAJ-3H08",
            tpVeiculo: "F",
            descVeiculo: "FIAT DOBLO",
            nomeMotorista: "AFONSO DOS PASSOS JUNIOR",
            vrFrete: 0,
            vrDespesa: 117.80,
            km: 40,
            peso: 300,
        },
    ];

    // multiplica pra dar “cara” de relatório grande
    const rowsMock = Array.from({ length: 6 }).flatMap((_, rep) =>
        base.map((r, idx) => {
            const n = rep * 100 + idx;
            const frete = Number(r.vrFrete || 0) + (rep === 0 ? 0 : (idx % 2 ? 421.74 : 0));
            return {
                ...r,
                id: `${rep}-${idx}-${r.nrViagem || r.nrManifesto}`,
                nrViagem: r.nrViagem ? String(Number(r.nrViagem) + n) : "",
                nrManifesto: r.nrManifesto ? `${r.nrManifesto}-${rep}` : "",
                vrFrete: frete,
            };
        })
    );

    /* =========================================================
       4) APLICA FILTROS
    ========================================================= */
    let filtrados = [...rowsMock];

    // Empresa
    if (String(filtros?.empresa || "TODAS") !== "TODAS") {
        filtrados = filtrados.filter((r) => String(r.empresa) === String(filtros.empresa));
    }

    // Filial
    if (String(filtros?.filial || "999") !== "999") {
        filtrados = filtrados.filter((r) => String(r.filialCod) === String(filtros.filial));
    }

    // Período Emissão
    if (filtros?.dtIni && filtros?.dtFim) {
        filtrados = filtrados.filter((r) => inRange(r.dtEmissao, filtros.dtIni, filtros.dtFim));
    }

    // Veículo
    if (String(filtros?.veiculo || "T") !== "T") {
        filtrados = filtrados.filter((r) => String(r.placa) === String(filtros.veiculo));
    }

    // Rel por Frete Peso (mock): se marcado, ajusta frete proporcional ao peso (só pra simular comportamento)
    if (filtros?.relFretePeso) {
        filtrados = filtrados.map((r) => {
            const peso = Number(r.peso || 0);
            const novoFrete = peso > 0 ? Math.max(0, (peso / 1000) * 120) : Number(r.vrFrete || 0);
            return { ...r, vrFrete: novoFrete };
        });
    }

    // Recalcular valores (mock): aplica um “rebalance” bobo, só pra mostrar que muda
    if (filtros?.recalcularValores) {
        filtrados = filtrados.map((r) => {
            const frete = Number(r.vrFrete || 0);
            const desp = Number(r.vrDespesa || 0);
            return { ...r, vrFrete: frete * 1.02, vrDespesa: desp * 0.98 };
        });
    }

    /* =========================================================
       5) AGRUPA (Motorista ou Veículo)
    ========================================================= */
    const rows = buildGroupedRows(filtrados, filtros?.agruparPor || "2");

    /* =========================================================
       6) TOTAIS GERAIS
    ========================================================= */
    const totals = [{ id: "qtd", label: "Total de Registros", type: "count" }];

    return (
        <RelatorioBase
            reportKey="operacao.analise_produtividade"
            titulo={titulo}
            periodo={periodo ? `Período: ${periodo}` : ""}
            logo={logo}
            orientation="auto"
            columns={columns}
            columnCatalog={catalogColumns}
            rows={rows}
            totals={totals}
            topOffsetPx={56}
        />
    );
}
