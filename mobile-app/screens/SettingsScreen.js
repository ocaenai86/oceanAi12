import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const API_BASE = "https://your-backend-domain.com/api";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("oceanai.86@gmail.com");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ------------------------------
     ذخیره تنظیمات در API OceanAI
     POST /api/oceanai/settings
  ------------------------------ */
  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/oceanai/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ darkMode, email }),
      });

      const data = await res.json();

      if (data?.success) {
        setMessage("تنظیمات با موفقیت ذخیره شد.");
      } else {
        setMessage(data.error || "خطا در ذخیره تنظیمات.");
      }
    } catch (err) {
      setMessage("خطا در اتصال به OceanAI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تنظیمات شخصی OceanAI</Text>

      {/* حالت تاریک */}
      <View style={styles.row}>
        <Text style={styles.label}>حالت تاریک</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor="#3ED9C7"
          trackColor={{ true: "#1F2937", false: "#374151" }}
        />
      </View>

      {/* ایمیل */}
      <View style={styles.row}>
        <Text style={styles.label}>ایمیل ارتباطی</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="ایمیل خود را وارد کنید"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
        />
      </View>

      {/* دکمه ذخیره */}
      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#050814" />
        ) : (
          <Text style={styles.buttonText}>ذخیره تنظیمات</Text>
        )}
      </TouchableOpacity>

      {/* پیام وضعیت */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814", padding: 16 },
  title: { fontSize: 20, color: "#F5A623", fontWeight: "700", marginBottom: 16 },

  row: { marginBottom: 16 },
  label: { color: "#8A8F9C", marginBottom: 6, fontSize: 14 },

  input: {
    backgroundColor: "#0F111F",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#23262E",
    color: "#F4F1EA",
    padding: 10,
    fontSize: 14,
  },

  button: {
    marginTop: 10,
    backgroundColor: "#3ED9C7",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: { color: "#050814", fontWeight: "700", fontSize: 14 },

  message: {
    marginTop: 14,
    color:
