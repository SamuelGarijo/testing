import { useState, useEffect, useRef } from "react";
import slugify from "slugify";

import Link from "next/link";
import Image from "next/image";
import { Button, Heading, Text } from "@/components/common";
import styles from "./boards.module.css";

import boardsData from "@/data/boards.json";

const Board = ({ item }) => {
  const boardImage = useRef(null);

  useEffect(() => {
    const boardImageCurrent = boardImage.current;
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { offsetWidth, offsetHeight } = boardImageCurrent;
      const { top, left } = boardImageCurrent.getBoundingClientRect();

      const xPos = ((clientX - left - offsetWidth / 2) / offsetWidth) * 10;
      const yPos = ((clientY - top - offsetHeight / 2) / offsetHeight) * 10;

      boardImageCurrent.style.setProperty("--mx", xPos);
      boardImageCurrent.style.setProperty("--my", yPos);
    };

    boardImageCurrent.addEventListener("mousemove", handleMouseMove);

    return () => {
      boardImageCurrent.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Link href={`/boards/#${slugify(item.title, { lower: true })}`} className={styles.board}>
      <div className={styles.boardImageWrapper} ref={boardImage}>
        <div className={styles.logoWrapper}>
          <Image
            src={`/images/boards/logos/${slugify(item.vendor, { lower: true })}.png`}
            fill={true}
            style={{ objectFit: "contain", objectPosition: "left center" }}
            alt={`${item.vendor} logo`}
          />
        </div>

        <div className={styles.imagesWrapper}>
          {item.images.map((image, index) => (
            <Image
              className={styles.boardImage}
              key={index}
              loading="lazy"
              src={image.src}
              width={parseInt(image.width, 10)}
              height={parseInt(image.height, 10)}
              style={{
                "--i": index + 1,
                top: image.top,
                left: image.left,
                width: image.size,
              }}
              alt={item.title}
            />
          ))}
        </div>
      </div>
      <div className={styles.boardTitle}>
        <Heading as="h3" size="h4">
          {item.title}
        </Heading>
        <Text size="sm" className={styles.boardVendor}>
          {item.vendor}
        </Text>
      </div>
      <Text size="sm" color="tertiary">
        {item.description.split(". ")[0]}.
      </Text>
    </Link>
  );
};

export default function Boards() {
  const BOARDS_LIMIT = 4;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const sortedItems = boardsData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    const publishedItems = sortedItems.filter((item) => item.published && item.type === "repository");
    const lastItems = publishedItems.slice(0, BOARDS_LIMIT);
    setItems(lastItems);
  }, []);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Heading as="h2" size="h2">
          <span className={styles.headerHighlight}>Ready-to-use projects</span>
          <br />
          maintained by us
        </Heading>
        <Text className={styles.headerBlurb}>
          LVGL works with any hardware from 100 MHz MCUs to multi-core Linux-based MPUs. Leading chip vendors already
          support LVGL in their ecosystem. We also provide ready-to-use projects that offer seamless integration. These
          projects include up-to-date repositories, responsive support, and extensive documentation.
        </Text>
      </header>
      <div className={styles.boards}>
        {items.map((item, index) => (
          <Board key={index} item={item} />
        ))}
      </div>
      <div className={styles.boardsActions}>
        <Button size="lg" href="/boards">
          See all projects
        </Button>
      </div>
    </section>
  );
}
