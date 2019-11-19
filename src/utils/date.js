export function getDaysInMonth(month, year) {
  let date = new Date(Date.UTC(year, month, 1));
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
