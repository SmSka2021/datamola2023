/* eslint-disable class-methods-use-this */
import {
  createDiv,
  createText,
  createImg,
  createBtn,
} from '../ultilites/create-element';
import srcPriority from '../ultilites/convertor-src';
import srcImgCollection from '../ultilites/src-img-collection';
import convertationDate from '../ultilites/convertation-date';

class OneTaskViewCard {
  constructor(id) {
    this.id = id;
  }

  checkIsGuest = () => JSON.parse(localStorage.getItem('statusUser'));

  isAuthUser = () => JSON.parse(localStorage.getItem('auth'));

  display(taskOne) {
    const parentElem = document.getElementById(this.id);
    const task = createDiv(['task']);
    task.setAttribute('data-id', `${taskOne._id}`);
    const containerTitleTask = createDiv(['container__title_task']);
    const taskTitle = createText('h6', `${taskOne.name}`, ['task__title']);
    const labelTodo = createDiv(['label__todo']);
    const itemLabelTodo = createText('p', `${taskOne.status}`, []);
    labelTodo.append(itemLabelTodo);
    containerTitleTask.append(taskTitle, labelTodo);
    task.addEventListener('click', this.actionTask);

    const containerDateTask = createDiv(['container__date_task']);
    const taskDate = createText('p', `${convertationDate(taskOne._createdAt)}`, ['task__date']);
    const imgIsPrivate = createImg(`${taskOne.isPrivate ? srcImgCollection.private.person : srcImgCollection.private.multiple}`, 'privacy img', ['task__img_privacy']);
    containerDateTask.append(taskDate, imgIsPrivate);

    const taskText = createText('p', taskOne.description, ['task__text']);

    const containerComments = createDiv(['container__comments']);
    const imgComments = createImg(srcImgCollection.comments, 'comments icon', ['task__img_comment']);
    const countComments = createText('p', `${taskOne.comments.length}`, ['task__date']);
    containerComments.append(imgComments, countComments);

    const containerInfoTask = createDiv(['container__info_task']);
    const userNameLabel = createDiv(['label__todo', 'user_name']);
    const userNameItem = createText('p', `${taskOne.assignee}`, []);
    userNameLabel.append(userNameItem);

    const containerBtn = createDiv(['container__btn_delete', 'hidden_button_delete']);
    const btnDelete = createBtn('', ['btn_icon', 'delete'], 'button', 'delete task');
    const imgDelete = createImg(srcImgCollection.delete, 'icon delete', ['img_delete']);
    imgDelete.setAttribute('data-id', `${taskOne._id}`);
    btnDelete.append(imgDelete);

    const btnEdit = createBtn('', ['btn_icon', 'edit']);
    const imgEdit = createImg(srcImgCollection.edit, 'icon edit', ['img_edit'], 'button', 'edit task');
    imgEdit.setAttribute('data-id', `${taskOne._id}`);
    btnEdit.append(imgEdit);
    containerBtn.append(btnDelete, btnEdit);

    const imgPriority = createImg(srcPriority(taskOne.priority), 'priority icon', ['task__priority_img']);
    containerInfoTask.append(userNameLabel, containerBtn, imgPriority);
    if (this.checkIsGuest()) {
      containerBtn.classList.add('display_none');
    }
    if (this.isAuthUser()) {
      containerBtn.classList.remove('display_none');
    }
    task.append(
      containerTitleTask,
      containerDateTask,
      taskText,
      containerComments,
      containerInfoTask,
    );
    parentElem.append(task);
  }
}
export default OneTaskViewCard;
