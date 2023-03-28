/* eslint-disable class-methods-use-this */
import TaskCollection from './models/task-collection';
import HeaderView from './components/header-view';
import FooterView from './components/footer-view';
import FilterView from './components/filter-view';
import TaskFeedView from './components/board-table-view';
import BoardViewList from './components/board-list-view';
import TaskViewPage from './components/page-one-task-view';

class TasksController {
  constructor(tasks) {
    this.collection = new TaskCollection(tasks);
    this.header = new HeaderView('header');
    this.footer = new FooterView('footer');
    this.filter = new FilterView('container__filter');
    this.boardTableView = new TaskFeedView('container__columns');
    this.boardListView = new BoardViewList('container__columns');
    this.pageOneTask = new TaskViewPage('main_task');
  }

  renderFilter = () => {
    this.filter.display();
  };

  renderMainBoardTable = (arrTask) => {
    this.cleanOneTaskPage();
    this.boardTableView.display(arrTask || this.collection.tasks);
  };

  renderMainBoardList = (arrTask) => {
    this.cleanOneTaskPage();
    this.boardListView.display(arrTask || this.collection.tasks);
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
  };

  removeElement = (id) => {
    const elem = document.getElementById(id);
    elem.style.display = 'none';
  };

  display = () => {
    this.header.display();
    this.header.setUser('Tom');
    this.footer.display();
    // this.renderMainBoardList();
    this.renderOneTaskPage(this.collection.tasks[0]);
    //  this.renderMainBoardTable();
    // this.renderFilter();
  };
}

export default TasksController;
