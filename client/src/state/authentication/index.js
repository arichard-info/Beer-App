import React, { createContext, useContext, useReducer } from "react";

//Context
const StateContext = createContext();

//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const user = action.value;
      return user;
    }
    case "UPDATE": {
      const user = action.value;
      return { ...state, ...user };
    }
    case "REMOVE":
      return null;
    case "LOG_OUT": {
      return null;
    }
    case "LOG_IN": {
      const user = action.value;
      return user;
    }
    default:
      return state;
  }
};

//Custom provider
export const UserProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, null)}>
    {children}
  </StateContext.Provider>
);

//Custom hook
export const useUser = () => useContext(StateContext);
