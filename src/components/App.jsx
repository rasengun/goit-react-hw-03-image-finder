import '../styles.css';

import { Component } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';

import ImageSearchForm from './ImageSearchForm/ImageSearchForm';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    const API_KEY = '33190889-c566a33fbd0a8c43c551e11d7';

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });

      axios
        .get(
          `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => {
          this.setState(({ images }) => ({
            images: [...images, ...data.hits],
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(this.setState({ loading: false }));
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = data => {
    this.setState({
      largeImageURL: data,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const { images, loading, error, showModal, largeImageURL } = this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;

    return (
      <>
        <ImageSearchForm onSubmit={searchImages} />

        <ImageGallery images={images} showImage={showImage} />

        {loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        )}
        {error && <p>Error</p>}

        {Boolean(images.length) && <Button loadMore={loadMore} />}
        {showModal && (
          <Modal close={closeModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
