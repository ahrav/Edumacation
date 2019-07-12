import React from 'react';

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
  return view;
};

export default FavoriteArticleList;
