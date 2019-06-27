import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  followProfile,
  unFollowProfile,
  getCurrentProfile
} from '../actions/profile';
import { getFavoritedArticles } from '../actions/articles';

const ProfileFavorites = ({
  getFavoritedArticles,
  followProfile,
  unFollowProfile,
  match,
  profile
}) => {
  useEffect(() => {
    async () => {
      await getCurrentProfile(match.params.username);
      await getFavoritedArticles(match.params.username);
    };
  });

  const renderTabs = () => {
    return (
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link className='nav-link active' to={`@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to={`@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  };
  return (
    <Fragment>
      {renderTabs()}
      {/* <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul> */}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { followProfile, unFollowProfile, getFavoritedArticles }
)(ProfileFavorites);
