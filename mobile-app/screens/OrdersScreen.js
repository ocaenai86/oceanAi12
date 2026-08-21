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

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------------------
     دریافت لیست سفارش‌ها از API OceanAI
  ------------------------------ */
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders/list`);
      const data = await res.json();

      if (data?.success === false) {
        setError(data.error || "خطا در دریافت سفارش‌ها");
      } else {
        setOrders(data.data || []);
      }
    } catch (err) {
      setError("خطا در اتصال به OceanAI");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>سفارش‌های OceanAI</Text>
      <Text style={styles.subtitle}>مدیریت سفارش‌ها و وضعیت آن‌ها</Text>

      {/* لودینگ */}
      {loading ? (
        <ActivityIndicator color="#3ED9C7" />
