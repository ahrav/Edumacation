import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  followProfile,
  unFollowProfile,
  getCurrentProfile
} from '../../actions/profile';
import { getFavoritedArticles } from '../../actions/articles';
import ArticleList from '../article/ArticleList';

const EditProfileSettings = ({ isUser }) => {
  if (isUser) {
    return (
      <Link
        to='settings'
        className='btn btn-sm btn-outline-secondary action-btn'
      >
        <i className='ion-gear-a' /> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = ({
  isUser,
  user,
  unFollowProfile,
  followProfile
}) => {
  if (isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = e => {
    e.preventDefault();
    if (user.following) {
      followProfile(user.username);
    } else {
      unFollowProfile(user.username);
    }
  };

  return (
    <button className={classes} onClick={e => handleClick(e)}>
      <i className='ion-plus-round' />
      &nbsp;
      {user.following ? 'Unfollow' : 'Follow'} {user.username}
    </button>
  );
};

const ProfileFavorites = ({
  getFavoritedArticles,
  followProfile,
  unFollowProfile,
  match,
  profile,
  currentUser,
  articles: { articles, articleCount, currentPage }
}) => {
  useEffect(() => {
    (async () => {
      await getCurrentProfile(match.params.username);
      await getFavoritedArticles(match.params.username);
    })();
  }, [getCurrentProfile, getFavoritedArticles, match.params.username]);

  const renderTabs = () => {
    return (
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link className='nav-link' to={`/${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link active'
            to={`/${profile.username}/favorites`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  };
  const isUser = currentUser && profile.username === currentUser.username;
  return (
    <div className='profile-page'>
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <img src={profile.image} className='user-img' />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <EditProfileSettings isUser={isUser} />
              <FollowUserButton
                isUser={isUser}
                user={profile}
                follow={followProfile}
                unfollow={unFollowProfile}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <div className='articles-toggle'>{renderTabs()}</div>

            <ArticleList
              articles={articles}
              currentPage={currentPage}
              articlesCount={articleCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  currentUser: state.auth.user,
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { followProfile, unFollowProfile, getFavoritedArticles }
)(ProfileFavorites);
