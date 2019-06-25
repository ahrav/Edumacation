import {
  LOGIN_USER,
  LOAD_USER,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_USER
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  inProgress: false
};

export default (state = {}, action) => {
  const { type, payload, errors, subtype } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
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
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
