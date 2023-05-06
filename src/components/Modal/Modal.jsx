import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onCloseModal, largeImage, tags }) {
  useEffect(() => {
    function handleCloseECC(e) {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    }

    window.addEventListener('keydown', handleCloseECC);

    return () => window.removeEventListener('keydown', handleCloseECC);
  }, [onCloseModal]);

  function handleCloseBackdrop(e) {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  }

  return createPortal(
    <div className="Overlay" onClick={handleCloseBackdrop}>
      <div className="Modal">
        <img src={largeImage} alt={tags} width="1000" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
