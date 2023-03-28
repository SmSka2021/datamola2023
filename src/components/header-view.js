import {
  createElem,
  createDiv,
  createText,
  createImg,
  createBtn,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';

class HeaderView {
  constructor(id) {
    this.id = id;
  }

  // eslint-disable-next-line class-methods-use-this
  setUser(nameUser) {
    const elem = document.querySelector('.user__name');
    elem.textContent = nameUser;
  }

  display() {
    const parentElem = document.getElementById(this.id);
    const header = createElem('header', ['header']);
    header.id = 'header';
    const containerLogo = createDiv(['container__logo']);
    const imgLogo = createImg(srcImgCollection.logo, 'logo', ['logo__img']);
    const logoTitle = createText('h3', 'Task Manager', ['logo__title']);
    containerLogo.append(imgLogo, logoTitle);

    const containerThema = createDiv(['container__thema']);
    const themaBtnLiht = createBtn('', ['thema__btn', 'sunny']);
    const imgLightThema = createImg(srcImgCollection.lightThema, 'white thema', ['thema__img']);
    themaBtnLiht.append(imgLightThema);
    const spanSlesh = createText('span', ' / ');
    const themaBtnDark = createBtn('', ['thema__btn', 'dark']);
    const imgDarkThema = createImg(srcImgCollection.darkThema, 'dark thema', ['thema__img']);
    themaBtnDark.append(imgDarkThema);
    containerThema.append(themaBtnLiht, spanSlesh, themaBtnDark);

    const containerAuth = createDiv(['container__authorize']);
    const containerUserName = createDiv(['container__userName']);
    const imgIconUser = createImg(srcImgCollection.iconUser, 'icon user', ['user__img']);
    const itemNameUser = createText('p', 'user', ['user__name']);
    containerUserName.append(imgIconUser, itemNameUser);
    const btnLogOut = createBtn('LogOut', ['light_btn', 'btn']);
    containerAuth.append(containerUserName, btnLogOut);
    header.append(containerLogo, containerThema, containerAuth);
    parentElem.replaceWith(header);
  }
}
export default HeaderView;
