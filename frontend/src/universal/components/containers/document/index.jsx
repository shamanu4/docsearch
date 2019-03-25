import styles from "./document.scss";
import React from "react";
import PropTypes from "prop-types";
import Layout from "components/containers/app/layout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchDocument, clearDocument } from "store/document/actions";
import { getDocument } from "store/document/selectors";
import Preloader from "components/common/preloader";
import SentenceList from "components/presentational/sentence-list";

const propTypes = {
  documents: PropTypes.objectOf({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired,
    page: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired
  })
};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    document: getDocument(state)
  }),
  dispatch => ({
    fetchDocumentAction: (match, location) =>
      dispatch(fetchDocument(match, location)),
    clearDocumentAction: () => dispatch(clearDocument())
  })
)
export default class Document extends React.Component {
  componentDidMount() {
    this.props.fetchDocumentAction(this.props.match, this.props.location);
  }
  componentWillUnmount() {
    this.props.clearDocumentAction();
  }
  render() {
    const title = this.props.document.id
      ? `Document #${this.props.document.id}`
      : "Document is loading ...";
    return (
      <Layout title={title}>
        {this.props.document.id ? (
          <div className={styles.document}>
            <SentenceList sentences={this.props.document.sentences} />
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
