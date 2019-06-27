import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Banner from './Banner';
import MainView from './MainView';

const Home = ({ common: { appName } }) => {
  return (
    <div className='home-page'>
      <Banner appName={appName} />

      <div className='container page'>
        <div className='row'>
          <MainView />

          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  common: state.common,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  null
)(Home);
