
import React, { useState } from "react";
import "./CodeStudio.css"; // استایل اختصاصی این بخش

export default function CodeStudio() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");

    try {
      // اینجا API واقعی OceanAI را وصل می‌کنی
      const res = await fetch("/api/ai/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.output || "پاسخی دریافت نشد.");
    } catch {
      setResult("خطا در اتصال به OceanAI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="studio-container">
      <div className="studio-header">
        <span className="studio-logo">🌊</span>
        <h2 className="studio-title">OceanAI Code Studio</h2>
        <p className="studio-subtitle">
          محیط کدنویسی، تولید محتوا، و اجرای مدل‌های هوش مصنوعی OceanAI
        </p>
      </div>

      <div className="studio-editor">
        <label className="studio-label">پرامپت</label>
        <textarea
          className="studio-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثلاً: یک ربات اتوماسیون برای مدیریت مشتری‌های اینستاگرام طراحی کن..."
        />

        <button className="studio-button" onClick={handleRun} disabled={loading}>
          {loading ? "در حال پردازش..." : "اجرای OceanAI"}
        </button>
      </div>

      {result && (
        <div className="studio-output">
          <h3>نتیجه:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
