import styles from "./document-entry.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {};

const defaultProps = {};

export default function DocumentEntry(props) {
  return (
    <Link
      to={`/document/${props.document.id}`}
      className={styles.documentEntry}
    >
      {props.document.id} - {props.document.title}
    </Link>
  );
}

DocumentEntry.propTypes = propTypes;
DocumentEntry.defaultProps = defaultProps;
