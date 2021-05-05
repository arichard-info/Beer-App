import { getDaysInMonth, renderDate } from "@/utils/date";
import { short as shortDate } from "@/utils/date.conf";

export const getMonthsInInterval = (date, pastLength, futureLength) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  let months = [];

  for (let m = month - pastLength; m <= month + futureLength; m++) {
    const date = new Date(Date.UTC(year, m, 1));
    const daysArray = getDaysInMonth(date);
    const days = daysArray.map((el) => ({
      id: renderDate(el, shortDate),
      date: el,
      quantity: 0,
      count: 0,
    }));
    months.push(days);
  }
  return months;
};

export const getInitialState = () => {
  const todayDate = new Date();
  const futureLength = 1;
  const months = getMonthsInInterval(todayDate, 11, futureLength);
  const highlightIndex = months.length - futureLength - 1;

  return {
    months,
    today: todayDate,
    selected: false,
    highlight: { date: months[highlightIndex][0].date, index: highlightIndex },
  };
};
