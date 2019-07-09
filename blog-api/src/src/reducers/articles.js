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
  CHANGE_TAB,
  GET_TAGS,
  TAG_ERROR,
  GET_ARTICLES_BY_TAG,
  GET_ARTICLES_BY_AUTHOR,
  FAVORITE_ARTICLE,
  UN_FAVORITE_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  CLEAR_ARTICLE
} from '../actions/types';

const initialState = {
  articles: [],
  article: null,
  articleCount: null,
  loading: true,
  tab: null,
  error: {},
  tags: null,
  tag: null,
  currentPage: 0
};

export default (state = initialState, action) => {
  const { type, payload, tab, tag, page } = action;

  switch (type) {
    case GET_ALL_ARTICLES:
    case GET_ARTICLES_BY_AUTHOR:
    case GET_FAVORITED_ARTICLES:
      return {
        ...state,
        articles: payload.results || [],
        articleCount: payload.count,
        tag: tag || null,
        tab: 'all',
        loading: false,
        currentPage: page || 0,
        article: null
      };
    case GET_ARTICLES_BY_TAG:
      return {
        ...state,
        articles: payload.results || [],
        articleCount: payload.count,
        tag: tag || null,
        tab: null,
        loading: false
      };
    case GET_ARTICLE:
    case CREATE_ARTICLE:
    case UPDATE_ARTICLE:
      return {
        ...state,
        article: payload,
        tag: null,
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
    case TAG_ERROR:
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
        },
        loading: false
      };
    case GET_FEED:
      return {
        ...state,
        articles: payload.results,
        articleCount: payload.count,
        tab: 'feed',
        loading: false,
        currentPage: page || 0,
        article: null,
        tag: tag || null
      };
    case CHANGE_TAB:
      return {
        ...state,
        tab: tab,
        tag: null,
        loading: false
      };
    case GET_TAGS:
      return {
        ...state,
        tags: payload,
        loading: false
      };
    case FAVORITE_ARTICLE:
    case UN_FAVORITE_ARTICLE:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.slug === payload.slug
            ? {
                ...article,
                favoritesCount: payload.article.favoritesCount,
                favorited: payload.article.favorited
              }
            : article
        ),
        article: payload.article,
        loading: false
      };
    case CLEAR_ARTICLE:
      return {
        ...state,
        tab: null,
        loading: false
      };
    default:
      return state;
  }
};
