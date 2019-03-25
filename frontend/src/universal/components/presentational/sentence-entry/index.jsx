import styles from "./sentence-entry.scss";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const propTypes = {};

const defaultProps = {};

export default function SentenceEntry(props) {
  const sentenceCls = classNames({
    [styles.sentenceEntry]: true,
    [styles.sentenceEntrySelected]: props.isSelected
  });
  return (
    <div
      className={sentenceCls}
      onClick={() => props.handleSelect(props.sentence.id)}
    >
      {props.sentence.text}
    </div>
  );
}

SentenceEntry.propTypes = propTypes;
SentenceEntry.defaultProps = defaultProps;
