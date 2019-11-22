import React, { createContext, useContext, useReducer } from "react";
import { getInitialMonths } from "./../utils/date";

//Context
const StateContext = createContext();

//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_HIGHLIGHT_MONTH":
      const highlightMonth = state.months[action.value];

      return {
        ...state,
        highlight: {
          month: highlightMonth.month,
          year: highlightMonth.year,
          date: highlightMonth.date
        }
      };

    default:
      return state;
  }
};

//Initial State
const getInitialState = () => {
  const todayDate = new Date();
  return {
    months: getInitialMonths(todayDate.getMonth(), todayDate.getFullYear(), 4),
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
