/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
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
import { convertorImg64 } from '../ultilites/convertation-img-base64';

class UserPagesView {
  constructor(id) {
    this.id = id;
    this.isViewMode = JSON.parse(localStorage.getItem('isViewProfile')) || 'true';
  }

  validationInput(e) {
    e.stopPropagation();
    const oldDataPassword = JSON.parse(localStorage.getItem('dataUser')).password;
    const oldDataServer = JSON.parse(localStorage.getItem('dataUserServer'));
    // const oldAvatar = localStorage.getItem('avatar');
    const oldUserName = oldDataServer.userName;
    const elem = e.target;
    const valueUnput = elem.value;
    const errorPassword = getElement('.error__pasword_profile');
    const errorRepeat = getElement('.error__pasword2_profile');
    const errorUserName = getElement('.error__name_profile');
    const errorRepeatName = getElement('.error__repeat_name');
    const errRepeatPassword = getElement('.error__repeat_password');
    const inputPasswordValue = getElement('#passwordProdileUser').value;
    const inputPasswordValue2 = getElement('#password2ProdileUser').value;
    switch (elem.id) {
      case 'nameProdileUser':
        if (!validNameUser(valueUnput) && valueUnput.length) {
          errorUserName.classList.remove('display_none');
        } else {
          errorUserName.classList.add('display_none');
        }
        if (oldUserName === valueUnput) {
          errorRepeatName.classList.remove('display_none');
        } else {
          errorRepeatName.classList.add('display_none');
        }
        break;
      case 'passwordProdileUser':
        if (!validPassword(valueUnput) && valueUnput.length) {
          errorPassword.classList.remove('display_none');
        } else {
          errorPassword.classList.add('display_none');
        }
        if (oldDataPassword === valueUnput) {
          errRepeatPassword.classList.remove('display_none');
        } else {
          errRepeatPassword.classList.add('display_none');
        }
        if (!validRepeatPassword(valueUnput, inputPasswordValue2) && valueUnput.length) {
          errorRepeat.classList.remove('display_none');
        } else {
          errorRepeat.classList.add('display_none');
        }
        break;
      case 'password2ProdileUser':
        if (!validRepeatPassword(valueUnput, inputPasswordValue) && valueUnput.length) {
          errorRepeat.classList.remove('display_none');
        } else {
          errorRepeat.classList.add('display_none');
        }
        break;
      default:
        return true;
    }
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

  resetForm(event) {
    event.stopPropagation();
    document.forms.editProfile.reset();
  }

  bindSetDataFormEditProfile(handler) {
    const myForm = document.forms.editProfile;
    if (myForm) {
      myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const imgUser = convertorImg64(myForm.elements.avatar.value);
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

  settingRadio() {
    const idImg = localStorage.getItem('avatar');
    getElements('.profile_avatar_radio').forEach((radio) => {
      if (radio.value === idImg) radio.checked = true;
    });
  }

  display() {
    const dataUser = JSON.parse(localStorage.getItem('dataUser'));
    const dataUserServer = JSON.parse(localStorage.getItem('dataUserServer'));
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['board']);
    newsectionTasks.id = 'container__columns';
    const mainRegistr = createDiv(['info_user_main']);
    const pageTitle = createText('h4', `${this.isViewMode ? 'Page User`s Profile' : 'Edit User`s Profile'}`, ['form__task_title', 'dark_color']);
    const userInfor = createDiv(['user__info']);
    const containerTitle = createDiv(['container__title', 'container__title_profile']);
    const viewMode = createBtn('View Mode', ['user__info_title', 'view'], 'button', 'View Mode');
    const editProf = createBtn('Edit Profile', ['user__info_title', 'edit_profile_link'], 'button', 'Edit Profile');
    const mainPage = createBtn('Main pages', ['user__info_title', 'main_profile_btn_link'], 'button', 'Main pages');
    containerTitle.append(viewMode, editProf, mainPage);

    const containerForm = createDiv(['container__form_profile']);
    const myForm = createElem('form', ['form__user_profile']);
    myForm.name = 'editProfile';
    const containerInfoUs = createDiv(['container__view_info']);

    const containerInputLogin0 = createDiv(['profile_group0']);
    const containerInputLogin = createDiv(['profile_group']);
    const labeUserLogin = createText('p', 'Login:', ['label__user_profile']);
    const userLoginInput = createInput('text', ['input__user_profile', 'login_input']);
    userLoginInput.name = 'profile_login_input';
    userLoginInput.value = `${dataUserServer.login}`;
    userLoginInput.id = 'loginProdileUser';
    userLoginInput.disabled = true;
    userLoginInput.setAttribute('required', true);
    userLoginInput.setAttribute('maxlength', '100');
    containerInputLogin.append(labeUserLogin, userLoginInput);
    containerInputLogin0.append(containerInputLogin);

    const containerInputPassword0 = createDiv(['profile_group0']);
    const containerInputPassword = createDiv(['profile_group']);
    const labeUserPassword = createText('p', 'Password:', ['label__user_profile']);
    const userPasswordInput = createInput('text', ['input__user_profile']);
    userPasswordInput.name = 'profile_password_input';
    userPasswordInput.value = `${dataUser.password}`;
    userPasswordInput.id = 'passwordProdileUser';
    userPasswordInput.setAttribute('required', true);
    const errorPassword = createText('p', 'Symbols, large and small latin letters, numbers', ['eror_form_profile', 'error__pasword_profile', 'display_none']);
    const errorRepeatPassword = createText('p', 'Old password is not new', ['eror_form_profile', 'error__repeat_password', 'display_none']);
    containerInputPassword.append(labeUserPassword, userPasswordInput);
    containerInputPassword0.append(containerInputPassword, errorPassword, errorRepeatPassword);

    const containerInputPassword20 = createDiv(['profile_group0']);
    const containerInputPassword2 = createDiv(['profile_group']);
    const labeUserPassword2 = createText('p', 'Repeat Password:', ['label__user_profile']);
    const userPasswordInput2 = createInput('text', ['input__user_profile']);
    userPasswordInput2.name = 'profile_password2_input';
    userPasswordInput2.value = `${dataUser.password}`;
    userPasswordInput2.id = 'password2ProdileUser';
    userPasswordInput2.setAttribute('required', true);
    const errorPassword2 = createText('p', 'Password mismatch', ['eror_form_profile', 'error__pasword2_profile', 'display_none']);
    containerInputPassword2.append(labeUserPassword2, userPasswordInput2);
    containerInputPassword20.append(containerInputPassword2, errorPassword2);

    const containerInputName0 = createDiv(['profile_group0']);
    const containerInputName = createDiv(['profile_group']);
    const labeUserName = createText('p', 'Name User:', ['label__user_profile']);
    const userNameInput = createInput('text', ['input__user_profile']);
    userNameInput.name = 'profile_name_input';
    userNameInput.value = `${dataUserServer.userName}`;
    userNameInput.id = 'nameProdileUser';
    userNameInput.setAttribute('required', true);
    const errorRepeat = createText('p', 'Old name is not new', ['eror_form_profile', 'error__repeat_name', 'display_none']);
    const errorNameUser = createText('p', 'Only in Latin or Cyrillic letter', ['eror_form_profile', 'error__name_profile', 'display_none']);
    containerInputName.append(labeUserName, userNameInput);
    containerInputName0.append(containerInputName, errorNameUser, errorRepeat);

    const containerInputAvatar0 = createDiv(['profile_group0']);
    const containerInputAvatar = createDiv(['profile_group']);
    const labeUserAvatar = createText('p', 'Avatar:', ['label__user_profile']);
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
      containerInputAvatar.classList.add('display_none');
      viewMode.classList.toggle('edit_profile_btn_link');
      editProf.classList.toggle('view_mode');

      containerInfoUs.insertAdjacentHTML('beforeend', `<div class='profile__avatar_group'>
    <p class='label__user_profile'>Avatar</p>
    <div class='container__avatar'>
      <img src='../assets/img/avatar1.png' id='Img1' alt='icon avatar'/>
      <img src='../assets/img/avatar2.png' id='Img2' alt='icon avatar'/>
      <img src='../assets/img/avatar3.png' id='Img3' alt='icon avatar'/>
      <img src='../assets/img/avatar4.png' id='Img4' alt='icon avatar'/>
      <img src='../assets/img/avatar5.png' id='Img5' alt='icon avatar' />         
    </div>
    <div class='container__radio'>
      <input name="avatar" type="radio" value='Img1' checked class='profile_avatar_radio'/>
      <input name="avatar" type="radio" value='Img2' class='profile_avatar_radio'/>
      <input name="avatar" type="radio" value='Img3' class='profile_avatar_radio'/>
      <input name="avatar" type="radio" value='Img4' class='profile_avatar_radio'/>
      <input name="avatar" type="radio" value='Img5' class='profile_avatar_radio'/> 
    </div>
</div>
<div class='form_btns'>
    <div class='form_btns_profile'>      
        <button type='submit' class='dark_btn btn form_profile_btn_save'>Save</button>
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
      this.settingRadio();
      getElements('.input__user_profile').forEach((input) => input.addEventListener('input', this.validationInput));
    }
  }
}
export default UserPagesView;
