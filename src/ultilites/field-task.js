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

export const createIdList = (str) => {
  if (str === taskStatusObj.toDo) return 'todo';
  if (str === taskStatusObj.inProgress) return 'inProgress';
  return 'complete';
};
export const arrFieldTask = ['Name Task', 'Status', 'Description', 'Priority', 'Privacy', 'Assignee', 'Date', 'Comments', 'Edit', 'Delete'];
