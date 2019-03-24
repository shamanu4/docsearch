import Immutable, { fromJS } from "immutable";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { createBrowserHistory, createMemoryHistory } from "history";
import { routerMiddleware } from "connected-react-router/immutable";
import createSagaMiddleware, { END } from "redux-saga";
import { isServer } from "utils/helpers";
import { createRootReducer } from "./reducers";
import SagaManager, { rootSaga } from "./sagas";

// HMR
// https://github.com/xkawi/react-universal-saga/issues/8

export default (preloadedState, url = "/") => {
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url]
      })
    : createBrowserHistory();

  const immutablePreloadedState = fromJS(preloadedState);

  const rootReducer = createRootReducer(history);
  const sagaMiddleware = createSagaMiddleware(rootSaga);
  const connectedRouterMiddleware = routerMiddleware(history);

  const middlewares = [sagaMiddleware, connectedRouterMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composeEnhancers = composeWithDevTools({
    serialize: { immutable: Immutable }
  });

  const store = createStore(
    rootReducer,
    immutablePreloadedState,
    composeEnhancers(...enhancers)
  );

  if (isServer) {
    store.serverRunSaga = url => sagaMiddleware.run(() => rootSaga(url));
    store.serverStopSaga = () => store.dispatch(END);
  } else {
    sagaMiddleware.run(rootSaga);
  }

  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run;
  store.startAbortableSaga = () => SagaManager.startSaga(sagaMiddleware);
  store.close = () => store.dispatch(END);

  // HMR for reducers and sagas
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(connectedRootReducer(nextRootReducer));
    });

    module.hot.accept("./sagas", () => {
      SagaManager.cancelSaga(store);
      require("./sagas").default.startSaga(sagaMiddleware);
    });
  }

  return { store, history };
};
