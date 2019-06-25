import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getArticles } from '../../actions/articles';

import Banner from './Banner';
import MainView from './MainView';

const Index = ({ getArticles, appName }) => {
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
)(Index);
