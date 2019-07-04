import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal } from './style';
import { connect } from 'react-redux';

// Creates a portal outside the DOM hierarchy
function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root'); // A div with id=modal-root in the index.html

  return createPortal(<div>{children}</div>, modalRoot);
}

// A modal component which will be used by other components / pages
function Modal({ modal: { modalProps, modalType } }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(modalProps.open);
  }, [modalProps]);

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Portal>
      {isOpen && (
        <StyledModal.ModalWrapper onClick={() => closeModal()}>
          <StyledModal.ModalBody onClick={event => event.stopPropagation()}>
            <StyledModal.CloseButton onClick={() => closeModal()}>
              &times;
            </StyledModal.CloseButton>
            {modalProps.context}
          </StyledModal.ModalBody>
        </StyledModal.ModalWrapper>
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
)(Modal);
