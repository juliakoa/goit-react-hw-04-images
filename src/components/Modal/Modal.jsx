import React from 'react';
import css from './Modal.module.css';

const Modal = ({ src, alt, onClose }) => (
  <div className={css.overlay} onClick={onClose}>
    <div className={css.modal}>
      <img src={src} alt={alt} />
    </div>
  </div>
);

export default Modal;
