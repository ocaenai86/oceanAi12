import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from "react-native";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("ocaenai.86@gmail.com");

  const handleSave = async () => {
    await fetch("https://your-backend-domain.com/api/oceanai/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ darkMode, email }),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تنظیمات شخصی OceanAI</Text>

      <View style={styles.row}>
        <Text style={styles.label}>حالت تاریک</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} thumbColor="#3ED9C7" />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>ایمیل ارتباطی</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="ایمیل خود را وارد کنید"
          placeholderTextColor="#6B7280"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>ذخیره تنظیمات</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814", padding: 16 },
  title: { fontSize: 20, color: "#F5A623", fontWeight: "700", marginBottom: 16 },
  row: { marginBottom: 12 },
  label: { color: "#8A8F9C", marginBottom: 4 },
  input: {
    backgroundColor: "#0F111F",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#23262E",
    color: "#F4F1EA",
    padding: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3ED9C7",
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: { color: "#050814", fontWeight: "600" },
});
