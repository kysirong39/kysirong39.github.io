import { 
  FraudRingScenario, 
  SchemaNodeDef, 
  SchemaEdgeDef, 
  CypherQueryItem, 
  EarlyWarningAlert,
  ComparisonItem
} from '../types';

export const SCHEMA_NODES: SchemaNodeDef[] = [
  {
    type: 'Customer',
    color: '#3B82F6', // Blue
    iconName: 'User',
    description: 'Thực thể Khách hàng cá nhân hoặc Doanh nghiệp (CIF)',
    properties: [
      { name: 'cif', type: 'String', example: 'CIF-882910', description: 'Mã định danh khách hàng duy nhất' },
      { name: 'fullName', type: 'String', example: 'Nguyễn Văn A', description: 'Họ và tên' },
      { name: 'nationalId', type: 'String', example: '001092837461', description: 'Số CCCD/CMND' },
      { name: 'riskScore', type: 'Float', example: '87.5', description: 'Điểm rủi ro tổng hợp (0 - 100)' },
      { name: 'kycStatus', type: 'String', example: 'VERIFIED_EKYC', description: 'Trạng thái định danh' }
    ]
  },
  {
    type: 'Account',
    color: '#10B981', // Green
    iconName: 'CreditCard',
    description: 'Tài khoản thanh toán, tài khoản tiết kiệm hoặc thẻ tín dụng',
    properties: [
      { name: 'accountNo', type: 'String', example: '1029384756', description: 'Số tài khoản ngân hàng' },
      { name: 'type', type: 'String', example: 'PAYMENT', description: 'Loại tài khoản' },
      { name: 'balance', type: 'Float', example: '450000000', description: 'Số dư hiện tại (VND)' },
      { name: 'createdDate', type: 'DateTime', example: '2026-01-15T08:30:00Z', description: 'Ngày mở tài khoản' }
    ]
  },
  {
    type: 'Device',
    color: '#8B5CF6', // Purple
    iconName: 'Smartphone',
    description: 'Thiết bị di động hoặc máy tính dùng đăng nhập Digital Banking',
    properties: [
      { name: 'deviceId', type: 'String', example: 'DEV-IMEI-99201', description: 'Fingerprint / IMEI thiết bị' },
      { name: 'deviceModel', type: 'String', example: 'iPhone 15 Pro Max', description: 'Model thiết bị' },
      { name: 'osVersion', type: 'String', example: 'iOS 18.2', description: 'Hệ điều hành' },
      { name: 'isJailbroken', type: 'Boolean', example: 'true', description: 'Cảnh báo root/jailbreak' }
    ]
  },
  {
    type: 'PhoneNumber',
    color: '#F59E0B', // Amber
    iconName: 'Phone',
    description: 'Số điện thoại đăng ký nhận OTP và liên lạc',
    properties: [
      { name: 'phone', type: 'String', example: '0988123456', description: 'Số điện thoại chuẩn E.164' },
      { name: 'isVoip', type: 'Boolean', example: 'true', description: 'Cảnh báo SĐT ảo VOIP/SIM rác' },
      { name: 'telecom', type: 'String', example: 'Viettel', description: 'Nhà mạng' }
    ]
  },
  {
    type: 'Email',
    color: '#EC4899', // Pink
    iconName: 'Mail',
    description: 'Địa chỉ Email nhận hóa đơn và thông báo',
    properties: [
      { name: 'email', type: 'String', example: 'user.fraud99@dispostable.com', description: 'Địa chỉ email' },
      { name: 'domainRiskScore', type: 'Float', example: '92.0', description: 'Điểm rủi ro domain mail ảo' }
    ]
  },
  {
    type: 'Address',
    color: '#6366F1', // Indigo
    iconName: 'MapPin',
    description: 'Địa chỉ thường trú, tạm trú hoặc địa chỉ nhận tài liệu',
    properties: [
      { name: 'fullAddress', type: 'String', example: 'Tầng 4, Tòa A, 123 Lê Lợi, Q1, TP.HCM', description: 'Địa chỉ đầy đủ' },
      { name: 'addressHash', type: 'String', example: 'HASH-ADDR-9921', description: 'Mã băm địa chỉ chuẩn hóa' },
      { name: 'isHighRiskZone', type: 'Boolean', example: 'true', description: 'Khu vực điểm nóng gian lận' }
    ]
  },
  {
    type: 'IPAddress',
    color: '#EF4444', // Red
    iconName: 'Globe',
    description: 'Địa chỉ IP truy cập ứng dụng Mobile/Internet Banking',
    properties: [
      { name: 'ip', type: 'String', example: '14.232.108.45', description: 'Địa chỉ IPv4/IPv6' },
      { name: 'isProxy', type: 'Boolean', example: 'true', description: 'Phát hiện VPN / Proxy / TOR' },
      { name: 'subnet', type: 'String', example: '14.232.108.0/24', description: 'Dải mạng IP' }
    ]
  },
  {
    type: 'Company',
    color: '#14B8A6', // Teal
    iconName: 'Building',
    description: 'Doanh nghiệp liên quan, công ty ma hoặc đối tác vay vốn',
    properties: [
      { name: 'taxCode', type: 'String', example: '0318992012', description: 'Mã số thuế doanh nghiệp' },
      { name: 'companyName', type: 'String', example: 'Công ty TNHH Đầu tư Thương mại Khang Thịnh', description: 'Tên công ty' },
      { name: 'capitalVND', type: 'Float', example: '2000000000', description: 'Vốn điều lệ' }
    ]
  }
];

