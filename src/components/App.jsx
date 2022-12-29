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
    status: 'idle',
    name: '',
    images: [],
    activeModal: null,
    page: 1,
    totalPages: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { name: prevName, page: prevPage } = prevState;
    const { name, page } = this.state;

    if (!name) return;

    if (page !== prevPage || name !== prevName) {
      this.getImages();
    }
  }

  async getImages() {
    const { name, page, images } = this.state;

    this.setStatus('pending');

    try {
      const { hits, totalHits } = await FetchImages(name, page);

      if (!hits.length) {
        toast.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.setState({
        images: [...images, ...hits],
      });

      if (page === 1) {
        toast.info(`Hooray! We found ${totalHits} images.`);
        this.calculateTotalPages(totalHits);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setStatus('resolved');
    }
  }

  calculateTotalPages(total) {
    this.setState({ totalPages: Math.ceil(total / 12) });
  }

  setNewName = name => {
    this.setState({
      name,
      page: 1,
      images: [],
      totalPages: 1,
      status: 'idle',
    });
  };

  setActiveModalUrl = url => this.setState({ activeModal: url });

  setNextPage = () => this.setState(({ page }) => ({ page: page + 1 }));

  setStatus = status => this.setState({ status });

  render() {
    const { status, images, activeModal, page, totalPages } = this.state;

    const loadMoreBtn = page < totalPages && status === 'resolved';

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
        <Searchbar onSearch={this.setNewName} />

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.setActiveModalUrl} />
        )}

        {activeModal && (
          <Modal
            url={activeModal}
            onClose={() => this.setActiveModalUrl(null)}
          />
        )}

        {loadMoreBtn && <Button onClick={this.setNextPage}>Load More</Button>}

        {status === 'pending' && <Loader />}

        <ToastContainer theme="colored" autoClose={3000} />
      </div>
    );
  }
}

export default App;
