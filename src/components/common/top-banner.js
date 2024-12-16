import { useState, useEffect } from "react";

import ReactMarkdown from "react-markdown";
import styles from "./top-banner.module.css";
import data from "@/data/banner.json";

import { Icon } from "@/components/common";

export default function TopBanner() {
  const [bannerData, setBannerData] = useState(data[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setBannerData(data[randomIndex]);
  }, []);

  if (bannerData.url) {
    return (
      <a className={styles.banner} href={bannerData.url}>
        <ReactMarkdown>{bannerData.label}</ReactMarkdown>
        <Icon name="arrow" size={16} fill="none" className={styles.bannerArrow} />
      </a>
    );
  } else {
    return (
      <div className={styles.banner}>
        <ReactMarkdown>{bannerData.label}</ReactMarkdown>
      </div>
    );
  }
}
