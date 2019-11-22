import React, { createContext, useContext, useReducer } from "react";
import { getInitialMonths } from "./../../utils/date";
import { getMonthElIndex, scrollToMonth } from "./utils";

//Context
const StateContext = createContext();

//Reducer
const reducer = (state, action) => {
  const { highlight, scrollContainer, today, months } = state;
  switch (action.type) {
    case "INIT":
      const container = action.value;
      if (months && today) {
        const index = getMonthElIndex(months, today);
        scrollToMonth(container, index);
      }
      return { ...state, scrollContainer: container };

    case "PREVIOUS_MONTH":
      if (highlight && scrollContainer) {
        const index = getMonthElIndex(
          months,
          highlight.month - 1,
          highlight.year
        );
        if (index >= 0 && index <= months.length)
          scrollToMonth(scrollContainer, index);
      }
      return state;

    case "NEXT_MONTH":
      if (highlight && scrollContainer) {
        const index = getMonthElIndex(
          months,
          highlight.month + 1,
          highlight.year
        );
        if (index >= 0 && index <= months.length)
          scrollToMonth(scrollContainer, index);
      }
      return state;

    case "UPDATE_HIGHLIGHT_MONTH":
      const highlightMonth = state.months[action.value];

      if (highlightMonth) {
        return {
          ...state,
          highlight: {
            month: highlightMonth.month,
            year: highlightMonth.year,
            date: highlightMonth.date
          }
        };
      }

      return state;

    default:
      return state;
  }
};

//Initial State
const getInitialState = () => {
  const todayDate = new Date();
  return {
    months: getInitialMonths(todayDate.getMonth(), todayDate.getFullYear(), 12),
    today: todayDate
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
