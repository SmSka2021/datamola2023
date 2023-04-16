/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createBtn,
  createText,
} from '../ultilites/create-element';
import { getElement } from '../ultilites/get-element';

class ConfirmModalView {
  constructor(id) {
    this.id = id;
  }

  bindCloseConfirm(handler) {
    const btn = getElement('.close_confirm');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        handler();
      });
    }
  }

  bindConfirmNot(handler) {
    const btn = getElement('.not');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        handler();
      });
    }
  }

  bindConfirmYes(handler) {
    const btn = getElement('.yes');
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        handler();
      });
    }
  }

  display() {
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['container_Modal_create_task', 'section__confirm_modal']);
    newsectionTasks.id = 'create_task';
    const modalWraper = createDiv(['wrapper__confirm_modal']);
    const modalContainer = createDiv(['container__confirm_modal']);
    const modal = createDiv(['modal']);
    const btnClose = createBtn('X', ['form__btn_close', 'close_confirm'], 'button', 'Close');
    const title = createText('h4', isRu ? 'Вы уверены?' : 'A you sure?', ['confirm__modal_title']);
    const containerBtn = createDiv(['confirm__modal_btns']);
    const btnNot = createBtn(isRu ? 'Нет' : 'No', ['light_btn', 'btn', 'confirm__modal_btn', 'not'], 'button', 'Not Delete');
    const yesBtn = createBtn(isRu ? 'Да' : 'Yes', ['light_btn', 'btn', 'confirm__modal_btn', 'yes'], 'button', 'Delete Task');
    containerBtn.append(btnNot, yesBtn);
    modal.append(btnClose, title, containerBtn);
    modalContainer.append(modal);
    newsectionTasks.append(modalWraper, modalContainer);
    parentElem.replaceWith(newsectionTasks);
  }
}
export default ConfirmModalView;
