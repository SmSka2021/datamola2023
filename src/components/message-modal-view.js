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

  display() {
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['container_Modal_create_task', 'sction__confirm_modal']);
    newsectionTasks.id = 'create_task';
    const modalWraper = createDiv(['wrapper__confirm_modal']);
    const modalContainer = createDiv(['container__confirm_modal']);
    const modal = createDiv(['modal']);
    const btnClose = createBtn('X', ['form__btn_close', 'close_confirm'], 'button', 'Close');
    const title = createText('h4', 'You can edit and delete only your own tasks', ['confirm__modal_title', 'message_title']);

    modal.append(btnClose, title);
    modalContainer.append(modal);
    newsectionTasks.append(modalWraper, modalContainer);
    parentElem.replaceWith(newsectionTasks);
  }
}
export default MessageModalView;
