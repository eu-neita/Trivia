import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    enable: true,
  };

  validationLogin = () => {
    const minLength = 1;
    const { email, name } = this.state;
    if (email.includes('@') && email.includes('.com') && name.length >= minLength) {
      this.setState({
        enable: false,
      });
    } else {
      this.setState({
        enable: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationLogin);
  };

  render() {
    const { email, name, enable } = this.state;
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
            disabled={ enable }
            onClick={ this.handleClick }
          >
            Play
          </button>

        </form>
      </main>
    );
  }
}

export default Login;
