/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import TaskCollection from './models/task-collection';
import HeaderView from './components/header-view';
import FooterView from './components/footer-view';
import FilterView from './components/filter-view';
import TaskFeedView from './components/board-table-view';
import BoardViewList from './components/board-list-view';
import TaskViewPage from './components/page-one-task-view';
import CreateTaskView from './components/create-task-view';
import RegistrationFormView from './components/registration-view';
import UserCollection from './models/user-collection';
import AuthFormView from './components/auth-view';
import UserPagesView from './components/user-pages';
import { pathData, pathName, loadPagesStart } from './ultilites/path';
import { taskStatusObj } from './ultilites/field-task';

class TasksController {
  constructor() {
    this.collection = new TaskCollection(JSON.parse(localStorage.getItem('tasks')));
    this.myUserCollection = new UserCollection(JSON.parse(localStorage.getItem('users')));
    this.saveLocalStorage('userCollection', this.myUserCollection.users);
    this.saveLocalStorage('collection', this.collection.tasks);
    this.authModalForm = new AuthFormView('container__columns');
    this.header = new HeaderView('header');
    this.footer = new FooterView('footer');
    this.filter = new FilterView('container__filter');
    this.registration = new RegistrationFormView('container__columns');
    this.modalCreateTask = new CreateTaskView('create_task');
    this.boardCardView = new TaskFeedView('container__columns');
    this.boardListView = new BoardViewList('container__columns');
    this.pageOneTask = new TaskViewPage('main_task');
    this.pageUser = new UserPagesView('container__columns');
    this.isAuth = this.getLocalStorage('auth');
    this.renderHeader();
    this.footer.display();
    this.setCurrentUser();
    this.path = JSON.parse(localStorage.getItem('path')) || pathData;
    this.renderStartPages();
    this.restore = () => {
      console.log(this.getLocalStorage('collectionTasks'));
      this.collection.settasks(this.getLocalStorage('collectionTasks'));
    };
    // if (localStorage.getItem('collectionTasks')) this.restore();
  }

  isGuestUser = () => this.getLocalStorage('statusUser');

  renderFilter = () => {
    this.filter.display();
    this.filter.bindFilter(this.getFeed);
    this.filter.bindResetForm(this.renderStartPages);
  };

