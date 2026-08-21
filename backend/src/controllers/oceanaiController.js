export const getStats = async (req, res) => {
  res.json({
    projects: 12,
    income: 4500000,
    ideas: 87,
    markets: ["فریلنسری", "اتوماسیون کسب‌وکار", "طراحی سایت و اپ", "تحلیل بازارهای دیجیتال"],
  });
};

export const saveSettings = async (req, res) => {
  const { darkMode, email } = req.body;
  res.json({ success: true, darkMode, email });
};
