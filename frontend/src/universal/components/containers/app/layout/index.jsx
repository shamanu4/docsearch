import styles from "./layout.scss";
import React from "react";
import PropTypes from "prop-types";
import Header from "components/common/site-header";
import Footer from "components/common/site-footer";

const propTypes = {};

const defaultProps = {};

export default function Layout(props) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.app}>{props.children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
