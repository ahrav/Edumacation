import React, { useEffect, useState, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'semantic-ui-react';
import './index.css';

// Creates a portal outside the DOM hierarchy
function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root'); // A div with id=modal-root in the index.html

  return createPortal(<div>{children}</div>, modalRoot);
}

// A modal component which will be used by other components / pages
function MainModal({ modal: { modalProps, modalType } }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(modalProps.open);
  }, [modalProps]);

  const closeModal = () => {
    setIsOpen(false);
  };
  const cancel = <Icon id='modalIcon' name='cancel' />;
  const errors = modalProps.context;

  const list = [];

  const errorList = errors
    ? errors.forEach(key => {
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
    <Portal>
      {console.log(list)}
      {isOpen && (
        <Modal size='tiny' open={isOpen} onClose={() => closeModal()}>
          <Modal.Header>{modalProps.error}</Modal.Header>
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
        // <StyledModal.ModalWrapper onClick={() => closeModal()}>
        //   <StyledModal.ModalBody onClick={event => event.stopPropagation()}>
        //     <StyledModal.CloseButton onClick={() => closeModal()}>
        //       <i className='fa fa-close' />
        //     </StyledModal.CloseButton>
        //     {modalProps.context}
        //   </StyledModal.ModalBody>
        // </StyledModal.ModalWrapper>
      )}
    </Portal>
  );
}

const mapStateToProps = state => ({
  modal: state.alert
});

export default connect(
  mapStateToProps,
  null
)(MainModal);
