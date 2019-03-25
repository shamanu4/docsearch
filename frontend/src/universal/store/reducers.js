import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";

import documentsReducer from "./documents/reducers";
import documentReducer from "./document/reducers";

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    documents: documentsReducer,
    document: documentReducer
  });
