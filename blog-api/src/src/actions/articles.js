import axios from 'axios';
import {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  GET_ARTICLE_COMMENTS,
  ARTICLE_ERROR,
  DELETE_ARTICLE,
  ADD_COMMENT,
  COMMENT_ERROR,
  DELETE_COMMENT
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

export const deleteArticle = (slug, history) => async dispatch => {
  try {
    await axios.delete(`/api/v1/articles/${slug}`);

    dispatch({
      type: DELETE_ARTICLE,
      payload: slug
    });
    history.push('/');
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};

export const addComment = (body, slug) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const payload = {
    comment: { body: body }
  };
  try {
    const res = await axios.post(
      `/api/v1/articles/${slug}/comments/`,
      payload,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};

export const deleteComment = (slug, id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/articles/${slug}/comments/${id}/`);

    dispatch({
      type: DELETE_COMMENT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};
