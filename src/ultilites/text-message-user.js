function checkLang() {
  return JSON.parse(localStorage.getItem('lang')) === 'ru';
}

export const messageDelEdit = () => {
  if (checkLang()) return 'Только автор или исполнитель может удалять или править задачу';
  return 'Only creator can delete or edit task';
};

export const messageErDublicate = () => {
  if (checkLang()) return 'Пользователь с таким именем или логином уже существует';
  return 'This Login or userName is already taken';
};

export const messageErServer = () => {
  if (checkLang()) return 'Ошибка сервера, пожалуйста, попробуйте позже';
  return 'Server error, please try again later';
};

export const messageEr = () => {
  if (checkLang()) return 'Что-то пошло не так, попробуйте позже';
  return 'Something went wrong, please try again';
};

export const messageErPassword = () => {
  if (checkLang()) return 'Некорректный пароль';
  return 'Password incorrect';
};

export const messageErName = () => {
  if (checkLang()) return 'Это имя уже занято';
  return 'UserName is already taken';
};

export const messageAgainAuth = () => {
  if (checkLang()) return 'Время сессии закончилось, Вам необходимо залогиниться снова';
  return 'Session timed out, you need to login again';
};

export const messageNoMoreTasks = () => {
  if (checkLang()) return 'В этой категории больше нет задач';
  return 'This category has not more tasks';
};

export const messagePrivateTask = () => {
  if (checkLang()) return 'Это приватная задача, доступ имеет только автор или исполнитель задачи';
  return 'You have not access to private tasks other users';
};

export const messageIncorrectData = () => {
  if (checkLang()) return 'Логин или пароль не корректны';
  return 'Login or password is incorrect';
};
export const messageNotResSearch = () => {
  if (checkLang()) return 'Упс, по вашему запросу ничего не найдено';
  return 'Oops! Nothing found';
};

export const messageConfirmDelete = () => {
  if (checkLang()) return 'Вы уверены?';
  return 'A you sure?';
};
