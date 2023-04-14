/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import convertorImg64 from '../ultilites/convertation-img-base64';
import {
  createElem,
  createDiv,
  createBtn,
} from '../ultilites/create-element';
import { getElement, getElements } from '../ultilites/get-element';
import {
  validNameUser,
  validLogin,
  validPassword,
  validRepeatPassword,
} from '../ultilites/validation';

class RegistrationFormView {
  constructor(id) {
    this.id = id;
  }

  validationInput(e) {
    e.stopPropagation();
    const elem = e.target;
    const valueUnput = elem.value;
    const errorLogin = getElement('.error__login_message');
    const errorPassword = getElement('.error__pasword_message');
    const errorRepeat = getElement('.error__password2_message');
    const errorUserName = getElement('.error__name_message');
    const errorUserNameLength = getElement('.error__name_length');
    const inputPasswordValue = getElement('#password1').value;
    const inputPassword2 = getElement('#password2');
    const inputPassword = getElement('#password1');
    const btnSubmit = getElement('.save_reg');
    const btnReset = getElement('.reset_reg');
    switch (elem.id) {
      case 'nameUser':
        if (!validNameUser(valueUnput) && valueUnput.length) {
          RegistrationFormView.showError(errorUserName, btnSubmit, elem);
        } else {
          errorUserName.classList.add('display_none');
        }
        if (valueUnput.length > 100) {
          RegistrationFormView.showError(errorUserNameLength, btnSubmit, elem);
        } else {
          errorUserNameLength.classList.add('display_none');
        }
        if (validNameUser(valueUnput) && valueUnput.length && valueUnput.length <= 100) {
          elem.classList.remove('border_red');
        }
        break;
      case 'login':
        if (!validLogin(valueUnput) && valueUnput.length) {
          RegistrationFormView.showError(errorLogin, btnSubmit, elem);
        } else {
          errorLogin.classList.add('display_none');
          elem.classList.remove('border_red');
        }
        break;
      case 'password1':
        if (!validPassword(valueUnput) && valueUnput.length) {
          RegistrationFormView.showError(errorPassword, btnSubmit, elem);
        } else {
          errorPassword.classList.add('display_none');
        }
        if (validPassword(valueUnput) && valueUnput.length) {
          elem.classList.remove('border_red');
        }
        break;
      case 'password2':
        if (!validRepeatPassword(valueUnput, inputPasswordValue) && valueUnput.length) {
          RegistrationFormView.showError(errorRepeat, btnSubmit, elem);
          inputPassword.classList.add('border_red');
        } else {
          errorRepeat.classList.add('display_none');
          inputPassword.classList.remove('border_red');
        }
        if (validRepeatPassword(valueUnput, inputPasswordValue)) {
          inputPassword.classList.remove('border_red');
          elem.classList.remove('border_red');
        }
        break;
      default:
        return true;
    }
    const validateName1 = errorUserName.classList.contains('display_none');
    const validateNameLengthMax = errorUserNameLength.classList.contains('display_none');
    const validateNameEmpty = getElement('#nameUser').value !== '';

    const validatePassword = errorPassword.classList.contains('display_none');
    const validatePasswordEmpty = inputPasswordValue !== '';

    const validatePassword2 = errorRepeat.classList.contains('display_none');
    const validatePassword2Empty = inputPassword2.value !== '';

    const validateLogin = errorLogin.classList.contains('display_none');
    const validateLoginEmpty = getElement('#login').value !== '';

    const isNewData = validateLoginEmpty
     || validatePassword2Empty
     || validatePasswordEmpty
     || validateNameEmpty;

    const isDisabled = validateName1
     && validateNameLengthMax
     && validatePassword
     && validatePassword2
     && validateLogin
     && validateNameEmpty
     && validateLoginEmpty
     && validatePassword2Empty
     && validatePasswordEmpty;

    btnSubmit.disabled = !isDisabled;
    btnReset.disabled = !isNewData;
  }

  static showError(error, btnSubmit, elem) {
    btnSubmit.disabled = true;
    elem.classList.add('border_red');
    error.classList.remove('display_none');
  }

