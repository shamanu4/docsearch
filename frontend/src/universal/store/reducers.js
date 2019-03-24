import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";

import appReducer from "./app/reducers";

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer
  });
