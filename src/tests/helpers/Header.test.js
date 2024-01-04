import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWith';
import Header from '../../components/Header';
import { currencies, mockExpense } from './mockData';

const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    currencies,
    expenses: mockExpense,
    editor: false,
    idToEdit: 0,
  },
};

describe('Testa o componente Header', () => {
  test('Deve existir o campo total e o email do usuario', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });
    const user = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(user).toBeInTheDocument();
    expect(user).toHaveTextContent('teste@teste.com');
    expect(total).toBeDefined();
    expect(total).toHaveTextContent('3728.41');
    expect(currency).toBeDefined();
    expect(currency).toHaveTextContent('BRL');
  });
});
