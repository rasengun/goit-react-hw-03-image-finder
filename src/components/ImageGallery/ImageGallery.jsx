import PropTypes from 'prop-types';

import '../../styles.css';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, showImage }) => {
  return (
    <ul className="imageGallery">
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            preview={webformatURL}
            fullSize={largeImageURL}
            showImage={showImage}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showImage: PropTypes.func.isRequired,
};
