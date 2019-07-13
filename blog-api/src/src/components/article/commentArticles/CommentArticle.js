import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const CommentArticle = ({ article }) => {
  return (
    <li>
      <article>
        <header>
          <h3>
            <Link to={`/article/${article.slug}`}>{article.title}</Link>
          </h3>
          <time className='published' dateTime={article.createdAt}>
            {moment(article.createAt).format('LL')}
          </time>
        </header>
        <Link to={`/article/${article.slug}`} className='image'>
          <img src={article.image || 'images/pic08.jpg'} alt='' />
        </Link>
      </article>
    </li>
  );
};

export default CommentArticle;
