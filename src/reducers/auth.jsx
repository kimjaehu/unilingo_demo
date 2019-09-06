import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const initialState = {
  isAuthenticated: null,
  analytics: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        videos: []
      };
    default:
      return state;
  }
};

export default authReducer;
