import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ArticleList from '../article/ArticleList';
import {
  getArticles,
  getFeed,
  onTabClick,
  onSetPage
} from '../../actions/articles';
import YourFeedTab from './Feed/YourFeedTab';
import GlobalFeedTab from './Feed/GlobalFeedTab';
import Spinner from '../layout/Spinner';

const TagFilterTab = ({ tag }) => {
  if (!tag) return null;
  return (
    <li className='nav-item'>
      <a href='' className='nav-link active'>
        <i className='ion-pound' /> {tag}
      </a>
    </li>
  );
};

const MainView = ({
  articles: { articles, tab, tag, loading, articleCount, currentPage },
  getFeed,
  getArticles,
  token,
  onTabClick,
  onSetPage
}) => {
  const settingPage = (tab, page) => {
    let view;
    tab === 'feed'
      ? (view = () => getFeed(page))
      : (view = () => getArticles(page));
    onSetPage(view);
  };

  const setPage = page => settingPage(tab, page);
  let view;
  loading
    ? (view = <Spinner />)
    : (view = (
        <ArticleList
          articles={articles}
          articlesCount={articleCount}
          currentPage={currentPage}
          onSetPage={setPage}
        />
      ));
  return (
    <Fragment>
      <header id='header2'>
        <nav className='links'>
          <ul>
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
        </nav>
      </header>
      {view}
    </Fragment>
  );
  // <div className='col-md-9'>
  {
    /* <div className='feed-toggle'>
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

          <TagFilterTab tag={tag} />
        </ul>
      </div> */
  }

  {
    /* </div> */
  }
};

const mapStateToProps = state => ({
  articles: state.articles,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { getArticles, getFeed, onTabClick, onSetPage }
)(withRouter(MainView));
