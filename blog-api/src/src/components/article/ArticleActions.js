import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';

import { deleteArticle } from '../../actions/articles';

const ArticleActions = ({
  deleteArticle,
  article: { slug },
  canModify,
  history
}) => {
  if (canModify) {
    return (
      <Fragment>
        <span className='profileSettingsButton'>
          <Link style={{ borderBottom: 'none' }} to={`/editor/${slug}`}>
            Edit Article
          </Link>
          <Icon style={{ marginLeft: '.40em' }} name='edit' />
        </span>
        <span style={{ width: '131px' }} className='profileSettingsButton'>
          <Button
            id='deleteArticleButton'
            style={{
              letterSpacing: '.06em',
              fontSize: '100%',
              fontWeight: 400,
              width: '140px',
              height: '30px'
            }}
            content='Delete'
            size='tiny'
            labelPosition='right'
          >
            Delete Article
            <Icon style={{ marginLeft: '.4em' }} name='trash' />
          </Button>
        </span>
      </Fragment>
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
