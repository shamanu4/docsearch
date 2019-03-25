import styles from "./document-list.scss";
import React from "react";
import PropTypes from "prop-types";
import DocumentEntry from "components/presentational/document-entry";

const propTypes = {};

const defaultProps = {};

export default function DocumentList(props) {
  const renderDocument = function() {
    return props.documents.map(document => {
      return (
        <li className={styles.item} key={document.id}>
          <DocumentEntry document={document} />
        </li>
      );
    });
  };

  return (
    <div className={styles.documentList}>
      {props.documents && <ul className={styles.list}>{renderDocument()}</ul>}
    </div>
  );
}

DocumentList.propTypes = propTypes;
DocumentList.defaultProps = defaultProps;
