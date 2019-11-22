export function getDaysInMonth(month, year) {
  let date = new Date(Date.UTC(year, month, 1));
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function getInitialMonths(month, year, length) {
  let months = [];

  for (let m = month - length; m <= month + 2; m++) {
    const monthNumber = m % 11;
    const yearNumber = m / 11 >= 1 ? year + 1 : year;

    const days = getDaysInMonth(monthNumber, yearNumber);
    months.push({ days, month: monthNumber, year: yearNumber, date: days[0] });
  }
  return months;
}
