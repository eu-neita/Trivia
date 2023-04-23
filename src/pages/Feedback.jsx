import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FeedbackMessage from '../components/FeedbackMessage';

class Feedback extends Component {
  btnRedirect = (param) => {
    const { history } = this.props;
    history.push(param);
  };

  render() {
    return (
      <>
        <Header />
        <FeedbackMessage />

        <button
          type="button"
          onClick={ () => this.btnRedirect('/') }
          data-testid="btn-play-again"
        >
          Play Again
        </button>

        <button
          type="button"
          onClick={ () => this.btnRedirect('/ranking') }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
