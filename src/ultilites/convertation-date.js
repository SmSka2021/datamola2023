const convertationDate = (dateObject) => {
  if (dateObject) {
    if (dateObject instanceof Date) {
      const string = dateObject.toISOString().slice(0, 10);
      return `${string.slice(8)}/${string.slice(5, 7)}/${string.slice(0, 4)}`;
    }
    if (typeof dateObject === 'string') {
      const string = dateObject.slice(0, 10);
      return `${string.slice(8)}/${string.slice(5, 7)}/${string.slice(0, 4)}`;
    }
  }
  return null;
};

export default convertationDate;
