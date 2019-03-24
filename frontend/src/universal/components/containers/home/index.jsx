import styles from "./home.scss";
import React from "react";
import Layout from "components/containers/app/layout";
import Features from "./components/features";

const propTypes = {};

const defaultProps = {};

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <div className={styles.home}>
          <Features />
        </div>
      </Layout>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
