export const isImageFromURL = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const isResolvedImage = (url) => {
  return /^(https?:\/\/|data:image\/)/.test(url);
};

export const isInputImage = (url) => {
  return isImageFromURL(url) || isResolvedImage(url);
};
