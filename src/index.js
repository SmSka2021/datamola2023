import TasksController from './app';
import TaskCollection from './models/task-collection';
import UserCollection from './models/user-collection';
import arrTasks from './ultilites/data';
import './style.css';
import arrUsers from './ultilites/users';

const createDataInLocalStorage = () => {
  if (!localStorage.getItem('MyTaskCollection')) {
    localStorage.setItem('MyTaskCollection', JSON.stringify(new TaskCollection(arrTasks).tasks));
  }
  if (!localStorage.getItem('MyUserCollection')) {
    localStorage.setItem('MyUserCollection', JSON.stringify(new UserCollection(arrUsers).users));
  }
};
createDataInLocalStorage();

const app = new TasksController();

export default app;
