import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { BarChart3, TrendingUp, ShieldCheck, DollarSign, Clock, Target } from 'lucide-react';
import { ANALYTICS_DATA } from '../data/mockData';

export const AnalyticsDashboard: React.FC = () => {
  const COLORS = ['#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6'];

  return (
    <div className="space-y-6 py-2">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Visual Risk & ROI Analytics Dashboard (Biểu Đồ Trực Quan Hóa Hạn Chế Gian Lận)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Thống kê tổng quan tỷ lệ phát hiện nhóm gian lận, số tiền ngăn chặn thất thoát và hiệu quả vận hành Knowledge Graph.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Tiền Ngăn Chặn Thất Thoát (T03/2026)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">45.2 Tỷ VND</div>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +340% so với Rules Engine
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Độ trễ Phát hiện (Graph Traversal)</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black font-mono text-blue-400">14.2 ms</div>
          <p className="text-[11px] text-slate-400">Thời gian thực ngay tại eKYC session</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Tỷ lệ Dương tính Giả (False Positive)</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-purple-400">1.2 %</div>
          <p className="text-[11px] text-emerald-400">Giảm 85% phiền hà cho khách hàng thật</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Số Fraud Rings Đã Bắt Giữ</span>
            <Target className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-black font-mono text-red-400">115 Rings</div>
          <p className="text-[11px] text-slate-400">Gồm 420 tài khoản rác bị phong tỏa</p>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Prevented Losses Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100">
              Giá Trị Thiệt Hại Ngăn Chặn Theo Tháng (Tỷ VND)
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Traditional vs Graph</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA.monthlyPreventedLosses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="traditional" name="Rules Engine Truyền Thống" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="graphIntelligence" name="Knowledge Graph Intelligence" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud Type Distribution Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-100">
            Tỷ Lệ Các Loại Gian Lận Nhóm (Fraud Types)
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ANALYTICS_DATA.fraudTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="percentage"
                >
                  {ANALYTICS_DATA.fraudTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {ANALYTICS_DATA.fraudTypes.map((ft, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                <span className="text-slate-300 truncate">{ft.name} ({ft.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
