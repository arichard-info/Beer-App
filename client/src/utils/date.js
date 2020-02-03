export function getDaysInMonth(m, y) {
  let date = null;
  let month = false;
  if (typeof m.getMonth === "function") {
    date = m;
    month = m.getMonth();
  } else if (Number.isInteger(m) && Number.isInteger(y)) {
    month = m;
    date = new Date(Date.UTC(y, m, 1));
  } else return false;

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
    const date = new Date(Date.UTC(year, m, 1));
    const monthNumber = date.getMonth();
    const yearNumber = date.getFullYear();
    const days = getDaysInMonth(date);
    months.push({ days, month: monthNumber, year: yearNumber, date: days[0] });
  }
  return months;
}

export function getMonthName(date) {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];

  if (typeof date.getMonth === "function") return monthNames[date.getMonth()];
  if (Number.isInteger(date)) return monthNames[date];
  return "";
}

export function getFullDate(date) {
  return `${date.getDate()} ${getMonthName(date)} ${date.getFullYear()}`;
}
