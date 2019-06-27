import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { favoriteArticle, unFavoriteArticle } from '../actions/articles';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const ArticlePreview = ({ article, favoriteArticle, unFavoriteArticle }) => {
  const favoriteButtonClass = article.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS;

  const handleClick = e => {
    e.preventDefault();
    if (article.favorited) {
      unFavoriteArticle(article.slug);
    } else {
      favoriteArticle(article.slug);
    }
  };
  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link to={`${article.author.username}`}>
          <img src={article.author.image} />
        </Link>

        <div className='info'>
          <Link to={`${article.author.username}`} className='author'>
            {article.author.username}
          </Link>
          <span className='date'>
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className='pull-xs-right'>
          <button
            onClick={e => handleClick(e)}
            className={favoriteButtonClass}
          >
            <i className='ion-heart' /> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className='preview-link'>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className='tag-list'>
          {article.tagList.map(tag => {
            return (
              <li className='tag-default tag-pill tag-outline' key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
};

export default connect(
  null,
  { favoriteArticle, unFavoriteArticle }
)(ArticlePreview);
