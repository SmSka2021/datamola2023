/* eslint-disable class-methods-use-this */
import Task from './task';
import Comment from './comments';

class TaskCollection {
  _user = 'Иванов';

  constructor(tasks) {
    this._tasks = tasks.map((task) => new Task(task)).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  get tasks() {
    return this._tasks;
  }

  settasks(newTasks) {
    this._tasks = [...newTasks].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  get user() {
    return this._user;
  }

  set user(name) {
    this._user = name;
  }

  get(id) {
    return this.tasks.find((task) => task.id === id);
  }

  add(task) {
    if (!this.user) return false;

    const newTask = new Task(task);

    if (Task.validate(newTask)) {
      this.tasks.push(newTask);
      return true;
    }
    return false;
  }

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

  edit(
    id,
    nameNew,
    descriptionNew,
    assigneeNew,
    statusNew,
    priorityNew,
    isPrivateNew = false,
  ) {
    const cheskTask = this.get(id);
    if (!this.user || (cheskTask.assignee !== this.user)) return false;

    const editTaskCopy = {
      ...cheskTask,
      id: cheskTask.id,
      name: nameNew || cheskTask.name,
      description: descriptionNew || cheskTask.description,
      createdAt: cheskTask.createdAt,
      assignee: assigneeNew || cheskTask.assignee,
      status: statusNew || cheskTask.status,
      priority: priorityNew || cheskTask.priority,
      isPrivate: (typeof isPrivateNew === 'boolean') ? isPrivateNew : cheskTask.isPrivate,
    };

    if (!Task.validate(editTaskCopy)) {
      return false;
    }
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1, new Task(editTaskCopy));
    return true;
  }

  remove(id) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (this.get(id).assignee === this.user) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  addComment(id, textComment) {
    const indexTask = this.tasks.findIndex((task) => task.id === id);
    const newComment = new Comment(id, textComment, new Date(), this.user);
    if (Comment.validate(newComment)) {
      this.tasks[indexTask].comments.push(newComment);
      return true;
    }
    return false;
  }

  clear() {
    this.tasks = [];
  }

  addAll(tasks) {
    const invalidTasks = [];
    tasks.forEach((task) => {
      const taskNew = new Task(task);
      if (Task.validate(taskNew)) {
        this.tasks.push(taskNew);
      } else {
        invalidTasks.push(taskNew);
      }
    });
    return invalidTasks;
  }
}
export default TaskCollection;
