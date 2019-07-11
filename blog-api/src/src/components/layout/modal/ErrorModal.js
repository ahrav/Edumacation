import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const ErrorModal = ({ cancel, isOpen, error, closeModal, context }) => {
  const list = [];

  const errorList = context
    ? context.forEach(key => {
        if (Array.isArray(key)) {
          list.push(key[0]);
          return key[0];
        } else {
          Object.keys(key).forEach(val => {
            list.push(key[val][0]);
            return key[val][0];
          });
        }
      })
    : null;
  return (
    <Modal size='tiny' open={isOpen} onClose={() => closeModal()}>
      <Modal.Header>{error}</Modal.Header>
      <Modal.Content>
        <p>{list[0]}</p>
        <p>{list[1]}</p>
        <p>{list[2]}</p>
      </Modal.Content>
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

export default ErrorModal;
