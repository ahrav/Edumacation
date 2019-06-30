import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Tilt from 'react-tilt';

import { login } from '../../actions/auth';
import '../../assets/css/main.css';
import '../../assets/css/util.css';
import Image from '../../assets/images/img-01.png';

const Login = ({ login, isAuthenticated, loading, errors }) => {
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
    setFormData({ email: '', password: '' });
  };

  if (isAuthenticated) return <Redirect to='/' />;

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
            <span className='login100-form-title'>Login</span>

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
              />
              <span className='focus-input100' />
              <span className='symbol-input100'>
                <i className='fa fa-lock' aria-hidden='true' />
              </span>
            </div>

            <div className='container-login100-form-btn'>
              <button disabled={loading} className='login100-form-btn'>
                Login
              </button>
            </div>

            <div className='text-center p-t-12'>
              <span className='txt1'>Forgot </span>
              <a className='txt2' href='#'>
                Username / Password?
              </a>
            </div>

            <div className='text-center p-t-136'>
              <Link className='txt2 create' to='/register'>
                Create An Account
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
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
