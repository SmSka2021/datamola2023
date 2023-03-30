/* eslint-disable class-methods-use-this */
import TaskCollection from './models/task-collection';
import HeaderView from './components/header-view';
import FooterView from './components/footer-view';
import FilterView from './components/filter-view';
import TaskFeedView from './components/board-table-view';
import BoardViewList from './components/board-list-view';
import TaskViewPage from './components/page-one-task-view';
import { pathData, pathName } from './ultilites/path';

class TasksController {
  constructor() {
    this.collection = new TaskCollection(JSON.parse(localStorage.getItem('tasks')));
    this.header = new HeaderView('header');
    this.footer = new FooterView('footer');
    this.filter = new FilterView('container__filter');
    this.boardCardView = new TaskFeedView('container__columns');
    this.boardListView = new BoardViewList('container__columns');
    this.pageOneTask = new TaskViewPage('main_task');
    this.header.display();
    this.footer.display();
    this.path = JSON.parse(localStorage.getItem('path')) || pathData;
    this.restore = () => {
      console.log(this.getLocalStorage('collectionTasks'));
      this.collection.settasks(this.getLocalStorage('collectionTasks'));
    };
    // if (localStorage.getItem('collectionTasks')) this.restore();
  }

  renderFilter = () => {
    this.filter.display();
    this.filter.bindFilter(this.getFeed);
    this.filter.bindResetForm(this.renderStartPages);
  };

  renderStartPages = () => {
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard();
      this.renderFilter();
    }
    if (this.path.actuale === pathName.boardList) {
      this.renderMainBoardList();
      this.renderFilter();
    }
    if (this.path.actuale === pathName.oneTaskPage) {
      const idCheckedTask = this.getLocalStorage('idCheckedTask');
      if (idCheckedTask) this.showTask(idCheckedTask);
      else this.renderMainBoardCard();
    }
  };

  renderPreviosPages = () => {
    if (this.path.prev === pathName.boardCard) {
      this.renderMainBoardCard();
      this.renderFilter();
    }
    if (this.path.prev === pathName.boardList) {
      this.renderMainBoardList();
      this.renderFilter();
    }
  };

  getTasksAfterFilterFromLocal() {
    const isDataFilter = this.getLocalStorage('dataFilter');
    if (isDataFilter) {
      const filterConfig = this.getLocalStorage('dataFilter');
      return this.collection.getPage(0, 10, filterConfig);
    }
    return false;
  }

  savePathActual(pathNew) {
    this.path.prev = this.path.actuale;
    this.path.actuale = pathNew;
    this.saveLocalStorage('path', this.path);
  }

  renderMainBoardCard = (tasksFilter) => {
    const taskAfterFilter = this.getTasksAfterFilterFromLocal();
    this.cleanOneTaskPage();
    this.savePathActual(pathName.boardCard);
    this.boardCardView.display(tasksFilter || taskAfterFilter || this.collection.tasks);
    this.boardCardView.bindDeleteTask(this.removeTask);
    this.boardCardView.bindOpenTask(this.showTask);
    this.boardCardView.bindSetViewBoardList(this.renderMainBoardList);
  };

  renderMainBoardList = (tasksFilter) => {
    const taskAfterFilter = this.getTasksAfterFilterFromLocal();
    this.cleanOneTaskPage();
    this.savePathActual(pathName.boardList);
    this.boardListView.display(tasksFilter || taskAfterFilter || this.collection.tasks);
    this.boardListView.bindDeleteTask(this.removeTask);
    this.boardListView.bindOpenTask(this.showTask);
    this.boardListView.bindSetViewBoardCard(this.renderMainBoardCard);
  };

  cleanMainBoard = () => {
    this.removeElement('container__filter');
    this.removeElement('container__columns');
  };

  cleanOneTaskPage = () => {
    this.removeElement('main_task');
  };

  renderOneTaskPage = (task, notSavePath) => {
    this.removeElement('container__filter');
    this.removeElement('container__columns');
    if (!notSavePath) {
      this.savePathActual(pathName.oneTaskPage);
    }
    this.pageOneTask.display(task);
    this.pageOneTask.bindPrevViewAllTask(this.renderPreviosPages);
    this.pageOneTask.bindAddComment(this.addComment);
  };

  removeElement = (id) => {
    const elem = document.getElementById(id);
    elem.style.display = 'none';
  };

  display = () => {
    this.renderStartPages();
    // this.renderMainBoardList();
    // this.renderOneTaskPage(this.collection.tasks[0]);
    // this.renderMainBoardCard();
    // this.renderFilter();
  };
  //  _____________________ГЛОБАЛЬНЫЕ ФУНКЦИИ_______________  //

  saveLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

  addComment = (idTask, textComment) => {
    this.collection.addComment(idTask, textComment);
    this.saveLocalStorage('collectionTasks', this.collection.tasks);
    const task = this.collection.get(idTask);
    this.renderOneTaskPage(task, true);
  };

  // добавляем текущего пользователя в хидер и в модель.
  setCurrentUser = (user) => {
    this.collection.user = user;
    this.header.setUser(user);
  };
  //  добавляем новую таску в модель и перерисовываем доску с задачами.

  addTask = (task) => {
    this.collection.add(task);
    // this.renderMainBoardCard(this.collection.tasks);
    this.renderMainBoardList(this.collection.tasks);
  };

  // ------------удаляет таску из модели и перерисовывает доску с задачами.-----//
  removeTask = (id) => {
    this.collection.remove(id);
    this.saveLocalStorage('collectionTasks', this.collection.tasks);
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard();
    } else {
      this.renderMainBoardList();
    }
  };

  // вызывает getPage с параметрами в модели и отображает соответствующую доску с задачами.
  getFeed = (skip, top, filterConfig) => {
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard(this.collection.getPage(skip, top, filterConfig));
    } else {
      this.renderMainBoardList(this.collection.getPage(skip, top, filterConfig));
    }
  };

  // получить таску по айди из модели и отобразить соответствующий TaskView.
  showTask = (id) => {
    this.saveLocalStorage('idCheckedTask', id);
    this.renderOneTaskPage(this.collection.get(id));
  };
}

export default TasksController;
