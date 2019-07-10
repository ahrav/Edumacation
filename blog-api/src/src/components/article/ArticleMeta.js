import React from 'react';
import { Link } from 'react-router-dom';

import ArticleActions from './ArticleActions';

const ArticleMeta = ({ article, canModify }) => {
  return (
    <div className='meta'>
      <time className='published'>
        {new Date(article.createdAt).toDateString()}
      </time>
      <Link to={`/@${article.author.username}`} className='author'>
        <span className='name'>{article.author.username}</span>
        <img src={article.author.image} alt='' />
      </Link>
    </div>
    // <div className='article-meta'>
    //   <Link to={`/@${article.author.username}`}>
    //     <img src={article.author.image} alt='' />
    //   </Link>

    //   <div className='info'>
    //     <Link to={`/@${article.author.username}`} className='author'>
    //       {article.author.username}
    //     </Link>
    //     <span className='date'>
    //       {new Date(article.createdAt).toDateString()}
    //     </span>
    //   </div>

    //   <ArticleActions canModify={canModify} article={article} />
    // </div>
  );
};

export default ArticleMeta;
