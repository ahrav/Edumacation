import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Header from './Header';

const App = props => {
  return (
    <Fragment>
      <Header appName={props.appName} />
      {props.children}
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
