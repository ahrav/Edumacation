import React, { Fragment } from 'react';

import Spinner from '../../layout/Spinner';
import CommentArticle from './CommentArticle';

const CommentArticleList = ({ commentArticles, loading }) => {
  let view;
  loading || !commentArticles
    ? (view = <Spinner />)
    : (view = commentArticles.map(article => {
        return <CommentArticle key={article.slug} article={article} />;
      }));
  return (
    <Fragment>
      <h3 className='miniPostHeader'>Conversational Articles</h3>
      {view}
    </Fragment>
  );
};

export default CommentArticleList;
