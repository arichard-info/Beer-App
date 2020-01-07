import React, { createContext, useContext, useReducer } from "react";

//Context
const StateContext = createContext();

//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { user, token } = action.value;
      return { ...user, token };
    }
    case "UPDATE": {
      const { user, token } = action.value;
      if (token) window.localStorage.setItem("auth_token", token);
      return { ...state, ...user };
    }
    case "REMOVE":
      return null;
    case "LOG_OUT": {
      window.localStorage.removeItem("auth_token");
      return null;
    }
    case "LOG_IN": {
      const { user, token } = action.value;
      window.localStorage.setItem("auth_token", token);
      return { ...user, token };
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
