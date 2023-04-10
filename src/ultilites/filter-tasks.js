// import { priorityTask } from './field-task';

// const filterTasks = (arr, filterConfig = {}) => {
//   const tasksArrSortDate = arr.sort(
//     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//   );

//   const config = { ...filterConfig };

//   return tasksArrSortDate
//     .filter(
//       (task) => !config.name || task.name.toLowerCase().includes(config.name.toLowerCase()),
//     )
//     .filter(
//       (task) => !config.assignee || task.assignee.userName.toLowerCase().includes(
//         config.assignee.toLowerCase(),
//       ),
//     )
//     .filter(
//       (task) => !config.description || task.description.toLowerCase().includes(
//         config.description.toLowerCase(),
//       ),
//     )
//     .filter(
//       (task) => (typeof config.priority.low !== 'boolean') || task.priority === priorityTask.low,
//     )
//     .filter(
//       (task) => !config.priority.medium || task.priority === priorityTask.medium,
//     )
//     .filter(
//       (task) => !config.priority.high || task.priority === priorityTask.high,
//     )
//     .filter(
//  (task) => (typeof config.isPrivate.privacy !== 'boolean')
//  || task.isPrivate === config.isPrivate.privacy,
//     )
//     .filter(
//       (task) => (typeof config.isPrivate.public !== 'boolean')
//  || task.isPrivate === config.isPrivate.public,
//     )
//     .filter(
//       (task) => !config.dateFrom
//        || new Date(task.createdAt).getTime() >= new Date(config.dateFrom).getTime(),
//     )
//     .filter(
//       (task) => !config.dateTo
//       || new Date(task.createdAt).getTime() <= new Date(config.dateTo).getTime(),
//     );
// };
// export default filterTasks;

export function filterTask(task, config) {
  if (config.title
     && !task.name.toLowerCase().includes(config.dataSearch.toLowerCase())) return false;
  if (config.assignee
     && !task.assignee.userName.toLowerCase().includes(config.dataSearch.toLowerCase())) {
    return false;
  }
  if (config.description
     && !task.description.toLowerCase().includes(config.dataSearch.toLowerCase())) return false;
  if (Object.values(config.priority).includes(true)
   && !config.priority[task.priority.toLowerCase()]) return false;
  // if (config.priority.low && task.priority === priorityTask.low) return true;
  // if (config.priority.medium && task.priority === priorityTask.medium) return true;
  // if (config.priority.high && task.priority === priorityTask.high) return true;
  if (config.isPrivate.privacy && config.isPrivate.public) return true;
  if (config.isPrivate.privacy && !task.isPrivate) return false;
  if (config.isPrivate.public && task.isPrivate) return false;
  if (config.isPrivate.privacy && config.isPrivate.public) return true;
  if (config.dateFrom
     && new Date(task.createdAt).getTime() <= new Date(config.dateFrom).getTime()) return false;
  if (config.dateTo
     && new Date(task.createdAt).getTime() >= new Date(config.dateTo).getTime()) return false;
  return true;
}

export function filterAllTasks(arr, filter) {
  const arrTasksAfterFilter = [];
  arr.forEach((task) => {
    if (filterTask(task, filter)) {
      arrTasksAfterFilter.push(task);
    }
  });
  const sortArr = arrTasksAfterFilter.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return sortArr;
}
