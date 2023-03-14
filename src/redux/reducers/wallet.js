import {
  RECEIVE_COIN_SUCCESS,
  REQUEST_COIN_PRICE_SUCCESS,
  REQUEST_EXPENSES,
  REQUEST_COIN_PRICE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
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
        {
          id: action.payload.id,
          value: action.payload.valor,
          description: action.payload.descricao,
          currency: action.payload.moeda,
          method: action.payload.metodo,
          tag: action.payload.despesa,
          exchangeRates: [action.payload.cotacao],
        },
      ],
    };
  case REQUEST_COIN_PRICE:
    return {
      ...state,
    };
  case REQUEST_COIN_PRICE_SUCCESS:
    return {
      ...state,
      total:
        Number(state.total) + Number(action.payload.exchangeRates[action.payload.currency]
          .ask * action.payload.value),
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  default:
    return state;
  }
};

export default wallet;
