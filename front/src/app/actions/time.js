import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  FETCH_TIMES,
  FETCH_TIME,
  CREATE_TIME,
  CREATE_TIME_SUCCESS,
  CREATE_TIME_FAIL,
  UPDATE_TIME,
  UPDATE_TIME_SUCCESS,
  UPDATE_TIME_FAIL,
  DELETE_TIME,
  DELETE_TIME_SUCCESS,
  DELETE_TIME_FAIL,
  FETCH_REPORT
} from './types/index';

/**
 * Error helper
 */
export function timeError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

/**
 * Fetch all time
 */
export function fetchTimes() {
  const access = JSON.parse(localStorage.getItem('access'));

  return function (dispatch) {
    axios.get(`${API_URL}/time`, { headers: { authorization: access.access_token } })
      .then(response => {
        dispatch({
          type: FETCH_TIMES,
          payload: response.data.data,
        });
      });
  }
}

/**
 * Fetch all time
 */
export function fetchReport(fromDate, toDate) {
  const access = JSON.parse(localStorage.getItem('access'));

  var query = `dateFrom=${fromDate}&dateTo=${toDate}`;

  return function (dispatch) {
    axios.get(`${API_URL}/report?` + query, { headers: { authorization: access.access_token } })
      .then(response => {
        dispatch({
          type: FETCH_REPORT,
          payload: response.data.data,
        });
      });
  }
}



/**
 * Fetch time by id
 */
export function fetchTime(id) {
  const access = JSON.parse(localStorage.getItem('access'));

  return function (dispatch) {
    axios.get(`${API_URL}/time/${id}`, { headers: { authorization: access.access_token } })
      .then(response => {
        dispatch({
          type: FETCH_TIME,
          payload: response.data.data,
        });
      });
  }
}

export function createTime(props) {
  const access = JSON.parse(localStorage.getItem('access'));

  return function (dispatch) {
    var config = { headers: { authorization: access.access_token } };
    axios.post(`${API_URL}/time`, props, config)
      .then((response) => {
        console.log(response)

        dispatch({ type: CREATE_TIME_SUCCESS });

        browserHistory.push(`/times`);
      })
      .catch(response => dispatch(timeError(CREATE_TIME_FAIL, "Something went wrong, try again!" )));
  }
}

export function updateTime(id, props) {
  const access = JSON.parse(localStorage.getItem('access'));
  return function (dispatch) {
    axios({
      url: `${API_URL}/time/${id}`,
      method: 'put',
      headers: { authorization: access.access_token },
      data: props
    }).then((response) => {

        dispatch({ type: UPDATE_TIME_SUCCESS });

        browserHistory.push(`/times`);
      })
      .catch(response => dispatch(timeError(UPDATE_TIME_FAIL, "Something went wrong, try again!" )));
  }
}

export function deleteTime(id) {
  const access = JSON.parse(localStorage.getItem('access'));
  return function (dispatch) {
    axios({
      url: `${API_URL}/time/${id}`,
      method: 'delete',
      headers: { authorization: access.access_token }
    }).then((response) => {
        console.log(response)

        dispatch({ type: DELETE_TIME_SUCCESS, payload :  id});

        browserHistory.push(`/times`);
      })
      .catch(response => dispatch(timeError(DELETE_TIME_FAIL, "Something went wrong, try again!" )));
  }
}

