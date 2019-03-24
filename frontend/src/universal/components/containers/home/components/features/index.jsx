import styles from "./features.scss";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

export default function Features(props) {
  return (
    <section className={styles.features}>
      <div className={styles.container}>...</div>
    </section>
  );
}

Features.propTypes = propTypes;
Features.defaultProps = defaultProps;
