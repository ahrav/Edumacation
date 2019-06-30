import {
  LOGIN_USER,
  LOAD_USER,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_USER,
  LOGOUT_USER,
  UPDATE_USER
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: null,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case LOGIN_USER:
    case LOAD_USER:
    case REGISTER_USER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        errors: payload.errors || null
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
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        errors: payload.errors || null
      };
    default:
      return state;
  }
};
