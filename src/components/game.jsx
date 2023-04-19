import React, { Component } from 'react';

class Game extends Component {
  state = {
    isValidateButton: false,
    isRedirect: false,
  };

  buttonRequestApi = async () => {
    const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL_TOKEN);
    const data = await response.json();
    localStorage.setItem('token', JSON.stringify(data.token));
    // redirect
    if (data.length !== 0) {
      this.setState({ isRedirect: true });
    }
  };

  render() {
    const { isValidateButton } = this.state;
    return (
      <div>
        <button
          disabled={ isValidateButton }
          onClick={ this.buttonRequestApi() }
        >
          Play
        </button>
      </div>
    );
  }
}

export default Game;
