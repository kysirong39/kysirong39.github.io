import React, { useState } from 'react';
import { 
  Server, 
  Workflow, 
  Database, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Layers, 
  ArrowRight, 
  Bot, 
  Terminal, 
  BellRing, 
  CheckCircle2,
  GitBranch,
  Network
} from 'lucide-react';

export const ArchitectureWorkflow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const workflowSteps = [
    {
      step: 1,
      title: '1. Ingestion Layer (Thu thập Dữ liệu Đa nguồn)',
      icon: Server,
      color: 'from-blue-600 to-indigo-600',
      shortDesc: 'Thu thập eKYC, Giao dịch Chuyển tiền, Thiết bị Mobile, ĐKKD & CIC.',
      detail: `Luồng dữ liệu được thu thập qua các kênh:
• Core Banking & Payment Gateways: Lắng nghe sự kiện chuyển tiền NAPAS 247, Interbank qua Kafka Topic/RabbitMQ real-time.
• Mobile Banking eKYC Stream: Đẩy thông tin Device Fingerprint, IMEI, OS, Jailbreak, IP Proxy & Liveness score ngay khi khách hàng thực hiện đăng ký/mở hạn mức.
• CSDL Nội bộ & Bên ngoài: Đồng bộ định kỳ thông tin Đăng ký Kinh doanh (Doanh nghiệp ma), Danh sách Đen NHNN (SIMO), và Báo cáo CIC.`
    },
    {
      step: 2,
      title: '2. ETL & Graph Schema Transformer (Chuẩn hóa & Chuẩn định danh Entity)',
      icon: GitBranch,
      color: 'from-indigo-600 to-purple-600',
      shortDesc: 'Entity Resolution, Băm chuẩn hóa địa chỉ BĐS & Tạo Hashing Thiết bị.',
      detail: `Tiền xử lý và biến đổi bản ghi thành đồ thị (Graph Transformation):
• Address Normalization: Chuẩn hóa xâu địa chỉ BĐS/Văn phòng về mã băm Hash Address duy nhất để phát hiện trùng lặp văn phòng ảo.
• Entity Resolution: Định danh duy nhất Khách hàng (CIF/CCCD), Số điện thoại chuẩn E.164, IP Subnet.
• Map Relationship: Tạo các mối quan hệ (Edges) như HAS_DEVICE, TRANSFERRED_TO, REGISTERED_WITH_IP, DIRECTOR_OF.`
    },
    {
      step: 3,
      title: '3. Neo4j Graph Database Cluster (Lưu trữ Đồ thị Tri thức)',
      icon: Database,
      color: 'from-emerald-600 to-teal-600',
      shortDesc: 'Lưu trữ in-memory, lập chỉ mục Cypher Index & Thuật toán Đồ thị (GDS).',
      detail: `Lưu trữ & Truy vấn Đồ thị Tốc độ Cao:
• Distributed Neo4j / Memgraph Enterprise Cluster: Lưu trữ toàn bộ Nút (Nodes) và Đường nối (Edges) trên bộ nhớ RAM.
• Cypher Query Engine: Tối ưu hóa truy vấn k-Hop traversal (O(k)) với thời gian phản hồi dưới 20ms.
• Graph Data Science (GDS) Plugin: Chạy thuật toán phát hiện cụm (Louvain Community Detection) và đo lường mức độ trung tâm (Degree Centrality).`
    },
    {
      step: 4,
      title: '4. Graph Pattern Matcher & Scoring Engine (Nhận diện Mẫu Gian lận)',
      icon: Cpu,
      color: 'from-amber-600 to-orange-600',
      shortDesc: 'Khớp câu lệnh Cypher Stream, tính Graph Risk Penalty & Augment Credit Score.',
      detail: `Động cơ Phân tích & Chấm điểm Rủi ro:
• Cypher Event Stream Engine: So khớp các mẫu đồ thị phức tạp (dùng chung IMEI, chuyển tiền vòng tròn A->B->C->A, thế chấp trùng BĐS).
• Graph-Augmented Scoring Engine: Trừ điểm rủi ro đồ thị (Graph Risk Penalty) trực tiếp vào điểm tín dụng truyền thống CIC, triệt tiêu lỗ hổng "hồ sơ CIC đẹp nằm trong mạng gian lận".`
    },
    {
      step: 5,
      title: '5. Consumption & Action Layer (Ứng dụng & Cảnh báo Tức thì)',
      icon: ShieldCheck,
      color: 'from-red-600 to-pink-600',
      shortDesc: 'Console Cảnh báo Real-time, Auto Debit Hold, Visual Graph Explorer & Gemini AI Analyst.',
      detail: `Lớp Ứng dụng & Tác vụ Bảo vệ Ngân hàng:
• Real-time Early Warning Console: Đẩy thông báo cảnh báo khẩn cấp tới Phòng Phòng chống Gian lận (Fraud Operations).
• Automatic Mitigation API: Tự động khóa chiều đi (Debit Hold), hủy giải ngân tín dụng hoặc bắt buộc xác thực Video Call eKYC 3D.
• Interactive Graph Explorer & Gemini AI Innovation Analyst: Cho phép cán bộ phân tích điều tra trực quan mạng lưới gian lận và nhờ AI viết câu lệnh Cypher tự động.`
    }
  ];

  const currentStepInfo = workflowSteps.find(s => s.step === selectedStep) || workflowSteps[0];

  return (
    <div className="space-y-6 py-2">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Kiến Trúc Tổng Thể & Luồng Xử Lý Dữ Liệu (System Architecture & End-to-End Workflow)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Mô tả chi tiết 5 công đoạn từ Thu thập Dữ liệu Stream → Đồ thị Tri thức Neo4j → Thuật toán Graph Intelligence → Cảnh báo Real-time & Gemini AI Analyst.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Workflow Steps Pipeline Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Luồng Dữ Liệu Khai Phá Knowledge Graph (5-Stage Pipeline)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {workflowSteps.map((st) => {
            const Icon = st.icon;
            const isSelected = selectedStep === st.step;
            return (
              <div
                key={st.step}
                onClick={() => setSelectedStep(st.step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 relative ${
                  isSelected
                    ? 'bg-slate-800 border-blue-500 shadow-xl shadow-blue-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-white bg-gradient-to-r ${st.color}`}>
                    0{st.step}
                  </span>
                  {isSelected && <Activity className="w-4 h-4 text-blue-400 animate-pulse" />}
                </div>

                <h4 className="font-bold text-xs text-slate-100 leading-snug">
                  {st.title.split('. ')[1]}
                </h4>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {st.shortDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Specification */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className={`p-3 rounded-xl text-white bg-gradient-to-r ${currentStepInfo.color}`}>
            <currentStepInfo.icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
              Chi Tiết Công Đoạn {currentStepInfo.step} / 5
            </span>
            <h3 className="text-lg font-bold text-slate-100">{currentStepInfo.title}</h3>
          </div>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
          {currentStepInfo.detail}
        </div>
      </div>

      {/* Architecture System Map Diagram */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Network className="w-4 h-4 text-indigo-400" />
          <span>Sơ Đồ Phân Tầng Công Nghệ Hệ Thống (Tech Stack Component Map)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-blue-400 block border-b border-slate-800 pb-1.5">1. DATA INGESTION</span>
            <p className="text-slate-300 font-mono text-[11px]">• Apache Kafka Stream</p>
            <p className="text-slate-300 font-mono text-[11px]">• Core Banking API CDC</p>
            <p className="text-slate-300 font-mono text-[11px]">• eKYC SDK Event Collector</p>
            <p className="text-slate-300 font-mono text-[11px]">• NAPAS 247 Ingestion</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-400 block border-b border-slate-800 pb-1.5">2. GRAPH ENGINE</span>
            <p className="text-slate-300 font-mono text-[11px]">• Neo4j Enterprise Cluster</p>
            <p className="text-slate-300 font-mono text-[11px]">• Cypher Language Engine</p>
            <p className="text-slate-300 font-mono text-[11px]">• APOC Core Procedures</p>
            <p className="text-slate-300 font-mono text-[11px]">• GDS Graph Data Science</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block border-b border-slate-800 pb-1.5">3. AI & SCORING</span>
            <p className="text-slate-300 font-mono text-[11px]">• Gemini 3.6 Flash Model</p>
            <p className="text-slate-300 font-mono text-[11px]">• Degree Centrality Scorer</p>
            <p className="text-slate-300 font-mono text-[11px]">• Louvain Community Risk</p>
            <p className="text-slate-300 font-mono text-[11px]">• Graph Credit Scoring API</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block border-b border-slate-800 pb-1.5">4. DASHBOARD & ACTIONS</span>
            <p className="text-slate-300 font-mono text-[11px]">• Interactive Graph Explorer</p>
            <p className="text-slate-300 font-mono text-[11px]">• Real-time Alert Console</p>
            <p className="text-slate-300 font-mono text-[11px]">• Auto Debit Hold Webhook</p>
            <p className="text-slate-300 font-mono text-[11px]">• AI Innovation Analyst Chat</p>
          </div>

        </div>
      </div>

    </div>
  );
};
