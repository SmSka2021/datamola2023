const convertorImg64 = (selectorId) => {
  const c = document.createElement('canvas');
  const img = document.getElementById(selectorId);
  c.height = img.naturalHeight;
  c.width = img.naturalWidth;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, c.width, c.height);
  const base64String = c.toDataURL();
  return base64String.slice(22);
};
export default convertorImg64;
