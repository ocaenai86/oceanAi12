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

export default function PricingScreen() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------------------
     دریافت پلن‌ها از API OceanAI
     GET /api/oceanai/pricing
  ------------------------------ */
  const fetchPricing = async () => {
    try {
      const res = await fetch(`${API_BASE}/oceanai/pricing`);
      const data = await res.json();

      if (data?.success === false) {
        setError(data.error || "خطا در دریافت پلن‌ها");
      } else {
        setPlans(data.plans || []);
      }
    } catch (err) {
      setError("خطا در اتصال به OceanAI");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  /* ------------------------------
     انتخاب / خرید پلن
     (در نسخهٔ بعدی می‌تواند به Billing API وصل شود)
  ------------------------------ */
  const handleSelectPlan = (plan) => {
    // اینجا بعداً به /api/billing/checkout وصل می‌شود
    alert(`پلن انتخاب‌شده: ${plan.name}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>پلن‌های OceanAI</Text>
      <Text style={styles.subtitle}>
        انتخاب پلن مناسب برای اتوماسیون، فریلنسری و کسب‌درآمد با OceanAI.
      </Text>

      {loading ? (
        <ActivityIndicator color="#3ED9C7" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : plans.length === 0 ? (
        <Text style={styles.empty}>هیچ پلنی در حال حاضر فعال نیست.</Text>
      ) : (
        plans.map((plan) => (
          <View key={plan.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>
                {plan.price === 0 ? "رایگان" : `${plan.price} تومان / ماه`}
              </Text>
            </View>

            <Text style={styles.planDesc}>{plan.description}</Text>

            <View style={styles.features}>
              {plan.features?.map((f, i) => (
                <Text key={i} style={styles.featureItem}>
                  • {f}
                </Text>
              ))}
            </View>

            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => handleSelectPlan(plan)}
            >
              <Text style={styles.selectText}>
                {plan.price === 0 ? "شروع رایگان" : "انتخاب این پلن"}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* بخش توضیح نسخه‌های بالاتر */}
      <View style={styles.ultraSection}>
        <Text style={styles.ultraTitle}>نسخه‌های پیشرفته OceanAI</Text>
        <Text style={styles.ultraItem}>• OceanAI Pro برای فریلنسرهای حرفه‌ای</Text>
        <Text style={styles.ultraItem}>• OceanAI Ultra برای آژانس‌ها و تیم‌ها</Text>
        <Text style={styles.ultraItem}>• اتصال به Billing و پرداخت آنلاین</Text>
        <Text style={styles.ultraItem}>• مدیریت اشتراک‌ها و فاکتورها</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050814", padding: 16 },

  title: { fontSize: 22, color: "#3ED9C7", fontWeight: "700" },
  subtitle: { color: "#8A8F9C", marginBottom: 16, lineHeight: 20 },

  error: { color: "#FF6B6B", marginTop: 12 },
  empty: { color: "#8A8F9C", marginTop: 20, fontSize: 14 },

  card: {
    backgroundColor: "#0F111F",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#23262E",
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  planName: { color: "#F5A623", fontSize: 16, fontWeight: "600" },
  planPrice: { color: "#3ED9C7", fontSize: 14, fontWeight: "600" },
  planDesc: { color: "#F4F1EA", marginTop: 4, lineHeight: 18, fontSize: 13 },

  features: { marginTop: 8 },
  featureItem: { color: "#8A8F9C", fontSize: 12, marginBottom: 2 },

  selectButton: {
    marginTop: 12,
    backgroundColor: "#3ED9C7",
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  selectText: { color: "#050814", fontWeight: "700", fontSize: 13 },

  ultraSection: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#0F111F",
    borderWidth: 1,
    borderColor: "#23262E",
  },
  ultraTitle: { color: "#F5A623", fontSize: 16, marginBottom: 8 },
  ultraItem: { color: "#8A8F9C", marginBottom: 4, fontSize: 12 },
});
