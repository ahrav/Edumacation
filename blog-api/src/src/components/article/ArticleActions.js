import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteArticle } from '../../actions/articles';

const ArticleActions = ({ deleteArticle, article: { slug }, canModify }) => {
  if (canModify) {
    return (
      <span>
        <Link
          to={`/editor/${slug}`}
          className='btn btn-outline-secondary btn-sm'
        >
          <i className='ion-edit' /> Edit Article
        </Link>

        <button
          className='btn btn-outline-danger btn-sm'
          onClick={() => deleteArticle(slug)}
          style={{ marginLeft: '3px' }}
        >
          <i className='ion-trash-a' /> Delete Article
        </button>
      </span>
    );
  }
  return <span />;
};

export default connect(
  null,
  { deleteArticle }
)(ArticleActions);
