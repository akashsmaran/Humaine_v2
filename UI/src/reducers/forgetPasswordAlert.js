import {
  SET_FORGET_PASSWORD_ALERT,
  CLEAR_FORGET_PASSWORD_ALERT
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case SET_FORGET_PASSWORD_ALERT:
      return [...state, payload];
    case CLEAR_FORGET_PASSWORD_ALERT:
      return [];
    default:
      return state;
  }
}
