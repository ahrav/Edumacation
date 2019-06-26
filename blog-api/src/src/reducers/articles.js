import {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERROR
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ARTICLES:
      return {
        ...state,
        articles: payload
      };
    default:
      return state;
  }
};
