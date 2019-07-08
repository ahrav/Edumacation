import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateUser } from '../../actions/profile';
import '../../assets/css/main.css';
import '../../assets/css/util.css';

const SettingsForm = ({
  auth: { user, loading },
  history,
  updateUser,
  logOut
}) => {
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
    <form onSubmit={e => onSubmit(e)}>
      <div className='rowForm gtr-50 gtr-uniform'>
        <div className='col-6Form col-12-mobilep'>
          <input
            className='input100'
            type='text'
            value={image}
            onChange={e => onChange(e)}
            name='image'
            placeholder='Url of profile picture'
          />
          <span className='focus-input100' />
        </div>

        <div className='col-6Form col-12-mobilep'>
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
        </div>

        <div className='col-6Form col-12-mobilep'>
          <input
            className='input100'
            type='email'
            name='email'
            placeholder='Email'
            onChange={e => onChange(e)}
            value={email}
          />
          <span className='focus-input100' />
        </div>

        <div className='col-6Form col-12-mobilep'>
          <input
            className='input100'
            type='password'
            name='password'
            placeholder='Password'
            onChange={e => onChange(e)}
            value={password || ''}
          />
          <span className='focus-input100' />
        </div>

        <div className='col-12Form'>
          <textarea
            className='input100-area'
            type='text'
            name='bio'
            placeholder='Short bio'
            onChange={e => onChange(e)}
            value={bio}
          />
          <span className='focus-input100' />
        </div>

        <div className='col-12Form'>
          <ul className='actions special'>
            <li>
              <button
                type='button'
                onClick={e => onSubmit(e)}
                disabled={loading}
              >
                Update Profile
              </button>
            </li>
            {/* <li>
              <button type='button' onClick={logOut} disabled={loading}>
                Logout
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </form>
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
