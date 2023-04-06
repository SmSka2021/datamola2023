// export const converterImgToBase64 = (selector) => {
//   const image = document.querySelector(selector);
//   const getBase64StringFromDataURL = (dataURL) =>
// dataURL.replace('data:', '').replace(/^.+,/, '');
//   // Get the remote image as a Blob with the fetch API
//   fetch(image.src)
//     .then((res) => res.blob())
//     .then((blob) => {
//       // Read the Blob as DataURL using the FileReader API
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         console.log(reader.result);
//         // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...
//         // Convert to Base64 string
//         const base64 = getBase64StringFromDataURL(reader.result);
//         console.log(base64);
//         return base64;
//       };
//       reader.readAsDataURL(blob);
//     });
// };

// <img id='Img1' src='someurl'>

export const convertorImg64 = (selectorId) => {
  const c = document.createElement('canvas');
  const img = document.getElementById(selectorId);
  c.height = img.naturalHeight;
  c.width = img.naturalWidth;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, c.width, c.height);
  const base64String = c.toDataURL();
  return base64String.slice(22);
};

export const userMy = {
  login: 'SmSka',
  userName: 'SmS',
  password: 'ZXCzxc123.',
  retypedPassword: 'ZXCzxc123.',
  photo: '',
};
