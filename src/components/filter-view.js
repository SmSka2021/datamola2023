/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createText,
  createImg,
  createBtn,
  createInput,
  createInputRadio,

} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import { getElement } from '../ultilites/get-element';
import { priorityTask } from '../ultilites/field-task';
import settingFilterStart from '../ultilites/setting-filter';

class FilterView {
  constructor(id) {
    this.id = id;
    this.stateFilter = localStorage.getItem('settingFilter') ? JSON.parse(localStorage.getItem('settingFilter')) : settingFilterStart;
  }

  filterData = {
    assignee: null,
    description: null,
    status: null,
    priority: null,
    isPrivate: null,
    dateFrom: null,
    dateTo: null,
  };

  // changeViewImg = (searchBy) => {
  //   if (searchBy === 'assignee') {
  //     console.log('ll');
  //   }
  // };

  saveSettingLocalStorage() {
    localStorage.setItem('settingFilter', JSON.stringify(this.stateFilter));
    localStorage.setItem('dataFilter', JSON.stringify(this.filterData));
  }

  removeSettingLocalStorage() {
    localStorage.removeItem('settingFilter');
    localStorage.removeItem('dataFilter');
  }

  bindFilter(handler) {
    const filter = getElement('.form__filter');
    filter.addEventListener('click', (event) => {
      event.stopPropagation();
      getElement('#low').onchange = () => {
        this.filterData.priority = priorityTask.low;
        this.stateFilter.priority.low = true;
        this.stateFilter.priority.medium = false;
        this.stateFilter.priority.high = false;
        this.saveSettingLocalStorage();
        handler(0, 10, this.filterData);
      };
      getElement('#medium').onchange = () => {
        this.filterData.priority = priorityTask.medium;
        this.stateFilter.priority.low = false;
        this.stateFilter.priority.medium = true;
        this.stateFilter.priority.high = false;
        this.saveSettingLocalStorage();
        handler(0, 10, this.filterData);
      };
      getElement('#high').onchange = () => {
        this.filterData.priority = priorityTask.high;
        this.stateFilter.priority.low = false;
        this.stateFilter.priority.medium = false;
        this.stateFilter.priority.high = true;
        this.saveSettingLocalStorage();
        handler(0, 10, this.filterData);
      };
      getElement('#public').onchange = () => {
        this.filterData.isPrivate = false;
        this.stateFilter.isPrivate.privacy = false;
        this.stateFilter.isPrivate.public = true;
        this.saveSettingLocalStorage();
        handler(0, 10, this.filterData);
      };
      getElement('#privacy').onchange = () => {
        this.filterData.isPrivate = true;
        this.stateFilter.isPrivate.privacy = true;
        this.stateFilter.isPrivate.public = false;
        this.saveSettingLocalStorage();
        handler(0, 10, this.filterData);
      };
    });
  }

