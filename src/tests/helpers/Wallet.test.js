import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import { currencies, mockExpense } from './mockData';
import Wallet from '../../pages/Wallet';

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
  test('Deve ser possivel editar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const inputDescription = screen.getByTestId('description-input');
    // const inputTag = screen.getByTestId('tag-input');
    // const inputPayment = screen.getByTestId('method-input');
    // const inputValue = screen.getByTestId('value-input');
    // const inputCoin = screen.getByTestId('currency-input');

    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
    const editButton = screen.getAllByTestId('edit-btn');

    expect(editButton).toHaveLength(2);

    userEvent.click(editButton[0]);
    expect(screen.getByRole('button', { name: /Editar despesa/i })).toBeInTheDocument();

    userEvent.type(inputDescription, 'Carro');
    userEvent.click(screen.getByRole('button', { name: /Editar despesa/i }));

    expect(await screen.findByRole('cell', { name: /Carro/i })).toBeInTheDocument();
  });

  test('Deve ser possivel adicionar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputDescription = screen.getByTestId('description-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputPayment = screen.getByTestId('method-input');
    const inputValue = screen.getByTestId('value-input');

    // action

    userEvent.type(inputDescription, 'Bicicleta');
    userEvent.selectOptions(inputTag, 'Transporte');
    userEvent.selectOptions(inputPayment, 'Dinheiro');
    userEvent.type(inputValue, '20');

    userEvent.click(screen.getByRole('button', {
      name: /adicionar despesa/i,
    }));

    expect(await screen.findAllByTestId('delete-btn')).toHaveLength(1);
  });
});
