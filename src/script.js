/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

// *************-----------data-------------*********** //
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

// /////////////////////////start CREATE View////////////////////

// const myTasks = new TaskCollection(bigArrTasks);

// const myHeader = new HeaderView('header');
// myHeader.display();
// myHeader.setUser('Tom');

// const filter = new FilterView('container__filter');

// const myBoard = new TaskFeedView('container__columns');

// const boardViewList = new BoardViewList('container__columns');

// const renderMainBoard = (arrTask) => {
//   filter.display();
//   myBoard.display(arrTask.tasks);
// };

// const renderMainBoardList = (arrTask) => {
//   filter.display();
//   boardViewList.display(arrTask.tasks);
// };

// const cleanMainBoard = () => {
//   document.getElementById('container__filter').style.display = 'none';
//   document.getElementById('container__columns').style.display = 'none';
// };

// const cleanOneTaskPage = () => {
//   document.getElementById('main_task').style.display = 'none';
// };

// // const footerView = new FooterView('footer');
// // footerView.display();

// renderMainBoard(myTasks);
// // renderMainBoardList(myTasks);
// cleanOneTaskPage();

// //  _____________________ГЛОБАЛЬНЫЕ ФУНКЦИИ_______________  //

// // добавляем текущего пользователя в хидер и в модель.

// const setCurrentUser = (user) => {
//   myTasks.user = user;
//   myHeader.setUser(user);
// };

// //  добавляем новую таску в модель и перерисовываем доску с задачами.

// const addTask = (task) => {
//   myTasks.add(task);
//   myBoard.display(myTasks.tasks);
// };

// // ------------удаляет таску из модели и перерисовывает доску с задачами.-----//
// const removeTask = (id) => {
//   myTasks.remove(id);
//   myBoard.display(myTasks.tasks);
// };

// // вызывает getPage с параметрами в модели и отображает соответствующую доску с задачами.
// const getFeed = (skip, top, filterConfig) => {
//   myBoard.display(myTasks.getPage(skip, top, filterConfig));
// };

// // получить таску по айди из модели и отобразить соответствующий TaskView.
// const showTask = (id) => {
//   cleanMainBoard();
//   const myOneTaskView = new TaskView('main_task');
//   myOneTaskView.display(myTasks.get(id));
// };

// // ____________ПРОВЕРКА_______________///

// setCurrentUser('Вася');
// console.log(myTasks.user);

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

// getFeed(0, 5, { assignee: 'Иванов' });
// console.log(myTasks.getPage(0, 5, { assignee: 'Иванов' }));

// showTask('10');
// console.log(myTasks.get('10'));
