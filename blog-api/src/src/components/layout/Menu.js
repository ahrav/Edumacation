import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ currentUser, logout }) => {
  let user;
  if (currentUser)
    user = (
      <Fragment>
        <li>
          <Link to='/'>
            <h3>Home</h3>
            <p>Wanna go back to the homepage?</p>
          </Link>
        </li>
        <li>
          <Link to='/editor'>
            <h3>New Posts</h3>
            <p>Create a new post to share</p>
          </Link>
        </li>
        <li>
          <Link to='/settings'>
            <h3>Profile</h3>
            <p>Update your profile</p>
          </Link>
        </li>
        <li>
          <Link to={`/@${currentUser.username}`}>
            <h3>{currentUser.username}</h3>
            <p>View your account</p>
          </Link>
        </li>
      </Fragment>
    );
  else {
    user = (
      <li>
        <Link to='/'>
          <h3>Home</h3>
          <p>Wanna go back to the homepage?</p>
        </Link>
      </li>
    );
  }
  return (
    <section id='menu'>
      <section>
        <form className='search'>
          <input type='text' name='query' placeholder='Search' />
        </form>
      </section>

      <section>
        <ul className='links'>{user}</ul>
      </section>
      {!currentUser ? (
        <section>
          <ul className='actions stacked'>
            <li>
              <Link to='/login' className='button large fit'>
                Sign In
              </Link>
            </li>
            <li>
              <Link to='/register' className='button large fit'>
                Sign Up
              </Link>
            </li>
          </ul>
        </section>
      ) : (
        <section>
          <ul className='actions stacked'>
            <li>
              <a onClick={logout} className='button large fit'>
                Log Out
              </a>
            </li>
          </ul>
        </section>
      )}
    </section>
  );
};

export default Menu;