  resetForm(event) {
    event.stopPropagation();
    document.forms.registrationForm.reset();
    const errors = [
      '.error__login_message',
      '.error__pasword_message',
      '.error__password2_message',
      '.error__name_message',
      '.error__name_length',
    ];
    const inputElem = [
      '#nameUser',
      '#login',
      '#password1',
      '#password2',
    ];
    errors.forEach((cl) => { getElement(cl).classList.add('display_none'); });
    inputElem.forEach((cl) => { getElement(cl).classList.remove('border_red'); });
  }

  hiddenElem(elemArr) {
    elemArr.forEach((el) => el.classList.toggle('display_none'));
  }

  openEye = (e) => {
    e.stopPropagation();
    const elem = e.target.parentElement;
    const btnOpen1 = getElement('.eye_open1');
    const btnOpen2 = getElement('.eye_open2');
    const btnClose1 = getElement('.eye_close1');
    const btnClose2 = getElement('.eye_close2');
    const inputPassword1 = getElement('#password1');
    const inputPassword2 = getElement('#password2');
    if (elem) {
      if (elem.classList.contains('eye_close1')) {
        this.hiddenElem([btnOpen1, btnClose1]);
        inputPassword1.type = 'text';
      }
      if (elem.classList.contains('eye_close2')) {
        this.hiddenElem([btnOpen2, btnClose2]);
        inputPassword2.type = 'text';
      }
      if (elem.classList.contains('eye_open1')) {
        this.hiddenElem([btnOpen1, btnClose1]);
        inputPassword1.type = 'password';
      }
      if (elem.classList.contains('eye_open2')) {
        this.hiddenElem([btnOpen2, btnClose2]);
        inputPassword2.type = 'password';
      }
    }
  };

