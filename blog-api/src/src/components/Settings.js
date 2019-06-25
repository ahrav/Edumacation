import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListErrors from './ListErrors';
import { logout } from '../actions/auth';
import SettingsForm from './SettingsForm';
// import {update_profile} from '../actions/profile'

const Settings = ({ currentUser, logout, errors }) => {
  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>

            <ListErrors errors={errors} />

            <SettingsForm currentUser={currentUser} onSubmitForm={() => {}} />

            <hr />

            <button
              className='btn btn-outline-danger'
              onClick={() => logout()}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { logout }
)(Settings);
