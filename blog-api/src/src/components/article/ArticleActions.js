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
        <span
          id='delete'
          style={{ width: '8.8em' }}
          className='profileSettingsButton'
        >
          <Button
            id='deleteArticleButton'
            style={{
              letterSpacing: '.06em',
              fontSize: '100%',
              fontWeight: 400,
              width: '140px',
              height: '30px'
            }}
            onClick={() => deleteArticle(slug, history)}
            size='tiny'
            labelPosition='right'
          >
            Delete Article
            <Icon style={{ marginLeft: '.2em' }} name='trash' />
          </Button>
        </span>
      </Fragment>
    );
  }
  return null;
};

export default connect(
  null,
  { deleteArticle }
)(withRouter(ArticleActions));
