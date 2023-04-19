
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import Login from '../pages/Login';

describe('Testes da página de Login', () => {
  test('Verifica se ao entrar na página, todos os componentes aparecem na tela', () => {
    renderWithRouterAndRedux(<Login />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /configurações/i })).toBeInTheDocument();
  });

  test('Verifica se ao digitar corretamente os campos, os botões ficam habilitados', () => {
    renderWithRouterAndRedux(<Login />);

    const inputNameEl = screen.getByLabelText(/name/i)
    const inputEmailEl = screen.getByLabelText(/email/i);
    const configBtn = screen.getByRole('button', { name: /play/i });
    const playBtn = screen.getByRole('button', { name: /configurações/i });
    
    expect(configBtn).toBeDisabled();
    expect(playBtn).toBeDisabled();

    userEvent.type(inputNameEl, 'João');
    userEvent.type(inputEmailEl, 'joao.teste@hotmail.com');

    expect(configBtn).toBeEnabled();
    expect(playBtn).toBeEnabled();
  });

  test('Verifica se ao clicar no botão de play, é renderizado para a rota /game', () => {
    const navigator = renderWithRouterAndRedux(<Login />);

    const inputNameEl = screen.getByLabelText(/name/i);
    const inputEmailEl = screen.getByLabelText(/email/i);
    const playBtn = screen.getByRole('button', { name: /configurações/i });

    userEvent.type(inputNameEl, 'João');
    userEvent.type(inputEmailEl, 'joao.teste@hotmail.com');
    userEvent.click(playBtn);

    const { history: { location: { pathname } } } = navigator;
    expect(pathname).toBe('/game');
  });

  test('Verifica se ao clicar no botão de configurações, aparece 3 selects e um botão de jogar', () => {
    const navigator = renderWithRouterAndRedux(<Login />);

    const inputNameEl = screen.getByLabelText(/name/i);
    const inputEmailEl = screen.getByLabelText(/email/i);
    const configBtn = screen.getByRole('button', { name: /configurações/i });

    userEvent.type(inputNameEl, 'João');
    userEvent.type(inputEmailEl, 'joao.teste@hotmail.com');
    userEvent.click(configBtn);
    
    const selects = screen.getAllByRole('combobox'); 
    expect(selects[0].value).toBe('Categoria');
    expect(selects[1].value).toBe('Dificuldade');
    expect(selects[2].value).toBe('Tipo');

    const playBtn = screen.getByRole('button', { name: /jogar/i });
    expect(playBtn).toBeInTheDocument();
    userEvent.click(playBtn)

    const { history: { location: { pathname } } } = navigator;
    expect(pathname).toBe('/game');
  });
})