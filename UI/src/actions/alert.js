import uuid from 'uuid';
import {SET_ALERT, REMOVE_ALERT, CLEAR_ALERT, SET_FORGET_PASSWORD_ALERT, CLEAR_FORGET_PASSWORD_ALERT} from './types';

export const setAlert = (msg, alertType, timeout = 0) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  if(timeout > 0) {
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  }
};

export const setForgetPasswordAlert = (msg, alertType, timeout = 0) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_FORGET_PASSWORD_ALERT,
    payload: { msg, alertType, id }
  });
};

export const clearForgetPasswordAlert = () => dispatch => {
  dispatch({ type: CLEAR_FORGET_PASSWORD_ALERT })
};



export const removeAlert = () => dispatch => {
  dispatch({ type: REMOVE_ALERT })
};

export const clearAlert = () => dispatch => {
  dispatch({ type: CLEAR_ALERT })
};
