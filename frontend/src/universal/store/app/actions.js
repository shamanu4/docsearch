import {
  TOPICS_REQUEST,
  TOPICS_HIERARCHY_REQUEST,
  FETCH_ALL_PROJECTS_REVIEWS_REQUEST,
  FETCH_CATEGORY_MANAGERS_REQUEST,
  POST_PROPOSED_PROJECT_REQUEST,
  CLEAR_PROPOSED_PROJECT,
  FETCH_PRESS_REQUEST,
  POST_NEWSLETTER_FORM_REQUEST,
  CLEAR_NEWSLETTER_FORM,
  POST_B2B_CONTACT_REQUEST,
  CLEAR_B2B_CONTACT
} from "store/app/constants";

export function fetchTopics() {
  return {
    type: TOPICS_REQUEST
  };
}

export function fetchTopicsHierarchy() {
  return {
    type: TOPICS_HIERARCHY_REQUEST
  };
}

export function fetchProjectReviews() {
  return {
    type: FETCH_ALL_PROJECTS_REVIEWS_REQUEST
  };
}

export function fetchCategoryManagers() {
  return {
    type: FETCH_CATEGORY_MANAGERS_REQUEST
  };
}

export function postProposedProject(
  firstName,
  lastName,
  email,
  topic,
  language,
  description,
  captcha
) {
  return {
    type: POST_PROPOSED_PROJECT_REQUEST,
    payload: {
      firstName,
      lastName,
      email,
      topic,
      language,
      description,
      captcha
    }
  };
}

export function clearProposedProject() {
  return {
    type: CLEAR_PROPOSED_PROJECT
  };
}

export function postB2BContactForm(
  company,
  person,
  email,
  message,
  packageName,
  captcha
) {
  return {
    type: POST_B2B_CONTACT_REQUEST,
    payload: {
      company,
      person,
      email,
      message,
      packageName,
      captcha
    }
  };
}

export function clearB2BContactForm() {
  return {
    type: CLEAR_B2B_CONTACT
  };
}

export function postNewsletterForm(email) {
  return {
    type: POST_NEWSLETTER_FORM_REQUEST,
    payload: { email }
  };
}

export function clearNewsletterForm() {
  return {
    type: CLEAR_NEWSLETTER_FORM
  };
}

export function fetchPress() {
  return {
    type: FETCH_PRESS_REQUEST
  };
}
