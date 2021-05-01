import { combineReducers } from "redux";

import user from "./user";
import calendar from "./calendar";
import beers from "./beers";

export default combineReducers({ user, calendar, beers });
