import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const FavoriteArticle = ({ article }) => {
  return (
    <article className='mini-post'>
      <header>
        <h3>
          <a href='single.html'>{article.title}</a>
        </h3>
        <time className='published' dateTime={article.createdAt}>
          {moment(article.createdAt).format('LL')}
        </time>
        <Link to={`/@${article.author.username}`} className='author'>
          <img
            // src={article.author.image}
            src='images/oof.jpg'
            alt=''
          />
        </Link>
      </header>
      <Link to={`/article/${article.slug}`} className='image'>
        {/* <img src='images/skye2.jpg' alt='' /> */}
        <p>{article.body}</p>
        <p>{article.favoritesCount}</p>
      </Link>
    </article>
  );
};

export default FavoriteArticle;
