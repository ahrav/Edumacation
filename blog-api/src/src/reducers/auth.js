import {
  LOGIN_USER,
  LOAD_USER,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_USER,
  LOGOUT_USER,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  inProgress: false
};

export default (state = initialState, action) => {
  const { type, payload, errors, subtype } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: payload.token,
        loading: false,
        user: payload
      };
    case LOGIN_USER:
    case REGISTER_USER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        inProgress: false,
        errors: errors ? payload.errors : null
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};
