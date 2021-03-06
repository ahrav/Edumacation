import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ArticlePreview from './ArticlePreview';
import ListPagination from '../layout/ListPagination';

const ArticleList = ({
  articles: { articles, articleCount, currentPage },
  onSetPage
}) => {
  if (articles.length === 0) {
    return (
      <article className='post'>
        <header>
          <div className='title'>
            <h2>No Articles</h2>
            <p>Please follow a user to fill up feed</p>
          </div>
        </header>
      </article>
    );
  }

  const allArticles = articles.map(article => {
    return <ArticlePreview article={article} key={article.slug} />;
  });
  return (
    <Fragment>
      {allArticles}
      <ListPagination
        articlesCount={articleCount}
        currentPage={currentPage}
        onSetPage={onSetPage}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  null
)(withRouter(ArticleList));
