const initialState = {};

export default function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case "calendar/fill": {
      const drinks = action.payload;
      const monthsArray = [...months];
      if (drinks && drinks.length) {
        drinks.forEach((drink) => {
          const date = new Date(drink._id);
          const monthId = months.findIndex(
            (month) =>
              month[0].date.getMonth() === date.getMonth() &&
              month[0].date.getFullYear() === date.getFullYear()
          );
          if (monthId !== -1) {
            const dayId = months[monthId].findIndex(
              (day) => day.date.getDate() === date.getDate()
            );
            if (dayId)
              monthsArray[monthId][dayId] = {
                ...monthsArray[monthId][dayId],
                count: drink.count,
                quantity: drink.quantity,
              };
          }
        });
      }
      return { ...state, drinks, months: monthsArray };
    }
    case "calendar/monthHighlight": {
      const highlightMonth = state.months[action.payload];
      if (highlightMonth) {
        return {
          ...state,
          highlight: highlightMonth[0].date,
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
