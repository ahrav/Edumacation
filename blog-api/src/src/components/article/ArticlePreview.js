import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { favoriteArticle, unFavoriteArticle } from '../../actions/articles';

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
    // <div className='article-preview'>
    //   <div className='article-meta'>
    //     <Link to={`${article.author.username}`}>
    //       <img src={article.author.image} />
    //     </Link>

    //     <div className='info'>
    //       <Link to={`/@${article.author.username}`} className='author'>
    //         {article.author.username}
    //       </Link>
    //       <span className='date'>
    //         {new Date(article.createdAt).toDateString()}
    //       </span>
    //     </div>

    //     <div className='pull-xs-right'>
    //       <button
    //         onClick={e => handleClick(e)}
    //         className={favoriteButtonClass}
    //       >
    //         <i className='ion-heart' /> {article.favoritesCount}
    //       </button>
    //     </div>
    //   </div>

    //   <Link to={`/article/${article.slug}`} className='preview-link'>
    //     <h1>{article.title}</h1>
    //     <p>{article.description}</p>
    //     <span>Read more...</span>
    //     <ul className='tag-list'>
    //       {article.tagList.map(tag => {
    //         return (
    //           <li className='tag-default tag-pill tag-outline' key={tag}>
    //             {tag}
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </Link>
    // </div>
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
            {new Date(article.createdAt).toDateString()}
          </time>
          <Link to={`/@${article.author.username}`} className='author'>
            <span className='name'>{article.author.username}</span>
            <img src='/images/oof.jpg' alt='' />
          </Link>
        </div>
      </header>
      <Link to={`/article/${article.slug}`} className='image featured'>
        <img src='/images/skye.jpg' alt='' />
      </Link>
      <p>{article.body}</p>
      <footer>
        <ul className='actions'>
          <li>
            <Link to={`/article/${article.slug}`} className='button large'>
              Continue Reading
            </Link>
          </li>
        </ul>
        <ul className='stats'>
          {article.tagList.map(tag => {
            return (
              <li key={tag}>
                <i className='icon solid fa-hashtag' />
                {tag}
              </li>
            );
          })}

          <li onClick={e => handleClick(e)} className={favoriteButtonClass}>
            <i className='icon solid fa-heart' />
            {article.favoritesCount}
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
