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

class TaskFeedView {
  constructor(id) {
    this.id = id;
  }

  bindDeleteTask(handler) {
    const btnDelete = getElements('.img_delete');
    btnDelete.forEach((btn) => btn.addEventListener('click', (event) => {
      const isBtnDelete = event.target.parentElement.classList.contains('delete');
      if (isBtnDelete) {
        event.stopPropagation();
        handler(event.target.parentElement.dataset.id);
      }
    }));
  }

  bindOpenTask(handler) {
    const tasksAll = getElements('.task');
    tasksAll.forEach((task) => task.addEventListener('click', (event) => {
      event.stopPropagation();
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

  display(tasks) {
    const parentElem = document.getElementById(this.id);
    const newsectionTasks = createElem('section', ['board']);
    newsectionTasks.id = 'container__columns';

    const sectionTasks = createElem('div', ['container__columns']);

    taskStatusArr.forEach((column) => {
      const columnOne = createDiv(['column']);

      const btnAddTask = createBtn(`${column}`, ['btn__add_task', 'dark_btn', 'btn']);
      const imgAdd = createImg(srcImgCollection.addTask, 'icon');
      btnAddTask.append(imgAdd);

      const line = createElem('hr', ['line__column']);
      const list = createElem('ul', ['container__tasks']);
      const idList = createIdList(column);
      list.id = idList;

      const btnMoreTasks = createBtn('Load more', ['load__btn', 'dark_btn', 'btn']);
      const imgMoreTasks = createImg(srcImgCollection.loadMoreTasks, 'icon');
      btnMoreTasks.append(imgMoreTasks);
      columnOne.append(btnAddTask, line, list, btnMoreTasks);
      sectionTasks.append(columnOne);
    });
    const containerViewBtn = createDiv(['container__view_btn']);

    const btnViewList = createBtn('', ['dark_btn', 'btn', 'btn_list']);
    const imgList = createImg(srcImgCollection.viewList, 'icon');
    btnViewList.append(imgList);

    const btnViewTable = createBtn('', ['dark_btn', 'btn', 'btn_table']);
    const imgTable = createImg(srcImgCollection.viewTable, 'icon');
    btnViewTable.append(imgTable);
    containerViewBtn.append(btnViewList, btnViewTable);

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
