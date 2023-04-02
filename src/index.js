import TasksController from './app';
import arrTasks from './ultilites/data';
import './style.css';
import arrUsers from './ultilites/users';

const createDataInLocalStorage = () => {
  if (localStorage.getItem('tasks')) {
    return;
  }
  localStorage.setItem('tasks', JSON.stringify(arrTasks));
};
createDataInLocalStorage();
const createDataUserInLocalStorage = () => {
  if (localStorage.getItem('users')) {
    return;
  }
  localStorage.setItem('users', JSON.stringify(arrUsers));
};
createDataUserInLocalStorage();

const app = new TasksController();

export default app;
