const maxLengthName = 100;
const maxLengthDescription = 280;
const taskStatus = {
  toDo: 'To Do',
  complete: 'Complete',
  inProgress: 'In progress',
};

const priorityTask = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

class Task {
  constructor(id, name, description, createdAt, assignee, status, priority, isPrivate, comments) {
    this._id = id;
    this.name = name;
    this.description = description;
    this._createdAt = createdAt;
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.isPrivate = isPrivate;
    this.comments = comments;
  }

  get id() {
    return this._id;
  }

  set id(item) {
    throw new Error(`Can't change current id ${this._id}`);
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(item) {
    throw new Error(`Can't change current date ${this._createdAt}`);
  }

  static validate(task) {
    const keysTask = [
      '_id',
      'name',
      'description',
      '_createdAt',
      'assignee',
      'status',
      'priority',
      'isPrivate',
      'comments',
    ];

    const isAllKey = keysTask.every((item) => Object.keys(task).includes(item));
    if (!isAllKey) return false;

    const validateId = typeof task._id === 'string' && task._id.trim().length;
    const validateName = typeof task.name === 'string'
      && task.name.length <= maxLengthName
      && task.name.trim().length;
    const validateDescription = typeof task.description === 'string'
      && task.description.length <= maxLengthDescription
      && task.description.trim().length;
    const validateCreatedAt = task._createdAt instanceof Date;
    const validateAssignee = typeof task.assignee === 'string'
      && task.assignee.trim().length;
    const validateStatus = typeof task.status === 'string'
      && (task.status === taskStatus.toDo
      || task.status === taskStatus.complete
      || task.status === taskStatus.inProgress);
    const validatePriority = typeof task.priority === 'string'
      && (task.priority === priorityTask.high
      || task.priority === priorityTask.medium
      || task.priority === priorityTask.low);
    const validateIsPrivate = typeof task.isPrivate === 'boolean';
    const validateComments = task.comments instanceof Array;

    return !!(
      validateId
        && validateName
        && validateDescription
        && validateCreatedAt
        && validateAssignee
        && validateStatus
        && validatePriority
        && validateIsPrivate
        && validateComments
        && true
    );
  }
}

const newTaskObj = new Task(
  '15',
  'Разработать navigation',
  'Разработать navigation для всех страниц',
  new Date('2022-12-27T23:00:00'),
  'Сидоренко',
  'In progress',
  'High',
  false,
  [],
);

const newTaskObjFalse = new Task(
  '15',
  'Разработать navigation',
  'Разработать navigation для всех страниц',
  new Date('2022-12-27T23:00:00'),
  'Сидоренко',
  'In progress',
  'High',
  'false',
  [],
);

console.log('validate task: ', Task.validate(newTaskObj));
console.log('validate task: ', Task.validate(newTaskObjFalse));
console.log('newTaskObj: ', newTaskObj.id);
newTaskObj.id = '777';
