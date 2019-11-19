import React, { createContext, useContext, useReducer } from "react";
import { getInitialMonths } from "./../utils/date";

//Context
const StateContext = createContext();

//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      return {
        ...state,
        theme: action.newTheme
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
    current: todayDate
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
