import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGalleryInfo from './ImageGalleryInfo';
import Modal from './Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showModal: false,
    modalImageURL: null,
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  getModalImage = imageURL => {
    this.setState({ modalImageURL: imageURL });

    this.toggleModal();
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        {showModal && (
          <Modal
            modalImageURL={this.state.modalImageURL}
            onClose={this.toggleModal}
          />
        )}
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGalleryInfo
          query={this.state.query}
          getModalImage={this.getModalImage}
        />
      </div>
    );
  }
}
