import axios from 'axios';
import { GET_ALL_ARTICLES, HOME_PAGE_LOADED } from './types';

export const getArticles = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/articles');

    dispatch({
      type: GET_ALL_ARTICLES,
      payload: res.data.results
    });
  } catch (err) {
    console.log(err);
  }
};
