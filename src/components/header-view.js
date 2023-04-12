/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createText,
  createImg,
  createBtn,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import { getElement } from '../ultilites/get-element';

class HeaderView {
  constructor(id) {
    this.id = id;
  }

  bindOpenLoginModalHeader(handler) {
    const btnLogIn = getElement('.login_header');
    if (btnLogIn) {
      btnLogIn.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  bindLogOutHeader(handler) {
    const btnLogUot = getElement('.logout_btn_header');
    if (btnLogUot) {
      btnLogUot.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  bindOpenProfileUserFromHeader(handler) {
    const btn = getElement('.header_for_auth_user');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  bindSetDarkTheme(handler) {
    const btn = getElement('.img_dark_theme');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  bindSetLightTheme(handler) {
    const btn = getElement('.img_light_theme');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  bindSetRuLang(handler) {
    const btn = getElement('.ru_lang');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        event.target.classList.add('active_lang');
        getElement('.en_lang').classList.remove('active_lang');
        handler();
      });
    }
  }

  bindSetEnLang(handler) {
    const btn = getElement('.en_lang');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.target.classList.add('active_lang');
        getElement('.ru_lang').classList.remove('active_lang');
        event.stopPropagation();
        handler();
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setUser = () => {
    if (localStorage.getItem('dataUserServer')) {
      const dataUserServer = JSON.parse(localStorage.getItem('dataUserServer'));
      const elem = getElement('.user__name');
      const avatarImg = getElement('.user__img_avatar');
      elem.textContent = dataUserServer.userName;
      avatarImg.src = `data:image/png;base64,${dataUserServer.photo}`;
    } else {
      return null;
    }
  };

  checkIsGuest = () => localStorage.getItem('statusUser');

  isAuthUser = () => JSON.parse(localStorage.getItem('auth'));

  display() {
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';
    const parentElem = document.getElementById(this.id);
    const header = createElem('header', ['header']);
    header.id = 'header';
    const containerLogo = createDiv(['container__logo']);
    const imgLogo = createImg(srcImgCollection.logo, 'logo', ['logo__img']);
    const logoTitle = createText('h3', isRu ? 'Менеджер задач' : 'Task Manager', ['logo__title']);
    containerLogo.append(imgLogo, logoTitle);

    const containerThema = createDiv(['container__thema']);
    const themaBtnLiht = createBtn('', ['thema__btn', 'sunny'], 'button', 'Light theme');
    const imgLightThema = createImg(srcImgCollection.lightThema, 'white thema', ['thema__img', 'img_light_theme']);
    themaBtnLiht.append(imgLightThema);
    const spanSlesh = createText('span', ' / ');
    const themaBtnDark = createBtn('', ['thema__btn', 'dark', 'check_btn'], 'button', 'Dark theme');
    const imgDarkThema = createImg(srcImgCollection.darkThema, 'dark thema', ['thema__img', 'img_dark_theme']);
    themaBtnDark.append(imgDarkThema);
    containerThema.append(themaBtnLiht, spanSlesh, themaBtnDark);

    const containerLang = createDiv(['container__lang']);
    const enLang = createText('span', isRu ? 'Анг ' : 'En ', ['en_lang']);
    const slach = createText('span', ' / ', ['en_lang']);
    const ruLang = createText('span', isRu ? ' Рус' : ' Ru', ['ru_lang']);
    containerLang.append(enLang, slach, ruLang);
    if (lang === 'ru') ruLang.classList.add('active_lang');
    else enLang.classList.add('active_lang');
    const containerAuth1 = createDiv(['container__authorize', 'header_for_auth_user']);
    const containerUserName1 = createDiv(['container__userName']);
    const imgIconUser1 = createImg(srcImgCollection.iconUser, 'icon user', ['user__img_avatar']);
    const itemNameUser1 = createText('p', 'user', ['user__name', 'set_name']);
    containerUserName1.append(imgIconUser1, itemNameUser1);
    const btnLogOut1 = createBtn(isRu ? 'Выйти' : 'LogOut', ['light_btn', 'btn', 'logout_btn_header']);
    containerAuth1.append(containerUserName1, btnLogOut1);

    const containerAuth2 = createDiv(['container__authorize', 'header_for_guest_user']);
    const containerUserName2 = createDiv(['container__userName']);
    const imgIconUser2 = createImg(srcImgCollection.iconUser, 'icon user', ['user__img']);
    const itemNameUser2 = createText('p', isRu ? 'Гость' : 'Guest', ['user__name']);
    containerUserName2.append(imgIconUser2, itemNameUser2);
    const btnLogOut2 = createBtn(isRu ? 'Войти' : 'LogIn', ['light_btn', 'btn', 'login_header']);
    containerAuth2.append(containerUserName2, btnLogOut2);
    header.append(containerAuth1, containerAuth2);

    if (this.isAuthUser()) {
      containerAuth1.classList.remove('display_none');
      containerAuth2.classList.add('display_none');
    }
    if (this.checkIsGuest()) {
      containerAuth1.classList.add('display_none');
      containerAuth2.classList.remove('display_none');
    }
    if (!this.checkIsGuest() && !this.isAuthUser()) {
      containerAuth1.classList.add('display_none');
      containerAuth2.classList.add('display_none');
    }

    header.prepend(containerLogo, containerLang, containerThema);
    parentElem.replaceWith(header);
    this.setUser();
  }
}
export default HeaderView;
