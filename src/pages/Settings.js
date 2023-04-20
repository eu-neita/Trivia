import React, { Component } from 'react';
import logotrivia from '../images/logotrivia.svg';

class Configuracoes extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     categories: [],
  //   };
  // }

  // componentDidMount() {
  //   this.handleCategories();
  // }

  // handleCategories = async () => {
  //   const response = await fetch('https://opentdb.com/api_category.php');
  //   const data = await response.json();
  //   const categoriesResult = data.trivia_categories;
  //   const categoriesItems = categoriesResult.map(({ name }) => name);
  //   this.setState({ categories: categoriesItems });
  // };

  render() {
    // const { categories } = this.state;
    return (
      <div>
        <img src={ logotrivia } alt="logo trivia" />
        <h1 data-testid="settings-title">Configurações</h1>
        <form>
          <select defaultValue="Categoria">
            <option disabled>Categoria</option>
            {/* { categories.map((item) => (<option key={ item }>{item}</option>))} */}
          </select>
          <select defaultValue="Dificuldade">
            <option disabled>Dificuldade</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select defaultValue="Tipo">
            <option disabled>Tipo</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True / False">True / False</option>
          </select>
        </form>
      </div>
    );
  }
}

export default Configuracoes;
