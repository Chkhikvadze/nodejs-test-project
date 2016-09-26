import {
  FETCH_TIMES,


  CREATE_TIME,
  CREATE_TIME_SUCCESS,
  CREATE_TIME_FAIL,

  UPDATE_TIME,
  UPDATE_TIME_SUCCESS,
  UPDATE_TIME_FAIL,

  DELETE_TIME,
  DELETE_TIME_SUCCESS,
  DELETE_TIME_FAIL,
  FETCH_TIME,
  FETCH_REPORT
} from '../actions/types/index';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TIMES:
      return {...state, list: action.payload, editTime : null};
    case FETCH_TIME:
      return {...state, editTime: action.payload};
    case FETCH_REPORT:
      return {...state, report: action.payload};
    case CREATE_TIME_SUCCESS:
      return {...state, success: true, error: {}};
    case CREATE_TIME_FAIL:
      return {...state, success: false, error: {time: action.payload}};
    case UPDATE_TIME_SUCCESS:
      return {...state, success: true, error: {}, editTime : null};
    case UPDATE_TIME_FAIL:
      return {...state, success: false, error: {time: action.payload}};
    case DELETE_TIME_SUCCESS:
      return {...state, list: state.list.filter((item)=>{ return item._id != action.payload })};
    case DELETE_TIME_FAIL:
      return {...state, success: false, error: {time: action.payload}};
  }

  return state;
}