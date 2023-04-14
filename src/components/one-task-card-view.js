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
import { translateStatus } from '../ultilites/field-task';

class OneTaskViewCard {
  constructor(id) {
    this.id = id;
  }

  checkIsGuest = () => JSON.parse(localStorage.getItem('statusUser'));

  isAuthUser = () => JSON.parse(localStorage.getItem('auth'));

  display(taskOne) {
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';
    const parentElem = document.getElementById(this.id);
    const task = createDiv(['task']);
    task.setAttribute('data-id', `${taskOne.id}`);
    const containerTitleTask = createDiv(['container__title_task']);
    const taskTitle = createText('h6', `${taskOne.name}`, ['task__title']);
    const labelTodo = createDiv(['label__todo']);
    const itemLabelTodo = createText('p', isRu ? translateStatus(taskOne.status) : `${taskOne.status}`, []);
    labelTodo.append(itemLabelTodo);
    containerTitleTask.append(taskTitle, labelTodo);
    task.addEventListener('click', this.actionTask);

    const containerDateTask = createDiv(['container__date_task']);
    const taskDate = createText('p', `${convertationDate(taskOne.createdAt)}`, ['task__date']);
    const imgIsPrivate = createImg(`${taskOne.isPrivate ? srcImgCollection.private.person : srcImgCollection.private.multiple}`, 'privacy img', ['task__img_privacy']);
    containerDateTask.append(taskDate, imgIsPrivate);

    const creatorTask = createText('h6', isRu ? `Создатель задачи: ${taskOne.creator.userName}` : `Creator task: ${taskOne.creator.userName}`, ['creator_card']);
    const descriptionTitle = createText('span', isRu ? 'Описание:  ' : 'Description:  ', ['task__title_one_card']);

    const taskText = createText('span', taskOne.description, ['task__text']);

    const containerComments = createDiv(['container__comments']);
    const imgComments = createImg(srcImgCollection.comments, 'comments icon', ['task__img_comment']);
    const countComments = createText('p', `${taskOne.comments.length}`, ['task__date']);
    containerComments.append(imgComments, countComments);

    const containerInfoTask = createDiv(['container__info_task']);
    const userNameLabel = createDiv(['label__todo', 'user_name']);
    const userNameItem = createText('p', `${taskOne.assignee.userName}`, []);
    userNameLabel.append(userNameItem);

    const containerBtn = createDiv(['container__btn_delete', 'hidden_button_delete']);
    const btnDelete = createBtn('', ['btn_icon', 'delete'], 'button', !isRu ? 'Delete task' : 'Удалить задачу');
    const imgDelete = createImg(srcImgCollection.delete, 'icon delete', ['img_delete']);
    imgDelete.setAttribute('data-id', `${taskOne.id}`);
    btnDelete.append(imgDelete);

    const btnEdit = createBtn('', ['btn_icon', 'edit'], 'button', !isRu ? 'Edit task' : 'Править задачу');
    const imgEdit = createImg(srcImgCollection.edit, 'icon edit', ['img_edit']);
    imgEdit.setAttribute('data-id', `${taskOne.id}`);
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
      creatorTask,
      descriptionTitle,
      taskText,
      containerComments,
      containerInfoTask,
    );
    parentElem.append(task);
  }
}
export default OneTaskViewCard;
