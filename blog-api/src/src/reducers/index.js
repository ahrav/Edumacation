import { combineReducers } from 'redux';
import common from './common';
import articles from './articles';

export default combineReducers({
  common,
  articles
});
