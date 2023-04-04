/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import Task from './task';
import Comment from './comments';

class TaskCollection {
  _user = 'Иванов';

  constructor(tasks) {
    this.tasks = [];
    this.restore = () => {
      if (localStorage.getItem('MyTaskCollection')) {
        this._tasks = [...JSON.parse(localStorage.getItem('MyTaskCollection'))];
      } else {
        this._tasks = tasks.map((task) => new Task(task)).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      }
    };
    this.restore();
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasksMy) {
    this._tasks = [...tasksMy].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  settasks = (newTasks) => {
    this._tasks = [...newTasks].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  };

  get user() {
    return this._user;
  }

  set user(name) {
    this._user = name;
  }

  get = (id) => this.tasks.find((task) => task._id === id);

  save = () => {
    localStorage.setItem('MyTaskCollection', JSON.stringify(this._tasks));
  };

  add = (objData) => {
    if (!this.user || (this.user !== objData.assignee)) return false;

    const newTask = new Task({
      id: `${new Date().getTime().toString()}${objData.assignee}`,
      name: objData.name,
      description: objData.description,
      createdAt: new Date().toISOString(),
      assignee: objData.assignee,
      status: objData.status,
      priority: objData.priority,
      isPrivate: objData.isPrivate,
      comments: [],
    });
    if (Task.validate(newTask)) {
      this.tasks.unshift(newTask);
      this.save();
      return true;
    }
    console.log('This Task is invalid');
    return false;
  };

  getPage = (skip = 0, top = 10, filterConfig = {}) => {
    const tasksArrSortDate = this.tasks.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const config = { ...filterConfig };

    return tasksArrSortDate
      .filter(
        (task) => !config.name || task.name.toLowerCase().includes(config.name.toLowerCase()),
      )
      .filter(
        (task) => !config.assignee || task.assignee.toLowerCase().includes(
          config.assignee.toLowerCase(),
        ),
      )
      .filter(
        (task) => !config.description || task.description.toLowerCase().includes(
          config.description.toLowerCase(),
        ),
      )
      .filter(
        (task) => !config.status || task.status === config.status,
      )
      .filter(
        (task) => !config.priority || task.priority === config.priority,
      )
      .filter(
        (task) => (typeof config.isPrivate !== 'boolean') || task.isPrivate === config.isPrivate,
      )
      .filter(
        (task) => !config.dateFrom
         || new Date(task.createdAt).getTime() >= new Date(config.dateFrom).getTime(),
      )
      .filter(
        (task) => !config.dateTo
        || new Date(task.createdAt).getTime() <= new Date(config.dateTo).getTime(),
      )
      .splice(skip, top);
  };

  edit = (objNewData) => {
    const cheskTask = this.get(objNewData.id); // нужно ли _ID черточка
    if (!this.user
      || (objNewData.assignee !== this.user)
      || (cheskTask.assignee !== this.user)
    ) return false;

    const editTaskCopy = new Task({
      id: cheskTask.id,
      createAt: cheskTask.createdAt,
      assignee: cheskTask.assignee,
      comments: [...cheskTask.comments] || [],
      name: objNewData.name || cheskTask.name,
      description: objNewData.description || cheskTask.description,
      status: objNewData.status || cheskTask.status,
      priority: objNewData.priority || cheskTask.priority,
      isPrivate: (typeof isPrivateNew === 'boolean') ? objNewData.isPrivate : cheskTask.isPrivate,
    });
    if (!Task.validate(editTaskCopy)) {
      console.log('Task not validate');
      return false;
    }
    const index = this.tasks.findIndex((task) => task.id === objNewData.id);
    this.tasks.splice(+index, 1, editTaskCopy);
    this.save();
    return true;
  };

  remove = (id) => {
    const index = (this.tasks.findIndex((task) => task._id === id)).toString();
    if (index) {
      if (this.get(id).assignee === this.user) {
        this.tasks.splice(+index, 1);
        this.save();
        return true;
      }
      return false;
    }
    return false;
  };

  addComment = (id, textComment) => {
    const indexTask = this.tasks.findIndex((task) => task._id === id);
    const newComment = new Comment(id, textComment, new Date(), this.user);
    if (Comment.validate(newComment)) {
      this.tasks[indexTask].comments.push(newComment);
      this.save();
      return true;
    }
    return false;
  };

  clear = () => {
    this.tasks = [];
  };

  addAll = (tasks) => {
    const invalidTasks = [];
    tasks.forEach((task) => {
      const taskNew = new Task(task);
      if (Task.validate(taskNew)) {
        this.save();
        this.tasks.push(taskNew);
      } else {
        invalidTasks.push(taskNew);
      }
    });
    return invalidTasks;
  };
}
export default TaskCollection;
