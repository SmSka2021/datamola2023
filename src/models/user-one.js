import { maxLengthFirstName } from '../ultilites/constant';

class UserOne {
  constructor(user) {
    this._id = `${new Date().getTime().toString()}${user.password}`;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.login = user.login;
    this.password = user.password;
    this.email = user.email;
  }

  get id() {
    return this._id;
  }

  set id(item) {
    throw new Error(`Can't change current id ${this._id}`);
  }

  static validate(user) {
    const keysTask = [
      '_id',
      'firstName',
      'lastName',
      'login',
      'password',
      'email',
    ];

    const isAllKey = keysTask.every((item) => Object.keys(user).includes(item));
    if (!isAllKey) return false;

    const validateTextData = (textData) => typeof textData === 'string'
      && textData.length <= maxLengthFirstName
      && textData.trim().length;

    const validateId = (typeof user._id === 'string' && user._id.trim().length);
    const validateFirstName = validateTextData(user.firstName);
    const validateLastName = validateTextData(user.lastName);
    const validateLogin = validateTextData(user.login);
    const validatePassword = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/).test(user.password);
    const validateEmail = (
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i).test(user.email);

    return !!(
      validateId
        && validateFirstName
        && validateLastName
        && validateLogin
        && validatePassword
        && validateEmail
        && true
    );
  }
}
export default UserOne;
