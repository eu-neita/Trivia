import { combineReducers } from 'redux';
import { DESABILITE_ANSWERS, HABILITE_ANSWERS, PLAYER } from '../actions';

const INITIAL_STATE_PLAYER = {
  email: '',
  name: '',
};

const INITIAL_STATE_GAME = {
  isAnswersDisabled: true,
};

const player = (state = INITIAL_STATE_PLAYER, action) => {
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  default:
    return state;
  }
};

const game = (state = INITIAL_STATE_GAME, action) => {
  switch (action.type) {
  case HABILITE_ANSWERS:
    return {
      ...state,
      isAnswersDisabled: false,
    };
  case DESABILITE_ANSWERS:
    return {
      ...state,
      isAnswersDisabled: true,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player, game });

export default rootReducer;
