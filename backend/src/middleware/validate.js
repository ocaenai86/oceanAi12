/**
 * OceanAI — Validation Middleware
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

export const validate = (rules = []) => {
  return (req, res, next) => {
    try {
      const errors = [];

      // بررسی هر قانون اعتبارسنجی
      rules.forEach((rule) => {
        const { field, required, type, min, max } = rule;
        const value = req.body[field];

        // بررسی مقدار ضروری
        if (required && (value === undefined || value === null || value === "")) {
          errors.push(`${field} الزامی است.`);
        }

        // بررسی نوع داده
        if (type && value !== undefined && typeof value !== type) {
          errors.push(`${field} باید از نوع ${type} باشد.`);
        }

        // حداقل طول
        if (min && value && value.length < min) {
          errors.push(`${field} باید حداقل ${min} کاراکتر باشد.`);
        }

        // حداکثر طول
        if (max && value && value.length > max) {
          errors.push(`${field} باید حداکثر ${max} کاراکتر باشد.`);
        }
      });

      // اگر خطا وجود داشت
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          error: "اعتبارسنجی ناموفق بود.",
          details: errors
        });
      }

      next();
    } catch (err) {
      console.error("❌ OceanAI Validation Error:", err);

      res.status(500).json({
        success: false,
        error: "خطا در سیستم اعتبارسنجی OceanAI"
      });
    }
  };
};
