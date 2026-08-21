import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import OceanAIIdeaMachineMobile from "../components/OceanAIIdeaMachineMobile";

export default function PersonalHomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>OceanAI – Core شخصی</Text>
        <Text style={styles.subtitle}>
          این بخش فقط برای خودت است: پرامپت‌های شخصی، ایده‌های اختصاصی، اتوماسیون‌های مخصوص برندت.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ماشین ایدهٔ شخصی</Text>
        <OceanAIIdeaMachineMobile mode="personal" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>پروژه‌ها و اتوماسیون‌های من</Text>
        <Text style={styles.card}>اینجا بعداً لیست پروژه‌ها، ربات‌ها و سرویس‌های خودت را نمایش می‌دهیم.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814" },
  hero: { padding: 24 },
  title: { fontSize: 22, color: "#F5A623", fontWeight: "700" },
  subtitle: { marginTop: 8, color: "#8A8F9C" },
  section: { paddingHorizontal: 16, paddingVertical: 12 },
  sectionTitle: { color: "#3ED9C7", fontSize: 16, marginBottom: 8 },
  card: {
    backgroundColor: "#0F111F",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#23262E",
    color: "#F4F1EA",
  },
});
