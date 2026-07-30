import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Info, 
  HelpCircle,
  Network,
  Cpu
} from 'lucide-react';

export const RiskScoringEngine: React.FC = () => {
  // Simulator Sliders State
  const [baseCicScore, setBaseCicScore] = useState<number>(710); // Good traditional CIC score
  const [sharedDeviceCount, setSharedDeviceCount] = useState<number>(3); // Used on 3 devices
  const [sharedIpProxy, setSharedIpProxy] = useState<boolean>(true); // Using VPN/Proxy IP
  const [degreeCentrality, setDegreeCentrality] = useState<number>(6); // Connected to 6 entity nodes
  const [louvainCommunityRisk, setLouvainCommunityRisk] = useState<number>(85); // Community risk 85%

  // Calculations
  // Traditional Score (Scale 300 - 850)
  const traditionalScore = baseCicScore;
  const traditionalGrade = traditionalScore >= 700 ? 'A (Tốt - Duyệt Thẳng)' : traditionalScore >= 600 ? 'B (Khá)' : 'C (Rủi ro)';
  const traditionalApproved = traditionalScore >= 650;

  // Graph Penalty Calculation
  const devicePenalty = (sharedDeviceCount - 1) * 45; // 45 pts per extra device
  const ipPenalty = sharedIpProxy ? 60 : 0;
  const centralityPenalty = degreeCentrality * 12;
  const louvainPenalty = Math.round((louvainCommunityRisk / 100) * 120);

  const totalGraphPenalty = devicePenalty + ipPenalty + centralityPenalty + louvainPenalty;
  
  // Graph Augmented Score (FICO Equivalent minus Graph Risk Penalty)
  const graphAugmentedScore = Math.max(300, Math.round(traditionalScore - totalGraphPenalty));
  const graphGrade = graphAugmentedScore >= 680 ? 'Grade A (An Toàn)' : graphAugmentedScore >= 580 ? 'Grade B (Theo Dõi)' : 'Grade D (RỦI RO CAO - TỪ CHỐI)';
  const graphApproved = graphAugmentedScore >= 620;

  return (
    <div className="space-y-6 py-2">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Graph-Augmented Risk Scoring & Credit Scoring Engine
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Mô hình chấm điểm tín dụng kết hợp chỉ số cấu trúc đồ thị (Graph Topology) để triệt tiêu lỗ hổng "Hồ sơ CIC đẹp nằm trong mạng lưới gian lận".
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Slider Controls (Left 6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>Cấu Hình Giả Lập Thông Tin Khách Hàng</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Simulated Applicant</span>
          </div>

          {/* Slider 1: Traditional CIC */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">1. Điểm Tín Dụng Truyền Thống CIC (Base FICO Score):</span>
              <span className="font-mono font-bold text-blue-400">{baseCicScore} / 850</span>
            </div>
            <input
              type="range"
              min={500}
              max={800}
              step={5}
              value={baseCicScore}
              onChange={(e) => setBaseCicScore(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Slider 2: Shared Devices */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">2. Số lượng CIF dùng chung Thiết bị (IMEI Reuse):</span>
              <span className="font-mono font-bold text-amber-400">{sharedDeviceCount} CIFs</span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={sharedDeviceCount}
              onChange={(e) => setSharedDeviceCount(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">Trừ {devicePenalty} điểm rủi ro đồ thị do dùng chung IMEI</p>
          </div>

          {/* Checkbox 3: IP Proxy */}
          <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">3. Phát hiện IP Proxy / VPN eKYC Session</span>
              <span className="text-[11px] text-slate-400">Trừ 60 điểm rủi ro hệ thống</span>
            </div>
            <input
              type="checkbox"
              checked={sharedIpProxy}
              onChange={(e) => setSharedIpProxy(e.target.checked)}
              className="w-4 h-4 accent-red-500 cursor-pointer"
            />
          </div>

          {/* Slider 4: Degree Centrality */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">4. Chỉ số Trung tâm Đồ thị (Degree Centrality):</span>
              <span className="font-mono font-bold text-purple-400">{degreeCentrality} Nodes</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={degreeCentrality}
              onChange={(e) => setDegreeCentrality(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          {/* Slider 5: Louvain Community Risk */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">5. Tỷ lệ Lây nhiễm Cụm Louvain (Cluster Risk %):</span>
              <span className="font-mono font-bold text-red-400">{louvainCommunityRisk}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={louvainCommunityRisk}
              onChange={(e) => setLouvainCommunityRisk(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Results Comparison Box (Right 6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Traditional Credit Outcome */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                1. Đánh giá Tín dụng Truyền thống (Traditional Scoring)
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                RDBMS Static Rules
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-black font-mono text-slate-100">{traditionalScore}</span>
                <span className="text-xs text-slate-400 ml-2">/ 850 pts</span>
                <p className="text-xs text-slate-300 mt-1">{traditionalGrade}</p>
              </div>
              <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-bold ${
                traditionalApproved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400'
              }`}>
                {traditionalApproved ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{traditionalApproved ? 'ĐỦ ĐIỀU KIỆN DUYỆT VAY' : 'TỪ CHỐI TÍN DỤNG'}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              ❌ Nhược điểm: Bỏ sót nguy cơ gian lận vì khách hàng chưa có lịch sử nợ xấu cá nhân trên CIC.
            </p>
          </div>

          {/* Graph Augmented Outcome */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-indigo-500/40 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>2. Đánh giá Kết hợp Graph Intelligence Score</span>
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-bold">
                Knowledge Graph Engine
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className={`text-3xl font-black font-mono ${
                  graphApproved ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {graphAugmentedScore}
                </span>
                <span className="text-xs text-slate-400 ml-2">/ 850 pts</span>
                <p className="text-xs font-semibold text-slate-200 mt-1">{graphGrade}</p>
              </div>

              <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-bold shadow-lg ${
                graphApproved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {graphApproved ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5 text-red-400 animate-bounce" />}
                <span>{graphApproved ? 'DUYỆT VAY AN TOÀN' : 'TỪ CHỐI DUYỆT (GÓC TẠO GIAN LẬN)'}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
              <div className="text-slate-300 font-bold mb-1">Chi tiết Giảm điểm Rủi ro (Graph Penalty Breakdown):</div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>- Dùng chung Thiết bị (IMEI):</span>
                <span className="font-mono text-red-400">-{devicePenalty} pts</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>- Mạng IP Proxy / VPN:</span>
                <span className="font-mono text-red-400">-{ipPenalty} pts</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>- Mật độ kết nối (Degree Centrality):</span>
                <span className="font-mono text-red-400">-{centralityPenalty} pts</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>- Mức lây nhiễm Cụm Louvain Fraud Cluster:</span>
                <span className="font-mono text-red-400">-{louvainPenalty} pts</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
