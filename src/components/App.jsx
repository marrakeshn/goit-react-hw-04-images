import { useState, useEffect } from 'react';
import { getImages } from 'service/pixabay_api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { AppContainer, StartText, ErrorText } from './App.styled';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
   if (query !== '') {
      fetchImages(query, page);
    }
  }, [page, query]);

  const fetchImages = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await getImages(query, page);
      if (data.hits.length === 0) {
        return toast.error(
          "We didn't find anything for this search :(  Try another option"
        );
      }

      setTotal(data.totalHits);
      setImages(prev => [...prev, ...data.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onOpenModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  const totalPage = total / images.length;
    return (
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
        {images.length === 0 && (
          <StartText>Enter a query on the topic you are interested in</StartText>
        )}
        {isLoading && <Loader />}
        {images.length !== 0 && (
          <ImageGallery gallery={images} onOpenModal={onOpenModal} />
        )}
        {totalPage > 1 && !isLoading && images.length !== 0 && (
          <Button onClick={onLoadMore} />
        )}
        {showModal && (
          <Modal
            largeImage={largeImage}
            tags={tags}
            onCloseModal={onCloseModal}
          />
        )}
        {error && (
          <ErrorText>
            We didn't find anything for this search :(
            <span>Try another option</span>
          </ErrorText>
        )}
        <ToastContainer autoClose={2000} theme="dark" />
      </AppContainer>
    );
}