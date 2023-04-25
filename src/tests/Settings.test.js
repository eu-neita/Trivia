import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
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

})
