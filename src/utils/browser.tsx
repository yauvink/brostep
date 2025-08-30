export const isIos = () => {
  // return true
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const iOsPadding = () => {
  return 0;
  // return isIos() ? 50 : 0;
};
