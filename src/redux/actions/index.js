export const PLAYER = 'PLAYER';
export const ENABLE_ANSWERS = 'HABILITE_ANSWERS';
export const DISABLE_ANSWERS = 'DESABILITE_ANSWERS';
export const COUNTDOWN = 'COUNTDOWN';

export const actionPlayer = (player) => ({
  type: PLAYER,
  payload: player,
});

export const toEnableAnswers = () => ({
  type: ENABLE_ANSWERS,
});

export const toDisableAnswers = () => ({
  type: DISABLE_ANSWERS,
});

export const countDown = (payload) => ({
  type: COUNTDOWN,
  payload,
});
