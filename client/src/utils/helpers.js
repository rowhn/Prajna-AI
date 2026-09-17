export const formatDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString();
};

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

export const generateTitle = (message) => {
  return message.length > 40 ? message.substring(0, 40) + '...' : message;
};