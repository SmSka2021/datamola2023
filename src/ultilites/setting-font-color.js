import { getElement } from './get-element';

export const settingColorFontLight = (selector) => {
  const elem = getElement(selector);
  elem.classList.add('light_color');
  elem.classList.remove('dark_font');
};

export const settingColorFontDark = (selector) => {
  const elem = getElement(selector);
  elem.classList.remove('light_color');
  elem.classList.add('dark_font');
};
