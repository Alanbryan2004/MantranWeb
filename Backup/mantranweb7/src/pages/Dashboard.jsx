import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { XCircle } from "lucide-react";

// 🎨 Cores padronizadas
// Verde = Encerrada / Autorizados / Entrega Realizada
// Azul = Em Andamento / Rejeições / Com Ocorrência
// Vermelho = Não Iniciado / Cancelados / Recusada
const cores = {
  verde: "#4ade80",
  azul: "#60a5fa",
  vermelho: "#f87171",
};

export default function Dashboard({ onClose }) {
  const [naoExibir, setNaoExibir] = useState(false);

  // 📊 Dados de exemplo
  const dadosColetasDia = [
    { name: "Não Iniciado", value: 5, color: cores.vermelho },
    { name: "Em Andamento", value: 8, color: cores.azul },
    { name: "Encerrada", value: 12, color: cores.verde },
  ];

  const dadosColetasMes = [
    { name: "Não Iniciado", value: 15, color: cores.vermelho },
    { name: "Em Andamento", value: 25, color: cores.azul },
    { name: "Encerrada", value: 60, color: cores.verde },
  ];

  const dadosViagens = [
    { name: "Não Iniciada", value: 8, color: cores.vermelho },
    { name: "Em Andamento", value: 14, color: cores.azul },
    { name: "Encerrada", value: 28, color: cores.verde },
  ];

  const dadosCteDia = [
    { name: "Autorizados", value: 15, color: cores.verde },
    { name: "Cancelados", value: 1, color: cores.vermelho },
    { name: "Rejeições", value: 0, color: cores.azul },
  ];

  const dadosCteMes = [
    { name: "Autorizados", value: 120, color: cores.verde },
    { name: "Cancelados", value: 5, color: cores.vermelho },
    { name: "Rejeições", value: 3, color: cores.azul },
  ];

  const dadosOcorrencias = [
    { name: "Entrega Realizada", value: 80, color: cores.verde },
    { name: "Recusada", value: 12, color: cores.vermelho },
    { name: "Com Ocorrência", value: 8, color: cores.azul },
  ];

  // 🔢 Cálculos auxiliares
  const total = (dados) => dados.reduce((acc, cur) => acc + cur.value, 0);
  const addPercentuais = (dados) => {
    const t = total(dados);
    return dados.map((d) => ({
      ...d,
      percent: ((d.value / t) * 100).toFixed(1),
    }));
  };

  // 🧩 Renderizador dos gráficos
  const renderGrafico = (titulo, dados) => {
    const dadosComPercent = addPercentuais(dados);
    const totalGeral = total(dados);

    return (
      <div className="bg-white border border-gray-300 rounded shadow-sm p-3 flex flex-col items-center justify-center">
        <h2 className="text-[13px] font-semibold text-red-700 mb-2">{titulo}</h2>

        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={dadosComPercent}
              cx="50%"
              cy="50%"
              outerRadius={60}
              dataKey="value"
              labelLine={false}
            >
              {dadosComPercent.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value} (${props.payload.percent}%)`,
                name,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              formatter={(value) => {
                const item = dadosComPercent.find((d) => d.name === value);
                return `${value} (${item.value})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-2 text-[13px] font-semibold text-gray-700">
          Total Geral:{" "}
          <span className="text-red-700 font-bold">{totalGeral}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-50 w-[1100px] rounded shadow-lg border border-gray-300 flex flex-col">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-gradient-to-r from-red-700 to-black text-white px-4 py-2 rounded-t">
          <h1 className="text-sm font-semibold">DASHBOARD - VISÃO GERAL</h1>
          <div className="flex items-center gap-4">
            <label className="flex items-center text-[12px]">
              <input
                type="checkbox"
                className="mr-1"
                checked={naoExibir}
                onChange={(e) => setNaoExibir(e.target.checked)}
              />
              Não exibir novamente
            </label>
            <button
              title="Fechar Tela"
              onClick={onClose}
              className="flex items-center gap-1 hover:text-gray-200"
            >
              <XCircle size={18} />
              <span className="text-[13px]">Fechar</span>
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-[80vh]">
          {/* Linha 1 */}
          {renderGrafico("Coletas do Dia", dadosColetasDia)}
          {renderGrafico("Coletas do Mês", dadosColetasMes)}
          {renderGrafico("Viagens", dadosViagens)}

          {/* Linha 2 */}
          {renderGrafico("CT-e do Dia", dadosCteDia)}
          {renderGrafico("CT-e do Mês", dadosCteMes)}
          {renderGrafico("CT-e por Ocorrência", dadosOcorrencias)}
        </div>
      </div>
    </div>
  );
}
