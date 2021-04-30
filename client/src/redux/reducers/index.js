import { combineReducers } from "redux";

import user from "./user";
import calendar from "./calendar";

export default combineReducers({ user, calendar });
