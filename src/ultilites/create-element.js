// -----------function-builders------------- //
export const createDiv = (classes = []) => {
  const div = document.createElement('div');
  if (classes.length) {
    classes.forEach((classElem) => div.classList.add(classElem));
  }
  return div;
};

export const createElem = (tag, classes = []) => {
  const elem = document.createElement(`${tag}`);
  if (classes.length) {
    classes.forEach((classElem) => elem.classList.add(classElem));
  }
  return elem;
};
export const createText = (tag, text, classes = []) => {
  const textBlock = document.createElement(tag);
  textBlock.textContent = text;
  if (classes.length) {
    classes.forEach((classElem) => textBlock.classList.add(classElem));
  }
  return textBlock;
};
export const createImg = (src, alt, classes = []) => {
  const image = new Image();
  image.src = src;
  image.alt = alt;
  if (classes.length) {
    classes.forEach((classElem) => image.classList.add(classElem));
  }
  return image;
};

export const createBtn = (name = '', classes = [], type = 'button', title = null) => {
  const btn = document.createElement('button');
  btn.textContent = name;
  btn.type = type;
  btn.title = title;
  if (classes.length) {
    classes.forEach((classElem) => btn.classList.add(classElem));
  }
  return btn;
};

export const createInput = (type, classes = [], placeholder = null) => {
  const input = document.createElement('input');
  input.placeholder = placeholder;
  input.type = type;
  if (classes.length) {
    classes.forEach((classElem) => input.classList.add(classElem));
  }
  return input;
};

export const createInputRadio = (type, name, value, id, checked = false, classes = []) => {
  const input = document.createElement('input');
  input.name = name;
  input.type = type;
  input.id = id;
  input.value = value;
  if (classes.length) {
    classes.forEach((classElem) => input.classList.add(classElem));
  }
  if (checked) {
    input.checked = true;
  }
  return input;
};
