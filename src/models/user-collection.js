/* eslint-disable max-len */
import UserOne from './user-one';

class UserCollection {
  arrPasswordAllUser = [];

  arrLoginAllUser = [];

  constructor(userArr) {
    this._users = [];
    this.restore = () => {
      if (localStorage.getItem('MyUserCollection')) {
        this._users = [...JSON.parse(localStorage.getItem('MyUserCollection'))];
      } else {
        this._users = userArr.map((user) => new UserOne(user));
      }
    };
    this.restore();
    this.users.forEach((user) => {
      this.arrLoginAllUser.push(user.login);
      this.arrPasswordAllUser.push(user.password);
    });
  }

  get users() {
    return this._users;
  }

  set users(newUsers) {
    this._users = [...newUsers];
  }

  getOneUserById = (idUser) => this.users.filter((user) => user._id === idUser);

  getOneUserByLogin = (login) => this.users.filter((user) => user.login === login);

  addUser = (user) => {
    const newUser = new UserOne(user);
    if (UserOne.validate(newUser) && this.isOriginUserData(user)) {
      this.users.push(newUser);
      this.arrLoginAllUser.push(newUser.login);
      this.arrPasswordAllUser.push(newUser.password);
      this.save();
      return newUser.id;
    }
    return false;
  };

  deleteUser = (userId) => {
    const indexId = (this.users.findIndex((user) => user.id === userId)).toString();
    if (indexId) {
      this.users.splice(+indexId, 1);
      this.users.forEach((user) => {
        this.arrLoginAllUser = [].push(user.login);
        this.arrPasswordAllUser = [].push(user.password);
      });
      this.save();
      return true;
    }
    return false;
  };

  isOriginUserPassword = (userPassword) => !this.arrPasswordAllUser.includes(userPassword) && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/).test(userPassword);

  isOriginUserLogin = (login) => !this.arrLoginAllUser.includes(login);

  isOriginUserData = (user) => this.isOriginUserPassword(user.password) && this.isOriginUserLogin(user.login);

  validateUser = (userId) => {
    const checkUser = this.getOneUserById(userId);
    return UserOne.validate(checkUser);
  };

  editUser = (objNewUser) => {
    const cheskUser = this.getOneUserById(objNewUser._id);
    const editUserCopy = new UserOne({
      id: cheskUser._id,
      firstName: objNewUser.firstName || cheskUser.firstName,
      login: objNewUser.login || cheskUser.login,
      password: objNewUser.password || cheskUser.password,
      avatar: objNewUser.avatar || cheskUser.avatar,
    });
    if (!UserOne.validate(editUserCopy)) {
      console.log('User data not validate');
      return false;
    }
    const index = this.users.findIndex((user) => (user._id === cheskUser._id));
    this.users.splice(+index, 1, editUserCopy);
    this.save();
    return true;
  };

  clear = () => {
    this.users = [];
  };

  save = () => {
    localStorage.setItem('MyUserCollection', JSON.stringify(this.users));
  };
}
export default UserCollection;
