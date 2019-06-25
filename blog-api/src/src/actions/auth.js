import axios from 'axios';
import { LOGIN_USER, LOAD_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

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
  } catch (err) {
    console.log(err);
  }
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
    const res = await axios.post('/api/v1/users/login/');

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
      error: res.data.errors
    });
  } catch (err) {
    console.log(err);
  }
};
