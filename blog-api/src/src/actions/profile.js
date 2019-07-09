import axios from 'axios';
import {
  UPDATE_USER,
  UPDATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  FOLLOW_PROFILE,
  UN_FOLLOW_PROFILE
} from './types';
import { showModal, hideModal } from './alert';

const profileError = err => dispatch => {
  dispatch({
    type: PROFILE_ERROR,
    payload: {
      msg: err.response.statusText,
      status: err.response.status
    }
  });
};

export const getCurrentProfile = username => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/profiles/${username}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(profileError(err));
  }
};

export const updateUser = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
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
    dispatch(
      showModal(
        {
          open: true,
          toggle: hideModal,
          error: 'Success',
          context: 'Updated Account'
        },
        'alert'
      )
    );
    history.push('/');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response.data);

    if (errors) {
      // Object.keys(errors).forEach(key =>
      //   dispatch(setAlert(errors[key]['image'][0], 'danger'))
      // );
      dispatch(
        showModal(
          {
            open: true,
            toggle: hideModal,
            context: errors['profile']['image'][0],
            error: 'Profile Update Error'
          },
          'alert'
        )
      );
    }

    dispatch(profileError(err));
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
