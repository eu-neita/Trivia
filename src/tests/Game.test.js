import { screen, waitFor } from "@testing-library/react";
import { initialStateMock, invalidApiReturnMock, successfulApiReturnMock, timerGame } from "./mocks/gameMocks"
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes da página Game', () => {
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
    expect(playerNameEL.innerHTML).toBe('Eduardo');
    
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

  jest.useFakeTimers();
  test('Testa se ao entrar na página, uma pergunta é renderizada e as opções aparecem corretamente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (successfulApiReturnMock),
    })
    jest.spyOn(global, 'setInterval')
    timerGame(() => console.log('Executou depois dos 30s do timer'));

    renderWithRouterAndRedux(<App />, initialStateMock, '/game');

    await waitFor(() => {
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    })
    
    jest.advanceTimersByTime(30000);
    const firstAnswerBtn = screen.getByRole('button', { name: /unreal/i });
  });
});