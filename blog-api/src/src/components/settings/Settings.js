import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';
import SettingsForm from './SettingsForm';

const Settings = ({ logout }) => {
  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <SettingsForm logOut={() => logout()} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { logout }
)(Settings);
