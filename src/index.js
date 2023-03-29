import TasksController from './app';
import arrTasks from './ultilites/data';
import './style.css';

const createDataInLocalStorage = () => {
  if (localStorage.getItem('tasks')) {
    return;
  }
  localStorage.setItem('tasks', JSON.stringify(arrTasks));
};
createDataInLocalStorage();

const app = new TasksController();
app.display();

export default app;
