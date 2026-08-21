import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

const API_BASE = "https://your-backend-domain.com/api";

export default function PersonalProjectsScreen() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // گرفتن پروژه‌ها از API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/oceanai/projects`);
        const data = await res.json();
        setProjects(data.projects || []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>پروژه‌ها و اتوماسیون‌های من</Text>
      <Text style={styles.subtitle}>
        این بخش مخصوص پروژه‌های شخصی، ربات‌ها، اتوماسیون‌ها و سرویس‌های اختصاصی برند OceanAI است.
      </Text>

      {loading ? (
        <ActivityIndicator color="#3ED9C7" style={{ marginTop: 20 }} />
      ) : projects.length === 0 ? (
        <Text style={styles.empty}>هنوز هیچ پروژه‌ای ثبت نشده است.</Text>
      ) : (
        projects.map((p, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{p.title}</Text>
            <Text style={styles.cardDesc}>{p.description}</Text>
            <Text style={styles.cardStatus}>
              وضعیت: {p.active ? "فعال" : "غیرفعال"}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814", padding: 16 },

  title: { fontSize: 22, color: "#F5A623", fontWeight: "700" },
  subtitle: { color: "#8A8F9C", marginBottom: 16, lineHeight: 20 },

  empty: { color: "#8A8F9C", marginTop: 20, fontSize: 14 },

  card: {
    backgroundColor: "#0F111F",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#23262E",
    marginBottom: 12,
  },

  cardTitle: { color: "#3ED9C7", fontSize: 16, fontWeight: "600" },
  cardDesc: { color: "#F4F1EA", marginTop: 6, lineHeight: 18 },
  cardStatus: { color: "#8A8F9C", marginTop: 8, fontSize: 12 },
});
