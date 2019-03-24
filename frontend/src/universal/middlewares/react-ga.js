import ReactGA from "react-ga";
import { getUser } from "store/auth/selectors";

const options = {};

const trackPage = page => {
  ReactGA.set({
    page,
    ...options
  });
  ReactGA.pageview(page);
};

let currentPage = "";

export const googleAnalyticsMiddleware = store => next => action => {
  if (action.type === "@@router/LOCATION_CHANGE") {
    const nextPage = `${action.payload.location.pathname}${
      action.payload.location.search
    }`;
    if (currentPage !== nextPage) {
      const user = getUser(store.getState());
      if (user && user.uid) {
        ReactGA.set({ userId: user.uid });
      }
      currentPage = nextPage;
      trackPage(nextPage);
    }
  }

  return next(action);
};
