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
          <ListErrors errors={errors} />

          <SettingsForm logout={() => logout()} />
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
