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
  validLogin,
  validPassword,
  validRepeatPassword,
} from '../ultilites/validation';

class UserPagesView {
  constructor(id) {
    this.id = id;
    this.isViewMode = JSON.parse(localStorage.getItem('isViewProfile')) || 'true';
  }

  validationInput(e) {
    e.stopPropagation();
    const elem = e.target;
    const valueUnput = elem.value;
    const errorLogin = getElement('.error__login_profile');
    const errorPassword = getElement('.error__pasword_profile');
    const errorRepeat = getElement('.error__pasword2_profile');
    const errorUserName = getElement('.error__name_profile');
    const inputPasswordValue = getElement('#passwordProdileUser').value;
    switch (elem.id) {
      case 'nameProdileUser':
        if (!validNameUser(valueUnput)
   && valueUnput.length) errorUserName.classList.remove('display_none');
        else errorUserName.classList.add('display_none');
        break;
      case 'loginProdileUser':
        if (!validLogin(valueUnput)
   && valueUnput.length) errorLogin.classList.remove('display_none');
        else errorLogin.classList.add('display_none');
        break;
      case 'passwordProdileUser':
        if (!validPassword(valueUnput)
   && valueUnput.length) errorPassword.classList.remove('display_none');
        else errorPassword.classList.add('display_none');
        break;
      case 'password2ProdileUser':
        if (!validRepeatPassword(valueUnput, inputPasswordValue)
   && valueUnput.length) errorRepeat.classList.remove('display_none');
        else errorRepeat.classList.add('display_none');
        break;
      default:
        return true;
    }
  }

