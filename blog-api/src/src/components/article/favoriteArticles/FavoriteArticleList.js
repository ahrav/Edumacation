import React from 'react';

import Spinner from '../../layout/Spinner';
import FavoriteArticle from './FavoriteArticle';

const FavoriteArticleList = ({ favoriteArticles, loading }) => {
  let view;
  loading
    ? (view = <Spinner />)
    : (view = favoriteArticles.results.map(article => {
        return <FavoriteArticle key={article.slug} article={article} />;
      }));
  return view;
};

export default FavoriteArticleList;
