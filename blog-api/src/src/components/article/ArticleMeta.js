import React from 'react';
import { Link } from 'react-router-dom';

import ArticleActions from './ArticleActions';

const ArticleMeta = ({ article, canModify }) => {
  return (
    <div className='meta'>
      <Link to={`/@${article.author.username}`} className='author'>
        <span className='name'>{article.author.username}</span>
        <img src={article.author.image} alt='' />
      </Link>
      <ArticleActions canModify={canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
