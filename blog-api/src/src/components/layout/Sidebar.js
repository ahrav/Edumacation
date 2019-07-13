import React from 'react';

import Banner from '../home/Banner';
import Tags from '../home/Tags';
import FavoriteArticleList from '../article/favoriteArticles/FavoriteArticleList';
import CommentArticleList from '../article/commentArticles/CommentArticleList';

const Sidebar = ({
  appName,
  tags,
  onClickTag,
  activeTag,
  favoriteArticles,
  commentArticles,
  loading
}) => {
  return (
    <section id='sidebar'>
      <Banner appName={appName} />

      <section>
        <div className='mini-posts'>
          <Tags tags={tags} onClickTag={onClickTag} activeTag={activeTag} />

          <FavoriteArticleList
            favoriteArticles={favoriteArticles}
            loading={loading}
            onClickTag={onClickTag}
          />
        </div>
      </section>
      <section>
        <ul className='posts'>
          <CommentArticleList
            commentArticles={commentArticles}
            loading={loading}
          />
        </ul>
      </section>

      <section className='blurb'>
        <h2>About</h2>
        <p>
          Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl.
          Sed mattis nunc id lorem euismod amet placerat. Vivamus porttitor
          magna enim, ac accumsan tortor cursus at phasellus sed ultricies.
        </p>
        <ul className='actions'>
          <li>
            <a href='#' className='button'>
              Learn More
            </a>
          </li>
        </ul>
      </section>

      <section id='footer'>
        <ul className='icons'>
          <li>
            <a href='#' className='icon brands fa-twitter'>
              <span className='label'>Twitter</span>
            </a>
          </li>
          <li>
            <a href='#' className='icon brands fa-facebook-f'>
              <span className='label'>Facebook</span>
            </a>
          </li>
          <li>
            <a href='#' className='icon brands fa-instagram'>
              <span className='label'>Instagram</span>
            </a>
          </li>
          <li>
            <a href='#' className='icon solid fa-rss'>
              <span className='label'>RSS</span>
            </a>
          </li>
          <li>
            <a href='#' className='icon solid fa-envelope'>
              <span className='label'>Email</span>
            </a>
          </li>
        </ul>
        <p className='copyright'>
          &copy; Untitled. Design: <a href='/#' />. : <a href='/#' />.
        </p>
      </section>
    </section>
  );
};

export default Sidebar;
