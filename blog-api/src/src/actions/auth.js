import axios from 'axios';
import { LOGIN_USER, LOAD_USER, LOGIN_FAIL } from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

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
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors.error;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
