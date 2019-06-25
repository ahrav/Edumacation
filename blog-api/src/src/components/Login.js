import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { login } from '../actions/auth';
import ListErrors from './ListErrors';

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

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign In</h1>
            <p className='text-xs-center'>
              <Link to='/register'>Need an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={e => onSubmit(e)}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={e => onChange(e)}
                    value={password}
                    required
                    minLength='8'
                  />
                </fieldset>

                <button
                  className='btn btn-lg btn-primary pull-xs-right'
                  type='submit'
                  disabled={inProgress}
                >
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
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
