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
// import { taskStatusObj } from './ultilites/field-task';
import MessageModalView from './components/message-modal-view';
import TaskFeedApiService from './models/task-feed-api-service';
import Loader from './components/loader';
import {
  messageDelEdit,
  messageErDublicate,
  messageErServer,
  messageEr,
  messageErPassword,
  messageErName,
  // messageAgainAuth,
} from './ultilites/text-message-user';
import filterTasks from './ultilites/filter-tasks';

class TasksController {
  constructor() {
    this.serviseApi = new TaskFeedApiService('http://169.60.206.50:7777/api');
    this.collection = new TaskCollection();
    this.myUserCollection = new UserCollection();
    this.authModalForm = new AuthFormView('container__columns');
    this.header = new HeaderView('header');
    this.footer = new FooterView('footer');
    this.loader = new Loader('loader_section');
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

  allTasks = [];

  isGuestUser = () => this.getLocalStorage('statusUser');

  renderFilter = () => {
    this.filter.display();
    this.filter.bindFilter(this.getFeed);
    this.filter.bindResetForm(this.renderStartPages);
  };

  renderLoader = () => {
    this.loader.display();
  };

  cleanLoader = () => {
    this.removeElement('loader_section');
  };

  getDataUsers = async () => {
    this.renderLoader();
    const userProfile = await this.serviseApi.getUserProfile();
    this.saveLocalStorage('profileUser', userProfile);
    this.cleanLoader();
    // const allUsers = await this.serviseApi.getUsers();
    // this.saveLocalStorage('allUsers', allUsers);
  };

  renderStartPages = async () => {
    const loadPages = this.getLocalStorage('loadPages');
    if (!loadPages) this.saveLocalStorage('loadPages', loadPagesStart);
    if (this.isAuth && !this.allTasks.length) {
      this.renderLoader();
      await this.getTasksFromServer();
      this.cleanLoader();
    }
    if (!localStorage.getItem('allUsers')) this.getDataUsers();
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
        this.path.prev = pathName.boardCard;
        this.saveLocalStorage(this.path);
        this.showTask(idCheckedTask);
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

  getTasksFromServer = async () => {
    const isLoadPage = this.getLocalStorage('loadPages');
    this.renderLoader();
    const promises = [
      this.serviseApi.getTasks(isLoadPage.from, isLoadPage.to, 1),
      this.serviseApi.getTasks(isLoadPage.from, isLoadPage.to, 2),
      this.serviseApi.getTasks(isLoadPage.from, isLoadPage.to, 3),
    ];
    const results = await Promise.allSettled(promises);
    const successfulPromises = results.filter((p) => p.status === 'fulfilled');
    this.allTasks = [];
    successfulPromises.forEach((arr) => { this.allTasks.push(...arr.value); });
    this.cleanLoader();
  };

  getTasksAfterFilterFromLocal = () => {
    const filterConfig = this.getLocalStorage('dataFilter');
    if (!filterConfig) return this.allTasks;
    if (filterConfig) {
      return [...filterTasks(this.allTasks, { ...filterConfig })];
    }
    return false;
  };

  savePathActual = (pathNew) => {
    const path = this.getLocalStorage('path');
    if (path && (pathNew === pathName.oneTaskPage) && (path.prev === pathName.oneTaskPage)) {
      this.path.prev = pathName.boardCard;
    } else {
      this.path.prev = this.path.actuale;
      this.path.actuale = pathNew;
    }
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
    this.renderLoader();
    const responseServer = await this.serviseApi.editUserProfile(dataUser);
    this.cleanLoader();
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
    this.boardCardView.display(taskAfterFilter || tasksFilter);
    this.boardCardView.bindOpenTask(this.showTask);
    this.boardCardView.bindSetViewBoardList(this.renderMainBoardList);
    this.boardCardView.bindDeleteTask(this.removeTask);
    this.boardCardView.bindAddNewTask(this.openModalCreateTask);
    this.boardCardView.bindOpenEditTask(this.openModalCreateTask);
    this.boardCardView.bindLoadMoreTasks(this.loadMoreTask);
  };

  renderMainBoardList = async (tasksFilter) => {
    const taskAfterFilter = this.getTasksAfterFilterFromLocal();
    this.cleanOneTaskPage();
    this.savePathActual(pathName.boardList);
    this.boardListView.display(taskAfterFilter || tasksFilter);
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
    this.path.actuale = pathName.boardCard;
    this.logInAsGuest();
  };

  renderOneTaskPage = (oneTask) => {
    this.removeElement('container__filter');
    this.removeElement('container__columns');
    this.savePathActual(pathName.oneTaskPage);
    this.pageOneTask.display(oneTask);
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
      const assigneeTask = this.task.find((task) => task.id === id).assignee.userName;
      const userActual = this.getLocalStorage('dataUserServer').userName;
      console.log(assigneeTask, userActual);
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
    // this.renderStartPages();
  };

  registrationUser = async (dataUser) => {
    this.renderLoader();
    const registrDataUser = await this.serviseApi.registrationUser(dataUser);
    this.cleanLoader();
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
    this.renderLoader();
    const authDataUser = await this.serviseApi.authorizeUser(dataUser);
    this.cleanLoader();
    if (!authDataUser.status) {
      this.saveLocalStorage('auth', 'true');
      this.saveLocalStorage('dataUser', dataUser);
      this.saveLocalStorage('tokken', authDataUser);
      this.isAuth = true;
      localStorage.removeItem('statusUser');
      this.renderLoader();
      const allUsers = await this.serviseApi.getUsers();
      this.cleanLoader();
      if (allUsers.status === 401) this.renderMessageModal(messageErPassword);
      if (allUsers.status === 500) this.renderMessageModal(messageErServer);
      const userThis = allUsers.find((user) => user.login === dataUser.login);
      this.saveLocalStorage('dataUserServer', userThis);
      this.saveLocalStorage('allUsers', allUsers);
      this.renderHeader();
      // this.setCurrentUser(userThis);
      this.renderStartPages();
    }
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

  addComment = async (idTask, textComment) => {
    this.renderLoader();
    await this.serviseApi.addComment(textComment, idTask);
    const oneTask = await this.serviseApi.getOneTask(idTask);
    this.cleanLoader();
    this.renderOneTaskPage(oneTask, true);
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

  addTask = async (data) => {
    this.renderLoader();
    const response = await this.serviseApi.addTask(data);
    await this.getTasksFromServer();
    this.cleanLoader();
    if (response.status === 500) this.renderMessageModal(messageErServer);
    this.cleanModalCreateTask();
    this.renderStartPages();
    localStorage.removeItem('editTask');
  };

  removeTask = (id, isNeedRenderFilter) => {
    this.saveLocalStorage('dataRemoveTask', { id, isNeedRenderFilter });
    const assigneeTask = this.allTasks.find((task) => task.id === id).assignee.userName;
    const userActual = this.getLocalStorage('dataUserServer').userName;
    if (assigneeTask === userActual) {
      this.renderConfirm();
    } else {
      this.renderMessageModal(messageDelEdit);
    }
  };

  confirmDeleteTask = async () => {
    this.closeModalCreateTask();
    const dataDeleteTask = this.getLocalStorage('dataRemoveTask');
    this.renderLoader();
    const deleteTask = await this.serviseApi.deleteTask(dataDeleteTask.id);
    if (deleteTask.status === 400) this.renderMessageModal(messageEr);
    if (deleteTask.status === 500) this.renderMessageModal(messageErServer);
    console.log('fffff');
    await this.getTasksFromServer();
    console.log('fffff2');
    if (dataDeleteTask.isNeedRenderFilter) this.renderFilter();
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard();
    } else {
      this.renderMainBoardList();
    }
    localStorage.removeItem('dataRemoveTask');
  };

  getFeed = (skip, top, filterConfig) => {
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard(this.collection.getPage(skip, top, filterConfig));
    } else {
      this.renderMainBoardList(this.collection.getPage(skip, top, filterConfig));
    }
  };

  showTask = async (id) => {
    this.renderLoader();
    const oneTask = await this.serviseApi.getOneTask(id);
    if (!this.allTasks) await this.getTasksFromServer();
    this.cleanLoader();
    this.saveLocalStorage('idCheckedTask', id);
    this.saveLocalStorage('editTask', oneTask);
    this.renderOneTaskPage(oneTask);
  };
}

export default TasksController;
