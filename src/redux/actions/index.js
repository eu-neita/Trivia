export const PLAYER = 'PLAYER';
export const HABILITE_ANSWERS = 'HABILITE_ANSWERS';
export const DESABILITE_ANSWERS = 'DESABILITE_ANSWERS';

export const actionPlayer = (player) => ({
  type: PLAYER,
  payload: player,
});

export const toHabiliteAnswers = () => ({
  type: HABILITE_ANSWERS,
});

export const toDesabiliteAnswers = () => ({
  type: DESABILITE_ANSWERS,
});
