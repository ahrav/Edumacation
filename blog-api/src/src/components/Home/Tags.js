import React, { Fragment } from 'react';

import Spinner from '../layout/Spinner';

const Tags = ({ tags, onClickTag }) => {
  if (tags) {
    return (
      <div className='tag-list'>
        {tags.map(tag => {
          const handleClick = (ev, tag) => {
            ev.preventDefault();
            onClickTag(tag);
          };

          return (
            <a
              href=''
              className='tag-default tag-pill'
              key={tag}
              onClick={ev => handleClick(ev, tag)}
            >
              {tag}
            </a>
          );
        })}
      </div>
    );
  } else {
    return (
      <Fragment>
        <div>Loading Tags...</div>
        <Spinner />
      </Fragment>
    );
  }
};

export default Tags;
