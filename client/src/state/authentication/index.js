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
      if (user.token) window.localStorage.setItem("auth_token", user.token);
      return { ...state, ...user };
    }
    case "REMOVE":
      window.localStorage.removeItem("auth_token");
      return null;
    case "LOG_OUT": {
      window.localStorage.removeItem("auth_token");
      return null;
    }
    case "LOG_IN": {
      const user = action.value;
      window.localStorage.setItem("auth_token", user.token);
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
