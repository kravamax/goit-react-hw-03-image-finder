import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image: { webformatURL, largeImageURL, tags } }) => {
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

export default ImageGalleryItem;
