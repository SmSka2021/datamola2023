/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import HeaderView from './components/header-view';
import FooterView from './components/footer-view';
import FilterView from './components/filter-view';
import TaskFeedView from './components/board-table-view';
import BoardViewList from './components/board-list-view';
import TaskViewPage from './components/page-one-task-view';
import CreateTaskView from './components/create-task-view';
import RegistrationFormView from './components/registration-view';
import AuthFormView from './components/auth-view';
import UserPagesView from './components/user-pages';
import ConfirmModalView from './components/confirm-modal-view';
import { pathData, pathName, loadPagesStart } from './ultilites/path';
import { statusBtn, taskStatusObj, statusBtnLoadStart } from './ultilites/field-task';
import MessageModalView from './components/message-modal-view';
import TaskFeedApiService from './models/task-feed-api-service';
import Loader from './components/loader';
import { createElem } from './ultilites/create-element';
import { getElement } from './ultilites/get-element';
import {
  messageDelEdit,
  messageErDublicate,
  messageErServer,
  messageEr,
  messageErPassword,
  messageErName,
  messageNoMoreTasks,
  messagePrivateTask,
  messageAgainAuth,
  messageIncorrectData,
  messageNotResSearch,
} from './ultilites/text-message-user';
import { filterAllTasks } from './ultilites/filter-tasks';
import { fiveMinutes } from './ultilites/constant';
import { settingColorFontLight, settingColorFontDark } from './ultilites/setting-font-color';

class TasksController {
  constructor() {
    this.serviseApi = new TaskFeedApiService('http://169.60.206.50:7777/api');
    this.authModalForm = new AuthFormView('container__columns');
    this.header = new HeaderView('header');
    this.footer = new FooterView('footer');
    this.loader = new Loader('loader_section');
    this.filter = new FilterView('container__filter');
    this.registration = new RegistrationFormView('container__columns');
    this.modalCreateTask = new CreateTaskView('create_task');
    this.messageModal = new MessageModalView('modal_message');
    this.boardCardView = new TaskFeedView('container__columns');
    this.boardListView = new BoardViewList('container__columns');
    this.pageOneTask = new TaskViewPage('main_task');
    this.pageUser = new UserPagesView('container__columns');
    this.confimModal = new ConfirmModalView('create_task');
    this.isAuth = this.getLocalStorage('auth');
    this.renderHeader();
    this.footer.display();
    this.path = JSON.parse(localStorage.getItem('path')) || pathData;
    this.saveLocalStorage('loadPages', loadPagesStart);
    localStorage.removeItem('hideBtnsLoad');
    this.renderStartPages();
    this.updateDataTask();
    this.setCurrentUser();
    this.setTheme();
    this.settingLang();
  }

  allTasks = [];

  allUser = [];

  profileUser = {};

  settingLang = () => {
    const lang = this.getLocalStorage('lang');
    if (!lang) this.saveLocalStorage('lang', 'ru');
  };

  updateDataTask = () => {
    setTimeout(setInterval(() => { this.getTasksFromServer(); }, fiveMinutes), fiveMinutes);
  };

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

  getDataUserProfile = async () => {
    this.renderLoader();
    const userProfile = await this.serviseApi.getUserProfile();
    this.handlerError(userProfile);
    if (!userProfile.error) {
      this.profileUser = userProfile;
      this.saveLocalStorage('profileUser', userProfile);
    }
    this.cleanLoader();
  };

  getDataUsers = async () => {
    this.renderLoader();
    const usersAll = await this.serviseApi.getUsers();
    this.handlerError(usersAll);
    if (!usersAll.error) {
      this.saveLocalStorage('allUsers', usersAll);
      this.allUser = usersAll;
    }
    this.cleanLoader();
  };

