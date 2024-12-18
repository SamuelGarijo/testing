import React, { useState, useEffect } from 'react';
import styles from './PopupForm.module.css';

const PopupForm = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight / 2 && !showPopup) {
        setShowPopup(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('popupClosed', 'true');
  };

  if (typeof window !== 'undefined' && sessionStorage.getItem('popupClosed') === 'true') {
    return null;
  }

  if (!showPopup) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const url = `https://samuelgarijo.us14.list-manage.com/subscribe/post-json?u=b4d3abd543fcf0c7f3147ae90&id=745ade7fd6&c=callback`;

    fetch(url, {
      method: 'POST',
      body: new URLSearchParams(formData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Response:', data);
        alert('Successfully subscribed!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error. Please try again.');
      });
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        <h2 className={styles.title}>Get Exclusive Updates 🚀</h2>
        <p className={styles.description}>
          Go behind the scenes of LVGL development.
          Stay updated on the latest releases, features,
          and the vision driving LVGL forward.
        </p>
        <form method="POST" action="#" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              name="EMAIL"
              placeholder="Your email here"
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Join the Insiders List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
