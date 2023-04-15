/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createBtn,
} from '../ultilites/create-element';
import { getElement, getElements } from '../ultilites/get-element';
import {
  validLogin,
  validPassword,
} from '../ultilites/validation';
import { settingColorFontLight, settingColorFontDark } from '../ultilites/setting-font-color';

class AuthFormView {
  constructor(id) {
    this.id = id;
  }

  resetForm(event) {
    event.stopPropagation();
    document.forms.authForm.reset();
    event.target.disabled = true;
    getElement('.btn_login').disabled = true;
    getElement('.error__login_auth').classList.add('display_none');
    getElement('.error__pasword_auth').classList.add('display_none');
    getElement('#login_auth').classList.remove('border_red');
    getElement('#password_auth').classList.remove('border_red');
  }

  bindLogInAsGuestPage(handler) {
    const btnGuest = getElement('.guest_btn_link_auth');
    if (btnGuest) {
      btnGuest.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  bindOpenRegistrModalForm(handler) {
    const btnSignUp = getElement('.sign__modal_link');
    if (btnSignUp) {
      btnSignUp.addEventListener('click', (event) => {
        event.stopPropagation();
        handler();
      });
    }
  }

  validationInput(e) {
    e.stopPropagation();
    const elem = e.target;
    const valueUnput = elem.value;
    const errorLogin = getElement('.error__login_auth');
    const errorPassword = getElement('.error__pasword_auth');
    const btnLogin = getElement('.btn_login');
    const btnReset = getElement('.reset_auth');
    switch (elem.id) {
      case 'login_auth':
        if (!validLogin(valueUnput) && valueUnput.length) {
          AuthFormView.showError(errorLogin, btnLogin, elem);
        } else {
          errorLogin.classList.add('display_none');
          elem.classList.remove('border_red');
        }
        break;
      case 'password_auth':
        if (!validPassword(valueUnput) && valueUnput.length) {
          AuthFormView.showError(errorPassword, btnLogin, elem);
        } else {
          errorPassword.classList.add('display_none');
          elem.classList.remove('border_red');
        }
        break;
      default:
        return true;
    }
    const validateLogin = errorLogin.classList.contains('display_none');
    const validatePassword = errorPassword.classList.contains('display_none');
    const validateEmptyLogin = getElement('#login_auth').value !== '';
    const validateEmptyPassword = getElement('#password_auth').value !== '';
    const isDisabled = validateLogin
     && validatePassword
     && validatePassword
     && validateEmptyLogin
     && validateEmptyPassword;
    btnLogin.disabled = !isDisabled;
    btnReset.disabled = !validateEmptyPassword && !validateEmptyPassword && false;
  }

  static showError(error, btn, elem) {
    btn.disabled = true;
    elem.classList.add('border_red');
    error.classList.remove('display_none');
  }

  static hideError(errorUserName) {
    errorUserName.classList.add('display_none');
  }

  hiddenElem(elemArr) {
    elemArr.forEach((el) => el.classList.toggle('display_none'));
  }

  openEyeAuth = (e) => {
    e.stopPropagation();
    const elem = e.target.parentElement;
    const btnOpen = getElement('.eye_open_auth');
    const btnClose = getElement('.eye_close_auth');
    const inputPassword = getElement('#password_auth');
    if (elem) {
      if (elem.classList.contains('eye_close_auth')) {
        this.hiddenElem([btnOpen, btnClose]);
        inputPassword.type = 'text';
      }
      if (elem.classList.contains('eye_open_auth')) {
        this.hiddenElem([btnOpen, btnClose]);
        inputPassword.type = 'password';
      }
    }
  };

  bindGetDataFormAuth(handler) {
    const myForm = document.forms.authForm;
    if (myForm) {
      myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const dataUser = {
          login: myForm.elements.login_auth.value,
          password: myForm.elements.password_auth.value,
        };
        handler(dataUser);
      });
    }
  }

  settingTheme() {
    const theme = JSON.parse(localStorage.getItem('theme'));
    if (theme && theme === 'dark') {
      settingColorFontLight('.sign__modal_link');
      settingColorFontLight('.guest_btn_link_auth');
    } else {
      settingColorFontDark('.sign__modal_link');
      settingColorFontDark('.guest_btn_link_auth');
    }
  }

  display() {
    const lang = JSON.parse(localStorage.getItem('lang'));
    const isRu = lang === 'ru';

    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['board', 'auth_page']);
    newsectionTasks.id = 'container__columns';
    const mainRegistr = createDiv(['info_user_main']);
    const userInfor = createDiv(['user__info']);
    const containerTitle = createDiv(['container__title']);
    const logIn = createBtn(isRu ? 'Войти' : 'LogIn', ['user__info_title', 'sign_up'], 'button', isRu ? 'Войти' : 'LogIn');
    const signUp = createBtn(isRu ? 'Регистр.' : 'SignUp', ['user__info_title', 'login_btn_link', 'sign__modal_link'], 'button', isRu ? 'Регистрация' : 'SignUp');
    const guest = createBtn(isRu ? 'Войти как гость' : 'LogIn as a guest', ['user__info_title', 'guest_btn_link', 'guest_btn_link_auth'], 'button', isRu ? 'Войти как гость' : 'LogIn as a guest');
    containerTitle.append(logIn, signUp, guest);
    const containerForm = createDiv(['container__form']);

    const myForm = createElem('form', ['form__user_info']);
    myForm.name = 'authForm';

    myForm.insertAdjacentHTML('afterbegin', `<div class='container__input'>
    <label class='label__user_info label_login' for='login_auth'>Login</label>
    <input class='input__user_info login_input' type='text' id='login_auth' name='login_auth' maxlength="100" required/>
    <p class='eror_form error__login_auth display_none'>Only latin letter</p>
</div>

<div class='container__input'>
    <label class='label__user_info label_password' for='password_auth'>Password</label>
    <input class='input__user_info' type='password' id='password_auth' name='password_auth' required/>
    <button type='button' class='password__btn_eye eye_auth eye_close_auth'>
           <img src='./assets/icon/eyeClosed.svg' alt='icon'/>
    </button>
    <button type='button' class='password__btn_eye eye_open_auth eye_auth display_none'>
    <img src='./assets/icon/eyeOpen.svg' alt='icon'/>
    </button>
    <p class='eror_form error__pasword_auth display_none'>Symbols, large and small latin letters, numbers</p>
</div>
<div class='form_btns'>
    <div class='action__form_btns'>
        <button type='button' class='light_btn btn form_btn reset_auth' disabled>Reset</button>
        <button type='submit' class='light_btn btn form_btn btn_login' disabled>LogIn</button>
    </div>   
</div>`);

    containerForm.append(myForm);
    userInfor.append(containerTitle, containerForm);
    mainRegistr.append(userInfor);
    newsectionTasks.append(mainRegistr);
    parentElem.replaceWith(newsectionTasks);
    getElements('.input__user_info').forEach((input) => input.addEventListener('input', this.validationInput));
    getElements('.eye_auth').forEach((btn) => btn.addEventListener('click', this.openEyeAuth));
    getElement('.reset_auth').addEventListener('click', this.resetForm);
    if (isRu) {
      getElement('.label_login').textContent = 'Логин';
      getElement('.error__login_auth').textContent = 'Только латинские буквы';
      getElement('.label_password').textContent = 'Пароль';
      getElement('.error__pasword_auth').textContent = 'Символ, цифры, большие и мал. латинские буквы';
      getElement('.reset_auth').textContent = 'Очистить';
      getElement('.btn_login').textContent = 'Войти';
    }
    this.settingTheme();
  }
}
export default AuthFormView;
