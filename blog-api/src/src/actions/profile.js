import axios from 'axios';
import { UPDATE_USER, GET_PROFILE, PROFILE_ERROR } from './types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/users/me/');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.errors.error,
        status: err.response.status
      }
    });
  }
};

export const updateUser = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      '/api/v1/users/me/',
      { users: formData },
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });

    dispatch(setAlert('Updated Account', 'success'));
    history.push('/');
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors.error;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')));
    }
  }
};