export const SCHEMA_EDGES: SchemaEdgeDef[] = [
  {
    type: 'HAS_PHONE',
    sourceTypes: ['Customer'],
    targetTypes: ['PhoneNumber'],
    description: 'Khách hàng liên kết với số điện thoại đăng ký',
    properties: [{ name: 'linkedDate', type: 'Date', example: '2026-01-10' }]
  },
  {
    type: 'HAS_DEVICE',
    sourceTypes: ['Customer'],
    targetTypes: ['Device'],
    description: 'Thiết bị được sử dụng bởi khách hàng để đăng nhập App',
    properties: [{ name: 'firstUsed', type: 'DateTime', example: '2026-02-01T10:00:00Z' }, { name: 'trustStatus', type: 'String', example: 'NEW_DEVICE' }]
  },
  {
    type: 'HAS_ACCOUNT',
    sourceTypes: ['Customer'],
    targetTypes: ['Account'],
    description: 'Sở hữu tài khoản thanh toán / thẻ',
    properties: [{ name: 'role', type: 'String', example: 'PRIMARY_OWNER' }]
  },
  {
    type: 'TRANSFERRED_TO',
    sourceTypes: ['Account'],
    targetTypes: ['Account'],
    description: 'Giao dịch chuyển tiền giữa 2 tài khoản',
    properties: [
      { name: 'amount', type: 'Float', example: '150000000' },
      { name: 'timestamp', type: 'DateTime', example: '2026-03-12T14:22:10Z' },
      { name: 'channel', type: 'String', example: 'NAPAS_247' }
    ]
  },
  {
    type: 'REGISTERED_WITH_IP',
    sourceTypes: ['Customer'],
    targetTypes: ['IPAddress'],
    description: 'Khách hàng thực hiện eKYC/Đăng ký khoản vay qua IP này',
    properties: [{ name: 'sessionCount', type: 'Integer', example: '18' }]
  },
  {
    type: 'DIRECTOR_OF',
    sourceTypes: ['Customer'],
    targetTypes: ['Company'],
    description: 'Khách hàng làm Đại diện pháp luật / Giám đốc công ty',
    properties: [{ name: 'sharePercent', type: 'Float', example: '80.0' }]
  },
  {
    type: 'CO_APPLICANT',
    sourceTypes: ['Customer'],
    targetTypes: ['Customer'],
    description: 'Đứng tên chung trong khoản vay hoặc người bảo lãnh',
    properties: [{ name: 'relationType', type: 'String', example: 'BUSINESS_PARTNER' }]
  }
];

