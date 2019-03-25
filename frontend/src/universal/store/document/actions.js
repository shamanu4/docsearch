import {
  FETCH_DOCUMENT_REQUEST,
  CLEAR_DOCUMENT_REQUEST,
  NEW_DOCUMENT_REQUEST
} from "./constants";

export function fetchDocument(match, location) {
  return {
    type: FETCH_DOCUMENT_REQUEST,
    payload: { match, location }
  };
}

export function clearDocument() {
  return {
    type: CLEAR_DOCUMENT_REQUEST
  };
}

export function newDocument(text) {
  return {
    type: NEW_DOCUMENT_REQUEST,
    payload: { text }
  };
}
