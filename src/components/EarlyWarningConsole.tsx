import React, { useState } from 'react';
import { 
  BellRing, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Play, 
  Pause, 
  RefreshCw, 
  Eye, 
  Lock, 
  Video, 
  Send,
  Zap,
  Radio
} from 'lucide-react';
import { EARLY_WARNING_ALERTS } from '../data/mockData';
import { EarlyWarningAlert } from '../types';

export const EarlyWarningConsole: React.FC = () => {
  const [alerts, setAlerts] = useState<EarlyWarningAlert[]>(EARLY_WARNING_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<EarlyWarningAlert | null>(alerts[0]);
  const [isSimulatingStream, setIsSimulatingStream] = useState<boolean>(true);

  const handleActionStatus = (alertId: string, newStatus: 'ACTIONED' | 'FALSE_POSITIVE' | 'INVESTIGATING') => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: newStatus } : a));
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const simulateNewAlert = () => {
    const newId = `ALT-2026-00${alerts.length + 1}`;
    const newAlert: EarlyWarningAlert = {
      id: newId,
      timestamp: new Date().toLocaleTimeString('vi-VN') + ' - Today',
      ringId: 'ring-synthetic-101',
      ringName: 'Phát hiện eKYC Mới Trùng IP Proxy & Device IMEI',
      severity: 'CRITICAL',
      triggeredRule: 'NEW_EKYC_SHARED_DEVICE_WARNING',
      impactAmount: 500000000,
      matchedNodes: ['CIF-NEW-991', 'IMEI-SHARED-998', '113.161.45.99'],
      status: 'NEW',
      rootCause: 'Khách hàng mới CIF-NEW-991 vừa thực hiện đăng ký mở hạn mức vay 500tr VND trên thiết bị IMEI-SHARED-998 đã bị gắn cờ Đen.',
      suggestedAction: 'Khóa tài khoản khoản vay ngay lập tức và yêu cầu video call sinh trắc học trực tiếp.'
    };
    setAlerts(prev => [newAlert, ...prev]);
    setSelectedAlert(newAlert);
  };

  return (
    <div className="space-y-6 py-2">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BellRing className="w-6 h-6 text-red-400" />
            <span>Real-Time Fraud Alert Console (Hệ Thống Cảnh Báo Sớm Thời Gian Thực)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Giám sát luồng giao dịch & eKYC liên tục qua quy tắc Graph Pattern Matcher (Cypher Event Stream)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-xl">
            <Radio className="w-3.5 h-3.5 animate-ping text-emerald-400" />
            <span>Cypher Engine Active</span>
          </div>
          <button
            onClick={simulateNewAlert}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Giả Lập Cảnh Báo Mới</span>
          </button>
        </div>
      </div>

      {/* Grid: Alert List (Left) & Alert Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Alert Stream List (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Danh sách Cảnh báo Real-time ({alerts.length})
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Live Ingestion</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {alerts.map((alt) => {
              const isSelected = selectedAlert?.id === alt.id;
              return (
                <div
                  key={alt.id}
                  onClick={() => setSelectedAlert(alt)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500 shadow-md'
                      : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{alt.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      alt.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {alt.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 leading-snug">
                    {alt.ringName}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{alt.timestamp}</span>
                    <span className={`font-semibold ${
                      alt.status === 'NEW' ? 'text-red-400 animate-pulse' :
                      alt.status === 'ACTIONED' ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      [{alt.status}]
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Alert Details & Mitigation Actions (7 cols) */}
        {selectedAlert ? (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">{selectedAlert.id} • {selectedAlert.timestamp}</span>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">{selectedAlert.ringName}</h3>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                selectedAlert.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {selectedAlert.severity} SEVERITY
              </span>
            </div>

            {/* Triggered Rule & Root Cause */}
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Quy tắc Graph Kích Hoạt: {selectedAlert.triggeredRule}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedAlert.rootCause}
                </p>
              </div>

              {/* Matched Nodes */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Các Nút & Mắt xích Liên Quan (Matched Graph Pattern):
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedAlert.matchedNodes.map((node, idx) => (
                    <span key={idx} className="bg-slate-800 border border-slate-700 text-blue-300 text-xs font-mono px-2.5 py-1 rounded-lg">
                      {node}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Action */}
              <div className="bg-blue-950/20 border border-blue-900/40 p-3.5 rounded-xl text-xs space-y-1">
                <span className="font-bold text-blue-300 block">Khuyến nghị xử lý ngay (Recommended Action):</span>
                <p className="text-slate-300">{selectedAlert.suggestedAction}</p>
              </div>
            </div>

            {/* Mitigation Action Buttons */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Thực thi Tác vụ Phòng vệ Ngân hàng (Mitigation Action):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleActionStatus(selectedAlert.id, 'ACTIONED')}
                  className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Khóa Tạm Thời Tài Khoản</span>
                </button>

                <button
                  onClick={() => handleActionStatus(selectedAlert.id, 'ACTIONED')}
                  className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Yêu cầu Video eKYC 3D</span>
                </button>

                <button
                  onClick={() => handleActionStatus(selectedAlert.id, 'FALSE_POSITIVE')}
                  className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer border border-slate-700"
                >
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Báo Cáo False Positive</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
            Chọn một cảnh báo ở danh sách bên trái để xem phân tích chi tiết root cause.
          </div>
        )}

      </div>

    </div>
  );
};
