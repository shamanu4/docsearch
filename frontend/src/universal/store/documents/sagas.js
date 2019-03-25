import { call, put, take, takeLatest } from "redux-saga/effects";
import {
  FETCH_DOCUMENTS_LIST_REQUEST,
  FETCH_DOCUMENTS_LIST_SUCCESS,
  FETCH_DOCUMENTS_LIST_FAILURE
} from "./constants";
import { apiGet, apiPost } from "utils/api";

export function* fetchDocumentsSaga(action) {
  const { match, location } = action.payload;
  const page = match.params.page || 1;

  try {
    const result = yield call(() => apiGet(`/documents/?page=${page}`));
    if (result.ok) {
      const payload = {
        total: result.data.total,
        page: result.data.page,
        numPages: result.data.last_page,
        items: result.data.documents
      };
      yield put({
        type: FETCH_DOCUMENTS_LIST_SUCCESS,
        payload: payload,
        headers: result.headers
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: FETCH_DOCUMENTS_LIST_FAILURE,
      error
    });
  }
}

export function* watchFetchDocumentsSaga() {
  yield takeLatest(FETCH_DOCUMENTS_LIST_REQUEST, fetchDocumentsSaga);
}
