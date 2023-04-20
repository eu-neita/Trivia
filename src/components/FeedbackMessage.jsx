import React, { Component } from 'react';
import { connect } from 'react-redux';

// Remover essa linha e descomentar linha 10 quando tiver o valor do score;
const assertions = 2;
const score = 130;

class FeedbackMessage extends Component {
  render() {
    // const { assertions, score, } = this.props;
    const idealAssertions = 3;
    return (
      <div>
        <p data-testid="feedback-text">
          { assertions < idealAssertions ? 'Could be better' : 'Well Done' }
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

// Quando o score estiver no estado, refatorar essa parte para receber ele.

// const mapStateToProps = (state) => ({
//   assertions: state.scoreReducer.assertions,
//   score: state.scoreReducer.score,
// });

// FeedbackMessage.propTypes = {
//   assertions: PropTypes.number.isRequired,
//   score: PropTypes.number.isRequired,
// };

export default connect()(FeedbackMessage);
