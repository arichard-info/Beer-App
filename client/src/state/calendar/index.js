import React, { createContext, useContext, useReducer } from "react";
import { getMonthElIndex, getInitialMonths } from "./utils";

//Context
const StateContext = createContext();

//Reducer
const reducer = (state, action) => {
  const { today, months } = state;
  switch (action.type) {
    case "INIT": {
      const container = action.value;
      if (months && today && container) {
        const index = getMonthElIndex(months, today);
        const currentEl = container.childNodes[index];
        const scrollPosition = currentEl.offsetTop;
        window.scroll(0, scrollPosition);
      }
      return { ...state, scrollContainer: container };
    }

    case "FILL_DRINKS": {
      const drinks = action.value;
      const monthsArray = [...months];
      drinks.forEach(drink => {
        const date = new Date(drink._id);
        const monthId = months.findIndex(
          month =>
            month[0].date.getMonth() === date.getMonth() &&
            month[0].date.getFullYear() === date.getFullYear()
        );
        if (monthId !== -1) {
          const dayId = months[monthId].findIndex(
            day => day.date.getDate() === date.getDate()
          );
          if (dayId)
            monthsArray[monthId][dayId] = {
              ...monthsArray[monthId][dayId],
              count: drink.count,
              quantity: drink.quantity
            };
        }
      });
      return { ...state, drinks, months: monthsArray };
    }

    case "UPDATE_HIGHLIGHT_MONTH": {
      const highlightMonth = state.months[action.value];
      if (highlightMonth) {
        return {
          ...state,
          highlight: highlightMonth[0].date
        };
      }

      return state;
    }

    case "SELECT_DAY": {
      return { ...state, selected: action.value };
    }

    case "UNSELECT_DAY": {
      return { ...state, selected: false };
    }

    default:
      return state;
  }
};

//Initial State
const getInitialState = () => {
  const todayDate = new Date();
  return {
    months: getInitialMonths(todayDate.getMonth(), todayDate.getFullYear(), 12),
    today: todayDate,
    selected: false
  };
};

//Custom provider
export const CalendarProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, getInitialState())}>
    {children}
  </StateContext.Provider>
);

//Custom hook
export const useCalendar = () => useContext(StateContext);
