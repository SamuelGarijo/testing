import { useEffect, useState, createRef } from "react";

import Link from "next/link";
import styles from "./footer.module.css";
import { Text, Button, Icon, Toast } from ".";
import { Input } from "../form";

import FooterLogo from "@/assets/footer_logo.svg";

const footerLinks = [
  {
    links: [
      ["Documentation", "https://docs.lvgl.io/master/"],
      ["Demos", "/demos"],
      ["Features", "/features"],
      ["Boards", "/boards"],
      ["Services", "/services"],
      ["Project Creator", "/tools/project-creator"],
      ["Image Converter", "/tools/imageconverter"],
      ["Font Converter", "/tools/fontconverter"],
    ],
  },
  {
    links: [
      ["Jobs", "/jobs"],
      ["Forum", "https://forum.lvgl.io"],
      ["Blog", "https://blog.lvgl.io/"],
      ["Contact Us", "#contact"],
      ["Privacy Policy", "/privacy-policy"],
    ],
  },
];

const FooterLink = ({ link, href }) => (
  <Link className={styles.footerLink} href={href}>
    {link}
  </Link>
);

const FooterColumn = ({ links }) => (
  <div className={styles.footerColumn}>
    {links.map((link, index) => (
      <FooterLink key={index} link={link[0]} href={link[1]} />
    ))}
  </div>
);

const FooterContent = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerInfo}>
        <FooterLogo />
        <Text className={styles.footerDescription} size="sm" color="tertiary">
          LVGL is the most popular free and open source embedded graphics library targeting any MCU, MPU and display
          type to build beautiful UIs.
          <br />
          <br />
          We also do services like UI design, implementation and consulting.
        </Text>
      </div>
      {footerLinks.map((column, index) => (
        <FooterColumn key={index} links={column.links} />
      ))}
    </div>
    <div className={styles.footerBottom}>
      <div className={styles.footerCopyright}>Copyright © 2024. All rights reserved by LVGL</div>
      <div className={styles.footerSocial}>
        <Link href="https://www.youtube.com/channel/UC0fMcpuRA0Zxn_EJYCL88-Q">
          <Icon name="youtube" title="YouTube icon" />
        </Link>
        <Link href="https://github.com/lvgl">
          <Icon name="github" title="GitHub icon" />
        </Link>
        <Link href="https://www.linkedin.com/company/lvglgui/">
          <Icon name="linkedin" title="LinkedIn icon" />
        </Link>
      </div>
    </div>
  </footer>
);

const NewsletterForm = () => {
  const formRef = createRef(null);
  const [toast, setToast] = useState({ message: null, type: null, key: 0 });

  // Add a listener to the form to handle invalid events
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
  }, [toast.key, formRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.error}`);
      }

      const data = await response.json();
      setToast({ message: data.message, type: "success", key: toast.key + 1 });
    } catch (error) {
      setToast({ message: error.message, type: "error", key: toast.key + 1 });
    }
  };

  return (
    <>
      <form ref={formRef} className={styles.newsletterForm} onSubmit={handleSubmit}>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          label="Name"
          required={true}
          hideLabel={true}
          className={styles.newsletterInput}
        />
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          label="Email"
          required={true}
          hideLabel={true}
          className={styles.newsletterInput}
        />
        <Button type="submit" variant="primary" size="md">
          Subscribe
        </Button>
      </form>
      <Toast message={toast.message} messageType={toast.type} key={toast.key} />
    </>
  );
};

const Newsletter = () => (
  <div className={styles.newsletter}>
    <Text className={styles.newsletterBlurb} size="sm" color="tertiary">
      <strong>Subscribe to our newsletter</strong> to not miss any news about LVGL. We will send maximum of 2 mails per
      month.
    </Text>
    <NewsletterForm />
  </div>
);

const Footer = () => (
  <section className={`fill-view ${styles.container}`} data-theme="dark">
    <Newsletter />
    <FooterContent />
  </section>
);
export default Footer;
