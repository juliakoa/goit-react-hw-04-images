import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';

const API_KEY = '37000031-e6b60df7e9a676387d8c0c5ad';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query) {
      setIsLoading(true);

      axios
        .get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageURL => {
    setSelectedImage(imageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt=""
            onClick={() => handleImageClick(image.largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMore} disabled={isLoading} />
      )}
      {selectedImage && (
        <Modal src={selectedImage} alt="" onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
