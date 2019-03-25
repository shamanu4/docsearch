import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const propTypes = {};

const defaultProps = {};

export default function NotFound(props) {
  return <Redirect to="/documents/" />;
}

NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;
