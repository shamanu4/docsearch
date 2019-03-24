import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Preloader from "components/common/preloader";
import { getUser } from "store/auth/selectors";

const withAuthentication = WrappedComponent => {
  class Authenticate extends React.Component {
    render() {
      const { user } = this.props;

      if (!user && user !== null) {
        return <Preloader />;
      }

      if (user === null) {
        return <Redirect to="/login" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      user: getUser(state)
    };
  };

  return connect(mapStateToProps)(Authenticate);
};

export default withAuthentication;
