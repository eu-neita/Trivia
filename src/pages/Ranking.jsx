import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const rankingList = JSON.parse(localStorage.getItem('ranking')) || [];
    let userIndex = 0;
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          { rankingList.sort((a, b) => b.score - a.score)
            .map(({ name, score, picture }) => {
              const userElement = (
                <section className="box-points" key={ name }>
                  <img src={ picture } alt={ name } />
                  <h5 data-testid={ `player-name-${userIndex}` }>{name}</h5>
                  <span
                    data-testid={ `player-score-${userIndex}` }
                  >
                    {`${score} pontos`}
                  </span>
                </section>
              );
              userIndex += 1;
              return userElement;
            })}
        </div>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Restart
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
