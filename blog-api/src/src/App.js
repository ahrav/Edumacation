import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import store from './store';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Settings from './components/settings/Settings';
import './index.css';
import Header from './components/layout/Header';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Home from './components/home/Home';
import Article from './components/article/Article';
import Profile from './components/profile/Profile';
import ProfileFavorites from './components/profile/ProfileFavorites';
import Editor from './components/editor/Editor';
import PrivateRoute from './components/routing/PrivateRoute';
import MainModal from './components/layout/modal/index';
import useToggle from './utils/useToggle';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ common: { appName, appLoaded }, currentUser }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const [open, setOpen] = useToggle(false);

  return (
    <Router>
      <Fragment>
        <MainModal />
        <Header appName={appName} currentUser={currentUser} />
        <Switch>
          <Route exact path='/' component={Home} />

          <Route path='/login' component={Login} />
          {/*
          <Route path='/register' component={Register} />
          <PrivateRoute exact path='/settings' component={Settings} />
          <PrivateRoute exact path='/article/:id' component={Article} />

          <PrivateRoute
            exact
            path='/@:username/favorites'
            component={ProfileFavorites}
          />
          <PrivateRoute exact path='/editor/:slug' component={Editor} />
          <PrivateRoute exact path='/editor' component={Editor} />
          <PrivateRoute exact path='/@:username' component={Profile} />
          <Redirect to='/' />
          */}
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
