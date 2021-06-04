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
} from "./types";

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
    const error = err.response.data;
    if (error) {
      //dispatch(setAlert(error.message, 'danger'));
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
