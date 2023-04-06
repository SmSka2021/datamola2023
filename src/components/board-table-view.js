/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createImg,
  createBtn,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import { createIdList, taskStatusArr } from '../ultilites/field-task';
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
    const btnLoadMore = getElement('.load__btn_table');
    if (btnLoadMore) {
      btnLoadMore.addEventListener('click', (event) => {
        event.stopPropagation();
        handler('list_table');
      });
    }
  }

  display(tasks) {
    console.log(tasks);
    const parentElem = document.getElementById(this.id);
    const newsectionTasks = createElem('section', ['board']);
    newsectionTasks.id = 'container__columns';

    const sectionTasks = createElem('div', ['container__columns']);

    taskStatusArr.forEach((column) => {
      const columnOne = createDiv(['column']);

      const btnAddTask = createBtn(`${column}`, ['btn__add_task', 'dark_btn', 'btn'], 'button', 'Add new task');
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

      columnOne.append(btnAddTask, line, list);
      sectionTasks.append(columnOne);
    });
    const containerViewBtn = createDiv(['container__view_btn']);

    const btnViewList = createBtn('', ['dark_btn', 'btn', 'btn_list']);
    const imgList = createImg(srcImgCollection.viewList, 'icon');
    btnViewList.append(imgList);

    const btnViewTable = createBtn('', ['dark_btn', 'btn', 'btn_table']);
    const imgTable = createImg(srcImgCollection.viewTable, 'icon');
    btnViewTable.append(imgTable);

    const btnMoreTasks = createBtn('Load more', ['load__btn', 'dark_btn', 'btn', 'load__btn_table']);
    const imgMoreTasks = createImg(srcImgCollection.loadMoreTasks, 'icon');
    btnMoreTasks.append(imgMoreTasks);
    containerViewBtn.append(btnViewList, btnViewTable, btnMoreTasks);

    newsectionTasks.append(containerViewBtn, sectionTasks);
    parentElem.replaceWith(newsectionTasks);
    taskStatusArr.forEach((column) => {
      const arrTasksStatus = tasks.filter((task) => task.status === column);
      if (arrTasksStatus.length) {
        arrTasksStatus.forEach((task) => {
          const oneTask = new OneTaskViewCard(createIdList(column));
          oneTask.display(task);
        });
      }
    });
  }
}

export default TaskFeedView;
