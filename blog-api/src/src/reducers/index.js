import { combineReducers } from 'redux';
import common from './common';
import articles from './articles';
import auth from './auth';
import alert from './alert';
import profile from './profile';

export default combineReducers({
  common,
  articles,
  auth,
  alert,
  profile
});
