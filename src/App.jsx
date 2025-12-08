import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout Operação
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Layout Financeiro
import HeaderFinanceiro from "./components/HeaderFinanceiro";
import SidebarFinanceiro from "./components/SidebarFinanceiro";

// Páginas principais
import Agenda from "./pages/Agenda";
import CTePage from "./pages/CTePage";
import AliquotaICMS from "./pages/AliquotaICMS";
import CFOP from "./pages/CFOP";
import IRRF from "./pages/IRRF";
import ClienteDivisao from "./pages/ClienteDivisao";
import NFSEPage from "./pages/NFSEPage";
import Login from "./components/Login";
import Coleta from "./pages/Coleta";
import Manifesto from "./pages/Manifesto";
import Viagem from "./pages/Viagem";
import Minuta from "./pages/Minuta";
import MotivoColeta from "./pages/MotivoColeta";
import Dashboard from "./pages/Dashboard";
import Parametro from "./pages/Parametro";
import TabelaFrete from "./pages/TabelaFrete";
import NotaFiscalEDI from "./pages/NotaFiscalEDI";
import Cliente from "./pages/Cliente";
import Empresa from "./pages/Empresa";
import EmpresaAgregado from "./pages/EmpresaAgregado";
import Veiculo from "./pages/Veiculo";
import VeiculoModelo from "./pages/VeiculoModelo";
import VeiculoCombustivel from "./pages/VeiculoCombustivel";
import VeiculoCarroceria from "./pages/VeiculoCarroceria";
import VeiculoTabelaLicenciamento from "./pages/VeiculoTabelaLicenciamento";
import VeiculoClasse from "./pages/VeiculoClasse";
import VeiculoIPVA from "./pages/VeiculoIPVA";
import VeiculoLicenciamento from "./pages/VeiculoLicenciamento";
import VeiculoSeguro from "./pages/VeiculoSeguro";
import VeiculoMulta from "./pages/VeiculoMulta";
import Motorista from "./pages/Motorista";
import ViagemPagamento from "./pages/ViagemPagamento";
import Faturamento from "./pages/Faturamento";
import FaturamentoAutomatico from "./pages/FaturamentoAutomatico";
import Filial from "./pages/Filial";
import EmpresaFilialParametro from "./pages/EmpresaFilialParametro";
import DashboardShopee from "./pages/DashboardShopee";
import OperacaoShopee from "./pages/OperacaoShopee";
import ImportacaoShopee from "./pages/ImportacaoShopee";
import ExportacaoPlanilhaShopee from "./pages/ExportacaoPlanilhaShopee";
import LiberacaoNFSE from "./pages/LiberacaoNFSE";
import AuditoriaShopee from "./pages/AuditoriaShopee";
import ImportacaoPlanilhaAgregado from "./pages/ImportacaoPlanilhaAgregado";
import LocalidadeAdicional from "./pages/LocalidadeAdicional";
import Cidade from "./pages/Cidade";
import Regiao from "./pages/Regiao";
import Estado from "./pages/Estado";
import Feriado from "./pages/Feriado";
import LocalidadeAduaneira from "./pages/LocalidadeAduaneira";
import Produto from "./pages/Produto";
import Embalagem from "./pages/Embalagem";
import ProdutoPredominante from "./pages/ProdutoPredominante";
import EventoDespesa from "./pages/EventoDespesa";
import PrazoEntrega from "./pages/PrazoEntrega";
import HistoricoOcorrencia from "./pages/HistoricoOcorrencia";
import TipoOcorrencia from "./pages/TipoOcorrencia";
import Seguradora from "./pages/Seguradora";
import AtividadeEconomica from "./pages/AtividadeEconomica";
import ClienteCondicaoPagamento from "./pages/ClienteCondicaoPagamento";
import ClienteDivisaoRegiao from "./pages/ClienteDivisaoRegiao";
import ClienteEmbalagem from "./pages/ClienteEmbalagem";
import ClienteGrupoEconomico from "./pages/ClienteGrupoEconomico";
import ClienteProduto from "./pages/ClienteProduto";
import ClienteOperacao from "./pages/ClienteOperacao";
import SacNotaFiscal from "./pages/SacNotaFiscal";
import SacCTRC from "./pages/SacCTRC";
import SacColeta from "./pages/SacColeta";
import ConsultaSefazCte from "./pages/ConsultaSefazCte";
import ConsultaSefazMDFe from "./pages/ConsultaSefazMDFe";
import BaixaManifesto from "./pages/BaixaManifesto";
import MdfeParametro from "./pages/MdfeParametro";
import CteParametro from "./pages/CteParametro";
import BaixaCtrc from "./pages/BaixaCtrc";
import EnvioSefaz from "./pages/EnvioSefaz";
import GeracaoCtrcAutomatico from "./pages/GeracaoCtrcAutomatico";
import CancelamentoLote from "./pages/CancelamentoLote";
import IntegracaoMulticte from "./pages/IntegracaoMulticte";
import HomeModulos from "./pages/HomeModulos";
import HomeOperacao from "./pages/HomeOperacao";
import HomeFinanceiro from "./pages/HomeFinanceiro";

