import PropTypes from 'prop-types';

import '../../styles.css';

const ImageGalleryItem = ({ preview, fullSize, showImage }) => {
  return (
    <li
      className="imageGalleryItem"
      onClick={() => {
        showImage(fullSize);
      }}
    >
      <img src={preview} className="imageGalleryItem_image" alt="" />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  fullSize: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};
