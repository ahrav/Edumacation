import {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLE_COMMENTS,
  DELETE_ARTICLE,
  ADD_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERROR
} from '../actions/types';

const initialState = {
  articles: [],
  article: null,
  loading: true,
  error: {}
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
        article: { ...state.article, comments: payload },
        loading: false
      };
    case ARTICLE_ERROR:
    case COMMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        article: {
          ...state.article,
          comments: state.article.comments.filter(
            comment => comment.id !== payload
          )
        },
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        article: {
          ...state.article,
          comments: [payload].concat(state.article.comments)
        }
      };
    default:
      return state;
  }
};
