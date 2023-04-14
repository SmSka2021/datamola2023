/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createText,
  createImg,
  createBtn,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import convertationDate from '../ultilites/convertation-date';
import srcPriority from '../ultilites/convertor-src';
import { maxLengthDescription } from '../ultilites/constant';
import { getElement } from '../ultilites/get-element';
import { pathName } from '../ultilites/path';
import { translateStatus } from '../ultilites/field-task';

class TaskViewPage {
  constructor(id) {
    this.id = id;
  }

  bindAddComment(handler) {
    const commentForm = getElement('.form');
    if (commentForm) {
      commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const newComment = commentForm.newComment.value;
        const idTask = commentForm.dataset.id;
        if (newComment.length) {
          event.preventDefault();
          handler(idTask, { text: newComment });
          commentForm.reset();
        }
      });
    }
  }

  bindPrevViewAllTask(handler) {
    const imgPrev = getElement('.previosView_img');
    if (imgPrev) {
      imgPrev.addEventListener('click', (event) => {
        event.stopPropagation();
        localStorage.removeItem('editTask');
        handler();
      });
    }
  }

  bindDeleteTask(handler) {
    const btnDelete = getElement('.delete_img');
    if (btnDelete) {
      btnDelete.addEventListener('click', (event) => {
        event.stopPropagation();
        const isBtnDelete = event.target.parentElement.classList.contains('delete');
        if (isBtnDelete) {
          handler(event.target.parentElement.dataset.id, true);
        }
      });
    }
  }

  bindOpenEditTask(handler) {
    const btnEditTask = getElement('.edit_img_one_task');
    if (btnEditTask) {
      btnEditTask.addEventListener('click', (event) => {
        event.stopPropagation();
        const isBtnEdit = event.target.parentElement.classList.contains('edit');
        if (isBtnEdit) {
          handler(event.target.parentElement.dataset.id, pathName.oneTaskPage);
        }
      });
    }
  }

  display(task) {
    if (!task) return;
    const theme = JSON.parse(localStorage.getItem('theme'));
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';
    const parentElem = document.getElementById(this.id);
    const newsectionTasks = createElem('section', ['main', 'main_task']);
    newsectionTasks.id = 'main_task';
    const btnPrevious = createBtn('', ['dark_btn', 'btn', 'previosView'], 'button', isRu ? 'Назад' : 'Back');
    const imgPrevios = createImg(srcImgCollection.previos, 'icon', ['previosView_img']);
    btnPrevious.append(imgPrevios);

    const sectionOneTask = createElem('section', ['container__one_task']);

    const headerTask = createDiv(['header_task']);

    const containerLabel = createDiv(['container__label']);
    const labelTodo = createDiv(['label__todo']);
    const todoTitle = createText('p', isRu ? translateStatus(task.status) : `${task.status}`);
    labelTodo.append(todoTitle);
    const labelUser = createDiv(['label__todo', 'user_name']);
    const userTitle = createText('p', `${task.assignee.userName}`);
    labelUser.append(userTitle);
    containerLabel.append(labelTodo, labelUser);

    const containerTitleTask = createDiv(['container__title_one_task']);
    const imgPriorityTasks = createImg(`${srcPriority(task.priority)}`, 'icon', ['task__priority_img']);
    const userNameItem = createText('h6', `${task.name}`, ['task__title_one']);
    containerTitleTask.append(imgPriorityTasks, userNameItem);

    const containerBtnTask = createDiv(['container__btn_task']);
    const btnDel = createBtn('', ['btn_icon', 'delete'], 'button', !isRu ? 'Delete task' : 'Удалить задачу');
    btnDel.setAttribute('data-id', `${task.id}`);
    const imgDel = createImg(srcImgCollection.delete, 'icon delete', ['delete_img']);
    btnDel.append(imgDel);
    const btnEdit = createBtn('', ['btn_icon', 'edit'], 'button', !isRu ? 'Edit task' : 'Править задачу');
    btnEdit.setAttribute('data-id', `${task.id}`);
    const imgEdit = createImg(srcImgCollection.edit, 'icon edit', ['edit_img_one_task']);
    btnEdit.append(imgEdit);
    containerBtnTask.append(btnDel, btnEdit);
    headerTask.append(containerLabel, containerTitleTask, containerBtnTask);
    const containerDateTask = createDiv(['container__date_task_one']);
    const taskDateItem = createText('p', `${convertationDate(task.createdAt)}`, ['task__date']);
    const imgIsPrivacy = createImg(`${task.isPrivate ? srcImgCollection.private.person : srcImgCollection.private.multiple}`, 'privacy img', ['task__img_privacy']);
    containerDateTask.append(taskDateItem, imgIsPrivacy);

    const creatorTask = createText('h6', isRu ? `Задачу создал:  ${task.creator.userName}` : `Creator task: ${task.creator.userName}`, ['creator']);
    const deckriptionTitle = createText('span', isRu ? 'Описание задачи: ' : 'Description: ', ['comments__title']);
    const deckriptionTask = createText('span', ` ${task.description}`, ['task__text_one']);
    const commentsTitle = createText('h6', isRu ? 'Комментарии: ' : 'Comments:', ['comments__title']);
    const commentsList = createElem('ul', ['comments__list']);
    if (task.comments.length) {
      task.comments.forEach((comment) => {
        const containerComment = createElem('li', ['container__comment']);
        const imgComment = createImg(srcImgCollection.comments, 'comments icon', ['task__img_comment']);
        const commentItem = createDiv(['comment__item']);
        const commentUserName = createDiv(['comment__user_name']);
        const commentAuthor = createText('p', `${comment.creator.userName}`, ['user__name_item']);
        const commentDateItem = createText('p', `${convertationDate(comment.createdAt)}`, ['task__date']);
        commentUserName.append(commentAuthor, commentDateItem);
        const commentText = createText('p', `${comment.text}`, ['task__comments_one']);
        commentItem.append(commentUserName, commentText);
        containerComment.append(imgComment, commentItem);
        commentsList.append(containerComment);
      });
    }
    const formElem = createElem('form', ['form']);
    formElem.setAttribute('data-id', `${task.id}`);
    const formLabel = createElem('label', ['form__label']);
    formLabel.for = 'addComment';
    formLabel.textContent = isRu ? 'Комментарий: ' : 'Comment: ';
    const formTextArea = createElem('textarea', ['form__area']);
    formTextArea.name = 'newComment';
    formTextArea.id = 'addComment';
    formElem.setAttribute('data-id', `${task.id}`);
    formTextArea.maxlength = maxLengthDescription;
    const btnForm = createBtn(isRu ? 'Добавить: ' : 'Add', ['light_btn', 'btn'], 'submit', isRu ? 'Добавить комментарий' : 'Add comment');
    formElem.append(formLabel, formTextArea, btnForm);

    sectionOneTask.append(
      headerTask,
      containerDateTask,
      creatorTask,
      deckriptionTitle,
      deckriptionTask,
      commentsTitle,
      commentsList,
      formElem,
    );

    newsectionTasks.append(btnPrevious, sectionOneTask);
    parentElem.replaceWith(newsectionTasks);
    if (theme === 'dark') {
      newsectionTasks.style.backgroundImage = 'url(../assets/img/dark_fon3.png)';
    }
  }
}

export default TaskViewPage;
