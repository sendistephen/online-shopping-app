export const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  }
  return { color: '#fff' };
};
