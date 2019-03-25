import styles from "./documents.scss";
import React from "react";
import PropTypes from "prop-types";
import Layout from "components/containers/app/layout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchDocuments } from "store/documents/actions";
import { getDocuments } from "store/documents/selectors";
import DocumentList from "components/presentational/document-list";

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
    documents: getDocuments(state)
  }),
  dispatch => ({
    fetchDocumentsAction: (match, location) =>
      dispatch(fetchDocuments(match, location))
  })
)
export default class Documents extends React.Component {
  componentDidMount() {
    this.props.fetchDocumentsAction(this.props.match, this.props.location);
  }
  render() {
    return (
      <Layout title="Document list">
        <div className={styles.documents}>
          <DocumentList documents={this.props.documents.items} />
        </div>
      </Layout>
    );
  }
}

Documents.propTypes = propTypes;
Documents.defaultProps = defaultProps;
