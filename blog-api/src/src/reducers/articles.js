import {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLE_COMMENTS
} from '../actions/types';

const initialState = {
  articles: [],
  article: null,
  loading: true,
  error: {},
  comments: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ARTICLES:
      return {
        ...state,
        articles: payload
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false
      };
    case GET_ARTICLE_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading: false
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
