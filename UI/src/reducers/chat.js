import {
    GET_MESSAGES,
    SEND_MESSAGE,
    ADD_DIAGNOSIS,
    HIDE_DIAGNOSIS_RESULT,
    FLAG_MESSAGE,
    SHOW_LOADING,
    GET_CASE_INFO,
    IS_BOT_THINKING,
    SEND_MESSAGE_ERROR,
    APPEND_CHAT_MESSAGE
  } from '../actions/types';
  
  const initialState = {
      messages: [],
      chatLoading: true,
      showLoading: false,
      showDiagnosisResult: false,
      caseInfo: null,
      isBotThinking: false
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
  
      case GET_MESSAGES:
        return {
            ...state,
            messages: payload,
            chatLoading: false
        }
      case GET_CASE_INFO:
        return {
            ...state,
            caseInfo: payload,
            chatLoading: false
        }
      case SEND_MESSAGE:
        return {
            ...state,
            messages: state.messages.concat(payload),
            showLoading: false,
            isBotThinking: false
        }
      case APPEND_CHAT_MESSAGE:
        return {
          ...state,
          messages: state.messages.concat(payload),
        }
      case FLAG_MESSAGE:
        return {
          ...state,
          messages: state.messages.map(message => {
            if(message.id == payload) {
              message.is_flagged = true;   
            }
            return message;
          })
        }
      
      case ADD_DIAGNOSIS:
        return {
          ...state,
          showDiagnosisResult: true
        }
      case HIDE_DIAGNOSIS_RESULT:
        return {
          ...state,
          showDiagnosisResult: false
        }
      case SHOW_LOADING:
        return {
          ...state,
          showLoading: true
        }
      case IS_BOT_THINKING:
        return {
          ...state,
          isBotThinking: true
        }
      case SEND_MESSAGE_ERROR:
        return {
          ...state,
          isBotThinking: false
        }
      default:
        return state;
    }
  }
  