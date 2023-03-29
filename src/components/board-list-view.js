/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createText,
  createImg,
  createBtn,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import { taskStatusArr, arrFieldTask, createIdList } from '../ultilites/field-task';
import OneTaskViewList from './one-task-view-list';
import { getElements, getElement } from '../ultilites/get-element';

class BoardViewList {
  constructor(id) {
    this.id = id;
  }

  isOpenTodo = this.getStateIsOpenTodo();

  isOpenComplete = this.getStateIsOpenComplete();

  isOpenInProgress = this.getStateIsOpenInProgress();

  bindDeleteTask(handler) {
    const btnDelete = getElements('.img_delete');
    btnDelete.forEach((btn) => btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const isBtnDelete = event.target.parentElement.classList.contains('delete');
      if (isBtnDelete) {
        handler(event.target.parentElement.dataset.id, 'board-list');
      }
    }));
  }

  bindOpenTask(handler) {
    const tasksAll = getElements('.one_task_list');
    tasksAll.forEach((task) => task.addEventListener('click', (event) => {
      event.stopPropagation();
      const oneTask = event.target.closest('.one_task_list');
      if (oneTask) {
        handler(oneTask.dataset.id);
      }
    }));
  }

  bindSetViewBoardTable(handler) {
    const tasksAll = getElement('.btn_table');
    if (tasksAll) {
      tasksAll.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  getStateIsOpenTodo() {
    if (localStorage.getItem('isOpenTodo')) {
      return localStorage.getItem('isOpenTodo') === 'true';
    }
    return false;
  }

  getStateIsOpenComplete() {
    if (localStorage.getItem('isOpenTodo')) {
      return localStorage.getItem('isOpenComplete') === 'true';
    }
    return false;
  }

  getStateIsOpenInProgress() {
    if (localStorage.getItem('isOpenTodo')) {
      return localStorage.getItem('isOpenInProgress') === 'true';
    }
    return false;
  }

  changeOpenCloseTodo = (elem, index) => {
    const titleColumn = getElements('.label__todo_list');
    const tablesTodo = getElements('.open__table');
    const btnsImgCloseColumn = getElements('.img_close');
    const btnsImgOpenColumn = getElements('.img_open');
    const loadBths = getElements('.load__btn');

    elem.classList.toggle('table__header_open');
    elem.classList.toggle('table__header_close');
    titleColumn[index].classList.toggle('label_open');
    tablesTodo[index].hidden = !tablesTodo[index].hidden;
    btnsImgCloseColumn[index].hidden = !btnsImgCloseColumn[index].hidden;
    btnsImgOpenColumn[index].hidden = !btnsImgOpenColumn[index].hidden;
    loadBths[index].classList.toggle('display_none');
  };

  actionLabelTodo = (e) => {
    e.stopPropagation();
    const elem = e.target.closest('.table__header');
    switch (elem.dataset.column) {
      case 'todo':
        this.isOpenTodo = !this.isOpenTodo;
        localStorage.setItem('isOpenTodo', this.isOpenTodo);
        this.changeOpenCloseTodo(elem, 0);
        break;
      case 'inProgress':
        this.isOpenInProgress = !this.isOpenInProgress;
        localStorage.setItem('isOpenInProgress', this.isOpenInProgress);
        this.changeOpenCloseTodo(elem, 1);
        break;
      case 'complete':
        this.isOpenComplete = !this.isOpenComplete;
        localStorage.setItem('isOpenComplete', this.isOpenComplete);
        this.changeOpenCloseTodo(elem, 2);
        break;
      default:
        elem.classList.toggle('table__header_open');
        elem.classList.toggle('table__header_close');
    }
  };

  display(tasks) {
    const parentElem = document.getElementById(this.id);
    const newsectionTasks = createElem('section', ['board']);
    newsectionTasks.id = 'container__columns';

    const containerViewBtn = createDiv(['container__view_btn_list']);
    const btnViewList = createBtn('', ['dark_btn', 'btn', 'btn_list']);
    const imgList = createImg(srcImgCollection.viewList, 'icon', ['img_viewList']);
    btnViewList.append(imgList);
    const btnViewTable = createBtn('', ['dark_btn', 'btn', 'btn_table']);
    const imgTable = createImg(srcImgCollection.viewTable, 'icon');
    btnViewTable.append(imgTable);
    containerViewBtn.append(btnViewList, btnViewTable);

    const sectionTasks = createElem('div', ['container__row']);
    taskStatusArr.forEach((column) => {
      const columnOne = createDiv(['container__todo']);
      columnOne.setAttribute('data-table', `${createIdList(column)}`);
      const tableHeader = createDiv(['table__header', 'table__header_close']);
      tableHeader.setAttribute('data-column', `${createIdList(column)}`);
      tableHeader.addEventListener('click', (e) => this.actionLabelTodo(e));
      const todoTitle = createText('h5', `${column}`, ['label__todo_list']);
      const btnAddTasks = createBtn('', ['btn_icon', 'btn__add_task_list']);
      const imgAddTasks = createImg(srcImgCollection.addTask, 'icon');
      btnAddTasks.append(imgAddTasks);

      const btnOpenTodo = createBtn('', ['btn_icon', 'open__todo_btn']);
      const imgOpenTodo = createImg(srcImgCollection.openTodo, 'icon', ['img_open']);
      btnOpenTodo.append(imgOpenTodo);
      imgOpenTodo.hidden = true;

      const btnCloseTodo = createBtn('', ['btn_icon', 'close__todo_btn']);
      const imgCloseTodo = createImg(srcImgCollection.closeTodo, 'icon', ['img_close']);
      btnCloseTodo.append(imgCloseTodo);
      tableHeader.append(todoTitle, btnAddTasks, btnOpenTodo, btnCloseTodo);

      const tableTodo = createElem('table', ['open__table']);
      const tableThead = createElem('thead', []);
      const tableRowTitle = createElem('tr', []);

      arrFieldTask.forEach((field) => {
        const tableThTitle = createElem('th', []);
        tableThTitle.textContent = field;
        if (field === 'Comments') {
          tableThTitle.innerHTML = `<img src=${srcImgCollection.comments} alt='comments icon'
          class='task__img_comment'>`;
        }
        tableRowTitle.append(tableThTitle);
      });
      tableThead.append(tableRowTitle);
      const tableBody = createElem('tbody', []);
      tableBody.id = createIdList(column);
      tableTodo.append(tableThead, tableBody);
      tableTodo.hidden = true;

      columnOne.append(tableHeader, tableTodo);
      const btnMoreTasks = createBtn('Load more', ['load__btn', 'dark_btn', 'btn', 'display_none']);
      const imgMoreTasks = createImg(srcImgCollection.loadMoreTasks, 'icon');
      btnMoreTasks.append(imgMoreTasks);
      btnMoreTasks.setAttribute('data-load', `${createIdList(column)}`);
      sectionTasks.append(columnOne, btnMoreTasks);
    });

    newsectionTasks.append(containerViewBtn, sectionTasks);
    parentElem.replaceWith(newsectionTasks);

    taskStatusArr.forEach((column) => {
      const arrTasksStatus = tasks.filter((task) => task.status === column);
      if (arrTasksStatus.length) {
        arrTasksStatus.forEach((task) => {
          const oneTask = new OneTaskViewList(createIdList(column));
          oneTask.display(task);
        });
      }
    });
    const labelTodo = getElements('.table__header');
    if (this.isOpenTodo) this.changeOpenCloseTodo(labelTodo[0], 0);
    if (this.isOpenInProgress) this.changeOpenCloseTodo(labelTodo[1], 1);
    if (this.isOpenComplete) this.changeOpenCloseTodo(labelTodo[2], 2);
  }
}

export default BoardViewList;