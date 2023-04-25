export const PLAYER = 'PLAYER';
export const SUM_SCORE = 'SUM_SCORE';
export const SAVE_PERSONAL_URL = 'SAVE_PERSONAL_URL';

export const actionPlayer = (player) => ({
  type: PLAYER,
  payload: player,
});

export const sumScore = (payload) => ({
  type: SUM_SCORE,
  payload,
});

export const savePersonalURL = (payload) => ({
  type: SAVE_PERSONAL_URL,
  payload,
});
