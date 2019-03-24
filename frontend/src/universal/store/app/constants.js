export const BASE_URL = "https://education-ecosystem.com/";

export const TOPICS_REQUEST = "TOPICS_REQUEST";
export const TOPICS_SUCCESS = "TOPICS_SUCCESS";
export const TOPICS_FAILURE = "TOPICS_FAILURE";

export const TOPICS_HIERARCHY_REQUEST = "TOPICS_HIERARCHY_REQUEST";
export const TOPICS_HIERARCHY_SUCCESS = "TOPICS_HIERARCHY_SUCCESS";
export const TOPICS_HIERARCHY_FAILURE = "TOPICS_HIERARCHY_FAILURE";

export const GEOLOCATION_REQUEST = "GEOLOCATION_REQUEST";
export const GEOLOCATION_SUCCESS = "GEOLOCATION_SUCCESS";
export const GEOLOCATION_FAILURE = "GEOLOCATION_FAILURE";

export const FETCH_PRESS_REQUEST = "FETCH_PRESS_REQUEST";
export const FETCH_PRESS_SUCCESS = "FETCH_PRESS_SUCCESS";
export const FETCH_PRESS_FAILURE = "FETCH_PRESS_FAILURE";

export const FETCH_ALL_PROJECTS_REVIEWS_REQUEST =
  "FETCH_ALL_PROJECTS_REVIEWS_REQUEST";
export const FETCH_ALL_PROJECTS_REVIEWS_SUCCESS =
  "FETCH_ALL_PROJECTS_REVIEWS_SUCCESS";
export const FETCH_ALL_PROJECTS_REVIEWS_FAILURE =
  "FETCH_ALL_PROJECTS_REVIEWS_FAILURE";

export const FETCH_CATEGORY_MANAGERS_REQUEST =
  "FETCH_CATEGORY_MANAGERS_REQUEST";
export const FETCH_CATEGORY_MANAGERS_SUCCESS =
  "FETCH_CATEGORY_MANAGERS_SUCCESS";
export const FETCH_CATEGORY_MANAGERS_FAILURE =
  "FETCH_CATEGORY_MANAGERS_FAILURE";

export const POST_PROPOSED_PROJECT_REQUEST = "POST_PROPOSED_PROJECT_REQUEST";
export const POST_PROPOSED_PROJECT_SUCCESS = "POST_PROPOSED_PROJECT_SUCCESS";
export const POST_PROPOSED_PROJECT_FAILURE = "POST_PROPOSED_PROJECT_FAILURE";
export const CLEAR_PROPOSED_PROJECT = "CLEAR_PROPOSED_PROJECT";

export const POST_NEWSLETTER_FORM_REQUEST = "POST_NEWSLETTER_FORM_REQUEST";
export const POST_NEWSLETTER_FORM_SUCCESS = "POST_NEWSLETTER_FORM_SUCCESS";
export const POST_NEWSLETTER_FORM_FAILURE = "POST_NEWSLETTER_FORM_FAILURE";
export const CLEAR_NEWSLETTER_FORM = "CLEAR_NEWSLETTER_FORM";

export const POST_B2B_CONTACT_REQUEST = "POST_B2B_CONTACT_REQUEST";
export const POST_B2B_CONTACT_SUCCESS = "POST_B2B_CONTACT_SUCCESS";
export const POST_B2B_CONTACT_FAILURE = "POST_B2B_CONTACT_FAILURE";
export const CLEAR_B2B_CONTACT = "CLEAR_B2B_CONTACT";

// User roles defined in the system
/* TODO: 
  define creator roles as an object:
    const streamer = "streamer"
    const both = "both"
    const STREAMER_ROLES = {streamer, both}
  and then check user role with `in` operator:
    user.role in STREAMER_ROLES
*/
export const USER_ROLE_SUBSCRIBER = "viewer";
export const USER_ROLE_CREATOR = "streamer";
export const IS_USER_CREATOR_LEGACY = function(role) {
  return role && (role === USER_ROLE_CREATOR || role === "both");
};

// Maximum number of subcategories the user can choose to learn
export const MAX_WANT_TO_LEARN = 9;

// Maximum number of characters the user can enter in <input> field
export const MAX_LENGTH_LIMIT = 100;

// Maximum number of characters the user can enter in <textarea> field
export const MAX_TEXTAREA_LENGTH_LIMIT = 500;
export const MAX_DESC_TEXTAREA_LENGTH_LIMIT = 2500;

// Maximum number of projects per page to paginate
export const MAX_PROJECTS_PER_PAGE = 20;
export const MAX_PROJECT_REQUESTS_PER_PAGE = 10;

// Maximum number of visible pagination links
// i.e. 3 means: 1, 2, 3, ... totalCount
export const MAX_VISIBLE_PAGES = 10;

// Directory filter options
export const DIFFICULTY_FILTER_OPTIONS = [
  { value: 1, label: "Beginner", route: "beginner" },
  { value: 2, label: "Intermediate", route: "intermediate" },
  { value: 3, label: "Expert", route: "expert" }
];
export const ORDERING_FILTER_OPTIONS = [
  { value: "-views_overall", label: "Most Popular", route: "popular" },
  { value: "-videos_last_update,-created", label: "Latest", route: "latest" }
];
export const REQUESTS_ORDERING_FILTER_OPTIONS = [
  { value: "-num_vote_up", label: "Most Popular", route: "popular" },
  { value: "-timestamp,-num_vote_up", label: "Latest", route: "latest" }
];
export const LANGUAGE_FILTER_OPTIONS = [
  {
    value: "en",
    label: "English",
    route: "english",
    url: "/api/v3/languages/en/"
  },
  {
    value: "zh",
    label: "Chinese",
    route: "chinese",
    url: "/api/v3/languages/zh/"
  }
];
export const FAQ_FOR_PRICING_PAGE = 1;
export const FAQ_FOR_SUBSCRIBERS_TOKEN_PAGE = 2;
