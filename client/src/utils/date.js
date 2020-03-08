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

export function getUniqueDayString(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
