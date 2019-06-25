import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Home from './Home';

const App = ({ appName }) => {
  return (
    <Fragment>
      <Header appName={appName} />
      <Home />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  appName: state.common.appName
});

export default connect(
  mapStateToProps,
  null
)(App);