  bindGetDataFormRegistr(handler) {
    const myForm = document.forms.registrationForm;
    if (myForm) {
      myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const imgUser = convertorImg64(myForm.elements.avatar.value);
        const newUser = {
          login: myForm.elements.login.value,
          userName: myForm.elements.nameUser.value,
          password: myForm.elements.password.value,
          retypedPassword: myForm.elements.repeatPassword.value,
          photo: imgUser,
        };
        handler(newUser, 'signUp');
      });
    }
  }

  bindLogInAsGuest(handler) {
    const btnGuest = getElement('.guest_btn_link');
    if (btnGuest) {
      btnGuest.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  bindOpenAuthModalForm(handler) {
    const btnLogIn = getElement('.login__modal_link');
    if (btnLogIn) {
      btnLogIn.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  display() {
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['board']);
    newsectionTasks.id = 'container__columns';
    const mainRegistr = createDiv(['info_user_main']);
    const userInfor = createDiv(['user__info']);
    const containerTitle = createDiv(['container__title']);
    const signUp = createBtn(isRu ? 'Регистр.' : 'SignUp', ['user__info_title', 'sign_up'], 'button', isRu ? 'Регистрация' : 'SignUp');
    const logIn = createBtn(isRu ? 'Войти' : 'LogIn', ['user__info_title', 'login_btn_link', 'login__modal_link'], 'button', isRu ? 'Войти' : 'LogIn');
    const guest = createBtn(isRu ? 'Войти как гость' : 'LogIn as a guest', ['user__info_title', 'guest_btn_link'], 'button', isRu ? 'Войти как гость' : 'LogIn as a guest');
    containerTitle.append(signUp, logIn, guest);
    const containerForm = createDiv(['container__form']);

    const myForm = createElem('form', ['form__user_info']);
    myForm.name = 'registrationForm';

    myForm.insertAdjacentHTML('afterbegin', `<div class='container__input'>
    <label class='label__user_info label_login_reg' for='login'>Login</label>
    <input class='input__user_info login_input' type='text' id='login' name='login' maxlength="100" required/>
    <p class='eror_form error__login_message display_none'>Only latin letter</p> 
</div>

<div class='container__input'>
    <label class='label__user_info label_passw_reg' for='password1'>Password</label>
    <input class='input__user_info' type='password' id='password1' name='password' required/>
    <button type='button' class='password__btn_eye eye_close1'>
           <img src='./assets/icon/eyeClosed.svg' alt='icon'/>
    </button>
    <button type='button' class='password__btn_eye eye_open1 display_none'>
    <img src='./assets/icon/eyeOpen.svg' alt='icon'/>
    </button>
    <p class='eror_form error__pasword_message display_none'>Symbols, large and small latin letters, numbers</p>
</div>
<div class='container__input'>
    <label class='label__user_info label_passw2' for='password2'>Repeat Password</label>
    <input class='input__user_info' type='password' id='password2' name='repeatPassword' required/>
    <button type='button' class='password__btn_eye eye_close2'>
           <img src='./assets/icon/eyeClosed.svg' alt='icon'/>
    </button>
    <button type='button' class='password__btn_eye eye_open2 display_none'>
    <img src='./assets/icon/eyeOpen.svg' alt='icon'/>
    </button>
    <p class='eror_form error__password2_message display_none'>Password mismatch</p>
</div>
<div class='container__input'>
    <label class='label__user_info label_name' for='nameUser'>Name user</label>
    <input class='input__user_info' type='text' id='nameUser' name='nameUser' required/>
    <p class='eror_form error__name_message display_none'>Only in Latin or Cyrillic letter</p>
    <p class='eror_form error__name_length display_none'>Length must be less than 100 letter</p>
</div>
<div class='container__input avatar_radio'>
    <p class='label__user_info label_avatar'>Avatar</p>
    <div class='container__avatar'>
        <img src='./assets/img/avatar1.png' id='Img1' alt='icon avatar'/>
        <img src='./assets/img/avatar2.png' id='Img2' alt='icon avatar'/>
        <img src='./assets/img/avatar3.png' id='Img3' alt='icon avatar'/>
        <img src='./assets/img/avatar4.png' id='Img4' alt='icon avatar'/>
        <img src='./assets/img/avatar5.png' id='Img5' alt='icon avatar'/>     
    </div>
    <div class='container__radio'>   
    <input name="avatar" type="radio" value='Img1' checked/>
    <input name="avatar" type="radio" value='Img2'/>
    <input name="avatar" type="radio" value='Img3'/>
    <input name="avatar" type="radio" value='Img4'/>
    <input name="avatar" type="radio" value='Img5'/>
    </div>
</div>
<div class='form_btns'>
    <div class='action__form_btns'>
        <button type='button' disabled class='light_btn btn form_btn reset_reg'>Reset</button>
        <button type='submit' disabled class='light_btn btn form_btn save_reg'>Save</button>
    </div>   
</div>`);

    containerForm.append(myForm);
    userInfor.append(containerTitle, containerForm);
    mainRegistr.append(userInfor);
    newsectionTasks.append(mainRegistr);
    parentElem.replaceWith(newsectionTasks);
    getElements('.password__btn_eye').forEach((btn) => btn.addEventListener('click', this.openEye));
    getElement('.reset_reg').addEventListener('click', this.resetForm);
    getElements('.input__user_info').forEach((input) => input.addEventListener('input', this.validationInput));
    if (isRu) {
      getElement('.label_login_reg').textContent = 'Логин';
      getElement('.error__login_message').textContent = 'Только латинские буквы';
      getElement('.label_passw_reg').textContent = 'Пароль';
      getElement('.error__pasword_message').textContent = 'Символ, цифры, большие и мал. латинские буквы';
      getElement('.label_passw2').textContent = 'Повторите пароль';
      getElement('.error__password2_message').textContent = 'Пароли не совпадают';
      getElement('.label_name').textContent = 'Имя пользователя';
      getElement('.error__name_message').textContent = 'Только латин. буквы или кириллица';
      getElement('.error__name_length').textContent = 'Не более 100 символов';
      getElement('.label_avatar').textContent = 'Аватар';
      getElement('.reset_reg').textContent = 'Очистить';
      getElement('.save_reg').textContent = 'Сохранить';
    }
  }
}
export default RegistrationFormView;
