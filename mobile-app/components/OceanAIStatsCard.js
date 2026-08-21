import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const API_BASE = "https://your-backend-domain.com/api";

export default function OceanAIStatsCard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------------------
     دریافت آمار از API OceanAI
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
    <View style={styles.card}>
      <Text style={styles.title}>OceanAI Dashboard</Text>

      {loading ? (
        <ActivityIndicator color="#F5A623" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>پروژه‌ها:</Text>
            <Text style={styles.value}>{stats.projects}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>درآمد:</Text>
            <Text style={styles.value}>{stats.income.toLocaleString()} تومان</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>ایده‌ها:</Text>
            <Text style={styles.value}>{stats.ideas}</Text>
          </View>

          {stats.ai_summary ? (
            <Text style={styles.summary}>{stats.ai_summary}</Text>
          ) : null}

          <TouchableOpacity style={styles.refreshBtn} onPress={fetchStats}>
            <Text style={styles.refreshText}>به‌روزرسانی</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F111F",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#23262E",
  },
  title: {
    color: "#F4F1EA",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#8A8F9C",
    fontSize: 12,
  },
  value: {
    color: "#F4F1EA",
    fontSize: 12,
    fontWeight: "600",
  },
  summary: {
    marginTop: 10,
    color: "#F4F1EA",
    fontSize: 12,
    lineHeight: 18,
  },
  error: {
    color: "#FF6B6B",
    fontSize: 12,
  },
  refreshBtn: {
    marginTop: 12,
    backgroundColor: "#F5A623",
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  refreshText: {
    color: "#050814",
    fontSize: 12,
    fontWeight: "600",
  },
});
