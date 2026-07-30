import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Target, 
  Layers, 
  Globe, 
  Zap, 
  Award,
  ChevronRight,
  Database
} from 'lucide-react';
import { TRADITIONAL_VS_GRAPH_COMPARISON, FRAUD_RING_SCENARIOS } from '../data/mockData';
import { DataInputSpecView } from './DataInputSpecView';

interface ExecutiveOverviewProps {
  onSelectScenario: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  onSelectScenario,
  setActiveTab
}) => {
  const [subView, setSubView] = useState<'overview' | 'inputs'>('overview');

  return (
    <div className="space-y-8 py-2">
      
      {/* Sub-navigation inside Tab 1 */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSubView('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subView === 'overview'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Báo Cáo Nghiệp Vụ & Bảng So Sánh
        </button>
        <button
          onClick={() => setSubView('inputs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            subView === 'inputs'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Chi Tiết Dữ Liệu Đầu Vào Demo</span>
        </button>
      </div>

      {subView === 'inputs' ? (
        <DataInputSpecView />
      ) : (
        <>
          {/* Banner / Hero Section */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden text-white">
            <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="relative z-10 space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Executive Report & Innovation Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Phát Hiện Nhóm Gian Lận Liên Quan (Fraud Rings) Bằng Knowledge Graph Trong Ngân Hàng
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Các tổ chức tội phạm tài chính hiện đại không còn hoạt động đơn lẻ. Chúng tổ chức thành các mạng lưới gian lận liên kết (Fraud Rings), lợi dụng việc chia sẻ thiết bị eKYC, địa chỉ ảo, SIM rác và tài khoản rác (Money Mules) nhằm vượt qua các quy tắc kiểm soát giao dịch truyền thống.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('graph-explorer')}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <span>Trải nghiệm Trực quan hóa Graph ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSubView('inputs')}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>Xem Đặc Tả Dữ Liệu Đầu Vào</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Key Takeaways (Các Điểm Đột Phá Cốt Lõi)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                  <Target className="w-4 h-4" />
                  <span>Phát hiện liên kết tiềm ẩn (Hidden Links)</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Knowledge Graph cho phép liên kết thông tin không cấu trúc & đa chiều (SĐT, IMEI, IP, CCCD, Địa chỉ, STK) để nhận diện nhóm gian lận dù các cá nhân không đứng tên chung.
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Cảnh báo thời gian thực dưới 20ms</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Duyệt đồ thị (Graph Traversal) hỗ trợ kiểm tra mối quan hệ 2-3 hop ngay tại thời điểm mở tài khoản eKYC hoặc chuyển tiền, ngăn chặn thất thoát trước khi giải ngân.
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>Nâng cấp Graph Credit Scoring</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Tích hợp chỉ số trung tâm đồ thị (Degree Centrality, Louvain Community) giúp phát hiện hồ sơ vay đẹp về CIC nhưng thực chất nằm trong cụm nguy cơ cao.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-400" />
                <span>So Sánh Chiến Lược: Rules Engine Truyền Thống vs. Knowledge Graph Analytics</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Đối chiếu năng lực xử lý bài toán Fraud Ring trong hệ thống ngân hàng hiện đại
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                    <th className="p-3 font-semibold w-1/5">Tiêu chí so sánh</th>
                    <th className="p-3 font-semibold w-2/5 text-amber-300">Rules Engine RDBMS Truyền Thống</th>
                    <th className="p-3 font-semibold w-2/5 text-blue-300">Knowledge Graph Analytics (Neo4j / Graph DB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {TRADITIONAL_VS_GRAPH_COMPARISON.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-medium text-slate-200 bg-slate-900/50">{item.criteria}</td>
                      <td className="p-3 text-slate-400 leading-relaxed bg-amber-950/10">{item.traditionalRules}</td>
                      <td className="p-3 text-slate-200 leading-relaxed bg-blue-950/10 font-medium">{item.knowledgeGraph}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3 Real-World Scenario Highlights */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-100">
                  3 Kịch Bản Gian Lận Điển Hình (Demo Fraud Ring Scenarios)
                </h3>
                <p className="text-xs text-slate-400">Chọn kịch bản để khám phá trực quan trên sơ đồ đồ thị</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {FRAUD_RING_SCENARIOS.map((sc) => (
                <div
                  key={sc.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 space-y-3.5 transition-all shadow-md hover:shadow-blue-500/10 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        sc.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {sc.riskLevel} RISK
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {sc.nodesCount} Nodes • {sc.edgesCount} Edges
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 leading-snug">
                      {sc.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {sc.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Ước tính thiệt hại:</span>
                      <span className="font-bold text-red-400 font-mono">{sc.impactEstimateVND}</span>
                    </div>
                    <button
                      onClick={() => {
                        onSelectScenario(sc.id);
                        setActiveTab('graph-explorer');
                      }}
                      className="w-full mt-1 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Khám phá Sơ đồ Ring</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons & Opportunities for Vietnam Context */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-blue-900/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>Bài Học & Cơ Hội Cho Ngân Hàng Tại Việt Nam</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-300">
              <div className="space-y-2 bg-slate-900/70 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tuân thủ Quyết định 2345/QĐ-NHNN & Nghị định 13/ND-CP</span>
                </h4>
                <p className="leading-relaxed text-slate-300">
                  NHNN yêu cầu xác thực sinh trắc học cho giao dịch trên 10 triệu VND. Knowledge Graph kết hợp với dữ liệu sinh trắc học sẽ tạo thành lá chắn kép: vừa ngăn chặn tài khoản ảo eKYC, vừa phát hiện mạng lưới SIM rác chuyển tiền tự động.
                </p>
              </div>

              <div className="space-y-2 bg-slate-900/70 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Chia sẻ dữ liệu Fraud Ring liên ngân hàng (SIMO)</span>
                </h4>
                <p className="leading-relaxed text-slate-300">
                  Khi các ngân hàng Việt Nam liên kết graph dữ liệu tài khoản rác (Mule Accounts) hoặc thiết bị vi phạm thông qua giao thức bảo mật (Federated Graph Learning), gian lận rút tiền qua ngân hàng khác sẽ bị dập tắt ngay lập tức.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
