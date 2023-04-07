const filterTasks = (arr, filterConfig = {}) => {
  const tasksArrSortDate = arr.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const config = { ...filterConfig };

  return tasksArrSortDate
    .filter(
      (task) => !config.name || task.name.toLowerCase().includes(config.name.toLowerCase()),
    )
    .filter(
      (task) => !config.assignee || task.assignee.userName.toLowerCase().includes(
        config.assignee.toLowerCase(),
      ),
    )
    .filter(
      (task) => !config.description || task.description.toLowerCase().includes(
        config.description.toLowerCase(),
      ),
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
    );
};
export default filterTasks;
