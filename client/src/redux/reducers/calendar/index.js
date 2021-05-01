import { getInitialState } from "./utils";

const getFilledCalendar = (state = {}, drinks = []) => {
  if (!state.months) return state;
  const monthsArray = [...state.months];
  if (drinks && drinks.length) {
    drinks.forEach((drink) => {
      const date = new Date(drink._id);
      const monthId = state.months.findIndex(
        (month) =>
          month[0].date.getMonth() === date.getMonth() &&
          month[0].date.getFullYear() === date.getFullYear()
      );
      if (monthId !== -1) {
        const dayId = state.months[monthId].findIndex(
          (day) => day.date.getDate() === date.getDate()
        );
        if (dayId !== -1)
          monthsArray[monthId][dayId] = {
            ...monthsArray[monthId][dayId],
            count: drink.count,
            quantity: drink.quantity,
          };
      }
    });
  }
  return { ...state, drinks, months: monthsArray };
};

export default function calendarReducer(state = getInitialState(), action) {
  switch (action.type) {
    case "calendar/fill":
      return getFilledCalendar(state, action.payload);
    case "calendar/monthHighlight": {
      const highlightMonth = state.months[action.payload];
      if (highlightMonth) {
        return {
          ...state,
          highlight: { date: highlightMonth[0].date, index: action.payload },
        };
      }

      return state;
    }
    case "calendar/selectDay": {
      return { ...state, selected: action.payload };
    }
    case "calendar/unselectDay": {
      return { ...state, selected: false };
    }
    default:
      return state;
  }
}
