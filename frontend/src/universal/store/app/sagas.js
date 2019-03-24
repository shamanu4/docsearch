import { call, put, take, takeLatest } from "redux-saga/effects";
import {
  TOPICS_REQUEST,
  TOPICS_SUCCESS,
  TOPICS_FAILURE,
  TOPICS_HIERARCHY_REQUEST,
  TOPICS_HIERARCHY_SUCCESS,
  TOPICS_HIERARCHY_FAILURE,
  GEOLOCATION_REQUEST,
  GEOLOCATION_SUCCESS,
  GEOLOCATION_FAILURE,
  FETCH_ALL_PROJECTS_REVIEWS_REQUEST,
  FETCH_ALL_PROJECTS_REVIEWS_SUCCESS,
  FETCH_ALL_PROJECTS_REVIEWS_FAILURE,
  FETCH_CATEGORY_MANAGERS_REQUEST,
  FETCH_CATEGORY_MANAGERS_SUCCESS,
  FETCH_CATEGORY_MANAGERS_FAILURE,
  POST_PROPOSED_PROJECT_REQUEST,
  POST_PROPOSED_PROJECT_SUCCESS,
  POST_PROPOSED_PROJECT_FAILURE,
  FETCH_PRESS_REQUEST,
  FETCH_PRESS_SUCCESS,
  FETCH_PRESS_FAILURE,
  POST_NEWSLETTER_FORM_FAILURE,
  POST_NEWSLETTER_FORM_SUCCESS,
  POST_NEWSLETTER_FORM_REQUEST,
  POST_B2B_CONTACT_REQUEST,
  POST_B2B_CONTACT_SUCCESS,
  POST_B2B_CONTACT_FAILURE
} from "./constants";
import { apiGet, apiPost } from "utils/api";

export function* fetchCategoriesSaga() {
  try {
    const result = yield call(() => apiGet("/topics/"));
    if (result.ok) {
      yield put({
        type: TOPICS_SUCCESS,
        payload: result.data.results,
        headers: result.headers
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: TOPICS_FAILURE,
      error
    });
  }
}

export function* watchFetchCategoriesSaga() {
  yield takeLatest(TOPICS_REQUEST, fetchCategoriesSaga);
}

export function* fetchTopicsHierarchySaga() {
  try {
    const result = yield call(() => apiGet("/topics-hierarchy/"));

    if (result.ok) {
      yield put({
        type: TOPICS_HIERARCHY_SUCCESS,
        payload: result.data.results,
        headers: result.headers
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: TOPICS_HIERARCHY_FAILURE
    });
  }
}

export function* watchFetchTopicsHierarchySaga() {
  yield takeLatest(TOPICS_HIERARCHY_REQUEST, fetchTopicsHierarchySaga);
}

export function* geolocationSaga() {
  yield put({ type: GEOLOCATION_REQUEST });

  try {
    const result = yield call(() => apiGet("/geolocation/"));
    if (result.ok) {
      yield put({
        type: GEOLOCATION_SUCCESS,
        payload: result.data,
        headers: result.headers
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: GEOLOCATION_FAILURE,
      error
    });
  }
}

export function* fetchAllProjectsReviewsSaga() {
  try {
    const result = yield call(() => apiGet("/projects-reviews/?limit=6"));
    if (result.ok) {
      yield put({
        type: FETCH_ALL_PROJECTS_REVIEWS_SUCCESS,
        payload: result.data.results,
        headers: result.headers
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: FETCH_ALL_PROJECTS_REVIEWS_FAILURE
    });
  }
}

export function* watchFetchAllProjectsReviewsSaga() {
  yield takeLatest(
    FETCH_ALL_PROJECTS_REVIEWS_REQUEST,
    fetchAllProjectsReviewsSaga
  );
}

export function* fetchCategoryManagers() {
  try {
    const url = "/category-managers/";
    const result = yield call(() => apiGet(url));

    if (result.ok) {
      yield put({
        type: FETCH_CATEGORY_MANAGERS_SUCCESS,
        payload: result.data.results,
        headers: result.headers
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: FETCH_CATEGORY_MANAGERS_FAILURE
    });
  }
}

export function* watchFetchCategoryManagers() {
  yield takeLatest(FETCH_CATEGORY_MANAGERS_REQUEST, fetchCategoryManagers);
}

export function* postProposedProjectFormSaga() {
  while (true) {
    const { payload } = yield take(POST_PROPOSED_PROJECT_REQUEST);
    const data = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      text: payload.description,
      topic: payload.topic,
      language: payload.language,
      captcha: payload.captcha
    };

    try {
      const result = yield call(() => apiPost("/project-proposal/", data));

      if (result.ok) {
        yield put({
          type: POST_PROPOSED_PROJECT_SUCCESS,
          payload: result.data,
          headers: result.headers
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: POST_PROPOSED_PROJECT_FAILURE,
        error
      });
    }
  }
}

export function* postB2BContactFormSaga() {
  while (true) {
    const { payload } = yield take(POST_B2B_CONTACT_REQUEST);
    const data = {
      company_name: payload.company,
      contact_person: payload.person,
      email: payload.email,
      message: payload.message,
      package_name: payload.packageName,
      captcha: payload.captcha
    };

    try {
      const result = yield call(() => apiPost("/b2b-contact/", data));

      if (result.ok) {
        yield put({
          type: POST_B2B_CONTACT_SUCCESS,
          payload: result.data,
          headers: result.headers
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: POST_B2B_CONTACT_FAILURE,
        error
      });
    }
  }
}

export function* postNewsletterFormSaga() {
  while (true) {
    const { payload } = yield take(POST_NEWSLETTER_FORM_REQUEST);

    try {
      const result = yield call(() =>
        apiPost("/subscribe-newsletter/", payload)
      );

      if (result.ok) {
        yield put({
          type: POST_NEWSLETTER_FORM_SUCCESS,
          payload: result.data,
          headers: result.headers
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: POST_NEWSLETTER_FORM_FAILURE,
        error
      });
    }
  }
}

export function* fetchPressSaga() {
  const url = "/press/";

  try {
    const result = yield call(() => apiGet(url));

    if (result.ok) {
      yield put({
        type: FETCH_PRESS_SUCCESS,
        payload: result.data.results,
        headers: result.headers
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: FETCH_PRESS_FAILURE
    });
  }
}

export function* watchFetchPressSaga() {
  yield takeLatest(FETCH_PRESS_REQUEST, fetchPressSaga);
}
