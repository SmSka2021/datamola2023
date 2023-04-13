export const priorityTask = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
export const taskStatusObj = {
  toDo: 'To Do',
  complete: 'Complete',
  inProgress: 'In progress',
};
export const taskStatusArr = ['To Do', 'In progress', 'Complete'];

export const translateStatus = (status) => {
  if (status === 'To Do') return 'В планах';
  if (status === 'In progress') return 'В процессе';
  return 'Выполнено';
};

export const taskStatusArrRu = ['В планах', 'В процессе', 'Выполнено'];

export const createIdList = (str) => {
  if (str === taskStatusObj.toDo) return 'todo';
  if (str === taskStatusObj.inProgress) return 'inProgress';
  return 'complete';
};

export const arrFieldTask = () => {
  if (JSON.parse(localStorage.getItem('lang')) === 'ru') {
    return ['Задача', 'Статус', 'Описание', 'Приоритет', 'Приватность', 'Исполнитель', 'Создатель', 'Дата', 'Комментарии', 'Править', 'Удалить'];
  }
  return ['Name Task', 'Status', 'Description', 'Priority', 'Privacy', 'Assignee', 'Creator', 'Date', 'Comments', 'Edit', 'Delete'];
};

export const statusBtn = {
  todo: 'todo',
  complete: 'complete',
  inProgress: 'inProgress',
};
export const statusBtnLoadStart = {
  todo: false,
  complete: false,
  inProgress: false,
};
