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

// function encodeImageFileAsURL(element) {
//   var file = element.files[0];
//   var reader = new FileReader();
//   reader.onloadend = function() {
//     console.log('RESULT', reader.result)
//   }
//   reader.readAsDataURL(file);
// }
// <input type="file" onchange="encodeImageFileAsURL(this)" />
