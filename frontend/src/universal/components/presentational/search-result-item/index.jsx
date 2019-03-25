import styles from "./search-result-item.scss";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const propTypes = {};

const defaultProps = {};

export default function SearchResultItem(props) {
  const renderSimilarity = function(s) {
    return parseInt(s * 10000) / 100;
  };

  const squareCls = classNames({
    [styles.square]: true,
    [styles.deepRed]: props.result.similarity < 0.5,
    [styles.red]:
      props.result.similarity >= 0.5 && props.result.similarity < 0.75,
    [styles.orange]:
      props.result.similarity >= 0.75 && props.result.similarity < 0.85,
    [styles.yellow]:
      props.result.similarity >= 0.85 && props.result.similarity < 0.95,
    [styles.green]: props.result.similarity >= 0.95
  });

  return (
    <div className={styles.item}>
      <div className={squareCls}>
        <div className={styles.documentId}>DOC #{props.result.document_id}</div>
        <div className={styles.similarity}>
          {renderSimilarity(props.result.similarity)}%
        </div>
      </div>
      <div className={styles.text}>{props.result.text}</div>
    </div>
  );
}

SearchResultItem.propTypes = propTypes;
SearchResultItem.defaultProps = defaultProps;
