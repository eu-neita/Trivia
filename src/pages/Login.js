import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionPlayer } from '../redux/actions';

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
    // redirect
    if (data.response_code === 0) {
      localStorage.setItem('token', data.token);
      history.push('/game');
    }

    dispatch(actionPlayer({ email, name }));
  };

  render() {
    const { email, name, isValidateButton } = this.state;
    return (
      <main>
        <form>
          <label>
            Email:
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Name:
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isValidateButton }
            onClick={ this.buttonRequestApi }
          >
            Play
          </button>

        </form>
      </main>
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
