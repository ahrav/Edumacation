import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import ArticleMeta from './ArticleMeta';
import CommentContainer from '../comments/CommentContainer';
import Spinner from '../layout/Spinner';
import marked from 'marked';
import { Icon } from 'semantic-ui-react';
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
      <div id='main'>
        <article className='post'>
          <header>
            <div className='title'>
              <h2>{article.title}</h2>
              <time className='published' dateTime={article.createdAt}>
                {moment(article.createdAt).format('MMMM DD, YYYY')}
              </time>
            </div>
            <ArticleMeta article={article} canModify={canModify} />
          </header>
          <a href='' className='image featured'>
            <img src={article.image} alt='' />
          </a>
          <p>{article.body}</p>
          <footer>
            <ul className='stats'>
              {article.tagList.map(tag => {
                return (
                  <li key={tag}>
                    <i className='icon solid fa-hashtag' />
                    {tag}
                  </li>
                );
              })}

              <li>
                <Icon name='heart' size='large' />
                <span style={{ fontSize: '1.4em' }}>
                  {article.favoritesCount}
                </span>
              </li>
              <li>
                <Icon name='comments' size='large' />
                <span style={{ fontSize: '1.4em' }}>
                  {article.commentsCount}
                </span>
              </li>
            </ul>
          </footer>
        </article>
        <CommentContainer
          comments={article.comments || []}
          errors={article.commentErrors}
          slug={match.params.id}
          currentUser={currentUser}
          loading={loading}
        />
      </div>

      {/* <div className='article-page'>
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
      </div> */}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  article: state.articles
});

export default connect(
  mapStateToProps,
  { getArticle, getArticleComments }
)(Article);
