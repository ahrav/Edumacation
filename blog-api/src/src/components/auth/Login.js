import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { login } from '../../actions/auth';

const initialFormValues = {
  email: '',
  password: ''
};

const Login = ({ login, isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <section id='main' className='container medium'>
      <header>
        <h2>Login</h2>
        <p>Login and spread the word!</p>
      </header>
      <div className='box'>
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
            <Form onSubmit={handleSubmit}>
              <div className='row gtr-50 gtr-uniform'>
                <div className='col-6 col-12-mobilep'>
                  <Field
                    name='email'
                    render={({ field, form: { isSubmitting } }) => (
                      <Fragment>
                        <input
                          {...field}
                          type='email'
                          placeholder='Email'
                          disabled={isSubmitting}
                        />

                        <span className='focus-input100' />
                        <ErrorMessage name='email'>
                          {msg => (
                            <div
                              style={{ color: 'darkRed' }}
                              className='alert-danger'
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </Fragment>
                    )}
                  />
                </div>
                <div className='col-6 col-12-mobilep'>
                  <Field
                    name='password'
                    render={({ field, form: { isSubmitting } }) => (
                      <Fragment>
                        <input
                          {...field}
                          type='password'
                          placeholder='Password'
                          disabled={isSubmitting}
                        />

                        <span className='focus-input100' />
                        <ErrorMessage name='password'>
                          {msg => (
                            <div
                              style={{ color: 'darkRed' }}
                              className='alert-danger'
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </Fragment>
                    )}
                  />
                </div>
                <div className='col-12'>
                  <ul className='actions special'>
                    <li>
                      <input type='submit' value='Login' />
                    </li>
                  </ul>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
