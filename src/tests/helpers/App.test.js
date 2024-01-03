import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from './renderWith';

import Login from '../../pages/Login';
import App from '../../App';

const EMAIL = 'teste@teste.com';

describe('Testa a pagina de Login', () => {
  test('A pagina de login deve renderizar um formulario com os campos email, senha e um botao', () => {
    renderWithRedux(<Login />);

    const emailInput = screen.getByText(/email/i);
    const passwordInput = screen.getByText(/Senha/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Deve ser possível inserir dados no nos Inputs', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    await userEvent.click(emailInput);
    await userEvent.type(emailInput, EMAIL);

    await userEvent.click(passwordInput);
    await userEvent.type(passwordInput, '123456');

    expect(emailInput).toHaveValue(EMAIL);
    expect(passwordInput).toHaveValue('123456');
  });

  test('Deve ser possível inserir dados no nos Inputs', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    await userEvent.click(emailInput);
    await userEvent.type(emailInput, EMAIL);

    await userEvent.click(passwordInput);
    await userEvent.type(passwordInput, '123456');

    await userEvent.click(button);
    expect(screen.getByText(/teste@teste\.com/i)).toBeInTheDocument();
  });
});
