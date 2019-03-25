import { fromJS, Map, List } from "immutable";
import {
  FETCH_DOCUMENTS_LIST_SUCCESS,
  FETCH_DOCUMENTS_LIST_FAILURE
} from "./constants";

export const initialState = fromJS({
  documents: Map({
    page: 1,
    last_page: 1,
    total: 0,
    items: List([])
  })
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case FETCH_DOCUMENTS_LIST_SUCCESS:
      return state.set("documents", fromJS(payload));
    case FETCH_DOCUMENTS_LIST_FAILURE:
      return state.set("documents", initialState.get("documents"));
    default:
      return state;
  }
}
