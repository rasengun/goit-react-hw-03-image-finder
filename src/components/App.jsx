import '../styles.css';

import { Component } from 'react';
import axios from 'axios';

import ImageSearchForm from './ImageSearchForm/ImageSearchForm';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;

    const API_KEY = '33190889-c566a33fbd0a8c43c551e11d7';

    if (prevState.search !== search) {
      this.setState({ loading: true });
      axios
        .get(
          `https://pixabay.com/api/?q=${search}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => {
          this.setState({ images: data.hits });
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(this.setState({ loading: false }));
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search });
  };

  render() {
    const { images, loading, error } = this.state;
    const { searchImages } = this;

    return (
      <>
        <ImageSearchForm onSubmit={searchImages} />
        <ImageGallery images={images} />
        {loading && <p>...Loading</p>}
        {error && <p>Error loool</p>}
      </>
    );
  }
}
