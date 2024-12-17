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
        <form method="POST" action="#" className={styles.form}>
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