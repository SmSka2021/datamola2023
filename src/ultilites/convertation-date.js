const convertationDate = (dateObject) => {
  const day = dateObject.slice(8, 10);
  const month = dateObject.slice(4, 8);
  const year = dateObject.slice(0, 4);
  return day + month + year;
// new Date(dateObject).toLocaleDateString();
};

export default convertationDate;
