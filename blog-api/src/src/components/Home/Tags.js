import React, { Fragment } from 'react';

import Spinner from '../layout/Spinner';

const Tags = ({ tags, onClickTag, activeTag }) => {
  if (tags) {
    return (
      //     <div className='tag-list'>
      //       {tags.map(tag => {
      //         const handleClick = (ev, tag) => {
      //           ev.preventDefault();
      //           onClickTag(tag);
      //         };

      //         return (
      //           <a
      //             href=''
      //             className='tag-default tag-pill'
      //             key={tag}
      //             onClick={ev => handleClick(ev, tag)}
      //           >
      //             {tag}
      //           </a>
      //         );
      //       })}
      //     </div>
      //   );
      // } else {
      //   return (
      //     <Fragment>
      //       <div>Loading Tags...</div>
      //       <Spinner />
      //     </Fragment>
      //   );
      <article className='mini-post'>
        <header>
          <h3>
            <a href=''>Popular Tags</a>
          </h3>
          <a href='#' className='author'>
            <img src='images/oof.jpg' alt='' />
          </a>
        </header>
        {/* <a href='single.html' className='image'>
        <img src='images/pic04.jpg' alt='' />
      </a> */}
        <ul className='stats'>
          {tags.map(tag => {
            const handleClick = (ev, tag) => {
              ev.preventDefault();
              onClickTag(tag);
            };

            return (
              <li onClick={ev => handleClick(ev, tag)} key={tag}>
                <i
                  style={{ margin: '.05rem 0 0' }}
                  className='icon solid fa-hashtag'
                />
                <span className={tag === activeTag ? 'active' : null}>
                  {tag}
                </span>
              </li>
            );
          })}
        </ul>
      </article>
    );
  } else if (!tags) return <h3>No Tags</h3>;
  else return <Spinner />;
};

export default Tags;
