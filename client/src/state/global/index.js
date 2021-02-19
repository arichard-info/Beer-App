import React, { createContext, useContext, useReducer } from "react";

//Context
const StateContext = createContext();

//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BEER_TYPES": {
      const beerTypes = action.value;
      console.log(action.value);
      return { ...state, beerTypes };
    }
    default:
      return state;
  }
};

//Custom provider
export const ContextProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, {})}>
    {children}
  </StateContext.Provider>
);

//Custom hook
export const useGlobalContext = () => useContext(StateContext);
