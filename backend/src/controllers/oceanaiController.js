/**
 * OceanAI — Main Controller
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

/* ------------------------------
   دریافت آمار داشبورد — Dashboard Stats
------------------------------ */
export const getStats = async (req, res) => {
  try {
    // در آینده اتصال واقعی به دیتابیس:
    // const stats = await StatsModel.findOne({ userId: req.user.id });

    const stats = {
      projects: 12,
      income: 4500000,
      ideas: 87,
      markets: [
        "فریلنسری",
        "اتوماسیون کسب‌وکار",
        "طراحی سایت و اپ",
        "تحلیل بازارهای دیجیتال"
      ]
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    console.error("❌ OceanAI Stats Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در دریافت آمار OceanAI"
    });
  }
};

/* ------------------------------
   ذخیره تنظیمات کاربر — User Settings
------------------------------ */
export const saveSettings = async (req, res) => {
  try {
    const { darkMode, email } = req.body;

    // در آینده ذخیره واقعی در دیتابیس:
    // await SettingsModel.updateOne({ userId: req.user.id }, { darkMode, email });

    res.json({
      success: true,
      data: { darkMode, email }
    });
  } catch (err) {
    console.error("❌ OceanAI Settings Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در ذخیره تنظیمات OceanAI"
    });
  }
};
