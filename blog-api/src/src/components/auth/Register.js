import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Tilt from 'react-tilt';

import { register } from '../../actions/auth';
import Image from '../../assets/images/img-01.png';

const initialFormValues = {
  username: '',
  email: '',
  password: '',
  password2: ''
};

const Register = ({ register, auth: { isAuthenticated } }) => {
  Yup.addMethod(Yup.mixed, 'isAvailable', function(param) {
    return this.test('isAvailable', `${param} already in use`, async function(
      value
    ) {
      const res = await axios.get(
        `/api/v1/users/check_user?${param}=${value}`
      );
      return !res.data.message;
    });
  });

  function equalTo(ref, msg) {
    return Yup.mixed().test({
      name: 'equalTo',
      exclusive: false,
      message: msg || '${path} must be the same as ${reference}',
      params: {
        reference: ref.path
      },
      test: function(value) {
        return value === this.resolve(ref);
      }
    });
  }
  Yup.addMethod(Yup.string, 'equalTo', equalTo);

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <section id='mainForm' className='containerForm medium'>
      <header>
        <h2>Register</h2>
        <p>Go on, create that account. You know you want to.</p>
      </header>
      <div className='boxForm'>
        <Formik
          initialValues={initialFormValues}
          validationSchema={Yup.object({
            username: Yup.string()
              .isAvailable('username', 'Username already in use')
              .required('Username is required'),
            email: Yup.string()
              .email('Invalid Email')
              .required('Email is required')
              .isAvailable('email'),
            password: Yup.string()
              .min(8, 'Password must be at least 8 characters long')
              .required('Password is required'),
            password2: Yup.string()
              .equalTo(Yup.ref('password'), 'Passwords must match')
              .required()
          })}
          onSubmit={({ username, email, password }, actions) => {
            register(username, email, password);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className='rowForm gtr-50 gtr-uniform'>
                <div className='col-6Form col-12-mobilep'>
                  <Field
                    name='username'
                    render={({ field, form: { isSubmitting } }) => (
                      <Fragment>
                        <div className='wrap-input100'>
                          <input
                            {...field}
                            type='text'
                            className='input100'
                            placeholder='Username'
                            disabled={isSubmitting}
                          />

                          <span className='focus-input100' />
                        </div>
                        <ErrorMessage name='username'>
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
                <div className='col-6Form col-12-mobilep'>
                  <Field
                    name='email'
                    render={({ field, form: { isSubmitting } }) => (
                      <Fragment>
                        <div className='wrap-input100'>
                          <input
                            {...field}
                            type='email'
                            className='input100'
                            placeholder='Email'
                            disabled={isSubmitting}
                          />

                          <span className='focus-input100' />
                        </div>
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
                <div className='col-6Form col-12-mobilep'>
                  <Field
                    name='password'
                    render={({ field, form: { isSubmitting } }) => (
                      <Fragment>
                        <div className='wrap-input100'>
                          <input
                            {...field}
                            type='password'
                            placeholder='Password'
                            className='input100'
                            disabled={isSubmitting}
                          />

                          <span className='focus-input100' />
                        </div>
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
                <div className='col-6Form col-12-mobilep'>
                  <Field
                    name='password2'
                    render={({ field, form: { isSubmitting } }) => (
                      <Fragment>
                        <div className='wrap-input100'>
                          <input
                            {...field}
                            type='password'
                            placeholder='Confirm Password'
                            className='input100'
                            disabled={isSubmitting}
                          />

                          <span className='focus-input100' />
                        </div>
                        <ErrorMessage name='password2'>
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
                <div className='col-12Form'>
                  <ul className='actions special'>
                    <li>
                      <input type='submit' value='Register' />
                    </li>
                  </ul>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
    // <div className='limiter'>
    //   <div className='container-login100'>
    //     <div className='wrap-login100'>
    //       <Tilt
    //         options={{ max: 55, perspective: 300, scale: 1.1, speed: 500 }}
    //         className='login100-pic js-tilt'
    //       >
    //         <img src={Image} alt='IMG' />
    //       </Tilt>

    //       <Formik
    //         initialValues={initialFormValues}
    //         validationSchema={Yup.object({
    //           username: Yup.string()
    //             .isAvailable('username', 'Username already in use')
    //             .required('Username is required'),
    //           email: Yup.string()
    //             .email('Invalid Email')
    //             .required('Email is required')
    //             .isAvailable('email'),
    //           password: Yup.string()
    //             .min(8, 'Password must be at least 8 characters long')
    //             .required('Password is required'),
    //           password2: Yup.string()
    //             .equalTo(Yup.ref('password'), 'Passwords must match')
    //             .required()
    //         })}
    //         onSubmit={({ username, email, password }, actions) => {
    //           register(username, email, password);
    //           actions.setSubmitting(false);
    //         }}
    //       >
    //         {({ isSubmitting, handleSubmit }) => (
    //           <Form
    //             onSubmit={handleSubmit}
    //             className='login100-form validate-form'
    //           >
    //             <span className='login100-form-title'>Register</span>
    //             <Field
    //               name='username'
    //               render={({ field, form }) => (
    //                 <Fragment>
    //                   <div className='wrap-input100 validate-input'>
    //                     <input
    //                       {...field}
    //                       className='input100'
    //                       type='username'
    //                       placeholder='Username'
    //                       disabled={form.isSubmitting}
    //                     />

    //                     <span className='focus-input100' />
    //                     <span className='symbol-input100'>
    //                       <i className='fa fa-user' aria-hidden='true' />
    //                     </span>
    //                   </div>
    //                   <ErrorMessage name='username'>
    //                     {msg => <div className='alert-danger'>{msg}</div>}
    //                   </ErrorMessage>
    //                 </Fragment>
    //               )}
    //             />
    //             <Field
    //               name='email'
    //               render={({ field, form }) => (
    //                 <Fragment>
    //                   <div className='wrap-input100 validate-input'>
    //                     <input
    //                       {...field}
    //                       className='input100'
    //                       placeholder='Email'
    //                       type='email'
    //                       disabled={form.isSubmitting}
    //                     />

    //                     <span className='focus-input100' />
    //                     <span className='symbol-input100'>
    //                       <i className='fa fa-envelope' aria-hidden='true' />
    //                     </span>
    //                   </div>
    //                   <ErrorMessage name='email'>
    //                     {msg => <div className='alert-danger'>{msg}</div>}
    //                   </ErrorMessage>
    //                 </Fragment>
    //               )}
    //             />
    //             <Field
    //               name='password'
    //               render={({ field, form: { isSubmitting } }) => (
    //                 <Fragment>
    //                   <div className='wrap-input100 validate-input'>
    //                     <input
    //                       {...field}
    //                       className='input100'
    //                       placeholder='Password'
    //                       type='password'
    //                       disabled={isSubmitting}
    //                     />

    //                     <span className='focus-input100' />
    //                     <span className='symbol-input100'>
    //                       <i className='fa fa-lock' aria-hidden='true' />
    //                     </span>
    //                   </div>
    //                   <ErrorMessage name='password'>
    //                     {msg => <div className='alert-danger'>{msg}</div>}
    //                   </ErrorMessage>
    //                 </Fragment>
    //               )}
    //             />
    //             <Field
    //               name='password2'
    //               render={({ field, form: { isSubmitting } }) => (
    //                 <Fragment>
    //                   <div className='wrap-input100 validate-input'>
    //                     <input
    //                       {...field}
    //                       className='input100'
    //                       placeholder='Confirm Password'
    //                       type='password'
    //                       disabled={isSubmitting}
    //                     />

    //                     <span className='focus-input100' />
    //                     <span className='symbol-input100'>
    //                       <i className='fa fa-lock' aria-hidden='true' />
    //                     </span>
    //                   </div>
    //                   <ErrorMessage name='password2'>
    //                     {msg => <div className='alert-danger'>{msg}</div>}
    //                   </ErrorMessage>
    //                 </Fragment>
    //               )}
    //             />
    //             <div className='container-login100-form-btn'>
    //               <button
    //                 disabled={isSubmitting}
    //                 className='login100-form-btn'
    //                 type='submit'
    //               >
    //                 Register
    //               </button>
    //             </div>

    //             <div className='text-center p-t-136'>
    //               <Link className='txt2 create' to='/login'>
    //                 Already have an account? Login
    //                 <i
    //                   className='fa fa-long-arrow-right m-l-5'
    //                   aria-hidden='true'
    //                 />
    //               </Link>
    //             </div>
    //           </Form>
    //         )}
    //       </Formik>
    //     </div>
    //   </div>
    // </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
