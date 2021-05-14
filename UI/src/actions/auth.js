import axios from "axios";
import { setAlert, setForgetPasswordAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FORGET_PASSWORD_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  FORGET_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/users");
    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  console.log(body);
  try {
    const res = await axios.post("/auth/login", body, config);
    // const res = await axios.post("/auth/login", body, config);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser(res));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "danger"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);
  console.log(body);
  try {
    const res = await axios.post("/auth/signup", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert(res.data.message, "success"));
    //dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    if (error) {
      dispatch(setAlert(error.message, "danger"));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Forget Password
export const forgetPassword = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);
  console.log(body);
  try {
    const res = await axios.post("/users/forgot-password", body, config);
    console.log(res.data);
    dispatch({
      type: FORGET_PASSWORD_SUCCESS,
      payload: res.data,
    });

    //dispatch(setAlert(res.data.message, 'success'));
    dispatch(setForgetPasswordAlert(res.data.message, "success"));
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    if (error) {
      dispatch(setAlert(error.message, "danger"));
    }

    dispatch({
      type: FORGET_PASSWORD_FAIL,
    });
  }
};

// Reset Password
export const resetPassword = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);
  console.log(body);
  try {
    const res = await axios.post("/users/reset-password", body, config);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert(res.data.message, "success"));
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    if (error) {
      dispatch(setAlert(error.message, "danger"));
    }
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
