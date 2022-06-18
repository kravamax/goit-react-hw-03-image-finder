import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('click', this.handleOverlayClick);
    window.addEventListener('keydown', this.handleEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOverlayClick);
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  handleEscClick = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { modalImageURL } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.handleOverlayClick}>
        <div className={s.modal}>
          <img src={modalImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
