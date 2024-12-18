"use client";

import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import styles from "./PopupForm.module.css";

const PopupForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight / 2 && !showPopup) {
        setShowPopup(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem("popupClosed", "true");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.callback = (data) => {
        if (data.result === "success") {
          setIsSuccess(true);
          setMessage("Successfully subscribed!");
          setError(false);
        } else {
          setMessage(data.msg || "Subscription failed.");
          setError(true);
        }
      };
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new URLSearchParams(new FormData(e.target)).toString();
    const url = `https://samuelgarijo.us14.list-manage.com/subscribe/post-json?u=b4d3abd543fcf0c7f3147ae90&id=745ade7fd6&c=callback&${formData}`;

    const script = document.createElement("script");
    script.src = url;

    script.onerror = () => {
      setMessage("Network error. Please try again.");
      setError(true);
      document.body.removeChild(script);
    };

    document.body.appendChild(script);
  };

  const buttonVariants = {
    initial: { scale: 1, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    success: { 
      backgroundColor: '#FFFFFF', 
      color: '#000000',
      width: '100%', 
      transition: { duration: 0.5, ease: "easeInOut" } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  if (typeof window !== "undefined" && sessionStorage.getItem("popupClosed") === "true") {
    return null;
  }

  if (!showPopup) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <iframe
          src="https://lgvl-for-testing-purposes.framer.website/just-bg"
          className={styles.backgroundFrame}
          title="Background frame"
        ></iframe>
        <div className={`${styles.contentWrapper} ${isSuccess ? styles.successState : ''}`}>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
          {!isSuccess ? (
            <>
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
                  <motion.button
                    type="submit"
                    className={styles.button}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Join the Insiders List
                  </motion.button>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              className={styles.successContainer}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className={styles.title}>Welcome Aboard!</h2>
              <motion.button
                className={`${styles.button} ${styles.successButton}`}
                variants={buttonVariants}
                initial="initial"
                animate="success"
                disabled
              >
                You&apos;re now in the loop. 🎉
              </motion.button>
            </motion.div>
          )}
          {message && !isSuccess && (
            <p className={`${styles.message} ${error ? styles.error : styles.success}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupForm;

