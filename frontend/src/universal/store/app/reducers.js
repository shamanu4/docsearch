import { fromJS } from "immutable";
import {
  TOPICS_SUCCESS,
  TOPICS_FAILURE,
  TOPICS_HIERARCHY_SUCCESS,
  TOPICS_HIERARCHY_FAILURE,
  GEOLOCATION_SUCCESS,
  GEOLOCATION_FAILURE,
  FETCH_ALL_PROJECTS_REVIEWS_SUCCESS,
  FETCH_ALL_PROJECTS_REVIEWS_FAILURE,
  FETCH_CATEGORY_MANAGERS_SUCCESS,
  FETCH_CATEGORY_MANAGERS_FAILURE,
  POST_PROPOSED_PROJECT_SUCCESS,
  POST_PROPOSED_PROJECT_FAILURE,
  CLEAR_PROPOSED_PROJECT,
  FETCH_PRESS_SUCCESS,
  FETCH_PRESS_FAILURE,
  POST_NEWSLETTER_FORM_SUCCESS,
  POST_NEWSLETTER_FORM_FAILURE,
  CLEAR_NEWSLETTER_FORM,
  POST_B2B_CONTACT_SUCCESS,
  POST_B2B_CONTACT_FAILURE,
  CLEAR_B2B_CONTACT
} from "./constants";

export const initialState = fromJS({
  topics: null,
  topicsHierarchy: null,
  geolocation: null,
  projectReviews: null,
  press: null,
  itemsCategoryManagersList: null,
  projectProposalSuccess: null,
  projectProposalError: null,
  b2bContactFormSuccess: null,
  b2bContactFormError: null,
  newsletterFormSuccess: null,
  newsletterFormError: null
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case TOPICS_SUCCESS:
      return state.set("topics", fromJS(payload));
    case TOPICS_FAILURE:
      return state.set("topics", null);
    case TOPICS_HIERARCHY_SUCCESS:
      return state.set("topicsHierarchy", fromJS(payload));
    case TOPICS_HIERARCHY_FAILURE:
      return state.set("topicsHierarchy", null);
    case GEOLOCATION_SUCCESS:
      return state.set("geolocation", fromJS(payload));
    case GEOLOCATION_FAILURE:
      return state.set("geolocation", null);
    case FETCH_ALL_PROJECTS_REVIEWS_SUCCESS:
      return state.set("projectReviews", fromJS(payload));
    case FETCH_ALL_PROJECTS_REVIEWS_FAILURE:
      return state.set("projectReviews", null);
    case FETCH_PRESS_SUCCESS:
      return state.set("press", fromJS(payload));
    case FETCH_PRESS_FAILURE:
      return state.set("press", null);
    case FETCH_CATEGORY_MANAGERS_SUCCESS:
      return state.set("itemsCategoryManagersList", fromJS(payload));
    case FETCH_CATEGORY_MANAGERS_FAILURE:
      return state.set("itemsCategoryManagersList", null);
    case POST_PROPOSED_PROJECT_SUCCESS:
      return state
        .set("projectProposalSuccess", fromJS(payload))
        .set("projectProposalError", null);
    case POST_PROPOSED_PROJECT_FAILURE:
      return state
        .set("projectProposalSuccess", null)
        .set("projectProposalError", fromJS(error));
    case CLEAR_PROPOSED_PROJECT:
      return state
        .set("projectProposalSuccess", null)
        .set("projectProposalError", null);
    case POST_B2B_CONTACT_SUCCESS:
      return state
        .set("b2bContactFormSuccess", fromJS(payload))
        .set("b2bContactFormError", null);
    case POST_B2B_CONTACT_FAILURE:
      return state
        .set("b2bContactFormSuccess", null)
        .set("b2bContactFormError", fromJS(error));
    case CLEAR_B2B_CONTACT:
      return state
        .set("b2bContactFormSuccess", null)
        .set("b2bContactFormError", null);
    case POST_NEWSLETTER_FORM_SUCCESS:
      return state
        .set("newsletterFormSuccess", fromJS(payload))
        .set("newsletterFormError", null);
    case POST_NEWSLETTER_FORM_FAILURE:
      return state
        .set("newsletterFormSuccess", null)
        .set("newsletterFormError", fromJS(error));
    case CLEAR_NEWSLETTER_FORM:
      return state
        .set("newsletterFormSuccess", null)
        .set("newsletterFormError", null);
    default:
      return state;
  }
}
