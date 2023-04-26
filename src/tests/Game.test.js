import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initialStateMock, invalidApiReturnMock, invalidRequestMock, successfulApiReturnMock, timerGame } from "./mocks/gameMocks"
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { localStorageRanking } from "./mocks/Mocks";
import App from '../App';

describe('Testes da página Game', () => {
  jest.useFakeTimers();
  test('Testa se ao entrar na página Game com um token inválido, ele é redirecionado para a página de login', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (invalidApiReturnMock),
    })

    renderWithRouterAndRedux(<App />, {}, '/game');

    await waitFor(() => {
      expect(screen.queryByTestId('header-profile-picture')).not.toBeInTheDocument();      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();      
    })
  });

  test('Testa se não houver perguntas suficientes para a configuração desejada, ele é redirecionado para a página de login', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (invalidRequestMock),
    })

   renderWithRouterAndRedux(<App />, {}, '/game');

    await waitFor(() => {
      expect(screen.queryByTestId('header-profile-picture')).not.toBeInTheDocument();      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();      
    })
  });

  test('Testa se ao entrar na página, uma pergunta é renderizada e as opções aparecem corretamente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (successfulApiReturnMock),
    })

    renderWithRouterAndRedux(<App />, initialStateMock, '/game');

    await waitFor(() => {
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    })

    expect(screen.getByTestId('header-profile-picture')).toBeInTheDocument();      
    const playerNameEL = screen.getByTestId('header-player-name');
    expect(playerNameEL.innerHTML).toBe('anita');
    
    expect(screen.getByRole('heading', {
      name: /Entertainment: Video Games/i,
      level: 2,
    })).toBeInTheDocument();

    const questionTextEL = screen.getByTestId('question-text');
    expect(questionTextEL.innerHTML).toBe('Which of these video game engines was made by the company Epic Games?');
    
    const btnTrue = screen.getAllByTestId(/correct-answer/i);
    expect(btnTrue).toHaveLength(1);

    const btnFalse = screen.getAllByTestId(/wrong-answer/i);
    expect(btnFalse).toHaveLength(3);
  });

  test('Testa se ao passar 30 segundos, os botões das respostas são desabilitados', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (successfulApiReturnMock),
    })

    renderWithRouterAndRedux(<App />, initialStateMock, '/game');

    await waitFor(() => {
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    })

    expect(screen.getByText(/tempo/i)).toHaveTextContent('30');

    jest.advanceTimersByTime(30000)

    
    await waitFor(() => {
      expect(screen.getByText(/acabou o tempo/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /unreal/i })).toBeDisabled();
    })
  });

  test('Testa o fluxo de clicar nas questões da página game', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (successfulApiReturnMock),
    })

    localStorage.setItem('ranking', JSON.stringify(localStorageRanking));

    renderWithRouterAndRedux(<App />, initialStateMock, '/game');

    await waitFor(() => {
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    })

    jest.advanceTimersByTime(4000)
    
    await waitFor(() => {
      const firstAnswer = screen.getByRole('button', { name: /unreal/i }); /* 25s */
      userEvent.click(firstAnswer);
      userEvent.click(screen.getByRole('button', { name: /next/i }));
    })

    jest.advanceTimersByTime(5000)

    
    await waitFor(() => {
      const secondAnswer = screen.getByRole('button', { name: '20' }); /* 25 errado */
      userEvent.click(secondAnswer);
      userEvent.click(screen.getByRole('button', { name: /next/i }));
    })

    jest.advanceTimersByTime(10000)

    
    await waitFor(() => {
      const thirdAnswer = screen.getByRole('button', { name: 'WiFi Tears' }); /* 20s */
      userEvent.click(thirdAnswer);
      userEvent.click(screen.getByRole('button', { name: /next/i }));
    })

    jest.advanceTimersByTime(15000)

    
    await waitFor(() => {
      const fourthAnswer = screen.getByRole('button', { name: 'November 5th' }); /* 15s */
      userEvent.click(fourthAnswer);
      userEvent.click(screen.getByRole('button', { name: /next/i }));
    })

    jest.advanceTimersByTime(15000)

    
    await waitFor(() => {
      const fifthAnswer = screen.getByRole('button', { name: 'Wayward Cave' }); /* 15s errado */
      userEvent.click(fifthAnswer);
      userEvent.click(screen.getByRole('button', { name: /next/i }));
    })

    const message = screen.getByText(/well done/i);
    expect(message).toBeInTheDocument();
  });
});