import styles from "./app.scss";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Switch, Route } from "react-router-dom";
import Home from "components/containers/home";
import NotFound from "components/containers/not-found";

const propTypes = {};

const defaultProps = {};

const App = props => {
  return (
    <React.Fragment>
      {/* prettier-ignore */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

let ExportedApp = App;

if (process.env.NODE_ENV === "development" && module.hot) {
  ExportedApp = hot(App);
}

export default ExportedApp;
