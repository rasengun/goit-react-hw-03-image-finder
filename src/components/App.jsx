import '../styles.css';

import { Component } from 'react';
import { Audio } from 'react-loader-spinner';

import ImageSearchForm from './ImageSearchForm/ImageSearchForm';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { searchImageAPI } from 'services/api';

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

    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPosts();
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { images } = this.state;
    if (prevState.images.length < images.length) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImageAPI(search, page);
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
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
