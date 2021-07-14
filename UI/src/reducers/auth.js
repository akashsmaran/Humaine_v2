import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  IMAGE_UPLOADED,
  REMOVE_VERIFICATION_MODAL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  showVerification: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case IMAGE_UPLOADED:
      return {
        ...state,
        user: { ...state.user, image: payload },
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      //localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        //isAuthenticated: true,
        loading: false,
        showVerification: true,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case REGISTER_FAIL:
    case FORGET_PASSWORD_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case REMOVE_VERIFICATION_MODAL:
      //localStorage.setItem('token', payload.token);
      return {
        ...state,
        showVerification: false,
      };

    default:
      return state;
  }
}