  renderStartPages = () => {
    const loadPages = this.getLocalStorage('loadPages');
    if (!loadPages) this.saveLocalStorage('loadPages', loadPagesStart);
    if (this.isAuth && !this.getLocalStorage('statusUser') && (this.path.actuale === pathName.profilePage)) {
      this.renderProfilePage();
      return;
    }
    if (!this.isAuth && !this.getLocalStorage('statusUser')) {
      this.renderRegistrationPage();
      return;
    }
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard();
      this.renderFilter();
      return;
    }
    if (this.path.actuale === pathName.boardList) {
      this.renderMainBoardList();
      this.renderFilter();
      return;
    }
    if ((this.path.actuale === pathName.oneTaskPage) && this.isAuth) {
      const idCheckedTask = this.getLocalStorage('idCheckedTask');
      if (idCheckedTask) {
        this.showTask(idCheckedTask);
        this.path.prev = pathName.boardCard;
      } else this.renderMainBoardCard();
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

  renderRegistrationPage = () => {
    this.registration.display();
    this.registration.bindGetDataFormRegistr(this.registrationUser);
    this.registration.bindLogInAsGuest(this.logInAsGuest);
    this.registration.bindOpenAuthModalForm(this.openAuthModalForm);
  };

  openAuthModalForm = () => {
    this.renderAuthPage();
  };

  renderAuthPage = () => {
    this.authModalForm.display();
    this.removeElement('container__filter');
    this.authModalForm.bindOpenRegistrModalForm(this.renderRegistrationPage);
    this.authModalForm.bindLogInAsGuestPage(this.logInAsGuest);
    this.authModalForm.bindGetDataFormAuth(this.setAuthoriseUser);
  };

  setAuthoriseUser = (dataUser) => {
    // ...посылаем на сервер данные
    this.saveLocalStorage('auth', 'true');
    this.isAuth = true;
    localStorage.removeItem('statusUser');
    this.renderHeader();
    this.setCurrentUser(dataUser);
    this.renderStartPages();
  };

  getTasksAfterFilterFromLocal = () => {
    const filterConfig = this.getLocalStorage('dataFilter');
    const isLoadPage = this.getLocalStorage('loadPages');
    if (!filterConfig) {
      const statusTodo = this.collection.getPage(isLoadPage.from, isLoadPage.to, { status: taskStatusObj.toDo });
      const statusInProgr = this.collection.getPage(isLoadPage.from, isLoadPage.to, { status: taskStatusObj.inProgress });
      const statusCompl = this.collection.getPage(isLoadPage.from, isLoadPage.to, { status: taskStatusObj.complete });
      return [...statusTodo, ...statusInProgr, ...statusCompl];
    }
    if (filterConfig && isLoadPage) {
      const statusTodoF = this.collection.getPage(isLoadPage.from, isLoadPage.to, { ...filterConfig, status: taskStatusObj.toDo });
      const statusInProgrF = this.collection.getPage(isLoadPage.from, isLoadPage.to, { ...filterConfig, status: taskStatusObj.inProgress });
      const statusComplF = this.collection.getPage(isLoadPage.from, isLoadPage.to, { ...filterConfig, status: taskStatusObj.complete });
      return [...statusTodoF, ...statusInProgrF, ...statusComplF];
    }
    return false;
  };

  savePathActual = (pathNew) => {
    this.path.prev = this.path.actuale;
    this.path.actuale = pathNew;
    this.saveLocalStorage('path', this.path);
  };

  renderProfilePage = () => {
    this.cleanOneTaskPage();
    this.cleanMainBoard();
    this.savePathActual(pathName.profilePage);
    this.pageUser.display();
    this.pageUser.bindSetEditProfile(this.setEditProfile);
    this.pageUser.bindSetViewProfile(this.setViewProfile);
    this.pageUser.bindSetMainPage(this.setMainPage);
    this.pageUser.bindSetDataFormEditProfile(this.editProfileUser);
  };

  editProfileUser = (dataUser) => {
    this.saveLocalStorage('isViewProfile', 'true');
    this.saveLocalStorage('dataUser', dataUser); // шлём на сервер
    // сообщаем об успехе или неудаче edit
    this.renderProfilePage();
    this.setCurrentUser(dataUser);
  };

  setEditProfile = () => {
    this.saveLocalStorage('isViewProfile', 'false');
    this.renderProfilePage();
  };

  setMainPage = () => {
    this.saveLocalStorage('isViewProfile', 'true');
    this.renderMainBoardCard();
  };

  setViewProfile = () => {
    this.saveLocalStorage('isViewProfile', 'true');
    this.renderProfilePage();
  };

  renderMainBoardCard = (tasksFilter) => {
    const taskAfterFilter = this.getTasksAfterFilterFromLocal();
    this.cleanOneTaskPage();
    this.savePathActual(pathName.boardCard);
    this.boardCardView.display(taskAfterFilter || tasksFilter || this.collection.tasks);
    this.boardCardView.bindOpenTask(this.showTask);
    this.boardCardView.bindSetViewBoardList(this.renderMainBoardList);
    this.boardCardView.bindDeleteTask(this.removeTask);
    this.boardCardView.bindAddNewTask(this.openModalCreateTask);
    this.boardCardView.bindOpenEditTask(this.openModalCreateTask);
    this.boardCardView.bindLoadMoreTasks(this.loadMoreTask);
  };

  renderMainBoardList = (tasksFilter) => {
    const taskAfterFilter = this.getTasksAfterFilterFromLocal();
    this.cleanOneTaskPage();
    this.savePathActual(pathName.boardList);
    this.boardListView.display(taskAfterFilter || tasksFilter || this.collection.tasks);
    this.boardListView.bindOpenTask(this.showTask);
    this.boardListView.bindSetViewBoardCard(this.renderMainBoardCard);
    this.boardListView.bindAddNewTask(this.openModalCreateTask);
    this.boardListView.bindOpenEditTask(this.openModalCreateTask);
    this.boardListView.bindDeleteTask(this.removeTask);
    this.boardListView.bindLoadMoreTasks(this.loadMoreTask);
  };

  loadMoreTask = () => {
    console.log('hrttyu');
    const isLoadPage = this.getLocalStorage('loadPages');
    const filterConfig = this.getLocalStorage('dataFilter');
    if (isLoadPage) {
      this.saveLocalStorage('loadPages', { from: 0, to: isLoadPage.to + 10 });
    }
    this.getFeed(0, isLoadPage.to + 10, filterConfig || {});
  };

  cleanMainBoard = () => {
    this.removeElement('container__filter');
    this.removeElement('container__columns');
  };

  cleanOneTaskPage = () => {
    this.removeElement('main_task');
  };

  cleanModalCreateTask = () => {
    this.removeElement('create_task');
  };

  renderHeader = () => {
    this.header.display();
    this.header.bindOpenLoginModalHeader(this.renderAuthPage);
    this.header.bindLogOutHeader(this.logOutUser);
    this.header.bindOpenProfileUserFromHeader(this.renderProfilePage);
  };

  logOutUser = () => {
    this.auth = false;
    localStorage.removeItem('auth');
    localStorage.removeItem('dataUser');
    this.path.actuale = pathName.boardCard;
    this.logInAsGuest();
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
    this.pageOneTask.bindDeleteTask(this.removeTask);
    this.pageOneTask.bindOpenEditTask(this.openModalCreateTask);
  };

  renderModalCreateTask = () => {
    this.modalCreateTask.display();
    this.modalCreateTask.bindCloseModal(this.closeModalCreateTask);
    this.modalCreateTask.bindGetDataFormModal(this.addOrEditTask);
  };

  removeElement = (id) => {
    const elem = document.getElementById(id);
    elem.style.display = 'none';
  };

  openModalCreateTask = (id) => {
    if (id) {
      this.saveLocalStorage('editTask', this.collection.get(id));
    }
    this.cleanMainBoard();
    this.cleanOneTaskPage();
    this.renderModalCreateTask();
  };

  closeModalCreateTask = () => {
    this.cleanModalCreateTask();
    this.renderStartPages();
  };

  registrationUser = (dataUser, action) => {
    console.log(dataUser, action);
    this.saveLocalStorage('dataUser', dataUser);
    // послать данные на сервер в случа успеха переход на auth
    this.renderAuthPage();
    // this.renderStartPages();
    // this.header.display();
  };

  logInAsGuest = () => {
    this.saveLocalStorage('statusUser', 'guest');
    this.renderStartPages();
    this.renderHeader();
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
  setCurrentUser = (user = this.getLocalStorage('dataUser')) => {
    if (!user) return;
    this.collection.user = user.firstName;
    this.header.setUser(user.firstName);
  };
  //  добавляем новую таску в модель и перерисовываем доску с задачами.

  addOrEditTask = (data, isEditTask) => {
    if (isEditTask) {
      this.editTask(data);
    } else {
      this.addTask(data);
    }
  };

  editTask = (data) => {
    this.collection.edit(data);
    this.saveLocalStorage('collectionTasks', this.collection.tasks);
    this.cleanModalCreateTask();
    this.renderStartPages();
    localStorage.removeItem('editTask');
    // this.renderMainBoardCard();
  };

  addTask = (data) => {
    this.collection.add(data);
    this.saveLocalStorage('collectionTasks', this.collection.tasks);
    this.cleanModalCreateTask();
    this.renderStartPages();
    localStorage.removeItem('editTask');
    // this.renderMainBoardCard();
  };
  // ------------удаляет таску из модели и перерисовывает доску с задачами.-----//

  removeTask = (id, isNeedRenderFilter) => {
    this.collection.remove(id);
    this.saveLocalStorage('collectionTasks', this.collection.tasks);
    if (isNeedRenderFilter) this.renderFilter();
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
    this.saveLocalStorage('editTask', this.collection.get(id));
    this.renderOneTaskPage(this.collection.get(id));
  };
}

export default TasksController;
