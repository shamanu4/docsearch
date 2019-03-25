import styles from "./sentence-list.scss";
import React from "react";
import PropTypes from "prop-types";
import SentenceEntry from "components/presentational/sentence-entry";

const propTypes = {};

const defaultProps = {};

export default function SentenceList(props) {
  const renderSentence = function() {
    return props.sentences.map(sentence => {
      return (
        <li className={styles.item} key={sentence.id}>
          <SentenceEntry sentence={sentence} />
        </li>
      );
    });
  };

  return (
    <div className={styles.sentenceList}>
      {props.sentences && <ul className={styles.list}>{renderSentence()}</ul>}
    </div>
  );
}

SentenceList.propTypes = propTypes;
SentenceList.defaultProps = defaultProps;
