/**
 * OceanAI — Database Client
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import mongoose from "mongoose";

/* ------------------------------
   بررسی وجود URI دیتابیس
------------------------------ */
if (!process.env.OCEANAI_DB_URI) {
  console.error("❌ خطا: مقدار OCEANAI_DB_URI تنظیم نشده است.");
  throw new Error("OceanAI database URI is missing.");
}

/* ------------------------------
   تنظیمات اتصال دیتابیس
------------------------------ */
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // جلوگیری از هنگ کردن سرور
};

/* ------------------------------
   اتصال اصلی OceanAI Database
------------------------------ */
export async function connectDB() {
  try {
    await mongoose.connect(process.env.OCEANAI_DB_URI, dbOptions);

    console.log("✅ اتصال موفق به دیتابیس OceanAI برقرار شد.");
    return { success: true };
  } catch (err) {
    console.error("❌ خطا در اتصال به دیتابیس OceanAI:", err);
    return {
      success: false,
      error: err?.message || "خطا در اتصال به دیتابیس",
    };
  }
}

/* ------------------------------
   مدیریت رویدادهای دیتابیس
------------------------------ */
mongoose.connection.on("connected", () => {
  console.log("🔵 OceanAI DB Connected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🟢 OceanAI DB Reconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ خطای دیتابیس OceanAI:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ اتصال دیتابیس OceanAI قطع شد.");
});

export default mongoose;
