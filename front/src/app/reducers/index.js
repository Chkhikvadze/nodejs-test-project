/* eslint-disable */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import timeReducer from './timeReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  time: timeReducer
});

export default rootReducer;
