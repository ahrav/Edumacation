import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from './layout/Header';
import setAuthToken from '../utils/setAuthToken';
import store from '../store';
import { loadUser } from '../actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = props => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Fragment>
      <Header appName={props.appName} currentUser={props.currentUser} />
      {props.children}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(App);