  renderStartPages = async () => {
    if (!this.allTasks.length) {
      await this.getTasksFromServer();
    }
    if (!localStorage.getItem('allUsers') && this.isAuth) await this.getDataUsers();
    if (this.isAuth && !this.getLocalStorage('statusUser') && (this.path.actuale === pathName.profilePage)) {
      await this.getDataUserProfile();
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
      this.renderHeader();
      return;
    }
    if (this.path.actuale === pathName.boardList) {
      this.renderMainBoardList();
      this.renderFilter();
      return;
    }
    if (this.path.actuale === pathName.auth) {
      this.renderAuthPage();
      return;
    }
    if ((this.path.actuale === pathName.oneTaskPage) && this.isAuth) {
      const idCheckedTask = this.getLocalStorage('idCheckedTask');
      if (idCheckedTask) {
        this.path.prev = pathName.boardCard;
        this.saveLocalStorage('path', this.path);
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
    this.savePathActual(pathName.auth);
    this.authModalForm.display();
    this.removeElement('container__filter');
    this.authModalForm.bindOpenRegistrModalForm(this.renderRegistrationPage);
    this.authModalForm.bindLogInAsGuestPage(this.logInAsGuest);
    this.authModalForm.bindGetDataFormAuth(this.setAuthoriseUser);
  };

  getTasksFromServer = async () => {
    this.renderLoader();
    const isLoadPage = this.getLocalStorage('loadPages');
    const allTasksserver = await this.serviseApi.getAllTasks();
    if (allTasksserver.error) {
      this.handlerError(allTasksserver);
    } else {
      const todo = allTasksserver.filter((task) => task.status === 'To Do').slice(isLoadPage.todo.from, isLoadPage.todo.to);
      const complete = allTasksserver.filter((task) => task.status === 'Complete').slice(isLoadPage.inProgress.from, isLoadPage.inProgress.to);
      const progr = allTasksserver.filter((task) => task.status === 'In progress').slice(isLoadPage.complete.from, isLoadPage.complete.to);
      this.allTasks = [];
      this.allTasks.push(...todo, ...complete, ...progr);
      this.cleanLoader();
    }
  };

  getTasksAfterFilterFromLocal = () => {
    const filterConfig = this.getLocalStorage('settingFilter');
    if (!filterConfig) return this.allTasks;
    if (filterConfig) {
      const res = [...filterAllTasks(this.allTasks, { ...filterConfig })];
      if (!res.length) {
        this.renderMessageModal(messageNotResSearch());
        return [];
      }
      return res;
    }
  };

  savePathActual = (pathNew) => {
    const path = this.getLocalStorage('path');
    if (path && (pathNew === pathName.oneTaskPage) && (path.actuale === pathName.oneTaskPage)) {
      this.path.prev = pathName.boardCard;
    } else {
      this.path.prev = this.path.actuale;
      this.path.actuale = pathNew;
    }
    this.saveLocalStorage('path', this.path);
  };

  renderProfilePage = () => {
    this.cleanModalCreateTask();
    this.cleanOneTaskPage();
    this.cleanMainBoard();
    this.savePathActual(pathName.profilePage);
    this.pageUser.display();
    this.pageUser.bindSetEditProfile(this.setEditProfile);
    this.pageUser.bindSetViewProfile(this.setViewProfile);
    this.pageUser.bindSetMainPage(this.setMainPage);
    this.pageUser.bindSetDataFormEditProfile(this.editProfileUser);
  };

  handlerError = (response) => {
    this.cleanLoader();
    if (response.error === 404) this.renderMessageModal(messageAgainAuth(), true);
    if (response.error === 401) this.renderMessageModal(messageEr(), true);
    if (response.error === 500) this.renderMessageModal(messageErServer(), true);
    if (response.error === 405) this.renderMessageModal(messageIncorrectData(), true);
    if (response.error === 400) this.renderMessageModal(messageErDublicate(), true);
    if (response.error === 402) this.renderMessageModal(messageErPassword(), true);
    if (response.error === 403) this.renderMessageModal(messageErName(), true);
  };

  editProfileUser = async (dataUser) => {
    this.renderLoader();
    const responseServer = await this.serviseApi.editUserProfile(dataUser);
    this.cleanLoader();
    if (!responseServer.error) {
      this.saveLocalStorage('isViewProfile', true);
      this.saveLocalStorage('dataUserServer', responseServer);
      this.saveLocalStorage('dataUser', dataUser);
      this.renderProfilePage();
      this.setCurrentUser();
    } else {
      this.saveLocalStorage('isViewProfile', true);
      this.renderProfilePage();
      this.handlerError(responseServer);
    }
  };

  setEditProfile = () => {
    this.saveLocalStorage('isViewProfile', false);
    this.renderProfilePage();
  };

  setMainPage = () => {
    this.saveLocalStorage('isViewProfile', true);
    this.renderMainBoardCard();
    this.renderFilter();
  };

  setViewProfile = () => {
    this.saveLocalStorage('isViewProfile', true);
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

  loadMoreTask = async (status) => {
    const isLoadPage = this.getLocalStorage('loadPages');
    const statusBtnLoad = this.getLocalStorage('hideBtnsLoad') || statusBtnLoadStart;
    let moreTask;
    if (status === statusBtn.todo) {
      if ((this.allTasks.filter((task) => task.status === taskStatusObj.toDo)).length < 10) {
        this.renderMessageModal(messageNoMoreTasks());
        statusBtnLoad.todo = true;
        this.saveLocalStorage('hideBtnsLoad', statusBtnLoad);
        const btnLoadList = getElement('#load_list_todo');
        if (btnLoadList) btnLoadList.style.display = 'none';
        const btnLoadCard = getElement('#load_card_todo');
        if (btnLoadCard) btnLoadCard.style.display = 'none';
        return;
      }
      this.renderLoader();
      moreTask = await this.serviseApi.getTasks(isLoadPage.todo.to, isLoadPage.todo.to + 10, 1);
      this.handlerError(moreTask);
      if (!moreTask.error) {
        isLoadPage.todo = { from: 0, to: isLoadPage.todo.to + 10 };
        const lengthAllTaskOld = this.allTasks.length;
        this.allTasks.push(...moreTask);
        const lengthAllTaskNew = this.allTasks.length;
        if (lengthAllTaskOld === lengthAllTaskNew) {
          window.scrollTo(0, 0);
          statusBtnLoad.todo = true;
          this.saveLocalStorage('hideBtnsLoad', statusBtnLoad);
          this.renderMessageModal(messageNoMoreTasks());
        }
      }
    }
    if (status === statusBtn.inProgress) {
      if ((this.allTasks.filter((task) => task.status === taskStatusObj.inProgress)).length < 10) {
        this.renderMessageModal(messageNoMoreTasks());
        statusBtnLoad.inProgress = true;
        this.saveLocalStorage('hideBtnsLoad', statusBtnLoad);
        const btnLoadList = getElement('#load_list_inProgress');
        if (btnLoadList) btnLoadList.style.display = 'none';
        const btnLoadCard = getElement('#load_card_inProgress');
        if (btnLoadCard) btnLoadCard.style.display = 'none';
        return;
      }
      this.renderLoader();
      moreTask = await this.serviseApi.getTasks(isLoadPage.inProgress.to, isLoadPage.inProgress.to + 10, 2);
      this.handlerError(moreTask);
      if (!moreTask.error) {
        isLoadPage.inProgress = { from: 0, to: isLoadPage.inProgress.to + 10 };
        const lengthAllTaskOld = this.allTasks.length;
        this.allTasks.push(...moreTask);
        const lengthAllTaskNew = this.allTasks.length;
        if (lengthAllTaskOld === lengthAllTaskNew) {
          statusBtnLoad.inProgress = true;
          this.saveLocalStorage('hideBtnsLoad', statusBtnLoad);
          window.scrollTo(0, 0);
          this.renderMessageModal(messageNoMoreTasks());
        }
      }
    }
    if (status === statusBtn.complete) {
      if ((this.allTasks.filter((task) => task.status === taskStatusObj.complete)).length < 10) {
        this.renderMessageModal(messageNoMoreTasks());
        statusBtnLoad.complete = true;
        this.saveLocalStorage('hideBtnsLoad', statusBtnLoad);
        const btnLoadList = getElement('#load_list_complete');
        if (btnLoadList) btnLoadList.style.display = 'none';
        const btnLoadCard = getElement('#load_card_complete');
        if (btnLoadCard) btnLoadCard.style.display = 'none';
        return;
      }
      this.renderLoader();
      moreTask = await this.serviseApi.getTasks(isLoadPage.complete.to, isLoadPage.complete.to + 10, 3);
      this.handlerError(moreTask);
      if (!moreTask.error) {
        isLoadPage.complete = { from: 0, to: isLoadPage.complete.to + 10 };
        const lengthAllTaskOld = this.allTasks.length;
        this.allTasks.push(...moreTask);
        const lengthAllTaskNew = this.allTasks.length;
        if (lengthAllTaskOld === lengthAllTaskNew) {
          statusBtnLoad.complete = true;
          this.saveLocalStorage('hideBtnsLoad', statusBtnLoad);
          window.scrollTo(0, 0);
          this.renderMessageModal(messageNoMoreTasks());
        }
      }
    }
    this.cleanLoader();
    this.saveLocalStorage('loadPages', isLoadPage);
    const path = this.getLocalStorage('path');
    if (path.actuale === pathName.boardCard) {
      this.renderMainBoardCard();
    }
    if (path.actuale === pathName.boardList) {
      this.renderMainBoardList();
    }
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
    this.header.bindSetDarkTheme(this.setDarkTheme);
    this.header.bindSetLightTheme(this.setLightTheme);
    this.header.bindSetRuLang(this.setRuLang);
    this.header.bindSetEnLang(this.setEnLang);
  };

  setRuLang = () => {
    this.saveLocalStorage('lang', 'ru');
    this.cleanModalCreateTask();
    this.renderHeader();
    this.renderStartPages();
  };

  setEnLang = () => {
    this.saveLocalStorage('lang', 'en');
    this.cleanModalCreateTask();
    this.renderHeader();
    this.renderStartPages();
  };

  setTheme = () => {
    const theme = this.getLocalStorage('theme');
    if (theme) {
      (theme === 'dark') ? this.setDarkTheme() : this.setLightTheme();
    } else {
      this.setLightTheme();
    }
  };

  setDarkTheme = () => {
    this.saveLocalStorage('theme', 'dark');
    getElement('#main').style.backgroundImage = 'url(./assets/img/dark_fon3.png)';
    getElement('#main_task').style.backgroundImage = 'url(./assets/img/dark_fon3.png)';
    getElement('.sunny').classList.remove('check_btn');
    getElement('.dark').classList.add('check_btn');
    const pagesProfile = getElement('.info_user_main');
    const fonImg = getElement('.dark_color');
    if (pagesProfile && fonImg) {
      fonImg.classList.add('light_color');
    }
    const pageAutSigh = getElement('.sign__modal_link');
    const pageAutGuest = getElement('.guest_btn_link_auth');
    if (pageAutSigh && pageAutGuest) {
      settingColorFontLight('.sign__modal_link');
      settingColorFontLight('.guest_btn_link_auth');
    }
    const pageRegSigh = getElement('.login__modal_link');
    const pageRegGuest = getElement('.guest_btn_link');
    if (pageRegSigh && pageRegGuest) {
      settingColorFontLight('.login__modal_link');
      settingColorFontLight('.guest_btn_link');
    }
  };

  setLightTheme = () => {
    this.saveLocalStorage('theme', 'light');
    getElement('#main').style.backgroundImage = 'url(./assets/img/light_fon.jpg)';
    getElement('#main_task').style.backgroundImage = 'url(./assets/img/light_fon.jpg)';
    getElement('.sunny').classList.add('check_btn');
    getElement('.dark').classList.remove('check_btn');
    const pagesProfile = getElement('.info_user_main');
    const fonImg = getElement('.dark_color');
    if (pagesProfile && fonImg) {
      fonImg.classList.remove('light_color');
    }
    const pageAutSigh = getElement('.sign__modal_link');
    const pageAutGuest = getElement('.guest_btn_link_auth');
    if (pageAutSigh && pageAutGuest) {
      settingColorFontDark('.sign__modal_link');
      settingColorFontDark('.guest_btn_link_auth');
    }
    const pageRegSigh = getElement('.login__modal_link');
    const pageRegGuest = getElement('.guest_btn_link');
    if (pageRegSigh && pageRegGuest) {
      settingColorFontDark('.login__modal_link');
      settingColorFontDark('.guest_btn_link');
    }
  };

  logOutUser = () => {
    this.auth = false;
    localStorage.removeItem('auth');
    this.path.actuale = pathName.boardCard;
    this.cleanModalCreateTask();
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

  renderMessageModal = (text, isShowBtnMainPages) => {
    this.messageModal.display(text, isShowBtnMainPages);
    this.messageModal.bindCloseMessageModal(this.closeModalMessage);
    this.messageModal.bindShowMainPages(this.actionBtnError);
  };

  actionBtnError = () => {
    this.closeModalMessage();
    const isAuth = this.getLocalStorage('auth');
    if (!isAuth) {
      this.logInAsGuest();
    } else {
      this.renderMainBoardCard();
      this.renderFilter();
    }
  };

  removeElement = (id) => {
    const elem = document.getElementById(id);
    const section = createElem('section');
    section.id = `${id}`;
    elem.replaceWith(section);
  };

  openModalCreateTask = (id) => {
    if (id) {
      const assigneeTask = this.allTasks.find((task) => task.id === id).creator.userName;
      const userActual = this.getLocalStorage('dataUserServer').userName;
      if (assigneeTask !== userActual) {
        this.renderMessageModal(messageDelEdit());
        return;
      }
      this.saveLocalStorage('editTask', this.allTasks.find((task) => task.id === id));
    }
    this.cleanMainBoard();
    this.cleanOneTaskPage();
    this.renderModalCreateTask();
  };

  closeModalCreateTask = () => {
    this.cleanModalCreateTask();
    this.renderStartPages();
  };

  closeModalConfirm = () => {
    this.cleanModalCreateTask();
  };

  closeModalMessage = () => {
    this.removeElement('modal_message');
  };

  registrationUser = async (dataUser) => {
    this.renderLoader();
    const registrDataUser = await this.serviseApi.registrationUser(dataUser);
    this.cleanLoader();
    this.handlerError(registrDataUser);
    if (!registrDataUser.error) {
      this.saveLocalStorage('dataUser', registrDataUser);
      this.saveLocalStorage('user', registrDataUser.id);
      this.renderAuthPage();
    }
  };

  setAuthoriseUser = async (dataUser) => {
    this.renderLoader();
    const authDataUser = await this.serviseApi.authorizeUser(dataUser);
    this.handlerError(authDataUser);
    if (!authDataUser.error) {
      this.savePathActual(pathName.boardCard);
      this.saveLocalStorage('loadPages', loadPagesStart);
      this.saveLocalStorage('auth', 'true');
      this.saveLocalStorage('dataUser', dataUser);
      this.saveLocalStorage('tokken', authDataUser);
      this.isAuth = true;
      localStorage.removeItem('statusUser');
      localStorage.removeItem('hideBtnsLoad');
      localStorage.removeItem('settingFilter');
      await this.getTasksFromServer();
      this.renderLoader();
      const allUsers = await this.serviseApi.getUsers();
      this.cleanLoader();
      this.handlerError(allUsers);
      if (!allUsers.error) {
        const userThis = allUsers.find((user) => user.login === dataUser.login);
        this.saveLocalStorage('dataUserServer', userThis);
        this.saveLocalStorage('allUsers', allUsers);
      }
      this.renderHeader();
      this.renderStartPages();
    }
  };

  logInAsGuest = async () => {
    this.savePathActual(pathName.boardCard);
    this.saveLocalStorage('statusUser', 'guest');
    const dataLocal = ['tokken',
      'dataRemoveTask',
      'dataUserServer',
      'dataUser',
      'editTask',
      'idCheckedTask',
      'isViewProfile',
      'settingFilter',
      'confirmReset',
      'avatar',
      'user',
      'profileUser',
      'hideBtnsLoad',
      'loadPages',
    ];
    dataLocal.forEach((data) => { localStorage.removeItem(data); });
    this.saveLocalStorage('loadPages', loadPagesStart);
    await this.getTasksFromServer();
    this.renderStartPages();
    this.renderHeader();
  };

  saveLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

  addComment = async (idTask, textComment) => {
    this.renderLoader();
    const response = await this.serviseApi.addComment(textComment, idTask);
    this.handlerError(response);
    if (!response.error) {
      const oneTask = await this.serviseApi.getOneTask(idTask);
      this.handlerError(oneTask);
      if (!oneTask.error) {
        this.cleanLoader();
        this.renderOneTaskPage(oneTask, true);
      }
    }
  };

  setCurrentUser = () => {
    this.header.setUser();
  };

  addOrEditTask = (data, isEditTask) => {
    if (isEditTask) {
      this.editTask(data, isEditTask);
    } else {
      this.addTask(data);
    }
  };

  editTask = async (data, id) => {
    const creatorTask = this.allTasks.find((task) => task.id === id).creator.userName;
    const userActual = this.getLocalStorage('dataUserServer').userName;
    if (creatorTask !== userActual) {
      this.renderMessageModal(messageDelEdit());
    } else {
      this.renderLoader();
      const response = await this.serviseApi.editTask(id, data);
      await this.getTasksFromServer();
      this.cleanLoader();
      this.handlerError(response);
      if (!response.error) {
        this.cleanModalCreateTask();
        this.renderStartPages();
        localStorage.removeItem('editTask');
      }
    }
  };

  addTask = async (data) => {
    this.renderLoader();
    const response = await this.serviseApi.addTask(data);
    await this.getTasksFromServer();
    this.cleanLoader();
    if (!response.error) {
      this.cleanModalCreateTask();
      localStorage.removeItem('editTask');
      this.renderStartPages();
    } else {
      this.handlerError(response);
    }
  };

  removeTask = (id, isNeedRenderFilter) => {
    this.saveLocalStorage('dataRemoveTask', { id, isNeedRenderFilter });
    const creatorTask = this.allTasks.find((task) => task.id === id).creator.userName;
    const userActual = this.getLocalStorage('dataUserServer').userName;
    if (creatorTask === userActual) {
      this.renderConfirm();
    } else {
      this.renderMessageModal(messageDelEdit());
    }
  };

  confirmDeleteTask = async () => {
    const path = this.getLocalStorage('path');
    this.closeModalConfirm();
    const dataDeleteTask = this.getLocalStorage('dataRemoveTask');
    this.loader.display();
    const deleteTask = await this.serviseApi.deleteTask(dataDeleteTask.id);
    this.cleanLoader();
    if (!deleteTask.error) {
      await this.getTasksFromServer();
      if (dataDeleteTask.isNeedRenderFilter) this.renderFilter();
      if (path.actuale === pathName.boardCard) {
        this.renderMainBoardCard();
      } else {
        this.renderMainBoardList();
      }
      localStorage.removeItem('dataRemoveTask');
      localStorage.removeItem('editTask');
    } else {
      this.handlerError(deleteTask);
    }
  };

  getFeed = () => {
    if (this.path.actuale === pathName.boardCard) {
      this.renderMainBoardCard();
    } else {
      this.renderMainBoardList();
    }
  };

  showTask = async (idTask) => {
    const id = idTask || this.getLocalStorage('idCheckedTask');
    const taskChecked = this.allTasks.find((task) => task.id === idTask);
    const isPrivateTask = taskChecked.isPrivate;
    const assigneeTask = taskChecked.assignee.userName;
    const creatorTask = taskChecked.creator.userName;
    const thisUser = this.getLocalStorage('dataUserServer').userName;
    if (isPrivateTask && (thisUser !== creatorTask) && (thisUser !== assigneeTask)) {
      this.renderMessageModal(messagePrivateTask());
    } else {
      this.renderLoader();
      const oneTask = await this.serviseApi.getOneTask(id);
      this.cleanLoader();
      this.handlerError(oneTask);
      if (!oneTask.error) {
        if (!this.allTasks) {
          await this.getTasksFromServer();
        }
        this.saveLocalStorage('idCheckedTask', id);
        this.saveLocalStorage('editTask', oneTask);
        this.renderOneTaskPage(oneTask);
      }
    }
  };
}

export default TasksController;
