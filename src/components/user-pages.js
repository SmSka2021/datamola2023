/* eslint-disable class-methods-use-this */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

import {
  createElem,
  createDiv,
  createBtn,
  createText,
  createInput,
  createImg,
} from '../ultilites/create-element';
import { getElement, getElements } from '../ultilites/get-element';
import {
  validNameUser,
  validPassword,
  validRepeatPassword,
} from '../ultilites/validation';
import convertorImg64 from '../ultilites/convertation-img-base64';

class UserPagesView {
  constructor(id) {
    this.id = id;
    this.isViewMode = JSON.parse(localStorage.getItem('isViewProfile')) || 'true';
  }

  validationInput(e) {
    e.stopPropagation();
    const oldDataPassword = JSON.parse(localStorage.getItem('dataUser')).password;
    const oldDataServer = JSON.parse(localStorage.getItem('dataUserServer'));
    const oldUserName = oldDataServer.userName;
    const elem = e.target;
    const valueUnput = elem.value;
    const nameUser = getElement('#nameProfileUser');
    const errorPassword = getElement('.error__pasword_profile');
    const errorRepeat = getElement('.error__pasword2_profile');
    const errorUserName = getElement('.error__name_profile');
    const errorRepeatName = getElement('.error__repeat_name');
    const errRepeatPassword = getElement('.error__repeat_password');
    const errEmptyPassword = getElement('.error__empty_password');
    const errEmptyPassword2 = getElement('.error__empty_password2');
    const errEmptyName = getElement('.error__empty_name');
    const inputPassword = getElement('#passwordProfileUser');
    const inputPassword2 = getElement('#password2ProdileUser');
    const btnSubmit = getElement('.form_profile_btn_save');
    const btnReset = getElement('.form_profile_btn_reset');
    switch (elem.id) {
      case 'nameProfileUser':
        if (!validNameUser(valueUnput) && valueUnput.length) {
          UserPagesView.showError(errorUserName, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errorUserName);
        }
        if (oldUserName === valueUnput) {
          UserPagesView.showError(errorRepeatName, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errorRepeatName);
        }
        if (valueUnput === '') {
          UserPagesView.showError(errEmptyName, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errEmptyName);
        }
        if (validNameUser(valueUnput) && valueUnput.length && (oldUserName !== valueUnput)) {
          elem.classList.remove('border_red');
        }
        break;
      case 'passwordProfileUser':
        if (!validPassword(valueUnput) && valueUnput.length) {
          UserPagesView.showError(errorPassword, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errorPassword);
        }
        if (oldDataPassword === valueUnput) {
          UserPagesView.showError(errRepeatPassword, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errRepeatPassword);
        }
        if (!validRepeatPassword(valueUnput, inputPassword2.value) && valueUnput.length) {
          UserPagesView.showError(errorRepeat, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errorRepeat);
        }
        if (valueUnput === '') {
          UserPagesView.showError(errEmptyPassword, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errEmptyPassword);
        }
        if (validPassword(valueUnput)
         && valueUnput.length
         && (oldDataPassword !== valueUnput)) {
          elem.classList.remove('border_red');
        }
        if (validRepeatPassword(valueUnput, inputPassword2.value)) {
          getElement('#password2ProdileUser').classList.remove('border_red');
        } else {
          getElement('#password2ProdileUser').classList.add('border_red');
        }
        break;
      case 'password2ProdileUser':
        if (!validRepeatPassword(valueUnput, inputPassword.value) && valueUnput.length) {
          UserPagesView.showError(errorRepeat, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errorRepeat);
        }
        if (valueUnput === '') {
          UserPagesView.showError(errEmptyPassword2, btnSubmit, elem);
        } else {
          UserPagesView.hideError(errEmptyPassword2);
        }
        if (valueUnput.length && validRepeatPassword(valueUnput, inputPassword.value)) {
          elem.classList.remove('border_red');
        }
        break;
      default:
        return true;
    }
    const arrErrors = [
      errorUserName, errorPassword, errorRepeat, errorRepeatName, errRepeatPassword,
      errEmptyPassword, errEmptyPassword2, errEmptyName,
    ];
    let isValid = true;
    arrErrors.forEach((er) => {
      if (!er.classList.contains('display_none')) isValid = false;
    });
    const validateOldAvatar = !UserPagesView.isNewAvatar();
    const isOldName = nameUser.value === oldDataServer.userName;
    const isOldPassword = inputPassword.value === oldDataPassword;
    const isOldPassword2 = inputPassword2.value === oldDataPassword;
    const isNewData = (this.newAvatar || !isOldName || !isOldPassword || !validateOldAvatar || !isOldPassword2) && true;
    btnSubmit.disabled = !isValid || !isNewData;
    btnReset.disabled = !isNewData;
  }

