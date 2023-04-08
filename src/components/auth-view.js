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

class AuthFormView {
  constructor(id) {
    this.id = id;
  }

  resetForm(event) {
    event.stopPropagation();
    document.forms.authForm.reset();
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
    switch (elem.id) {
      case 'login_auth':
        if (!validLogin(valueUnput) && valueUnput.length) errorLogin.classList.remove('display_none');
        else errorLogin.classList.add('display_none');
        break;
      case 'password_auth':
        if (!validPassword(valueUnput) && valueUnput.length) errorPassword.classList.remove('display_none');
        else errorPassword.classList.add('display_none');
        break;
      default:
        return true;
    }
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

  display() {
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['board', 'auth_page']);
    newsectionTasks.id = 'container__columns';
    const mainRegistr = createDiv(['info_user_main']);
    // const btnAuth = createBtn('Auth', ['dark_btn', 'btn', 'auth_btn'], 'button', 'authorize');
    // const btnMain = createBtn('Main Page', ['dark_btn', 'btn'], 'button', 'main page');
    const userInfor = createDiv(['user__info']);
    const containerTitle = createDiv(['container__title']);
    const logIn = createBtn('LogIn', ['user__info_title', 'sign_up'], 'button', 'Authorize');
    const signUp = createBtn('SignUp', ['user__info_title', 'login_btn_link', 'sign__modal_link'], 'button', 'Registration');
    const guest = createBtn('LogIn as a guest', ['user__info_title', 'guest_btn_link', 'guest_btn_link_auth'], 'button', 'LogIn as a guest');
    containerTitle.append(logIn, signUp, guest);
    const containerForm = createDiv(['container__form']);

    const myForm = createElem('form', ['form__user_info']);
    myForm.name = 'authForm';

    myForm.insertAdjacentHTML('afterbegin', `<div class='container__input'>
    <label class='label__user_info' for='login_auth'>Login</label>
    <input class='input__user_info login_input' type='text' id='login_auth' name='login_auth' maxlength="100" required/>
    <p class='eror_form error__login_auth display_none'>Only latin letter</p>
    <p class='eror_form error__login_auth_origin display_none'>This login is busy</p>
</div>

<div class='container__input'>
    <label class='label__user_info' for='password_auth'>Password</label>
    <input class='input__user_info' type='password' id='password_auth' name='password_auth' required/>
    <button type='button' class='password__btn_eye eye_auth eye_close_auth'>
           <img src='./../assets/icon/eyeClosed.svg' alt='icon'/>
    </button>
    <button type='button' class='password__btn_eye eye_open_auth eye_auth display_none'>
    <img src='./../assets/icon/eyeOpen.svg' alt='icon'/>
    </button>
    <p class='eror_form error__pasword_auth display_none'>Symbols, large and small latin letters, numbers</p>
</div>
<div class='form_btns'>
    <div class='action__form_btns'>
        <button type='button' class='light_btn btn form_btn reset_auth'>Reset</button>
        <button type='submit' class='light_btn btn form_btn'>LogIn</button>
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
  }
}
export default AuthFormView;
