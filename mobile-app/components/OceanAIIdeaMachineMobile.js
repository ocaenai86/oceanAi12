import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const API_BASE = "https://your-backend-domain.com/api";

export default function OceanAIIdeaMachineMobile({ mode = "public" }) {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const callApi = async (path, body) => {
    const res = await fetch(`${API_BASE}/ai/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const data = await callApi("generate", { prompt, context, mode });
      setResult(data.result || "پاسخی دریافت نشد.");
    } catch {
      setResult("خطا در اتصال به OceanAI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {mode === "public"
          ? "پرامپت برای ایدهٔ کسب‌درآمد"
          : "پرامپت شخصی برای خودت"}
      </Text>

      <TextInput
        value={prompt}
        onChangeText={setPrompt}
        style={styles.input}
        multiline
        placeholder="مثلاً: ایده برای اتوماسیون مشتری‌های اینستاگرام..."
        placeholderTextColor="#6B7280"
      />

      <Text style={styles.label}>کانتکست (اختیاری)</Text>

      <TextInput
        value={context}
        onChangeText={setContext}
        style={styles.input}
        multiline
        placeholder="مثلاً: من فریلنسر طراحی سایت هستم..."
        placeholderTextColor="#6B7280"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleGenerate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#050814" />
        ) : (
          <Text style={styles.buttonText}>تولید ایده با OceanAI</Text>
        )}
      </TouchableOpacity>

      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F111F",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#23262E",
  },
  label: { color: "#8A8F9C", fontSize: 12, marginBottom: 4 },
  input: {
    backgroundColor: "#050814",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#23262E",
    color: "#F4F1EA",
    padding: 8,
    fontSize: 12,
    marginBottom: 8,
    minHeight: 60,
  },
  button: {
    marginTop: 4,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F5A623",
    alignItems: "center",
  },
  buttonText: { color: "#050814", fontSize: 12, fontWeight: "600" },
  result: {
    marginTop: 10,
    color: "#F4F1EA",
    fontSize: 12,
    lineHeight: 18,
  },
});
