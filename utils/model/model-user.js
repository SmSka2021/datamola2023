/* eslint-disable max-classes-per-file */
const arrUsers = [
  {
    id: '1',
    firstName: 'Петя',
    lastName: 'Иванов',
    login: 'IvaPet',
    password: '101SS!!2Sh',
    email: 'pet@mail.ru',
  },
  {
    id: '2',
    firstName: 'Вася',
    lastName: 'Петров',
    login: 'VaPet',
    password: '10103#ffdeS',
    email: 'fjfi@mail.ru',
  },
  {
    id: '3',
    firstName: 'Илья',
    lastName: 'Коршунов',
    login: 'IKo',
    password: '555h%hDf',
    email: 'fjd@mail.ru',
  },
  {
    id: '4',
    firstName: 'Оля',
    lastName: 'Ермолаева',
    login: 'Oeret',
    password: '65jh%hH',
    email: 'gjdd@mail.ru',
  },
  {
    id: '5',
    firstName: 'Саша',
    lastName: 'Буян',
    login: 'Head',
    password: '65G#Ghk22',
    email: 'ffgh@mail.ru',
  },
  {
    id: '6',
    firstName: 'Катя',
    lastName: 'Варан',
    login: 'Body',
    password: '635F%F22gg',
    email: 'glfd@mail.ru',
  },
  {
    id: '7',
    firstName: 'Олег',
    lastName: 'Белусь',
    login: 'Sem',
    password: 'Hgf225%54',
    email: 'fgth@mail.ru',
  },
  {
    id: '8',
    firstName: 'Дима',
    lastName: 'Варяг',
    login: 'Tom',
    password: 'KJhgf^52263',
    email: 'gnn@mail.ru',
  },
  {
    id: '9',
    firstName: 'Таня',
    lastName: 'Симан',
    login: 'First',
    password: 'Hjg&25226',
    email: 'kgiu@mail.ru',
  },
  {
    id: '10',
    firstName: 'Макс',
    lastName: 'Горян',
    login: 'Second',
    password: 'FG22Kolj&526',
    email: 'nhn@mail.ru',
  },
  {
    id: '11',
    firstName: 'Глеб',
    lastName: 'Ткачук',
    login: 'Jyyyek',
    password: 'dfgk2kHff&H554',
    email: 'nhjjktn@mail.ru',
  },
  {
    id: '12',
    firstName: 'Стас',
    lastName: 'Шук',
    login: 'Vorobej',
    password: 'dfgk2kH&H554',
    email: 'nhyut@mail.ru',
  },
  {
    id: '13',
    firstName: 'Алекс',
    lastName: 'Сидоренко',
    login: 'Aleks',
    password: 'fjkkSSk222d#k',
    email: 'nhnyt@mail.ru',
  },
  {
    id: '14',
    firstName: 'Кирилл',
    lastName: 'Васильев',
    login: 'KirBoss',
    password: 'FFhhh#hgjk256',
    email: 'nyum@mail.ru',
  },
];

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
      && textData.length <= 25
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

class UserCollection {
  arrPasswordAllUser = [];

  arrEmailAllUser = [];

  arrLoginAllUser = [];

  constructor(userArr) {
    this._users = userArr.map((user) => new UserOne(user));
    this.users.forEach((user) => {
      this.arrEmailAllUser.push(user.email);
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

  isOriginUserEmail(email) {
    return !this.arrEmailAllUser.includes(email) && (
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i).test(email);
  }

  isOriginUserLogin(login) {
    return !this.arrLoginAllUser.includes(login);
  }

  isOriginUserData(user) {
    return this.isOriginUserPassword(user.password)
     && this.isOriginUserEmail(user.email) && this.isOriginUserLogin(user.login);
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
      lastName: objNewUser.lastName || cheskUser.lastName,
      email: objNewUser.email || cheskUser.email,
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
//   lastName: 'Васильев',
//   login: 'KirBo44ss',
//   password: 'FFhhhyy#hgjk256',
//   email: 'nyum@mail.ru',
// });
// console.log(usersCollection.users[5]);
// console.log(usersCollection.deleteUser(usersCollection.users[9].id));
// console.log(usersCollection.users.length);
const idUs = usersCollection.users[5].id;
console.log(idUs, 'idUser');
// // console.log(usersCollection.users.length);
usersCollection.editUser({
  _id: idUs,
  firstName: 'New',
  lastName: 'New',
  login: 'Bhdgd568',
  password: 'FFDDhhhyy#hgjk256',
  email: 'nyDDum@mail.ru',
});
console.log(usersCollection.users[5]);

// console.log(usersCollection.isOriginUserData({
//   firstName: 'Кирилл',
//   lastName: 'Васильев',
//   login: 'KirBo44ss0',
//   password: 'FFhhhyy#hgjk2560',
//   email: '0nyum@mail.ru',
// }));

// console.log(usersCollection.isOriginUserData({
//   firstName: 'Кирилл',
//   lastName: 'Васильев',
//   login: 'KirBo44ss',
//   password: 'FFhhhyy#hgjk256',
//   email: 'nyum@mail.ru',
// }));
