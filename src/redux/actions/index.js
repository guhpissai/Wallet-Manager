import getCoinType from '../../services/economyAPI';

// Actions Type

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const REQUEST_COIN = 'REQUEST_COIN';
export const RECEIVE_COIN_SUCCESS = 'RECEIVE_COIN_SUCCESS';

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

const fetchCoin = async (dispatch) => {
  dispatch(requestCoin());
  const receivedCoins = await getCoinType();
  const arrayCoins = Object.keys(receivedCoins);
  const coins = arrayCoins.filter((moedas) => moedas !== 'USDT');
  dispatch(receiveCoinSuccess(coins));
};

export const actionFetchCoin = () => fetchCoin;
