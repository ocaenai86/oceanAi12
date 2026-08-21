import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

const API_BASE = "https://your-backend-domain.com/api";

export default function OceanAIIdeaMachineSmart({ mode = "public" }) {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ------------------------------
     اتصال استاندارد به API OceanAI
  ------------------------------ */
  const callApi = async (path, body) => {
    try {
      const res = await fetch(`${API_BASE}/ai/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      return await res.json();
    } catch (err) {
      return { error: "خطا در اتصال به سرور OceanAI" };
    }
  };

  /* ------------------------------
     تولید ایده — Generate Idea
  ------------------------------ */
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");
    setSuggestions([]);

    const data = await callApi("generate", {
      prompt,
      context,
      mode,
    });

    if (data?.result) {
      setResult(data.result);
    } else {
      setResult(data?.error || "پاسخی دریافت نشد.");
    }

    setLoading(false);
  };

  /* ------------------------------
     پیشنهاد پرامپت — Suggest Prompt
  ------------------------------ */
  const handleSuggest = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");
    setSuggestions([]);

    const data = await callApi("suggest", {
      base: prompt,
    });

    if (data?.suggestions) {
      setSuggestions(data.suggestions);
    } else {
      setResult(data?.error || "پیشنهادی دریافت نشد.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {mode === "public"
          ? "پرامپت برای تولید ایدهٔ کسب‌درآمد"
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

      {/* دکمه‌ها */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#050814" />
          ) : (
            <Text style={styles.buttonText}>تولید ایده</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleSuggest}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#F4F1EA" />
          ) : (
            <Text style={styles.secondaryButtonText}>پیشنهاد پرامپت</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* نمایش نتیجه */}
      {result ? <Text style={styles.result}>{result}</Text> : null}

      {/* نمایش پیشنهادها */}
      {suggestions.length > 0 ? (
        <ScrollView style={styles.suggestionBox}>
          {suggestions.map((s, i) => (
            <Text key={i} style={styles.suggestionItem}>
              • {s}
            </Text>
          ))}
        </ScrollView>
      ) : null}
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
  row: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F5A623",
    alignItems: "center",
  },
  buttonText: { color: "#050814", fontSize: 12, fontWeight: "600" },
  secondaryButton: {
    backgroundColor: "#23262E",
  },
  secondaryButtonText: {
    color: "#F4F1EA",
    fontSize: 12,
    fontWeight: "600",
  },
  result: {
    marginTop: 10,
    color: "#F4F1EA",
    fontSize: 12,
    lineHeight: 18,
  },
  suggestionBox: {
    marginTop: 10,
    backgroundColor: "#050814",
    padding: 10,
    borderRadius: 10,
  },
  suggestionItem: {
    color: "#F4F1EA",
    fontSize: 12,
    marginBottom: 6,
  },
});
