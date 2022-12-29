import React from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ img, onClick }) => {
  const { webformatURL, largeImageURL, tags } = img;

  const handleClick = () => onClick(largeImageURL);

  return (
    <Item>
      <Image
        onClick={handleClick}
        src={webformatURL}
        alt={tags}
        loading="lazy"
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
