import {
    RESULTS_FETCH_SUCCESS,
    RESULTS_BEING_FETCHED
  } from '../actions/types';
  
  const initialState = {
      attempt: 0,
      loading : true,
      details : {},
      diagnosis_results : {},
      steps_results : {},
      details : {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
  
      case RESULTS_FETCH_SUCCESS:
        return {
            ...state,
            attempt : payload.attempt , 
            loading : false,
            diagnosis_results : payload.diagnosis_results ,
            steps_results : payload.steps_results ,
            details : payload.details[0]
        }
      case RESULTS_BEING_FETCHED:
        return {
          ...state,
          loading: true 
        }
      default:
        return state;
    }
  }
  