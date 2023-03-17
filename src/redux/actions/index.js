import getCoinType from '../../services/economyAPI';

// Actions Type

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const REQUEST_COIN = 'REQUEST_COIN';
export const RECEIVE_COIN_SUCCESS = 'RECEIVE_COIN_SUCCESS';
export const REQUEST_COIN_PRICE = 'REQUEST_COIN_PRICE';
export const REQUEST_COIN_PRICE_SUCCESS = 'REQUEST_COIN_PRICE_SUCCESS';
export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_CLICKED = 'EDIT_CLICKE';

// Actions

export const inputEmail = (email) => ({
  type: INPUT_EMAIL,
  payload: email,
});

const requestCoin = () => ({
  type: REQUEST_COIN,
});

const receiveCoinSuccess = (coins) => ({
  type: RECEIVE_COIN_SUCCESS,
  payload: coins,
});

export const requestExpenses = (expenses) => ({
  type: REQUEST_EXPENSES,
  payload: expenses,
});

export const requestCoinPrice = () => ({
  type: REQUEST_COIN_PRICE,
});

export const receiveCoinPriceSuccess = (despesa) => ({
  type: REQUEST_COIN_PRICE_SUCCESS,
  payload: despesa,
});

const fetchCoin = async (dispatch) => {
  dispatch(requestCoin());
  const receivedCoins = await getCoinType();
  const arrayCoins = Object.keys(receivedCoins);
  const coins = arrayCoins.filter((moedas) => moedas !== 'USDT');
  dispatch(receiveCoinSuccess(coins));
};

export const fetchCoinsPrice = (despesas) => async (dispatch) => {
  dispatch(requestCoinPrice());
  const receivedCoinsPrice = await getCoinType();
  dispatch(receiveCoinPriceSuccess({
    ...despesas,
    exchangeRates: receivedCoinsPrice,
  }));
};

export const deleteExpense = (id, value) => ({
  type: DELETE_EXPENSES,
  id,
  value,
});

export const editClick = (isClick, id) => ({
  type: EDIT_CLICKED,
  payload: isClick,
  id,
});

export const editExpense = (expenseEdited) => ({
  type: EDIT_EXPENSE,
  payload: expenseEdited,
});

export const actionFetchCoin = () => fetchCoin;
