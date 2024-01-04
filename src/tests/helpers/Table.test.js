import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import { currencies, mockExpense } from './mockData';
import Table from '../../components/Table';

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

describe('Testa o componente Table', () => {
  test('Deve preencher os campos corretamente', () => {
    renderWithRouterAndRedux(<Table />, { initialState: INITIAL_STATE });

    const deleteButton = screen.getAllByTestId('delete-btn');
    const editButton = screen.getAllByTestId('edit-btn');

    expect(deleteButton).toHaveLength(2);
    expect(editButton).toHaveLength(2);

    userEvent.click(deleteButton[0]);

    expect(screen.getAllByTestId('delete-btn')).toHaveLength(1);
    expect(screen.getAllByTestId('edit-btn')).toHaveLength(1);
  });
});
