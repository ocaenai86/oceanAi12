export const saveProject = async (req, res) => {
  const { html, css, js } = req.body;
  // ذخیره در دیتابیس
  res.json({ status: 'ok' });
};
