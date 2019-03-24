import { all } from "redux-saga/effects";
import { isServer } from "utils/helpers";

// This saga is meant to initialize stuff that's very common and assumed to always exist.
// I.e. it's used when just doesn't make sense to add dispatch in every Component's constructor.
function* initSaga(route) {
  if (isServer) {
    switch (true) {
      // Run required sagas on the server side
      default:
    }
  }
}

export function* rootSaga(route) {
  yield all([
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
