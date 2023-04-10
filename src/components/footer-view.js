import {
  createElem,
  createText,
  createImg,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import convertationDate from '../ultilites/convertation-date';

//   ****************  ViewFooter   ********** //

class FooterView {
  constructor(id) {
    this.id = id;
  }

  display() {
    const parentElem = document.getElementById(this.id);
    const footer = createElem('footer', ['footer']);
    footer.id = 'footer';
    const footerTitle = createText('h5', 'Task Manager', ['footer__title']);
    const adress = createElem('address', ['container__email']);
    const myName = createText('p', 'Sviatlana Matskevich', ['name__title']);
    const imgEmail = createImg(srcImgCollection.email, 'icon email');
    const ancor = createElem('a', ['email__title']);
    ancor.textContent = 'Sve-Mac@yandex.ru';
    ancor.href = 'mailto: Sve-Mac@yandex.ru';
    adress.append(myName, imgEmail, ancor);
    const date = createText('p', `${convertationDate(new Date('2023-03-10').toISOString())}`, ['footer__date']);
    footer.append(footerTitle, adress, date);
    parentElem.replaceWith(footer);
  }
}
export default FooterView;
