import { combineReducers } from 'redux';
import common from './common';
import articles from './articles';
import auth from './auth';
import alert from './alert';

export default combineReducers({
  common,
  articles,
  auth,
  alert
});
