import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

import './index.css';

const AlertModal = ({ cancel, isOpen, error, closeModal, context }) => {
  return (
    <Modal size='tiny' open={isOpen} onClose={() => closeModal()}>
      <Modal.Header>{error}</Modal.Header>
      <Modal.Content>{context}</Modal.Content>
      <Modal.Actions style={{ height: '70px' }}>
        <Button
          id='modalButton'
          negative
          icon={cancel}
          labelPosition='right'
          content='OK'
          onClick={() => closeModal()}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AlertModal;
