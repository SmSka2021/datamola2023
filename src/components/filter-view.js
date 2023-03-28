import {
  createElem,
  createDiv,
  createText,
  createImg,
  createBtn,
  createInput,
} from '../ultilites/create-element';
import srcImgCollection from '../ultilites/src-img-collection';

class FilterView {
  constructor(id) {
    this.id = id;
  }

  display() {
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['container__filter']);
    newsectionTasks.id = 'container__filter';

    const filterTitle = createText('h5', 'Filter by', ['filter__title']);

    const containerSearch = createDiv(['container__search']);
    const searchByName = createBtn('name', ['search__by-name']);
    const spanSlesh = createText('span', ' / ');
    const searchByTitle = createBtn('title', ['search__by-title']);
    const inputSearch = createInput('search', ['search__input'], 'enter data');
    containerSearch.append(searchByName, spanSlesh, searchByTitle, inputSearch);

    const containerPriority = createDiv(['container__priority']);
    const prioritTitle = createText('p', 'priority', ['priority__title']);

    const priorityItems = createDiv(['priority__items']);
    const btnLowPriority = createBtn('', ['priority__btn', 'priority_low'], 'button', 'low');
    const btnMediumPriority = createBtn('', ['priority__btn', 'priority_medium'], 'button', 'medium');
    const btnHightPriority = createBtn('', ['priority__btn', 'priority_height'], 'button', 'hight');
    priorityItems.append(btnLowPriority, btnMediumPriority, btnHightPriority);
    containerPriority.append(prioritTitle, priorityItems);

    const containerPrivacy = createDiv(['container__privacy']);
    const privacyTitle = createText('p', 'privacy', ['priority__title']);

    const privacyBtn = createBtn('', ['privacy__btn'], 'button', 'privacy');
    const imgPersonPrivacy = createImg(srcImgCollection.privacyPerson, 'icon');
    privacyBtn.append(imgPersonPrivacy);
    const publicBtn = createBtn('', ['privacy__btn'], 'button', 'public');
    const imgPublicPrivacy = createImg(srcImgCollection.privacyMultiple, 'icon');
    publicBtn.append(imgPublicPrivacy);
    containerPrivacy.append(privacyTitle, privacyBtn, publicBtn);

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
    const resetBtn = createBtn('Reset', ['dark_btn', 'btn']);

    newsectionTasks.append(
      filterTitle,
      containerSearch,
      containerPriority,
      containerPrivacy,
      containerDate,
      resetBtn,
    );
    parentElem.replaceWith(newsectionTasks);
  }
}
export default FilterView;
