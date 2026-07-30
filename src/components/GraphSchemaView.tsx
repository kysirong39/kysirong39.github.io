import React, { useState } from 'react';
import { 
  Boxes, 
  User, 
  CreditCard, 
  Smartphone, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Building, 
  ArrowRight, 
  Copy, 
  Check, 
  Code,
  ShieldAlert,
  Network,
  Sparkles,
  Layers,
  Info
} from 'lucide-react';
import { SCHEMA_NODES, SCHEMA_EDGES } from '../data/mockData';
import { NodeType } from '../types';

export const GraphSchemaView: React.FC = () => {
  const [selectedNodeLabel, setSelectedNodeLabel] = useState<NodeType>('Customer');
  const [hoveredNodeLabel, setHoveredNodeLabel] = useState<NodeType | null>(null);
  const [activeScenarioFilter, setActiveScenarioFilter] = useState<'all' | 'ring-101' | 'ring-102' | 'ring-103'>('all');
  const [copiedDdl, setCopiedDdl] = useState(false);

  const activeNodeDef = SCHEMA_NODES.find(n => n.type === selectedNodeLabel) || SCHEMA_NODES[0];

  const cypherDdl = `// ========================================================
// BANKING FRAUD RING KNOWLEDGE GRAPH SCHEMA DDL (NEO4J / MEMGRAPH)
// ========================================================

// 1. UNIQUE CONSTRAINTS FOR CORE ENTITIES
CREATE CONSTRAINT customer_cif_unique IF NOT EXISTS FOR (c:Customer) REQUIRE c.cif IS UNIQUE;
CREATE CONSTRAINT account_no_unique IF NOT EXISTS FOR (a:Account) REQUIRE a.accountNo IS UNIQUE;
CREATE CONSTRAINT device_imei_unique IF NOT EXISTS FOR (d:Device) REQUIRE d.deviceId IS UNIQUE;
CREATE CONSTRAINT phone_unique IF NOT EXISTS FOR (p:PhoneNumber) REQUIRE p.phone IS UNIQUE;
CREATE CONSTRAINT address_hash_unique IF NOT EXISTS FOR (addr:Address) REQUIRE addr.addressHash IS UNIQUE;

// 2. PERFORMANCE & TRAVERSAL INDEXES FOR REAL-TIME PATTERN SEARCH
CREATE INDEX customer_risk_idx IF NOT EXISTS FOR (c:Customer) ON (c.riskScore);
CREATE INDEX account_balance_idx IF NOT EXISTS FOR (a:Account) ON (a.balance);
CREATE INDEX ip_proxy_idx IF NOT EXISTS FOR (ip:IPAddress) ON (ip.isProxy, ip.ip);
CREATE INDEX trans_time_idx IF NOT EXISTS FOR ()-[r:TRANSFERRED_TO]-() ON (r.timestamp);`;

  const handleCopyDdl = () => {
    navigator.clipboard.writeText(cypherDdl);
    setCopiedDdl(true);
    setTimeout(() => setCopiedDdl(false), 2000);
  };

  const getIcon = (type: NodeType) => {
    switch (type) {
      case 'Customer': return <User className="w-4 h-4 text-blue-400" />;
      case 'Account': return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'Device': return <Smartphone className="w-4 h-4 text-purple-400" />;
      case 'PhoneNumber': return <Phone className="w-4 h-4 text-amber-400" />;
      case 'Email': return <Mail className="w-4 h-4 text-pink-400" />;
      case 'Address': return <MapPin className="w-4 h-4 text-indigo-400" />;
      case 'IPAddress': return <Globe className="w-4 h-4 text-red-400" />;
      case 'Company': return <Building className="w-4 h-4 text-teal-400" />;
    }
  };

  // Node Positions for Interactive SVG Ontology Metamodel
  const nodeMapData: Record<NodeType, { x: number; y: number; label: string; primaryKey: string; stroke: string; bg: string; fillText: string }> = {
    IPAddress:   { x: 130, y: 60,  label: ':IPAddress',   primaryKey: 'ip_address',  stroke: '#ef4444', bg: '#450a0a', fillText: '#fca5a5' },
    Device:      { x: 130, y: 190, label: ':Device',      primaryKey: 'device_imei', stroke: '#a855f7', bg: '#3b0764', fillText: '#d8b4fe' },
    PhoneNumber: { x: 130, y: 320, label: ':PhoneNumber', primaryKey: 'phone_num',   stroke: '#f59e0b', bg: '#451a03', fillText: '#fde68a' },
    
    Customer:    { x: 420, y: 190, label: ':Customer',    primaryKey: 'cif_id',      stroke: '#3b82f6', bg: '#1e3a8a', fillText: '#93c5fd' },
    Company:     { x: 420, y: 320, label: ':Company',     primaryKey: 'tax_code',    stroke: '#14b8a6', bg: '#042f2e', fillText: '#99f6e4' },
    
    Address:     { x: 710, y: 60,  label: ':Address',     primaryKey: 'address_hash',stroke: '#6366f1', bg: '#1e1b4b', fillText: '#c7d2fe' },
    Account:     { x: 710, y: 190, label: ':Account',     primaryKey: 'account_no',  stroke: '#10b981', bg: '#064e3b', fillText: '#a7f3d0' },
    Email:       { x: 710, y: 320, label: ':Email',       primaryKey: 'email_addr',  stroke: '#ec4899', bg: '#500724', fillText: '#fbcfe8' },
  };

  const ontologyConnections = [
    { from: 'Customer', to: 'IPAddress', label: 'REGISTERED_IP', color: '#ef4444', path: 'M 370 170 L 180 80', scenarios: ['ring-101'] },
    { from: 'Customer', to: 'Device', label: 'HAS_DEVICE', color: '#a855f7', path: 'M 370 190 L 180 190', scenarios: ['ring-101'] },
    { from: 'Customer', to: 'PhoneNumber', label: 'HAS_PHONE', color: '#f59e0b', path: 'M 370 210 L 180 300', scenarios: ['ring-101'] },
    
    { from: 'Customer', to: 'Account', label: 'OWNS_ACCOUNT', color: '#10b981', path: 'M 470 190 L 660 190', scenarios: ['ring-101', 'ring-102'] },
    { from: 'Customer', to: 'Address', label: 'HAS_ADDRESS', color: '#6366f1', path: 'M 470 170 L 660 80', scenarios: ['ring-103'] },
    { from: 'Customer', to: 'Email', label: 'HAS_EMAIL', color: '#ec4899', path: 'M 470 210 L 660 300', scenarios: ['ring-101'] },
    
    { from: 'Customer', to: 'Company', label: 'DIRECTOR_OF', color: '#14b8a6', path: 'M 420 215 L 420 295', scenarios: ['ring-103'] },
    { from: 'Company', to: 'Address', label: 'REGISTERED_AT', color: '#6366f1', path: 'M 470 320 Q 580 320 660 80', scenarios: ['ring-103'] },
    { from: 'Company', to: 'Account', label: 'OWNS_ACCOUNT', color: '#10b981', path: 'M 470 300 L 660 210', scenarios: ['ring-103'] },
    { from: 'Account', to: 'Account', label: 'TRANSFERRED_TO', color: '#34d399', path: 'M 720 165 C 770 120, 780 160, 740 175', scenarios: ['ring-102'] },
  ];

  return (
    <div className="space-y-6 py-2">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Boxes className="w-6 h-6 text-blue-400" />
              <span>Knowledge Graph Ontology (Mô hình Dữ liệu Đồ thị Ngân hàng)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Chi tiết cấu trúc thực thể (Nodes), mối liên kết (Edges/Relationships) và các thuộc tính (Properties) trong cơ sở dữ liệu đồ thị.
            </p>
          </div>
          <button
            onClick={handleCopyDdl}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            {copiedDdl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
            <span>{copiedDdl ? 'Đã Sao Chép DDL' : 'Sao Chép Neo4j DDL Schema'}</span>
          </button>
        </div>
      </div>

      {/* VISUAL ONTOLOGY GRAPH METAMODEL (MÔ HÌNH ONTOLOGY TRỰC QUAN) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>Mô Hình Ontology Trực Quan (Visual Knowledge Metamodel)</span>
                <span className="text-[10px] font-mono bg-blue-500/20 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
                  1 Unified Schema for 3 Scenarios
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                01 Mô hình Ontology duy nhất chứa 8 Nhãn Thực thể & 10 Mối quan hệ, biểu diễn trọn vẹn cả 3 Kịch bản Gian lận Ngân hàng.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>8 Node Types • 10 Edge Types</span>
          </div>
        </div>

        {/* Scenario Filter Highlights */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Highlight Kịch bản Gian lận:
          </span>
          <button
            onClick={() => setActiveScenarioFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeScenarioFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả (Metamodel Tổng)
          </button>
          <button
            onClick={() => setActiveScenarioFilter('ring-101')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeScenarioFilter === 'ring-101'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
            }`}
          >
            Scenario 1: eKYC & Device Fingerprint
          </button>
          <button
            onClick={() => setActiveScenarioFilter('ring-102')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeScenarioFilter === 'ring-102'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-emerald-300 hover:bg-slate-700'
            }`}
          >
            Scenario 2: Money Mule Circular Flow
          </button>
          <button
            onClick={() => setActiveScenarioFilter('ring-103')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeScenarioFilter === 'ring-103'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
            }`}
          >
            Scenario 3: Shell Co. & Loan Stacking
          </button>
        </div>

        {/* SVG Canvas for Ontology Metamodel */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/80 relative overflow-x-auto">
          
          <svg viewBox="0 0 840 380" className="w-full min-w-[700px] h-auto select-none">
            
            {/* SVG Markers for Directed Arrows */}
            <defs>
              <marker id="arrow-default" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
              <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <pattern id="grid-bg" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="840" height="380" fill="url(#grid-bg)" rx="12" />

            {/* Render Relationship Connection Lines */}
            {ontologyConnections.map((conn, idx) => {
              const isNodeActive = selectedNodeLabel === conn.from || selectedNodeLabel === conn.to;
              const isNodeHovered = hoveredNodeLabel === conn.from || hoveredNodeLabel === conn.to;
              const isScenarioMatched = activeScenarioFilter === 'all' || conn.scenarios.includes(activeScenarioFilter);
              const isHighlighted = (isNodeActive || isNodeHovered) && isScenarioMatched;

              return (
                <g key={idx} className="transition-all duration-300" opacity={isScenarioMatched ? 1 : 0.25}>
                  <path
                    d={conn.path}
                    fill="none"
                    stroke={isHighlighted || (activeScenarioFilter !== 'all' && isScenarioMatched) ? conn.color : '#334155'}
                    strokeWidth={isHighlighted ? '2.5' : isScenarioMatched && activeScenarioFilter !== 'all' ? '2' : '1.5'}
                    strokeDasharray={isHighlighted || (activeScenarioFilter !== 'all' && isScenarioMatched) ? 'none' : '4,3'}
                    markerEnd={isHighlighted || isScenarioMatched ? 'url(#arrow-blue)' : 'url(#arrow-default)'}
                    className="transition-all duration-300"
                  />
                  {/* Text Badge along the connection line */}
                  <g className="cursor-pointer">
                    <rect
                      x={(nodeMapData[conn.from as NodeType].x + nodeMapData[conn.to as NodeType].x) / 2 - 42}
                      y={(nodeMapData[conn.from as NodeType].y + nodeMapData[conn.to as NodeType].y) / 2 - 9}
                      width="84"
                      height="18"
                      rx="4"
                      fill="#0f172a"
                      stroke={isHighlighted ? conn.color : '#1e293b'}
                      strokeWidth="1"
                    />
                    <text
                      x={(nodeMapData[conn.from as NodeType].x + nodeMapData[conn.to as NodeType].x) / 2}
                      y={(nodeMapData[conn.from as NodeType].y + nodeMapData[conn.to as NodeType].y) / 2 + 3}
                      textAnchor="middle"
                      fill={isHighlighted ? '#f8fafc' : '#94a3b8'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      :{conn.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Render Node Cards */}
            {(Object.keys(nodeMapData) as NodeType[]).map((type) => {
              const node = nodeMapData[type];
              const isSelected = selectedNodeLabel === type;
              const isHovered = hoveredNodeLabel === type;
              
              const isNodeInScenario = activeScenarioFilter === 'all' || ontologyConnections.some(
                c => c.scenarios.includes(activeScenarioFilter) && (c.from === type || c.to === type)
              );

              return (
                <g
                  key={type}
                  transform={`translate(${node.x - 55}, ${node.y - 25})`}
                  onClick={() => setSelectedNodeLabel(type)}
                  onMouseEnter={() => setHoveredNodeLabel(type)}
                  onMouseLeave={() => setHoveredNodeLabel(null)}
                  opacity={isNodeInScenario ? 1 : 0.3}
                  className="cursor-pointer transition-all duration-200"
                >
                  {/* Glowing halo for selected node */}
                  {isSelected && (
                    <rect
                      x="-6"
                      y="-6"
                      width="122"
                      height="62"
                      rx="16"
                      fill="none"
                      stroke={node.stroke}
                      strokeWidth="2"
                      opacity="0.8"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Node Card Body */}
                  <rect
                    x="0"
                    y="0"
                    width="110"
                    height="50"
                    rx="12"
                    fill={node.bg}
                    stroke={isSelected || isHovered ? node.stroke : '#334155'}
                    strokeWidth={isSelected || isHovered ? '2' : '1'}
                    className="transition-all duration-200 shadow-lg"
                  />

                  {/* Node Label Title */}
                  <text
                    x="55"
                    y="22"
                    textAnchor="middle"
                    fill={node.fillText}
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.label}
                  </text>

                  {/* Primary Key Identifier */}
                  <text
                    x="55"
                    y="38"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="sans-serif"
                  >
                    PK: {node.primaryKey}
                  </text>
                </g>
              );
            })}

          </svg>

        </div>

        {/* Legend & Interactive Hints */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400" />
            <span>Đang chọn Nút: <strong className="text-blue-300 font-mono">:{selectedNodeLabel}</strong> — xem toàn bộ thuộc tính & chỉ mục bên dưới</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Core Entity
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span> Device/IP/Phone
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Account & Financial
            </span>
          </div>
        </div>

      </div>

      {/* Grid: Node Explorer & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Node Taxonomy Selector (Left 4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider text-[11px] text-slate-400">
            Danh Sách Nút (Node Taxonomy - 8 Labels)
          </h3>
          <div className="space-y-1.5">
            {SCHEMA_NODES.map((node) => {
              const isSelected = selectedNodeLabel === node.type;
              return (
                <button
                  key={node.type}
                  onClick={() => setSelectedNodeLabel(node.type)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-slate-800/40 border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                      {getIcon(node.type)}
                    </span>
                    <span className="font-bold">{node.type}</span>
                  </div>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400">
                    {node.properties.length} props
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Inspector (Right 8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              {getIcon(activeNodeDef.type)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Node Label:</span>
                <span className="text-blue-400 font-mono">:{activeNodeDef.type}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{activeNodeDef.description}</p>
            </div>
          </div>

          {/* Properties Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Danh sách Thuộc tính (Properties)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-800 text-slate-300">
                    <th className="p-2.5 font-semibold">Tên thuộc tính</th>
                    <th className="p-2.5 font-semibold">Kiểu dữ liệu</th>
                    <th className="p-2.5 font-semibold">Ví dụ mẫu</th>
                    <th className="p-2.5 font-semibold">Mô tả nghiệp vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {activeNodeDef.properties.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50">
                      <td className="p-2.5 font-mono text-blue-300 font-medium">{p.name}</td>
                      <td className="p-2.5 font-mono text-amber-400">{p.type}</td>
                      <td className="p-2.5 text-slate-300 font-mono text-[11px]">{p.example}</td>
                      <td className="p-2.5 text-slate-400">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Connected Relationships */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Mối quan hệ liên kết (Edges connected to :{activeNodeDef.type})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SCHEMA_EDGES.filter(
                e => e.sourceTypes.includes(activeNodeDef.type) || e.targetTypes.includes(activeNodeDef.type)
              ).map((edge, idx) => (
                <div key={idx} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-300">
                    <span>:{edge.type}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 flex items-center gap-1.5 py-0.5">
                    <span className="text-blue-400 font-semibold">:{edge.sourceTypes.join(',')}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className="text-emerald-400 font-semibold">:{edge.targetTypes.join(',')}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{edge.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Cypher DDL Code Block */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <span>Cypher DDL (Constraints & Indexes Configuration)</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Compatible with Neo4j 5.x & Memgraph</span>
        </div>
        <pre className="bg-slate-950 p-4 rounded-xl text-slate-300 text-xs font-mono overflow-x-auto border border-slate-800/80 leading-relaxed">
          {cypherDdl}
        </pre>
      </div>

    </div>
  );
};