  static showError(error, btnSubmit, elem) {
    btnSubmit.disabled = true;
    elem.classList.add('border_red');
    error.classList.remove('display_none');
  }

  static hideError(errorUserName) {
    errorUserName.classList.add('display_none');
  }

  bindSetEditProfile(handler) {
    const btnEdit = getElement('.edit_profile_link');
    if (btnEdit) {
      btnEdit.addEventListener('click', (event) => {
        event.stopPropagation();
        this.isViewMode = 'false';
        handler();
      });
    }
  }

  bindSetViewProfile(handler) {
    const btnEdit = getElement('.view');
    if (btnEdit) {
      btnEdit.addEventListener('click', (event) => {
        event.stopPropagation();
        this.isViewMode = 'true';
        handler();
      });
    }
  }

  bindSetMainPage(handler) {
    const btnEdit = getElement('.main_profile_btn_link');
    if (btnEdit) {
      btnEdit.addEventListener('click', (event) => {
        event.stopPropagation();
        this.isViewMode = 'true';
        handler();
      });
    }
  }

  bindSetDataFormEditProfile(handler) {
    const myForm = document.forms.editProfile;
    if (myForm) {
      myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const oldAvatar = JSON.parse(localStorage.getItem('dataUserServer')).photo;
        const newAvatarUser = JSON.parse(localStorage.getItem('avatar'));
        const imgUser = newAvatarUser || oldAvatar;
        const editUser = {
          password: myForm.elements.profile_password_input.value,
          retypedPassword: myForm.elements.profile_password2_input.value,
          userName: myForm.elements.profile_name_input.value,
          photo: imgUser,
        };
        this.isViewMode = 'true';
        handler(editUser);
      });
    }
  }

  static isNewAvatar() {
    const checkRadioId = document.forms.editProfile.elements.avatar.value;
    if (checkRadioId) {
      const imgAvatarChecked = convertorImg64(checkRadioId);
      getElement('.profile_avatar_new').value = '';
      const oldAvatar = JSON.parse(localStorage.getItem('dataUserServer')).photo;
      if (imgAvatarChecked !== oldAvatar) {
        localStorage.setItem('avatar', JSON.stringify(imgAvatarChecked));
        getElement('.form_profile_btn_save').disabled = false;
        getElement('.form_profile_btn_reset').disabled = false;
        return true;
      }
      return false;
    }
  }

  isDisabledSave = () => {
    const oldDataPassword = JSON.parse(localStorage.getItem('dataUser')).password;
    const oldDataServer = JSON.parse(localStorage.getItem('dataUserServer'));
    const nameUser = getElement('#nameProfileUser');
    const inputPassword = getElement('#passwordProfileUser');
    const inputPassword2 = getElement('#password2ProdileUser');
    const btnSubmit = getElement('.form_profile_btn_save');
    const btnReset = getElement('.form_profile_btn_reset');
    const validateOldAvatar = !UserPagesView.isNewAvatar();
    const isOldName = nameUser.value === oldDataServer.userName;
    const isOldPassword = inputPassword.value === oldDataPassword;
    const isOldPassword2 = inputPassword2.value === oldDataPassword;
    const isNewData = (this.newAvatar || !isOldName || !isOldPassword || !validateOldAvatar || !isOldPassword2) && true;
    btnSubmit.disabled = !isNewData;
    btnReset.disabled = !isNewData;
  };

  cancelChanges() {
    this.newAvatar = '';
    const dataUser = JSON.parse(localStorage.getItem('dataUser'));
    const dataUserServer = JSON.parse(localStorage.getItem('dataUserServer'));
    getElement('#passwordProfileUser').value = dataUser.password;
    getElement('#password2ProdileUser').value = dataUser.password;
    getElement('#nameProfileUser').value = dataUserServer.userName;
    const errors = [
      '.error__name_profile',
      '.error__pasword_profile',
      '.error__pasword2_profile',
      '.error__repeat_name',
      '.error__repeat_password',
      '.error__empty_password',
      '.error__empty_password2',
      '.error__empty_name',
    ];
    errors.forEach((cl) => { getElement(cl).classList.add('display_none'); });
    const inputElem = [
      '#passwordProfileUser',
      '#password2ProdileUser',
      '#nameProfileUser',
    ];
    inputElem.forEach((cl) => { getElement(cl).classList.remove('border_red'); });
    getElements('.profile_avatar_radio').forEach((radio) => {
      radio.checked = false;
    });
    getElement('.form_profile_btn_reset').disabled = true;
    getElement('.form_profile_btn_save').disabled = true;
    getElement('.profile_avatar_new').value = '';
    localStorage.removeItem('avatar');
  }

  encodeImageFileAsURL = (e) => {
    getElements('.profile_avatar_radio').forEach((radio) => {
      radio.checked = false;
    });
    getElement('.form_profile_btn_save').disabled = false;
    const element = e.target;
    const arrExe = ['png'];
    const file = element.files[0];
    const exe = file.name.split('.').splice(-1, 1)[0];
    if (!arrExe.includes(exe)) {
      alert('Извините, но на данный момент принимаются только файлы в формате "png"');
      getElement('.profile_avatar_new').value = '';
      this.isDisabledSave();
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('avatar', JSON.stringify(reader.result.slice(22)));
    };
    reader.readAsDataURL(file);
  };

  display() {
    const isViewMode = JSON.parse(localStorage.getItem('isViewProfile')) === 'true';
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';
    const dataUser = JSON.parse(localStorage.getItem('dataUser'));
    const dataUserServer = JSON.parse(localStorage.getItem('dataUserServer'));
    const theme = JSON.parse(localStorage.getItem('theme'));
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['board']);
    newsectionTasks.id = 'container__columns';
    const mainRegistr = createDiv(['info_user_main']);
    const pageTitle = createText('h4', (isViewMode && isRu && 'Профиль пользователя')
     || (isViewMode && !isRu && 'Page User`s Profile')
     || (!isViewMode && isRu && 'Редактировать профиль')
     || (!isViewMode && !isRu && 'Edit User`s Profile'), ['form__task_title', 'dark_color']);
    const userInfor = createDiv(['user__info']);
    const containerTitle = createDiv(['container__title', 'container__title_profile']);
    const viewMode = createBtn(isRu ? 'Смотреть' : 'View Mode', ['user__info_title', 'view'], 'button', 'View Mode');
    const editProf = createBtn(isRu ? 'Править' : 'Edit Profile', ['user__info_title', 'edit_profile_link'], 'button', 'Edit Profile');
    const mainPage = createBtn(isRu ? 'Главная стр' : 'Main pages', ['user__info_title', 'main_profile_btn_link'], 'button', 'Main pages');
    containerTitle.append(viewMode, editProf, mainPage);

    const containerForm = createDiv(['container__form_profile']);
    const myForm = createElem('form', ['form__user_profile']);
    myForm.name = 'editProfile';
    const containerInfoUs = createDiv(['container__view_info']);

    const containerInputLogin0 = createDiv(['profile_group0']);
    const containerInputLogin = createDiv(['profile_group']);
    const labeUserLogin = createText('p', isRu ? 'Логин: ' : 'Login:', ['label__user_profile']);
    const userLoginInput = createInput('text', ['input__user_profile', 'login_input']);
    userLoginInput.name = 'profile_login_input';
    userLoginInput.value = `${dataUserServer.login}`;
    userLoginInput.disabled = true;
    containerInputLogin.append(labeUserLogin, userLoginInput);
    containerInputLogin0.append(containerInputLogin);

    const containerInputPassword0 = createDiv(['profile_group0']);
    const containerInputPassword = createDiv(['profile_group']);
    const labeUserPassword = createText('p', isRu ? 'Пароль: ' : 'Password:', ['label__user_profile']);
    const userPasswordInput = createInput('text', ['input__user_profile']);
    userPasswordInput.name = 'profile_password_input';
    userPasswordInput.value = `${dataUser.password}`;
    userPasswordInput.id = 'passwordProfileUser';
    userPasswordInput.setAttribute('required', 'true');
    const errorPassword = createText('p', isRu ? 'Символ, цифра, больш. и мал. латин. буква' : 'Symbols, large and small latin letters, numbers', ['eror_form_profile', 'error__pasword_profile', 'display_none']);
    const errorRepeatPassword = createText('p', isRu ? 'Пароль не изменился' : 'Old password is not new', ['eror_form_profile', 'error__repeat_password', 'display_none']);
    const errorEmptyPassword = createText('p', isRu ? 'Поле не может быть пустым' : 'Field cannot be empty', ['eror_form_profile', 'error__empty_password', 'display_none']);
    containerInputPassword.append(labeUserPassword, userPasswordInput);
    containerInputPassword0.append(containerInputPassword, errorPassword, errorRepeatPassword, errorEmptyPassword);

    const containerInputPassword20 = createDiv(['profile_group0']);
    const containerInputPassword2 = createDiv(['profile_group']);
    const labeUserPassword2 = createText('p', isRu ? 'Повторите пароль' : 'Repeat Password:', ['label__user_profile']);
    const userPasswordInput2 = createInput('text', ['input__user_profile']);
    userPasswordInput2.name = 'profile_password2_input';
    userPasswordInput2.value = `${dataUser.password}`;
    userPasswordInput2.id = 'password2ProdileUser';
    userPasswordInput2.setAttribute('required', true);
    const errorPassword2 = createText('p', isRu ? 'Пароли не совпадают' : 'Password mismatch', ['eror_form_profile', 'error__pasword2_profile', 'display_none']);
    const errorEmptyPassword2 = createText('p', isRu ? 'Поле не может быть пустым' : 'Field cannot be empty', ['eror_form_profile', 'error__empty_password2', 'display_none']);
    containerInputPassword2.append(labeUserPassword2, userPasswordInput2);
    containerInputPassword20.append(containerInputPassword2, errorPassword2, errorEmptyPassword2);

    const containerInputName0 = createDiv(['profile_group0']);
    const containerInputName = createDiv(['profile_group']);
    const labeUserName = createText('p', isRu ? 'Имя пользователя: ' : 'Name User: ', ['label__user_profile']);
    const userNameInput = createInput('text', ['input__user_profile']);
    userNameInput.name = 'profile_name_input';
    userNameInput.value = `${dataUserServer.userName}`;
    userNameInput.id = 'nameProfileUser';
    userNameInput.setAttribute('required', true);
    const errorRepeat = createText('p', isRu ? 'Имя не изменилось' : 'Old name is not new', ['eror_form_profile', 'error__repeat_name', 'display_none']);
    const errorNameUser = createText('p', isRu ? 'Только латинские буквы или кириллица' : 'Only in Latin or Cyrillic letter', ['eror_form_profile', 'error__name_profile', 'display_none']);
    const errorEmptyName = createText('p', isRu ? 'Поле не может быть пустым' : 'Field cannot be empty', ['eror_form_profile', 'error__empty_name', 'display_none']);
    containerInputName.append(labeUserName, userNameInput);
    containerInputName0.append(containerInputName, errorNameUser, errorRepeat, errorEmptyName);

    const containerInputAvatar0 = createDiv(['profile_group0']);
    const containerInputAvatar = createDiv(['profile_group']);
    const labeUserAvatar = createText('p', isRu ? 'Аватар' : 'Avatar:', ['label__user_profile']);
    const imgAvatarUser = createImg(`data:image/png;base64,${dataUserServer.photo}`, 'avatar', ['profile__img_avatar']);
    containerInputAvatar.append(labeUserAvatar, imgAvatarUser);
    containerInputAvatar0.append(containerInputAvatar);

    if (this.isViewMode === 'true') {
      userPasswordInput.disabled = true;
      userPasswordInput2.disabled = true;
      userNameInput.disabled = true;
      containerInputAvatar.classList.remove('display_none');
      viewMode.classList.toggle('view_mode');
      editProf.classList.toggle('edit_profile_btn_link');
    } else {
      userPasswordInput.disabled = false;
      userPasswordInput2.disabled = false;
      userNameInput.disabled = false;
      viewMode.classList.toggle('edit_profile_btn_link');
      editProf.classList.toggle('view_mode');

      containerInfoUs.insertAdjacentHTML('beforeend', `<div class='profile__avatar_group'>
      <hr/>
    <p class='label__user_profile profile_new_avatar'> New Avatar:</p>
    <div class='container__avatar_profile'>
      <img src='./assets/img/avatar10.png' id='Img1' alt='icon avatar' class='profile_avatar_img'/>
      <img src='./assets/img/avatar11.png' id='Img2' alt='icon avatar' class='profile_avatar_img'/>
      <img src='./assets/img/avatar12.png' id='Img3' alt='icon avatar' class='profile_avatar_img'/>
      <img src='./assets/img/avatar13.png' id='Img4' alt='icon avatar' class='profile_avatar_img'/>
      <img src='./assets/img/avatar14.png' id='Img5' alt='icon avatar' class='profile_avatar_img'/>
      <img src='./assets/img/avatar15.png' id='Img6' alt='icon avatar' class='profile_avatar_img'/>              
    </div>
    <div class='container__radio_profile'>
      <input name="avatar" type="radio" value='Img1' class='profile_avatar_radio'/>
      <input name="avatar" type="radio" value='Img2' class='profile_avatar_radio'/>
      <input name="avatar" type="radio" value='Img3' class='profile_avatar_radio'/>
      <input name="avatar" type="radio" value='Img4' class='profile_avatar_radio'/>
      <input name="avatar" type="radio" value='Img5' class='profile_avatar_radio'/> 
      <input name="avatar" type="radio" value='Img6' class='profile_avatar_radio'/>  
    </div>
    <hr/>
    <span class='label__user_profile upload_avatar'>Upload your Avatar:</span>
    <input type="file" class='profile_avatar_new' name="myAvatar"/>
</div>

<div class='form_btns'>
    <div class='form_btns_profile'>
        <button type='button' disabled class='dark_btn btn form_profile_btn_reset'>Cancel</button>      
        <button type='submit' disabled class='dark_btn btn form_profile_btn_save'>Save</button>
    </div>   
</div>`);
    }

    containerInfoUs.prepend(
      containerInputLogin0,
      containerInputPassword0,
      containerInputPassword20,
      containerInputName0,
      containerInputAvatar0,
    );
    myForm.prepend(containerInfoUs);
    containerForm.append(myForm);

    userInfor.append(pageTitle, containerTitle, containerForm);
    mainRegistr.append(userInfor);
    newsectionTasks.append(mainRegistr);
    parentElem.replaceWith(newsectionTasks);
    if (this.isViewMode !== 'true') {
      getElements('.input__user_profile').forEach((input) => input.addEventListener('input', this.validationInput));
      getElement('.container__radio_profile').addEventListener('change', UserPagesView.isNewAvatar);
      getElement('.form_profile_btn_reset').addEventListener('click', this.cancelChanges);
      if (isRu) {
        getElement('.form_profile_btn_reset').textContent = 'Отменить';
        getElement('.form_profile_btn_save').textContent = 'Сохранить';
        getElement('.profile_new_avatar').textContent = 'Новый аватар:';
        getElement('.upload_avatar').textContent = 'Свой аватар:  ';
      }
      getElement('.profile_avatar_new').addEventListener('change', this.encodeImageFileAsURL);
    }
    if (theme === 'dark') {
      pageTitle.classList.add('light_color');
    }
  }
}
export default UserPagesView;
