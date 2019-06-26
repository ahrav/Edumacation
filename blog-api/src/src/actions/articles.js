import axios from 'axios';
import {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  GET_ARTICLE_COMMENTS,
  ARTICLE_ERROR
} from './types';

export const getArticles = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/articles');

    dispatch({
      type: GET_ALL_ARTICLES,
      payload: res.data.results
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};

export const getArticle = slug => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/articles/${slug}`);

    dispatch({
      type: GET_ARTICLE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};

export const getArticleComments = slug => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/articles/${slug}/comments/`);

    dispatch({
      type: GET_ARTICLE_COMMENTS,
      payload: res.data.results
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};
