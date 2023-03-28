const convertationDate = (dateObject) => {
  if (dateObject instanceof Date) {
    const string = dateObject.toISOString().slice(0, 10);
    return `${string.slice(8)}/${string.slice(5, 7)}/${string.slice(0, 4)}`;
  }
  const string = dateObject.slice(0, 10);
  return `${string.slice(8)}/${string.slice(5, 7)}/${string.slice(0, 4)}`;
};

export default convertationDate;
