import styles from "./site-footer.scss";
import React from "react";
import { Link } from "react-router-dom";

const propTypes = {};

const defaultProps = {};

export default class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.containerTop}`}>
            <div className={styles.top}>
              <ul className={styles.nav}>This is a footer</ul>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;
