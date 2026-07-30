import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Zap, 
  HelpCircle, 
  Globe, 
  ShieldAlert, 
  Code2,
  RefreshCw
} from 'lucide-react';

interface AiAnalystDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedScenarioTitle?: string;
}

export const AiAnalystDrawer: React.FC<AiAnalystDrawerProps> = ({
  isOpen,
  onClose,
  selectedScenarioTitle
}) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `**Xin chào! Tôi là Chuyên gia Cấp cao về Xu hướng Công nghệ & Đổi mới Sáng tạo (Banking Innovation Analyst).**

Tôi sẵn sàng hỗ trợ bạn:
- 🔍 Phân tích chuyên sâu các kịch bản **Fraud Ring (Synthetic ID, Money Mule, Loan Stacking)**
- 💻 Viết & tối ưu hóa câu lệnh **Cypher Query** cho Neo4j / Memgraph
- ⚖️ Tư vấn chiến lược triển khai **Knowledge Graph** tuân thủ quy định NHNN Việt Nam (QĐ 2345, NĐ 13)

Hãy chọn một gợi ý bên dưới hoặc nhập câu hỏi của bạn!`
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    'Phân tích rủi ro & đề xuất xử lý cho Fraud Ring Synthetic ID #101',
    'Đề xuất chiến lược phòng chống Money Mule cho Ngân hàng Việt Nam',
    'Viết Cypher tìm mối liên hệ giữa Customer và IP Proxy nguy hiểm',
    'So sánh hiệu quả Knowledge Graph vs Machine Learning truyền thống'
  ];

  const handleSend = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    // Append user message
    const newMessages = [...messages, { role: 'user' as const, text }];
    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          systemInstruction: `Bạn là Chuyên gia Cấp cao về Xu hướng Công nghệ & Đổi mới Sáng tạo (Banking Innovation Analyst). Nhiệm vụ của bạn là giải đáp chuyên nghiệp, sắc sảo về Knowledge Graph Fraud Ring Detection trong Ngân hàng Việt Nam. 
Định dạng trả về Markdown trực quan:
- Luôn tóm tắt Key Takeaways.
- Sử dụng Bảng so sánh nếu cần.
- Luôn có phần 'Bài học/Cơ hội cho Việt Nam'.`
        })
      });

      const data = await response.json();
      if (data.result) {
        setMessages([...newMessages, { role: 'assistant', text: data.result }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', text: 'Chưa nhận được phản hồi từ hệ thống AI.' }]);
      }
    } catch (error: any) {
      console.error('Gemini error:', error);
      setMessages([...newMessages, { role: 'assistant', text: `Lỗi kết nối AI: ${error.message || 'Chưa cấu hình API Key'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 text-white h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>AI Innovation Analyst</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.2 rounded-full font-mono">
                  Gemini 3.6 Flash
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Chuyên gia Trí tuệ Nhân tạo Ngân hàng & Phân tích Đồ thị</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-br-none'
                    : 'bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-bl-none whitespace-pre-wrap'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              <span>AI Analyst đang phân tích dữ liệu đồ thị...</span>
            </div>
          )}
        </div>

        {/* Quick Prompt Suggestions */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Gợi ý câu hỏi nhanh:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="text-[11px] bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700 rounded-lg px-2.5 py-1 text-left transition-all cursor-pointer truncate max-w-xs"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi AI Analyst về Fraud Ring, Cypher Query hoặc chiến lược..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputPrompt.trim()}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
