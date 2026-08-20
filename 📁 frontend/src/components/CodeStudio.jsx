واسه این کد میخواهم
import React, { useState, useEffect, useRef } from 'react';
import { Code2, Play, Check } from 'lucide-react';

const DEFAULT_FILES = {
  html: `<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8">
  <title>پروژه من</title>
</head>
<body>
  <h1>سلام دنیا</h1>
  <p>اینجا شروع کن به نوشتن کد.</p>
</body>
</html>`,
  css: `body {
  font-family: sans-serif;
  background: #0f1115;
  color: #f4f1ea;
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #f5a623;
}`,
  js: `console.log('برنامه اجرا شد');`
};

const FILE_META = {
  html: { label: 'index.html', lang: 'HTML', color: '#F5A623' },
  css: { label: 'style.css', lang: 'CSS', color: '#3ED9C7' },
  js: { label: 'script.js', lang: 'JS', color: '#F5D76E' }
};

export default function CodeStudio() {
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState('html');
  const [tab, setTab] = useState('editor');
  const [saveState, setSaveState] = useState('idle');
  const [loaded, setLoaded] = useState(false);
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const saveTimer = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (e) {} };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get('code-studio-files', false);
        if (result && result.value) setFiles(JSON.parse(result.value));
      } catch (e) {
        // نبود دیتای ذخیره‌شده مشکلی نیست، از حالت پیش‌فرض شروع می‌کنیم
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setSaveState('saving');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set('code-studio-files', JSON.stringify(files), false);
        setSaveState('saved');
      } catch (e) {
        setSaveState('idle');
      }
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [files, loaded]);

  const handleChange = (e) => setFiles(prev => ({ ...prev, [activeFile]: e.target.value }));

  const handleScroll = () => {
    if (gutterRef.current && textareaRef.current) gutterRef.current.scrollTop = textareaRef.current.scrollTop;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const value = files[activeFile];
      const newValue = value.slice(0, start) + '  ' + value.slice(end);
      setFiles(prev => ({ ...prev, [activeFile]: newValue }));
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
  };

  const lineCount = files[activeFile].split('\n').length;
  const charCount = files[activeFile].length;

  const cleanHtml = files.html.replace(/<!DOCTYPE[^>]*>|<\/?html[^>]*>|<\/?head[^>]*>|<\/?body[^>]*>|<meta[^>]*>|<title>[^<]*<\/title>/gi, '');
  const previewDoc = `<!DOCTYPE html><html><head><style>${files.css}</style></head><body>${cleanHtml}<script>${files.js}<\/script></body></html>`;

  return (
    <div dir="rtl" className="flex flex-col h-screen w-full max-w-md mx-auto overflow-hidden" style={{ background: '#0F1115', fontFamily: "'Inter', sans-serif" }}>
      {/* نوار عنوان */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1" style={{ background: '#0F1115' }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: '#F5A623' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: '#3ED9C7' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: '#565B66' }} />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#8A8F9C', fontSize: '12px', letterSpacing: '0.05em' }}>code.studio</span>
      </div>

      {/* تب فایل‌ها */}
      <div className="flex items-center gap-2 px-3 pt-2 pb-2 overflow-x-auto" style={{ borderBottom: '1px solid #23262E' }}>
        {Object.keys(FILE_META).map(key => (
          <button
            key={key}
            onClick={() => setActiveFile(key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap flex-shrink-0 transition-colors"
            style={{
              background: activeFile === key ? '#1D2027' : 'transparent',
              border: activeFile === key ? `1px solid ${FILE_META[key].color}55` : '1px solid #23262E',
              color: activeFile === key ? '#F4F1EA' : '#6B7280',
              fontFamily: "'JetBrains Mono', monospace",
              direction: 'ltr'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: FILE_META[key].color }} />
            {FILE_META[key].label}
          </button>
        ))}
      </div>

      {/* محتوای اصلی */}
      <div className="flex-1 overflow-hidden relative">
        {tab === 'editor' ? (
          <div className="flex h-full" dir="ltr">
            <div
              ref={gutterRef}
              className="text-right px-2 py-3 select-none overflow-hidden flex-shrink-0"
              style={{ color: '#3A3F4B', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '1.6', background: '#0D0F13' }}
            >
              {Array.from({ length: lineCount }).map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <textarea
              ref={textareaRef}
              value={files[activeFile]}
              onChange={handleChange}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 resize-none outline-none px-3 py-3 h-full"
              style={{ background: '#0F1115', color: '#E5E3DC', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '1.6', direction: 'ltr' }}
            />
          </div>
        ) : (
          <div className="h-full bg-white">
            <iframe title="preview" srcDoc={previewDoc} className="w-full h-full border-0" sandbox="allow-scripts" />
          </div>
        )}
      </div>

      {/* نوار وضعیت */}
      <div className="flex items-center justify-between px-3 py-1.5 text-xs" style={{ background: '#0D0F13', borderTop: '1px solid #23262E', color: '#6B7280', fontFamily: "'JetBrains Mono', monospace" }}>
        <div className="flex items-center gap-3" dir="ltr">
          <span style={{ color: FILE_META[activeFile].color }}>{FILE_META[activeFile].lang}</span>
          <span>{lineCount} خط</span>
          <span>{charCount} کاراکتر</span>
        </div>
        <div className="flex items-center gap-1.5">
          {saveState === 'saving' && <span>در حال ذخیره…</span>}
          {saveState === 'saved' && (<><Check size={12} style={{ color: '#3ED9C7' }} /><span>ذخیره شد</span></>)}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#F5A623' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#F5A623' }} />
          </span>
        </div>
      </div>

      {/* ناوبری پایین */}
      <div className="flex items-stretch" style={{ background: '#12141A', borderTop: '1px solid #23262E' }}>
        <button onClick={() => setTab('editor')} className="flex-1 flex flex-col items-center gap-1 py-2.5" style={{ color: tab === 'editor' ? '#F5A623' : '#565B66' }}>
          <Code2 size={20} strokeWidth={2} />
          <span className="text-[10px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ویرایش</span>
        </button>
        <button onClick={() => setTab('preview')} className="flex-1 flex flex-col items-center gap-1 py-2.5" style={{ color: tab === 'preview' ? '#3ED9C7' : '#565B66' }}>
          <Play size={20} strokeWidth={2} />
          <span className="text-[10px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>پیش‌نمایش</span>
        </button>
      </div>
    </div>
  );
}
