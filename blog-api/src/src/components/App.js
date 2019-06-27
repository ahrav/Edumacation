import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import store from '../store';
import Login from './auth/Login';
import Alert from './layout/Alert';
import Register from './auth/Register';
import Settings from './Settings';
import '../index.css';
import Header from './layout/Header';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';
import Home from './home/Home';
import Article from './article/Article';
import Profile from '../components/Profile';
import ProfileFavorites from '../components/ProfileFavorites';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ common: { appName, appLoaded }, currentUser }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Fragment>
        <Alert />
        <Header appName={appName} currentUser={currentUser} />
        <Route exact path='/' component={Home} />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/settings' component={Settings} />
          <Route path='/article/:id' component={Article} />
          <Route exact path='/:username' component={Profile} />
          <Route
            exact
            path='/:username/favorites'
            component={ProfileFavorites}
          />
        </Switch>
      </Fragment>
    </Router>
  );
};

const mapStateToProps = state => ({
  common: state.common,
  currentUser: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(App);
