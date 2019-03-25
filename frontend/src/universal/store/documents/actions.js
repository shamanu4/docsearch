import { FETCH_DOCUMENTS_LIST_REQUEST } from "./constants";

export function fetchDocuments(match, location) {
  return {
    type: FETCH_DOCUMENTS_LIST_REQUEST,
    payload: { match, location }
  };
}
