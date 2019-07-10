import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import {
  followProfile,
  unFollowProfile,
  getCurrentProfile
} from '../../actions/profile';
import { getFavoritedArticles, onSetPage } from '../../actions/articles';
import ArticleList from '../article/ArticleList';

const EditProfileSettings = ({ isUser }) => {
  if (isUser) {
    return (
      <span id='profileSettingsButton'>
        <Link to='/settings'>Edit Profile Settings</Link>
        <Icon style={{ marginLeft: '.40em' }} name='settings' />
      </span>
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

  let id;
  let sign;
  if (user.following) {
    id = 'profileFollowButtonUnfollow';
    sign = 'minus';
  } else {
    sign = 'plus';
    id = 'profileFollowButtonFollow';
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
    <button id={id} onClick={e => handleClick(e)}>
      <Icon name={sign} />
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

  const settingPage = page => {
    onSetPage(() => getFavoritedArticles(profile.username, page));
  };

  const renderTabs = () => {
    return (
      <nav className='links'>
        <ul>
          <li>
            <NavLink
              exact
              activeClassName='activeLink'
              to={`/@${profile.username}`}
            >
              My Articles
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink
              exact
              activeClassName='activeLink'
              to={`/@${profile.username}/favorites`}
            >
              Favorited Articles
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  };
  const isUser = currentUser && profile.username === currentUser.username;
  const setPage = page => settingPage(page);
  return (
    <div id='main'>
      <article style={{ marginBottom: '1em' }} className='post'>
        <header>
          <div className='title'>
            <h2>{profile.username}</h2>
            <p>{profile.bio}</p>
          </div>
          <div className='meta'>
            <time className='published'>
              followers: {profile.followerCount}
            </time>
            <a href='' className='author'>
              {/* <span className='name'>{article.author.username}</span> */}
              <img src={profile.image} alt='' />
            </a>
            <EditProfileSettings isUser={isUser} />
            <FollowUserButton
              isUser={isUser}
              user={profile}
              follow={followProfile}
              unfollow={unFollowProfile}
            />
          </div>
        </header>
      </article>
      <div id='main2'>
        <header id='header2'>{renderTabs()}</header>
        <div className='profileArticle'>
          <ArticleList
            articles={articles}
            articlesCount={articleCount}
            currentPage={currentPage}
            onSetPage={setPage}
          />
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
  { followProfile, unFollowProfile, getFavoritedArticles, onSetPage }
)(ProfileFavorites);
