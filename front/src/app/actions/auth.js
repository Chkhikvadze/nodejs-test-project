import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESEND_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from './types/index';

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

/**
 * Sign up
 */
export function signupUser(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/sign_up`, props)
      .then((response) => {
        localStorage.setItem('access', JSON.stringify(response.data.data));

        dispatch({ type: AUTH_USER });

        browserHistory.push(`/times`);
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE, response.data.error)));
  }
}

/**
 * Sign in
 */
export function signinUser(props) {
  const { email, password } = props;

  return function (dispatch) {
    axios.post(`${API_URL}/auth/sign_in`, { email, password })
      .then(response => {
        localStorage.setItem('access', JSON.stringify(response.data.data));

        dispatch({ type: AUTH_USER });

        browserHistory.push('/times');
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }
}

/**
 * Sign out
 */
export function signoutUser() {
  localStorage.clear();

  return {
    type: UNAUTH_USER,
  }
}
