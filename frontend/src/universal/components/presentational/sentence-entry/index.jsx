import styles from "./sentence-entry.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {};

const defaultProps = {};

export default function SentenceEntry(props) {
  return (
    <Link
      to={`/sentence/${props.sentence.id}`}
      className={styles.sentenceEntry}
    >
      {props.sentence.text}
    </Link>
  );
}

SentenceEntry.propTypes = propTypes;
SentenceEntry.defaultProps = defaultProps;
