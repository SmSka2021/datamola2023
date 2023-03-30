/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

//  ****************MODELS**************** //

// ////////***utils***/////////////////

const maxLengthName = 100;
const maxLengthDescription = 280;

const taskStatus = {
  toDo: 'To Do',
  complete: 'Complete',
  inProgress: 'In progress',
};

const priorityTask = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const bigArrTasks = [
  {
    id: '155',
    name: 'Создать логотип приложения',
    description: 'Формат изображения – svg, размеры - 100х100px',
    createdAt: new Date('2023-03-09T23:00:00'),
    assignee: 'Иванов',
    status: 'To Do',
    priority: 'High',
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
    id: '1',
    name: 'Создать логотип приложения',
    description: 'Формат изображения – svg, размеры - 100х100px',
    createdAt: new Date('2023-03-09T23:00:00'),
    assignee: 'Иванов',
    status: 'Complete',
    priority: 'High',
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
    id: '2',
    name: 'Переименовать константу DELAY_TIME ',
    description:
      'Необходимо переименовать константу с DELAY_TIME на DELAY_API_TIME',
    createdAt: new Date('2023-03-09T23:00:00'),
    assignee: 'Иванов',
    status: 'To Do',
    priority: 'High',
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
  {
    id: '5',
    name: 'Разработать модалку',
    description: 'Сделать модалку',
    createdAt: new Date('2023-01-12T23:00:00'),
    assignee: 'Ермолаева',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [
      {
        id: '9122',
        text: 'Срочно!',
        createdAt: new Date('2023-01-12T23:00:05'),
        author: 'Коршунов',
      },
    ],
  },
  {
    id: '6',
    name: 'Протестировать бургер-меню',
    description: 'Протестировать бургер-меню на разных разрешениях',
    createdAt: new Date('2023-01-15T23:00:00'),
    assignee: 'Буян',
    status: 'To Do',
    priority: 'Low',
    isPrivate: true,
    comments: [
      {
        id: '9123',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2023-01-15T23:00:05'),
        author: 'Коршунов',
      },
    ],
  },
  {
    id: '7',
    name: 'Сделать адаптив',
    description: 'Сделать адаптивную версию дизайна',
    createdAt: new Date('2023-02-15T23:00:00'),
    assignee: 'Варан',
    status: 'In progress',
    priority: 'Medium',
    isPrivate: true,
    comments: [
      {
        id: '9124',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2023-01-15T23:00:05'),
        author: 'Коршунов',
      },
      {
        id: '9125',
        text: 'Не забудь проо логотип!',
        createdAt: new Date('2023-02-15T23:00:05'),
        author: 'Варан',
      },
    ],
  },
  {
    id: '8',
    name: 'Разработать слайдер',
    description: 'Сделать слайдер под фотографии',
    createdAt: new Date('2023-02-11T23:00:00'),
    assignee: 'Белусь',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '912',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2023-01-12T23:00:05'),
        author: 'Коршунов Илья',
      },
      {
        id: '912',
        text: 'Не забудь про новые форматы!',
        createdAt: new Date('2023-02-15T23:00:05'),
        author: 'Варан Саша',
      },
    ],
  },
  {
    id: '9',
    name: 'Разработать пагинацию',
    description: 'Сделать пагинацию основной страницы',
    createdAt: new Date('2023-01-19T23:00:00'),
    assignee: 'Варяг',
    status: 'In progress',
    priority: 'Low',
    isPrivate: true,
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
    id: '10',
    name: 'Сделать авторизацию',
    description: 'Сделать авторизацию пользователя на главной странице',
    createdAt: new Date('2023-02-20T23:00:00'),
    assignee: 'Симан',
    status: 'Complete',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '9129',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2023-01-20T23:00:05'),
        author: 'Коршунов Илья',
      },
      {
        id: '9130',
        text: 'Не забудь проо логотип!',
        createdAt: new Date('2023-02-15T23:00:05'),
        author: 'Варан Саша',
      },
    ],
  },
  {
    id: '11',
    name: 'Сделать страницу админа',
    description: 'Сделать страницу админа для администрирования сайта',
    createdAt: new Date('2023-01-20T23:00:00'),
    assignee: 'Горян',
    status: 'In progress',
    priority: 'Low',
    isPrivate: false,
    comments: [
      {
        id: '9135',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2023-01-20T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '12',
    name: 'Сделать страницу 404',
    description: 'Сделать страницу 404',
    createdAt: new Date('2023-03-20T23:00:00'),
    assignee: 'Ткачук',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: true,
    comments: [
      {
        id: '9136',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2023-03-20T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '13',
    name: 'Разработать header',
    description: 'Разработать header для всех страниц',
    createdAt: new Date('2022-12-22T23:00:00'),
    assignee: 'Шук',
    status: 'To Do',
    priority: 'Low',
    isPrivate: false,
    comments: [
      {
        id: '9137',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2022-12-25T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '14',
    name: 'Разработать footer',
    description: 'Разработать footer для всех страниц',
    createdAt: new Date('2022-12-25T23:00:00'),
    assignee: 'Сидоренко',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '9138',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2022-12-25T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '15',
    name: 'Разработать navigation',
    description: 'Разработать navigation для всех страниц',
    createdAt: new Date('2022-12-27T23:00:00'),
    assignee: 'Сидоренко',
    status: 'In progress',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '9139',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2022-12-27T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '16',
    name: 'Разработать aside',
    description: 'Разработать aside для главной страницы',
    createdAt: new Date('2022-02-27T23:00:00'),
    assignee: 'Ткач',
    status: 'Complete',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '9140',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2022-02-27T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '17',
    name: 'Сверстать confirm modal',
    description:
      'Разработать confirm modal  в соответствии с дизайном  приложения',
    createdAt: new Date('2022-02-28T23:00:00'),
    assignee: 'Петров',
    status: 'To Do',
    priority: 'Low',
    isPrivate: true,
    comments: [
      {
        id: '9141',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2022-02-29T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '18',
    name: 'Сверстать главную страницу',
    description:
      'Сверстать главную страницу в соответствии с дизайном  приложения',
    createdAt: new Date('2022-01-28T23:00:00'),
    assignee: 'Петров',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: true,
    comments: [
      {
        id: '9142',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2022-01-29T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '19',
    name: 'Сверстать  страницу регистрации',
    description:
      'Сверстать страницу регистрации в соответствии с дизайном  приложения',
    createdAt: new Date('2022-01-29T23:00:00'),
    assignee: 'Васильев',
    status: 'In progress',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '9143',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2022-01-29T23:00:05'),
        author: 'Коршунов Илья',
      },
    ],
  },
  {
    id: '19',
    name: 'Проверить макет на соответствие ТЗ',
    description: 'Проверить все страницы макета на соответствие ТЗ ',
    createdAt: new Date('2022-01-30T23:00:00'),
    assignee: 'Васильев',
    status: 'Complete',
    priority: 'High',
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
];

// ////////////////////////////---class Comment---//////////////////////

class Comment {
  constructor(id, text, createdAt, author) {
    this._id = id;
    this.text = text;
    this._createdAt = createdAt;
    this._author = author;
  }

  get id() {
    return this._id;
  }

  set id(item) {
    throw new Error(`Can't change current id ${this._id}`);
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(item) {
    throw new Error(`Can't change date ${this._createdAt}`);
  }

  get author() {
    return this._author;
  }

  set author(item) {
    throw new Error(`Can't change author ${this._author}`);
  }

  static validate(comment) {
    const keysComment = ['_id', 'text', '_createdAt', '_author'];

    const isAllKey = keysComment.every((item) => Object.keys(comment).includes(item));
    if (!isAllKey) return false;

    const validateId = typeof comment._id === 'string' && comment._id.trim().length;
    const validateText = typeof comment.text === 'string'
      && comment.text.length <= maxLengthDescription
      && comment.text.trim().length;
    const validateCreatedAt = comment._createdAt instanceof Date;
    const validateAauthor = typeof comment._author === 'string' && comment._author.length;

    return !!(
      validateId
        && validateText
        && validateAauthor
        && validateCreatedAt
        && true
    );
  }
}

// ////////////////////////////--- class Task ------/////////////////////////////////////

class Task {
  constructor(task) {
    this._id = task.id;
    this.name = task.name;
    this.description = task.description;
    this._createdAt = task.createdAt;
    this.assignee = task.assignee;
    this.status = task.status;
    this.priority = task.priority;
    this.isPrivate = task.isPrivate;
    this.comments = task.comments.map(
      (comment) => new Comment(comment.id, comment.text, comment.createdAt, comment.author),
    );
  }

  get id() {
    return this._id;
  }

  set id(item) {
    throw new Error(`Can't change current id ${this._id}`);
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(item) {
    throw new Error(`Can't change current date ${this._createdAt}`);
  }

  static validate(task) {
    const keysTask = [
      '_id',
      'name',
      'description',
      '_createdAt',
      'assignee',
      'status',
      'priority',
      'isPrivate',
      'comments',
    ];

    const isAllKey = keysTask.every((item) => Object.keys(task).includes(item));
    if (!isAllKey) return false;

    const validateId = typeof task._id === 'string' && task._id.trim().length;
    const validateName = typeof task.name === 'string'
      && task.name.length <= maxLengthName
      && task.name.trim().length;
    const validateDescription = typeof task.description === 'string'
      && task.description.length <= maxLengthDescription
      && task.description.trim().length;
    const validateCreatedAt = task._createdAt instanceof Date;
    const validateAssignee = typeof task.assignee === 'string'
      && task.assignee.trim().length;
    const validateStatus = typeof task.status === 'string'
      && (task.status === taskStatus.toDo
      || task.status === taskStatus.complete
      || task.status === taskStatus.inProgress);
    const validatePriority = typeof task.priority === 'string'
      && (task.priority === priorityTask.high
      || task.priority === priorityTask.medium
      || task.priority === priorityTask.low);
    const validateIsPrivate = typeof task.isPrivate === 'boolean';
    const validateComments = task.comments instanceof Array;
    let resValidateTaskComments = true;
    if (task.comments.length) {
      resValidateTaskComments = task.comments.every((comment) => Comment.validate(comment));
    }

    return !!(
      validateId
        && validateName
        && validateDescription
        && validateCreatedAt
        && validateAssignee
        && validateStatus
        && validatePriority
        && validateIsPrivate
        && validateComments
        && resValidateTaskComments
        && true
    );
  }
}

// //////////---class TaskCollection---/////////////////

class TaskCollection {
  _user = 'Иванов';

  constructor(tasks) {
    this._tasks = tasks.map((task) => new Task(task));
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(newTasks) {
    this._tasks = newTasks.map((task) => new Task(task));
  }

  get user() {
    return this._user;
  }

  set user(name) {
    this._user = name;
  }

  get(id) {
    return this.tasks.find((task) => task.id === id);
  }

  add(task) {
    if (!this.user) return false;

    const newTask = new Task(task);

    if (Task.validate(newTask)) {
      this.tasks.push(newTask);
      return true;
    }
    return false;
  }

  getPage = (skip = 0, top = 10, filterConfig = {}) => {
    const tasksArrSortDate = this.tasks.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    const config = { ...filterConfig };

    return tasksArrSortDate
      .filter(
        (task) => !config.assignee || task.assignee.includes(config.assignee),
      )
      .filter(
        (task) => !config.description || task.description.includes(config.description),
      )
      .filter(
        (task) => !config.status || task.status === config.status,
      )
      .filter(
        (task) => !config.priority || task.priority === config.priority,
      )
      .filter(
        (task) => !config.isPrivate || task.isPrivate === config.isPrivate,
      )
      .filter(
        (task) => !config.dateFrom || task.createdAt.getTime() >= config.dateFrom.getTime(),
      )
      .filter(
        (task) => !config.dateTo || task.createdAt.getTime() <= config.dateTo.getTime(),
      )
      .splice(skip, top);
  };

  edit(
    id,
    nameNew,
    descriptionNew,
    assigneeNew,
    statusNew,
    priorityNew,
    isPrivateNew = false,
  ) {
    const cheskTask = this.get(id);
    if (!this.user || (cheskTask.assignee !== this.user)) return false;

    const editTaskCopy = {
      ...cheskTask,
      id: cheskTask.id,
      name: nameNew || cheskTask.name,
      description: descriptionNew || cheskTask.description,
      createdAt: cheskTask.createdAt,
      assignee: assigneeNew || cheskTask.assignee,
      status: statusNew || cheskTask.status,
      priority: priorityNew || cheskTask.priority,
      isPrivate: (typeof isPrivateNew === 'boolean') ? isPrivateNew : cheskTask.isPrivate,
    };

    if (!Task.validate(editTaskCopy)) {
      return false;
    }
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1, new Task(editTaskCopy));
    return true;
  }

  remove(id) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (this.get(id).assignee === this.user) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  addComment(id, textComment) {
    const indexTask = this.tasks.findIndex((task) => task.id === id);
    const newComment = new Comment(id, textComment, new Date(), this.user);
    if (Comment.validate(newComment)) {
      this.tasks[indexTask].comments.push(newComment);
      return true;
    }
    return false;
  }

  clear() {
    this.tasks = [];
  }

  addAll(tasks) {
    const invalidTasks = [];
    tasks.forEach((task) => {
      const taskNew = new Task(task);
      if (Task.validate(taskNew)) {
        this.tasks.push(taskNew);
      } else {
        invalidTasks.push(taskNew);
      }
    });
    return invalidTasks;
  }
}

// //////////////////////// View Board//////////////////////// //

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
  previos: 'assets/icon/previous.svg',
  previos1: 'assets/icon/previous.svg',
  email: 'assets/icon/email.svg',
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
    name: 'Разработать-меню',
    description: 'Разработать -меню',
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
  // ------------------class ViewHeader---------------------//
// class HeaderView {
//   constructor(id) {
//     this.id = id;
//   }

//   setUser(nameUser) {
//     const elem = document.querySelector('.user__name');
//     elem.textContent = nameUser;
//   }

//   display() {
//     const parentElem = document.getElementById(this.id);
//     const header = createElem('header', ['header']);
//     header.id = 'header';
//     const containerLogo = createDiv(['container__logo']);
//     const imgLogo = createImg(srcImgCollection.logo, 'logo', ['logo__img']);
//     const logoTitle = createText('h3', 'Task Manager', ['logo__title']);
//     containerLogo.append(imgLogo, logoTitle);

//     const containerThema = createDiv(['container__thema']);
//     const themaBtnLiht = createBtn('', ['thema__btn', 'sunny']);
//     const imgLightThema = createImg(srcImgCollection.lightThema, 'white thema', ['thema__img']);
//     themaBtnLiht.append(imgLightThema);
//     const spanSlesh = createText('span', ' / ');
//     const themaBtnDark = createBtn('', ['thema__btn', 'dark']);
//     const imgDarkThema = createImg(srcImgCollection.darkThema, 'dark thema', ['thema__img']);
//     themaBtnDark.append(imgDarkThema);
//     containerThema.append(themaBtnLiht, spanSlesh, themaBtnDark);

//     const containerAuth = createDiv(['container__authorize']);
//     const containerUserName = createDiv(['container__userName']);
//     const imgIconUser = createImg(srcImgCollection.iconUser, 'icon user', ['user__img']);
//     const itemNameUser = createText('p', 'user', ['user__name']);
//     containerUserName.append(imgIconUser, itemNameUser);
//     const btnLogOut = createBtn('LogOut', ['light_btn', 'btn']);
//     containerAuth.append(containerUserName, btnLogOut);
//     header.append(containerLogo, containerThema, containerAuth);
//     parentElem.replaceWith(header);
//   }
// }

// //   ****************  ViewFooter   ********** //

// class FooterView {
//   constructor(id) {
//     this.id = id;
//   }

//   display() {
//     const parentElem = document.getElementById(this.id);
//     const footer = createElem('footer', ['footer']);
//     footer.id = 'footer';
//     const footerTitle = createText('h5', 'Task Manager', ['footer__title']);
//     const adress = createElem('address', ['container__email']);
//     const myName = createText('p', 'Sviatlana Matskevich', ['name__title']);
//     const imgEmail = createImg(srcImgCollection.email, 'icon email');
//     const ancor = createElem('a', ['email__title']);
//     ancor.textContent = 'Sve-Mac@yandex.ru';
//     ancor.href = 'mailto: Sve-Mac@yandex.ru';
//     adress.append(myName, imgEmail, ancor);
//     const date = createText('p', `${convertationDate(new Date())}`, ['footer__date']);
//     footer.append(footerTitle, adress, date);
//     parentElem.replaceWith(footer);
//   }
// }

// // *************  class FilterView  ************//
// class FilterView {
//   constructor(id) {
//     this.id = id;
//   }

//   display() {
//     const parentElem = document.getElementById(this.id);

//     const newsectionTasks = createElem('section', ['container__filter']);
//     newsectionTasks.id = 'container__filter';

//     const filterTitle = createText('h5', 'Filter by', ['filter__title']);

//     const containerSearch = createDiv(['container__search']);
//     const searchByName = createBtn('name', ['search__by-name']);
//     const spanSlesh = createText('span', ' / ');
//     const searchByTitle = createBtn('title', ['search__by-title']);
//     const inputSearch = createInput('search', ['search__input'], 'enter data');
//     containerSearch.append(searchByName, spanSlesh, searchByTitle, inputSearch);

//     const containerPriority = createDiv(['container__priority']);
//     const prioritTitle = createText('p', 'priority', ['priority__title']);

//     const priorityItems = createDiv(['priority__items']);
//     const btnLowPriority = createBtn('', ['priority__btn', 'priority_low'], 'button', 'low');
//     const btnMediumPriority = createBtn(
//  '', ['priority__btn', 'priority_medium'], 'button', 'medium');
//     const btnHightPriority = createBtn(
//  '', ['priority__btn', 'priority_height'], 'button', 'hight');
//     priorityItems.append(btnLowPriority, btnMediumPriority, btnHightPriority);
//     containerPriority.append(prioritTitle, priorityItems);

//     const containerPrivacy = createDiv(['container__privacy']);
//     const privacyTitle = createText('p', 'privacy', ['priority__title']);

//     const privacyBtn = createBtn('', ['privacy__btn'], 'button', 'privacy');
//     const imgPersonPrivacy = createImg(srcImgCollection.privacyPerson, 'icon');
//     privacyBtn.append(imgPersonPrivacy);
//     const publicBtn = createBtn('', ['privacy__btn'], 'button', 'public');
//     const imgPublicPrivacy = createImg(srcImgCollection.privacyMultiple, 'icon');
//     publicBtn.append(imgPublicPrivacy);
//     containerPrivacy.append(privacyTitle, privacyBtn, publicBtn);

//     const containerDate = createDiv(['container__privacy']);
//     const dateTitle = createText('p', 'date', ['priority__title']);

//     const blockDate = createDiv(['container__date']);
//     const labelFrom = createText('label', 'from  ', ['date__label']);
//     const inputDateFrom = createInput('date', ['input__date']);
//     labelFrom.append(inputDateFrom);

//     const labelTo = createText('label', 'to  ', ['date__label']);
//     const inputDateTo = createInput('date', ['input__date']);
//     labelTo.append(inputDateTo);
//     blockDate.append(labelFrom, labelTo);
//     containerDate.append(dateTitle, blockDate);
//     const resetBtn = createBtn('Reset', ['dark_btn', 'btn']);

//     newsectionTasks.append(
//       filterTitle,
//       containerSearch,
//       containerPriority,
//       containerPrivacy,
//       containerDate,
//       resetBtn,
//     );
//     parentElem.replaceWith(newsectionTasks);
//   }
// }

// // ------**********----class OneTaskView-------*******--------//

// class OneTaskView {
//   constructor(id) {
//     this.id = id;
//   }

//   display(taskOne) {
//     const parentElem = document.getElementById(this.id);

//     const task = createDiv(['task']);
//     const containerTitleTask = createDiv(['container__title_task']);
//     const taskTitle = createText('h6', `${taskOne.name}`, ['task__title']);
//     const labelTodo = createDiv(['label__todo']);
//     const itemLabelTodo = createText('p', `${taskOne.status}`, []);
//     labelTodo.append(itemLabelTodo);
//     containerTitleTask.append(taskTitle, labelTodo);

//     const containerDateTask = createDiv(['container__date_task']);
//     const taskDate = createText('p', `${convertationDate(taskOne.createdAt)}`, ['task__date']);
//     const imgIsPrivate = createImg(`${taskOne.isPrivate ?
//  srcImgCollection.private.person : srcImgCollection.private.multiple}`,
//  'privacy img', ['task__img_privacy']);
//     containerDateTask.append(taskDate, imgIsPrivate);

//     const taskText = createText('p', taskOne.description, ['task__text']);

//     const containerComments = createDiv(['container__comments']);
//     const imgComments = createImg(srcImgCollection.comments, 'comments icon',
//  ['task__img_comment']);
//     const countComments = createText('p', `${taskOne.comments.length}`, ['task__date']);
//     containerComments.append(imgComments, countComments);

//     const containerInfoTask = createDiv(['container__info_task']);
//     const userNameLabel = createDiv(['label__todo', 'user_name']);
//     const userNameItem = createText('p', `${taskOne.assignee}`, []);
//     userNameLabel.append(userNameItem);

//     const containerBtn = createDiv(['container__btn_delete']);
//     const btnDelete = createBtn('', ['btn_icon', 'delete']);
//     const imgDelete = createImg(srcImgCollection.delete, 'icon delete', ['img_delete']);
//     btnDelete.append(imgDelete);

//     const btnEdit = createBtn('', ['btn_icon', 'edit']);
//     const imgEdit = createImg(srcImgCollection.edit, 'icon edit', ['img_edit']);
//     btnEdit.append(imgEdit);
//     containerBtn.append(btnDelete, btnEdit);

//     const imgPriority = createImg(srcPriority(taskOne.priority),
//  'priority icon', ['task__priority_img']);
//     containerInfoTask.append(userNameLabel, containerBtn, imgPriority);

//     task.append(
//       containerTitleTask,
//       containerDateTask,
//       taskText,
//       containerComments,
//       containerInfoTask,
//     );
//     parentElem.append(task);
//   }
// }

// // *****************   class TaskFeedView   *****************//

// class TaskFeedView {
//   constructor(id) {
//     this.id = id;
//   }

//   taskStatus = ['To Do', 'Complete', 'In progress'];

//   createIdList(str) {
//     if (str === taskStatusObj.toDo) return 'todo';
//     if (str === taskStatusObj.inProgress) return 'inProgress';
//     return 'complete';
//   }

//   display(tasks) {
//     const parentElem = document.getElementById(this.id);
//     const newsectionTasks = createElem('section', ['board']);
//     newsectionTasks.id = 'container__columns';

//     const sectionTasks = createElem('div', ['container__columns']);

//     this.taskStatus.forEach((column) => {
//       const columnOne = createDiv(['column']);

//       const btnAddTask = createBtn(`${column}`, ['btn__add_task', 'dark_btn', 'btn']);
//       const imgAdd = createImg(srcImgCollection.addTask, 'icon');
//       btnAddTask.append(imgAdd);

//       const line = createElem('hr', ['line__column']);
//       const list = createElem('ul', ['container__tasks']);
//       const idList = this.createIdList(column);
//       list.id = idList;

//       const btnMoreTasks = createBtn('Load more', ['load__btn', 'dark_btn', 'btn']);
//       const imgMoreTasks = createImg(srcImgCollection.loadMoreTasks, 'icon');
//       btnMoreTasks.append(imgMoreTasks);
//       columnOne.append(btnAddTask, line, list, btnMoreTasks);
//       sectionTasks.append(columnOne);
//     });
//     const containerViewBtn = createDiv(['container__view_btn']);

//     const btnViewList = createBtn('', ['dark_btn', 'btn', 'btn_list']);
//     const imgList = createImg(srcImgCollection.viewList, 'icon');
//     btnViewList.append(imgList);

//     const btnViewTable = createBtn('', ['dark_btn', 'btn', 'btn_table']);
//     const imgTable = createImg(srcImgCollection.viewTable, 'icon');
//     btnViewTable.append(imgTable);
//     containerViewBtn.append(btnViewList, btnViewTable);

//     newsectionTasks.append(sectionTasks, containerViewBtn);
//     parentElem.replaceWith(newsectionTasks);
//     this.taskStatus.forEach((column) => {
//       const arrTasksStatus = tasks.filter((task) => task.status === column);
//       if (arrTasksStatus.length) {
//         arrTasksStatus.forEach((task) => {
//           const oneTask = new OneTaskView(this.createIdList(column));
//           oneTask.display(task);
//         });
//       }
//     });
//   }
// }

// // ----------PAGE ONE TASK  -TaskView---------------- //
// class TaskView {
//   constructor(id) {
//     this.id = id;
//   }

//   display(task) {
//     const parentElem = document.getElementById(this.id);
//     const newsectionTasks = createElem('section', ['main', 'main_task']);
//     newsectionTasks.id = 'main_task';
//     const btnPrevious = createBtn('', ['dark_btn', 'btn']);
//     const imgPrevios = createImg(srcImgCollection.previos, 'icon');
//     btnPrevious.append(imgPrevios);

//     const sectionOneTask = createElem('section', ['container__one_task']);

//     const headerTask = createDiv(['header_task']);

//     const containerLabel = createDiv(['container__label']);
//     const labelTodo = createDiv(['label__todo']);
//     const todoTitle = createText('p', `${task.status}`);
//     labelTodo.append(todoTitle);
//     const labelUser = createDiv(['label__todo', 'user_name']);
//     const userTitle = createText('p', `${task.assignee}`);
//     labelUser.append(userTitle);
//     containerLabel.append(labelTodo, labelUser);

//     const containerTitleTask = createDiv(['container__title_one_task']);
//     const imgPriorityTasks = createImg(`${srcPriority(task.priority)}`,
//  'icon', ['task__priority_img']);
//     const userNameItem = createText('h6', `${task.name}`, ['task__title_one']);
//     containerTitleTask.append(imgPriorityTasks, userNameItem);

//     const containerBtnTask = createDiv(['container__btn_task']);
//     const btnDel = createBtn('', ['btn_icon', 'delete']);
//     const imgDel = createImg(srcImgCollection.delete, 'icon delete');
//     btnDel.append(imgDel);
//     const btnEdit = createBtn('', ['btn_icon', 'edit']);
//     const imgEdit = createImg(srcImgCollection.edit, 'icon edit');
//     btnEdit.append(imgEdit);
//     containerBtnTask.append(btnDel, btnEdit);
//     headerTask.append(containerLabel, containerTitleTask, containerBtnTask);

//     const containerDateTask = createDiv(['container__date_task_one']);
//     const taskDateItem = createText('p', `${convertationDate(task.createdAt)}`, ['task__date']);
//     const imgIsPrivacy = createImg(`${task.isPrivate ?
//  srcImgCollection.private.person :
//  srcImgCollection.private.multiple}`, 'privacy img', ['task__img_privacy']);
//     containerDateTask.append(taskDateItem, imgIsPrivacy);

//     const deckriptionTask = createText('p', `${task.description}`, ['task__text_one']);
//     const commentsTitle = createText('h6', 'Comments:', ['comments__title']);
//     const commentsList = createElem('ul', ['comments__list']);
//     if (task.comments.length) {
//       task.comments.forEach((comment) => {
//         const containerComment = createElem('li', ['container__comment']);
//         const imgComment = createImg(srcImgCollection.comments,
//  'comments icon', ['task__img_comment']);
//         const commentItem = createDiv(['comment__item']);
//         const commentUserName = createDiv(['comment__user_name']);
//         const commentAuthor = createText('p', `${comment.author}`, ['user__name_item']);
//         const commentDateItem = createText('p',
//  `${convertationDate(comment.createdAt)}`, ['task__date']);
//         commentUserName.append(commentAuthor, commentDateItem);
//         const commentText = createText('p', `${comment.text}`, ['task__comments_one']);
//         commentItem.append(commentUserName, commentText);
//         containerComment.append(imgComment, commentItem);
//         commentsList.append(containerComment);
//       });
//     }
//     const formElem = createElem('form', ['form']);
//     const formLabel = createElem('label', ['form__label']);
//     formLabel.for = 'addComment';
//     formLabel.textContent = 'Comment: ';
//     const formTextArea = createElem('textarea', ['form__area']);
//     formTextArea.name = 'newComment';
//     formTextArea.id = 'addComment';
//     formTextArea.maxlength = maxLengthDescription;
//     const btnForm = createBtn('Add', ['light_btn', 'btn']);
//     formElem.append(formLabel, formTextArea, btnForm);

//     sectionOneTask.append(
//       headerTask,
//       containerDateTask,
//       deckriptionTask,
//       commentsTitle,
//       commentsList,
//       formElem,
//     );

//     newsectionTasks.append(btnPrevious, sectionOneTask);
//     parentElem.replaceWith(newsectionTasks);
//   }
// }

// // /////////////////////////start CREATE View////////////////////

const myTasks = new TaskCollection(bigArrTasks);

// const myHeader = new HeaderView('header');
// myHeader.display();
// myHeader.setUser('Tom');

// const filter = new FilterView('container__filter');

// const myBoard = new TaskFeedView('container__columns');

// const renderMainBoard = (arrTask) => {
//   filter.display();
//   myBoard.display(arrTask.tasks);
// };

// const cleanMainBoard = () => {
//   document.getElementById('container__filter').style.display = 'none';
//   document.getElementById('container__columns').style.display = 'none';
// };

// const cleanOneTaskPage = () => {
//   document.getElementById('main_task').style.display = 'none';
// };

// const footerView = new FooterView('footer');
// footerView.display();

// renderMainBoard(myTasks);
// cleanOneTaskPage();

//  _____________________ГЛОБАЛЬНЫЕ ФУНКЦИИ_______________  //

// добавляем текущего пользователя в хидер и в модель.

const setCurrentUser = (user) => {
  myTasks.user = user;
  // myHeader.setUser(user);
};

//  добавляем новую таску в модель и перерисовываем доску с задачами.

const addTask = (task) => {
  myTasks.add(task);
  // myBoard.display(myTasks.tasks);
};

// ------------удаляет таску из модели и перерисовывает доску с задачами.-----//
const removeTask = (id) => {
  myTasks.remove(id);
  // myBoard.display(myTasks.tasks);
};

// вызывает getPage с параметрами в модели и отображает соответствующую доску с задачами.
const getFeed = (skip, top, filterConfig) => {
  // myBoard.display(myTasks.getPage(skip, top, filterConfig));
};

// получить таску по айди из модели и отобразить соответствующий TaskView.
// const showTask = (id) => {
//   cleanMainBoard();
//   const myOneTaskView = new TaskView('main_task');
//   myOneTaskView.display(myTasks.get(id));
// };

// ____________ПРОВЕРКА_______________///

setCurrentUser('Вася');
console.log(myTasks.user);

// const newTaskAdd = {
//   id: '108',
//   name: 'НОВАЯ ТАСКА',
//   description: 'Добавили новую таску',
//   createdAt: new Date(),
//   assignee: 'Вася',
//   status: 'To Do',
//   priority: 'Low',
//   isPrivate: false,
//   comments: [
//     {
//       id: '9',
//       text: 'Это не срочно, но важно!',
//       createdAt: new Date('2023-01-12T23:00:05'),
//       author: 'Коршунов Илья',
//     },
//     {
//       id: '91',
//       text: 'Не забудь про новые форматы!',
//       createdAt: new Date('2023-02-15T23:00:05'),
//       author: 'Варан Саша',
//     },
//   ],
// };

// addTask(newTaskAdd);
// console.log(myTasks.get('108'));

// removeTask('108');
// console.log(myTasks.get('108'));

// getFeed(0, 10, { priority: 'Low' });
// console.log(myTasks.getPage(0, 10, { priority: 'Low' }));

// getFeed(0, 5, { dateTo: new Date('2023-02-09T23:00:05') });
console.log(myTasks.getPage(0, 5, {
  assignee: null,
  description: null,
  name: null,
  status: null,
  priority: 'Low',
  isPrivate: false,
}));

// showTask('10');
// console.log(myTasks.get('10'));
