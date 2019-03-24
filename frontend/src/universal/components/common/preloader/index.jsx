import styles from "./preloader.scss";
import React from "react";
import PropTypes from "prop-types";
import IconPreloader from "assets/img/icons/icon-preloader.svg";

const propTypes = {};

const defaultProps = {};

export default function Preloader(props) {
  return (
    <div className={styles.preloader}>
      <IconPreloader className={styles.icon} />
    </div>
  );
}

Preloader.propTypes = propTypes;
Preloader.defaultProps = defaultProps;
