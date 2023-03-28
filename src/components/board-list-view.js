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

class BoardViewList {
  constructor(id) {
    this.id = id;
  }

  display(tasks) {
    const parentElem = document.getElementById(this.id);
    const newsectionTasks = createElem('section', ['board']);

    const sectionTasks = createElem('div', ['container__row']);

    taskStatusArr.forEach((column) => {
      const columnOne = createDiv(['container__todo']);
      const tableHeader = createDiv(['table__header', 'table__header_open']);
      const todoTitle = createText('h5', `${column}`, ['label__todo_list']);

      const btnAddTasks = createBtn('', ['btn_icon', 'btn__add_task_list']);
      const imgAddTasks = createImg(srcImgCollection.addTask, 'icon');
      btnAddTasks.append(imgAddTasks);

      const btnOpenTodo = createBtn('', ['btn_icon', 'open__todo_btn']);
      const imgOpenTodo = createImg(srcImgCollection.openTodo, 'icon');
      btnOpenTodo.append(imgOpenTodo);

      const btnCloseTodo = createBtn('', ['btn_icon', 'close__todo_btn']);
      const imgCloseTodo = createImg(srcImgCollection.closeTodo, 'icon');
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

      columnOne.append(tableHeader, tableTodo);
      sectionTasks.append(columnOne);
    });

    const btnMoreTasks = createBtn('Load more', ['load__btn', 'dark_btn', 'btn']);
    const imgMoreTasks = createImg(srcImgCollection.loadMoreTasks, 'icon');
    btnMoreTasks.append(imgMoreTasks);

    newsectionTasks.append(sectionTasks, btnMoreTasks);
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
  }
}

export default BoardViewList;
