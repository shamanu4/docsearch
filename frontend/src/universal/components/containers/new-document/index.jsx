import styles from "./new-document.scss";
import React from "react";
import PropTypes from "prop-types";
import Layout from "components/containers/app/layout";
import { connect } from "react-redux";
import { newDocument } from "store/document/actions";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({}),
  dispatch => ({
    newDocumentAction: text => dispatch(newDocument(text))
  })
)
export default class NewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newDocumentAction(this.state.text);
  }

  render() {
    return (
      <Layout title="New Document">
        <div className={styles.newDocument}>
          <form onSubmit={this.handleSubmit}>
            <textarea
              value={this.state.text}
              onChange={this.handleChange}
              className={styles.textarea}
            />
            <input type="submit" value="Submit" className={styles.cta} />
          </form>
        </div>
      </Layout>
    );
  }
}

NewDocument.propTypes = propTypes;
NewDocument.defaultProps = defaultProps;
