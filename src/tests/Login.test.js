import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import App from '../App';
import { errorTokenMock, tokenMock } from "./mocks/Mocks";

describe('Testes da página de App', () => {
  test('Verifica se ao entrar na página, todos os componentes aparecem na tela', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /configurações/i })).toBeInTheDocument();
  });

  test('Verifica se ao digitar corretamente os campos, os botões ficam habilitados', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmailEl = screen.getByLabelText(/email/i);
    const inputNameEl = screen.getByLabelText(/name/i);
    const playBtn = screen.getByRole('button', { name: /play/i });
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    
    expect(playBtn).toBeDisabled();

    userEvent.type(inputNameEl, 'João');
    userEvent.type(inputEmailEl, 'joao.teste@hotmail.com');

    expect(playBtn).toBeEnabled();
  });

  test('Verifica se ao clicar no botão de play, é renderizado para a rota /game', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (tokenMock),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmailEl = screen.getByLabelText(/email/i);
    const inputNameEl = screen.getByLabelText(/name/i);
    const playBtn = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputNameEl, 'João');
    userEvent.type(inputEmailEl, 'joao.teste@hotmail.com');
    userEvent.click(playBtn);

    localStorage.setItem('token', tokenMock.token);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    })
  });

  test('Verifica se quando o response_code for diferente de 0, ele não faz nada', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (errorTokenMock),
    });
    
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmailEl = screen.getByLabelText(/email/i);
    const inputNameEl = screen.getByLabelText(/name/i);
    const playBtn = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputNameEl, 'João');
    userEvent.type(inputEmailEl, 'joao.teste@hotmail.com');
    userEvent.click(playBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    })
  });

  test('Verifica se ao clicar no botão de configurações, aparece 3 selects e um botão de jogar', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputNameEl = screen.getByLabelText(/name/i);
    const inputEmailEl = screen.getByLabelText(/email/i);
    const configBtn = screen.getByRole('button', { name: /settings/i });

    userEvent.type(inputNameEl, 'João');
    userEvent.type(inputEmailEl, 'joao.teste@hotmail.com');
    userEvent.click(configBtn);
    
    const selects = screen.getAllByRole('combobox'); 
    expect(selects[0].value).toBe('Categoria');
    expect(selects[1].value).toBe('Dificuldade');
    expect(selects[2].value).toBe('Tipo');
    expect(screen.getByRole('heading', { level: 1, name: /configurações/i })).toBeInTheDocument();
  });

  test('Testa o tema da página', () => {
    renderWithRouterAndRedux(<App />);
    const themeMode = screen.getByTestId('theme');
    expect(document.body.className).toBe('Darkmode');
    userEvent.click(themeMode);
    expect(document.body.className).toBe('LigthMode');
    userEvent.click(themeMode);
    expect(document.body.className).toBe('Darkmode');
  });
})