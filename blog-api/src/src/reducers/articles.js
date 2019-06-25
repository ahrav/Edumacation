import { GET_ALL_ARTICLES, HOME_PAGE_LOADED } from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ARTICLES:
    case HOME_PAGE_LOADED:
      return {
        ...state,
        articles: payload
      };
    default:
      return state;
  }
};
