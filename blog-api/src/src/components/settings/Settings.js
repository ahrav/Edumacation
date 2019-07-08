import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';
import SettingsForm from './SettingsForm';

const Settings = ({ logout }) => {
  return (
    <section id='mainForm'>
      <header>
        <h2>My Profile</h2>
        <p>Update profile settings.</p>
      </header>
      <div className='boxForm'>
        <SettingsForm logOut={() => logout()} />
      </div>
    </section>
  );
};

export default connect(
  null,
  { logout }
)(Settings);
