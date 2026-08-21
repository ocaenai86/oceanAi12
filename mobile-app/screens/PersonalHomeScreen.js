import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import OceanAIIdeaMachineMobile from "../components/OceanAIIdeaMachineMobile";

const API_BASE = "https://your-backend-domain.com/api";

export default function PersonalHomeScreen() {
  const [personalStats, setPersonalStats] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ------------------------------
     دریافت اطلاعات شخصی از API OceanAI
     (پروژه‌ها، درآمد، اتوماسیون‌ها، ربات‌ها)
  ------------------------------ */
  const fetchPersonalStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/oceanai/stats`);
      const data = await res.json();
      setPersonalStats(data);
    } catch (err) {
      setPersonalStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalStats();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* هدر صفحه */}
      <View style={styles.hero}>
        <Text style={styles.title}>OceanAI – Core شخصی</Text>
        <Text style={styles.subtitle}>
          این بخش مخصوص خودت است: پرامپت‌های شخصی، ایده‌های اختصاصی، اتوماسیون‌ها و ابزارهای ویژهٔ برندت.
        </Text>
      </View>

      {/* ماشین ایده شخصی */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ماشین ایدهٔ شخصی OceanAI</Text>
        <OceanAIIdeaMachineMobile mode="personal" />
      </View>

      {/* بخش پروژه‌ها و اتوماسیون‌ها */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>پروژه‌ها و اتوماسیون‌های من</Text>

        {loading ? (
          <ActivityIndicator color="#3ED9C7" />
        ) : !personalStats ? (
          <Text style={styles.card}>خطا در اتصال به OceanAI</Text>
        ) : (
          <>
            <Text style={styles.card}>
              تعداد پروژه‌ها: {personalStats.projects}
            </Text>

            <Text style={styles.card}>
              درآمد ماه جاری: {personalStats.income.toLocaleString()} تومان
            </Text>

            <Text style={styles.card}>
              تعداد ایده‌های تولیدشده: {personalStats.ideas}
            </Text>

            {personalStats.ai_summary && (
              <Text style={styles.card}>
                خلاصهٔ هوش مصنوعی: {personalStats.ai_summary}
              </Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814" },
  hero: { padding: 24 },
  title: { fontSize: 22, color: "#F5A623", fontWeight: "700" },
  subtitle: { marginTop: 8, color: "#8A8F9C", lineHeight: 20 },
  section: { paddingHorizontal: 16, paddingVertical: 12 },
  sectionTitle: { color: "#3ED9C7", fontSize: 16, marginBottom: 8 },
  card: {
    backgroundColor: "#0F111F",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#23262E",
    color: "#F4F1EA",
    marginBottom: 8,
    lineHeight: 20,
  },
});
