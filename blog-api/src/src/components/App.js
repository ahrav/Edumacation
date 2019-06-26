import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ appName, currentUser }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header appName={appName} currentUser={currentUser} />
          <Route exact path='/' component={Home} />
          <Alert />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
