import React, { Fragment } from 'react';

import Spinner from '../../layout/Spinner';
import FavoriteArticle from './FavoriteArticle';

const FavoriteArticleList = ({ favoriteArticles, loading, onClickTag }) => {
  let view;
  loading
    ? (view = <Spinner />)
    : (view = favoriteArticles.results.map(article => {
        return (
          <FavoriteArticle
            key={article.slug}
            article={article}
            onClickTag={onClickTag}
          />
        );
      }));
  return (
    <Fragment>
      <h3 id='tagsPost'>Popular Articles</h3>
      {view}
    </Fragment>
  );
};

export default FavoriteArticleList;