  // openEye = (e) => {
  //   e.stopPropagation();
  //   const elem = e.target.parentElement;
  //   const btnOpen1 = getElement('.eye_open1');
  //   const btnOpen2 = getElement('.eye_open2');
  //   const btnClose1 = getElement('.eye_close1');
  //   const btnClose2 = getElement('.eye_close2');
  //   const inputPassword1 = getElement('#password1');
  //   const inputPassword2 = getElement('#password2');
  //   if (elem) {
  //     if (elem.classList.contains('eye_close1')) {
  //       this.hiddenElem([btnOpen1, btnClose1]);
  //       inputPassword1.type = 'text';
  //     }
  //     if (elem.classList.contains('eye_close2')) {
  //       this.hiddenElem([btnOpen2, btnClose2]);
  //       inputPassword2.type = 'text';
  //     }
  //     if (elem.classList.contains('eye_open1')) {
  //       this.hiddenElem([btnOpen1, btnClose1]);
  //       inputPassword1.type = 'password';
  //     }
  //     if (elem.classList.contains('eye_open2')) {
  //       this.hiddenElem([btnOpen2, btnClose2]);
  //       inputPassword2.type = 'password';
  //     }
  //   }
  // };

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
        const editUser = {
          login: myForm.elements.profile_login_input.value,
          password: myForm.elements.profile_password_input.value,
          repeatPassword: myForm.elements.profile_password2_input.value,
          firstName: myForm.elements.profile_name_input.value,
          avatar: myForm.elements.avatar.value,
        };
        this.isViewMode = 'true';
        handler(editUser);
      });
    }
  }

  settingRadio() {
    const src = JSON.parse(localStorage.getItem('dataUser')).avatar;
    getElements('.profile_avatar_radio').forEach((radio) => {
      if (radio.value === src) radio.checked = true;
    });
  }

  display() {
    const dataUser = JSON.parse(localStorage.getItem('dataUser'));
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
    userLoginInput.value = `${dataUser.login}`;
    userLoginInput.id = 'loginProdileUser';
    userLoginInput.setAttribute('required', true);
    userLoginInput.setAttribute('maxlength', '100');
    const errorLogin = createText('p', 'Only latin letter', ['eror_form_profile', 'error__login_profile', 'display_none']);
    containerInputLogin.append(labeUserLogin, userLoginInput);
    containerInputLogin0.append(containerInputLogin, errorLogin);

    const containerInputPassword0 = createDiv(['profile_group0']);
    const containerInputPassword = createDiv(['profile_group']);
    const labeUserPassword = createText('p', 'Password:', ['label__user_profile']);
    const userPasswordInput = createInput('text', ['input__user_profile']);
    userPasswordInput.name = 'profile_password_input';
    userPasswordInput.value = `${dataUser.password}`;
    userPasswordInput.id = 'passwordProdileUser';
    userPasswordInput.setAttribute('required', true);
    const errorPassword = createText('p', 'Symbols, large and small latin letters, numbers', ['eror_form_profile', 'error__pasword_profile', 'display_none']);
    containerInputPassword.append(labeUserPassword, userPasswordInput);
    containerInputPassword0.append(containerInputPassword, errorPassword);

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
    userNameInput.value = `${dataUser.firstName}`;
    userNameInput.id = 'nameProdileUser';
    userNameInput.setAttribute('required', true);
    const errorNameUser = createText('p', 'Only in Latin or Cyrillic letter', ['eror_form_profile', 'error__name_profile', 'display_none']);
    containerInputName.append(labeUserName, userNameInput);
    containerInputName0.append(containerInputName, errorNameUser);

    const containerInputAvatar0 = createDiv(['profile_group0']);
    const containerInputAvatar = createDiv(['profile_group']);
    const labeUserAvatar = createText('p', 'Avatar:', ['label__user_profile']);
    const imgAvatarUser = createImg(dataUser.avatar, 'avatar', ['profile__img_avatar']);
    containerInputAvatar.append(labeUserAvatar, imgAvatarUser);
    containerInputAvatar0.append(containerInputAvatar);

    if (this.isViewMode === 'true') {
      userLoginInput.disabled = true;
      userPasswordInput.disabled = true;
      userPasswordInput2.disabled = true;
      userNameInput.disabled = true;
      containerInputAvatar.classList.remove('display_none');
      viewMode.classList.toggle('view_mode');
      editProf.classList.toggle('edit_profile_btn_link');
    } else {
      userLoginInput.disabled = false;
      userPasswordInput.disabled = false;
      userPasswordInput2.disabled = false;
      userNameInput.disabled = false;
      containerInputAvatar.classList.add('display_none');
      viewMode.classList.toggle('edit_profile_btn_link');
      editProf.classList.toggle('view_mode');

      containerInfoUs.insertAdjacentHTML('beforeend', `<div class='profile__avatar_group'>
    <p class='label__user_profile'>Avatar</p>
    <div class='container__avatar'>
        <img src='./../assets/icon/vue-color-avatar0.svg' alt='icon avatar' class='profile__img_avatars'/>
        <img src='./../assets/icon/vue-color-avatar1.svg' alt='icon avatar' class='profile__img_avatars'/>
        <img src='./../assets/icon/vue-color-avatar2.svg' alt='icon avatar' class='profile__img_avatars'/>
        <img src='./../assets/icon/vue-color-avatar3.svg' alt='icon avatar' class='profile__img_avatars'/>
        <img src='./../assets/icon/vue-color-avatar4.svg' alt='icon avatar' class='profile__img_avatars'/>       
    </div>
    <div class='container__radio'>
    <input name="avatar" class="profile_avatar_radio" type="radio" value="./assets/icon/vue-color-avatar0.svg"/>
    <input name="avatar" class="profile_avatar_radio" type="radio" value="./assets/icon/vue-color-avatar1.svg"/>
    <input name="avatar" class="profile_avatar_radio" type="radio" value="./assets/icon/vue-color-avatar2.svg"/> 
    <input name="avatar" class="profile_avatar_radio" type="radio" value="./assets/icon/vue-color-avatar3.svg"/>
    <input name="avatar" class="profile_avatar_radio" type="radio" value="./assets/icon/vue-color-avatar4.svg"/>  
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
