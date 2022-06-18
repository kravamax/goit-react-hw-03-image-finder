import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'components/ImageGallery/';
import Button from '../Button';
import Loader from '../Loader';
import api from '../../services/image-search-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGalleryInfo extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    totalPages: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    const perPage = 12;

    if (prevQuery !== nextQuery) {
      this.setState(() => ({
        images: [],
        page: 1,
        status: Status.PENDING,
      }));

      if (nextPage === 1) {
        api
          .fetchImages(nextQuery, nextPage)
          .then(images =>
            this.setState({
              images: images.hits,
              totalPages: parseInt(images.totalHits / perPage),
              status: Status.RESOLVED,
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
          this.setState({ status: Status.RESOLVED });
          return this.addImages(images);
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  addImages = images => {
    this.setState(prevState => ({
      images: [...prevState.images, ...images.hits],
    }));
  };

  handleImageClick = imageURL => {
    this.props.getModalImage(imageURL);
  };

  render() {
    const { status, error, images, page, totalPages } = this.state;

    if (status === Status.PENDING) {
      return (
        <>
          {images && <ImageGallery images={images} />}
          <Loader />
        </>
      );
    }

    if (status === Status.REJECTED) {
      return <h2>{error.message}</h2>;
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ImageGallery
            images={images}
            handleImageClick={this.handleImageClick}
          />
          {page <= totalPages && <Button onClick={this.onButtonClick} />}
        </>
      );
    }
  }
}

ImageGalleryInfo.propTypes = {
  query: PropTypes.string.isRequired,
  getModalImage: PropTypes.func.isRequired,
};

export default ImageGalleryInfo;
