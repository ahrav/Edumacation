import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { deleteArticle } from '../../actions/articles';

const ArticleActions = ({
  deleteArticle,
  article: { slug },
  canModify,
  history
}) => {
  if (canModify) {
    return (
      <span id='profileSettingsButton'>
        <Link to={`/editor/${slug}`}>Edit Article</Link>
        <Icon style={{ marginLeft: '.40em' }} name='edit' />
      </span>
      // <span>
      //   <Link
      //     to={`/editor/${slug}`}
      //     className='btn btn-outline-secondary btn-sm'
      //   >
      //     <i className='ion-edit' /> Edit Article
      //   </Link>

      //   <button
      //     className='btn btn-outline-danger btn-sm'
      //     onClick={() => deleteArticle(slug, history)}
      //     style={{ marginLeft: '3px' }}
      //   >
      //     <i className='ion-trash-a' /> Delete Article
      //   </button>
      // </span>
    );
  }
  return null;
};

export default connect(
  null,
  { deleteArticle }
)(withRouter(ArticleActions));
