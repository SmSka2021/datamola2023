/* eslint-disable class-methods-use-this */
import TaskCollection from './models/task-collection';
import HeaderView from './components/header-view';
import FooterView from './components/footer-view';
import FilterView from './components/filter-view';
import TaskFeedView from './components/board-table-view';
import BoardViewList from './components/board-list-view';
import TaskViewPage from './components/page-one-task-view';

class TasksController {
  constructor() {
    this.collection = new TaskCollection(JSON.parse(localStorage.getItem('tasks')));
    this.header = new HeaderView('header');
    this.footer = new FooterView('footer');
    this.filter = new FilterView('container__filter');
    this.boardTableView = new TaskFeedView('container__columns');
    this.boardListView = new BoardViewList('container__columns');
    this.pageOneTask = new TaskViewPage('main_task');
    this.header.display();
    this.footer.display();
    this.path = 'board-card';
    this.restore = () => {
      console.log(JSON.parse(localStorage.getItem('collectionTasks')));
      this.collection.settasks(JSON.parse(localStorage.getItem('collectionTasks')));
    };
    // if (localStorage.getItem('collectionTasks')) this.restore();
  }

  path = '';

  renderFilter = () => {
    this.filter.display();
  };

  renderPrewiosPages = () => {
    if (this.path === 'board-card') {
      this.renderMainBoardTable();
      this.renderFilter();
    }
    if (this.path === 'board-list') {
      this.renderMainBoardList();
      this.renderFilter();
    }
  };

  renderMainBoardTable = () => {
    this.cleanOneTaskPage();
    this.path = 'board-card';
    this.boardTableView.display(this.collection.tasks);
    this.boardTableView.bindDeleteTask(this.removeTask);
    this.boardTableView.bindOpenTask(this.showTask);
    this.boardTableView.bindSetViewBoardList(this.renderMainBoardList);
  };

  renderMainBoardList = () => {
    this.cleanOneTaskPage();
    this.path = 'board-list';
    this.boardListView.display(this.collection.tasks);
    this.boardListView.bindDeleteTask(this.removeTask);
    this.boardListView.bindOpenTask(this.showTask);
    this.boardListView.bindSetViewBoardTable(this.renderMainBoardTable);
  };

  cleanMainBoard = () => {
    this.removeElement('container__filter');
    this.removeElement('container__columns');
  };

  cleanOneTaskPage = () => {
    this.removeElement('main_task');
  };

  renderOneTaskPage = (task) => {
    this.removeElement('container__filter');
    this.removeElement('container__columns');
    this.pageOneTask.display(task);
    this.pageOneTask.bindPrevViewAllTask(this.renderPrewiosPages);
    this.pageOneTask.bindAddComment(this.addComment);
  };

  removeElement = (id) => {
    const elem = document.getElementById(id);
    elem.style.display = 'none';
  };

  display = () => {
    this.renderMainBoardList();
    // this.renderOneTaskPage(this.collection.tasks[0]);
    // this.renderMainBoardTable();
    this.renderFilter();
  };
  //  _____________________ГЛОБАЛЬНЫЕ ФУНКЦИИ_______________  //

  saveLocalStorage = () => {
    localStorage.setItem('collectionTasks', JSON.stringify(this.collection.tasks));
  };

  addComment = (idTask, textComment) => {
    this.collection.addComment(idTask, textComment);
    this.saveLocalStorage();
    const task = this.collection.get(idTask);
    this.renderOneTaskPage(task);
  };

  // добавляем текущего пользователя в хидер и в модель.
  setCurrentUser = (user) => {
    this.collection.user = user;
    this.header.setUser(user);
  };
  //  добавляем новую таску в модель и перерисовываем доску с задачами.

  addTask = (task) => {
    this.collection.add(task);
    // this.renderMainBoardTable(this.collection.tasks);
    this.renderMainBoardList(this.collection.tasks);
  };

  // ------------удаляет таску из модели и перерисовывает доску с задачами.-----//
  removeTask = (id, viewBoard) => {
    this.collection.remove(id);
    this.saveLocalStorage();
    if (viewBoard === 'board-table') {
      this.renderMainBoardTable(this.collection.tasks);
    } else {
      this.renderMainBoardList(this.collection.tasks);
    }
  };

  // вызывает getPage с параметрами в модели и отображает соответствующую доску с задачами.
  getFeed = (skip, top, filterConfig) => {
    // this.renderMainBoardTable(this.collection.getPage(skip, top, filterConfig));
    this.renderMainBoardList(this.collection.getPage(skip, top, filterConfig));
  };

  // получить таску по айди из модели и отобразить соответствующий TaskView.
  showTask = (id) => {
    this.renderOneTaskPage(this.collection.get(id));
  };
}

export default TasksController;
