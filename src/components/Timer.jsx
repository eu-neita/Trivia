import React, { Component } from 'react';
import iconTimer from '../images/iconTimer.svg';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timeRemaining: 0,
    };
  }

  componentDidMount() {
    this.setState({ timeRemaining: 5 });
  }

  componentDidUpdate() {
    const { timeRemaining } = this.state;
    if (timeRemaining >= 0) {
      this.handleTime();
    }
  }

  handleTime = () => {
    const { timeRemaining } = this.state;
    const timeout = 1000;
    if (timeRemaining === 0) {
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

export default Timer;
