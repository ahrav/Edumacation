import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const LoggedOutView = ({ currentUser, appName }) => {
  if (!currentUser) {
    return (
      <ul className='nav navbar-nav pull-xs-right'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='login' className='nav-link'>
            Sign in
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='register' className='nav-link'>
            Sign up
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = ({ currentUser }) => {
  if (currentUser) {
    return (
      <ul className='nav navbar-nav pull-xs-right'>
        <li className='nav-item'>
          <Link to='' className='nav-link'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='editor' className='nav-link'>
            <i className='ion-compose' />
            &nbsp;New Post
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/settings' className='nav-link'>
            <i className='ion-gear-a' />
            &nbsp;Settings
          </Link>
        </li>

        <li className='nav-item'>
          <Link to={`/${currentUser.username}`} className='nav-link'>
            <img src={currentUser.image} className='user-pic' />
            {currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

const Header = ({ appName, currentUser }) => {
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          {appName}
        </Link>

        <LoggedOutView currentUser={currentUser} />

        <LoggedInView currentUser={currentUser} />
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(Header);
