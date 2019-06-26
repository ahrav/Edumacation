import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import Spinner from '../layout/Spinner';
import marked from 'marked';
import { getArticle, getArticleComments } from '../../actions/articles';

const Article = ({
  article: { body, title, author, tagList },
  currentUser,
  match,
  loading,
  comments,
  commentErrors
}) => {
  useEffect(() => {
    getArticle(match.params.id);
    getArticleComments(match.params.id);
  }, [getArticle, getArticleComments, match.params.id]);

  const markup = { __html: marked(body) };
  const canModify = currentUser && currentUser.username === author.username;

  return loading || article === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>{title}</h1>
            <ArticleMeta article={article} canModify={canModify} />
          </div>
        </div>

        <div className='container page'>
          <div className='row article-content'>
            <div className='col-xs-12'>
              <div dangerouslySetInnerHTML={markup} />

              <ul className='tag-list'>
                {tagList.map(tag => {
                  return (
                    <li className='tag-default tag-pill tag-outline' key={tag}>
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <hr />

          <div className='article-actions' />

          <div className='row'>
            <CommentContainer
              comments={comments || []}
              errors={commentErrors}
              slug={match.params.id}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
  return <div />;
};

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  article: state.article
});

export default connect(
  mapStateToProps,
  { getArticle, getArticleComments }
)(Article);
