import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ArticleList from '../ArticleList';
import { getArticles, getFeed, onTabClick } from '../../actions/articles';
import YourFeedTab from './Feed/YourFeedTab';
import GlobalFeedTab from './Feed/GlobalFeedTab';
const MainView = ({
  articles: { articles, tab },
  getFeed,
  getArticles,
  token,
  onTabClick
}) => {
  return (
    <div className='col-md-9'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active'>
          <YourFeedTab
            getFeed={getFeed}
            token={token}
            tab={tab}
            onTabClick={onTabClick}
          />

          <GlobalFeedTab
            getArticles={getArticles}
            tab={tab}
            onTabClick={onTabClick}
          />
        </ul>
      </div>

      <ArticleList articles={articles} />
    </div>
  );
};

const mapStateToProps = state => ({
  articles: state.articles,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { getArticles, getFeed, onTabClick }
)(withRouter(MainView));
