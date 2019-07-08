import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from './Menu';
import { logout } from '../../actions/auth';

const LoggedOutView = ({ currentUser, appName }) => {
  if (!currentUser) {
    return (
      <ul>
        <li>
          <NavLink exact activeClassName='activeLink' to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='activeLink' to='/login'>
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='activeLink' to='/register'>
            Sign Up
          </NavLink>
        </li>
        {/* <li>
          <a href='#'>Tempus</a>
        </li>
        <li>
          <a href='#'>Adipiscing</a>
        </li> */}
      </ul>
    );
  }
  return null;
};

const LoggedInView = ({ currentUser }) => {
  if (currentUser) {
    return (
      <ul>
        <li>
          <NavLink exact to='/' activeClassName='activeLink'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/editor' activeClassName='activeLink'>
            New Post
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='activeLink' to='/settings'>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeClassName='activeLink'
            to={`/@${currentUser.username}`}
          >
            {currentUser.username}
          </NavLink>
        </li>
      </ul>
    );
  }

  return null;
};

const Header = ({ appName, currentUser, logout, history }) => {
  const onLogout = e => {
    e.preventDefault();
    logout(history);
  };

  return (
    <Fragment>
      <header id='header'>
        <h1>
          <NavLink to='/'>{appName}</NavLink>
        </h1>
        <nav className='links'>
          <LoggedOutView currentUser={currentUser} />

          <LoggedInView currentUser={currentUser} />
        </nav>
        <nav className='main'>
          <ul>
            <li className='search'>
              <a className='fa-search' href='#search'>
                Search
              </a>
              <form id='search' method='get' action='#'>
                <input type='text' name='query' placeholder='Search' />
              </form>
            </li>
            <li className='menu'>
              <a className='fa-bars' href='#menu'>
                Menu
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <Menu currentUser={currentUser} logout={e => onLogout(e)} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
