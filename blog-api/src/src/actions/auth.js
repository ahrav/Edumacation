import axios from 'axios';
import {
  LOGIN_USER,
  LOAD_USER,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_USER,
  LOGOUT_USER,
  CLEAR_PROFILE,
  APP_LOAD
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert, showModal, hideModal } from './alert';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/users/me/');

    dispatch({
      type: LOAD_USER,
      payload: res.data
    });

    dispatch({
      type: APP_LOAD,
      payload: res.data
    });
  } catch (err) {}
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    email,
    password
  });

  try {
    const res = await axios.post('/api/v1/users/login/', body, config);

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
      error: res.data.errors
    });
  } catch (err) {
    const errors = err.response.data.errors.error;

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error, 'danger')));
      dispatch(
        showModal(
          { open: true, toggle: hideModal, context: errors[0] },
          'alert'
        )
      );
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    username,
    email,
    password
  });

  try {
    const res = await axios.post('/api/v1/users/', body, config);

    dispatch({
      type: REGISTER_USER,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors.error;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });

  dispatch({
    type: LOGOUT_USER
  });
};
