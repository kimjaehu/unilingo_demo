import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FETCH_ANALYTICS,
  FETCH_CHANNEL
} from '../actions/types';

const initialState = {
  isAuthenticated: null,
  analytics: null,
  channel: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        videos: [],
        analytics: null,
        channel: null
      };
    case FETCH_ANALYTICS:
      return {
        ...state,
        analytics: action.payload
      };
    case FETCH_CHANNEL:
      return {
        ...state,
        channel: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
