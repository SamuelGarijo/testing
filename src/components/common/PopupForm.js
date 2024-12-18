"use client";

import React, { useState, useEffect } from "react";
import styles from "./PopupForm.module.css";

const PopupForm = () => {
  const [showPopup, setShowPopup] = useState(false);
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

  if (typeof window !== "undefined" && sessionStorage.getItem("popupClosed") === "true") {
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
          Go behind the scenes of LVGL development. Stay updated on the latest
          releases, features, and the vision driving LVGL forward.
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
        {message && (
          <p
            className={styles.message}
            style={{ color: error ? "red" : "green", marginTop: "10px" }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PopupForm;
