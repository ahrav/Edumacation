import axios from 'axios';
import {
  UPDATE_USER,
  UPDATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  FOLLOW_PROFILE,
  UN_FOLLOW_PROFILE
} from './types';
import { setAlert } from './alert';

export const getCurrentProfile = username => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/profiles/${username}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.errors,
        status: err.response.status
      }
    });
  }
};

export const updateUser = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(formData);
  try {
    const res = await axios.put('/api/v1/users/me/', formData, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Updated Account', 'success'));
    history.push('/');
  } catch (err) {
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;

    if (errors) {
      Object.keys(errors).forEach(key =>
        dispatch(setAlert(errors[key]['image'][0], 'danger'))
      );
    }
  }
};

export const followProfile = username => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/v1/profiles/${username}/follow/`,
      config
    );

    dispatch({
      type: FOLLOW_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};
export const unFollowProfile = username => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/profiles/${username}/follow/`);

    dispatch({
      type: UN_FOLLOW_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};
