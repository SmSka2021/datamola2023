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
    comments: [],
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
    comments: [],
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
    comments: [],
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
    comments: [],
  },
];

// ///////////////////////////////////////////////////////////////////////////////

class TaskCollection {
  _user = 'Иванов';

  constructor(tasks) {
    this._tasks = tasks;
  }

  get tasks() {
    return this._tasks;
  }

  get user() {
    return this._user;
  }

  set user(name) {
    this._user = name;
  }

  get(id) {
    return this._tasks.find((task) => task.id === id);
  }

  add(name, description, assignee, status, priority, isPrivate) {
    const newTask = {
      id: new Date().getTime().toString(),
      name,
      description,
      createdAt: new Date(),
      assignee,
      status,
      priority,
      isPrivate,
      comments: [],
    };

    if (this._validateTask(newTask)) {
      this._tasks.push(newTask);
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  _validateTask(task) {
    const keysTask = [
      'id',
      'name',
      'description',
      'createdAt',
      'assignee',
      'status',
      'priority',
      'isPrivate',
      'comments',
    ];
    const isAllKey = keysTask.every((item) => Object.keys(task).includes(item));
    if (!isAllKey) return false;

    const validateId = typeof task.id === 'string' && task.id.trim().length;
    const validateName = typeof task.name === 'string'
      && task.name.length <= maxLengthName
      && task.name.trim().length;
    const validateDescription = typeof task.description === 'string'
      && task.description.length <= maxLengthDescription
      && task.description.trim().length;
    const validateCreatedAt = task.createdAt instanceof Date;
    const validateAssignee = typeof task.assignee === 'string'
      && task.assignee.trim().length;
    const validateStatus = typeof task.status === 'string'
      && (
        task.status === taskStatus.toDo
        || task.status === taskStatus.complete
        || task.status === taskStatus.inProgress);
    const validatePriority = typeof task.priority === 'string'
      && (
        task.priority === priorityTask.high
        || task.priority === priorityTask.low
        || task.priority === priorityTask.medium);
    const validateIsPrivate = typeof task.isPrivate === 'boolean';
    const validateComments = task.comments instanceof Array;

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
      && true
    );
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
    const editTaskCopy = {
      ...cheskTask,
      name: nameNew || cheskTask.name,
      description: descriptionNew || cheskTask.description,
      assignee: assigneeNew || cheskTask.assignee,
      status: statusNew || cheskTask.status,
      priority: priorityNew || cheskTask.priority,
      isPrivate: (typeof isPrivateNew === 'boolean') ? isPrivateNew : cheskTask.isPrivate,
    };
    if (editTaskCopy.assignee !== this._user) return false;

    if (!this._validateTask(editTaskCopy)) return false;
    const index = this._tasks.findIndex((task) => task.id === id);
    this._tasks.splice(index, 1, editTaskCopy);
    return true;
  }

  remove(id) {
    const index = this._tasks.findIndex((task) => task.id === id);

    if (this.get(id).assignee === this._user) {
      this._tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  addComment(id, textComment) {
    const indexTask = this._tasks.findIndex((task) => task.id === id);
    const dateNow = new Date();
    const newComment = {
      id: dateNow.getTime().toString(),
      text: textComment,
      createdAt: new Date(dateNow),
      author: this._user,
    };

    if (this._validateComment(newComment)) {
      this._tasks[indexTask].comments.push(newComment);
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  _validateComment(comment) {
    const keysComment = ['id', 'text', 'createdAt', 'author'];
    const isAllKey = keysComment.every((item) => Object.keys(comment).includes(item));
    if (!isAllKey) return false;

    const validateId = typeof comment.id === 'string' && comment.id.trim().length;
    const validateText = typeof comment.text === 'string'
    && comment.text.length <= maxLengthDescription
    && comment.text.trim().length;
    const validateCreatedAt = comment.createdAt instanceof Date;
    const validateAauthor = typeof comment.author === 'string' && comment.author.length;

    return !!(
      validateId
      && validateText
      && validateAauthor
      && validateCreatedAt
      && true
    );
  }

  clear() {
    this._tasks = [];
  }

  addAll(tasks) {
    const invalidTasks = [];
    tasks.forEach((task) => {
      if (this._validateTask(task)) {
        this._tasks.push(task);
      } else {
        invalidTasks.push(task);
      }
    });
    return invalidTasks;
  }
}

const myTasks = new TaskCollection(tasksMy);

console.log(myTasks.tasks.length);
myTasks.clear();
console.log(myTasks.tasks.length);

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

// const invalidComments1 = {
//   id: '19',
//   name: 'Сверстать  страницу регистрации',
//   description:
//     'Сверстать страницу регистрации в соответствии с дизайном  приложения',
//   createdAt: new Date('2022-01-29T23:00:00'),
//   assignee: 'Васильев',
//   status: 'In progress',
//   priority: 'High',
//   isPrivate: false,
//   comments: [
//     {
//       id: '9143',
//       text: 'Это не срочно, но важно!',
//       createdAt: '2022-01-29T23:00:05',
//       author: 'Коршунов Илья',
//     },
//   ],
// };

// const invalidComments2 = {
//   id: '19',
//   name: 'Сверстать  страницу регистрации',
//   description:
//     'Сверстать страницу регистрации в соответствии с дизайном  приложения',
//   createdAt: new Date('2022-01-29T23:00:00'),
//   assignee: 'Васильев',
//   status: 'In progress',
//   priority: 'High',
//   isPrivate: false,
//   comments: [
//     {
//       id: '9143',
//       createdAt: '2022-01-29T23:00:05',
//       author: 'Коршунов Илья',
//     },
//   ],
// };

// console.log(myTasks._validateComment(tasksMy[2].comments[0]));
// console.log(myTasks._validateComment(invalidComments1));
// console.log(myTasks._validateComment(invalidComments2));

// console.log(myTasks.get('1'));
// console.log(myTasks.addComment('1', 'Hello, user'));
// console.log(myTasks.get('1'));

// console.log(myTasks.get('2'));
// console.log(myTasks.addComment('2', ''));
// console.log(myTasks.get('2'));

// console.log(tasksMy.length);
// console.log(myTasks.remove('5'));
// console.log(tasksMy.length);
// console.log(myTasks.remove('1'));
// console.log(myTasks.get('1'));
// console.log(tasksMy.length);

// console.log(myTasks.get('5'));
// console.log(myTasks.edit('5', 'hi', 'hello'));
// console.log(myTasks.get('5'));

// console.log(myTasks.get('1'));
// console.log(myTasks.edit('1', 'hi', 'hello'));
// console.log(myTasks.get('1'));
// console.log(myTasks.edit('1', 'hi', 'hello', 'Иванов', 'To Do', 'Low', true));
// console.log(myTasks.get('1'));

// console.log(myTasks.getPage(0, 2, { assignee: 'Васильев' }));
// console.log(myTasks.getPage(0, 3, { status: 'Complete' }));
// console.log(myTasks.getPage(0, 2, { assignee: 'Петров', status: 'To Do' }));
// console.log(myTasks.getPage(0, 2, { assignee: 'Петров', status: 'To Do', priority: 'Low' }));
// console.log(myTasks.getPage(0, 2, { assignee: 'Петров', isPrivate: true }));
// console.log(myTasks.getPage(0, 2, { assignee: 'Петров', description: 'confirm modal' }));
// console.log(myTasks.getPage(0, 2, { dateFrom: new Date('2022-01-29T23:00:05') }));
// console.log(myTasks.getPage(0, 2, { dateTo: new Date('2022-01-29T23:00:05') }));

// console.log(myTasks.get('15'));
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

// console.log(myTasks._validateTask(tasksMy[0]));

// console.log([...tasksMy.map((task) => myTasks._validateTask(task))]);
// console.log(myTasks._validateTask(invalidTask));
// console.log(myTasks._validateTask(invalidTask2));
// console.log(myTasks._validateTask(invalidTask3));

// console.log(tasksMy.length);
// console.log(myTasks.add('Add modal', 'Description', 'Serg', 'Complete', 'Low', false));
// console.log(tasksMy.length);
// console.log(myTasks.add('Add modal', 'Description', 'Serg', 'Complete', 'Low', 'false'));
// console.log(tasksMy.length);
