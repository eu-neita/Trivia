import { combineReducers } from 'redux';
import { COUNTDOWN, DISABLE_ANSWERS, ENABLE_ANSWERS, PLAYER } from '../actions';

const INITIAL_STATE_PLAYER = {
  email: '',
  name: '',
  score: 0,
};

const INITIAL_STATE_GAME = {
  isAnswersDisabled: true,
  timeRemaining: '0',
};

const player = (state = INITIAL_STATE_PLAYER, action) => {
  const { type, payload } = action;
  switch (type) {
  case PLAYER:
    return {
      ...state,
      email: payload.email,
      name: payload.name,
    };
  default:
    return state;
  }
};

const game = (state = INITIAL_STATE_GAME, action) => {
  const { type, payload } = action;
  switch (type) {
  case ENABLE_ANSWERS:
    return {
      ...state,
      isAnswersDisabled: false,
      timeRemaining: '30',
    };
  case DISABLE_ANSWERS:
    return {
      ...state,
      isAnswersDisabled: true,
      timeRemaining: 'Acabou o tempo!',
    };
  case COUNTDOWN:
    return {
      ...state,
      timeRemaining: payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player, game });

export default rootReducer;
