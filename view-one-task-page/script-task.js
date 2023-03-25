/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

// *******************utils***************//

function convertationDate(dateObject) {
  const string = dateObject.toISOString().slice(0, 10);
  return `${string.slice(8)}/${string.slice(5, 7)}/${string.slice(0, 4)}`;
}

// -----------function-builders------------- //
const createDiv = (classes = []) => {
  const div = document.createElement('div');
  if (classes.length) {
    classes.forEach((classElem) => div.classList.add(classElem));
  }
  return div;
};

const createElem = (tag, classes = []) => {
  const elem = document.createElement(`${tag}`);
  if (classes.length) {
    classes.forEach((classElem) => elem.classList.add(classElem));
  }
  return elem;
};

const createText = (tag, text, classes = []) => {
  const textBlock = document.createElement(tag);
  textBlock.textContent = text;
  if (classes.length) {
    classes.forEach((classElem) => textBlock.classList.add(classElem));
  }
  return textBlock;
};

const createImg = (src, alt, classes = []) => {
  const image = new Image();
  image.src = src;
  image.alt = alt;
  if (classes.length) {
    classes.forEach((classElem) => image.classList.add(classElem));
  }
  return image;
};

const createBtn = (name = '', classes = [], type = 'button', title = null) => {
  const btn = document.createElement('button');
  btn.textContent = name;
  btn.type = type;
  btn.title = title;
  if (classes.length) {
    classes.forEach((classElem) => btn.classList.add(classElem));
  }
  return btn;
};

// *************-----------data-------------*********** //

const priorityTask = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

// const taskStatusObj = {
//   toDo: 'To Do',
//   complete: 'Complete',
//   inProgress: 'In progress',
// };

const srcImgCollection = {
  private: {
    multiple: '../assets/icon/multiple1.svg',
    person: '../assets/icon/person1.svg',
  },
  priority: {
    high: '../assets/icon/priority_high.svg',
    medium: '../assets/icon/priority_medium.svg',
    low: '../assets/icon/priority_high.svg',
  },
  comments: '../assets/icon/comment-text.svg',
  delete: '../assets/icon/delete.svg',
  edit: '../assets/icon/edit.svg',
  addTask: '../assets/icon/add-plus-circle.svg',
  loadMoreTasks: '../assets/icon/load_more.svg',
  viewList: '../assets/icon/view-list.svg',
  viewTable: '../assets/icon/view_table.svg',
  logo: '../assets/icon/llogo.svg',
  lightThema: '../assets/icon/typcn_weather-sunny.svg',
  darkThema: '../assets/icon/line-md_moon-twotone.svg',
  iconUser: '../assets/icon/user.svg',
  privacyPerson: '../assets/icon/person.svg',
  privacyMultiple: '../assets/icon/multiple.svg',
  previos: '../assets/icon/previous.svg',
  email: '../assets/icon/email.svg',
};

const srcPriority = (priority) => {
  if (priority === priorityTask.high) return srcImgCollection.priority.high;
  if (priority === priorityTask.medium) return srcImgCollection.priority.medium;
  return srcImgCollection.priority.low;
};

const maxLengthDescription = 280;

const myTaskArr = [

  {
    id: '2',
    name: 'Переименовать константу DELAY_TIME ',
    description:
      'Необходимо переименовать константу с DELAY_TIME на DELAY_API_TIME',
    createdAt: new Date('2023-03-09T23:00:00'),
    assignee: 'Иванов',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '912',
        text: 'Будет сделано!',
        createdAt: new Date('2023-03-09T23:00:05'),
        author: 'Иванов',
      },
    ],
  },
  {
    id: '3',
    name: 'Разработать дизайн ',
    description: 'Необходимо разработать дизайн приложения',
    createdAt: new Date('2023-02-09T23:00:00'),
    assignee: 'Петров',
    status: 'In progress',
    priority: 'Low',
    isPrivate: true,
    comments: [
      {
        id: '9120',
        text: 'Будет сделано!',
        createdAt: new Date('2023-02-09T23:00:05'),
        author: 'Петров',
      },
      {
        id: '9128',
        text: 'Ok',
        createdAt: new Date('2023-01-09T23:00:05'),
        author: 'Коршунов',
      },
    ],
  },
  {
    id: '4',
    name: 'Разработать бургер-меню',
    description: 'Разработать бургер-меню',
    createdAt: new Date('2023-01-09T23:00:00'),
    assignee: 'Коршунов',
    status: 'In progress',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '9121',
        text: 'Ok',
        createdAt: new Date('2023-01-09T23:00:05'),
        author: 'Коршунов',
      },
    ],
  },
];
// ----------class ViewHeader---------------//
class HeaderView {
  constructor(id) {
    this.id = id;
  }

