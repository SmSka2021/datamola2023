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

// ----------PAGE ONE TASK  -TaskView---------------- //
class TaskViewPage {
  constructor(id) {
    this.id = id;
  }

  bindAddComment(handler) {
    const commentForm = getElement('.form');
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const newComment = commentForm.newComment.value;
      const idTask = commentForm.dataset.id;
      if (newComment.length) {
        event.preventDefault();
        handler(idTask, newComment);
        commentForm.reset();
      }
    });
  }

  bindPrevViewAllTask(handler) {
    const imgPrev = getElement('.previosView_img');
    imgPrev.addEventListener('click', (event) => {
      const btnPrev = event.target.parentElement.classList.contains('previosView');
      if (btnPrev) {
        event.stopPropagation();
        handler();
      }
    });
  }

  display(task) {
    if (!task) return;
    const parentElem = document.getElementById(this.id);
    const newsectionTasks = createElem('section', ['main', 'main_task']);
    newsectionTasks.id = 'main_task';
    const btnPrevious = createBtn('', ['dark_btn', 'btn', 'previosView'], 'button', 'back');
    const imgPrevios = createImg(srcImgCollection.previos, 'icon', ['previosView_img']);
    btnPrevious.append(imgPrevios);

    const sectionOneTask = createElem('section', ['container__one_task']);

    const headerTask = createDiv(['header_task']);

    const containerLabel = createDiv(['container__label']);
    const labelTodo = createDiv(['label__todo']);
    const todoTitle = createText('p', `${task.status}`);
    labelTodo.append(todoTitle);
    const labelUser = createDiv(['label__todo', 'user_name']);
    const userTitle = createText('p', `${task.assignee}`);
    labelUser.append(userTitle);
    containerLabel.append(labelTodo, labelUser);

    const containerTitleTask = createDiv(['container__title_one_task']);
    const imgPriorityTasks = createImg(`${srcPriority(task.priority)}`, 'icon', ['task__priority_img']);
    const userNameItem = createText('h6', `${task.name}`, ['task__title_one']);
    containerTitleTask.append(imgPriorityTasks, userNameItem);

    const containerBtnTask = createDiv(['container__btn_task']);
    const btnDel = createBtn('', ['btn_icon', 'delete'], 'button', 'delete task');
    const imgDel = createImg(srcImgCollection.delete, 'icon delete');
    btnDel.append(imgDel);
    const btnEdit = createBtn('', ['btn_icon', 'edit'], 'button', 'edit task');
    const imgEdit = createImg(srcImgCollection.edit, 'icon edit');
    btnEdit.append(imgEdit);
    containerBtnTask.append(btnDel, btnEdit);
    headerTask.append(containerLabel, containerTitleTask, containerBtnTask);

    const containerDateTask = createDiv(['container__date_task_one']);
    const taskDateItem = createText('p', `${convertationDate(task.createdAt)}`, ['task__date']);
    const imgIsPrivacy = createImg(`${task.isPrivate ? srcImgCollection.private.person : srcImgCollection.private.multiple}`, 'privacy img', ['task__img_privacy']);
    containerDateTask.append(taskDateItem, imgIsPrivacy);

    const deckriptionTask = createText('p', `${task.description}`, ['task__text_one']);
    const commentsTitle = createText('h6', 'Comments:', ['comments__title']);
    const commentsList = createElem('ul', ['comments__list']);
    if (task.comments.length) {
      task.comments.forEach((comment) => {
        const containerComment = createElem('li', ['container__comment']);
        const imgComment = createImg(srcImgCollection.comments, 'comments icon', ['task__img_comment']);
        const commentItem = createDiv(['comment__item']);
        const commentUserName = createDiv(['comment__user_name']);
        const commentAuthor = createText('p', `${comment.author}`, ['user__name_item']);
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
    formLabel.textContent = 'Comment: ';
    const formTextArea = createElem('textarea', ['form__area']);
    formTextArea.name = 'newComment';
    formTextArea.id = 'addComment';
    formElem.setAttribute('data-id', `${task.id}`);
    formTextArea.maxlength = maxLengthDescription;
    const btnForm = createBtn('Add', ['light_btn', 'btn'], 'submit', 'add comment');
    formElem.append(formLabel, formTextArea, btnForm);

    sectionOneTask.append(
      headerTask,
      containerDateTask,
      deckriptionTask,
      commentsTitle,
      commentsList,
      formElem,
    );

    newsectionTasks.append(btnPrevious, sectionOneTask);
    parentElem.replaceWith(newsectionTasks);
  }
}

export default TaskViewPage;
