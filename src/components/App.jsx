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
    page: 1,
    largeImage: '',
    pictures: [],
    error: '',
    activeModal: false,
    loading: false,
    imgTags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { name: prevName, page: prevPage } = prevState;
    const { name, page } = this.state;

    if (!name) return;

    if (page !== prevPage || name !== prevName) {
      this.getImages();
    }
  }

  togleModal = () => {
    this.setState(state => ({
      activeModal: !state.activeModal,
    }));
  };

  bigImage = (largeImage = '') => {
    this.setState({ largeImage });

    this.togleModal();
  };

  async getImages() {
    const { name, page } = this.state;
    this.setState({ loading: true });

    try {
      const { data } = await FetchImages(name, page);
      this.setState({
        pictures: [...this.state.pictures, ...data.hits],
        totalPictures: data.totalHits,
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
      this.setState({ error: 'Picture not found' });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleFormSubmit = name => {
    this.setState({
      name,
      page: 1,
      pictures: [],
      error: null,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { pictures, loading, activeModal, largeImage, imgTags } = this.state;

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

        {pictures.length > 0 && (
          <ImageGallery pictures={pictures} bigImage={this.bigImage} />
        )}

        {loading && <Loader loading={loading} />}

        {pictures.length > 11 && !loading && (
          <Button onClick={this.loadMoreImages} />
        )}

        {activeModal && (
          <Modal activeModal={this.bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
