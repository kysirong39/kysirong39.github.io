import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Network, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  User, 
  CreditCard, 
  Smartphone, 
  Phone, 
  Globe, 
  MapPin, 
  Building, 
  Filter, 
  Zap, 
  X,
  Share2,
  Info
} from 'lucide-react';
import { FRAUD_RING_SCENARIOS, SCHEMA_NODES } from '../data/mockData';
import { GraphNode, GraphEdge, NodeType } from '../types';

interface GraphExplorerProps {
  selectedScenarioId: string;
  setSelectedScenarioId: (id: string) => void;
  onOpenAiAnalyst: () => void;
}

export const GraphExplorer: React.FC<GraphExplorerProps> = ({
  selectedScenarioId,
  setSelectedScenarioId,
  onOpenAiAnalyst
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<NodeType>>(
    new Set(['Customer', 'Account', 'Device', 'PhoneNumber', 'Email', 'Address', 'IPAddress', 'Company'])
  );
  const [showLabels, setShowLabels] = useState(true);
  const [highlightRiskOnly, setHighlightRiskOnly] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<GraphNode | null>(null);

  // Combine scenario nodes or filter by active scenario
  const currentScenario = useMemo(() => {
    return FRAUD_RING_SCENARIOS.find(s => s.id === selectedScenarioId) || FRAUD_RING_SCENARIOS[0];
  }, [selectedScenarioId]);

  // Node position cache so positions persist smoothly
  const nodesRef = useRef<GraphNode[]>([]);
  const edgesRef = useRef<GraphEdge[]>([]);

  // Initialize or update nodes with layout positions when scenario changes
  useEffect(() => {
    const nodes: GraphNode[] = currentScenario.nodes.map((n, idx) => {
      const angle = (idx / currentScenario.nodes.length) * 2 * Math.PI;
      const radius = 180 + Math.random() * 40;
      return {
        ...n,
        x: n.x || 400 + Math.cos(angle) * radius,
        y: n.y || 300 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0
      };
    });
    nodesRef.current = nodes;
    edgesRef.current = currentScenario.edges;
    setSelectedNode(null);
  }, [currentScenario]);

  // Filtered nodes based on active node types & search term
  const filteredNodeIds = useMemo(() => {
    return new Set(
      nodesRef.current
        .filter(n => {
          if (!activeFilters.has(n.label)) return false;
          if (highlightRiskOnly && n.riskScore < 85) return false;
          if (searchTerm) {
            const query = searchTerm.toLowerCase();
            const matchName = n.name.toLowerCase().includes(query);
            const matchSub = n.subText?.toLowerCase().includes(query) || false;
            const matchProp = Object.values(n.properties).some(v => String(v).toLowerCase().includes(query));
            return matchName || matchSub || matchProp;
          }
          return true;
        })
        .map(n => n.id)
    );
  }, [activeFilters, searchTerm, highlightRiskOnly, currentScenario]);

  // Canvas Force Simulation & Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // 1. Physics Step (Simple Force Directed Layout)
      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Repulsion between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          if (!n1.x || !n1.y || !n2.x || !n2.y) continue;
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 220) {
            const force = (220 - dist) / dist * 0.35;
            n1.vx = (n1.vx || 0) - (dx / dist) * force;
            n1.vy = (n1.vy || 0) - (dy / dist) * force;
            n2.vx = (n2.vx || 0) + (dx / dist) * force;
            n2.vy = (n2.vy || 0) + (dy / dist) * force;
          }
        }
      }

      // Attraction along edges
      for (const edge of edges) {
        const source = nodes.find(n => n.id === edge.source);
        const target = nodes.find(n => n.id === edge.target);
        if (source && target && source.x && source.y && target.x && target.y) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - 120) * 0.015;
          source.vx = (source.vx || 0) + (dx / dist) * force;
          source.vy = (source.vy || 0) + (dy / dist) * force;
          target.vx = (target.vx || 0) - (dx / dist) * force;
          target.vy = (target.vy || 0) - (dy / dist) * force;
        }
      }

      // Update positions with damping
      for (const node of nodes) {
        if (node === draggedNode) continue; // Don't move if dragging
        node.vx = (node.vx || 0) * 0.82;
        node.vy = (node.vy || 0) * 0.82;
        node.x = (node.x || 400) + node.vx;
        node.y = (node.y || 300) + node.vy;

        // Keep within bounds
        node.x = Math.max(80, Math.min(canvas.width - 80, node.x));
        node.y = Math.max(80, Math.min(canvas.height - 80, node.y));
      }

      // 2. Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // Apply Pan & Zoom
      ctx.translate(panOffset.x, panOffset.y);
      ctx.scale(zoomLevel, zoomLevel);

      // Draw Grid background
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = -1000; x < canvas.width + 1000; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, -1000);
        ctx.lineTo(x, canvas.height + 1000);
        ctx.stroke();
      }
      for (let y = -1000; y < canvas.height + 1000; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(-1000, y);
        ctx.lineTo(canvas.width + 1000, y);
        ctx.stroke();
      }

      // 3. Draw Edges
      for (const edge of edges) {
        const source = nodes.find(n => n.id === edge.source);
        const target = nodes.find(n => n.id === edge.target);
        if (!source || !target || !source.x || !source.y || !target.x || !target.y) continue;

        const isVisible = filteredNodeIds.has(source.id) && filteredNodeIds.has(target.id);
        if (!isVisible) continue;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (edge.isSuspicious) {
          ctx.strokeStyle = '#ef4444'; // Red
          ctx.lineWidth = 2.5;
          ctx.setLineDash([6, 4]); // Dashed line for suspicious link
        } else {
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Draw Edge Label
        if (showLabels) {
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2;
          ctx.fillStyle = edge.isSuspicious ? '#fca5a5' : '#94a3b8';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(edge.label, midX, midY - 4);
        }
      }

      // 4. Draw Nodes
      for (const node of nodes) {
        if (!node.x || !node.y) continue;
        const isVisible = filteredNodeIds.has(node.id);
        if (!isVisible) continue;

        const isSelected = selectedNode?.id === node.id;
        const isHighRisk = node.riskScore >= 85;

        // Node Outer Glow for Fraud Ring
        if (isHighRisk) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, isSelected ? 28 : 22, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
          ctx.fill();
        }

        // Node Selection Ring
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
          ctx.strokeStyle = '#60a5fa'; // Light blue
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);

        // Fill Color based on Label
        const schemaDef = SCHEMA_NODES.find(s => s.type === node.label);
        ctx.fillStyle = schemaDef ? schemaDef.color : '#3b82f6';
        ctx.fill();

        ctx.strokeStyle = node.isFraudRingMember ? '#f87171' : '#ffffff';
        ctx.lineWidth = node.isFraudRingMember ? 2.5 : 1.5;
        ctx.stroke();

        // Risk Score Badge inside node
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${node.riskScore}`, node.x, node.y);

        // Label below Node
        if (showLabels) {
          ctx.fillStyle = isSelected ? '#ffffff' : '#cbd5e1';
          ctx.font = isSelected ? 'bold 12px sans-serif' : '11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(node.name, node.x, node.y + 22);

          if (node.subText) {
            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px monospace';
            ctx.fillText(node.subText, node.x, node.y + 36);
          }
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [zoomLevel, panOffset, filteredNodeIds, selectedNode, showLabels, draggedNode]);

  // Handle Mouse Canvas Interaction (Click, Drag, Pan)
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const mouseY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    // Check if clicked on a node
    const clicked = nodesRef.current.find(n => {
      if (!n.x || !n.y || !filteredNodeIds.has(n.id)) return false;
      const dist = Math.sqrt((n.x - mouseX) ** 2 + (n.y - mouseY) ** 2);
      return dist <= 22;
    });

    if (clicked) {
      setSelectedNode(clicked);
      setDraggedNode(clicked);
    } else {
      setIsDraggingCanvas(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (draggedNode) {
      const rect = canvas.getBoundingClientRect();
      draggedNode.x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      draggedNode.y = (e.clientY - rect.top - panOffset.y) / zoomLevel;
    } else if (isDraggingCanvas) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
    setIsDraggingCanvas(false);
  };

  const toggleFilter = (type: NodeType) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <div className="space-y-4 py-2">
      
      {/* Top Controls Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search & Scenario */}
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm nút (Name, CIF, Phone, IMEI, IP)..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => setHighlightRiskOnly(!highlightRiskOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              highlightRiskOnly
                ? 'bg-red-500/20 border-red-500 text-red-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Chỉ xem Nút Rủi ro (Risk ≥ 85)</span>
          </button>
        </div>

        {/* View Zoom & Label Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer"
            title="Bật/Tắt nhãn tên"
          >
            {showLabels ? <Eye className="w-4 h-4 text-blue-400" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.5))}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer"
            title="Đặt lại khung nhìn"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Node Type Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Lọc nút:
        </span>
        {SCHEMA_NODES.map((sn) => {
          const isActive = activeFilters.has(sn.type);
          return (
            <button
              key={sn.type}
              onClick={() => toggleFilter(sn.type)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-slate-800 border-slate-600 text-white'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sn.color }}></span>
              <span>{sn.type}</span>
            </button>
          );
        })}
      </div>

      {/* Main Canvas + Side Property Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Canvas Container (8 or 12 cols) */}
        <div className={`${selectedNode ? 'lg:col-span-8' : 'lg:col-span-12'} bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl`}>
          
          {/* Scenario Info Bar Overlay */}
          <div className="absolute top-3 left-3 z-10 bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs space-y-1">
            <div className="font-bold text-slate-100 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentScenario.title}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Hiển thị: {filteredNodeIds.size} / {currentScenario.nodes.length} Nodes
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={850}
            height={520}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full h-[520px] cursor-grab active:cursor-grabbing bg-slate-950"
          />

          <div className="absolute bottom-3 left-3 z-10 text-[10px] text-slate-500 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
            💡 Mẹo: Nhấp & giữ nút để kéo thả • Kéo nền để di chuyển canvas • Nhấp vào nút để xem thông tin thuộc tính
          </div>
        </div>

        {/* Node Inspector Side Panel (Right 4 cols) */}
        {selectedNode && (
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
                  :{selectedNode.label}
                </span>
                <h3 className="font-bold text-slate-100 text-sm truncate max-w-[180px]">
                  {selectedNode.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Risk Score Gauge */}
            <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Risk Score (Graph Centrality):</span>
                <span className={`font-mono font-bold text-sm ${
                  selectedNode.riskScore >= 85 ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {selectedNode.riskScore} / 100
                </span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    selectedNode.riskScore >= 85 ? 'bg-red-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${selectedNode.riskScore}%` }}
                ></div>
              </div>
              {selectedNode.isFraudRingMember && (
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md">
                  <ShieldAlert className="w-3 h-3" /> Thuộc Cụm Gian Lận {selectedNode.ringId}
                </div>
              )}
            </div>

            {/* Node Properties */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Thuộc tính chi tiết (Properties)
              </h4>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 max-h-44 overflow-y-auto font-mono text-xs">
                {Object.entries(selectedNode.properties).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[11px]">
                    <span className="text-slate-400">{k}:</span>
                    <span className="text-blue-300 font-semibold">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Action */}
            <button
              onClick={onOpenAiAnalyst}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Yêu cầu AI Phân Tích Mối Quan Hệ Nút Này</span>
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
