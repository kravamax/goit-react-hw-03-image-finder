import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  handleItemClick = event => {
    event.preventDefault();

    if (event.currentTarget === event.target) {
      return;
    }

    const imageURL = event.target.attributes.largeimg.value;
    this.props.handleImageClick(imageURL);
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

export default ImageGallery;