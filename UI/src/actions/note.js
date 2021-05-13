import axios from 'axios';
import {
    GET_NOTES,
    SEND_NOTES_ERROR,
    SAVE_NOTE
} from './types';

export const getNotes = (caseId) => async dispatch => {

    try {
        const res = await axios.get('/cases/support/notes/' + caseId);
        console.log(res);
        dispatch({
            type: GET_NOTES,
            payload: res.data.data
        });
        
    } catch (err) {
        const error = err.response.data;
        if (error) {
            //dispatch(setAlert(error.message, 'danger'));
        }
        dispatch({
            type: SEND_NOTES_ERROR
        });
    }
};

export const saveNote = (formData) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify(formData);

    try {
        const res = await axios.post('/cases/support/notes/add', body, config);
        const note = formData.note;
        const id = Math.floor(Math.random() * 1001)
        
        dispatch({
            type: SAVE_NOTE,
            payload: {note, id},
        });
        
    } catch (err) {
        const error = err.response.data;
        if (error) {
            //dispatch(setAlert(error.message, 'danger'));
        }
        dispatch({
            type: SEND_NOTES_ERROR
        });
    }
};