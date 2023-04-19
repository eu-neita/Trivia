import React, { Component } from 'react';
import logotrivia from '../images/logotrivia.svg';

class Configuracoes extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    console.log(data);

  }

  render() {
    return (
      <div>
          <img src={ logotrivia }/>
          <h1 data-testid="settings-title">Configurações</h1>
        <form>
          <select value="" disabled selected>
          <option value="" disabled selected>Categoria</option>
          </select>
          <select>
            <option value="" disabled selected>Dificuldade</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select>
            <option value="" disabled selected>Tipo</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True / False">True / False</option>
          </select>
        </form>
      </div>
    );
  }
}

export default Configuracoes;