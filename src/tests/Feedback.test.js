import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import App from '../App';
import { pageFeedback } from "./mocks/Mocks";

describe('Testes da página de Feedback', () => {
  it('Verifica se ao entrar na página, todos os componentes aparecem na tela', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback');
    const imageGravatar = screen.getByRole('img', {  name: /gravatar do perfil/i});
    expect(imageGravatar).toBeInTheDocument();

    const playerName =  screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const score =  screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();

    const message = screen.getByText(/could be better\.\.\./i);
    expect(message).toBeInTheDocument();

    const totalHits = screen.getByText(/acertos :/i);
    expect(totalHits).toBeInTheDocument();

    const buttonPlayAgain = screen.getByRole('button', {  name: /play again/i});
    expect(buttonPlayAgain).toBeInTheDocument();

    const buttonRanking = screen.getByRole('button', {  name: /ranking/i});
    expect(buttonRanking).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Play Again, a página é redirecionada para a tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');    

    const buttonPlayAgain = screen.getByRole('button', {  name: /play again/i});

    userEvent.click(buttonPlayAgain);
    const { location } = history;
    expect(location.pathname).toBe('/');  
  });

  it('Verifica se ao clicar no botão Ranking, a página é redirecionada para a tela de Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');    

    const buttonRanking = screen.getByRole('button', {  name: /ranking/i});

    userEvent.click(buttonRanking);
    const { location } = history;
    expect(location.pathname).toBe('/ranking');    
  }); 
  
  it('Verifica se ao clicar no botão Play Again, a página é redirecionada para a tela de login', () => {
    renderWithRouterAndRedux(<App />, pageFeedback, '/feedback');    

    const message = screen.getByText(/well done!/i);
    expect(message).toBeInTheDocument();
  });
})
