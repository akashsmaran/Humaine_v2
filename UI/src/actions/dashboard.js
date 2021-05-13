import axios from 'axios';
import {
    GET_CASES,
} from './types';

export const getCases = () => async dispatch => {

    try {
        const res = await axios.get('/cases');
        console.log(res);
        dispatch({
            type: GET_CASES,
            payload: res.data.data
        });
        
    } catch (err) {
        const error = err.response.data;
        if (error) {
            //dispatch(setAlert(error.message, 'danger'));
        }
    }
};