import React, { useState } from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <li className={styles.galleryItem}>
      <img src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal}>
            {isLoading && <p>Loading...</p>}
            <img
              src={src}
              alt={alt}
              onLoad={handleImageLoad}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default ImageGalleryItem;
