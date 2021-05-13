import {
    GET_CASES,
  } from '../actions/types';
  
  const initialState = {
      cases: [],
      casesLoading: true,
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
      
      default:
        return state;
    }
  }
  