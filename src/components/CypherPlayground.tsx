import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Sparkles, 
  Code2, 
  Database, 
  Zap, 
  CheckCircle2, 
  ListFilter,
  Layers,
  HelpCircle
} from 'lucide-react';
import { CYPHER_QUERIES } from '../data/mockData';
import { CypherQueryItem } from '../types';

export const CypherPlayground: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<CypherQueryItem>(CYPHER_QUERIES[0]);
  const [cypherCode, setCypherCode] = useState<string>(CYPHER_QUERIES[0].cypher);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    status: string;
    nodesScanned: number;
    matchedPathsCount: number;
    executionTimeMs: number;
    dataRows: Array<Record<string, any>>;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // AI Generator state
  const [aiRequirement, setAiRequirement] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleSelectQuery = (q: CypherQueryItem) => {
    setSelectedQuery(q);
    setCypherCode(q.cypher);
    setExecutionResult(null);
  };

  const handleExecuteCypher = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult({
        status: 'SUCCESS',
        nodesScanned: 1845,
        matchedPathsCount: 4,
        executionTimeMs: Math.floor(Math.random() * 15) + 8,
        dataRows: [
          { ring_id: 'ring-101', entity: 'IMEI-SHARED-998', cifs: ['CIF-9011', 'CIF-9012', 'CIF-9013'], risk_score: 95 },
          { ring_id: 'ring-101', entity: '113.161.45.99 (IP Proxy)', cifs: ['CIF-9011', 'CIF-9014'], risk_score: 90 },
          { ring_id: 'ring-102', entity: 'STK: 102938401 (Mule Flow)', cifs: ['Mule-A', 'Mule-B', 'Mule-C'], risk_score: 98 }
        ]
      });
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cypherCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGenerateAiCypher = async () => {
    if (!aiRequirement.trim()) return;
    setIsAiGenerating(true);

    const getClientFallbackCypher = (reqText: string) => {
      const req = reqText.toLowerCase();
      if (req.includes('mule') || req.includes('chuyển tiền') || req.includes('tiền')) {
        return {
          cypher: `MATCH (src:Account)-[t1:TRANSFERRED_TO]->(mule1:Account)-[t2:TRANSFERRED_TO]->(mule2:Account)
WHERE t1.amount > 50000000 
  AND duration.between(t1.timestamp, t2.timestamp).minutes < 15
RETURN src.accountNo AS Source, mule1.accountNo AS Mule_Step1, mule2.accountNo AS Mule_Step2, t1.amount AS Amount
LIMIT 20;`,
          explanation: "Lệnh Cypher tìm kiếm các tài khoản chuyển tiền liên hoàn > 50 triệu VND trong khoảng thời gian dưới 15 phút (mô hình Money Mule rác)."
        };
      }
      if (req.includes('ip') || req.includes('proxy') || req.includes('thiết bị') || req.includes('imei')) {
        return {
          cypher: `MATCH (ip:IPAddress {isProxy: true})<-[:REGISTERED_WITH_IP]-(c:Customer)-[:HAS_DEVICE]->(d:Device)
WITH ip, d, collect(c.cif_id) AS Customer_CIFs, count(c) AS Total_Users
WHERE Total_Users >= 2
RETURN ip.ipAddress AS Proxy_IP, d.deviceModel AS Device, Total_Users, Customer_CIFs;`,
          explanation: "Tìm kiếm các địa chỉ IP Proxy/VPN độc hại được dùng bởi 2 hoặc nhiều khách hàng eKYC khác nhau từ cùng 1 dòng máy."
        };
      }
      return {
        cypher: `MATCH (c1:Customer)-[:HAS_DEVICE]->(d:Device)<-[:HAS_DEVICE]-(c2:Customer)
WHERE c1 <> c2
MATCH (c1)-[:OWNS_ACCOUNT]->(a1:Account)-[t:TRANSFERRED_TO]->(a2:Account)<-[:OWNS_ACCOUNT]-(c2)
RETURN c1.cif_id AS Customer1, c2.cif_id AS Customer2, d.deviceImei AS Shared_IMEI, sum(t.amount) AS Total_Transferred;`,
        explanation: "Truy vấn đồ thị kiểm tra 2 khách hàng dùng chung 1 mã IMEI thiết bị di động và có giao dịch chuyển tiền trực tiếp cho nhau."
      };
    };

    try {
      const res = await fetch('/api/gemini/generate-cypher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userRequirement: aiRequirement })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.cypher) {
        setCypherCode(data.cypher);
        setSelectedQuery(prev => ({
          ...prev,
          title: `AI Generated: ${aiRequirement.substring(0, 30)}...`,
          description: data.explanation || 'Câu lệnh Cypher do Trợ lý AI Gemini thiết kế',
          cypher: data.cypher
        }));
      } else {
        const fallback = getClientFallbackCypher(aiRequirement);
        setCypherCode(fallback.cypher);
        setSelectedQuery(prev => ({
          ...prev,
          title: `AI Generated: ${aiRequirement.substring(0, 30)}...`,
          description: fallback.explanation,
          cypher: fallback.cypher
        }));
      }
    } catch (err) {
      console.warn('Backend Cypher API unavailable, using client-side generator:', err);
      const fallback = getClientFallbackCypher(aiRequirement);
      setCypherCode(fallback.cypher);
      setSelectedQuery(prev => ({
        ...prev,
        title: `AI Generated: ${aiRequirement.substring(0, 30)}...`,
        description: fallback.explanation,
        cypher: fallback.cypher
      }));
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="space-y-6 py-2">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-emerald-400" />
              <span>Kho Câu Lệnh Cypher Query & Interactive Playground</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tập hợp các mẫu truy vấn đồ thị Cypher chuẩn hóa cho Neo4j & Memgraph trong nghiệp vụ phát hiện Fraud Ring.
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copiedCode ? 'Đã Sao Chép Cypher' : 'Sao Chép Câu Lệnh'}</span>
          </button>
        </div>
      </div>

      {/* AI Cypher Generator Input */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Tạo Cypher Bằng Trí Tuệ Nhân Tạo (Gemini AI Cypher Generator)</span>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={aiRequirement}
            onChange={(e) => setAiRequirement(e.target.value)}
            placeholder="Ví dụ: Truy vấn tìm khách hàng có chuyển tiền cho tài khoản rác > 50 triệu và dùng chung IP trong 24h qua..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
          />
          <button
            onClick={handleGenerateAiCypher}
            disabled={isAiGenerating || !aiRequirement.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md whitespace-nowrap"
          >
            {isAiGenerating ? <Zap className="w-4 h-4 animate-spin" /> : <Code2 className="w-4 h-4" />}
            <span>{isAiGenerating ? 'Đang viết Cypher...' : 'Viết Cypher Bằng AI'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Catalog List (Left) & Cypher Code Editor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Catalog List (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Thư Viện Câu Lệnh Mẫu ({CYPHER_QUERIES.length})
          </h3>
          <div className="space-y-2">
            {CYPHER_QUERIES.map((q) => {
              const isSelected = selectedQuery.id === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuery(q)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-emerald-950/30 border-emerald-500/80 text-white shadow-md'
                      : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400">[{q.category}]</span>
                    <span className="text-[10px] text-slate-400 font-mono">Avg: {q.executionTimeAvg}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{q.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{q.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cypher Code Editor & Execution Output (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Editor Header & Control */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{selectedQuery.category}</span>
                <h3 className="text-base font-bold text-slate-100">{selectedQuery.title}</h3>
              </div>
              <button
                onClick={handleExecuteCypher}
                disabled={isExecuting}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                {isExecuting ? <Zap className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isExecuting ? 'Đang Thực Thi...' : 'Chạy Truy Vấn Cypher'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-100">Mục đích nghiệp vụ:</strong> {selectedQuery.businessPurpose}
            </p>

            {/* Code Textarea */}
            <div className="relative">
              <textarea
                value={cypherCode}
                onChange={(e) => setCypherCode(e.target.value)}
                rows={9}
                className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 leading-relaxed shadow-inner"
              />
            </div>
          </div>

          {/* Execution Result Panel */}
          {executionResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">Kết Quả Chạy Thực Thi (Graph Query Results)</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span>Thời gian: <strong className="text-emerald-400">{executionResult.executionTimeMs}ms</strong></span>
                  <span>Nút quét: <strong className="text-blue-400">{executionResult.nodesScanned}</strong></span>
                  <span>Mẫu khớp: <strong className="text-amber-400">{executionResult.matchedPathsCount}</strong></span>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300">
                      <th className="p-2.5">Ring ID</th>
                      <th className="p-2.5">Nút Thắt (Entity)</th>
                      <th className="p-2.5">Danh Sách CIFs Liên Quan</th>
                      <th className="p-2.5">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {executionResult.dataRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/50">
                        <td className="p-2.5 text-amber-400 font-bold">{row.ring_id}</td>
                        <td className="p-2.5 text-blue-300">{row.entity}</td>
                        <td className="p-2.5 text-slate-200">{Array.isArray(row.cifs) ? row.cifs.join(', ') : row.cifs}</td>
                        <td className="p-2.5 text-red-400 font-bold">{row.risk_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
