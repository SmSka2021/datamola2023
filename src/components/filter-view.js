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
import { settingFilterStart, filterDataStart } from '../ultilites/setting-filter';

class FilterView {
  constructor(id) {
    this.id = id;
  }

  stateFilter = localStorage.getItem('settingFilter') ? { ...JSON.parse(localStorage.getItem('settingFilter')) } : { ...settingFilterStart };

  filterData = localStorage.getItem('dataFilter') ? { ...JSON.parse(localStorage.getItem('dataFilter')) } : { ...filterDataStart };

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
      getElement('.reset_btn').disabled = false;

      getElement('#inputDateFrom').onchange = (e) => {
        const dateFrom = e.target.value;
        this.filterData.dateFrom = new Date(dateFrom);
        this.stateFilter.dateFrom = dateFrom;
        this.saveSettingLocalStorage();
        handler(0, 10, this.filterData);
      };
      getElement('#inputDateTo').onchange = (e) => {
        const dateTo = e.target.value;
        this.filterData.dateTo = new Date(dateTo);
        this.stateFilter.dateTo = dateTo;
        this.saveSettingLocalStorage();
        handler(0, 10, this.filterData);
      };
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
      getElement('#assignee').onchange = () => {
        const valueInput = getElement('.search__input').value;
        this.stateFilter.assignee = true;
        this.stateFilter.description = false;
        this.stateFilter.title = false;
        this.saveSettingLocalStorage();
        if (valueInput) {
          this.filterData.assignee = valueInput;
          this.filterData.description = null;
          this.filterData.name = null;
          this.saveSettingLocalStorage();
          handler(0, 10, this.filterData);
        }
      };
      getElement('#description').onchange = () => {
        const valueInput = getElement('.search__input').value;
        this.stateFilter.assignee = false;
        this.stateFilter.description = true;
        this.stateFilter.title = false;
        this.saveSettingLocalStorage();
        if (valueInput) {
          this.filterData.assignee = null;
          this.filterData.description = valueInput;
          this.filterData.name = null;
          this.saveSettingLocalStorage();
          handler(0, 10, this.filterData);
        }
      };
      getElement('#title').onchange = () => {
        const valueInput = getElement('.search__input').value;
        this.stateFilter.assignee = false;
        this.stateFilter.description = false;
        this.stateFilter.title = true;
        this.saveSettingLocalStorage();
        if (valueInput) {
          this.filterData.assignee = null;
          this.filterData.description = null;
          this.filterData.name = valueInput;
          this.saveSettingLocalStorage();
          handler(0, 10, this.filterData);
        }
      };
      const searchInput = getElement('.search__input');
      if (searchInput) {
        searchInput.addEventListener('input', () => {
          const valueInput = searchInput.value;
          if (this.stateFilter.assignee) {
            this.filterData.assignee = valueInput;
            this.filterData.description = null;
            this.filterData.name = null;
          }
          if (this.stateFilter.description) {
            this.filterData.description = valueInput;
            this.filterData.name = null;
            this.filterData.assignee = null;
          }
          if (this.stateFilter.title) {
            this.filterData.name = valueInput;
            this.filterData.description = null;
            this.filterData.assignee = null;
          }
          this.saveSettingLocalStorage();
          if ((this.stateFilter.assignee || this.stateFilter.description || this.stateFilter.title)
           && valueInput) {
            this.saveSettingLocalStorage();
            handler(0, 10, this.filterData);
          }
        });
      }
    });
  }

  bindResetForm(handler) {
    const resetBtn = getElement('.reset_btn');
    document.forms.filterForm.reset();
    // resetBtn.disabled = JSON.stringify(this.stateFilter) === JSON.stringify(settingFilterStart);
    if (resetBtn) {
      resetBtn.addEventListener('click', (event) => {
        document.forms.filterForm.reset();
        event.stopPropagation();
        this.stateFilter = { ...settingFilterStart };
        this.filterData = { ...filterDataStart };
        this.removeSettingLocalStorage();
        handler();
      });
    }
  }

  settingChecked() {
    if (this.stateFilter.title) getElement('#title').checked = true;
    if (this.stateFilter.description) getElement('#description').checked = true;
    if (this.stateFilter.assignee) getElement('#assignee').checked = true;
    if (this.stateFilter.priority.low) getElement('#low').checked = true;
    if (this.stateFilter.priority.medium) getElement('#medium').checked = true;
    if (this.stateFilter.priority.high) getElement('#high').checked = true;
    if (this.stateFilter.isPrivate.public) getElement('#public').checked = true;
    if (this.stateFilter.isPrivate.privacy) getElement('#privacy').checked = true;
    if (this.stateFilter.dateFrom) getElement('#inputDateFrom').setAttribute('value', this.stateFilter.dateFrom);
    if (this.stateFilter.dateTo) getElement('#inputDateTo').setAttribute('value', this.stateFilter.dateTo);
    if (this.stateFilter.title || this.stateFilter.assignee || this.stateFilter.description) {
      const value = this.filterData.assignee
      || this.filterData.description || this.filterData.name;
      getElement('.search__input').setAttribute('value', value);
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
    const containerSearchRadoisText = createDiv(['container__search__text_radio']);

    const containerSearchByAssignee = createDiv(['container__search_group']);
    const searchByAssignee = createText('p', 'assignee', ['search__by-name']);
    const radioSearchByAssignee = createInputRadio('radio', 'search', 'assignee', 'assignee');
    containerSearchByAssignee.append(radioSearchByAssignee, searchByAssignee);

    const containerSearchByNameTask = createDiv(['container__search_group']);
    const searchByTitle = createText('p', 'title', ['search__by-title']);
    const radioSearchByTille = createInputRadio('radio', 'search', 'title', 'title');
    containerSearchByNameTask.append(radioSearchByTille, searchByTitle);

    const containerSearchByDescr = createDiv(['container__search_group']);
    const searchByDesc = createText('p', 'description', ['search__by-title']);
    const radioSearchByDeckr = createInputRadio('radio', 'search', 'description', 'description', this.stateFilter.description);
    containerSearchByDescr.append(radioSearchByDeckr, searchByDesc);

    containerSearchRadoisText.append(
      containerSearchByAssignee,
      containerSearchByNameTask,
      containerSearchByDescr,
    );

    const inputSearch = createInput('search', ['search__input'], 'enter data');
    containerSearch.append(inputSearch, containerSearchRadoisText);

    const containerPriority = createDiv(['container__priority']);
    const prioritTitle = createText('p', 'priority', ['priority__title']);
    const containerImgAndRadios = createDiv(['container__img_and_radio']);
    const priorityItemsImg = createDiv(['priority__items_img']);
    const imgLowPriority = createImg(srcImgCollection.priority.low, 'icon', ['priority_img']);
    const imgMediumPriority = createImg(srcImgCollection.priority.medium, 'icon', ['priority_img']);
    const imgHightPriority = createImg(srcImgCollection.priority.high, 'icon', ['priority_img']);
    priorityItemsImg.append(imgLowPriority, imgMediumPriority, imgHightPriority);
    const containeRadiosPriority = createDiv(['container__priority_radios']);
    const radioLow = createInputRadio('radio', 'priority', 'low', 'low');
    const radioMedium = createInputRadio('radio', 'priority', 'medium', 'medium');
    const radioHigh = createInputRadio('radio', 'priority', 'high', 'high');
    containeRadiosPriority.append(radioLow, radioMedium, radioHigh);
    containerImgAndRadios.append(priorityItemsImg, containeRadiosPriority);
    containerPriority.append(prioritTitle, containerImgAndRadios);

    const containerPrivacy = createDiv(['container__privacy']);
    const privacyTitle = createText('p', 'privacy', ['priority__title']);

    const containerImgAndRadio = createDiv(['container__privacy_img_radios']);

    const containerPrivacyImg = createDiv(['container__privacy_img']);
    const imgPersonPrivacy = createImg(srcImgCollection.privacyPerson, 'icon', ['img_privacy']);
    const imgPublicPrivacy = createImg(srcImgCollection.privacyMultiple, 'icon', ['img_privacy']);
    containerPrivacyImg.append(imgPublicPrivacy, imgPersonPrivacy);

    const containerPrivacyRadios = createDiv(['container__privacy_radios']);
    const radioPublic = createInputRadio('radio', 'private', 'public', 'public');
    const radioPrivate = createInputRadio('radio', 'private', 'privacy', 'privacy');
    containerPrivacyRadios.append(radioPublic, radioPrivate);

    containerImgAndRadio.append(containerPrivacyImg, containerPrivacyRadios);
    containerPrivacy.append(privacyTitle, containerImgAndRadio);
    const containerDate = createDiv(['container__privacy']);
    const dateTitle = createText('p', 'date', ['priority__title']);

    const blockDate = createDiv(['container__date']);
    const labelFrom = createText('label', 'from  ', ['date__label']);
    const inputDateFrom = createInput('date', ['input__date']);
    inputDateFrom.id = 'inputDateFrom';
    labelFrom.append(inputDateFrom);

    const labelTo = createText('label', 'to  ', ['date__label']);
    const inputDateTo = createInput('date', ['input__date']);
    inputDateTo.id = 'inputDateTo';
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
    this.settingChecked();
  }
}
export default FilterView;
