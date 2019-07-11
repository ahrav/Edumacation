import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import DeleteButton from '../layout/DeleteButton';

const Comment = ({ comment, currentUser, slug }) => {
  const show = currentUser && currentUser.username === comment.author.username;
  return (
    <div className='rowForm gtr-50 gtr-uniform'>
      <div className='col-12Form'>
        <div id='commentBody'>{comment.body}</div>

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
              <Link
                style={{ borderBottom: 'none' }}
                to={`/@${comment.author.username}`}
              >
                <img id='commentImg' src='/images/avatar.jpg' alt='' />
              </Link>
            </li>
            <li id='commentAuthor'>
              <Link
                style={{ borderBottom: 'none', fontStyle: 'italic' }}
                to={`/@${comment.author.username}`}
              >
                {comment.author.username}{' '}
                <span style={{ marginLeft: '.2em' }}>--</span>
              </Link>
            </li>
            <li id='commentTime'>
              <time style={{fontSize: '.92em', fontStyle: 'italic'}} className='published'>
                {moment(comment.createdAt).format('lll')}
              </time>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <div className='card'>
    //   <div className='card-block'>
    //     <p className='card-text'>{comment.body}</p>
    //   </div>
    //   <div className='card-footer'>
    //     <Link to={`/@${comment.author.username}`} className='comment-author'>
    //       <img src={comment.author.image} className='comment-author-img' />
    //     </Link>
    //     &nbsp;
    //     <Link to={`/@${comment.author.username}`} className='comment-author'>
    //       {comment.author.username}
    //     </Link>
    //     <span className='date-posted'>
    //       {new Date(comment.createdAt).toDateString()}
    //     </span>
    //     <DeleteButton show={show} slug={slug} commentId={comment.id} />
    //   </div>
    // </div>
  );
};

export default Comment;
