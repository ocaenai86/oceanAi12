import React from "react";
import { Sparkles, BadgeDollarSign, Rocket, Workflow } from "lucide-react";

export default function PricingSection() {
  const packages = [
    {
      icon: <BadgeDollarSign size={20} color="#F5A623" />,
      title: "پکیج شروع فریلنسری",
      desc: "وب‌سایت شخصی + اتوماسیون ساده + راهنمای جذب مشتری.",
      items: [
        "صفحه معرفی شخصی",
        "فرم تماس و سفارش",
        "راهنمای قدم‌به‌قدم شروع کار",
      ],
      color: "#F5A623",
    },
    {
      icon: <Workflow size={20} color="#3ED9C7" />,
      title: "پکیج اتوماسیون کسب‌وکار",
      desc: "پنل مدیریت + ربات‌ها + گزارش‌گیری هوشمند.",
      items: [
        "داشبورد مدیریت مشتری",
        "اتوماسیون پیام‌ها و پیگیری‌ها",
        "گزارش‌های تحلیلی ساده",
      ],
      color: "#3ED9C7",
    },
    {
      icon: <Rocket size={20} color="#A78BFA" />,
      title: "پکیج استودیو هوش مصنوعی",
      desc: "سیستم تولید محتوا + API هوش مصنوعی + داشبورد.",
      items: [
        "اتصال به مدل‌های هوش مصنوعی",
        "داشبورد تولید و مدیریت محتوا",
        "امکان توسعه و سفارشی‌سازی",
      ],
      color: "#A78BFA",
    },
  ];

  return (
    <div
      className="flex flex-col gap-6 p-6 rounded-xl"
      style={{
        background: "linear-gradient(145deg, #050814, #0F111F)",
        border: "1px solid #23262E",
        color: "#F4F1EA",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={20} color="#F5A623" />
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "16px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#3ED9C7",
            }}
          >
            OceanAI Pricing
          </h2>
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#8A8F9C" }}>
        انتخاب پکیج مناسب برای شروع یا رشد کسب‌وکار هوش مصنوعی و اتوماسیون.
      </p>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-4 rounded-xl"
            style={{
              background: "#0F111F",
              border: "1px solid #23262E",
            }}
          >
            <div className="flex items-center gap-2">
              {pkg.icon}
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: pkg.color,
                }}
              >
                {pkg.title}
              </h3>
            </div>

            <p style={{ fontSize: "12px", color: "#CFCFCF" }}>{pkg.desc}</p>

            <ul style={{ fontSize: "11px", color: "#E5E3DC", lineHeight: 1.7 }}>
              {pkg.items.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>

            <button
              style={{
                marginTop: "6px",
                padding: "8px 12px",
                borderRadius: "999px",
                border: "none",
                background: pkg.color,
                color: "#050814",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              انتخاب پکیج
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "6px",
          fontSize: "10px",
          color: "#8A8F9C",
          textAlign: "left",
          direction: "ltr",
        }}
      >
        OceanAI • AI & Automation Studio • contact: ocaenai.86@gmail.com
      </div>
    </div>
  );
}
