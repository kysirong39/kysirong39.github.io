import React from 'react';
import { ShieldAlert, Network, Sparkles, Activity, FileCode, Search, Server } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedScenarioId: string;
  setSelectedScenarioId: (id: string) => void;
  onOpenAiAnalyst: () => void;
  scenarios: Array<{ id: string; title: string; riskLevel: string }>;
}

export const Header: React.FC<HeaderProps> = ({
  selectedScenarioId,
  setSelectedScenarioId,
  onOpenAiAnalyst,
  scenarios
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl shadow-md flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-slate-100 tracking-tight">
                  BankFraud Graph Intelligence
                </h1>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse text-emerald-400" /> Live Neo4j Graph
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hệ thống Khai phá Knowledge Graph Phát hiện Nhóm Gian lận (Fraud Rings) & Chấm điểm Rủi ro Ngân hàng
              </p>
            </div>
          </div>

          {/* Controls: Scenario Selector, Search & AI Analyst Launcher */}
          <div className="flex items-center flex-wrap gap-2.5">
            
            {/* Scenario Selector */}
            <div className="flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs">
              <span className="text-slate-400 mr-2 font-medium flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> k-Hop Scenario:
              </span>
              <select
                value={selectedScenarioId}
                onChange={(e) => setSelectedScenarioId(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1"
              >
                {scenarios.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-800 text-slate-100">
                    [{s.riskLevel}] {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAnalyst}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-md hover:shadow-indigo-500/25 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Hỏi Trợ lý AI Gemini</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
