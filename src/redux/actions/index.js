// Actions Type

export const INPUT_EMAIL = 'INPUT_EMAIL';

// Actions

export const inputEmail = (email) => ({
  type: INPUT_EMAIL,
  payload: email,
});
