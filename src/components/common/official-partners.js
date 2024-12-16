import Link from "next/link";

import { useEffect, useRef } from "react";
import parse from "html-react-parser";
import SVG from "react-inlinesvg";
import data from "@/data/official-partners.json";
import { Text, Heading, Button, Icon } from "@/components/common";
import styles from "./official-partners.module.css";

const PartnerLogos = () => {
  const partnerRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    });

    partnerRef.current.forEach((partner) => observer.observe(partner));
    return () => observer.disconnect();
  }, []);

  const partnerClassName = `${styles.partner} reveal`;

  const onPartnerHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const bannerText = e.currentTarget.querySelector(`.${styles.bannerText}`);
    const bannerRect = bannerText.getBoundingClientRect();

    if (bannerText) {
      if (!bannerText.classList.contains(styles.alignRight)) {
        if (rect.left + bannerRect.width > window.innerWidth) {
          bannerText.classList.add(styles.alignRight);
        } else {
          bannerText.classList.remove(styles.alignRight);
        }
      } else {
        if (rect.left + bannerRect.width < window.innerWidth) {
          bannerText.classList.remove(styles.alignRight);
        }
      }
    }
  };

  return data.map((partner, index) => (
    <a
      onMouseOver={onPartnerHover}
      key={index}
      ref={(el) => (partnerRef.current[index] = el)}
      className={partnerClassName}
      href={partner.logoHref}
      style={{ "--i": index }}>
      <SVG src={partner.logoSrc} title={partner.logoAlt} alt={partner.logoAlt} />
      <div className={styles.bannerText}>
        <Text size="sm" color="tertiary" className={styles.bannerTextInner}>
          {parse(partner.description)}
        </Text>
      </div>
    </a>
  ));
};

export default function OfficialPartners({ className, ...props }) {
  const classNames = `${styles.wrapper} ${className || ""}`.trim();
  return (
    <section className={classNames}>
      <header className={styles.header}>
        <Heading as="h2" size="h2">
          Official partners
        </Heading>
      </header>
      <div className={styles.partners}>
        <PartnerLogos />
      </div>
      <div className={styles.actions}>
        <Button variant="text" size="md" href="/services/#official-partner-program">
          Become an Official Partner
          <Icon size={16} name="arrow" title="more" fill="none" />
        </Button>
      </div>
    </section>
  );
}
