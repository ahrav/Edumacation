import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  GET_ARTICLE_COMMENTS,
  ARTICLE_ERROR,
  DELETE_ARTICLE,
  ADD_COMMENT,
  COMMENT_ERROR,
  DELETE_COMMENT,
  GET_FAVORITED_ARTICLES,
  GET_FEED,
  CHANGE_TAB,
  GET_TAGS,
  TAG_ERROR,
  GET_ARTICLES_BY_TAG,
  GET_ARTICLES_BY_AUTHOR,
  FAVORITE_ARTICLE,
  UN_FAVORITE_ARTICLE,
  UPDATE_ARTICLE,
  CREATE_ARTICLE
} from './types';

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

export const getArticles = page => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/articles?${limit(10, page)}`);

    dispatch({
      type: GET_ALL_ARTICLES,
      payload: res.data,
      page: page
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
    const error = err.response.data.errors['body'][0];
    dispatch(setAlert(error, 'danger'));
    dispatch({
      type: COMMENT_ERROR,
      payload: {
        msg: error
      }
    });
  }
};

export const deleteComment = (slug, id) => async dispatch => {
  try {
    await axios.delete(`/api/v1/articles/${slug}/comments/${id}/`);

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

export const getFavoritedArticles = (username, page) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/v1/articles?favorited=${username}&${limit(10, page)}`
    );

    dispatch({
      type: GET_FAVORITED_ARTICLES,
      payload: res.data.results,
      page: page
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

export const getFeed = page => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/articles/feed?${limit(10, page)}`);

    dispatch({
      type: GET_FEED,
      payload: res.data,
      page: page
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

export const onTabClick = tab => dispatch => {
  dispatch({
    type: CHANGE_TAB,
    tab: tab
  });
};

export const getTags = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/tags/');

    dispatch({
      type: GET_TAGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};

export const getArticlesByTag = (name, page) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/v1/articles?tag=${name}&${limit(10, page)}`
    );

    dispatch({
      type: GET_ARTICLES_BY_TAG,
      payload: res.data,
      tag: name
    });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};

export const getArticlesByAuthor = (username, page) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/v1/articles?author=${username}&${limit(10, page)}`
    );

    dispatch({
      type: GET_ARTICLES_BY_AUTHOR,
      payload: res.data,
      page: page
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

export const favoriteArticle = slug => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/v1/articles/${slug}/favorite/`, config);

    dispatch({
      type: FAVORITE_ARTICLE,
      payload: { slug, article: res.data }
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

export const unFavoriteArticle = slug => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.delete(
      `/api/v1/articles/${slug}/favorite/`,
      config
    );

    dispatch({
      type: UN_FAVORITE_ARTICLE,
      payload: { slug, article: res.data }
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

export const onSetPage = view => dispatch => {
  try {
    dispatch(view);
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: err.response.errors
      }
    });
  }
};

export const updateArticle = (slug, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(`/api/v1/articles/${slug}/`, formData, config);

    dispatch({
      type: UPDATE_ARTICLE,
      payload: res.data
    });
    history.push(`/article/${slug}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      Object.keys(errors).forEach(key =>
        dispatch(setAlert(errors[key][0], 'danger'))
      );
    }
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export const createArticle = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/v1/articles/`, formData, config);

    dispatch({
      type: CREATE_ARTICLE,
      payload: res.data
    });
    history.push(`/article/${res.data.slug}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      Object.keys(errors).forEach(key =>
        dispatch(setAlert(errors[key][0], 'danger'))
      );
    }

    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
