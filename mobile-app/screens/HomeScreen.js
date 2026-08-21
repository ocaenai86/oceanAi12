import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import OceanAIStatsCard from "../components/OceanAIStatsCard";
import OceanAIIdeaMachineSmart from "../components/OceanAIIdeaMachineSmart";

const API_BASE = "https://your-backend-domain.com/api";

export default function HomeScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------------------
     دریافت آمار داشبورد از API OceanAI
  ------------------------------ */
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/oceanai/stats`);
      const data = await res.json();

      if (data?.success === false) {
        setError(data.error || "خطا در دریافت آمار");
      } else {
        setStats(data);
      }
    } catch (err) {
      setError("خطا در اتصال به OceanAI");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* هدر صفحه */}
      <Text style={styles.title}>OceanAI</Text>
      <Text style={styles.subtitle}>
        اقیانوس هوش مصنوعی برای اتوماسیون، فریلنسری و کسب درآمد.
      </Text>

      {/* آمار داشبورد */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>آمار کلی</Text>

        {loading ? (
          <ActivityIndicator color="#3ED9C7" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <View style={styles.grid}>
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
          </View>
        )}
      </View>

      {/* ماشین تولید ایده OceanAI */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OceanAI Idea Machine</Text>
        <OceanAIIdeaMachineSmart mode="public" />
      </View>

      {/* ماشین تولید ایده شخصی */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ماشین ایدهٔ شخصی</Text>
        <OceanAIIdeaMachineSmart mode="personal" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814", padding: 16 },
  title: { fontSize: 26, color: "#3ED9C7", fontWeight: "700" },
  subtitle: { color: "#8A8F9C", marginBottom: 20, fontSize: 13 },
  section: { marginBottom: 20 },
  sectionTitle: { color: "#F5A623", fontSize: 16, marginBottom: 10 },
  error: { color: "#FF6B6B", marginBottom: 12 },
  grid: { gap: 12 },
});
