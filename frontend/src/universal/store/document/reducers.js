import { fromJS, Map, List } from "immutable";
import {
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_FAILURE,
  CLEAR_DOCUMENT_REQUEST
} from "./constants";

export const initialState = fromJS({
  document: Map({
    id: null,
    sentences: List([])
  })
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case FETCH_DOCUMENT_SUCCESS:
      return state.set("document", fromJS(payload));
    case CLEAR_DOCUMENT_REQUEST:
    case FETCH_DOCUMENT_FAILURE:
      return state.set("document", initialState.get("document"));
    default:
      return state;
  }
}
