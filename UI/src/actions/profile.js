import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, USER_LOADED } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { loadUser } from "./auth.js";

const apiUrl = "/";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(apiUrl + "api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateProfileInfo = (data) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.put(apiUrl + "users/", data);
    console.log("Its seems like updated profile info", res);

    const resp = await axios.get(apiUrl + "users");
    dispatch({
      type: USER_LOADED,
      payload: resp.data.user,
    });
    // dispatch({
    //     type: GET_PROFILE,
    //     payload: res.data
    // });
  } catch (err) {
    console.log(err);
    // dispatch({
    //     type: PROFILE_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};
