import { maxLengthDescription, maxLengthName } from '../../src/ultilites/constant';
import { taskStatusObj, priorityTask } from '../../src/ultilites/field-task';
import Comment from './comments';

class Task {
  constructor(task) {
    this._id = task.id || `${new Date().getTime().toString()}${task.assignee}`;
    this.name = task.name;
    this.description = task.description;
    this._createdAt = task.createdAt || new Date().toISOString();
    this.assignee = task.assignee;
    this.status = task.status;
    this.priority = task.priority;
    this.isPrivate = task.isPrivate;
    this.comments = task.comments.map(
      (comment) => new Comment(comment.id, comment.text, comment.createdAt, comment.author) || [],
    );
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
    // const validateCreatedAt = task._createdAt instanceof Date;
    const validateAssignee = typeof task.assignee === 'string'
      && task.assignee.trim().length;
    const validateStatus = typeof task.status === 'string'
      && (task.status === taskStatusObj.toDo
      || task.status === taskStatusObj.complete
      || task.status === taskStatusObj.inProgress);
    const validatePriority = typeof task.priority === 'string'
      && (task.priority === priorityTask.high
      || task.priority === priorityTask.medium
      || task.priority === priorityTask.low);
    const validateIsPrivate = typeof task.isPrivate === 'boolean';
    const validateComments = task.comments instanceof Array;
    let resValidateTaskComments = true;
    if (task.comments.length) {
      resValidateTaskComments = task.comments.every((comment) => Comment.validate(comment));
    }

    return !!(
      validateId
        && validateName
        && validateDescription
        // && validateCreatedAt
        && validateAssignee
        && validateStatus
        && validatePriority
        && validateIsPrivate
        && validateComments
        && resValidateTaskComments
        && true
    );
  }
}
export default Task;
