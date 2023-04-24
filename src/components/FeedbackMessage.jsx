import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackMessage extends Component {
  handleLocalStorage = () => {
    const { score, gravatarImage, name } = this.props;
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const userInfo = { name, score, picture: gravatarImage };
    if (!getRanking) {
      localStorage.setItem('ranking', JSON.stringify([userInfo]));
      return;
    }
    const repeatedUser = getRanking.some((user) => user.name === name);
    if (repeatedUser) {
      const newRanking = getRanking.map((user) => (
        user.name === name ? { ...user, score } : user
      ));
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      return;
    }
    const newRanking = [...getRanking, userInfo];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  };

  render() {
    const { assertions, score } = this.props;
    const idealAssertions = 3;
    this.handleLocalStorage();
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

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
  gravatarImage: player.gravatarImage,
  name: player.name,
});

FeedbackMessage.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  gravatarImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedbackMessage);
