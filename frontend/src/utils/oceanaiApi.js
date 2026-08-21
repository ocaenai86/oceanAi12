export async function generateIdea(prompt, context) {
  const res = await fetch('https://your-backend-domain.com/api/ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, context }),
  });

  const data = await res.json();
  return data.result;
}

export async function analyzeCode(code, goal) {
  const res = await fetch('https://your-backend-domain.com/api/ai/code-assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, goal }),
  });

  const data = await res.json();
  return data.result;
}