export const FRAUD_RING_SCENARIOS: FraudRingScenario[] = [
  {
    id: 'ring-synthetic-101',
    title: 'Nhóm Gian lận Danh tính Giả mạo & Trùng Thiết bị eKYC',
    titleEn: 'Synthetic Identity & Shared Device eKYC Loan Ring',
    category: 'Synthetic Identity',
    riskLevel: 'CRITICAL',
    description: '5 hồ sơ vay tín chấp tiêu chuẩn eKYC được mở bởi 5 cá nhân khác nhau nhưng dùng chung 1 mã IMEI iPhone 15, cùng 1 dải IP Proxy và trùng địa chỉ văn phòng ảo tại Q1 TP.HCM để chiếm đoạt tiền vay.',
    impactEstimateVND: '1,850,000,000 VND',
    nodesCount: 9,
    edgesCount: 14,
    keyDetectionRule: 'Biểu thức Graph: 1 Device hoặc IP liên kết với > 3 CIF mở hồ sơ vay mới trong vòng 48h.',
    suggestedAction: 'Tạm dừng ngắt nợ toàn bộ 5 hồ sơ, vô hiệu hóa tài khoản eKYC và yêu cầu xác thực khuôn mặt sinh trắc học video live tại phòng giao dịch.',
    nodes: [
      { id: 'c1', label: 'Customer', name: 'Trần Văn Mạnh', subText: 'CIF-9011 (Vay 400tr)', riskScore: 92, isFraudRingMember: true, ringId: 'ring-101', properties: { nationalId: '031092001111', created: '2026-03-01', riskScore: 92 } },
      { id: 'c2', label: 'Customer', name: 'Lê Thị Thu', subText: 'CIF-9012 (Vay 350tr)', riskScore: 89, isFraudRingMember: true, ringId: 'ring-101', properties: { nationalId: '031092002222', created: '2026-03-01', riskScore: 89 } },
      { id: 'c3', label: 'Customer', name: 'Hoàng Quốc Việt', subText: 'CIF-9013 (Vay 500tr)', riskScore: 95, isFraudRingMember: true, ringId: 'ring-101', properties: { nationalId: '031092003333', created: '2026-03-02', riskScore: 95 } },
      { id: 'c4', label: 'Customer', name: 'Phạm Minh Tuấn', subText: 'CIF-9014 (Vay 300tr)', riskScore: 88, isFraudRingMember: true, ringId: 'ring-101', properties: { nationalId: '031092004444', created: '2026-03-02', riskScore: 88 } },
      { id: 'd1', label: 'Device', name: 'IMEI-SHARED-998', subText: 'iPhone 15 Pro Max', riskScore: 98, isFraudRingMember: true, ringId: 'ring-101', properties: { imei: '358991029384751', os: 'iOS 18.2', isJailbroken: true } },
      { id: 'ip1', label: 'IPAddress', name: '113.161.45.99', subText: 'IP Proxy VPN Hotspot', riskScore: 90, isFraudRingMember: true, ringId: 'ring-101', properties: { ip: '113.161.45.99', isProxy: true, country: 'VN' } },
      { id: 'addr1', label: 'Address', name: 'Phòng 402, 88 Nguyễn Du, Q1', subText: 'Địa chỉ ảo đăng ký', riskScore: 85, isFraudRingMember: true, ringId: 'ring-101', properties: { addressHash: 'HASH-ADDR-9901' } },
      { id: 'p1', label: 'PhoneNumber', name: '0903881122', subText: 'SIM Rác Rút Gọn', riskScore: 82, isFraudRingMember: true, ringId: 'ring-101', properties: { phone: '0903881122', isVoip: true } },
      { id: 'p2', label: 'PhoneNumber', name: '0903881133', subText: 'SIM Rác Rút Gọn', riskScore: 80, isFraudRingMember: true, ringId: 'ring-101', properties: { phone: '0903881133', isVoip: true } },
    ],
    edges: [
      { id: 'e1', source: 'c1', target: 'd1', label: 'HAS_DEVICE', isSuspicious: true, properties: { firstUsed: '2026-03-01' } },
      { id: 'e2', source: 'c2', target: 'd1', label: 'HAS_DEVICE', isSuspicious: true, properties: { firstUsed: '2026-03-01' } },
      { id: 'e3', source: 'c3', target: 'd1', label: 'HAS_DEVICE', isSuspicious: true, properties: { firstUsed: '2026-03-02' } },
      { id: 'e4', source: 'c4', target: 'd1', label: 'HAS_DEVICE', isSuspicious: true, properties: { firstUsed: '2026-03-02' } },
      { id: 'e5', source: 'c1', target: 'ip1', label: 'REGISTERED_WITH_IP', isSuspicious: true, properties: { sessions: 12 } },
      { id: 'e6', source: 'c2', target: 'ip1', label: 'REGISTERED_WITH_IP', isSuspicious: true, properties: { sessions: 9 } },
      { id: 'e7', source: 'c3', target: 'ip1', label: 'REGISTERED_WITH_IP', isSuspicious: true, properties: { sessions: 15 } },
      { id: 'e8', source: 'c4', target: 'ip1', label: 'REGISTERED_WITH_IP', isSuspicious: true, properties: { sessions: 8 } },
      { id: 'e9', source: 'c1', target: 'addr1', label: 'HAS_ADDRESS', isSuspicious: true, properties: { type: 'OFFICE' } },
      { id: 'e10', source: 'c2', target: 'addr1', label: 'HAS_ADDRESS', isSuspicious: true, properties: { type: 'OFFICE' } },
      { id: 'e11', source: 'c3', target: 'addr1', label: 'HAS_ADDRESS', isSuspicious: true, properties: { type: 'OFFICE' } },
      { id: 'e12', source: 'c1', target: 'p1', label: 'HAS_PHONE', isSuspicious: false, properties: {} },
      { id: 'e13', source: 'c2', target: 'p2', label: 'HAS_PHONE', isSuspicious: false, properties: {} },
    ]
  },
  {
    id: 'ring-mule-102',
    title: 'Mạng Lưới Tài Khoản Rác Chuyển Tiền Vòng Tròn (Money Mule Ring)',
    titleEn: 'Circular Money Laundering & Mule Account Network',
    category: 'Money Mule Network',
    riskLevel: 'CRITICAL',
    description: 'Tiền thu bất chính (2.5 tỷ VND) từ một vụ lừa đảo mạng được phân tán qua 6 tài khoản rác (mule accounts) trong vòng 10 phút, tạo chuỗi giao dịch vòng tròn A -> B -> C -> D -> E -> A nhằm xé nhỏ dòng tiền & qua mặt hệ thống kiểm soát rửa tiền (AML) truyền thống.',
    impactEstimateVND: '2,500,000,000 VND',
    nodesCount: 7,
    edgesCount: 9,
    keyDetectionRule: 'Graph Pattern: Chuỗi chuyển tiền tự khép kín (Circular Flow) độ dài 3-6 nút có tổng thời gian giao dịch < 15 phút.',
    suggestedAction: 'Cảnh báo tự động khóa chiều đi (Debit Hold) toàn bộ chuỗi 6 tài khoản, gửi thông tin tới Trung tâm Cảnh báo Gian lận Ngân hàng Nhà nước (SIMO/NHNN).',
    nodes: [
      { id: 'a1', label: 'Account', name: 'STK: 102938401 (Lê Văn T)', subText: 'Tài khoản Gốc (Origin)', riskScore: 96, isFraudRingMember: true, ringId: 'ring-102', properties: { accountNo: '102938401', balance: 50000000, status: 'FLAGGED' } },
      { id: 'a2', label: 'Account', name: 'STK: 102938402 (Ngô Văn B)', subText: 'Mule Node 1', riskScore: 91, isFraudRingMember: true, ringId: 'ring-102', properties: { accountNo: '102938402', balance: 12000000, status: 'SUSPICIOUS' } },
      { id: 'a3', label: 'Account', name: 'STK: 102938403 (Đinh Thị C)', subText: 'Mule Node 2', riskScore: 89, isFraudRingMember: true, ringId: 'ring-102', properties: { accountNo: '102938403', balance: 8000000, status: 'SUSPICIOUS' } },
      { id: 'a4', label: 'Account', name: 'STK: 102938404 (Vũ Văn D)', subText: 'Mule Node 3', riskScore: 94, isFraudRingMember: true, ringId: 'ring-102', properties: { accountNo: '102938404', balance: 15000000, status: 'SUSPICIOUS' } },
      { id: 'a5', label: 'Account', name: 'STK: 102938405 (Đào Minh E)', subText: 'Mule Node 4 (Rút mặt)', riskScore: 97, isFraudRingMember: true, ringId: 'ring-102', properties: { accountNo: '102938405', balance: 200000000, status: 'CRITICAL' } },
      { id: 'c_master', label: 'Customer', name: 'Đối tượng Cầm Đầu X', subText: 'CIF-GHOST-01', riskScore: 99, isFraudRingMember: true, ringId: 'ring-102', properties: { cif: 'CIF-GHOST-01', riskScore: 99 } },
      { id: 'ip_bot', label: 'IPAddress', name: '103.22.180.12', subText: 'IP Bot Auto Transfer', riskScore: 95, isFraudRingMember: true, ringId: 'ring-102', properties: { ip: '103.22.180.12', isProxy: true } }
    ],
    edges: [
      { id: 'e_m1', source: 'a1', target: 'a2', label: 'TRANSFERRED_TO', isSuspicious: true, properties: { amount: 500000000, time: '14:00:10' } },
      { id: 'e_m2', source: 'a2', target: 'a3', label: 'TRANSFERRED_TO', isSuspicious: true, properties: { amount: 480000000, time: '14:02:15' } },
      { id: 'e_m3', source: 'a3', target: 'a4', label: 'TRANSFERRED_TO', isSuspicious: true, properties: { amount: 470000000, time: '14:05:00' } },
      { id: 'e_m4', source: 'a4', target: 'a5', label: 'TRANSFERRED_TO', isSuspicious: true, properties: { amount: 460000000, time: '14:08:30' } },
      { id: 'e_m5', source: 'a5', target: 'a1', label: 'TRANSFERRED_TO', isSuspicious: true, properties: { amount: 400000000, time: '14:11:00' } },
      { id: 'e_m6', source: 'c_master', target: 'a1', label: 'HAS_ACCOUNT', isSuspicious: true, properties: {} },
      { id: 'e_m7', source: 'c_master', target: 'a5', label: 'HAS_ACCOUNT', isSuspicious: true, properties: {} },
      { id: 'e_m8', source: 'c_master', target: 'ip_bot', label: 'REGISTERED_WITH_IP', isSuspicious: true, properties: {} }
    ]
  },
  {
    id: 'ring-stacking-103',
    title: 'Liên Minh Công Ty Ma & Trùng Thế Thế Chấp Khoản Vay (Loan Stacking)',
    titleEn: 'Shell Company Network & Double Collateral Stacking',
    category: 'Loan Stacking & Shell Co',
    riskLevel: 'HIGH',
    description: '3 Công ty TNHH thương mại vừa thành lập dưới 6 tháng do 3 cá nhân đứng tên (thực chất là người quen), cùng dùng chung 1 tài sản thế chấp là lô đất tại Bình Dương để nộp hồ sơ bảo lãnh vay 12 tỷ VND tại 3 chi nhánh ngân hàng khác nhau.',
    impactEstimateVND: '12,000,000,000 VND',
    nodesCount: 8,
    edgesCount: 11,
    keyDetectionRule: 'Graph Centrality: Biểu đồ liên kết phát hiện 1 Bất động sản / Mã tài sản liên kết với nhiều khoản vay bảo lãnh thông qua 2 bước môi giới.',
    suggestedAction: 'Từ chối giải ngân cấp tín dụng, gắn cờ cảnh báo trung tâm CIC và chuyển hồ sơ cho phòng Quản lý Rủi ro Tín dụng trụ sở chính.',
    nodes: [
      { id: 'comp1', label: 'Company', name: 'Công ty TNHH Vận Tải An Phát', subText: 'MST: 031901111', riskScore: 88, isFraudRingMember: true, ringId: 'ring-103', properties: { taxCode: '031901111', capital: 2000000000 } },
      { id: 'comp2', label: 'Company', name: 'Công ty TNHH XNK Nhật Minh', subText: 'MST: 031902222', riskScore: 86, isFraudRingMember: true, ringId: 'ring-103', properties: { taxCode: '031902222', capital: 1500000000 } },
      { id: 'comp3', label: 'Company', name: 'Công ty CP Đầu Tư Bảo Long', subText: 'MST: 031903333', riskScore: 91, isFraudRingMember: true, ringId: 'ring-103', properties: { taxCode: '031903333', capital: 3000000000 } },
      { id: 'c_dir1', label: 'Customer', name: 'Nguyễn Tiến Dũng', subText: 'GĐ An Phát', riskScore: 82, isFraudRingMember: true, ringId: 'ring-103', properties: { cif: 'CIF-7011' } },
      { id: 'c_dir2', label: 'Customer', name: 'Trần Thị Mai', subText: 'GĐ Nhật Minh', riskScore: 84, isFraudRingMember: true, ringId: 'ring-103', properties: { cif: 'CIF-7012' } },
      { id: 'c_real_owner', label: 'Customer', name: 'Chủ Mưu BĐS - Phạm Văn H', subText: 'Sở hữu thực tế 3 Cty', riskScore: 98, isFraudRingMember: true, ringId: 'ring-103', properties: { cif: 'CIF-9999-VIP' } },
      { id: 'addr_prop', label: 'Address', name: 'Lô B2, KCN Mỹ Phước, Bến Cát', subText: 'TS Thế Chấp 12 Tỷ', riskScore: 95, isFraudRingMember: true, ringId: 'ring-103', properties: { addressHash: 'PROPERTY-BD-9912' } },
      { id: 'p_law', label: 'PhoneNumber', name: '0912345999', subText: 'SĐT Luật Sư Môi Giới', riskScore: 87, isFraudRingMember: true, ringId: 'ring-103', properties: { phone: '0912345999' } }
    ],
    edges: [
      { id: 'e_s1', source: 'c_dir1', target: 'comp1', label: 'DIRECTOR_OF', isSuspicious: false, properties: { share: 90 } },
      { id: 'e_s2', source: 'c_dir2', target: 'comp2', label: 'DIRECTOR_OF', isSuspicious: false, properties: { share: 85 } },
      { id: 'e_s3', source: 'c_real_owner', target: 'comp3', label: 'DIRECTOR_OF', isSuspicious: true, properties: { share: 100 } },
      { id: 'e_s4', source: 'c_real_owner', target: 'c_dir1', label: 'CO_APPLICANT', isSuspicious: true, properties: { relation: 'CO_GUARANTOR' } },
      { id: 'e_s5', source: 'c_real_owner', target: 'c_dir2', label: 'CO_APPLICANT', isSuspicious: true, properties: { relation: 'CO_GUARANTOR' } },
      { id: 'e_s6', source: 'comp1', target: 'addr_prop', label: 'HAS_ADDRESS', isSuspicious: true, properties: { usage: 'COLLATERAL' } },
      { id: 'e_s7', source: 'comp2', target: 'addr_prop', label: 'HAS_ADDRESS', isSuspicious: true, properties: { usage: 'COLLATERAL' } },
      { id: 'e_s8', source: 'comp3', target: 'addr_prop', label: 'HAS_ADDRESS', isSuspicious: true, properties: { usage: 'COLLATERAL' } },
      { id: 'e_s9', source: 'c_dir1', target: 'p_law', label: 'HAS_PHONE', isSuspicious: true, properties: {} },
      { id: 'e_s10', source: 'c_dir2', target: 'p_law', label: 'HAS_PHONE', isSuspicious: true, properties: {} }
    ]
  }
];

