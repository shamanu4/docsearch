import React from "react";
import ReactDOM, { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import configureStore from "store/store";
import App from "components/containers/app";

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const { store, history } = configureStore(preloadedState);

// Root container
const root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === "development" && module.hot) {
  ReactDOM.render(root, document.getElementById("root"));
} else {
  hydrate(root, document.getElementById("root"));
}
