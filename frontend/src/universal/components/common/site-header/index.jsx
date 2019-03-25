import styles from "./header.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "assets/img/icons/python.svg";
import NewDocument from "assets/img/icons/new-file.svg";

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
          <div className={styles.title}>{props.title}</div>
        </div>
        <div className={styles.right}>
          <Link to="/new" className={styles.link}>
            <NewDocument className={styles.newDocumentSvg} />
            New Document
          </Link>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
