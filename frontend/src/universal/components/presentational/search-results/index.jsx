import styles from "./search-results.scss";
import React from "react";
import PropTypes from "prop-types";
import SearchResultItem from "../search-result-item";

const propTypes = {};

const defaultProps = {};

export default function SearchResults(props) {
  const renderSearchResult = function() {
    return props.search.searchResults.map(result => {
      return (
        <li className={styles.item} key={result.id}>
          <SearchResultItem result={result} />
        </li>
      );
    });
  };

  return (
    <div className={styles.searchResults}>
      <p className={styles.header}>Search results:</p>
      {props.search.id ? (
        <ul className={styles.list}>{renderSearchResult()}</ul>
      ) : (
        <div className={styles.empty}>
          <h4>Empty results</h4>
          <p>Select a sentence on the left panel</p>
        </div>
      )}
    </div>
  );
}

SearchResults.propTypes = propTypes;
SearchResults.defaultProps = defaultProps;
