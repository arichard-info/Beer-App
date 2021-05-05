import defaultFormat from "./date.conf";

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

export const renderDate = (date, DATE_FORMAT_OPTION = defaultFormat) => {
  let dateObj = null;

  if (date instanceof Date && !isNaN(dateObj)) {
    dateObj = date;
  } else if (typeof date === "String") {
    dateObj = new Date(date.split("+")[0]);
  } else {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", DATE_FORMAT_OPTION).format(dateObj);
};
