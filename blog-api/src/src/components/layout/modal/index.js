import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'semantic-ui-react';

import './index.css';
import AlertModal from './AlertModal';
import ErrorModal from './ErrorModal';

const MODAL_TYPES = {
  alert: AlertModal,
  error: ErrorModal
};

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
  const SpecifiedModal = MODAL_TYPES[modalType];

  return (
    <Portal>
      {isOpen && (
        <SpecifiedModal
          cancel={cancel}
          isOpen={isOpen}
          error={modalProps.error}
          closeModal={closeModal}
          context={modalProps.context}
        />
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
