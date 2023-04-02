import UserOne from './user-one';

class UserCollection {
  arrPasswordAllUser = [];

  arrLoginAllUser = [];

  constructor(userArr) {
    this._users = userArr.map((user) => new UserOne(user));
    this.users.forEach((user) => {
      this.arrLoginAllUser.push(user.login);
      this.arrPasswordAllUser.push(user.password);
    });
  }

  get users() {
    return this._users;
  }

  getOneUser(id) {
    return this.users.find((user) => user.id === id);
  }

  addUser(user) {
    const newUser = new UserOne(user);
    if (UserOne.validate(newUser)) {
      this.users.push(newUser);
      return true;
    }
    return false;
  }

  deleteUser(userId) {
    const indexId = (this.users.findIndex((user) => user.id === userId)).toString();
    if (indexId) {
      this.users.splice(+indexId, 1);
      return true;
    }
    return false;
  }

  isOriginUserPassword = (userPassword) => !this.arrPasswordAllUser.includes(userPassword);

  isOriginUserLogin = (login) => !this.arrLoginAllUser.includes(login);

  isOriginUserData = (user) => this.isOriginUserPassword(user.password)
   && this.isOriginUserLogin(user.login);

  validateUser(userId) {
    const checkUser = this.getOneUser(userId);
    return UserOne.validate(checkUser);
  }

  editUser(objNewUser) {
    const cheskUser = this.getOneUser(objNewUser._id);
    const editUserCopy = new UserOne({
      id: cheskUser.id,
      firstName: objNewUser.firstName || cheskUser.firstName,
      login: objNewUser.login || cheskUser.login,
      password: objNewUser.password || cheskUser.password,
    });
    if (!UserOne.validate(editUserCopy)) {
      console.log('User data not validate');
      return false;
    }
    const index = this.users.findIndex((user) => (user._id === cheskUser._id));
    this.users.splice(+index, 1, editUserCopy);
    return true;
  }

  clear() {
    this.users = [];
  }
}
export default UserCollection;
