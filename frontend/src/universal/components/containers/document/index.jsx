import styles from "./document.scss";
import React from "react";
import PropTypes from "prop-types";
import Layout from "components/containers/app/layout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchDocument,
  clearDocument,
  fetchSearchResults,
  clearSearch
} from "store/document/actions";
import { getDocument, getSearchResults } from "store/document/selectors";
import Preloader from "components/common/preloader";
import SentenceList from "components/presentational/sentence-list";
import SearchResults from "components/presentational/search-results";

const propTypes = {};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    document: getDocument(state),
    search: getSearchResults(state)
  }),
  dispatch => ({
    fetchDocumentAction: (match, location) =>
      dispatch(fetchDocument(match, location)),
    clearDocumentAction: () => dispatch(clearDocument()),
    fetchSearchResultsAction: sentenceId =>
      dispatch(fetchSearchResults(sentenceId)),
    clearSearchAction: () => dispatch(clearSearch())
  })
)
export default class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedSentenceId: null };
    this.handleSentenceSelect = this.handleSentenceSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.props.clearDocumentAction();
      this.props.clearSearchAction();
      this.props.fetchDocumentAction(this.props.match, this.props.location);
    }
  }

  componentDidMount() {
    this.props.fetchDocumentAction(this.props.match, this.props.location);
  }

  componentWillUnmount() {
    this.props.clearDocumentAction();
    this.props.clearSearchAction();
  }

  handleSentenceSelect(sentenceId) {
    this.setState({
      selectedSentenceId: sentenceId
    });
    this.props.fetchSearchResultsAction(sentenceId);
  }

  render() {
    const title = this.props.document.id
      ? `Document #${this.props.document.id}`
      : "Document is loading ...";
    return (
      <Layout title={title}>
        {this.props.document.id ? (
          <div className={styles.document}>
            <SentenceList
              sentences={this.props.document.sentences}
              selectedSentenceId={this.state.selectedSentenceId}
              handleSentenceSelect={this.handleSentenceSelect}
            />
            <SearchResults search={this.props.search} />
          </div>
        ) : (
          <Preloader />
        )}
      </Layout>
    );
  }
}

Document.propTypes = propTypes;
Document.defaultProps = defaultProps;
