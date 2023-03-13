import getCoinType from '../../services/economyAPI';

// Actions Type

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const REQUEST_COIN = 'REQUEST_COIN';
export const RECEIVE_COIN_SUCCESS = 'RECEIVE_COIN_SUCCESS';
export const REQUEST_COIN_PRICE = 'REQUEST_COIN_PRICE';
export const REQUEST_COIN_PRICE_SUCCESS = 'REQUEST_COIN_PRICE_SUCCESS';
export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';

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
})

export const requestCoinPrice = () => ({
  type: REQUEST_COIN_PRICE,
})

export const receiveCoinPriceSuccess = (despesa) => ({
  type: REQUEST_COIN_PRICE_SUCCESS,
  payload: despesa,
})

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

export const actionFetchCoin = () => fetchCoin; 

