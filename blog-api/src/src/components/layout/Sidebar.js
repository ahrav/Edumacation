import React from 'react';

import Banner from '../home/Banner';
import Tags from '../home/Tags';
import FavoriteArticleList from '../article/favoriteArticles/FavoriteArticleList';

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
          <li>
            <article>
              <header>
                <h3>
                  <a href='single.html'>Lorem ipsum fermentum ut nisl vitae</a>
                </h3>
                <time className='published' dateTime='2015-10-20'>
                  October 20, 2015
                </time>
              </header>
              <a href='single.html' className='image'>
                <img src='images/pic08.jpg' alt='' />
              </a>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>
                  <a href='single.html'>
                    Convallis maximus nisl mattis nunc id lorem
                  </a>
                </h3>
                <time className='published' dateTime='2015-10-15'>
                  October 15, 2015
                </time>
              </header>
              <a href='single.html' className='image'>
                <img src='images/pic09.jpg' alt='' />
              </a>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>
                  <a href='single.html'>
                    Euismod amet placerat vivamus porttitor
                  </a>
                </h3>
                <time className='published' dateTime='2015-10-10'>
                  October 10, 2015
                </time>
              </header>
              <a href='single.html' className='image'>
                <img src='images/pic10.jpg' alt='' />
              </a>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>
                  <a href='single.html'>
                    Magna enim accumsan tortor cursus ultricies
                  </a>
                </h3>
                <time className='published' dateTime='2015-10-08'>
                  October 8, 2015
                </time>
              </header>
              <a href='single.html' className='image'>
                <img src='images/pic11.jpg' alt='' />
              </a>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>
                  <a href='single.html'>
                    Congue ullam corper lorem ipsum dolor
                  </a>
                </h3>
                <time className='published' dateTime='2015-10-06'>
                  October 7, 2015
                </time>
              </header>
              <a href='single.html' className='image'>
                <img src='images/pic12.jpg' alt='' />
              </a>
            </article>
          </li>
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
