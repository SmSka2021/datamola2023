function checkStateFilter(filter) {
  return filter.dataSearch === ''
    && filter.assignee === false
    && filter.description === false
    && filter.title === false
    && filter.priority.low === false
    && filter.priority.medium === false
    && filter.priority.high === false
    && filter.isPrivate.privacy === false
    && filter.isPrivate.public === false
    && filter.dateFrom === null
    && filter.dateTo === null;
}
export default checkStateFilter;
