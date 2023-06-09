import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { fetchQuest } from '../services/fetchFunc';
import '../Game.css';

class Game extends Component {
  componentDidMount() {
    this.responseVerify();
  }

  responseVerify = async () => {
    const ERROR_CODE = 3;
    const INVALID_REQUEST = 1;
    const fetch = await fetchQuest();
    const data = await fetch.json();
    if (data.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      const { history } = this.props;
      return history.push('/');
    }
    if (data.response_code === INVALID_REQUEST) {
      const { history } = this.props;
      return history.push('/');
    }
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <main>
          <Questions history={ history } />
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
