import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { deleteComment } from '../../actions/articles';

const DeleteButton = ({ deleteComment, slug, commentId, show, loading }) => {
  if (show) {
    return (
      <button
        className='commentButton deleteButton'
        type='button'
        onClick={() => deleteComment(slug, commentId)}
        disabled={loading}
      >
        Delete
        <Icon id='deleteIcon' name='trash' />
      </button>
      // <span className='mod-options'>
      //   <i
      //     className='ion-trash-a'
      //     onClick={e => deleteComment(slug, commentId)}
      //   />
      // </span>
    );
  }
  return null;
};

export default connect(
  null,
  { deleteComment }
)(DeleteButton);
