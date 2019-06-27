import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ArticlePreview from './ArticlePreview';
import Spinner from './layout/Spinner';

const ArticleList = ({ articles: { articles, loading } }) => {
  // if (!articles) {
  //   return <Spinner />;
  // }

  if (articles.length === 0) {
    return <div className='article-preview'>No articles are here... yet.</div>;
  }

  if (loading) return <Spinner />;
  return (
    <div>
      {articles.map(article => {
        return <ArticlePreview article={article} key={article.slug} />;
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  null
)(withRouter(ArticleList));
