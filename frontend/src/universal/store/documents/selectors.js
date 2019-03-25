import { createSelector } from "reselect";
import { initialState } from "./reducers";

const selectDocuments = state => state.getIn(["documents", "documents"]);

export const getDocuments = createSelector(
  selectDocuments,
  substate => (substate ? substate.toJS() : initialState.get("documents"))
);
