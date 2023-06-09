import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../images/trivia.png';
import { actionPlayer } from '../redux/actions';
import '../css/login.css';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isValidateButton: true,
  };

  validationLogin = () => {
    const minLength = 1;
    const { email, name } = this.state;
    if (email.includes('@') && email.includes('.com') && name.length >= minLength) {
      this.setState({
        isValidateButton: false,
      });
    } else {
      this.setState({
        isValidateButton: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationLogin);
  };

  buttonRequestApi = async () => {
    const { email, name } = this.state;
    const { history, dispatch } = this.props;
    const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL_TOKEN);
    const data = await response.json();
    const hash = md5(email).toString();
    const image = `https://www.gravatar.com/avatar/${hash}`;
    if (data.response_code === 0) {
      dispatch(actionPlayer({ email, name, image }));
      localStorage.setItem('token', data.token);
      history.push('/game');
    }
  };

  handleSettings = async () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { email, name, isValidateButton } = this.state;

    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <main>
          <form>
            <label htmlFor="email-input">
              Email:
            </label>
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
            <label htmlFor="name-input" id="name-input-la">
              Name:
            </label>
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name-input"
              value={ name }
              onChange={ this.handleChange }
            />
            <button
              data-testid="btn-play"
              type="button"
              disabled={ isValidateButton }
              onClick={ this.buttonRequestApi }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.handleSettings }
            >
              Settings
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
