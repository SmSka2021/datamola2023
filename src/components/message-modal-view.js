/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createBtn,
  createText,
} from '../ultilites/create-element';
import { getElement } from '../ultilites/get-element';

class MessageModalView {
  constructor(id) {
    this.id = id;
  }

  bindCloseMessageModal(handler) {
    const btn = getElement('.close_confirm');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  display(text) {
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['section__confirm_modal']);
    newsectionTasks.id = 'modal_message';
    const modalWraper = createDiv(['wrapper__confirm_modal']);
    const modalContainer = createDiv(['container__confirm_modal']);
    const modal = createDiv(['modal']);
    const btnClose = createBtn('X', ['form__btn_close', 'close_confirm'], 'button', 'Close');
    const title = createText('h4', `${text}`, ['confirm__modal_title', 'message_title']);

    modal.append(btnClose, title);
    modalContainer.append(modal);
    newsectionTasks.append(modalWraper, modalContainer);
    parentElem.replaceWith(newsectionTasks);
  }
}
export default MessageModalView;
