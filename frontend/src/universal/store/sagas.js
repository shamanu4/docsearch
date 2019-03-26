import { all } from "redux-saga/effects";
import { watchFetchDocumentsSaga } from "store/documents/sagas";
import {
  watchFetchDocumentSaga,
  newDocumentSaga,
  watchFetchSearchResultsSaga
} from "store/document/sagas";

// This saga is meant to initialize stuff that's very common and assumed to always exist.
// I.e. it's used when just doesn't make sense to add dispatch in every Component's constructor.
function* initSaga(route) {}

export function* rootSaga(route) {
  yield all([
    watchFetchDocumentsSaga(),
    watchFetchDocumentSaga(),
    newDocumentSaga(),
    watchFetchSearchResultsSaga(),
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
