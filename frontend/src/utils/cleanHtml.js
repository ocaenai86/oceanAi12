/**
 * OceanAI Clean HTML Utility
 * نسخهٔ پیشرفته برای پاک‌سازی خروجی مدل‌ها، جلوگیری از XSS،
 * حذف تگ‌های غیرضروری و هماهنگ با OceanAI Studio.
 */

export const cleanHtml = (html = "") => {
  if (typeof html !== "string") return "";

  try {
    let cleaned = html;

    // حذف تگ‌های ساختاری HTML
    cleaned = cleaned.replace(
      /<!DOCTYPE[^>]*>|<\/?html[^>]*>|<\/?head[^>]*>|<\/?body[^>]*>/gi,
      ""
    );

    // حذف meta و title
    cleaned = cleaned.replace(/<meta[^>]*>/gi, "");
    cleaned = cleaned.replace(/<title>[^<]*<\/title>/gi, "");

    // حذف اسکریپت‌ها (امنیت OceanAI)
    cleaned = cleaned.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

    // حذف iframe و embed (امنیت)
    cleaned = cleaned.replace(/<(iframe|embed)[^>]*>[\s\S]*?<\/\1>/gi, "");

    // حذف استایل‌های inline خطرناک
    cleaned = cleaned.replace(/style="[^"]*"/gi, "");

    // حذف onClick و event handlerها
    cleaned = cleaned.replace(/\son[a-z]+="[^"]*"/gi, "");

    // حذف کامنت‌های HTML
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "");

    // حذف فضای اضافی
    cleaned = cleaned.trim();

    return cleaned;
  } catch (err) {
    console.error("OceanAI CleanHTML Error:", err);
    return "";
  }
};
