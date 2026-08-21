import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import OceanAIStatsCard from "../components/OceanAIStatsCard";
import OceanAIIdeaMachineSmart from "../components/OceanAIIdeaMachineSmart";

const API_BASE = "https://your-backend-domain.com/api";

export default function PublicHomeScreen() {
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
        <Text style={styles.title}>OceanAI – Core عمومی</Text>
        <Text style={styles.subtitle}>
          این بخش مخصوص کاربران عمومی است: تولید ایده، آمار کلی، ابزارهای هوش مصنوعی و مسیرهای کسب‌درآمد.
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
              value={`${stats?.income
