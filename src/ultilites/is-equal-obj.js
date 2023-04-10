export function isEqualObj(object1, object2) {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);
  if (props1.length !== props2.length) {
    return false;
  }
  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i];
    const bothAreObjects = typeof (object1[prop]) === 'object' && typeof (object2[prop]) === 'object';
    if ((!bothAreObjects && (object1[prop] !== object2[prop]))
      || (bothAreObjects && !isEqualObj(object1[prop], object2[prop]))) {
      return false;
    }
  }
  return true;
}

export function checkStateFilter(filter) {
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
