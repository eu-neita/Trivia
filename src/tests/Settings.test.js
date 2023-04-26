import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import { tokenMock } from "./mocks/Mocks";
import App from '../App';

describe('Testes da página de Settings', () => {

it('Ao clicar no botão, a página é redirecionada para a /settings ', () => {    
  const { history } = renderWithRouterAndRedux(<App />);    

  const buttonSettings = screen.getByRole('button', {  name: /settings/i});
  expect(buttonSettings).toBeInTheDocument();

  userEvent.click(buttonSettings);
  const { location } = history;
  expect(location.pathname).toBe('/settings'); 
});

it('Verifica se a página renderiza o ', () => {    
  const { history } = renderWithRouterAndRedux(<App />, {}, '/settings');  

  const settingsTitleEl = screen.getByRole('heading', {name: /configurações/i});
  expect(settingsTitleEl).toBeInTheDocument();

  const applyBtnEl = screen.getByRole('button', {name: /aplicar/i});
  expect(applyBtnEl).toBeInTheDocument();

  userEvent.click(applyBtnEl);
  const { location } = history;
  expect(location.pathname).toBe('/'); 
});

it('Verifica se ao escolher Categoria, Dificuldade e Tipo nos campos selected... ', async () => {   
  const { getByTestId, history } = renderWithRouterAndRedux(<App />, {}, '/settings');
  
  const optionsCategory = getByTestId('Categoria');
  fireEvent.change(optionsCategory, { target: { value: 9 } });
  expect(optionsCategory.value).toBe('9');
  
  const optionsDifficulty = getByTestId('Dificuldade');
  fireEvent.change(optionsDifficulty, { target: { value: 'easy' } });
  expect(optionsDifficulty.value).toBe('easy');

  const optionsType = getByTestId('Tipo');  
  fireEvent.change(optionsType, { target: { value: 'boolean' } });
  expect(optionsType.value).toBe('boolean');

  userEvent.click(screen.getByRole('button', /aplicar/i));

  const inputEmailEl = screen.getByLabelText(/email/i);
  const inputNameEl = screen.getByLabelText(/name/i);
  const playBtn = screen.getByRole('button', { name: /play/i });

  userEvent.type(inputNameEl, 'João');
  userEvent.type(inputEmailEl, 'joao.teste@hotmail.com');
  userEvent.click(playBtn);

  localStorage.setItem('token', tokenMock.token);

  await waitFor(() => {
    expect(history.location.pathname).toBe('/game');
  });
});
})
