import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import iconTimer from '../images/iconTimer.svg';
import { countDown, toDisableAnswers, toEnableAnswers } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timeRemaining: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(toEnableAnswers());
  }

  componentDidUpdate() {
    const { timeRemaining } = this.props;
    if (timeRemaining !== 'Acabou o tempo!') {
      this.handleTime();
    }
  }

  handleTime = () => {
    const { dispatch, timeRemaining } = this.props;
    const timeout = 1000;
    if (timeRemaining === '0') {
      dispatch(toDisableAnswers());
      return;
    }
    
    setTimeout(() => {
      const time = (Number(timeRemaining) - 1).toString();
      dispatch(countDown(time))
    }, timeout);
  };

  render() {
    const { timeRemaining } = this.props;

    return (
      <section>
        <img src={ iconTimer } alt="Timer" />
        {`Tempo: ${timeRemaining} ${timeRemaining === 'Acabou o tempo!' ? '' : 's'}`}
      </section>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  ...game,
});

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timeRemaining: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Timer);
