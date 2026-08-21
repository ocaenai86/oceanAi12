import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Send, BrainCircuit } from 'lucide-react';

export default function OceanAIIdeaMachine() {
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('https://your-backend-domain.com/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context }),
      });

      const data = await res.json();
      if (data.result) {
        setResult(data.result);
        setHistory((prev) => [{ prompt, result: data.result }, ...prev]);
      } else {
        setResult('خطا در دریافت پاسخ از OceanAI.');
      }
    } catch {
      setResult('اتصال به OceanAI برقرار نشد.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('oceanai-history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('oceanai-history', JSON.stringify(history));
  }, [history]);

  return (
    <div
      className="flex flex-col gap-4 p-4 rounded-xl"
      style={{
        background: 'linear-gradient(145deg, #050814, #0F111F)',
        border: '1px solid #23262E',
        color: '#F4F1EA',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit size={18} color="#3ED9C7" />
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#3ED9C7',
            }}
          >
            OceanAI Idea Machine
          </h2>
        </div>
        <Sparkles size={18} color="#F5A623" />
      </div>

      {/* Prompt Input */}
      <div className="flex flex-col gap-2">
        <label style={{ fontSize: '11px', color: '#8A8F9C' }}>پرامپت اصلی</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          style={{
            background: '#050814',
            borderRadius: '10px',
            border: '1px solid #23262E',
            color: '#F4F1EA',
            fontSize: '12px',
            padding: '8px',
            resize: 'none',
          }}
          placeholder="مثلاً: ایده برای ساخت ربات فروش هوشمند با هوش مصنوعی..."
        />
      </div>

      {/* Context Input */}
      <div className="flex flex-col gap-2">
        <label style={{ fontSize: '11px', color: '#8A8F9C' }}>کانتکست (اختیاری)</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={2}
          style={{
            background: '#050814',
            borderRadius: '10px',
            border: '1px solid #23262E',
            color: '#F4F1EA',
            fontSize: '12px',
            padding: '8px',
            resize: 'none',
          }}
          placeholder="مثلاً: من طراح سایت هستم و می‌خوام سرویس اتوماسیون بفروشم..."
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: '4px',
          padding: '10px 14px',
          borderRadius: '999px',
          border: 'none',
          background: loading ? '#565B66' : '#F5A623',
          color: '#050814',
          fontSize: '12px',
          fontWeight: 600,
          cursor: loading ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" /> در حال تولید با OceanAI…
          </>
        ) : (
          <>
            <Send size={14} /> تولید ایدهٔ پول‌ساز
          </>
        )}
      </button>

      {/* Result */}
      {result && (
        <div
          style={{
            marginTop: '8px',
            padding: '12px',
            borderRadius: '10px',
            background: '#050814',
            border: '1px solid #3ED9C755',
            fontSize: '12px',
            lineHeight: 1.6,
            textAlign: 'right',
          }}
        >
          {result}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div
          style={{
            marginTop: '10px',
            borderTop: '1px solid #23262E',
            paddingTop: '8px',
          }}
        >
          <h3 style={{ fontSize: '11px', color: '#8A8F9C', marginBottom: '6px' }}>ایده‌های اخیر</h3>
          <div className="flex flex-col gap-2">
            {history.slice(0, 3).map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#0F111F',
                  borderRadius: '8px',
                  padding: '8px',
                  border: '1px solid #23262E',
                  fontSize: '11px',
                  color: '#E5E3DC',
                }}
              >
                <strong style={{ color: '#F5A623' }}>پرامپت:</strong> {item.prompt}
                <br />
                <strong style={{ color: '#3ED9C7' }}>نتیجه:</strong> {item.result}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: '6px',
          fontSize: '10px',
          color: '#8A8F9C',
          textAlign: 'left',
          direction: 'ltr',
        }}
      >
        OceanAI • AI & Automation Studio • contact: ocaenai.86@gmail.com
      </div>
    </div>
  );
}
