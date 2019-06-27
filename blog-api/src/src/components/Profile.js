import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ArticleList from './ArticleList';
import {
  followProfile,
  unFollowProfile,
  getCurrentProfile
} from '../actions/profile';
import { getArticlesByAuthor } from '../actions/articles';

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

const Profile = ({
  followProfile,
  unFollowProfile,
  profile,
  articles,
  currentUser,
  getCurrentProfile,
  getArticlesByAuthor,
  match
}) => {
  useEffect(() => {
    (async () => {
      await getCurrentProfile(match.params.username);
      await getArticlesByAuthor(match.params.username);
    })();
  }, [getCurrentProfile, match.params.username]);
  const renderTabs = () => {
    return (
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link className='nav-link active' to={`/${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to={`/${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  };

  if (!profile) {
    return null;
  }

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

            <ArticleList articles={articles} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  articles: state.articles.articles,
  currentUser: state.auth.user
});

export default connect(
  mapStateToProps,
  { followProfile, unFollowProfile, getCurrentProfile, getArticlesByAuthor }
)(Profile);
