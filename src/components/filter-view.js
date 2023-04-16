/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createText,
  createImg,
  createBtn,
  createInput,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';
import { getElement } from '../ultilites/get-element';
import { settingFilterStart } from '../ultilites/setting-filter';
import checkStateFilter from '../ultilites/is-equal-obj';

class FilterView {
  constructor(id) {
    this.id = id;
  }

  stateFilter = localStorage.getItem('settingFilter') ? { ...JSON.parse(localStorage.getItem('settingFilter')) } : { ...settingFilterStart };

  saveSettingLocalStorage() {
    localStorage.setItem('settingFilter', JSON.stringify(this.stateFilter));
  }

  removeSettingLocalStorage() {
    localStorage.removeItem('settingFilter');
  }

  bindFilter(handler) {
    const filter = getElement('.form__filter');
    filter.addEventListener('click', (event) => {
      event.stopPropagation();

      getElement('#inputDateFrom').onchange = (e) => {
        const dateFrom = e.target.value;
        this.stateFilter.dateFrom = new Date(dateFrom);
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#inputDateTo').onchange = (e) => {
        const dateTo = e.target.value;
        this.stateFilter.dateTo = new Date(dateTo);
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#checkbox_low').onchange = () => {
        this.stateFilter.priority.low = !this.stateFilter.priority.low;
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#checkbox_medium').onchange = () => {
        this.stateFilter.priority.medium = !this.stateFilter.priority.medium;
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#checkbox_high').onchange = () => {
        this.stateFilter.priority.high = !this.stateFilter.priority.high;
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#public0').onchange = () => {
        this.stateFilter.isPrivate.public = !this.stateFilter.isPrivate.public;
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#privacy0').onchange = () => {
        this.stateFilter.isPrivate.privacy = !this.stateFilter.isPrivate.privacy;
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#assignee0').onchange = () => {
        this.stateFilter.assignee = !this.stateFilter.assignee;
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#description0').onchange = () => {
        this.stateFilter.description = !this.stateFilter.description;
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      getElement('#title0').onchange = () => {
        this.stateFilter.title = !this.stateFilter.title;
        this.saveSettingLocalStorage();
        this.isDisabledReset();
        handler();
      };
      const searchInput = getElement('.search__input');
      if (searchInput) {
        searchInput.addEventListener('input', () => {
          this.stateFilter.dataSearch = searchInput.value;
          this.saveSettingLocalStorage();
          this.isDisabledReset();
          handler();
        });
      }
    });
  }

  isDisabledReset = () => {
    if (checkStateFilter(this.stateFilter)) {
      getElement('.reset_btn').disabled = true;
    } else {
      getElement('.reset_btn').disabled = false;
    }
  };

  bindResetForm(handler) {
    const resetBtn = getElement('.reset_btn');
    document.forms.filterForm.reset();
    if (resetBtn) {
      resetBtn.addEventListener('click', (event) => {
        document.forms.filterForm.reset();
        event.stopPropagation();
        this.stateFilter = { ...settingFilterStart };
        this.removeSettingLocalStorage();
        handler();
      });
    }
  }

  settingChecked() {
    const stateFilter = JSON.parse(localStorage.getItem('settingFilter'));
    if (!stateFilter) {
      getElement('.reset_btn').disabled = true;
      return;
    }
    if (stateFilter.title) getElement('#title0').setAttribute('checked', 'true');
    if (stateFilter.description) getElement('#description0').setAttribute('checked', 'true');
    if (stateFilter.assignee) getElement('#assignee0').setAttribute('checked', 'true');
    if (stateFilter.priority.low) getElement('#checkbox_low').setAttribute('checked', 'true');
    if (stateFilter.priority.medium) getElement('#checkbox_medium').setAttribute('checked', 'true');
    if (stateFilter.priority.high) getElement('#checkbox_high').setAttribute('checked', 'true');
    if (stateFilter.isPrivate.public) getElement('#public0').setAttribute('checked', 'true');
    if (stateFilter.isPrivate.privacy) getElement('#privacy0').setAttribute('checked', 'true');
    if (stateFilter.dateFrom) getElement('#inputDateFrom').setAttribute('value', stateFilter.dateFrom.slice(0, 10));
    if (stateFilter.dateTo) getElement('#inputDateTo').setAttribute('value', stateFilter.dateTo.slice(0, 10));
    if (stateFilter.dataSearch) getElement('.search__input').setAttribute('value', stateFilter.dataSearch);
    const resetBtn = getElement('.reset_btn');
    resetBtn.disabled = checkStateFilter(stateFilter);
  }

  display() {
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['container__filter']);
    newsectionTasks.id = 'container__filter';
    const myForm = createElem('form', ['form__filter']);
    myForm.name = 'filterForm';
    const filterTitle = createText('h5', isRu ? 'Фильтр' : 'Filter by', ['filter__title']);

    const containerSearch = createDiv(['container__search']);
    const containerSearchRadoisText = createDiv(['container__search__text_radio']);

    const containerSearchByAssignee = createDiv(['container__search_group']);
    const searchByAssignee = createText('p', isRu ? 'исполнитеть' : 'assignee', ['search__by-name']);
    const inputSearchByAssignee = createInput('checkbox', ['checkbox_search']);
    inputSearchByAssignee.id = 'assignee0';
    inputSearchByAssignee.name = 'assignee';
    inputSearchByAssignee.value = 'assignee';
    containerSearchByAssignee.append(inputSearchByAssignee, searchByAssignee);

    const containerSearchByNameTask = createDiv(['container__search_group']);
    const searchByTitle = createText('p', isRu ? 'задача' : 'title', ['search__by-title']);
    const inputSearchByTitle = createInput('checkbox', ['checkbox_search']);
    inputSearchByTitle.id = 'title0';
    inputSearchByTitle.name = 'title';
    inputSearchByTitle.value = 'title';
    containerSearchByNameTask.append(inputSearchByTitle, searchByTitle);

    const containerSearchByDescr = createDiv(['container__search_group']);
    const searchByDesc = createText('p', isRu ? 'описание' : 'description', ['search__by-title']);
    const inputSearchByDec = createInput('checkbox', ['checkbox_search']);
    inputSearchByDec.id = 'description0';
    inputSearchByDec.name = 'description';
    inputSearchByDec.value = 'description';
    containerSearchByDescr.append(inputSearchByDec, searchByDesc);

    containerSearchRadoisText.append(
      containerSearchByAssignee,
      containerSearchByNameTask,
      containerSearchByDescr,
    );

    const inputSearch = createInput('search', ['search__input'], 'enter data');
    containerSearch.append(inputSearch, containerSearchRadoisText);

    const containerPriority = createDiv(['container__priority']);
    const prioritTitle = createText('p', isRu ? 'Приоритет' : 'priority', ['priority__title']);
    const containerImgAndRadios = createDiv(['container__img_and_radio']);
    const priorityItemsImg = createDiv(['priority__items_img']);
    const imgLowPriority = createImg(srcImgCollection.priority.low, 'icon', ['priority_img']);
    const imgMediumPriority = createImg(srcImgCollection.priority.medium, 'icon', ['priority_img']);
    const imgHightPriority = createImg(srcImgCollection.priority.high, 'icon', ['priority_img']);
    priorityItemsImg.append(imgLowPriority, imgMediumPriority, imgHightPriority);

    const containeRadiosPriority = createDiv(['container__priority_radios']);
    const inputLow = createInput('checkbox', ['checkbox_priority']);
    inputLow.id = 'checkbox_low';
    inputLow.name = 'priority';
    inputLow.value = 'low';

    const inputMedium = createInput('checkbox', ['checkbox_priority']);
    inputMedium.id = 'checkbox_medium';
    inputMedium.name = 'priority';
    inputMedium.value = 'medium';

    const inputHigh = createInput('checkbox', ['checkbox_priority']);
    inputHigh.id = 'checkbox_high';
    inputHigh.name = 'priority';
    inputHigh.value = 'high';

    containeRadiosPriority.append(inputLow, inputMedium, inputHigh);
    containerImgAndRadios.append(priorityItemsImg, containeRadiosPriority);
    containerPriority.append(prioritTitle, containerImgAndRadios);

    const containerPrivacy = createDiv(['container__privacy']);
    const privacyTitle = createText('p', isRu ? 'Приватность' : 'privacy', ['priority__title']);

    const containerImgAndRadio = createDiv(['container__privacy_img_radios']);

    const containerPrivacyImg = createDiv(['container__privacy_img']);
    const imgPersonPrivacy = createImg(srcImgCollection.privacyPerson, 'icon', ['img_privacy']);
    const imgPublicPrivacy = createImg(srcImgCollection.privacyMultiple, 'icon', ['img_privacy']);
    containerPrivacyImg.append(imgPublicPrivacy, imgPersonPrivacy);

    const containerPrivacyRadios = createDiv(['container__privacy_radios']);

    const inputPublic = createInput('checkbox', ['checkbox_private']);
    inputPublic.id = 'public0';
    inputPublic.name = 'public';
    inputPublic.value = 'public';

    const inputPrivacy = createInput('checkbox', ['checkbox_private']);
    inputPrivacy.id = 'privacy0';
    inputPrivacy.name = 'privacy';
    inputPrivacy.value = 'privacy';
    containerPrivacyRadios.append(inputPublic, inputPrivacy);

    containerImgAndRadio.append(containerPrivacyImg, containerPrivacyRadios);
    containerPrivacy.append(privacyTitle, containerImgAndRadio);
    const containerDate = createDiv(['container__privacy']);
    const dateTitle = createText('p', isRu ? 'Дата' : 'date', ['priority__title']);

    const blockDate = createDiv(['container__date']);
    const labelFrom = createText('label', isRu ? 'с  ' : 'from  ', ['date__label']);
    const inputDateFrom = createInput('date', ['input__date']);
    inputDateFrom.id = 'inputDateFrom';
    labelFrom.append(inputDateFrom);

    const labelTo = createText('label', isRu ? 'по  ' : 'to  ', ['date__label']);
    const inputDateTo = createInput('date', ['input__date']);
    inputDateTo.id = 'inputDateTo';
    labelTo.append(inputDateTo);
    blockDate.append(labelFrom, labelTo);
    containerDate.append(dateTitle, blockDate);
    const resetBtn = createBtn(isRu ? 'Сбросить  ' : 'Reset', ['dark_btn', 'btn', 'reset_btn'], 'button', isRu ? 'Сбросить все фильтры' : 'Reset all filters');

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
    document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      Object.defineProperty(cb, 'checked', {
        set: (a) => {
          a !== cb.checked && cb.click();
        },
      });
    });
    this.settingChecked();
  }
}
export default FilterView;
