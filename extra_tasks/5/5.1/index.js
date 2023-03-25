/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */

function gettDay(date) {
  let day = date.getDay();
  if (day === 0) day = 7;
  return day - 1;
}

function createCalendar(elem, year, month) {
  const mon = month - 1;
  const item = new Date(year, mon);
  let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
  for (let i = 0; i < gettDay(item); i++) {
    table += '<td></td>';
  }
  while (item.getMonth() === mon) {
    table += '<td>' + item.getDate() + '</td>';
    if (gettDay(item) % 7 === 6) {
      table += '</tr><tr>';
    }
    item.setDate(item.getDate() + 1);
  }
  if (gettDay(item) !== 0) {
    for (let i = gettDay(item); i < 7; i++) {
      table += '<td></td>';
    }
  }
  table += '</tr></table>';
  elem.id = 'tbl';
  elem.innerHTML = table;
  document.getElementById('myTime').textContent = `Введена дата: месяц-${month} год-${year}`;
}

createCalendar(document.getElementById('calendar'), 2023, 5);
