import React, { useState } from 'react';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { ArchitectureWorkflow } from './components/ArchitectureWorkflow';
import { GraphSchemaView } from './components/GraphSchemaView';
import { GraphExplorer } from './components/GraphExplorer';
import { RiskScoringEngine } from './components/RiskScoringEngine';
import { EarlyWarningConsole } from './components/EarlyWarningConsole';
import { CypherPlayground } from './components/CypherPlayground';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { GitHubDeployGuide } from './components/GitHubDeployGuide';
import { AiAnalystDrawer } from './components/AiAnalystDrawer';
import { FRAUD_RING_SCENARIOS, EARLY_WARNING_ALERTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('graph-explorer');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(FRAUD_RING_SCENARIOS[0].id);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);

  const newAlertsCount = EARLY_WARNING_ALERTS.filter(a => a.status === 'NEW').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedScenarioId={selectedScenarioId}
        setSelectedScenarioId={setSelectedScenarioId}
        onOpenAiAnalyst={() => setIsAiDrawerOpen(true)}
        scenarios={FRAUD_RING_SCENARIOS}
      />

      {/* Navigation Sub-Header */}
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={newAlertsCount}
      />

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <ExecutiveOverview
            onSelectScenario={(id) => {
              setSelectedScenarioId(id);
              setActiveTab('graph-explorer');
            }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'architecture' && <ArchitectureWorkflow />}

        {activeTab === 'schema' && <GraphSchemaView />}

        {activeTab === 'graph-explorer' && (
          <GraphExplorer
            selectedScenarioId={selectedScenarioId}
            setSelectedScenarioId={setSelectedScenarioId}
            onOpenAiAnalyst={() => setIsAiDrawerOpen(true)}
          />
        )}

        {activeTab === 'scoring' && <RiskScoringEngine />}

        {activeTab === 'alerts' && <EarlyWarningConsole />}

        {activeTab === 'cypher' && <CypherPlayground />}

        {activeTab === 'analytics' && <AnalyticsDashboard />}

        {activeTab === 'github-deploy' && <GitHubDeployGuide />}

        {activeTab === 'ai-expert' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-100">AI Innovation Analyst Assistant</h2>
            <p className="text-xs text-slate-400">
              Nhấn nút bên dưới để mở giao diện Trợ lý AI Gemini chuyên sâu.
            </p>
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-lg"
            >
              Mở Khung Trò Chuyện Với AI Gemini
            </button>
          </div>
        )}
      </main>

      {/* AI Analyst Drawer */}
      <AiAnalystDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        selectedScenarioTitle={FRAUD_RING_SCENARIOS.find(s => s.id === selectedScenarioId)?.title}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>BankFraud Graph Intelligence System • Powered by Neo4j & Gemini AI</span>
          <span>Tuân thủ Quy định NHNN 2345/QĐ-NHNN & NĐ 13/ND-CP</span>
        </div>
      </footer>

    </div>
  );
}
