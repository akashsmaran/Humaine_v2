import {
    GET_CASES,CLOSE_CASE_MODAL
  } from '../actions/types';
  
  const initialState = {
      cases: [],
      casesLoading: true,
      allCasesCompleted : true
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
  
      case GET_CASES:
        return {
            ...state,
            cases: payload,
            casesLoading: false
        }
      case CLOSE_CASE_MODAL :
        return {
          ...state ,
          allCasesCompleted :false
        }
      default:
        return state;
    }
  }
  