import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { store } from './store';
import App from './components/App';
import Home from './components/Home/Index';
import Login from './components/Login';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <Switch> */}
      <Route exact path='/' component={App} />
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      {/* </Switch> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);
