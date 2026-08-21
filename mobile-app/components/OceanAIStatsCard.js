import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OceanAIStatsCard({ label, value, color }) {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F111F",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  label: { fontSize: 13, marginBottom: 4 },
  value: { color: "#F4F1EA", fontSize: 16, fontWeight: "600" },
});
