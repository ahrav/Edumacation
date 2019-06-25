import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import App from './components/App';
import Home from './components/Home/Index';
import Login from './components/Login';
import Alert from './components/layout/Alert';
import './index';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Alert />
      {/* <Switch> */}
      <Route exact path='/' component={App} />
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      {/* </Switch> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);
