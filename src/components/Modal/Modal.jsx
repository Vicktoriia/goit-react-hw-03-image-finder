import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';

const ModalRoot = document.querySelector('#modal-root');

const Modal = ({ activeModal, children }) => {
  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      activeModal();
    }
  };

  useEffect(() => {
    const handleEscKeydown = e => {
      if (e.code === 'Escape') {
        activeModal();
      }
    };

    window.addEventListener('keydown', handleEscKeydown);
    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  }, [activeModal]);

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <StyledModal>{children}</StyledModal>
    </Overlay>,
    ModalRoot
  );
};

export default Modal;
