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

const createInput = (type, classes = [], placeholder = null) => {
  const input = document.createElement('input');
  input.placeholder = placeholder;
  input.type = type;
  if (classes.length) {
    classes.forEach((classElem) => input.classList.add(classElem));
  }
  return input;
};

// *************-----------data-------------*********** //

const priorityTask = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const taskStatusObj = {
  toDo: 'To Do',
  complete: 'Complete',
  inProgress: 'In progress',
};

const srcImgCollection = {
  private: {
    multiple: 'assets/icon/multiple1.svg',
    person: 'assets/icon/person1.svg',
  },
  priority: {
    high: 'assets/icon/priority_high.svg',
    medium: 'assets/icon/priority_medium.svg',
    low: 'assets/icon/priority_high.svg',
  },
  comments: 'assets/icon/comment-text.svg',
  delete: 'assets/icon/delete.svg',
  edit: 'assets/icon/edit.svg',
  addTask: 'assets/icon/add-plus-circle.svg',
  loadMoreTasks: 'assets/icon/load_more.svg',
  viewList: 'assets/icon/view-list.svg',
  viewTable: 'assets/icon/view_table.svg',
  logo: 'assets/icon/llogo.svg',
  lightThema: 'assets/icon/typcn_weather-sunny.svg',
  darkThema: 'assets/icon/line-md_moon-twotone.svg',
  iconUser: 'assets/icon/user.svg',
  privacyPerson: 'assets/icon/person.svg',
  privacyMultiple: 'assets/icon/multiple.svg',
  free: '',
};

const srcPriority = (priority) => {
  if (priority === priorityTask.high) return srcImgCollection.priority.high;
  if (priority === priorityTask.medium) return srcImgCollection.priority.medium;
  return srcImgCollection.priority.low;
};

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

// *************class FilterView************//
class FilterView {
  constructor(id) {
    this.id = id;
  }

  display() {
    const parentElem = document.getElementById(this.id);
    const filterTitle = createText('h5', 'Filter by', ['filter__title']);

    const containerSearch = createDiv(['container__search']);
    const searchByName = createBtn('name', ['search__by-name']);
    const spanSlesh = createText('span', ' / ');
    const searchByTitle = createBtn('title', ['search__by-title']);
    const inputSearch = createInput('search', ['search__input'], 'enter data');
    containerSearch.append(searchByName, spanSlesh, searchByTitle, inputSearch);

    const containerPriority = createDiv(['container__priority']);
    const prioritTitle = createText('p', 'priority', ['priority__title']);

    const priorityItems = createDiv(['priority__items']);
    const btnLowPriority = createBtn('', ['priority__btn', 'priority_low'], 'button', 'low');
    const btnMediumPriority = createBtn('', ['priority__btn', 'priority_medium'], 'button', 'medium');
    const btnHightPriority = createBtn('', ['priority__btn', 'priority_height'], 'button', 'hight');
    priorityItems.append(btnLowPriority, btnMediumPriority, btnHightPriority);
    containerPriority.append(prioritTitle, priorityItems);

    const containerPrivacy = createDiv(['container__privacy']);
    const privacyTitle = createText('p', 'privacy', ['priority__title']);

    const privacyBtn = createBtn('', ['privacy__btn'], 'button', 'privacy');
    const imgPersonPrivacy = createImg(srcImgCollection.privacyPerson, 'icon');
    privacyBtn.append(imgPersonPrivacy);
    const publicBtn = createBtn('', ['privacy__btn'], 'button', 'public');
    const imgPublicPrivacy = createImg(srcImgCollection.privacyMultiple, 'icon');
    publicBtn.append(imgPublicPrivacy);
    containerPrivacy.append(privacyTitle, privacyBtn, publicBtn);

    const containerDate = createDiv(['container__privacy']);
    const dateTitle = createText('p', 'date', ['priority__title']);

    const blockDate = createDiv(['container__date']);
    const labelFrom = createText('label', 'from  ', ['date__label']);
    const inputDateFrom = createInput('date', ['input__date']);
    labelFrom.append(inputDateFrom);

    const labelTo = createText('label', 'to  ', ['date__label']);
    const inputDateTo = createInput('date', ['input__date']);
    labelTo.append(inputDateTo);
    blockDate.append(labelFrom, labelTo);
    containerDate.append(dateTitle, blockDate);
    const resetBtn = createBtn('Reset', ['dark_btn', 'btn']);

    parentElem.append(
      filterTitle,
      containerSearch,
      containerPriority,
      containerPrivacy,
      containerDate,
      resetBtn,
    );
  }
}

const filter = new FilterView('container__filter');
filter.display();

// ------**********----class ViewHeader-------*******--------//

class OneTaskView {
  constructor(id) {
    this.id = id;
  }

  display(taskOne) {
    const parentElem = document.getElementById(this.id);

    const task = createDiv(['task']);
    const containerTitleTask = createDiv(['container__title_task']);
    const taskTitle = createText('h6', `${taskOne.name}`, ['task__title']);
    const labelTodo = createDiv(['label__todo']);
    const itemLabelTodo = createText('p', `${taskOne.status}`, []);
    labelTodo.append(itemLabelTodo);
    containerTitleTask.append(taskTitle, labelTodo);

    const containerDateTask = createDiv(['container__date_task']);
    const taskDate = createText('p', `${convertationDate(taskOne.createdAt)}`, ['task__date']);
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

    const containerBtn = createDiv(['container__btn_delete']);
    const btnDelete = createBtn('', ['btn_icon', 'delete']);
    const imgDelete = createImg(srcImgCollection.delete, 'icon delete', ['img_delete']);
    btnDelete.append(imgDelete);

    const btnEdit = createBtn('', ['btn_icon', 'edit']);
    const imgEdit = createImg(srcImgCollection.edit, 'icon edit', ['img_edit']);
    btnEdit.append(imgEdit);
    containerBtn.append(btnDelete, btnEdit);

    const imgPriority = createImg(srcPriority(taskOne.priority), 'priority icon', ['task__priority_img']);
    containerInfoTask.append(userNameLabel, containerBtn, imgPriority);

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

// ------**********----class TaskFeedView-------*******--------//
class TaskFeedView {
  constructor(id) {
    this.id = id;
  }

  taskStatus = ['To Do', 'Complete', 'In progress'];

  createIdList(str) {
    if (str === taskStatusObj.toDo) return 'todo';
    if (str === taskStatusObj.inProgress) return 'inProgress';
    return 'complete';
  }

  display(tasks) {
    const parentElem = document.getElementById(this.id);
    const sectionTasks = createElem('section', ['container__columns']);
    this.taskStatus.forEach((column) => {
      const columnOne = createDiv(['column']);

      const btnAddTask = createBtn(`${column}`, ['btn__add_task', 'dark_btn', 'btn']);
      const imgAdd = createImg(srcImgCollection.addTask, 'icon');
      btnAddTask.append(imgAdd);

      const line = createElem('hr', ['line__column']);
      const list = createElem('ul', ['container__tasks']);
      const idList = this.createIdList(column);
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
    parentElem.append(sectionTasks, containerViewBtn);
    this.taskStatus.forEach((column) => {
      const arrTasksStatus = tasks.filter((task) => task.status === column);
      // console.log(arrTasksStatus);
      if (arrTasksStatus.length) {
        arrTasksStatus.forEach((task) => {
          const oneTask = new OneTaskView(this.createIdList(column));
          oneTask.display(task);
        });
      }
    });
  }
}
const myBoard = new TaskFeedView('container__columns');
myBoard.display(myTaskArr);
