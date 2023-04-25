import { combineReducers } from 'redux';
import { PLAYER, SAVE_PERSONAL_URL, SUM_SCORE } from '../actions';

const INITIAL_STATE_PLAYER = {
  gravatarEmail: '',
  gravatarImage: '',
  name: '',
  score: 0,
  assertions: 0,
};

const INITIAL_STATE_GAME = {
  personalUrl: '',
};

const player = (state = INITIAL_STATE_PLAYER, action) => {
  const { score } = state;
  const { type, payload } = action;
  switch (type) {
  case PLAYER:
    return {
      ...state,
      gravatarImage: payload.image,
      gravatarEmail: payload.email,
      name: payload.name,
      score: 0,
    };
  case SUM_SCORE:
    return {
      ...state,
      score: (Number(score) + payload),
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

const game = (state = INITIAL_STATE_GAME, action) => {
  const { type, payload } = action;
  switch (type) {
  case SAVE_PERSONAL_URL:
    return {
      ...state,
      personalUrl: payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player, game });

export default rootReducer;
