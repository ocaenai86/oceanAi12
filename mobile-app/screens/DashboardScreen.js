import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import OceanAIStatsCard from "../components/OceanAIStatsCard";

export default function DashboardScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://your-backend-domain.com/api/oceanai/stats");
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>داشبورد OceanAI</Text>
      <Text style={styles.subtitle}>نمای کلی از عملکرد، پروژه‌ها و درآمدها</Text>

      {loading ? (
        <ActivityIndicator color="#3ED9C7" />
      ) : (
        <View style={styles.grid}>
          <OceanAIStatsCard label="پروژه‌های فعال" value={stats?.projects || 0} color="#3ED9C7" />
          <OceanAIStatsCard label="درآمد ماه جاری" value={`${stats?.income || 0} تومان`} color="#F5A623" />
          <OceanAIStatsCard label="ایده‌های تولیدشده" value={stats?.ideas || 0} color="#8A8F9C" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814", padding: 16 },
  title: { fontSize: 22, color: "#3ED9C7", fontWeight: "700" },
  subtitle: { color: "#8A8F9C", marginBottom: 16 },
  grid: { gap: 12 },
});
