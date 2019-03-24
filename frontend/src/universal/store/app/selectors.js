import { createSelector } from "reselect";
import { initialState } from "./reducers";

const selectTopics = state => state.getIn(["app", "topics"]);
const selectTopicsHierarchy = state => state.getIn(["app", "topicsHierarchy"]);
const selectGeolocation = state => state.getIn(["app", "geolocation"]);
const selectProjectReviews = state => state.getIn(["app", "projectReviews"]);
const selectPress = state => state.getIn(["app", "press"]);
const selectCategoryManagersList = state =>
  state.getIn(["app", "itemsCategoryManagersList"]);
const selectProjectProposalSuccess = state =>
  state.getIn(["app", "projectProposalSuccess"]);
const selectProjectProposalError = state =>
  state.getIn(["app", "projectProposalError"]);
const selectNewsletterFormSuccess = state =>
  state.getIn(["app", "newsletterFormSuccess"]);
const selectNewsletterFormError = state =>
  state.getIn(["app", "newsletterFormError"]);
const selectB2bContactFormSuccess = state =>
  state.getIn(["app", "b2bContactFormSuccess"]);
const selectB2bContactFormError = state =>
  state.getIn(["app", "b2bContactFormError"]);

export const getTopics = createSelector(
  selectTopics,
  substate => (substate ? substate.toJS() : initialState.get("topics"))
);

export const getTopicsHierarchy = createSelector(
  selectTopicsHierarchy,
  substate => (substate ? substate.toJS() : initialState.get("topicsHierarchy"))
);

export const getGeolocation = createSelector(
  selectGeolocation,
  substate => (substate ? substate.toJS() : initialState.get("geolocation"))
);

export const getProjectReviews = createSelector(
  selectProjectReviews,
  substate => (substate ? substate.toJS() : initialState.get("projectReviews"))
);

export const getPress = createSelector(
  selectPress,
  substate => (substate ? substate.toJS() : initialState.get("press"))
);

export const getCategoryManagersList = createSelector(
  selectCategoryManagersList,
  substate =>
    substate ? substate.toJS() : initialState.get("itemsCategoryManagersList")
);

export const getProjectProposalSuccess = createSelector(
  selectProjectProposalSuccess,
  substate =>
    substate ? substate.toJS() : initialState.get("projectProposalSuccess")
);

export const getProjectProposalError = createSelector(
  selectProjectProposalError,
  substate =>
    substate ? substate.toJS() : initialState.get("projectProposalError")
);

export const getNewsletterFormSuccess = createSelector(
  selectNewsletterFormSuccess,
  substate =>
    substate ? substate.toJS() : initialState.get("newsletterFormSuccess")
);

export const getNewsletterFormError = createSelector(
  selectNewsletterFormError,
  substate =>
    substate ? substate.toJS() : initialState.get("newsletterFormError")
);

export const getB2bContactFormSuccess = createSelector(
  selectB2bContactFormSuccess,
  substate =>
    substate ? substate.toJS() : initialState.get("b2bContactFormSuccess")
);

export const getB2bContactFormError = createSelector(
  selectB2bContactFormError,
  substate =>
    substate ? substate.toJS() : initialState.get("b2bContactFormError")
);
