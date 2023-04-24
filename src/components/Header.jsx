import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score, gravatarImage } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarImage }
          alt="imagem X"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Header);
