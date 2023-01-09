import { List } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ pictures, bigImage }) => {
  return (
    <List className="gallery">
      {pictures.map(({ id, webformatURL, largeImageURL }) => {
        const handleClick = () => bigImage(largeImageURL);

        return (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            onClick={handleClick}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  bigImage: PropTypes.func,
};

export default ImageGallery;
