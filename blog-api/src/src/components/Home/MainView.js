import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ArticleList from '../ArticleList';
import { getArticles, getFeed, onTabClick } from '../../actions/articles';

const YourFeedTab = ({ token, getFeed, tab, onTabClick }) => {
  if (token) {
    const clickHandler = async e => {
      e.preventDefault();
      await getFeed();
      await onTabClick('feed');
    };

    return (
      <li className='nav-item'>
        <a
          href=''
          className={tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={e => clickHandler(e)}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = ({ getArticles, onTabClick, tab }) => {
  const clickHandler = async e => {
    e.preventDefault();
    await getArticles();
    await onTabClick('all');
  };
  return (
    <li className='nav-item'>
      <a
        href=''
        className={tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={e => clickHandler(e)}
      >
        Global Feed
      </a>
    </li>
  );
};

const MainView = ({
  articles,
  getFeed,
  getArticles,
  token,
  tab,
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
  articles: state.articles.articles,
  token: state.auth.token,
  tab: state.articles.tab
});

export default connect(
  mapStateToProps,
  { getArticles, getFeed, onTabClick }
)(withRouter(MainView));
