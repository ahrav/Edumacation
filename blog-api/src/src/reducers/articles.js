import {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLE_COMMENTS,
  DELETE_ARTICLE,
  ADD_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERROR,
  GET_FAVORITED_ARTICLES,
  GET_FEED,
  CHANGE_TAB
} from '../actions/types';

const initialState = {
  articles: [],
  article: null,
  articleCount: null,
  loading: true,
  tab: 'feed',
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload, tab } = action;

  switch (type) {
    case GET_ALL_ARTICLES:
      return {
        ...state,
        articles: payload.results,
        articleCount: payload.count,
        loading: false
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
    case GET_FEED:
      return {
        ...state,
        articles: payload.results,
        articleCount: payload.count,
        loading: false
      };
    case CHANGE_TAB:
      return {
        ...state,
        tab: tab,
        loading: false
      };
    default:
      return state;
  }
};
