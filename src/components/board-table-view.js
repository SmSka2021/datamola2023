/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createImg,
  createBtn,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import { createIdList, taskStatusArr, translateStatus } from '../ultilites/field-task';
import OneTaskViewCard from './one-task-card-view';
import { getElements, getElement } from '../ultilites/get-element';
import { pathName } from '../ultilites/path';

class TaskFeedView {
  constructor(id) {
    this.id = id;
  }

  checkIsGuest = () => JSON.parse(localStorage.getItem('statusUser'));

  isAuthUser = () => JSON.parse(localStorage.getItem('auth'));

  bindDeleteTask(handler) {
    if (!this.isAuthUser()) return;
    const imgDelete = getElements('.img_delete');
    imgDelete.forEach((btn) => btn.addEventListener('click', (event) => {
      event.stopPropagation();
      handler(btn.dataset.id);
    }));
  }

  bindOpenTask(handler) {
    if (!this.isAuthUser()) return;
    const tasksAll = getElements('.task');
    tasksAll.forEach((task) => task.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.checkIsGuest() || !this.isAuthUser()) return;
      const oneTask = event.target.closest('.task');
      if (oneTask) {
        handler(oneTask.dataset.id);
      }
    }));
  }

  bindSetViewBoardList(handler) {
    const btnChangeView = getElement('.btn_list');
    if (btnChangeView) {
      btnChangeView.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  bindAddNewTask(handler) {
    if (!this.isAuthUser()) return;
    const btnsAddTask = getElements('.btn__add_task');
    if (btnsAddTask) {
      btnsAddTask.forEach((btn) => btn.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      }));
    }
  }

  bindOpenEditTask(handler) {
    if (!this.isAuthUser()) return;
    const tdEditTask = getElements('.img_edit');
    if (tdEditTask) {
      tdEditTask.forEach((img) => img.addEventListener('click', (event) => {
        event.stopPropagation();
        handler(img.dataset.id, pathName.boardCard);
      }));
    }
  }

  bindLoadMoreTasks(handler) {
    const btnsLoadMore = getElements('.load__btn_table');
    if (btnsLoadMore) {
      btnsLoadMore.forEach((btn) => btn.addEventListener('click', (event) => {
        event.stopPropagation();
        handler(btn.dataset.column);
      }));
    }
  }

  checkIsHideBtnLoad = () => {
    const isHideBtnsLoad = JSON.parse(localStorage.getItem('hideBtnsLoad'));
    if (isHideBtnsLoad) {
      const loadBths = getElements('.load__btn_table');
      loadBths.forEach((btn) => {
        if (btn.dataset.column && isHideBtnsLoad[btn.dataset.column]) {
          btn.classList.add('display_none');
        }
      });
    }
  };

  display(tasks) {
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';

    const parentElem = document.getElementById(this.id);
    const newsectionTasks = createElem('section', ['board']);
    newsectionTasks.id = 'container__columns';

    const sectionTasks = createElem('div', ['container__columns']);

    taskStatusArr.forEach((column) => {
      const columnOne = createDiv(['column']);

      const btnAddTask = createBtn(isRu ? translateStatus(column) : `${column}`, ['btn__add_task', 'dark_btn', 'btn'], 'button', isRu ? 'Добавить задачу' : 'Add new task');
      const imgAdd = createImg(srcImgCollection.addTask, 'icon');
      btnAddTask.append(imgAdd);
      if (this.checkIsGuest()) {
        imgAdd.classList.add('display_none');
      }
      if (this.isAuthUser()) {
        imgAdd.classList.remove('display_none');
      }

      const line = createElem('hr', ['line__column']);
      const list = createElem('ul', ['container__tasks']);
      const idList = createIdList(column);
      list.id = idList;

      const btnMoreTasks = createBtn(isRu ? 'Загрузить ещё' : 'Load more', ['load__btn', 'dark_btn', 'btn', 'load__btn_table'], 'button', isRu ? 'Загрузить ещё' : 'Load more tasks');
      const imgMoreTasks = createImg(srcImgCollection.loadMoreTasks, 'icon');
      btnMoreTasks.append(imgMoreTasks);
      btnMoreTasks.setAttribute('data-column', `${createIdList(column)}`);
      btnMoreTasks.id = `load_card_${createIdList(column)}`;

      columnOne.append(btnAddTask, line, list, btnMoreTasks);
      sectionTasks.append(columnOne);
    });
    const containerViewBtn = createDiv(['container__view_btn']);

    const btnViewList = createBtn('', ['dark_btn', 'btn', 'btn_list'], 'button', isRu ? 'Таблица' : 'View table');
    const imgList = createImg(srcImgCollection.viewList, 'icon');
    btnViewList.append(imgList);

    const btnViewTable = createBtn('', ['check_btn', 'btn', 'btn_table'], 'button', isRu ? 'Карточки' : 'View cards');
    const imgTable = createImg(srcImgCollection.viewTable, 'icon');
    btnViewTable.append(imgTable);

    containerViewBtn.append(btnViewList, btnViewTable);

    newsectionTasks.append(containerViewBtn, sectionTasks);
    parentElem.replaceWith(newsectionTasks);
    if (tasks.length) {
      taskStatusArr.forEach((column) => {
        const arrTasksStatus = tasks.filter((task) => task.status === column);
        if (arrTasksStatus.length) {
          arrTasksStatus.forEach((task) => {
            const oneTask = new OneTaskViewCard(createIdList(column));
            oneTask.display(task);
          });
        }
      });
      this.checkIsHideBtnLoad();
    }
  }
}

export default TaskFeedView;
