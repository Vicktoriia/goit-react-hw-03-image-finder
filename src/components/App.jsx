import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import FetchImages from './Fetchimages/fetchImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');
  const [activeModal, setActiveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPictures, setTotalPictures] = useState(0);
  const [imgTags, setImgTags] = useState('');

  useEffect(() => {
    if (!name) {
      return;
    }

    setLoading(true);
    FetchImages(name, page)
      .then(({ data }) => {
        setPictures(prevPictures => [...prevPictures, ...data.hits]);
        setTotalPictures(data.totalHits);
        if (data.totalHits === 0) {
          toast.error(
            `Sorry, there are no images with name "${name}". Please try again.`,
            {
              theme: 'colored',
            }
          );
        }
      })
      .catch(error => {
        toast.error(`'Picture not found'`, {
          theme: 'colored',
        });
      })
      .finally(() => setLoading(false));
  }, [name, page]);

  const togleModal = () => {
    setActiveModal(activeModal => !activeModal);
  };

  const bigImage = (largeImage = '') => {
    setLargeImage(largeImage);

    togleModal();
  };

  const handleFormSubmit = name => {
    setName(name);
    setPage(1);
    setPictures([]);
    setError(null);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

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
      <Searchbar onSubmitForm={handleFormSubmit} />

      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} bigImage={bigImage} />
      )}

      {loading && <Loader loading={loading} />}

      {pictures.length > 11 && !loading && <Button onClick={loadMoreImages} />}

      {activeModal && (
        <Modal activeModal={bigImage}>
          <img src={largeImage} alt={imgTags} />
        </Modal>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
