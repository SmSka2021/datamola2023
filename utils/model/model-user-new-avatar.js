/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
const arrUsers = [
  {
    id: '1',
    firstName: 'Петя',
    login: 'IvaPet',
    password: '101SS!!2Sh',
    avatar: './assets/icon/vue-color-avatar0.svg',
  },
  {
    id: '2',
    firstName: 'Вася',
    login: 'VaPet',
    password: '10103#ffdeS',
    avatar: './assets/icon/vue-color-avatar1.svg',
  },
  {
    id: '3',
    firstName: 'Илья',
    login: 'IKo',
    password: '555h%hDf',
    avatar: './assets/icon/vue-color-avatar2.svg',
  },
  {
    id: '4',
    firstName: 'Оля',
    login: 'Oeret',
    password: '65jh%hH',
    avatar: './assets/icon/vue-color-avatar3.svg',
  },
  {
    id: '5',
    firstName: 'Саша',
    login: 'Head',
    password: '65G#Ghk22',
    avatar: './assets/icon/vue-color-avatar4.svg',
  },
  {
    id: '6',
    firstName: 'Катя',
    login: 'Body',
    password: '635F%F22gg',
    avatar: './assets/icon/vue-color-avatar2.svg',
  },
  {
    id: '7',
    firstName: 'Олег',
    login: 'Sem',
    password: 'Hgf225%54',
    avatar: './assets/icon/vue-color-avatar0.svg',
  },
  {
    id: '8',
    firstName: 'Дима',
    login: 'Tom',
    password: 'KJhgf^52263',
    avatar: './assets/icon/vue-color-avatar1.svg',
  },
  {
    id: '9',
    firstName: 'Таня',
    login: 'First',
    password: 'Hjg&25226',
    avatar: './assets/icon/vue-color-avatar3.svg',
  },
  {
    id: '10',
    firstName: 'Макс',
    login: 'Second',
    password: 'FG22Kolj&526',
    avatar: './assets/icon/vue-color-avatar4.svg',
  },
  {
    id: '11',
    firstName: 'Глеб',
    login: 'Jyyyek',
    password: 'dfgk2kHff&H554',
    avatar: './assets/icon/vue-color-avatar0.svg',
  },
  {
    id: '12',
    firstName: 'Стас',
    login: 'Vorobej',
    password: 'dfgk2kH&H554',
    avatar: './assets/icon/vue-color-avatar1.svg',
  },
  {
    id: '13',
    firstName: 'Алекс',
    login: 'Aleks',
    password: 'fjkkSSk222d#k',
    avatar: './assets/icon/vue-color-avatar1.svg',
  },
  {
    id: '14',
    firstName: 'Кирилл',
    login: 'KirBoss',
    password: 'FFhhh#hgjk256',
    avatar: './assets/icon/vue-color-avatar1.svg',
  },
];

class UserOne {
  constructor(user) {
    this._id = `${new Date().getTime().toString()}${user.password}`;
    this.firstName = user.firstName;
    this.login = user.login;
    this.password = user.password;
    this.avatar = user.avatar;
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
      'avatar',
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

  getOneUserById = (id) => this.users.find((user) => user.id === id);

  getOneUserByLogin = (login) => this.users.find((user) => user.login === login);

  addUser = (user) => {
    const newUser = new UserOne(user);
    if (UserOne.validate(newUser)) {
      this.users.push(newUser);
      return true;
    }
    return false;
  };

  deleteUser = (userId) => {
    const indexId = (this.users.findIndex((user) => user.id === userId)).toString();
    if (indexId) {
      this.users.splice(+indexId, 1);
      return true;
    }
    return false;
  };

  isOriginUserPassword = (userPassword) => !this.arrPasswordAllUser.includes(userPassword) && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/).test(userPassword);

  isOriginUserLogin = (login) => !this.arrLoginAllUser.includes(login);

  isOriginUserData = (user) => this.isOriginUserPassword(user.password) && this.isOriginUserLogin(user.login);

  validateUser = (userId) => {
    const checkUser = this.getOneUser(userId);
    return UserOne.validate(checkUser);
  };

  editUser = (objNewUser) => {
    const cheskUser = this.getOneUser(objNewUser._id);
    const editUserCopy = new UserOne({
      id: cheskUser.id,
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
    return true;
  };

  clear = () => {
    this.users = [];
  };
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
//   avatar: './..avatar',
// });
// console.log(usersCollection.users.length);

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
//   avatar: './HELLO',
// });
// console.log(usersCollection.users[5]);

// console.log(usersCollection.isOriginUserData({
//   firstName: 'Кирилл',
//   login: 'KirB',
//   password: 'FFhhhyy#hgjk2560',
//   avatar: './ggggg',
// }));

// console.log(usersCollection.isOriginUserData({
//   id: '8',
//   firstName: 'Дима',
//   login: 'Tom',
//   password: 'KJhgf^52263',
//   avatar: './ggggg',
// }));
