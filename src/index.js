import TasksController from './app';
import arrTasks from './ultilites/data';
import './style.css';

const startArrTasks = localStorage.getItem('tasks') ? [...JSON.parse(localStorage.getItem('tasks'))] : arrTasks;

const app = new TasksController(startArrTasks);
app.display();
