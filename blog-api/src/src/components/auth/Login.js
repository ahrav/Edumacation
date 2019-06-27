import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';

import { login } from '../../actions/auth';
import ListErrors from '../ListErrors';
import './style.css';
import Register from './Register';

const Login = ({ login, isAuthenticated, inProgress, errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <div className='body'>
      <div className='materialContainer'>
        <div className='box'>
          <div id='login' className='title'>
            LOGIN
          </div>
          <form onSubmit={e => onSubmit(e)}>
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
              <label>
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
              </label>
            </div>

            <div className='button login'>
              <button disabled={inProgress}>
                <span>GO</span> <i className='fa fa-check' />
              </button>
            </div>
          </form>

          <a href='' className='pass-forgot'>
            Forgot your password?
          </a>
        </div>
        <Register />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  inProgress: state.auth.inProgress,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
