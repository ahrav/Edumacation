import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Banner from './Banner';
import MainView from './MainView';
import { getArticles } from '../../actions/articles';

const Home = ({ appName, getArticles }) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);

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
  appName: state.common.appName
});

export default connect(
  mapStateToProps,
  { getArticles }
)(Home);
