import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image: { webformatURL, largeImageURL, tags } }) => {
  console.log();
  return (
    <li className={s.galleryItem}>
      <img
        className={s.galleryItem__image}
        src={webformatURL}
        alt={tags}
        largeimg={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};

export default ImageGalleryItem;
