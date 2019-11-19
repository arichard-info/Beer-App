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

  for (let m = month - length; m <= month + 1; m++) {
    const days = getDaysInMonth(m, year);
    months.push({ days, id: m });
  }
  return months;
}
