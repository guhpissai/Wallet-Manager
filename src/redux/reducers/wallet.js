import {
  RECEIVE_COIN_SUCCESS,
  REQUEST_COIN_PRICE_SUCCESS,
  REQUEST_EXPENSES,
  REQUEST_COIN_PRICE,
  DELETE_EXPENSES,
  EDIT_EXPENSE,
  EDIT_CLICKED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  edit: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_COIN_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case REQUEST_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: action.payload.id,
          value: action.payload.valor,
          description: action.payload.descricao,
          currency: action.payload.moeda,
          method: action.payload.metodo,
          tag: action.payload.despesa,
          exchangeRates: [action.payload.cotacao] },
      ],
    };
  case REQUEST_COIN_PRICE:
    return {
      ...state,
    };
  case REQUEST_COIN_PRICE_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSES:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id) };
  case EDIT_CLICKED:
    return {
      ...state,
      edit: action.payload,
      idToEdit: action.id,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: action.payload.edit,
      expenses: state.expenses.map((expense) => {
        if (expense.id === Number(action.payload.id)) {
          return { ...expense, ...action.payload };
        } return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
