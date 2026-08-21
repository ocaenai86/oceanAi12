export const loadFiles = async () => {
  const result = await window.storage.get('code-studio-files', false);
  return result?.value ? JSON.parse(result.value) : null;
};

export const saveFiles = async (files) => {
  await window.storage.set('code-studio-files', JSON.stringify(files), false);
};
