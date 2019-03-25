import styles from "./app.scss";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Switch, Route } from "react-router-dom";
import Documents from "components/containers/documents";
import Document from "components/containers/document";
import NotFound from "components/containers/not-found";
import NewDocument from "components/containers/new-document";

const propTypes = {};

const defaultProps = {};

const App = props => {
  return (
    <React.Fragment>
      {/* prettier-ignore */}
      <Switch>
        <Route exact path="/new" component={NewDocument} />
        <Route exact path="/documents/:page?" component={Documents} />
        <Route exact path="/document/:documentId" component={Document} />
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
