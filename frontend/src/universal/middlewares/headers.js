import { logOut } from "store/auth/actions";
import { getUser } from "store/auth/selectors";

export const checkHeadersMiddleware = store => next => action => {
  const user = getUser(store.getState());
  action.headers &&
    !action.headers.has("Plan") &&
    user &&
    store.dispatch(logOut());
  return next(action);
};
