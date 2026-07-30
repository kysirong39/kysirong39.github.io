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
  Server
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
