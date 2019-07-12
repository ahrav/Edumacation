import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const FAVORITE_BUTTON_CLASS = 'iconStyle';
const NOT_FAVORITE_BUTTON_CLASS = 'iconNoStyle';

const FavoriteArticle = ({ article }) => {
  const favoriteButtonClass = article.favorited
    ? FAVORITE_BUTTON_CLASS
    : NOT_FAVORITE_BUTTON_CLASS;

  const articlePreview =
    article.body.length > 15
      ? article.body
          .split(' ')
          .splice(0, 15)
          .join(' ')
          .concat(' ...')
      : article.body;

  return (
    <article style={{ flexDirection: 'column' }} className='mini-post'>
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
        <div id='miniPostPreview'>{articlePreview}</div>
      </Link>
      {/* <img src='images/skye2.jpg' alt='' /> */}
      {/* <div>
        <p>{article.body}</p>
        <p>{article.favoritesCount}</p>
        </div> */}
      <footer>
        <ul id='miniPost' className='stats'>
          {article.tagList.slice(0, 6).map(tag => {
            return (
              <li key={tag}>
                <i className='icon solid fa-hashtag' />
                {tag}
              </li>
            );
          })}

          {/* <li
            style={{ marginLeft: '5em' }}
            // id='likeIcon'
            // id='likeIcon'
            // onClick={e => handleClick(e)}
            // className={favoriteButtonClass}
          >
            <Icon
              // id='hover'
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
          </li> */}
        </ul>
        <div
          style={{
            display: 'inline-block',
            float: 'right',
            lineHeight: '3em',
            marginRight: '1em'
          }}
        >
          <Icon
            // id='hover'
            className={favoriteButtonClass}
            name='heart'
            size='small'
          />
          <span
            className={favoriteButtonClass}
            style={{ fontSize: '.92em', marginRight: '.4em' }}
          >
            {article.favoritesCount}
          </span>
          <Link
            style={{ borderBottom: 'none' }}
            to={`/article/${article.slug}`}
          >
            <Icon className='commentIcon' name='comments' size='small' />
            <span className='commentIcon' style={{ fontSize: '.92em' }}>
              {article.commentsCount}
            </span>
          </Link>
        </div>
      </footer>
    </article>
  );
};

export default FavoriteArticle;
