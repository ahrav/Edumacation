import { APP_LOAD, REDIRECT } from '../actions/types';

const defaultState = {
  appName: 'BloggIn',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: payload ? payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    default:
      return state;
  }
};
