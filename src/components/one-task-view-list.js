/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createText,
  createImg,
  createBtn,
} from '../ultilites/create-element';
import srcPriority from '../ultilites/convertor-src';
import srcImgCollection from '../ultilites/src-img-collection';
import convertationDate from '../ultilites/convertation-date';

// --------- One Task View List ------------ //

class OneTaskViewList {
  constructor(id) {
    this.id = id;
  }

  checkIsGuest = () => JSON.parse(localStorage.getItem('statusUser'));

  isAuthUser = () => JSON.parse(localStorage.getItem('auth'));

  display(task) {
    const parentElem = document.getElementById(this.id);
    const taskRow = createElem('tr', ['one_task_list']);
    taskRow.setAttribute('data-id', `${task.id}`);
    const taskTitle = createElem('td', []);
    taskTitle.textContent = task.name;

    const taskStat = createElem('td', []);
    const taskStatusLabel = createDiv(['label__todo', 'progress', 'table_progress']);
    const taskStatusTxt = createText('p', `${task.status}`);
    taskStatusLabel.append(taskStatusTxt);
    taskStat.append(taskStatusLabel);

    const taskDescr = createElem('td', ['comment__text']);
    taskDescr.textContent = task.description;

    const taskPriority = createElem('td', []);
    const imgPriorityTask = createImg(srcPriority(task.priority), 'priority icon', ['task__priority_img']);
    taskPriority.append(imgPriorityTask);

    const taskPrivacy = createElem('td', []);
    const imgIsPrivateTask = createImg(`${task.isPrivate ? srcImgCollection.private.person : srcImgCollection.private.multiple}`, 'privacy img', ['task__img_privacy']);
    taskPrivacy.append(imgIsPrivateTask);
    const taskAssigne = createElem('td', []);
    taskAssigne.textContent = task.assignee;

    const taskDateItem = createElem('td', []);
    taskDateItem.textContent = convertationDate(task.createdAt);

    const taskCountComment = createElem('td', []);
    taskCountComment.textContent = task.comments.length;

    const taskEdit = createElem('td', ['td_edit']);
    taskEdit.setAttribute('data-id', `${task.id}`);
    const btnEdit = createBtn('', ['btn_icon', 'edit'], 'button', 'edit task');
    const imgEdit = createImg(srcImgCollection.edit, 'icon edit', ['img_edit']);
    btnEdit.append(imgEdit);
    taskEdit.append(btnEdit);
    const taskDelete = createElem('td', ['td_delit']);
    taskDelete.setAttribute('data-id', `${task.id}`);
    const btnDelete = createBtn('', ['btn_icon', 'delete'], 'button', 'delete task');
    const imgDelete = createImg(srcImgCollection.delete, 'icon delete', ['img_delete']);
    btnDelete.append(imgDelete);
    taskDelete.append(btnDelete);
    if (this.checkIsGuest()) {
      taskEdit.classList.add('display_none');
      taskDelete.classList.add('display_none');
    }
    if (this.isAuthUser()) {
      taskEdit.classList.remove('display_none');
      taskDelete.classList.remove('display_none');
    }

    taskRow.append(
      taskTitle,
      taskStat,
      taskDescr,
      taskPriority,
      taskPrivacy,
      taskAssigne,
      taskDateItem,
      taskCountComment,
      taskEdit,
      taskDelete,
    );

    parentElem.append(taskRow);
  }
}
export default OneTaskViewList;