import "./index.css";

// ------------------------------------------------------------
// 🔥 Componente invisível para forçar Tailwind a gerar as cores
// ------------------------------------------------------------
function TailwindColorHelper() {
  return (
    <div className="hidden">
      <span className="text-red-100 text-red-200 text-red-300 text-red-400 text-red-500 text-red-600 text-red-700 text-red-800 text-red-900" />
      <span className="text-green-700" />
      <span className="hover:text-red-100 hover:text-red-200 hover:text-red-300 hover:text-red-400 hover:text-red-500 hover:text-red-600 hover:text-red-700 hover:text-red-800 hover:text-red-900" />
    </div>
  );
}

// ------------------------------------------------------------
// 🔥 APP PRINCIPAL
// ------------------------------------------------------------
export default function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Login persiste
  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem("usuarioNome");
  });

  const bgLogo = localStorage.getItem("param_logoBg");

  // Dashboard inicial
  const [showDashboard, setShowDashboard] = useState(
    localStorage.getItem("hideDashboard") !== "true"
  );

  // Logout global
  window.onLogout = () => {
    localStorage.removeItem("usuarioNome");
    setIsLogged(false);
    window.history.pushState({}, "", "/login");
  };

  // Tela de Login
  if (!isLogged) {
    return (
      <Login
        onLogin={(usuarioNome) => {
          if (usuarioNome) {
            localStorage.setItem("usuarioNome", usuarioNome);
          }
          setIsLogged(true);
          window.history.pushState({}, "", "/");
        }}
      />
    );
  }

  // Corrige redirecionamento após login
  if (isLogged && window.location.pathname === "/login") {
    window.history.pushState({}, "", "/");
  }

  const path = window.location.pathname;
  const isHomeModulos = path === "/";
  const isFinanceiro = path.startsWith("/modulo-financeiro");

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">

      <TailwindColorHelper />

      {/* Header */}
      {!isHomeModulos && (
        isFinanceiro ? (
          <HeaderFinanceiro toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        ) : (
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        )
      )}

      <div className="flex flex-1">

        {/* Sidebar */}
        {!isHomeModulos && (
          isFinanceiro ? (
            <SidebarFinanceiro open={sidebarOpen} />
          ) : (
            <Sidebar open={sidebarOpen} />
          )
        )}

        <main className="flex-1 p-4 overflow-auto">

          {/* DASHBOARD */}
          {showDashboard && !isFinanceiro && (
            <Dashboard
              onClose={() => {
                const check = document.querySelector("input[type='checkbox']");
                if (check?.checked) {
                  localStorage.setItem("hideDashboard", "true");
                }
                setShowDashboard(false);
              }}
            />
          )}

          {/* ROTAS */}
          <Routes>

            {/* ROTA PADRÃO REAL */}
            <Route index element={<HomeModulos />} />

            {/* Módulos principais */}
            <Route path="/modulo-operacao" element={<HomeOperacao />} />
            <Route path="/modulo-financeiro" element={<HomeFinanceiro />} />

            {/* RESTANTE DAS ROTAS (mantive tudo igual) */}
            <Route path="/cte" element={<CTePage open={sidebarOpen} />} />
            <Route path="/cliente-divisao" element={<ClienteDivisao open={sidebarOpen} />} />
            <Route path="/tabelafrete" element={<TabelaFrete open={sidebarOpen} />} />
            <Route path="/aliquota-icms" element={<AliquotaICMS open={sidebarOpen} />} />
            <Route path="/cfop" element={<CFOP open={sidebarOpen} />} />
            <Route path="/irrf" element={<IRRF open={sidebarOpen} />} />
            <Route path="/agenda" element={<Agenda open={sidebarOpen} />} />
            <Route path="/minuta" element={<Minuta open={sidebarOpen} />} />
            <Route path="/nfse" element={<NFSEPage open={sidebarOpen} />} />
            <Route path="/coleta" element={<Coleta open={sidebarOpen} />} />
            <Route path="/motivocoleta" element={<MotivoColeta open={sidebarOpen} />} />
            <Route path="/historico-ocorrencia" element={<HistoricoOcorrencia open={sidebarOpen} />} />
            <Route path="/tipo-ocorrencia" element={<TipoOcorrencia open={sidebarOpen} />} />
            <Route path="/dashboard-shopee" element={<DashboardShopee open={sidebarOpen} />} />
            <Route path="/empresa-filial-parametro" element={<EmpresaFilialParametro open={sidebarOpen} />} />

            {/* CLIENTE */}
            <Route path="/atividade-economica" element={<AtividadeEconomica open={sidebarOpen} />} />
            <Route path="/cliente-condicao-pagamento" element={<ClienteCondicaoPagamento open={sidebarOpen} />} />
            <Route path="/cliente-divisao-regiao" element={<ClienteDivisaoRegiao open={sidebarOpen} />} />
            <Route path="/cliente-embalagem" element={<ClienteEmbalagem open={sidebarOpen} />} />
            <Route path="/cliente-grupo-economico" element={<ClienteGrupoEconomico open={sidebarOpen} />} />
            <Route path="/cliente-produto" element={<ClienteProduto open={sidebarOpen} />} />
            <Route path="/cliente-operacao" element={<ClienteOperacao open={sidebarOpen} />} />

            <Route path="/manifesto" element={<Manifesto open={sidebarOpen} />} />
            <Route path="/cliente" element={<Cliente open={sidebarOpen} />} />
            <Route path="/empresa" element={<Empresa open={sidebarOpen} />} />
            <Route path="/empresa-agregado" element={<EmpresaAgregado open={sidebarOpen} />} />

            {/* VEÍCULO */}
            <Route path="/veiculo" element={<Veiculo open={sidebarOpen} />} />
            <Route path="/veiculo-modelo" element={<VeiculoModelo open={sidebarOpen} />} />
            <Route path="/veiculo-combustivel" element={<VeiculoCombustivel open={sidebarOpen} />} />
            <Route path="/veiculo-carroceria" element={<VeiculoCarroceria open={sidebarOpen} />} />
            <Route path="/veiculo-tabela-licenciamento" element={<VeiculoTabelaLicenciamento open={sidebarOpen} />} />
            <Route path="/veiculo-classe" element={<VeiculoClasse open={sidebarOpen} />} />
            <Route path="/veiculo-ipva" element={<VeiculoIPVA open={sidebarOpen} />} />
            <Route path="/veiculo-licenciamento" element={<VeiculoLicenciamento open={sidebarOpen} />} />
            <Route path="/veiculo-seguro" element={<VeiculoSeguro open={sidebarOpen} />} />
            <Route path="/veiculo-multa" element={<VeiculoMulta open={sidebarOpen} />} />

            <Route path="/motorista" element={<Motorista open={sidebarOpen} />} />
            <Route path="/filial" element={<Filial open={sidebarOpen} />} />
            <Route path="/faturamento" element={<Faturamento open={sidebarOpen} />} />
            <Route path="/faturamento-automatico" element={<FaturamentoAutomatico open={sidebarOpen} />} />

            {/* LOCALIDADE */}
            <Route path="/localidade-adicional" element={<LocalidadeAdicional open={sidebarOpen} />} />
            <Route path="/cidade" element={<Cidade open={sidebarOpen} />} />
            <Route path="/regiao" element={<Regiao open={sidebarOpen} />} />
            <Route path="/estado" element={<Estado open={sidebarOpen} />} />
            <Route path="/feriado" element={<Feriado open={sidebarOpen} />} />
            <Route path="/aduaneira" element={<LocalidadeAduaneira open={sidebarOpen} />} />

            <Route path="/produto" element={<Produto open={sidebarOpen} />} />
            <Route path="/embalagem" element={<Embalagem open={sidebarOpen} />} />
            <Route path="/produto-predominante" element={<ProdutoPredominante open={sidebarOpen} />} />
            <Route path="/evento-despesa" element={<EventoDespesa open={sidebarOpen} />} />

            <Route path="/prazo-entrega" element={<PrazoEntrega open={sidebarOpen} />} />
            <Route path="/seguradora" element={<Seguradora open={sidebarOpen} />} />
            <Route path="/viagem" element={<Viagem open={sidebarOpen} />} />
            <Route path="/acertocontas" element={<ViagemPagamento open={sidebarOpen} isModal={false} />} />

            {/* PARAMETROS */}
            <Route path="/parametros" element={<Parametro open={sidebarOpen} />} />

            <Route path="/notafiscaledi" element={<NotaFiscalEDI open={sidebarOpen} />} />
            <Route path="/operacao-shopee" element={<OperacaoShopee open={sidebarOpen} />} />
            <Route path="/importacao-shopee" element={<ImportacaoShopee open={sidebarOpen} />} />
            <Route path="/importacao-planilha-agregado" element={<ImportacaoPlanilhaAgregado open={sidebarOpen} />} />
            <Route path="/exportacao-planilha-shopee" element={<ExportacaoPlanilhaShopee open={sidebarOpen} />} />
            <Route path="/liberacao-nfse" element={<LiberacaoNFSE open={sidebarOpen} />} />
            <Route path="/auditoria-shopee" element={<AuditoriaShopee open={sidebarOpen} />} />

            {/* SAC */}
            <Route path="/sac-notafiscal" element={<SacNotaFiscal open={sidebarOpen} />} />
            <Route path="/sac-conhecimento" element={<SacCTRC open={sidebarOpen} />} />
            <Route path="/sac-coleta" element={<SacColeta open={sidebarOpen} />} />
            <Route path="/sacctrc/:ctrc" element={<SacCTRC open={sidebarOpen} />} />

            <Route path="/consulta-sefaz-cte" element={<ConsultaSefazCte open={sidebarOpen} />} />
            <Route path="/consultasefazmdfe" element={<ConsultaSefazMDFe open={sidebarOpen} />} />

            {/* MANIFESTO / CTRC */}
            <Route path="/baixamanifesto" element={<BaixaManifesto open={sidebarOpen} />} />
            <Route path="/parametromanifesto" element={<MdfeParametro open={sidebarOpen} />} />
            <Route path="/cteparametro" element={<CteParametro open={sidebarOpen} />} />
            <Route path="/baixactrc" element={<BaixaCtrc open={sidebarOpen} />} />
            <Route path="/enviosefaz" element={<EnvioSefaz open={sidebarOpen} />} />
            <Route path="/geracaoctrcautomatico" element={<GeracaoCtrcAutomatico open={sidebarOpen} />} />
            <Route path="/cancelamento-lote" element={<CancelamentoLote open={sidebarOpen} />} />
            <Route path="/integracao-multicte" element={<IntegracaoMulticte open={sidebarOpen} />} />

            <Route path="/sacctrc" element={<SacCTRC open={sidebarOpen} />} />

            {/* ROTA CORINGA */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </main>
      </div>
    </div>
  );
}
