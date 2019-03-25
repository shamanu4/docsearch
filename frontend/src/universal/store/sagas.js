import { all } from "redux-saga/effects";
import { isServer } from "utils/helpers";
import {
  fetchDocumentsSaga,
  watchFetchDocumentsSaga
} from "store/documents/sagas";
import {
  fetchDocumentSaga,
  watchFetchDocumentSaga,
  newDocumentSaga
} from "store/document/sagas";

// This saga is meant to initialize stuff that's very common and assumed to always exist.
// I.e. it's used when just doesn't make sense to add dispatch in every Component's constructor.
function* initSaga(route) {
  if (isServer) {
    switch (true) {
      case /^\/documents\/\d?$/g.test(route):
        yield all([fetchDocumentsSaga()]);
        break;
      case /^\/document\/\d+$/g.test(route):
        yield all([fetchDocumentSaga()]);
        break;
      default:
    }
  }
}

export function* rootSaga(route) {
  yield all([
    watchFetchDocumentsSaga(),
    watchFetchDocumentSaga(),
    newDocumentSaga(),
    initSaga(route) // must be the last entry
  ]);
}

export const CANCEL_SAGAS_HMR = "CANCEL_SAGAS_HMR";

function createAbortableSaga(saga) {
  if (process.env.NODE_ENV === "development") {
    return function* main() {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
  return saga;
}

const SagaManager = {
  startSaga(sagaMiddleware) {
    return sagaMiddleware.run(createAbortableSaga(rootSaga));
  },
  cancelSaga(store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR
    });
  }
};

export default SagaManager;
