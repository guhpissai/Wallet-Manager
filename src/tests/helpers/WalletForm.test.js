import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import { currencies, mockExpense } from './mockData';
import WalletForm from '../../components/WalletForm';

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

describe('Testa o componente WalletForm', () => {
  test('Deve renderizar o componente WalletForm corretamente', () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState: INITIAL_STATE });

    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();

    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();

    const inputPayment = screen.getByTestId('method-input');
    expect(inputPayment).toBeInTheDocument();

    const inputValue = screen.getByTestId('tag-input');
    expect(inputValue).toBeInTheDocument();

    const inputCoin = screen.getByTestId('method-input');
    expect(inputCoin).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(editButton).toBeInTheDocument();

    userEvent.type(inputDescription, 'Hot Dog');
    expect(inputDescription).toHaveValue('Hot Dog');
  });
});
