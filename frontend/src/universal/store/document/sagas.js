import { call, put, take, takeLatest } from "redux-saga/effects";
import {
  FETCH_DOCUMENT_REQUEST,
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_FAILURE,
  NEW_DOCUMENT_REQUEST,
  NEW_DOCUMENT_SUCCESS,
  NEW_DOCUMENT_FAILURE
} from "./constants";
import { apiGet, apiPost } from "utils/api";

export function* fetchDocumentSaga(action) {
  const { match, location } = action.payload;
  const documentId = match.params.documentId || 0;

  try {
    const result = yield call(() => apiGet(`/document/${documentId}/`));
    if (result.ok) {
      const payload = {
        id: result.data.document_id,
        sentences: result.data.sentences
      };
      yield put({
        type: FETCH_DOCUMENT_SUCCESS,
        payload: payload,
        headers: result.headers
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: FETCH_DOCUMENT_FAILURE,
      error
    });
  }
}

export function* watchFetchDocumentSaga() {
  yield takeLatest(FETCH_DOCUMENT_REQUEST, fetchDocumentSaga);
}

export function* newDocumentSaga() {
  while (true) {
    const { payload } = yield take(NEW_DOCUMENT_REQUEST);

    const url = "/documents/";

    try {
      const result = yield call(() => apiPost(url, payload));
      if (result.ok) {
        yield put({
          type: NEW_DOCUMENT_SUCCESS,
          payload: result.data,
          headers: result.headers
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: NEW_DOCUMENT_FAILURE
      });
    }
  }
}