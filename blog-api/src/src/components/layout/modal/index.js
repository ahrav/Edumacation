import React, { useEffect, useState } from 'react';
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
  return (
    <Portal>
      {isOpen && (
        <Modal size='tiny' open={isOpen} onClose={() => closeModal()}>
          <Modal.Header>{modalProps.error}</Modal.Header>
          <Modal.Content>
            <p>{modalProps.context}</p>
          </Modal.Content>
          <Modal.Actions style={{ height: '70px' }}>
            {/* <Button
              color='red'
              labelPosition='right'
              onClick={() => closeModal()}
            >
              <Icon name='cancel' />
              Ok
            </Button> */}
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
