import { createSelector } from "reselect";

const selectRouterLocation = state => state.getIn(["router", "location"]);

export const getRouterLocation = createSelector(
  selectRouterLocation,
  substate => (substate ? substate.toJS() : null)
);
