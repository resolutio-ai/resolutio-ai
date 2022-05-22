import axios from "axios";

export const isImageFromURL = (url) => {
  return /\.(jpg|jpeg|png|webp|tif|tiff|webp|ppm|bmp|pgm)(.*?)$/.test(url);
};

export const isResolvedImage = async (url) => {
  try {
    const response = await axios.head(url);
    const contentType = response.headers["content-type"];
    console.log(response.headers["content-type"]);
    return /image\/(jpg|jpeg|png|webp|tif|tiff|webp)$/.test(contentType);
  } catch (error) {
    return false;
  }
};

export const isInputImage = async (url) => {
  return isImageFromURL(url) || isResolvedImage(url);
};
