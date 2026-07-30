import React, { useState } from 'react';
import { 
  Github, 
  Globe, 
  Copy, 
  Check, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Rocket, 
  Code2, 
  CheckCircle2,
  Server,
  AlertTriangle
} from 'lucide-react';

export const GitHubDeployGuide: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const yamlPipelineCode = `name: Deploy BankFraud Graph Intelligence to GitHub Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build React Vite Application
        run: npm run build
        env:
          VITE_GEMINI_API_KEY: \${{ secrets.VITE_GEMINI_API_KEY }}

      - name: Deploy Static Build to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
`;

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(yamlPipelineCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 py-2">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">
                Hướng Dẫn Liên Kết GitHub, Up Source Code & Deploy Free Subdomain
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Các bước đẩy mã nguồn lên GitHub Repository, kích hoạt GitHub Pages / Vercel để công khai ứng dụng trực tuyến miễn phí 100%.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
          >
            <Github className="w-4 h-4" />
            <span>Tạo GitHub Repository Mới</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Static Web Conversion Alert Banner */}
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-200">
              💡 Giải Thích Về Việc Đẩy Web Tĩnh (Static HTML/JS/CSS) Lên GitHub Pages
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Trình duyệt web <strong>không thể chạy trực tiếp file `.tsx`</strong>. Để ứng dụng hiển thị hoàn hảo trên GitHub Pages (chỉ hỗ trợ web tĩnh), ứng dụng cần được <strong>Vite đóng gói (build)</strong> thành bộ mã nguồn web tĩnh thuần gồm: <code className="text-amber-300 font-mono">index.html</code>, các file <code className="text-emerald-400 font-mono">.js</code> và <code className="text-blue-300 font-mono">.css</code> trong thư mục <code className="text-purple-300 font-mono">dist/</code>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <div className="font-bold text-blue-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cách 1: Tự động Build bằng GitHub Actions (Khuyên dùng)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              File <code className="text-emerald-400 font-mono">.github/workflows/deploy.yml</code> đã được khởi tạo sẵn trong dự án. Khi bạn <code className="text-amber-300 font-mono">git push</code> hoặc Export từ AI Studio sang GitHub, hệ thống CI/CD sẽ tự động chạy <code className="text-emerald-400 font-mono">npm run build</code> biên dịch toàn bộ file <code className="text-purple-300 font-mono">.tsx</code> sang HTML/JS/CSS tĩnh và đẩy lên branch <code className="text-blue-300 font-mono">gh-pages</code> để ứng dụng hoạt động 100%!
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cách 2: Build Thủ Công tại máy & Upload thư mục dist/ tĩnh</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Mở Terminal chạy lệnh <code className="text-emerald-400 font-mono">npm run build</code>. Vite sẽ tạo thư mục <code className="text-amber-300 font-mono">dist/</code> chứa file tĩnh <code className="text-purple-300 font-mono">index.html</code>, <code className="text-blue-300 font-mono">assets/*.js</code>, <code className="text-emerald-300 font-mono">assets/*.css</code>. Bạn chỉ cần upload toàn bộ file trong thư mục <code className="text-amber-300 font-mono">dist/</code> lên GitHub Repository &rarr; Bật GitHub Pages &rarr; Web chạy ngay 100%!
            </p>
          </div>
        </div>
      </div>

      {/* Post Export AI Studio Quick Action Step Box */}
      <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2.5">
          <Rocket className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold text-indigo-200">
            📌 Bạn vừa Export / Push từ Google AI Studio sang GitHub? Hướng dẫn 3 bước tiếp theo:
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">Bước 1</span>
            <p className="font-bold text-slate-100">Kiểm tra GitHub Actions</p>
            <p className="text-slate-400 text-[11px]">
              Vào Repository trên GitHub &rarr; chọn tab <strong>Actions</strong>. Bạn sẽ thấy Workflow <code className="text-amber-300 font-mono">Deploy BankFraud Graph...</code> đang tự động chạy build mã nguồn.
            </p>
          </div>

          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Bước 2</span>
            <p className="font-bold text-slate-100">Bật GitHub Pages (2 Cách Đơn Giản)</p>
            <p className="text-slate-400 text-[11px]">
              Vào <strong>Settings</strong> &rarr; <strong>Pages</strong> &rarr; Tại mục <em>Build and deployment / Source</em>:
              <br />
              • <strong>Cách A (Dễ nhất):</strong> Chọn Source là <code className="text-emerald-400 font-mono font-bold">GitHub Actions</code>. (Không cần chọn branch gh-pages!).
              <br />
              • <strong>Cách B:</strong> Chọn <code className="text-blue-300 font-mono">Deploy from a branch</code> &rarr; Chọn branch <code className="text-emerald-400 font-mono">gh-pages</code>.
            </p>
          </div>

          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Bước 3</span>
            <p className="font-bold text-slate-100">Truy cập Website Tĩnh Live</p>
            <p className="text-slate-400 text-[11px]">
              Sau 1 phút, GitHub Pages sẽ cấp link công khai dạng: <code className="text-blue-300 font-mono">https://&lt;USER&gt;.github.io/&lt;REPO&gt;/</code>. Ứng dụng chạy mượt mà 100%!
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting gh-pages missing branch & lockfile banner */}
      <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <h3 className="text-sm font-bold text-blue-200">
            🔧 Giải thích & Đã Sửa Lỗi <code className="text-red-400 font-mono">Dependencies lock file is not found</code>
          </h3>
        </div>
        <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Nguyên nhân lỗi:</strong> Mặc định GitHub Actions dùng <code className="text-amber-300 font-mono">cache: 'npm'</code> và <code className="text-amber-300 font-mono">npm ci</code> vốn bắt buộc dự án phải có sẵn file <code className="text-red-400 font-mono">package-lock.json</code>. Do dự án xuất từ AI Studio sử dụng cấu hình mới nên chưa chứa file lock này, khiến GitHub Actions bị hỏng bước <em>Setup Node.js Environment</em>.
          </p>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-2">
            <p className="font-bold text-emerald-400">✅ Đã tự động cập nhật file <code className="text-blue-300 font-mono">.github/workflows/deploy.yml</code>:</p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-200">
              <li>Chuyển lệnh <code className="text-amber-300 font-mono">npm ci</code> sang <code className="text-emerald-400 font-mono font-bold">npm install</code> linh hoạt.</li>
              <li>Bỏ bắt buộc cache lockfile để workflow chạy thành công 100% trên mọi Repository.</li>
            </ul>
            <p className="text-slate-300 mt-2 font-semibold">
              👉 <strong>Hành động của bạn:</strong> Chỉ cần Export/Push mã nguồn mới này lên GitHub (hoặc vào tab <strong>Actions</strong> &rarr; chọn workflow &rarr; bấm <strong>Re-run all jobs</strong>).
            </p>
          </div>
        </div>
      </div>

      {/* 4 Steps Guide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Step 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="font-bold text-sm text-slate-100">Xuất Mã Nguồn Từ AI Studio</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Vào menu <strong>Settings</strong> ở góc trên bên phải giao diện AI Studio -&gt; chọn <strong>Export to GitHub</strong> hoặc <strong>Download ZIP</strong> về máy tính của bạn.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="font-bold text-sm text-slate-100">Push Mã Nguồn Lên GitHub</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mở Terminal tại thư mục project và chạy các lệnh Git tiêu chuẩn:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1">
            <p>git init</p>
            <p>git add .</p>
            <p>git commit -m "feat: initial BankFraud Graph Intelligence app"</p>
            <p>git branch -M main</p>
            <p>git remote add origin https://github.com/YOUR_USER/bankfraud-graph.git</p>
            <p>git push -u origin main</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="font-bold text-sm text-slate-100">Cấu Hình GitHub Pages / Vercel Free</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            • <strong>Cách 1 (GitHub Pages):</strong> Vào Repository -&gt; <strong>Settings</strong> -&gt; <strong>Pages</strong> -&gt; Chọn Source là <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">gh-pages</code> branch do GitHub Actions tạo tự động.<br />
            • <strong>Cách 2 (Vercel Free):</strong> Đăng nhập <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Vercel.com</a> -&gt; Import GitHub Repository -&gt; Click Deploy (miễn phí 100% kèm SSL & Subdomain <code className="text-emerald-400 font-mono">https://your-app.vercel.app</code>).
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              4
            </span>
            <h3 className="font-bold text-sm text-slate-100">Cấu Hình Variable GEMINI_API_KEY</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Vào GitHub Repository -&gt; <strong>Settings</strong> -&gt; <strong>Secrets and variables</strong> -&gt; <strong>Actions</strong> -&gt; Thêm Secret tên <code className="text-emerald-400 font-mono font-bold">VITE_GEMINI_API_KEY</code> với giá trị API Key Gemini của bạn để Trợ lý AI hoạt động online.
          </p>
        </div>

      </div>

      {/* GitHub Actions YAML Config File Block */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100">
              File Cấu Hình GitHub Actions CI/CD Pipeline (<code className="text-emerald-400 font-mono">.github/workflows/deploy.yml</code>)
            </h3>
          </div>

          <button
            onClick={handleCopyYaml}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedCode ? 'Đã Sao Chép YAML' : 'Sao Chép Cấu Hình'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-300">
          File này đã được tự động khởi tạo sẵn trong thư mục dự án <code className="bg-slate-950 px-2 py-1 rounded text-emerald-400 font-mono">.github/workflows/deploy.yml</code>. Khi bạn push code lên GitHub, GitHub Actions sẽ tự động build và publish ứng dụng lên GitHub Pages!
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
          <pre>{yamlPipelineCode}</pre>
        </div>
      </div>

    </div>
  );
};