export const CYPHER_QUERIES: CypherQueryItem[] = [
  {
    id: 'cypher-1',
    title: 'Phát hiện Nhóm dùng chung IMEI / Device ID eKYC',
    category: 'Pattern Matching',
    description: 'Tìm kiếm tất cả khách hàng mở hồ sơ vay mới có dùng chung thiết bị di động (IMEI hoặc Device Fingerprint) với tối thiểu 3 CIF khác nhau.',
    businessPurpose: 'Phòng chống gian lận danh tính giả mạo (Synthetic Identity) & gian lận vay tiêu dùng nhanh.',
    executionTimeAvg: '12ms',
    cypher: `MATCH (c1:Customer)-[:HAS_DEVICE]->(d:Device)<-[:HAS_DEVICE]-(c2:Customer)
WHERE c1 <> c2 AND d.isJailbroken = true
WITH d, count(DISTINCT c1) AS user_count, collect(DISTINCT c1.name) AS customer_list
WHERE user_count >= 3
RETURN d.deviceId AS device_imei, d.deviceModel AS model, user_count, customer_list
ORDER BY user_count DESC;`
  },
  {
    id: 'cypher-2',
    title: 'Truy vết Dòng tiền Chuyển nhanh Vòng tròn (Money Mule Circular Flow)',
    category: 'Pattern Matching',
    description: 'Truy vấn đồ thị phát hiện các đường đi giao dịch khép kín (A -> B -> C -> ... -> A) có độ dài từ 3 đến 6 chặng được thực hiện trong khoảng thời gian ngắn.',
    businessPurpose: 'Phát hiện rửa tiền AML, giao dịch ảo và mạng lưới tài khoản rác (Money Mule Networks).',
    executionTimeAvg: '28ms',
    cypher: `MATCH path = (a1:Account)-[:TRANSFERRED_TO*3..6]->(a1)
WHERE ALL(r IN relationships(path) WHERE r.amount > 10000000)
WITH path, 
     nodes(path) AS mule_accounts, 
     reduce(total = 0, r IN relationships(path) | total + r.amount) AS total_flow
RETURN [acc IN mule_accounts | acc.accountNo] AS ring_accounts,
       length(path) AS ring_length,
       total_flow
ORDER BY total_flow DESC
LIMIT 10;`
  },
  {
    id: 'cypher-3',
    title: 'Tính Điểm Trung tâm Đồ thị (Degree Centrality) & Cụm Louvain Risk',
    category: 'Centrality & Community',
    description: 'Tính toán chỉ số Degree Centrality để xác định nút giao (Hub Node) kết nối nhiều thông tin dùng chung như IP, SĐT, Địa chỉ.',
    businessPurpose: 'Gán trọng số rủi ro cho thuật toán Credit Scoring / Fraud Risk Scoring dựa trên cấu trúc đồ thị.',
    executionTimeAvg: '45ms',
    cypher: `CALL gds.degree.stream({
  nodeProjection: ['Customer', 'Device', 'Address', 'IPAddress'],
  relationshipProjection: ['HAS_DEVICE', 'HAS_ADDRESS', 'REGISTERED_WITH_IP']
})
YIELD nodeId, score
WITH gds.util.asNode(nodeId) AS n, score
WHERE score >= 4
RETURN labels(n)[0] AS node_type, n.name AS entity_name, score AS degree_centrality
ORDER BY score DESC;`
  },
  {
    id: 'cypher-4',
    title: 'Cảnh báo Real-time khi Khách hàng mới có Mối liên hệ với Fraud Cluster',
    category: 'Real-time Alert',
    description: 'Kiểm tra ngay lập tức khi có khách hàng mở tài khoản eKYC mới xem có nằm trong khoảng cách 2 bước (2-hop neighborhood) với một nút đã bị gắn cờ Đen (Blacklisted).',
    businessPurpose: 'Cảnh báo sớm thời gian thực (Early Warning) trước khi duyệt giải ngân khoản vay.',
    executionTimeAvg: '8ms',
    cypher: `MATCH (new_c:Customer {cif: $new_cif})-[r1*1..2]-(shared_entity)-[r2*1..2]-(blacklisted:Customer {riskScore: 95})
RETURN new_c.name AS applicant,
       blacklisted.name AS connected_fraudster,
       labels(shared_entity)[0] AS shared_attribute,
       shared_entity.name AS attribute_value,
       length(path(new_c, blacklisted)) AS degree_distance;`
  }
];

