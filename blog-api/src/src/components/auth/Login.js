import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Tilt from 'react-tilt';

import { login } from '../../actions/auth';
import '../../assets/css/main.css';
import '../../assets/css/util.css';
import '../../index.css';
import Image from '../../assets/images/img-01.png';

const initialFormValues = {
  email: '',
  password: ''
};

const Login = ({ login, isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div
          className='wrap-login100'
          style={{ padding: '175px 90px 125px 75px' }}
        >
          <Tilt
            options={{ max: 55, perspective: 300, scale: 1.1, speed: 500 }}
            className='login100-pic js-tilt'
          >
            <img src={Image} alt='IMG' />
          </Tilt>
          <Formik
            initialValues={initialFormValues}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid Email')
                .required('Email is required'),
              password: Yup.string()
                .min(8, 'Password must be at least 8 characters long')
                .required('Password is required')
            })}
            onSubmit={({ email, password }, actions) => {
              login(email, password);
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className='login100-form validate-form'
              >
                <span className='login100-form-title'>Login</span>
                <Field
                  name='email'
                  render={({ field, form: { isSubmitting } }) => (
                    <Fragment>
                      <div className='wrap-input100 validate-input'>
                        <input
                          {...field}
                          className='input100'
                          type='email'
                          placeholder='Email'
                          disabled={isSubmitting}
                        />

                        <span className='focus-input100' />
                        <span className='symbol-input100'>
                          <i className='fa fa-envelope' aria-hidden='true' />
                        </span>
                      </div>
                      <ErrorMessage name='email'>
                        {msg => <div className='alert-danger'>{msg}</div>}
                      </ErrorMessage>
                    </Fragment>
                  )}
                />
                <Field
                  name='password'
                  render={({ field, form: { isSubmitting } }) => (
                    <Fragment>
                      <div className='wrap-input100 validate-input'>
                        <input
                          {...field}
                          className='input100'
                          placeholder='Password'
                          type='password'
                          disabled={isSubmitting}
                        />

                        <span className='focus-input100' />
                        <span className='symbol-input100'>
                          <i className='fa fa-lock' aria-hidden='true' />
                        </span>
                      </div>
                      <ErrorMessage name='password'>
                        {msg => <div className='alert-danger'>{msg}</div>}
                      </ErrorMessage>
                    </Fragment>
                  )}
                />
                <div className='container-login100-form-btn'>
                  <button
                    disabled={isSubmitting}
                    type='submit'
                    className='login100-form-btn'
                  >
                    Login
                  </button>
                </div>

                {/* <div className='text-center p-t-12'>
              <span className='txt1'>Forgot </span>
              <a className='txt2' href='#'>
                Username / Password?
              </a>
            </div> */}

                <div className='text-center p-t-136'>
                  <Link className='txt2 create' to='/register'>
                    Create An Account
                    <i
                      className='fa fa-long-arrow-right m-l-5'
                      aria-hidden='true'
                    />
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
