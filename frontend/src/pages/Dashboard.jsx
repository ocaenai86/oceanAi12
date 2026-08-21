import React, { useEffect, useState } from "react";
import OceanAIStatsCard from "../components/OceanAIStatsCard";
import OceanAIIdeaMachine from "../components/OceanAIIdeaMachine";

const API_BASE = "https://your-backend-domain.com/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/oceanai/stats`);
        const data = await res.json();
        setStats(data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div
      style={{
        background: "#050814",
        minHeight: "100vh",
        padding: "20px",
        color: "#F4F1EA",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "22px", color: "#3ED9C7", fontWeight: "700" }}>
        داشبورد OceanAI
      </h1>

      <p style={{ color: "#8A8F9C", marginBottom: "16px" }}>
        نمای کلی از پروژه‌ها، درآمد و ایده‌های تولیدشده.
      </p>

      {loading ? (
        <div style={{ color: "#3ED9C7" }}>در حال بارگذاری…</div>
      ) : (
        <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
          <OceanAIStatsCard
            label="پروژه‌های فعال"
            value={stats?.projects || 0}
            color="#3ED9C7"
          />
          <OceanAIStatsCard
            label="درآمد ماه جاری"
            value={`${stats?.income || 0} تومان`}
            color="#F5A623"
          />
          <OceanAIStatsCard
            label="ایده‌های تولیدشده"
            value={stats?.ideas || 0}
            color="#8A8F9C"
          />
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <h2 style={{ color: "#F5A623", fontSize: "15px", marginBottom: "8px" }}>
          ماشین ایدهٔ شخصی
        </h2>

        <OceanAIIdeaMachine mode="personal" />
      </div>
    </div>
  );
}