export const EARLY_WARNING_ALERTS: EarlyWarningAlert[] = [
  {
    id: 'ALT-2026-001',
    timestamp: '18:24:10 - 27/07/2026',
    ringId: 'ring-synthetic-101',
    ringName: 'Nhóm Gian lận Danh tính Giả mạo (Synthetic ID Ring #101)',
    severity: 'CRITICAL',
    triggeredRule: 'SHARED_DEVICE_AND_IP_THRESHOLD_EXCEEDED',
    impactAmount: 1850000000,
    matchedNodes: ['CIF-9011', 'CIF-9012', 'CIF-9013', 'IMEI-SHARED-998'],
    status: 'NEW',
    rootCause: 'Phát hiện 4 hồ sơ eKYC mở tài khoản vay mới sử dụng cùng 1 mã IMEI iPhone 15 Pro Max qua địa chỉ IP Proxy 113.161.45.99.',
    suggestedAction: 'Khóa tạm thời các tài khoản vay, yêu cầu xác minh khuôn mặt Video eKYC 3D và gọi điện thoại thoại trực tiếp cho người đại diện.'
  },
  {
    id: 'ALT-2026-002',
    timestamp: '18:10:45 - 27/07/2026',
    ringId: 'ring-mule-102',
    ringName: 'Mạng Lưới Chuyển Tiền Rửa Tiền Vòng Tròn (Money Mule Ring #102)',
    severity: 'CRITICAL',
    triggeredRule: 'CIRCULAR_TRANSACTION_VELOCITY_RAPID',
    impactAmount: 2500000000,
    matchedNodes: ['STK: 102938401', 'STK: 102938402', 'STK: 102938405'],
    status: 'INVESTIGATING',
    rootCause: 'Dòng tiền 2.5 tỷ VND thực hiện 5 giao dịch vòng tròn khép kín trong thời gian 11 phút với cùng dải IP Bot.',
    suggestedAction: 'Cảnh báo ngắt chiều đi (Debit Hold) toàn bộ 5 tài khoản trong chuỗi, trích xuất log IP báo cáo Phòng Chống Tiền Giả.'
  },
  {
    id: 'ALT-2026-003',
    timestamp: '17:45:20 - 27/07/2026',
    ringId: 'ring-stacking-103',
    ringName: 'Liên Minh Công Ty Ma & Trùng Tài Sản Thế Chấp (Loan Stacking #103)',
    severity: 'HIGH',
    triggeredRule: 'COLLATERAL_ADDRESS_REUSE_MULTIPLE_LOANS',
    impactAmount: 12000000000,
    matchedNodes: ['Công ty An Phát', 'Công ty Nhật Minh', 'BĐS Bến Cát'],
    status: 'NEW',
    rootCause: 'Địa chỉ tài sản thế chấp Lô B2 KCN Mỹ Phước trùng khớp với hồ sơ thế chấp của 3 doanh nghiệp vừa thành lập dưới 6 tháng.',
    suggestedAction: 'Đình chỉ giải ngân tín dụng, yêu cầu kiểm tra thực địa tài sản và xác minh CIC tập trung.'
  }
];

