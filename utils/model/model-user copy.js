/* eslint-disable max-classes-per-file */
const arrUsers = [
  {
    id: '1',
    firstName: 'Петя',
    login: 'IvaPet',
    password: '101SS!!2Sh',
  },
  {
    id: '2',
    firstName: 'Вася',
    login: 'VaPet',
    password: '10103#ffdeS',
  },
  {
    id: '3',
    firstName: 'Илья',
    login: 'IKo',
    password: '555h%hDf',
  },
  {
    id: '4',
    firstName: 'Оля',
    login: 'Oeret',
    password: '65jh%hH',
  },
  {
    id: '5',
    firstName: 'Саша',
    login: 'Head',
    password: '65G#Ghk22',
  },
  {
    id: '6',
    firstName: 'Катя',
    login: 'Body',
    password: '635F%F22gg',
  },
  {
    id: '7',
    firstName: 'Олег',
    login: 'Sem',
    password: 'Hgf225%54',
  },
  {
    id: '8',
    firstName: 'Дима',
    login: 'Tom',
    password: 'KJhgf^52263',
  },
  {
    id: '9',
    firstName: 'Таня',
    login: 'First',
    password: 'Hjg&25226',
  },
  {
    id: '10',
    firstName: 'Макс',
    login: 'Second',
    password: 'FG22Kolj&526',
  },
  {
    id: '11',
    firstName: 'Глеб',
    login: 'Jyyyek',
    password: 'dfgk2kHff&H554',
  },
  {
    id: '12',
    firstName: 'Стас',
    login: 'Vorobej',
    password: 'dfgk2kH&H554',
  },
  {
    id: '13',
    firstName: 'Алекс',
    login: 'Aleks',
    password: 'fjkkSSk222d#k',
  },
  {
    id: '14',
    firstName: 'Кирилл',
    login: 'KirBoss',
    password: 'FFhhh#hgjk256',
  },
];

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
      && textData.length <= 100
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

class UserCollection {
  arrPasswordAllUser = [];

  arrEmailAllUser = [];

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

  isOriginUserPassword(userPassword) {
    return !this.arrPasswordAllUser.includes(userPassword) && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/).test(userPassword);
  }

  isOriginUserLogin(login) {
    return !this.arrLoginAllUser.includes(login);
  }

  isOriginUserData(user) {
    return this.isOriginUserPassword(user.password) && this.isOriginUserLogin(user.login);
  }

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

const usersCollection = new UserCollection(arrUsers);
console.log(usersCollection.users.length);
// console.log(usersCollection.users[0].id);
// console.log(usersCollection.getOneUser(usersCollection.users[0].id));
// console.log(usersCollection.validateUser(usersCollection.users[0].id));
// usersCollection.addUser({
//   firstName: 'Кирилл',
//   login: 'Kirss',
//   password: 'FFhhhyy#hgjk256',
// });
// console.log(usersCollection.users[5]);
// console.log(usersCollection.deleteUser(usersCollection.users[5].id));
// console.log(usersCollection.users.length);
// const idUs = usersCollection.users[5].id;
// console.log(idUs, 'idUser');
// console.log(usersCollection.users.length);
// usersCollection.editUser({
//   _id: idUs,
//   firstName: 'New',
//   login: 'Bhd',
//   password: 'FFDDhhhyy#hgjk256',
// });
// console.log(usersCollection.users[5]);

// console.log(usersCollection.isOriginUserData({
//   firstName: 'Кирилл',
//   login: 'KirB',
//   password: 'FFhhhyy#hgjk2560',
// }));

// console.log(usersCollection.isOriginUserData({
//   id: '8',
//   firstName: 'Дима',
//   login: 'Tom',
//   password: 'KJhgf^52263',
// }));
