import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logotrivia from '../images/logotrivia.svg';
import categoriesOp from '../services/categoriesOp.json';
import { savePersonalURL } from '../redux/actions';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      category: 'any',
      difficulty: 'any',
      type: 'any',
    };
  }

  handlePersonalSettings = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleApplyBtn = () => {
    const { category, difficulty, type } = this.state;
    const { dispatch, history } = this.props;
    const categoryKey = category === 'any' ? '' : `&category=${category}`;
    const difficultyKey = difficulty === 'any' ? '' : `&difficulty=${difficulty}`;
    const typeKey = type === 'any' ? '' : `&type=${type}`;
    const personalURL = categoryKey + difficultyKey + typeKey;
    dispatch(savePersonalURL(personalURL));
    history.push('/');
  };

  render() {
    const categoriesItems = categoriesOp;
    return (
      <div>
        <img src={ logotrivia } alt="logo trivia" />
        <h1 data-testid="settings-title">Configurações</h1>
        <form>
          <select
            defaultValue="Categoria"
            name="category"
            data-testid="Categoria"
            onChange={ this.handlePersonalSettings }
          >
            <option disabled>Categoria</option>
            { categoriesItems.map(({ id, name }) => (
              <option key={ id } value={ id }>{name}</option>
            ))}
          </select>
          <select
            defaultValue="Dificuldade"
            data-testid="Dificuldade"
            name="difficulty"
            onChange={ this.handlePersonalSettings }
          >
            <option disabled>Dificuldade</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            defaultValue="Tipo"
            data-testid="Tipo"
            name="type"
            onChange={ this.handlePersonalSettings }
          >
            <option disabled>Tipo</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <button type="button" onClick={ this.handleApplyBtn }>Aplicar</button>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Settings);
