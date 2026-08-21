import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import OceanAIIdeaMachineSmart from "../components/OceanAIIdeaMachineSmart";
import OceanAIStatsCard from "../components/OceanAIStatsCard";

const API_BASE = "https://your-backend-domain.com/api";

export default function StudioScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------------------
     دریافت آمار استودیو از API OceanAI
     GET /api/oceanai/studio
  ------------------------------ */
  const fetchStudioStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/oceanai/studio`);
      const data = await res.json();

      if (data?.success === false) {
        setError(data.error || "خطا در دریافت اطلاعات استودیو");
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
    fetchStudioStats();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* هدر صفحه */}
      <View style={styles.hero}>
        <Text style={styles.title}>OceanAI Studio</Text>
        <Text style={styles.subtitle}>
          مرکز ساخت، تولید، ادیت و مدیریت محتوای هوش مصنوعی.  
          اینجا می‌توانی ابزارهای حرفه‌ای OceanAI را برای ساخت سرویس‌ها و پروژه‌ها استفاده کنی.
        </Text>
      </View>

      {/* آمار استودیو */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>آمار استودیو</Text>

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
              label="ربات‌های فعال"
              value={stats?.bots || 0}
              color="#F5A623"
            />
            <OceanAIStatsCard
              label="اتوماسیون‌ها"
              value={stats?.automations || 0}
              color="#8A8F9C"
            />
          </View>
        )}
      </View>

      {/* ماشین تولید ایده OceanAI */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ماشین تولید ایده OceanAI</Text>
        <OceanAIIdeaMachineSmart mode="studio" />
      </View>

      {/* ابزارهای استودیو */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ابزارهای استودیو</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            این بخش شامل ابزارهای ساخت ربات، تولید محتوا، اتوماسیون، ادیت متن، ساخت پرامپت و ابزارهای
