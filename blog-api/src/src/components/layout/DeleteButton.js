import React from 'react';
import { connect } from 'react-redux';

import { deleteComment } from '../../actions/articles';

const DeleteButton = ({ deleteComment, slug, commentId, show }) => {
  if (show) {
    return (
      <span className='mod-options'>
        <i
          className='ion-trash-a'
          onClick={e => deleteComment(slug, commentId)}
        />
      </span>
    );
  }
  return null;
};

export default connect(
  null,
  { deleteComment }
)(DeleteButton);
