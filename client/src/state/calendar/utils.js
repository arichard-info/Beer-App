import { scrollTo } from "./../../utils/dom";
import { getDaysInMonth, getUniqueDayString } from "./../../utils/date";

export function getMonthElIndex(months, day) {
  let month = false;
  let year = false;
  if (typeof day.getMonth === "function") {
    month = day.getMonth();
    year = day.getFullYear();
  } else return false;
  const index = months.findIndex(
    days =>
      -1 !==
      days.findIndex(
        day => day.date.getMonth() === month && day.date.getFullYear() === year
      )
  );

  return index;
}

export function scrollToMonth(container, index) {
  const currentEl = container.childNodes[index];
  const scrollPosition = currentEl.offsetTop;
  scrollTo({ top: scrollPosition });
}

export function getInitialMonths(month, year, length) {
  let months = [];

  for (let m = month - length; m <= month + 1; m++) {
    const date = new Date(Date.UTC(year, m, 1));
    const daysArray = getDaysInMonth(date);
    const days = daysArray.map(el => ({
      id: getUniqueDayString(el),
      date: el,
      quantity: 0,
      count: 0
    }));
    months.push(days);
  }
  return months;
}
