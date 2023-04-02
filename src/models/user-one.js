import { maxLengthFirstName } from '../ultilites/constant';

class UserOne {
  constructor(user) {
    this._id = `${new Date().getTime().toString()}${user.password}`;
    this.firstName = user.firstName;
    this.login = user.login;
    this.password = user.password;
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
      'login',
      'password',
    ];

    const isAllKey = keysTask.every((item) => Object.keys(user).includes(item));
    if (!isAllKey) return false;

    const validateTextData = (textData) => typeof textData === 'string'
      && textData.length <= maxLengthFirstName
      && textData.trim().length;

    const validateId = (typeof user._id === 'string' && user._id.trim().length);
    const validateFirstName = validateTextData(user.firstName) && (/^([а-яёА-ЯЁ]+|[a-zA-Z]+)$/iu).test(user.firstName);
    const validateLogin = (/^([a-zA-Z]+)$/iu).test(user.login);
    const validatePassword = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/).test(user.password);
    return !!(
      validateId
        && validateFirstName
        && validateLogin
        && validatePassword
        && true
    );
  }
}
export default UserOne;
