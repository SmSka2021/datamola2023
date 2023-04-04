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

  // eslint-disable-next-line class-methods-use-this
  setUser = (nameUser, avatar) => {
    const elem = getElement('.user__name');
    const avatarImg = getElement('.user__img');
    elem.textContent = nameUser;
    avatarImg.src = avatar;
  };

  setDarkThema = (e) => {
    e.stopPropagation();
    getElement('#main').style.backgroundImage = 'url(./../assets/img/dark_fon3.png)';
    getElement('#main_task').style.backgroundImage = 'url(./../assets/img/dark_fon3.png)';
    getElement('.sunny').classList.toggle('check_btn');
    getElement('.dark').classList.toggle('check_btn');
  };

  setLightThema = (e) => {
    e.stopPropagation();
    getElement('#main').style.backgroundImage = 'url(./../assets/img/light_fon.jpg)';
    getElement('#main_task').style.backgroundImage = 'url(./../assets/img/light_fon.jpg)';
    getElement('.sunny').classList.toggle('check_btn');
    getElement('.dark').classList.toggle('check_btn');
  };

  checkIsGuest = () => localStorage.getItem('statusUser');

  isAuthUser = () => JSON.parse(localStorage.getItem('auth'));

  display() {
    const parentElem = document.getElementById(this.id);
    const header = createElem('header', ['header']);
    header.id = 'header';
    const containerLogo = createDiv(['container__logo']);
    const imgLogo = createImg(srcImgCollection.logo, 'logo', ['logo__img']);
    const logoTitle = createText('h3', 'Task Manager', ['logo__title']);
    containerLogo.append(imgLogo, logoTitle);

    const containerThema = createDiv(['container__thema']);
    const themaBtnLiht = createBtn('', ['thema__btn', 'sunny', 'check_btn'], 'button', 'Light theme');
    const imgLightThema = createImg(srcImgCollection.lightThema, 'white thema', ['thema__img']);
    imgLightThema.addEventListener('click', this.setLightThema);
    themaBtnLiht.append(imgLightThema);
    const spanSlesh = createText('span', ' / ');
    const themaBtnDark = createBtn('', ['thema__btn', 'dark'], 'button', 'Dark theme');
    const imgDarkThema = createImg(srcImgCollection.darkThema, 'dark thema', ['thema__img']);
    imgDarkThema.addEventListener('click', this.setDarkThema);
    themaBtnDark.append(imgDarkThema);
    containerThema.append(themaBtnLiht, spanSlesh, themaBtnDark);

    const containerAuth1 = createDiv(['container__authorize', 'header_for_auth_user']);
    const containerUserName1 = createDiv(['container__userName']);
    const imgIconUser1 = createImg(srcImgCollection.iconUser, 'icon user', ['user__img']);
    const itemNameUser1 = createText('p', 'user', ['user__name', 'set_name']);
    containerUserName1.append(imgIconUser1, itemNameUser1);
    const btnLogOut1 = createBtn('LogOut', ['light_btn', 'btn', 'logout_btn_header']);
    containerAuth1.append(containerUserName1, btnLogOut1);

    const containerAuth2 = createDiv(['container__authorize', 'header_for_guest_user']);
    const containerUserName2 = createDiv(['container__userName']);
    const imgIconUser2 = createImg(srcImgCollection.iconUser, 'icon user', ['user__img']);
    const itemNameUser2 = createText('p', 'Guest', ['user__name']);
    containerUserName2.append(imgIconUser2, itemNameUser2);
    const btnLogOut2 = createBtn('LogIn', ['light_btn', 'btn', 'login_header']);
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

    header.prepend(containerLogo, containerThema);
    parentElem.replaceWith(header);
  }
}
export default HeaderView;
