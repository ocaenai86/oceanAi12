import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

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

  // حذف پروژه
  const deleteProject = async (id) => {
    try {
      await fetch(`${API_BASE}/oceanai/projects/${id}`, {
        method: "DELETE",
      });

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("خطا در حذف پروژه");
    }
  };

  // افزودن پروژه جدید
  const addProject = async () => {
    const newProject = {
      title: "پروژه جدید OceanAI",
      description: "این پروژه تازه ایجاد شده است.",
      startDate: "2026-08-21",
      endDate: null,
      clients: 0,
      income: 0,
      active: true,
    };

    try {
      const res = await fetch(`${API_BASE}/oceanai/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      const data = await res.json();
      setProjects((prev) => [...prev, data.project]);
    } catch {
      alert("خطا در افزودن پروژه");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>پروژه‌ها و اتوماسیون‌های من</Text>
      <Text style={styles.subtitle}>
        مدیریت کامل پروژه‌ها، ربات‌ها، اتوماسیون‌ها و سرویس‌های اختصاصی OceanAI.
      </Text>

      {/* دکمه افزودن پروژه جدید */}
      <TouchableOpacity style={styles.addButton} onPress={addProject}>
        <Text style={styles.addButtonText}>افزودن پروژه جدید</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator color="#3ED9C7" style={{ marginTop: 20 }} />
      ) : projects.length === 0 ? (
        <Text style={styles.empty}>هنوز هیچ پروژه‌ای ثبت نشده است.</Text>
      ) : (
        projects.map((p) => (
          <View key={p.id} style={styles.card}>
            <Text style={styles.cardTitle}>{p.title}</Text>
            <Text style={styles.cardDesc}>{p.description}</Text>

            <Text style={styles.cardInfo}>تاریخ شروع: {p.startDate}</Text>
            <Text style={styles.cardInfo}>
              تاریخ پایان: {p.endDate || "در حال انجام"}
            </Text>

            <Text style={styles.cardInfo}>تعداد مشتری‌ها: {p.clients}</Text>
            <Text style={styles.cardInfo}>درآمد: {p.income} تومان</Text>

            <Text style={styles.cardStatus}>
              وضعیت: {p.active ? "فعال" : "غیرفعال"}
            </Text>

            {/* دکمه‌های ویرایش و حذف */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>ویرایش</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteProject(p.id)}
              >
                <Text style={styles.deleteText}>حذف</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* بخش Ultra */}
      <View style={styles.ultraSection}>
        <Text style={styles.ultraTitle}>نسخهٔ Ultra OceanAI</Text>

        <Text style={styles.ultraItem}>• اتصال کامل به دیتابیس</Text>
        <Text style={styles.ultraItem}>• اتصال به پنل مدیریت OceanAI</Text>
        <Text style={styles.ultraItem}>• نمایش نمودارها (Charts)</Text>
        <Text style={styles.ultraItem}>• نمایش وضعیت اتوماسیون‌ها</Text>
        <Text style={styles.ultraItem}>• نمایش ربات‌های فعال</Text>
        <Text style={styles.ultraItem}>• نمایش لاگ‌های سیستم</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814", padding: 16 },

  title: { fontSize: 22, color: "#F5A623", fontWeight: "700" },
  subtitle: { color: "#8A8F9C", marginBottom: 16, lineHeight: 20 },

  addButton: {
    backgroundColor: "#3ED9C7",
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: { color: "#050814", fontWeight: "700" },

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

  cardInfo: { color: "#8A8F9C", marginTop: 4, fontSize: 12 },
  cardStatus: { color: "#F5A623", marginTop: 8, fontSize: 13 },

  actions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },

  editButton: {
    backgroundColor: "#3ED9C7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editText: { color: "#050814", fontWeight: "600" },

  deleteButton: {
    backgroundColor: "#F44336",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: { color: "#FFF", fontWeight: "600" },

  ultraSection: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#0F111F",
    borderWidth: 1,
    borderColor: "#23262E",
  },
  ultraTitle: { color: "#F5A623", fontSize: 16, marginBottom: 8 },
  ultraItem: { color: "#8A8F9C", marginBottom: 4 },
});
