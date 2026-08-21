// frontend/src/hooks/useStorage.js

/**
 * OceanAI Advanced Storage Hook
 * نسخهٔ پیشرفته برای ذخیره‌سازی فایل‌ها، تنظیمات و داده‌های CodeStudio
 * شامل: مدیریت خطا، نسخه‌گذاری، فشرده‌سازی، و سازگاری کامل با OceanAI Studio
 */

const STORAGE_KEY = "oceanai-code-studio-files";
const STORAGE_VERSION = "v1";

/** فشرده‌سازی داده‌ها برای ذخیره‌سازی بهتر */
const compress = (data) => {
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return null;
  }
};

/** باز کردن دادهٔ فشرده */
const decompress = (data) => {
  try {
    return JSON.parse(atob(data));
  } catch {
    return null;
  }
};

/** بارگذاری فایل‌ها */
export const loadFiles = async () => {
  try {
    const stored = await window.storage.get(STORAGE_KEY, false);

    if (!stored?.value) return null;

    const parsed = decompress(stored.value);

    // بررسی نسخه
    if (parsed?.version !== STORAGE_VERSION) {
      console.warn("OceanAI Storage: نسخهٔ داده قدیمی است.");
      return null;
    }

    return parsed?.files || null;
  } catch (err) {
    console.error("OceanAI Storage Error (loadFiles):", err);
    return null;
  }
};

/** ذخیره‌سازی فایل‌ها */
export const saveFiles = async (files) => {
  try {
    const payload = {
      version: STORAGE_VERSION,
      timestamp: Date.now(),
      files,
    };

    const compressed = compress(payload);

    if (!compressed) {
      console.error("OceanAI Storage: فشرده‌سازی داده انجام نشد.");
      return;
    }

    await window.storage.set(STORAGE_KEY, compressed, false);
  } catch (err) {
    console.error("OceanAI Storage Error (saveFiles):", err);
  }
};
