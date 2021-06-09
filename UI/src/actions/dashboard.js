import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_CASES, IMAGE_UPLOADED, CLOSE_CASE_MODAL } from "./types";

const apiUrl = process.env.API_URL || "http://127.0.0.1:4000/";

export const getCases = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cases");
    console.log(res);
    dispatch({
      type: GET_CASES,
      payload: res.data.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      //dispatch(setAlert(error.message, 'danger'));
    }
  }
};

export const feedbackSubmitted = (e) => async (dispatch) => {
  try {
    console.log("File input change", e.target.files);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    //Lets upload the file to the server
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    let result = await axios.post(
      apiUrl + "users/upload-profile-image",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    let imageUrl = result.data.image_url;
    dispatch({
      type: IMAGE_UPLOADED,
      payload: imageUrl,
    });
  } catch (err) {
    console.log("File upload error", err);
  } finally {
  }
};
export const handleFileUpload = (e) => async (dispatch) => {
  try {
    console.log("File input change", e.target.files);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    //Lets upload the file to the server
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    let result = await axios.post(
      apiUrl + "users/upload-profile-image",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    let imageUrl = result.data.image_url;
    dispatch({
      type: IMAGE_UPLOADED,
      payload: imageUrl,
    });
  } catch (err) {
    console.log("File upload error", err);
  } finally {
  }
};
export const handleCloseCaseCompleted = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    //Lets upload the file to the server
    // let result = await axios.post(apiUrl+'users/upload-profile-image', formData, {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // })
    // let imageUrl = result.data.image_url;
    dispatch({
      type: CLOSE_CASE_MODAL,
      payload: "",
    });
  } catch (err) {
    console.log("File upload error", err);
  } finally {
  }
};
