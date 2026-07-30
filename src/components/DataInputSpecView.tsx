import React, { useState } from 'react';
import { 
  Database, 
  FileSpreadsheet, 
  Layers, 
  ShieldAlert, 
  Smartphone, 
  CreditCard, 
  Building2, 
  Globe, 
  CheckCircle2, 
  Info,
  Key,
  Fingerprint,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const DataInputSpecView: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>('synthetic');

  const problemGroups = [
    {
      id: 'synthetic',
      title: '1. Synthetic Identity & Device Fingerprint Ring',
      icon: Smartphone,
      color: 'border-blue-500 text-blue-400 bg-blue-500/10',
      description: 'Mô phỏng gian lận gom giấy tờ CCCD/CMND giả, dùng máy ảo/máy jailbreak đổi IP Proxy để vay tiêu dùng nhanh eKYC.',
      inputSources: [
        {
          category: 'Logs eKYC Sinh Trắc Học',
          fields: [
            { name: 'cif_id', type: 'String', example: 'CIF-9011', desc: 'Mã định danh khách hàng duy nhất' },
            { name: 'national_id', type: 'String', example: '001092001111', desc: 'Số CCCD 12 chữ số' },
            { name: 'liveness_score', type: 'Float', example: '0.982', desc: 'Điểm khớp khuôn mặt 3D' },
            { name: 'ocr_confidence', type: 'Float', example: '99.1%', desc: 'Độ chính xác OCR giấy tờ' },
            { name: 'ekyc_timestamp', type: 'Timestamp', example: '2026-03-01 10:15:22', desc: 'Thời gian hoàn tất eKYC' }
          ]
        },
        {
          category: 'Thiết Bị & Fingerprint Mobile',
          fields: [
            { name: 'device_imei', type: 'String', example: '358991029384751', desc: 'Mã IMEI / Vendor ID thiết bị' },
            { name: 'device_model', type: 'String', example: 'iPhone 15 Pro Max', desc: 'Tên dòng máy' },
            { name: 'os_version', type: 'String', example: 'iOS 18.2', desc: 'Phiên bản hệ điều hành' },
            { name: 'is_jailbroken', type: 'Boolean', example: 'true', desc: 'Cảnh báo thiết bị đã Root/Jailbreak' },
            { name: 'screen_res', type: 'String', example: '1290x2796', desc: 'Độ phân giải màn hình' }
          ]
        },
        {
          category: 'Mạng & Hạ Tầng Kết Nối',
          fields: [
            { name: 'ip_address', type: 'String', example: '113.161.45.99', desc: 'Địa chỉ IPv4/v6 session' },
            { name: 'is_proxy_vpn', type: 'Boolean', example: 'true', desc: 'Phát hiện IP qua Proxy/VPN' },
            { name: 'subnet', type: 'String', example: '113.161.45.0/24', desc: 'Dải ISP mạng' },
            { name: 'geo_location', type: 'String', example: '10.7769, 106.7009', desc: 'Toạ độ GPS eKYC' }
          ]
        }
      ]
    },
    {
      id: 'mule',
      title: '2. Money Mule Network & Fast Circular Flow',
      icon: CreditCard,
      color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
      description: 'Mô phỏng mạng lưới tài khoản rác nhận tiền lừa đảo, chuyển tiền vòng tròn tốc độ cao (10-15 phút) để xé nhỏ dòng tiền.',
      inputSources: [
        {
          category: 'Chuyển Tiền NAPAS 247 & Interbank',
          fields: [
            { name: 'tx_id', type: 'String', example: 'TXN-20260312-8821', desc: 'Mã giao dịch duy nhất' },
            { name: 'source_acc', type: 'String', example: '102938401', desc: 'Số tài khoản chuyển đi' },
            { name: 'target_acc', type: 'String', example: '102938402', desc: 'Số tài khoản nhận' },
            { name: 'amount_vnd', type: 'Float', example: '500,000,000', desc: 'Số tiền giao dịch (VND)' },
            { name: 'tx_timestamp', type: 'Timestamp', example: '2026-03-12 14:00:10.120', desc: 'Thời gian chính xác tới millisecond' },
            { name: 'channel', type: 'String', example: 'NAPAS_247_MOBILE', desc: 'Kênh chuyển tiền' }
          ]
        },
        {
          category: 'Hồ Sơ & Vòng Đời Tài Khoản',
          fields: [
            { name: 'acc_created_date', type: 'Date', example: '2026-02-28', desc: 'Ngày mở tài khoản' },
            { name: 'kyc_level', type: 'String', example: 'EKYC_BIO_2345', desc: 'Cấp độ xác thực NHNN QĐ 2345' },
            { name: 'daily_limit', type: 'Float', example: '1,000,000,000', desc: 'Hạn mức giao dịch ngày' },
            { name: 'status', type: 'String', example: 'ACTIVE_SUSPICIOUS', desc: 'Trạng thái giám sát' }
          ]
        }
      ]
    },
    {
      id: 'stacking',
      title: '3. Loan Stacking & Shell Company Network',
      icon: Building2,
      color: 'border-amber-500 text-amber-400 bg-amber-500/10',
      description: 'Mô phỏng liên minh các công ty ma nộp hồ sơ vay giải ngân song song tại nhiều chi nhánh bằng cùng 1 Bất động sản thế chấp.',
      inputSources: [
        {
          category: 'Cơ Sở Dữ Liệu Đăng Ký Kinh Doanh (ĐKKD)',
          fields: [
            { name: 'tax_code', type: 'String', example: '031901111', desc: 'Mã số thuế doanh nghiệp' },
            { name: 'company_name', type: 'String', example: 'Công ty TNHH Vận Tải An Phát', desc: 'Tên pháp nhân đăng ký' },
            { name: 'capital_vnd', type: 'Float', example: '2,000,000,000', desc: 'Vốn điều lệ kê khai' },
            { name: 'legal_rep_cif', type: 'String', example: 'CIF-7011', desc: 'CIF người đại diện pháp luật' },
            { name: 'establishment_date', type: 'Date', example: '2025-11-10', desc: 'Ngày thành lập (thường < 6 tháng)' }
          ]
        },
        {
          category: 'Hồ Sơ Vay & Bất Động Sản Thế Chấp',
          fields: [
            { name: 'loan_app_id', type: 'String', example: 'LOAN-2026-88', desc: 'Mã hồ sơ đề nghị cấp tín dụng' },
            { name: 'requested_amount', type: 'Float', example: '12,000,000,000', desc: 'Số tiền đề nghị vay (VND)' },
            { name: 'collateral_address', type: 'String', example: 'Lô B2, KCN Mỹ Phước, Bến Cát', desc: 'Địa chỉ tài sản thế chấp' },
            { name: 'address_hash', type: 'String', example: 'PROPERTY-BD-9912', desc: 'Mã băm chuẩn hóa địa chỉ BĐS' },
            { name: 'appraisal_value', type: 'Float', example: '15,000,000,000', desc: 'Giá trị định giá tài sản' }
          ]
        }
      ]
    }
  ];

  const activeSpec = problemGroups.find(g => g.id === activeGroup) || problemGroups[0];

  return (
    <div className="space-y-6 py-2">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Đặc Tả Nghiệp Vụ Bài Toán & Dữ Liệu Đầu Vào Demo (Data Input Profiling)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Chi tiết các nguồn dữ liệu giao dịch, eKYC logs, cấu hình thiết bị, đăng ký doanh nghiệp và tham chiếu CIC làm đầu vào cho Graph Engine.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {problemGroups.map((g) => {
          const Icon = g.icon;
          const isSelected = activeGroup === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'bg-slate-800 border-blue-500 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg border ${g.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs text-slate-100">{g.title}</h3>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {g.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Spec Detail Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-4 space-y-1">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            Chi Tiết Đặc Tả Đầu Vào Dữ Liệu (Input Specifications)
          </span>
          <h3 className="text-lg font-bold text-slate-100">{activeSpec.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{activeSpec.description}</p>
        </div>

        {/* Input Data Sources Table Grid */}
        <div className="space-y-6">
          {activeSpec.inputSources.map((source, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>{source.category}</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                      <th className="p-3 font-semibold font-mono w-1/4">Tên Trường (Field Name)</th>
                      <th className="p-3 font-semibold font-mono w-1/6">Kiểu Dữ Liệu</th>
                      <th className="p-3 font-semibold font-mono w-1/4 text-emerald-400">Ví Dụ Mẫu (Sample Value)</th>
                      <th className="p-3 font-semibold w-1/3">Mô Tả Ý Nghĩa Nghiệp Vụ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {source.fields.map((f, fIdx) => (
                      <tr key={fIdx} className="hover:bg-slate-800/40">
                        <td className="p-3 font-mono text-blue-400 font-bold">{f.name}</td>
                        <td className="p-3 font-mono text-amber-300">{f.type}</td>
                        <td className="p-3 font-mono text-emerald-300 bg-slate-950/40">{f.example}</td>
                        <td className="p-3 text-slate-300">{f.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
