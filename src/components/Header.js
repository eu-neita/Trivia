import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    image: '',
    score: 0,
  };

  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const image = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      image,
    });
  }

  render() {
    const { image, score } = this.state;
    const { name } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ image }
          alt="imagem X"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,

};

const mapStateToProps = ({ playerReducer }) => ({
  ...playerReducer,
});

export default connect(mapStateToProps)(Header);
