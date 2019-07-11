import React from 'react';
import { Link } from 'react-router-dom';

import CommentList from './CommentList';
import CommentInput from './CommentInput';

const LoggedOutView = ({ currentUser }) => {
  if (!currentUser)
    return (
      <div />
      // <div className='col-xs-12 col-md-8 offset-md-2'>
      //     <p>
      //       <Link to='/login'>Sign in</Link>
      //       &nbsp;or&nbsp;
      //       <Link to='/register'>sign up</Link>
      //       &nbsp;to add comments on this article.
      //     </p>

      //     <CommentList
      //       comments={comments}
      //       slug={slug}
      //       currentUser={currentUser}
      //     />
      //   </div>
    );
};

const LoggedInView = ({ comments, currentUser, slug, loading }) => {
  if (currentUser)
    return (
      <CommentInput slug={slug} currentUser={currentUser} loading={loading} />

      //     <CommentList
      //       comments={comments}
      //       slug={slug}
      //       currentUser={currentUser}
      //     />
      //   </div>
    );
};

const CommentContainer = ({ comments, loading, slug, currentUser }) => {
  return (
    <section
      style={{ paddingTop: '0px' }}
      id='mainForm'
      className='containerForm medium'
    >
      <header>
        <h2>Comments</h2>
        <p>Leave a comment and share your thoughts.</p>
      </header>
      <LoggedInView
        currentUser={currentUser}
        slug={slug}
        comments={comments}
        loading={loading}
      />
    </section>
  );
};

export default CommentContainer;
