import React, { useRef, useEffect } from 'react';
import { 
  FileText, 
  Workflow,
  Boxes, 
  Network, 
  Calculator, 
  BellRing, 
  Terminal, 
  BarChart3, 
  Github,
  Bot,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  alertCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
  alertCount
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'overview', label: '1. Nghiệp vụ & Đầu vào', icon: FileText },
    { id: 'architecture', label: '2. Kiến trúc & Workflow', icon: Workflow },
    { id: 'schema', label: '3. Schema Ontology', icon: Boxes },
    { id: 'graph-explorer', label: '4. Graph Explorer (Trực quan)', icon: Network, highlight: true },
    { id: 'scoring', label: '5. Risk & Credit Scoring', icon: Calculator },
    { id: 'alerts', label: '6. Cảnh báo Real-time', icon: BellRing, badge: alertCount },
    { id: 'cypher', label: '7. Kho Truy vấn Cypher', icon: Terminal, highlight: true },
    { id: 'analytics', label: '8. Biểu đồ Risk BI', icon: BarChart3, highlight: true },
    { id: 'github-deploy', label: '9. Deploy GitHub Pages', icon: Github, highlight: true },
    { id: 'ai-expert', label: '10. AI Innovation Analyst', icon: Bot },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll active tab into view when activeTab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  return (
    <div className="bg-slate-900/95 border-b border-slate-800 sticky top-[61px] z-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-2">
          
          {/* Scroll Left Button */}
          <button
            onClick={() => handleScroll('left')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all shrink-0 cursor-pointer shadow-sm"
            title="Cuộn sang trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Horizontal Scrollable Tabs */}
          <div 
            ref={scrollContainerRef}
            className="flex space-x-1.5 overflow-x-auto py-1 scroll-smooth shrink min-w-0 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab-id={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold border border-blue-400/40'
                      : tab.highlight
                      ? 'bg-slate-800/90 text-blue-300 hover:bg-slate-700 hover:text-white border border-blue-500/30'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/80 bg-slate-950/40 border border-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.highlight ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => handleScroll('right')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all shrink-0 cursor-pointer shadow-sm"
            title="Cuộn sang phải (Menu 7, 8, 9, 10)"
          >
            <ChevronRight className="w-4 h-4 text-blue-400 animate-pulse" />
          </button>

          {/* Quick Dropdown Selector for Fast Access */}
          <div className="flex items-center shrink-0 border-l border-slate-800 pl-2">
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-lg px-2 py-1 text-xs">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer text-xs max-w-[130px] sm:max-w-[180px] truncate"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id} className="bg-slate-900 text-slate-100">
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

