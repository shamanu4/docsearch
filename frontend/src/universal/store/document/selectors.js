import { createSelector } from "reselect";
import { initialState } from "./reducers";

const selectDocument = state => state.getIn(["document", "document"]);

export const getDocument = createSelector(
  selectDocument,
  substate => (substate ? substate.toJS() : initialState.get("document"))
);

const selectSearchResults = state => state.getIn(["document", "search"]);

export const getSearchResults = createSelector(
  selectSearchResults,
  substate => (substate ? substate.toJS() : initialState.get("search"))
);
