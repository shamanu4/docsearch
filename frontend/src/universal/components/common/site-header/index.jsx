import styles from "./header.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "assets/img/icons/python.svg";

const propTypes = {};

const defaultProps = {};

export default function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <Logo className={styles.logoSvg} />
          </Link>
        </div>
        <div className={styles.right}>...</div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
