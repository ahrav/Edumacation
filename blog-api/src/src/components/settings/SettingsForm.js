import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateUser } from '../../actions/profile';

const SettingsForm = ({ auth: { user, loading }, history, updateUser }) => {
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
      <fieldset>
        <fieldset className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='URL of profile picture'
            value={image}
            name='image'
            onChange={e => onChange(e)}
          />
        </fieldset>

        <fieldset className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
          />
        </fieldset>

        <fieldset className='form-group'>
          <textarea
            className='form-control form-control-lg'
            rows='8'
            placeholder='Short bio about you'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
        </fieldset>

        <fieldset className='form-group'>
          <input
            className='form-control form-control-lg'
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </fieldset>

        <fieldset className='form-group'>
          <input
            className='form-control form-control-lg'
            type='password'
            placeholder='New Password'
            name='password'
            value={password || ''}
            onChange={e => onChange(e)}
          />
        </fieldset>

        <button
          className='btn btn-lg btn-primary pull-xs-right'
          type='submit'
          disabled={loading}
        >
          Update Settings
        </button>
      </fieldset>
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
