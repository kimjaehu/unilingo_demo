import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  FETCH_ANALYTICS,
  FETCH_VIDEOS,
  FETCH_PLAYLIST_ID
} from '../actions/types';

const initialState = {
  isAuthenticated: null,
  analytics: null,
  videos: [],
  playlistId: null
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
    case LOGOUT_SUCCESS:
      return {
        ...state,
        videos: [],
        isAuthenticated: false
      };
    case FETCH_ANALYTICS:
      return {
        ...state,
        analytics: action.payload
      };
    case FETCH_VIDEOS:
      return {
        ...state,
        videos: action.payload
      };
    case FETCH_PLAYLIST_ID:
      return {
        ...state,
        playlistId: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
