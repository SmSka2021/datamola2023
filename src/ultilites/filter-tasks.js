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
