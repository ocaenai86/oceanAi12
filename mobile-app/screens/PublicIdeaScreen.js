import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import OceanAIIdeaMachineSmart from "../components/OceanAIIdeaMachineSmart";
import OceanAIStatsCard from "../components/OceanAIStatsCard";

const API_BASE = "https://your-backend-domain.com/api";

export default function PublicIdeaScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------------------
     دریافت آمار عمومی از API OceanAI
     GET /api/oceanai/stats
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
      <View style={styles.hero}>
        <Text style={styles.title}>OceanAI – Idea Machine عمومی</Text>
        <Text style={styles.subtitle}>
          تولید ایده‌های هوشمند برای کسب‌درآمد، اتوماسیون، فریلنسری و ساخت سرویس‌های جدید.
        </Text>
      </View>

      {/* آمار عمومی OceanAI */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>آمار کلی OceanAI</Text>

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
        <Text style={styles.sectionTitle}>ماشین تولید ایده OceanAI</Text>
        <OceanAIIdeaMachineSmart mode="public" />
      </View>

      {/* بخش توضیح */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>این بخش برای چیست؟</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            این بخش مخصوص کاربران عمومی OceanAI است.  
            می‌توانید ایده‌های کسب‌درآمد، اتوماسیون، تولید محتوا، ربات‌سازی و سرویس‌های هوش مصنوعی بسازید.
          </Text>
        </View>
      </View>

      {/* نسخه Ultra */}
      <View style={styles.ultraSection}>
        <Text style={styles.ultraTitle}>نسخهٔ Ultra OceanAI</Text>

        <Text style={styles.ultraItem}>• تولید ایده‌های پیشرفته</Text>
        <Text style={styles.ultraItem}>• ساخت ربات‌های هوش مصنوعی</Text>
        <Text style={styles.ultraItem}>• اتوماسیون‌های کامل</Text>
        <Text style={styles.ultraItem}>• داشبورد حرفه‌ای</Text>
        <Text style={styles.ultraItem}>• اتصال به Workspace</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814" },

  hero: { padding: 24 },
  title: { fontSize: 22, color: "#3ED9C7", fontWeight: "700" },
  subtitle: { marginTop: 8, color: "#8A8F9C", lineHeight: 20 },

  section: { paddingHorizontal: 16, paddingVertical: 12 },
  sectionTitle: { color: "#F5A623", fontSize: 16, marginBottom: 8 },

  error: { color: "#FF6B6B", marginBottom: 12 },

  grid: { gap: 12 },

  card: {
    backgroundColor: "#0F111F",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#23262E",
    marginBottom: 12,
  },
  cardText: { color: "#