export const TRADITIONAL_VS_GRAPH_COMPARISON: ComparisonItem[] = [
  {
    criteria: 'Phương pháp phát hiện (Detection Approach)',
    traditionalRules: 'Dựa trên các quy tắc tĩnh (Static Rules) trên từng giao dịch riêng lẻ (SĐT trùng, giới hạn số tiền).',
    knowledgeGraph: 'Phân tích cấu trúc liên kết toàn cục (Global Topology & Path Matching) đa tầng giữa Khách hàng, Thiết bị, IP, SĐT.',
    businessImpact: 'Bắt trọn 95%+ các biến thể gian lận tinh vi thay vì bị lọt lưới do kẻ gian chia nhỏ giao dịch.'
  },
  {
    criteria: 'Tốc độ phát hiện (Latency & Real-time)',
    traditionalRules: 'Chạy Batch Job cuối ngày (T+1) hoặc kiểm tra thủ công mất từ 2 - 24 giờ.',
    knowledgeGraph: 'Kiểm tra đường nối graph (Graph Pattern Search) theo thời gian thực dưới 20ms ngay khi eKYC/Chuyển tiền.',
    businessImpact: 'Ngăn chặn rút tiền thất thoát NGAY LẬP TỨC trước khi tiền bị tẩu tán ra khỏi hệ thống ngân hàng.'
  },
  {
    criteria: 'Khả năng mở rộng (Scalability & Depth)',
    traditionalRules: 'Truy vấn RDBMS SQL bị chậm kinh hoàng khi JOIN > 3 bảng (Customer, Device, IP, Account, Trans).',
    knowledgeGraph: 'Duyệt đồ thị (Graph Traversal) theo con trỏ với độ phức tạp O(k) không phụ thuộc tổng dung lượng dữ liệu.',
    businessImpact: 'Phân tích đến 6-8 cấp liên kết sâu (N-hop relationships) mượt mà trên hàng chục triệu bản ghi.'
  },
  {
    criteria: 'Đánh giá Rủi ro Tín dụng (Credit Scoring)',
    traditionalRules: 'Dựa vào điểm CIC, thu nhập kê khai & lịch sử trả nợ cá nhân đơn lẻ.',
    knowledgeGraph: 'Bổ sung Graph Risk Score (Community Risk, Centrality, Network Contagion) vào mô hình Scoring.',
    businessImpact: 'Giảm 35% tỷ lệ nợ xấu (NPL) do từ chối hồ sơ "đẹp" nhưng nằm trong mạng lưới gian lận ngầm.'
  }
];

