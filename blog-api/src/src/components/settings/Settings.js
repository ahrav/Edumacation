import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListErrors from '../ListErrors';
import { logout } from '../../actions/auth';
import SettingsForm from './SettingsForm';

const Settings = ({ logout, errors }) => {
  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <ListErrors errors={errors} />

            <SettingsForm />

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
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { logout }
)(Settings);
