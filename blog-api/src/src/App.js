import React, { Fragment, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import store from './store';
import Alert from './components/layout/Alert';
import './index.css';
import Home from './components/home/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import Header from './components/layout/Header';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

const Register = lazy(() => import('./components/auth/Register'));
const Settings = lazy(() => import('./components/settings/Settings'));
const Login = lazy(() => import('./components/auth/Login'));
const Article = lazy(() => import('./components/article/Article'));
const Profile = lazy(() => import('./components/profile/Profile'));
const ProfileFavorites = lazy(() =>
  import('./components/profile/ProfileFavorites')
);
const Editor = lazy(() => import('./components/editor/Editor'));
const Spinner = lazy(() => import('./components/layout/Spinner'));

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
        <Suspense fallback={<Spinner />}>
          <Alert />
          <Header appName={appName} currentUser={currentUser} />
          <Route exact path='/' component={Home} />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute exact path='/settings' component={Settings} />
            <PrivateRoute exact path='/article/:id' component={Article} />

            <PrivateRoute
              exact
              path='/:username/favorites'
              component={ProfileFavorites}
            />
            <PrivateRoute exact path='/editor/:slug' component={Editor} />
            <PrivateRoute exact path='/editor' component={Editor} />
            <PrivateRoute exact path='/:username' component={Profile} />
          </Switch>
        </Suspense>
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
