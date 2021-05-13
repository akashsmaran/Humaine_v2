import {
    GET_NOTES,
    SAVE_NOTE
  } from '../actions/types';
  
  const initialState = {
      notes: [],
      notesLoading: true,
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
  
      case GET_NOTES:
        return {
            ...state,
            notes: payload,
            notesLoading: false
        }
      case SAVE_NOTE:
        return {
          ...state,
          notes: [...state.notes, payload],
        }
      default:
        return state;
    }
  }
  