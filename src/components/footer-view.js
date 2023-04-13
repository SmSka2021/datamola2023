import {
  createElem,
  createText,
  createImg,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import convertationDate from '../ultilites/convertation-date';

class FooterView {
  constructor(id) {
    this.id = id;
  }

  display() {
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';
    const parentElem = document.getElementById(this.id);
    const footer = createElem('footer', ['footer']);
    footer.id = 'footer';
    const footerTitle = createText('h5', isRu ? 'Менеджер задач' : 'Task Manager', ['footer__title']);
    const adress = createElem('address', ['container__email']);
    const myName = createText('p', isRu ? 'Светлана Мацкевич' : 'Sviatlana Matskevich', ['name__title']);
    const imgEmail = createImg(srcImgCollection.email, 'icon email');
    const ancor = createElem('a', ['email__title']);
    ancor.textContent = 'Sve-Mac@yandex.ru';
    ancor.href = 'mailto: Sve-Mac@yandex.ru';
    adress.append(myName, imgEmail, ancor);
    const date = createText('p', `${convertationDate(new Date('2023-04-13').toISOString())}`, ['footer__date']);
    footer.append(footerTitle, adress, date);
    parentElem.replaceWith(footer);
  }
}
export default FooterView;
