import {
  UPDATE_USER,
  GET_PROFILE,
  PROFILE_ERROR,
  FOLLOW_PROFILE,
  UN_FOLLOW_PROFILE,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER:
    case GET_PROFILE:
    case FOLLOW_PROFILE:
    case UN_FOLLOW_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
};
