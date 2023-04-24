import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackMessage extends Component {
  render() {
    const { assertions, score } = this.props;
    const idealAssertions = 3;
    return (
      <div>
        <p data-testid="feedback-text">
          { assertions < idealAssertions ? 'Could be better...' : 'Well Done!' }
        </p>

        <p>
          Sua pontuação:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>

        <p>
          Acertos :
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

FeedbackMessage.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackMessage);
