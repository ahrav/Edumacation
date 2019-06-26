import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import Spinner from '../layout/Spinner';
import marked from 'marked';
import { getArticle, getArticleComments } from '../../actions/articles';

const Article = ({
  article: { article, loading },
  currentUser,
  match,
  getArticle,
  getArticleComments
}) => {
  useEffect(() => {
    (async () => {
      await getArticle(match.params.id);
      await getArticleComments(match.params.id);
    })();
  }, [getArticleComments, getArticle, match.params.id]);

  if (loading || article === null) return <Spinner />;
  const markup = { __html: marked(article.body) };
  const canModify =
    currentUser && currentUser.username === article.author.username;
  return (
    <Fragment>
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>{article.title}</h1>
            <ArticleMeta article={article} canModify={canModify} />
          </div>
        </div>

        <div className='container page'>
          <div className='row article-content'>
            <div className='col-xs-12'>
              <div dangerouslySetInnerHTML={markup} />

              <ul className='tag-list'>
                {article.tagList.map(tag => {
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
              comments={article.comments || []}
              errors={article.commentErrors}
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
  article: state.articles
});

export default connect(
  mapStateToProps,
  { getArticle, getArticleComments }
)(Article);