  setUser(nameUser) {
    const parentElem = document.querySelector('.user__name');
    parentElem.textContent = nameUser;
  }

  display() {
    const parentElem = document.getElementById(this.id);

    const containerLogo = createDiv(['container__logo']);
    const imgLogo = createImg(srcImgCollection.logo, 'logo', ['logo__img']);
    const logoTitle = createText('h3', 'Task Manager', ['logo__title']);
    containerLogo.append(imgLogo, logoTitle);

    const containerThema = createDiv(['container__thema']);
    const themaBtnLiht = createBtn('', ['thema__btn', 'sunny']);
    const imgLightThema = createImg(srcImgCollection.lightThema, 'white thema', ['thema__img']);
    themaBtnLiht.append(imgLightThema);
    const spanSlesh = createText('span', ' / ');
    const themaBtnDark = createBtn('', ['thema__btn', 'dark']);
    const imgDarkThema = createImg(srcImgCollection.darkThema, 'dark thema', ['thema__img']);
    themaBtnDark.append(imgDarkThema);
    containerThema.append(themaBtnLiht, spanSlesh, themaBtnDark);

    const containerAuth = createDiv(['container__authorize']);
    const containerUserName = createDiv(['container__userName']);
    const imgIconUser = createImg(srcImgCollection.iconUser, 'icon user', ['user__img']);
    const itemNameUser = createText('p', 'user', ['user__name']);
    containerUserName.append(imgIconUser, itemNameUser);
    const btnLogOut = createBtn('LogOut', ['light_btn', 'btn']);
    containerAuth.append(containerUserName, btnLogOut);
    parentElem.append(containerLogo, containerThema, containerAuth);
  }
}

const myHeader = new HeaderView('header');
myHeader.display();
myHeader.setUser('Tom');

// -----------TaskView---------------- //
class TaskView {
  constructor(id) {
    this.id = id;
  }

  display(task) {
    const parentElem = document.getElementById(this.id);

    const btnPrevious = createBtn('', ['dark_btn', 'btn']);
    const imgPrevios = createImg(srcImgCollection.previos, 'icon');
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
    const btnDel = createBtn('', ['btn_icon', 'delete']);
    const imgDel = createImg(srcImgCollection.delete, 'icon delete');
    btnDel.append(imgDel);
    const btnEdit = createBtn('', ['btn_icon', 'edit']);
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
    const formLabel = createElem('label', ['form__label']);
    formLabel.for = 'addComment';
    formLabel.textContent = 'Comment: ';
    const formTextArea = createElem('textarea', ['form__area']);
    formTextArea.name = 'newComment';
    formTextArea.id = 'addComment';
    formTextArea.maxlength = maxLengthDescription;
    const btnForm = createBtn('Add', ['light_btn', 'btn']);
    formElem.append(formLabel, formTextArea, btnForm);

    sectionOneTask.append(
      headerTask,
      containerDateTask,
      deckriptionTask,
      commentsTitle,
      commentsList,
      formElem,
    );

    parentElem.append(btnPrevious, sectionOneTask);
  }
}

const myTaskView = new TaskView('main_task');
myTaskView.display(myTaskArr[1]);

// *************footer*************//
class FooterView {
  constructor(id) {
    this.id = id;
  }

  display() {
    const parentElem = document.getElementById(this.id);

    const footerTitle = createText('h5', 'Task Manager', ['footer__title']);

    const adress = createElem('address', ['container__email']);
    const myName = createText('p', 'Sviatlana Matskevich', ['name__title']);
    const imgEmail = createImg(srcImgCollection.email, 'icon email');
    const ancor = createElem('a', ['email__title']);
    ancor.textContent = 'Sve-Mac@yandex.ru';
    ancor.href = 'mailto: Sve-Mac@yandex.ru';
    adress.append(myName, imgEmail, ancor);
    const date = createText('p', `${convertationDate(new Date())}`, ['footer__date']);
    parentElem.append(footerTitle, adress, date);
  }
}
const footerView = new FooterView('footer');
footerView.display();
