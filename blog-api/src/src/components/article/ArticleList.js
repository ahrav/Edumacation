import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ArticlePreview from './ArticlePreview';
import ListPagination from '../layout/ListPagination';

const ArticleList = ({
  articles: { articles, articleCount, currentPage },
  onSetPage
}) => {
  if (articles.length === 0) {
    return <div className='article-preview'>No articles are here... yet.</div>;
  }

  return (
    <div>
      {articles.map(article => {
        return <ArticlePreview article={article} key={article.slug} />;
      })}

      <ListPagination
        articlesCount={articleCount}
        currentPage={currentPage}
        onSetPage={onSetPage}
      />
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
