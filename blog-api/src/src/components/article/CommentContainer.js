import React from 'react';
import { Link } from 'react-router-dom';

import CommentList from './CommentList';
import CommentInput from './CommentInput';

const CommentContainer = ({ comments, errors, slug, currentUser }) => {
  if (currentUser) {
    return (
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <div>
          <CommentInput slug={slug} currentUser={currentUser} />
        </div>

        <CommentList
          comments={comments}
          slug={slug}
          currentUser={currentUser}
        />
      </div>
    );
  } else {
    return (
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <p>
          <Link to='/login'>Sign in</Link>
          &nbsp;or&nbsp;
          <Link to='/register'>sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList
          comments={comments}
          slug={slug}
          currentUser={currentUser}
        />
      </div>
    );
  }
};

export default CommentContainer;
