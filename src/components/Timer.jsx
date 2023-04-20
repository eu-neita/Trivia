import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import iconTimer from '../images/iconTimer.svg';
import { toDesabiliteAnswers, toHabiliteAnswers } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timeRemaining: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(toHabiliteAnswers());
    this.setState({ timeRemaining: 30 });
  }

  componentDidUpdate() {
    const { timeRemaining } = this.state;
    if (timeRemaining >= 0) {
      this.handleTime();
    }
  }

  handleTime = () => {
    const { dispatch } = this.props;
    const { timeRemaining } = this.state;
    const timeout = 1000;
    if (timeRemaining === 0) {
      dispatch(toDesabiliteAnswers());
      this.setState({ timeRemaining: 'Acabou o tempo!' });
      return;
    }
    setTimeout(() => {
      this.setState({
        timeRemaining: (Number(timeRemaining) - 1),
      });
    }, timeout);
  };

  render() {
    const { timeRemaining } = this.state;

    return (
      <section>
        <img src={ iconTimer } alt="Timer" />
        {`Tempo: ${timeRemaining} ${timeRemaining >= 0 ? 's' : ''}`}
      </section>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