  bindResetForm(handler) {
    const resetBtn = getElement('.reset_btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        document.forms.filterForm.reset();
        this.removeSettingLocalStorage();
        this.stateFilter = settingFilterStart;
        handler();
      });
    }
  }

  display() {
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['container__filter']);
    newsectionTasks.id = 'container__filter';
    const myForm = createElem('form', ['form__filter']);
    myForm.name = 'filterForm';
    const filterTitle = createText('h5', 'Filter by', ['filter__title']);

    const containerSearch = createDiv(['container__search']);
    const containerSearchBy = createDiv(['container__search_by']);
    const containerSearchByText = createDiv(['container__search_by_text']);
    const searchByName = createBtn('name', ['search__by-name']);
    const spanSlesh = createText('span', ' / ');
    const searchByTitle = createBtn('title', ['search__by-title']);
    containerSearchByText.append(searchByName, spanSlesh, searchByTitle);
    const containerSearchByradios = createDiv(['container__search_by_radios']);
    const radioSearchByAssignee = createInputRadio('radio', 'search', 'assignee');
    const radioSearchByDeckr = createInputRadio('radio', 'search', 'description');
    containerSearchByradios.append(radioSearchByAssignee, radioSearchByDeckr);
    containerSearchBy.append(containerSearchByText, containerSearchByradios);
    const inputSearch = createInput('search', ['search__input'], 'enter data');
    containerSearch.append(containerSearchBy, inputSearch);

    const containerPriority = createDiv(['container__priority']);
    const prioritTitle = createText('p', 'priority', ['priority__title']);
    const containerImgAndRadios = createDiv(['container__img_and_radio']);
    const priorityItemsImg = createDiv(['priority__items_img']);
    const imgLowPriority = createImg(srcImgCollection.priority.low, 'icon', ['priority_img']);
    const imgMediumPriority = createImg(srcImgCollection.priority.medium, 'icon', ['priority_img']);
    const imgHightPriority = createImg(srcImgCollection.priority.high, 'icon', ['priority_img']);
    priorityItemsImg.append(imgLowPriority, imgMediumPriority, imgHightPriority);
    const containeRadiosPriority = createDiv(['container__priority_radios']);
    const radioLow = createInputRadio('radio', 'priority', 'low', 'low', this.stateFilter.priority.low);
    const radioMedium = createInputRadio('radio', 'priority', 'medium', 'medium', this.stateFilter.priority.medium);
    const radioHigh = createInputRadio('radio', 'priority', 'high', 'high', this.stateFilter.priority.high);
    containeRadiosPriority.append(radioLow, radioMedium, radioHigh);
    containerImgAndRadios.append(priorityItemsImg, containeRadiosPriority);
    containerPriority.append(prioritTitle, containerImgAndRadios);

    const containerPrivacy = createDiv(['container__privacy']);
    const privacyTitle = createText('p', 'privacy', ['priority__title']);
    const containerImgAndRadio = createDiv(['container__privacy_img_radios']);
    const containerPrivacyImg = createDiv(['container__privacy_img']);
    const privacyBtn = createBtn('', ['privacy__btn'], 'button', 'privacy');
    const imgPersonPrivacy = createImg(srcImgCollection.privacyPerson, 'icon');
    privacyBtn.append(imgPersonPrivacy);
    const publicBtn = createBtn('', ['privacy__btn'], 'button', 'public');
    const imgPublicPrivacy = createImg(srcImgCollection.privacyMultiple, 'icon');
    publicBtn.append(imgPublicPrivacy);
    containerPrivacyImg.append(privacyBtn, publicBtn);
    const containerPrivacyRadios = createDiv(['container__privacy_radios']);
    const radioPublic = createInputRadio('radio', 'private', 'public', 'public', this.stateFilter.isPrivate.public);
    const radioPrivate = createInputRadio('radio', 'private', 'privacy', 'privacy', this.stateFilter.isPrivate.privacy);
    containerPrivacyRadios.append(radioPublic, radioPrivate);
    containerImgAndRadio.append(containerPrivacyImg, containerPrivacyRadios);
    containerPrivacy.append(privacyTitle, containerImgAndRadio);
    const containerDate = createDiv(['container__privacy']);
    const dateTitle = createText('p', 'date', ['priority__title']);

    const blockDate = createDiv(['container__date']);
    const labelFrom = createText('label', 'from  ', ['date__label']);
    const inputDateFrom = createInput('date', ['input__date']);
    labelFrom.append(inputDateFrom);

    const labelTo = createText('label', 'to  ', ['date__label']);
    const inputDateTo = createInput('date', ['input__date']);
    labelTo.append(inputDateTo);
    blockDate.append(labelFrom, labelTo);
    containerDate.append(dateTitle, blockDate);
    const resetBtn = createBtn('Reset', ['dark_btn', 'btn', 'reset_btn'], 'button', 'reset all filter');

    myForm.append(
      filterTitle,
      containerSearch,
      containerPriority,
      containerPrivacy,
      containerDate,
      resetBtn,
    );
    newsectionTasks.append(myForm);
    parentElem.replaceWith(newsectionTasks);
  }
}
export default FilterView;
