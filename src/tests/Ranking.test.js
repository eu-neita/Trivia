import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import App from '../App';
import { localStorageRanking } from "./mocks/Mocks";

describe('Testes da página de Ranking', () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify(localStorageRanking));
  })
  it('Verifica se ao entrar na página, todos os componentes aparecem na tela e se a página é redirecionada para a rota / depois de clicar no botão Restart', () => {    
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');    

    const buttonRestart = screen.getByRole('button', {  name: /restart/i});
    expect(buttonRestart).toBeInTheDocument();

    userEvent.click(buttonRestart);
    const { location } = history;
    expect(location.pathname).toBe('/'); 
  });

  it('Verifica se o array do localStorage é renderizado na tela, mostrando imagem, nome e pontuação dos jogadores', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking'); 

      
    expect(screen.getByRole('img', {  name: /anita/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /anita/i})).toBeInTheDocument();
    expect(screen.getByText(/110 pontos/i)).toBeInTheDocument();

    expect(screen.getByRole('img', {  name: /trybe/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /trybe/i})).toBeInTheDocument();
    expect(screen.getByText(/40/i)).toBeInTheDocument();
  });
})
