import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import ArticleList from '../article/ArticleList';
import {
  followProfile,
  unFollowProfile,
  getCurrentProfile
} from '../../actions/profile';
import { getArticlesByAuthor, onSetPage } from '../../actions/articles';

const EditProfileSettings = ({ isUser }) => {
  if (isUser) {
    return (
      <Link
        to='/settings'
        className='btn btn-sm btn-outline-secondary action-btn'
      >
        <i className='fa fa-gear' /> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = ({ isUser, user, unfollow, follow }) => {
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
      unfollow(user.username);
    } else {
      follow(user.username);
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
  articles: { articles, articleCount, currentPage },
  currentUser,
  getCurrentProfile,
  getArticlesByAuthor,
  match,
  onSetPage
}) => {
  useEffect(() => {
    (async () => {
      await getCurrentProfile(match.params.username);
      await getArticlesByAuthor(match.params.username);
    })();
  }, [getCurrentProfile, getArticlesByAuthor, match.params.username]);

  const settingPage = page => {
    onSetPage(() => getArticlesByAuthor(profile.username, page));
  };

  const renderTabs = () => {
    return (
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link className='nav-link active' to={`/@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to={`/@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  };

  const setPage = page => settingPage(page);

  if (!profile) {
    return null;
  }

  const isUser = currentUser && profile.username === currentUser.username;

  return (
    <div id='main'>
      <article className='post'>
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
            <span id='profileSettingsButton'>
              <EditProfileSettings isUser={isUser} />
              <Icon style={{ marginLeft: '.40em' }} name='settings' />
            </span>
          </div>
        </header>
      </article>
    </div>
    // <div className='profile-page'>
    //   <div className='user-info'>
    //     <div className='container'>
    //       <div className='row'>
    //         <div className='col-xs-12 col-md-10 offset-md-1'>
    //           <img src={profile.image} alt='' className='user-img' />
    //           <h4>{profile.username}</h4>
    //           <p>{profile.bio}</p>

    //           <EditProfileSettings isUser={isUser} />
    //           <FollowUserButton
    //             isUser={isUser}
    //             user={profile}
    //             follow={followProfile}
    //             unfollow={unFollowProfile}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className='container'>
    //     <div className='row'>
    //       <div className='col-xs-12 col-md-10 offset-md-1'>
    //         <div className='articles-toggle'>{renderTabs()}</div>

    //         <ArticleList
    //           articles={articles}
    //           articlesCount={articleCount}
    //           currentPage={currentPage}
    //           onSetPage={setPage}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  articles: state.articles,
  currentUser: state.auth.user
});

export default connect(
  mapStateToProps,
  {
    followProfile,
    unFollowProfile,
    getCurrentProfile,
    getArticlesByAuthor,
    onSetPage
  }
)(Profile);
