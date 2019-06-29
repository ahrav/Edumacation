import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ArticlePreview from './ArticlePreview';

const ArticleList = ({ articles: { articles } }) => {
  if (articles.length === 0) {
    return <div className='article-preview'>No articles are here... yet.</div>;
  }

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
