const callApi = async (path, body) => {
  const res = await fetch(`https://your-backend-domain.com/api/ai/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
};
