import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Tilt from 'react-tilt';

import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Image from '../../assets/images/img-01.png';

const Register = ({
  register,
  setAlert,
  auth: { isAuthenticated, errors, loading }
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
    setFormData({ username: '', email: '', password: '', password2: '' });
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div className='wrap-login100'>
          <Tilt
            options={{ max: 55, perspective: 300, scale: 1.1, speed: 500 }}
            className='login100-pic js-tilt'
          >
            <img src={Image} alt='IMG' />
          </Tilt>

          <form
            onSubmit={e => onSubmit(e)}
            className='login100-form validate-form'
          >
            <span className='login100-form-title'>Register</span>

            <div
              className='wrap-input100 validate-input'
              data-validate='Valid email is required: ex@abc.xyz'
            >
              <input
                className='input100'
                type='text'
                required
                value={username}
                onChange={e => onChange(e)}
                name='username'
                placeholder='Username'
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-envelope' aria-hidden='true' />
              </span>
            </div>

            <div
              className='wrap-input100 validate-input'
              data-validate='Valid email is required: ex@abc.xyz'
            >
              <input
                className='input100'
                type='email'
                required
                value={email}
                onChange={e => onChange(e)}
                name='email'
                placeholder='Email'
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-envelope' aria-hidden='true' />
              </span>
            </div>

            <div
              className='wrap-input100 validate-input'
              data-validate='Password is required'
            >
              <input
                className='input100'
                type='password'
                name='password'
                placeholder='Password'
                onChange={e => onChange(e)}
                value={password}
                required
                minLength='8'
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-lock' aria-hidden='true' />
              </span>
            </div>
            <div
              className='wrap-input100 validate-input'
              data-validate='Password is required'
            >
              <input
                className='input100'
                type='password'
                name='password2'
                placeholder='Confirm Password'
                onChange={e => onChange(e)}
                value={password2}
                required
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-lock' aria-hidden='true' />
              </span>
            </div>

            <div className='container-login100-form-btn'>
              <button disabled={loading} className='login100-form-btn'>
                Register
              </button>
            </div>

            <div className='text-center p-t-136'>
              <Link className='txt2 create' to='/login'>
                Already have an account? Login
                <i
                  className='fa fa-long-arrow-right m-l-5'
                  aria-hidden='true'
                />
              </Link>
            </div>
          </form>
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
