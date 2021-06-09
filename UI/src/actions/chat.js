import axios from "axios";
import {
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
  GET_MESSAGES,
  ADD_DIAGNOSIS,
  HIDE_DIAGNOSIS_RESULT,
  FLAG_MESSAGE,
  SHOW_LOADING,
  GET_CASE_INFO,
  IS_BOT_THINKING,
  APPEND_CHAT_MESSAGE,
  MUTE_BOT,
  UN_MUTE_BOT,
  HIDE_CASES_FEEDBACK_MODAL,
  SUBMIT_FEEDBACK,
  RESULTS_BEING_FETCHED,
  RESULTS_FETCH_SUCCESS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

const apiUrl = process.env.API_URL || "http://127.0.0.1:4000/";

export const toggleMute = () => async (dispatch) => {
  dispatch({ type: MUTE_BOT });
};
export const sendMessage = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  dispatch({ type: SHOW_LOADING });
  dispatch({ type: IS_BOT_THINKING });
  dispatch({
    type: APPEND_CHAT_MESSAGE,
    payload: [
      {
        user_id: formData.userId,
        comment: formData.comment,
        id: Math.floor(Math.random() * 1001),
      },
    ],
  });
  try {
    const res = await axios.post("/api/cases/support/add", body, config);
    const user_id = formData.userId;
    const comment = formData.comment;
    const id = Math.floor(Math.random() * 1001);
    console.log(res.data);
    dispatch({
      type: SEND_MESSAGE,
      payload: [res.data],
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      //dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: SEND_MESSAGE_ERROR,
    });
  }
  dispatch({
    type: SEND_MESSAGE_ERROR,
  });
};

export const getMessages = (caseId) => async (dispatch) => {
  try {
    const res = await axios.get("/api/cases/support/" + caseId);
    dispatch({
      type: GET_MESSAGES,
      payload: res.data.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      //dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: SEND_MESSAGE_ERROR,
    });
  }
};

export const getCaseInfo = (caseId) => async (dispatch) => {
  try {
    const res = await axios.get("/api/cases/" + caseId);
    dispatch({
      type: GET_CASE_INFO,
      payload: res.data.data,
    });
  } catch (err) {
    console.log("Error , ::", err, typeof err);
    if (err && err.response) {
      const error = err.response.data;
      if (error) {
        //dispatch(setAlert(error.message, 'danger'));
      }
    }
    dispatch({
      type: SEND_MESSAGE_ERROR,
    });
  }
};

export const addDiagnosis = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(
      "/api/cases/support/diagnosis/add",
      body,
      config
    );
    dispatch({
      type: ADD_DIAGNOSIS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      //dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: SEND_MESSAGE_ERROR,
    });
  }
};

export const stepsSubmitted = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const { caseId, sessionId } = formData;

  try {
    dispatch({
      type: HIDE_CASES_FEEDBACK_MODAL,
      payload: "",
    });
    dispatch({
      type: SUBMIT_FEEDBACK,
      payload: "",
    });
    dispatch({
      type: RESULTS_BEING_FETCHED,
      payload: "",
    });

    const res = await axios.get(
      `${apiUrl}cases/case-result/${caseId}/${sessionId}`,
      config
    );
    console.log("Feed back is now submitted cases result ", res.data);
    dispatch({
      type: RESULTS_FETCH_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log("Error occured while submitting Feed back", err);

    const error = err.response.data;
    if (error) {
      //dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: SEND_MESSAGE_ERROR,
    });
  }
};

export const addMessageFlag = (messageId, isFlag) => async (dispatch) => {
  if (isFlag) {
    isFlag = "true";
  } else {
    isFlag = "false";
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ messageId, isFlag });

  try {
    const res = await axios.post("/api/cases/support/flag", body, config);
    dispatch({
      type: FLAG_MESSAGE,
      payload: messageId,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      //dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: SEND_MESSAGE_ERROR,
    });
  }
};

export const hideDiagnosisResult = () => (dispatch) => {
  dispatch({
    type: HIDE_DIAGNOSIS_RESULT,
  });
};

export const hideCaseFeedBack = () => (dispatch) => {
  dispatch({
    type: HIDE_CASES_FEEDBACK_MODAL,
  });
};
