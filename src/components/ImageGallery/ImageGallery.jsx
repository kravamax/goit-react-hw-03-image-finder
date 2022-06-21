import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  handleItemClick = event => {
    event.preventDefault();

    const { handleImageClick } = this.props;

    if (event.currentTarget === event.target) {
      return;
    }

    const imageURL = event.target.attributes.largeimg.value;
    handleImageClick(imageURL);
  };

  render() {
    const { images } = this.props;
    return (
      <>
        <ul className={s.gallery} onClick={this.handleItemClick}>
          {images.map(image => (
            <ImageGalleryItem image={image} key={image.id} />
          ))}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  handleImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