export const ANALYTICS_DATA = {
  fraudTypes: [
    { name: 'Synthetic Identity (Giả mạo danh tính)', percentage: 38, amountVND: '42.5 Tỷ' },
    { name: 'Money Mule Network (Tài khoản rác)', percentage: 31, amountVND: '35.0 Tỷ' },
    { name: 'Loan Stacking & Shell Co (Vay chồng đè)', percentage: 18, amountVND: '20.2 Tỷ' },
    { name: 'Account Takeover (ATO)', percentage: 13, amountVND: '14.8 Tỷ' }
  ],
  monthlyPreventedLosses: [
    { month: 'T10/2025', traditional: 4.2, graphIntelligence: 18.5 },
    { month: 'T11/2025', traditional: 4.8, graphIntelligence: 22.1 },
    { month: 'T12/2025', traditional: 5.1, graphIntelligence: 28.4 },
    { month: 'T01/2026', traditional: 5.5, graphIntelligence: 32.0 },
    { month: 'T02/2026', traditional: 6.0, graphIntelligence: 39.8 },
    { month: 'T03/2026', traditional: 6.2, graphIntelligence: 45.2 }
  ],
  riskScoreDistribution: [
    { range: '0 - 20 (An toàn)', count: 85200, color: '#10B981' },
    { range: '21 - 50 (Thấp)', count: 12400, color: '#3B82F6' },
    { range: '51 - 75 (Trung bình)', count: 1850, color: '#F59E0B' },
    { range: '76 - 90 (Nghi vấn cao)', count: 420, color: '#F97316' },
    { range: '91 - 100 (Gian lận rõ)', count: 115, color: '#EF4444' }
  ]
};
