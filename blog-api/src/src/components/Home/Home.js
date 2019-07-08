import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import MainView from './MainView';
import Sidebar from '../layout/Sidebar';
import {
  getTags,
  getArticlesByTag,
  getArticles,
  getFeed
} from '../../actions/articles';

const Home = ({
  common: { appName },
  token,
  getTags,
  tags,
  getArticlesByTag,
  getArticles,
  getFeed,
  activeTag
}) => {
  useEffect(() => {
    (async () => {
      await getTags();
      await (token ? getFeed() : getArticles());
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
  tags: state.articles.tags,
  activeTag: state.articles.tag
});

export default connect(
  mapStateToProps,
  { getTags, getArticlesByTag, getArticles, getFeed }
)(Home);
