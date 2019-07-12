import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addComment } from '../../actions/articles';

const CommentInput = ({ addComment, slug, currentUser, loading }) => {
  const [body, setBody] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    addComment(body, slug);
    setBody('');
  };
  return (
    <form>
      <div className='rowForm gtr-50 gtr-uniform'>
        <div className='col-12Form'>
          <textarea
            required
            className='textArea'
            type='text'
            name='body'
            rows='4'
            placeholder='Write a comment...'
            onChange={e => setBody(e.target.value)}
            value={body}
          />
          <span className='focus-input100' />
          <span className='symbol-input100'>
            {/* <i className='fa fa-trophy' aria-hidden='true' /> */}
          </span>
          <div
            style={{
              backgroundColor: '#e5e5e5',
              borderRadius: '0 0 .3em .3em',
              height: '61px',
              borderTop: 'rgb(210, 205, 205)'
            }}
            className='col-12Form'
          >
            <ul className='actionsForm specialForm'>
              <li>
                <a className='author'>
                  <img
                    // id='commentImg'
                    className='commentImg'
                    src={currentUser.image}
                    alt=''
                  />
                </a>
              </li>
              <li>
                <button
                  className='commentButton'
                  type='button'
                  onClick={e => onSubmit(e)}
                  disabled={loading}
                >
                  Post Comment
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
    // <form className='card comment-form' onSubmit={e => onSubmit(e)}>
    //   <div className='card-block'>
    //     <textarea
    //       className='form-control'
    //       placeholder='Write a comment...'
    //       name='body'
    //       required
    //       value={body}
    //       onChange={e => setBody(e.target.value)}
    //       rows='3'
    //     />
    //   </div>
    //   <div className='card-footer'>
    //     <img src={currentUser.image} className='comment-author-img' />
    //     <button className='btn btn-sm btn-primary' type='submit'>
    //       Post Comment
    //     </button>
    //   </div>
    // </form>
  );
};

export default connect(
  null,
  { addComment }
)(CommentInput);
