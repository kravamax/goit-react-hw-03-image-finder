import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from 'components/ImageGallery/';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import api from '../services/image-search-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    query: '',
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    totalImages: null,
    modalImageURL: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({
        status: Status.PENDING,
        page: 1,
      });

      if (nextPage === 1) {
        api
          .fetchImages(nextQuery, nextPage)
          .then(images => {
            if (!images.totalHits) {
              return Promise.reject(
                new Error(`Nothing found for the word: ${nextQuery}.`)
              );
            }

            return images;
          })
          .then(images =>
            this.setState({
              status: Status.RESOLVED,
              images: images.hits,
              totalImages: images.totalHits,
            })
          )
          .catch(error => this.setState({ error, status: Status.REJECTED }));
      }
    }

    if (prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      api
        .fetchImages(nextQuery, nextPage)
        .then(images => {
          this.setState({
            status: Status.RESOLVED,
          });
          return this.addImages(images);
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handleImageClick = ImageURL => {
    console.log(ImageURL);
    this.setState({ modalImageURL: ImageURL });

    this.toggleModal();
  };

  addImages = images => {
    this.setState(prevState => ({
      images: [...prevState.images, ...images.hits],
    }));
  };

  handleSubmit = query => {
    this.setState({ query, images: [] });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  onButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, error, images, totalImages, showModal } = this.state;
    const totalAddImages = images.length;

    return (
      <div>
        {showModal && (
          <Modal
            modalImageURL={this.state.modalImageURL}
            onClose={this.toggleModal}
          />
        )}

        <Searchbar onSubmit={this.handleSubmit} />

        {status === Status.PENDING && (
          <>
            {images && (
              <ImageGallery
                images={images}
                handleImageClick={this.handleImageClick}
              />
            )}
            <Loader />
          </>
        )}

        {status === Status.REJECTED && <h2>{error.message}</h2>}

        {status === Status.RESOLVED && (
          <>
            <ImageGallery
              images={images}
              handleImageClick={this.handleImageClick}
            />
            {totalAddImages < totalImages ? (
              <Button onClick={this.onButtonClick} />
            ) : null}
          </>
        )}
      </div>
    );
  }
}