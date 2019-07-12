import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import MainView from './MainView';
import Sidebar from '../layout/Sidebar';
import {
  getTags,
  getArticlesByTag,
  getArticles,
  getFeed,
  getPopularArticles
} from '../../actions/articles';

const Home = ({
  common: { appName },
  articles: {
    tab,
    tags,
    currentPage,
    favoriteArticles,
    commentArticles,
    loading
  },
  getTags,
  getArticlesByTag,
  getArticles,
  getFeed,
  activeTag,
  getPopularArticles
}) => {
  useEffect(() => {
    (async () => {
      await getPopularArticles();
      await getTags();
      await (tab === 'feed' ? getFeed(currentPage) : getArticles(currentPage));
    })();
  }, [getTags]);

  const onClickTag = name => {
    getArticlesByTag(name);
  };

  return (
    <Fragment>
      <div id='main'>
        <MainView />
      </div>
      <Sidebar
        favoriteArticles={favoriteArticles}
        commentArticles={commentArticles}
        loading={loading}
        activeTag={activeTag}
        appName={appName}
        tags={tags}
        onClickTag={onClickTag}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  common: state.common,
  token: state.auth.token,
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { getTags, getArticlesByTag, getArticles, getFeed, getPopularArticles }
)(Home);
