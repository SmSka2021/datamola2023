/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { convertorImg64 } from '../ultilites/convertation-img-base64';
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
    const inputPasswordValue = getElement('#password1').value;
    switch (elem.id) {
      case 'nameUser':
        if (!validNameUser(valueUnput) && valueUnput.length) errorUserName.classList.remove('display_none');
        else errorUserName.classList.add('display_none');
        break;
      case 'login':
        if (!validLogin(valueUnput) && valueUnput.length) errorLogin.classList.remove('display_none');
        else errorLogin.classList.add('display_none');
        break;
      case 'password1':
        if (!validPassword(valueUnput) && valueUnput.length) errorPassword.classList.remove('display_none');
        else errorPassword.classList.add('display_none');
        break;
      case 'password2':
        if (!validRepeatPassword(valueUnput, inputPasswordValue) && valueUnput.length) errorRepeat.classList.remove('display_none');
        else errorRepeat.classList.add('display_none');
        break;
      default:
        return true;
    }
  }

  resetForm(event) {
    event.stopPropagation();
    document.forms.registrationForm.reset();
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
        localStorage.setItem('avatar', myForm.elements.avatar.value);
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
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['board']);
    newsectionTasks.id = 'container__columns';
    const mainRegistr = createDiv(['info_user_main']);
    const userInfor = createDiv(['user__info']);
    const containerTitle = createDiv(['container__title']);
    const signUp = createBtn('SignUp', ['user__info_title', 'sign_up'], 'button', 'Registration');
    const logIn = createBtn('LogIn', ['user__info_title', 'login_btn_link', 'login__modal_link'], 'button', 'Authorize');
    const guest = createBtn('LogIn as a guest', ['user__info_title', 'guest_btn_link'], 'button', 'LogIn as a guest');
    containerTitle.append(signUp, logIn, guest);
    const containerForm = createDiv(['container__form']);

    const myForm = createElem('form', ['form__user_info']);
    myForm.name = 'registrationForm';

    myForm.insertAdjacentHTML('afterbegin', `<div class='container__input'>
    <label class='label__user_info' for='login'>Login</label>
    <input class='input__user_info login_input' type='text' id='login' name='login' maxlength="100" required/>
    <p class='eror_form error__login_message display_none'>Only latin letter</p>
    <p class='eror_form error__login_origin display_none'>This login is busy</p>
</div>

<div class='container__input'>
    <label class='label__user_info' for='password1'>Password</label>
    <input class='input__user_info' type='password' id='password1' name='password' required/>
    <button type='button' class='password__btn_eye eye_close1'>
           <img src='./../assets/icon/eyeClosed.svg' alt='icon'/>
    </button>
    <button type='button' class='password__btn_eye eye_open1 display_none'>
    <img src='./../assets/icon/eyeOpen.svg' alt='icon'/>
    </button>
    <p class='eror_form error__pasword_message display_none'>Symbols, large and small latin letters, numbers</p>
</div>
<div class='container__input'>
    <label class='label__user_info' for='password2'>Repeat Password</label>
    <input class='input__user_info' type='password' id='password2' name='repeatPassword' required/>
    <button type='button' class='password__btn_eye eye_close2'>
           <img src='./../assets/icon/eyeClosed.svg' alt='icon'/>
    </button>
    <button type='button' class='password__btn_eye eye_open2 display_none'>
    <img src='./../assets/icon/eyeOpen.svg' alt='icon'/>
    </button>
    <p class='eror_form error__password2_message display_none'>Password mismatch</p>
</div>
<div class='container__input'>
    <label class='label__user_info' for='nameUser'>Name user</label>
    <input class='input__user_info' type='text' id='nameUser' name='nameUser' required/>
    <p class='eror_form error__name_message display_none'>Only in Latin or Cyrillic letter</p>
</div>
<div class='container__input avatar_radio'>
    <p class='label__user_info'>Avatar</p>
    <div class='container__avatar'>
        <img src='../assets/img/avatar1.png' id='Img1' alt='icon avatar'/>
        <img src='../assets/img/avatar2.png' id='Img2' alt='icon avatar'/>
        <img src='../assets/img/avatar3.png' id='Img3' alt='icon avatar'/>
        <img src='../assets/img/avatar4.png' id='Img4' alt='icon avatar'/>
        <img src='../assets/img/avatar5.png' id='Img5' alt='icon avatar'/>     
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
        <button type='button' class='light_btn btn form_btn reset_reg'>Reset</button>
        <button type='submit' class='light_btn btn form_btn'>Save</button>
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
  }
}
export default RegistrationFormView;
