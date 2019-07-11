import React from 'react';

import Comment from './Comment';

const CommentList = ({ comments, slug, currentUser }) => {
  return comments.map(comment => {
    return (
      <Comment
        comment={comment}
        currentUser={currentUser}
        slug={slug}
        key={comment.id}
      />
    );
  });
};

export default CommentList;
