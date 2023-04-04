/* eslint-disable max-classes-per-file */

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

const tasksMy = [
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
    createdAt: new Date('2023-02-1T23:00:00'),
    assignee: 'Белусь',
    status: 'To Do',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '912',
        text: 'Это не срочно, но важно!',
        createdAt: new Date('2023-01-1T23:00:05'),
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

  add(objData) {
    if (!this.user || this.user !== objData.assignee) return false;

    const newTask = new Task({
      id: new Date().getTime().toString(),
      name: objData.name,
      description: objData.description,
      createdAt: new Date(),
      assignee: objData.assignee,
      status: objData.status,
      priority: objData.priority,
      isPrivate: objData.isPrivate,
      comments: [],
    });

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

const myTasks = new TaskCollection(tasksMy);

// myTasks.user = 'Иванов';

console.log(myTasks.tasks.length);
// myTasks.clear();
// console.log(myTasks.tasks.length);

// const addMyCollection = [
//   {
//     id: '200',
//     name: 'Создать логотип приложения',
//     description: 'Формат изображения – svg, размеры - 100х100px',
//     createdAt: new Date('2023-03-09T23:00:00'),
//     assignee: 'Иванов',
//     status: 'To Do',
//     priority: 'High',
//     isPrivate: false,
//     comments: [],
//   },
//   {
//     id: '404',
//     name: 'Создать логотип приложения',
//     description: 'Формат изображения – svg, размеры - 100х100px',
//     createdAt: new Date('2023-03-09T23:00:00'),
//     assignee: 'Иванов',
//     status: 'To Do',
//     priority: 'High',
//     isPrivate: 'false',
//     comments: [],
//   },
// ];

// console.log(myTasks.addAll(addMyCollection));
// console.log(myTasks.tasks.length);

// const validComments1 = {
//   _id: '9143',
//   text: 'Это не срочно, но важно!',
//   _createdAt: new Date(),
//   _author: 'Коршунов Илья',
// };
// const invalidComments1 = {
//   id: '9143',
//   text: 'Это не срочно, но важно!',
//   createdAt: new Date(),
//   author: 'Коршунов Илья',
// };

// const invalidComments2 = {
//   _id: '9143',
//   _createdAt: '2022-01-29T23:00:05',
//   author: 'Коршунов Илья',
// };

// console.log(Comment.validate(validComments1));
// console.log(Comment.validate(myTasks.tasks[17].comments[0]));
// console.log(Comment.validate(invalidComments1));
// console.log(Comment.validate(invalidComments2));

// console.log(myTasks.get('1'));
// console.log(myTasks.addComment('1', 'Hello, user'));
// console.log(myTasks.get('1'));

// console.log(myTasks.get('2'));
// console.log(myTasks.addComment('2', ''));
// console.log(myTasks.get('2'));

// console.log(myTasks.tasks.length);
// console.log(myTasks.remove('5')); // user != assegne => false
// console.log(myTasks.tasks.length);

// console.log(myTasks.remove('1')); // user === assegne => true
// console.log(myTasks.get('1'));
// console.log(myTasks.tasks.length);

// console.log(myTasks.get('5'));
// console.log(myTasks.edit('5', 'hi', 'hello')); // user != assegne => false
// console.log(myTasks.get('5'));

// console.log(Task.validate(myTasks.get('1')));
// console.log(myTasks.edit('1', 'hi', 'hello'));
// console.log(myTasks.get('1'));
// console.log(myTasks.edit('1', 'hi', 'hello', 'Иванов', 'To Do', 'Low', true));
// console.log(myTasks.get('1'));

// console.log(myTasks.getPage(0, 2, { assignee: 'Васильев' }));
// console.log(myTasks.getPage(0, 2, { priority: 'Low' }));
// console.log(myTasks.getPage(0, 3, { status: 'Complete' }));
// console.log(myTasks.getPage(0, 2, { assignee: 'Петров', status: 'To Do' }));
// console.log(myTasks.getPage(0, 2, { assignee: 'Петров', status: 'To Do', priority: 'Low' }));
// console.log(myTasks.getPage(0, 2, { assignee: 'Петров', isPrivate: true }));
// console.log(myTasks.getPage(0, 2, { assignee: 'Петров', description: 'confirm modal' }));
// console.log(myTasks.getPage(0, 2, { dateFrom: new Date('2022-01-29T23:00:05') }));
// console.log(myTasks.getPage(0, 2, { dateTo: new Date('2022-01-29T23:00:05') }));

// console.log(myTasks.get('15'));
// const validTask = {
//   id: '700',
//   name: 'Проверить макет на соответствие ТЗ',
//   description: 'Проверить все страницы макета на соответствие ТЗ ',
//   createdAt: new Date('2022-01-30T23:00:00'),
//   assignee: 'Васильев',
//   status: 'Complete',
//   priority: 'High',
//   isPrivate: false,
//   comments: [{
//     id: '9143',
//     text: 'Это не срочно, но важно!',
//     createdAt: new Date(),
//     author: 'Коршунов Илья',
//   }],
// };
// const validTaskInvalidComment = {
//   id: '700',
//   name: 'Проверить макет на соответствие ТЗ',
//   description: 'Проверить все страницы макета на соответствие ТЗ ',
//   createdAt: new Date('2022-01-30T23:00:00'),
//   assignee: 'Васильев',
//   status: 'Complete',
//   priority: 'High',
//   isPrivate: false,
//   comments: [{
//     id: '9143',
//     text: 'Это не срочно, но важно!',
//     createdAt: '25.03.2033',
//     author: 'Коршунов Илья',
//   }],
// };
// const invalidTask = {
//   id: '4',
//   name: 'Проверить макет на соответствие ТЗ',
//   description: 'Проверить все страницы макета на соответствие ТЗ ',
//   createdAt: '2022-01-30T23:00:00',
//   assignee: 'Васильев',
//   status: 'Complete',
//   priority: 'High',
//   isPrivate: false,
//   comments: [],
// };
// const invalidTask2 = {
//   id: '',
//   name: 'Проверить макет на соответствие ТЗ',
//   description: 'Проверить все страницы макета на соответствие ТЗ ',
//   createdAt: new Date('2022-01-30T23:00:00'),
//   assignee: 'Васильев',
//   status: 'Complete',
//   priority: 'High',
//   isPrivate: false,
//   comments: [],
// };

// const invalidTask3 = {
//   id: '77',
//   description: 'Проверить все страницы макета на соответствие ТЗ ',
//   createdAt: new Date('2022-01-30T23:00:00'),
//   assignee: 'Васильев',
//   status: 'Complete',
//   priority: 'High',
//   isPrivate: false,
//   comments: [],
// };
// console.log(Task.validate(new Task(validTask)));
// console.log(Task.validate(new Task(validTaskInvalidComment)));
// console.log(Task.validate(new Task(invalidTask)));
// console.log(Task.validate(new Task(invalidTask2)));
// console.log(Task.validate(new Task(invalidTask3)));
// console.log(myTasks.tasks.every((task) => Task.validate(task)));

// console.log(myTasks.tasks.length);
// console.log(myTasks.add('Add modal', 'Description', 'Serg', 'Complete', 'Low', false));
// console.log(myTasks.tasks.length);
// console.log(myTasks.add('Add modal', 'Description', 'Serg', 'Complete', 'Low', 'false'));
// console.log(myTasks.tasks.length);
const addY = {
  assignee: 'Иванов',
  description: 'м',
  isPrivate: true,
  name: 'м',
  priority: 'High',
  status: 'To Do',
};
console.log(myTasks.add(addY));
console.log(myTasks.tasks.length);
