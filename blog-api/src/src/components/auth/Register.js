import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import ListErrors from '../ListErrors';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Register = ({
  register,
  setAlert,
  auth: { isAuthenticated, errors, inProgress }
}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do no match', 'danger');
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <form onSubmit={e => onSubmit(e)}>
      <div className='overbox'>
        <div className='material-button alt-2'>
          <span className='shape' />
        </div>

        <div className='title'>REGISTER</div>

        <div className='input'>
          <label>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={e => onChange(e)}
              required
            />
            <span className='spin' />
          </label>
        </div>
        <div className='input'>
          <label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
            <span className='spin' />
          </label>
        </div>

        <div className='input'>
          <label />
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={e => onChange(e)}
            value={password}
            required
            minLength='8'
          />
          <span className='spin' />
        </div>

        <div className='input'>
          <label />
          <input
            type='password'
            placeholder='Re-enter Password'
            name='password2'
            required
            value={password2}
            onChange={e => onChange(e)}
          />
          <span className='spin' />
        </div>

        <div className='button'>
          <button>
            <span>NEXT</span>
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register, setAlert }
)(Register);
