import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateUser } from '../../actions/profile';
import '../../assets/css/main.css';
import '../../assets/css/util.css';

const SettingsForm = (
  { auth: { user, loading }, history, updateUser },
  logout
) => {
  const [formData, setFormData] = useState({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFormData({
      image: loading || !user.image ? '' : user.image,
      username: loading || !user.username ? '' : user.username,
      bio: loading || !user.bio ? '' : user.bio,
      email: loading || !user.email ? '' : user.email
    });
  }, [loading, user]);

  const { image, username, bio, email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateUser(formData, history, true);
  };

  return (
    <div className='limiter'>
      <div className='container-profile100'>
        <div className='wrap-profile100'>
          <form
            onSubmit={e => onSubmit(e)}
            className='profile100-form validate-form'
          >
            <span className='profile100-form-title'>My Profile</span>

            <div className='wrap-input100 validate-input'>
              <input
                className='input100'
                type='text'
                value={image}
                onChange={e => onChange(e)}
                name='image'
                placeholder='Url of profile picture'
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-user' aria-hidden='true' />
              </span>
            </div>

            <div className='wrap-input100 validate-input'>
              <input
                className='input100'
                type='text'
                name='username'
                placeholder='Username'
                onChange={e => onChange(e)}
                value={username}
                required
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-id-card' aria-hidden='true' />
              </span>
            </div>

            <div className='wrap-input100 validate-input'>
              <textarea
                className='input100-area'
                type='text'
                name='bio'
                placeholder='Short bio'
                onChange={e => onChange(e)}
                value={bio}
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-trophy' aria-hidden='true' />
              </span>
            </div>

            <div className='wrap-input100 validate-input'>
              <input
                className='input100'
                type='email'
                name='email'
                placeholder='Email'
                onChange={e => onChange(e)}
                value={email}
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-envelope' aria-hidden='true' />
              </span>
            </div>

            <div className='wrap-input100 validate-input'>
              <input
                className='input100'
                type='password'
                name='password'
                placeholder='Password'
                onChange={e => onChange(e)}
                value={password || ''}
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-lock' aria-hidden='true' />
              </span>
            </div>

            <div className='container-login100-form-btn'>
              <button disabled={loading} className='login100-form-btn'>
                Update Profile
              </button>
              <div className='container-login100-form-btn'>
                <button
                  onClick={logout}
                  disabled={loading}
                  className='logout100-form-btn'
                >
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateUser }
)(withRouter(SettingsForm));
