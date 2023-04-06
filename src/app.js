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
import ConfirmModalView from './components/confirm-modal-view';
import { pathData, pathName, loadPagesStart } from './ultilites/path';
import { taskStatusObj } from './ultilites/field-task';
import MessageModalView from './components/message-modal-view';
import TaskFeedApiService from './models/task-feed-api-service';
import {
  messageDelEdit,
  messageErDublicate,
  messageErServer,
  messageEr,
  messageErPassword,
  messageErName,
} from './ultilites/text-message-user';

class TasksController {
  constructor() {
    this.serviseApi = new TaskFeedApiService('http://169.60.206.50:7777/api');
    this.collection = new TaskCollection();
    this.myUserCollection = new UserCollection();
    this.authModalForm = new AuthFormView('container__columns');
    this.header = new HeaderView('header');
    this.footer = new FooterView('footer');
    this.filter = new FilterView('container__filter');
    this.registration = new RegistrationFormView('container__columns');
    this.modalCreateTask = new CreateTaskView('create_task');
    this.messageModal = new MessageModalView('create_task');
    this.boardCardView = new TaskFeedView('container__columns');
    this.boardListView = new BoardViewList('container__columns');
    this.pageOneTask = new TaskViewPage('main_task');
    this.pageUser = new UserPagesView('container__columns');
    this.confimModal = new ConfirmModalView('create_task');
    this.isAuth = this.getLocalStorage('auth');
    this.renderHeader();
    this.footer.display();
    this.setCurrentUser();
    this.path = JSON.parse(localStorage.getItem('path')) || pathData;
    this.renderStartPages();
  }

  isGuestUser = () => this.getLocalStorage('statusUser');

  renderFilter = () => {
    this.filter.display();
    this.filter.bindFilter(this.getFeed);
    this.filter.bindResetForm(this.renderStartPages);
  };

  renderStartPages = () => {
    // this.serviseApi.getUsers();
    this.serviseApi.getTasks();
    // this.serviseApi.setRegisterUser();

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

  editProfileUser = async (dataUser) => {
    const responseServer = await this.serviseApi.editUserProfile(dataUser);
    console.log('response server for edit user', responseServer);
    // сообщаем об успехе или неудаче messageErName
    if (responseServer.status === 401) this.renderMessageModal(messageEr);
    if (responseServer.status === 403) this.renderMessageModal(messageErName);
    if (responseServer.status === 500) this.renderMessageModal(messageErServer);
    if (!responseServer.status) {
      this.saveLocalStorage('dataUserServer', responseServer);
      this.saveLocalStorage('dataUser', dataUser);
      this.saveLocalStorage('isViewProfile', 'true');
      this.renderProfilePage();
      this.setCurrentUser();
    }
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

  renderConfirm = () => {
    this.confimModal.display();
    this.confimModal.bindConfirmYes(this.confirmDeleteTask);
    this.confimModal.bindConfirmNot(this.closeModalCreateTask);
    this.confimModal.bindCloseConfirm(this.closeModalCreateTask);
  };

  renderMessageModal = (text) => {
    this.messageModal.display(text);
    this.messageModal.bindCloseMessageModal(this.closeModalCreateTask);
  };

  removeElement = (id) => {
    const elem = document.getElementById(id);
    elem.style.display = 'none';
  };

  openModalCreateTask = (id) => {
    if (id) {
      const assigneeTask = this.collection.get(id).assignee;
      const userActual = this.collection.user;
      if (assigneeTask !== userActual) {
        this.renderMessageModal(messageDelEdit);
        return;
      }
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

  registrationUser = async (dataUser) => {
    const registrDataUser = await this.serviseApi.registrationUser(dataUser);
    if (registrDataUser.status === 400) this.renderMessageModal(messageErDublicate);
    if (registrDataUser.status === 500) this.renderMessageModal(messageErServer);
    if (!registrDataUser.status) {
      this.saveLocalStorage('dataUser', registrDataUser);
      this.saveLocalStorage('user', registrDataUser.id);
      this.renderAuthPage();
    } else {
      this.renderMessageModal(messageEr);
    }
  };

  setAuthoriseUser = async (dataUser) => {
    console.log(dataUser); // нельзя убрать console, так как dataUser пока не используем- eslint ругается
    // ...посылаем на сервер данные, ищем там usera по id
    const authDataUser = await this.serviseApi.authorizeUser(dataUser);
    if (!authDataUser.status) {
      this.saveLocalStorage('auth', 'true');
      this.saveLocalStorage('dataUser', dataUser);
      this.saveLocalStorage('tokken', authDataUser);
      this.isAuth = true;
      localStorage.removeItem('statusUser');
      const allUsers = await this.serviseApi.getUsers();
      if (allUsers.status === 401) this.renderMessageModal(messageErPassword);
      if (allUsers.status === 500) this.renderMessageModal(messageErServer);
      console.log(allUsers, dataUser);
      const userThis = allUsers.find((user) => user.login === dataUser.login);
      this.saveLocalStorage('dataUserServer', userThis);
      this.renderHeader();
      // this.setCurrentUser(userThis);
      this.renderStartPages();
    }
    const userProfile = await this.serviseApi.getUserProfile();
    this.saveLocalStorage('profileUser', userProfile);
  };

  logInAsGuest = () => {
    this.saveLocalStorage('statusUser', 'guest');
    this.renderStartPages();
    this.renderHeader();
  };

  saveLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

  addComment = (idTask, textComment) => {
    this.collection.addComment(idTask, textComment);
    const task = this.collection.get(idTask);
    this.renderOneTaskPage(task, true);
  };

  setCurrentUser = () => {
    this.header.setUser();
  };

  addOrEditTask = (data, isEditTask) => {
    if (isEditTask) {
      this.editTask(data);
    } else {
      this.addTask(data);
    }
  };

  editTask = (data) => {
    this.collection.edit(data);
    this.cleanModalCreateTask();
    this.renderStartPages();
    localStorage.removeItem('editTask');
  };

  addTask = (data) => {
    this.collection.add(data);
    this.cleanModalCreateTask();
    this.renderStartPages();
    localStorage.removeItem('editTask');
  };

  removeTask = (id, isNeedRenderFilter) => {
    this.saveLocalStorage('dataRemoveTask', { id, isNeedRenderFilter });
    const assigneeTask = this.collection.get(id).assignee;
    const userActual = this.collection.user;
    if (assigneeTask === userActual) {
      this.renderConfirm();
    } else {
      this.renderMessageModal(messageDelEdit);
    }
  };

  confirmDeleteTask = () => {
    this.closeModalCreateTask();
    const dataDeleteTask = this.getLocalStorage('dataRemoveTask');
    this.collection.remove(dataDeleteTask.id);
    if (dataDeleteTask.isNeedRenderFilter) this.renderFilter();
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard();
      localStorage.removeItem('dataRemoveTask');
    } else {
      this.renderMainBoardList();
      localStorage.removeItem('dataRemoveTask');
    }
  };

  getFeed = (skip, top, filterConfig) => {
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard(this.collection.getPage(skip, top, filterConfig));
    } else {
      this.renderMainBoardList(this.collection.getPage(skip, top, filterConfig));
    }
  };

  showTask = (id) => {
    this.saveLocalStorage('idCheckedTask', id);
    this.saveLocalStorage('editTask', this.collection.get(id));
    this.renderOneTaskPage(this.collection.get(id));
  };
}

export default TasksController;
