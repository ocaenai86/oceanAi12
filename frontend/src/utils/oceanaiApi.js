/**
 * OceanAI API Utility
 * نسخهٔ پیشرفته، امن، و هماهنگ با OceanAI Studio و Design System
 */

const API_BASE = "https://your-backend-domain.com/api";

/** درخواست عمومی OceanAI */
async function oceanaiRequest(endpoint, payload) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.error) {
      console.error("OceanAI API Error:", data.error);
      return { success: false, error: data.error };
    }

    return { success: true, result: data.result };
  } catch (err) {
    console.error("OceanAI Network Error:", err);
    return { success: false, error: "اتصال به OceanAI برقرار نشد." };
  }
}

/** تولید ایده */
export async function generateIdea(prompt, context = "") {
  const response = await oceanaiRequest("/ai/generate", { prompt, context });
  return response;
}

/** تحلیل کد */
export async function analyzeCode(code, goal = "") {
  const response = await oceanaiRequest("/ai/code-assistant", { code, goal });
  return response;
}

/** تولید محتوا */
export async function generateContent(topic, style = "default") {
  const response = await oceanaiRequest("/ai/content", { topic, style });
  return response;
}

/** ساخت اتوماسیون */
export async function buildAutomation(config) {
  const response = await oceanaiRequest("/ai/automation", config);
  return response;
}
