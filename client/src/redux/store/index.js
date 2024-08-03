import { legacy_createStore } from "redux";
import rootReducer from "../reducers";
import { loadState, saveState } from "./sessionStorage";

const persistedState = loadState();
const store = legacy_createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
