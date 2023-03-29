export const getElement = (selector) => {
  const element = document.querySelector(selector);
  return element;
};

export const getElements = (selector) => {
  const elements = document.querySelectorAll(selector);
  return elements;
};
