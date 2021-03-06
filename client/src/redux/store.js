import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const initStore = () => {
  const composedEnhancer = composeWithDevTools(applyMiddleware());
  const store = createStore(rootReducer, {}, composedEnhancer);
  return store;
};

export default initStore;
