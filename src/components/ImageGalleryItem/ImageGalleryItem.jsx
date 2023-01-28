import '../../styles.css';

const ImageGalleryItem = ({ preview, fullSize }) => {
  return (
    <li className="imageGalleryItem">
      <img src={preview} className="imageGalleryItem_image" alt="" />
    </li>
  );
};

export default ImageGalleryItem;
