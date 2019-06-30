import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addComment } from '../../actions/articles';

const CommentInput = ({ addComment, slug, currentUser }) => {
  const [body, setBody] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    addComment(body, slug);
    setBody('');
  };
  return (
    <form className='card comment-form' onSubmit={e => onSubmit(e)}>
      <div className='card-block'>
        <textarea
          className='form-control'
          placeholder='Write a comment...'
          name='body'
          required
          value={body}
          onChange={e => setBody(e.target.value)}
          rows='3'
        />
      </div>
      <div className='card-footer'>
        <img src={currentUser.image} className='comment-author-img' />
        <button className='btn btn-sm btn-primary' type='submit'>
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default connect(
  null,
  { addComment }
)(CommentInput);
