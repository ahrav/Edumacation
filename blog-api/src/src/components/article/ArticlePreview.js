import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

import { favoriteArticle, unFavoriteArticle } from '../../actions/articles';

const FAVORITE_BUTTON_CLASS = 'iconStyle';
const NOT_FAVORITE_BUTTON_CLASS = 'iconNoStyle';

const ArticlePreview = ({ article, favoriteArticle, unFavoriteArticle }) => {
  const favoriteButtonClass = article.favorited
    ? FAVORITE_BUTTON_CLASS
    : NOT_FAVORITE_BUTTON_CLASS;

  const handleClick = e => {
    e.preventDefault();
    if (article.favorited) {
      unFavoriteArticle(article.slug);
    } else {
      favoriteArticle(article.slug);
    }
  };
  const articlePreview =
    article.body.length > 15
      ? article.body
          .split(' ')
          .splice(0, 15)
          .join(' ')
          .concat(' ...')
      : article.body;
  return (
    <article className='post'>
      <header>
        <div className='title'>
          <h2>
            <Link to={`/article/${article.slug}`}>{article.title}</Link>
          </h2>
          <p>{article.description}</p>
        </div>
        <div className='meta'>
          <time className='published'>
            {moment(article.createdAt).format('MMMM DD, YYYY')}
          </time>
          <Link to={`/@${article.author.username}`} className='author'>
            <span className='name'>{article.author.username}</span>
            <img src={article.author.image} alt='' />
          </Link>
        </div>
      </header>
      <Link to={`/article/${article.slug}`} className='image featured'>
        <img src={article.image} alt='' />
      </Link>
      <p>{articlePreview}</p>
      <footer>
        <ul className='actions'>
          <li>
            {article.body.length > 15 ? (
              <Link to={`/article/${article.slug}`} className='button large'>
                Continue Reading
              </Link>
            ) : null}
          </li>
        </ul>
        <ul className='stats'>
          {article.tagList.splice(0, 6).map(tag => {
            return (
              <li key={tag}>
                <i className='icon solid fa-hashtag' />
                {tag}
              </li>
            );
          })}

          <li
            id='likeIcon'
            // id='likeIcon'
            onClick={e => handleClick(e)}
            // className={favoriteButtonClass}
          >
            <Icon
              id='hover'
              className={favoriteButtonClass}
              name='heart'
              size='large'
            />
            <span
              className={favoriteButtonClass}
              style={{ fontSize: '1.4em' }}
            >
              {article.favoritesCount}
            </span>
          </li>
          <li
            className='commentIcon'
            // id='likeIcon'
            // onClick={e => handleClick(e)}
            // className={favoriteButtonClass}
          >
            <Link
              style={{ borderBottom: 'none' }}
              to={`/article/${article.slug}`}
            >
              <Icon className='commentIcon' name='comments' size='large' />
              <span className='commentIcon' style={{ fontSize: '1.4em' }}>
                {article.commentsCount}
              </span>
            </Link>
          </li>
        </ul>
      </footer>
    </article>
  );
};

export default connect(
  null,
  { favoriteArticle, unFavoriteArticle }
)(ArticlePreview);
