import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import OceanAIIdeaMachineMobile from "../components/OceanAIIdeaMachineMobile";

export default function PersonalHomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>OceanAI – Core شخصی</Text>
        <Text style={styles.subtitle}>
          این بخش مخصوص خودت است: پرامپت‌های شخصی، ایده‌های اختصاصی، اتوماسیون‌ها و ابزارهای ویژهٔ برندت.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ماشین ایدهٔ شخصی OceanAI</Text>
        <OceanAIIdeaMachineMobile mode="personal" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>پروژه‌ها و اتوماسیون‌های من</Text>

        <Text style={styles.card}>
          این بخش بعداً به API وصل می‌شود و پروژه‌ها، ربات‌ها، اتوماسیون‌ها و سرویس‌های اختصاصی تو را نمایش می‌دهد.
        </Text>

        <Text style={styles.card}>
          می‌توانیم اینجا داشبورد کوچک، وضعیت ربات‌ها، تعداد مشتری‌ها، درآمد ماهانه و… را هم اضافه کنیم.
        </Text>
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
