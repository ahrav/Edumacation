import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import ListErrors from './ListErrors';
import { register } from '../actions/auth';
import { setAlert } from '../actions/alert';

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
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign Up</h1>
            <p className='text-xs-center'>
              <Link to='/login'>Have an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={e => onSubmit(e)}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={username}
                    onChange={e => onChange(e)}
                    required
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
                    required
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='Enter Password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    required
                    minLength='8'
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='Re-enter Password'
                    name='password2'
                    required
                    value={password2}
                    onChange={e => onChange(e)}
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register, setAlert }
)(Register);
