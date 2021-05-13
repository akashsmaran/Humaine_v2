import { combineReducers } from 'redux';
import alert from './alert';
import forgetPasswordAlert from './forgetPasswordAlert';
import auth from './auth';
import chat from './chat';
import note from './note';
import dashboard from './dashboard';

export default combineReducers({
  alert,
  forgetPasswordAlert,
  auth,
  chat,
  note,
  dashboard
});
