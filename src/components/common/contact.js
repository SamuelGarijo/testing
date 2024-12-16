import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import styles from "./contact.module.css";

import { Text, Icon, Button, Toast } from "@/components/common";
import { Input, Textarea, Select } from "../form";

const Contact = () => {
  // Close modal on Esc key press
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
    setIsOpen(false); // Ensure the modal state is updated
  };

  useEffect(() => {
    // Function to check hash and update modal visibility
    const checkHash = () => {
      setIsOpen(window.location.hash === "#contact");
    };

    // This is a Next.js hack to check if the hash is already set as router and hashchange events are not triggered
    const intervalId = setInterval(checkHash, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Close modal on Esc key press
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Add event listener when modal is open
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    // disable scrolling when modal is open
    if (isOpen) {
      document.body.classList.add("is-modal-open");
    } else {
      document.body.classList.remove("is-modal-open");
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const Form = ({ isOpen }) => {
    const formRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ message: null, type: null, key: 0 });

    const copyToClipboard = (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("lvgl@lvgl.io");
      setToast({ message: "Email address copied to clipboard", type: "success", key: toast.key + 1 });
    };

    const handleChange = (e) => {
      if (isOpen) {
        let formValues = localStorage.getItem("formValues");
        if (!formValues) {
          formValues = {};
        } else {
          formValues = JSON.parse(formValues);
        }
        formValues[e.target.name] = e.target.value;
        localStorage.setItem("formValues", JSON.stringify(formValues));
      }
    };

    useEffect(() => {
      if (isOpen) {
        const formRefCurrent = formRef.current;
        let formValues = localStorage.getItem("formValues");
        if (formValues) {
          formValues = JSON.parse(formValues);
          Object.keys(formValues).forEach((key) => {
            formRefCurrent[key].value = formValues[key];
          });
        }
      }
    }, [isOpen]);

    useEffect(() => {
      const formRefCurrent = formRef.current;
      const handleInvalid = (e) => {
        // Prevent the browser from showing a validation message
        e.preventDefault();

        // Scroll to the invalid element
        e.target.scrollIntoView({ behavior: "smooth", block: "center" });
        e.target.focus(); // Add a class to highlight the invalid element

        // Show a toast message
        setToast({ message: e.target.validationMessage, type: "error", key: toast.key + 1 });
      };
      formRefCurrent.addEventListener("invalid", handleInvalid, true); // The third parameter is set to true to capture the event in the capturing phase
      return () => {
        formRefCurrent.removeEventListener("invalid", handleInvalid, true);
      };
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formData = new FormData(e.target);
      const name = formData.get("name");
      const email = formData.get("email");
      const company = formData.get("company");
      const country = formData.get("country");
      const subject = formData.get("subject");
      const message = formData.get("message");

      try {
        const response = await fetch("/api/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, company, country, subject, message }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.error}`);
        }

        const data = await response.json();
        setToast({ message: data.message, type: "success", key: toast.key + 1 });
        e.target.reset();
        localStorage.removeItem("formValues");
        setTimeout(closeModal, 3500);
      } catch (error) {
        setToast({ message: error.message, type: "error", key: toast.key + 1 });
      } finally {
        setIsSubmitting(false);
      }
    };
    return (
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form} disabled={isSubmitting}>
        <button className={styles.closeButton} onClick={closeModal} aria-label="Close modal window">
          <Icon size={24} name="close" />
        </button>
        <div className={styles.formHeader}>
          <Text size="sm" className={styles.openEmail}>
            I would rather send an email directly to{" "}
            <Link href="#" onClick={copyToClipboard}>
              lvgl@lvgl.io <Icon name="new-window" size={16} className={styles.inlineIcon} />
            </Link>
          </Text>
        </div>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name (required)"
          label="Name"
          required={true}
          hideLabel={true}
          disabled={isSubmitting}
          onChange={handleChange}
        />
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email address (required)"
          label="Email address"
          required={true}
          hideLabel={true}
          disabled={isSubmitting}
          onChange={handleChange}
        />
        <div className={styles.formRow}>
          <Input
            type="text"
            id="company"
            name="company"
            placeholder="Company name"
            label="Company name"
            hideLabel={true}
            disabled={isSubmitting}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            label="Country"
            hideLabel={true}
            disabled={isSubmitting}
            onChange={handleChange}
          />
        </div>
        <Select
          id="subject"
          name="subject"
          label="Subject"
          required={true}
          disabled={isSubmitting}
          onChange={handleChange}>
          <option>General Inquiry</option>
          <option>Consultancy Services</option>
          <option>UI Development by LVGL</option>
          <option>UI Development by Partner Network</option>
          <option>Board Support Program</option>
          <option>Partnership Program</option>
        </Select>
        <Textarea
          id="message"
          name="message"
          label="Message"
          rows={5}
          required={true}
          disabled={isSubmitting}
          onChange={handleChange}></Textarea>
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className={styles.submit}>
          {isSubmitting && <div className={styles.spinner}></div>}

          <span className={`${styles.submitLabel} ${isSubmitting ? styles.hidden : ""}`}>Send message</span>
        </Button>
        <Text size="sm">
          We respect your privacy. <Link href="/privacy-policy">Read our Privacy Policy</Link>
        </Text>
        <Toast message={toast.message} messageType={toast.type} key={toast.key} />
      </form>
    );
  };

  // Determine the modal's class based on isOpen
  const modalClass = `${styles.modal} ${isOpen ? "" : styles.hidden}`.trim();

  return (
    <div className={modalClass} role="dialog" aria-modal="true" aria-labelledby="Contact Us">
      <Form isOpen={isOpen} />
    </div>
  );
};

export default Contact;
