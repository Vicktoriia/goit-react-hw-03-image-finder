import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import FetchImages from './Fetchimages/fetchImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
class App extends Component {
  state = {
    name: '',
    loading: false,
    page: 1,
    perPage: 12,
    images: [],
    error: null,
    activeModal: null,
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;

    if (prevState.name === name && prevState.page === page) {
      return;
    }
    this.getImages();
  }

  handleFormSubmit = name => {
    if (this.state.name === name) {
      toast.error('You enter the same name!!! Enter new one!!!', {
        theme: 'colored',
      });
    }
    this.setState({
      name,
      page: 1,
      images: [],
    });
  };

  async getImages() {
    const { name, page } = this.state;
    this.setState({ loading: true });

    try {
      const { data } = await FetchImages(name, page);
      this.setState({
        images: [...this.state.images, ...data.hits],
        totalImages: data.totalHits,
      });

      if (data.totalHits === 0) {
        toast.error(
          `Sorry, there are no images with name "${this.state.name}. Please try again."`,
          {
            theme: 'colored',
          }
        );
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  togleModal = url => this.setState({ activeModal: url });

  render() {
    const { images, loading, activeModal, totalImages, page } = this.state;

    const restOfImages = totalImages - page * 12;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
          gap: 20,
          marginTop: 20,
        }}
      >
        <Searchbar onSubmitForm={this.handleFormSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.togleModal} />
        )}

        {loading && <Loader loading={loading} />}

        {images.length > 0 && restOfImages > 0 && (
          <Button title="Load more" onClick={this.loadMoreImages} />
        )}

        {activeModal && <Modal url={activeModal} onClose={this.togleModal} />}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
