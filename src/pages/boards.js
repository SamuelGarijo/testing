import { useEffect, useRef } from "react";
import Image from "next/image";
import slugify from "slugify";
import Link from "next/link";
import { format } from "date-fns";

import { Section, Heading, Chip, Text, Button, FeatureBlock, Icon, Meta } from "@/components/common";
import { FeatureBlockContent, FeatureBlockVisual } from "@/components/common/feature-block";
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
    <div id={slugify(item.title, { lower: true })} className={styles.board}>
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
              key={index}
              loading="lazy"
              src={image.src}
              width={parseInt(image.width, 10)}
              height={parseInt(image.height, 10)}
              style={{
                "--i": index + 1,
                position: "absolute",
                top: image.top,
                left: image.left,
                width: image.size,
                height: "auto",
                transform:
                  "rotateZ(" +
                  image.rotation +
                  ") translateX(calc(var(--mx)*var(--i)*0.5px)) translateY(calc(var(--my)*var(--i)*0.5px))",
                transition: "transform 0.25s var(--ease-out-expo)",
              }}
              alt={item.title}
            />
          ))}
        </div>
      </div>
      <div className={styles.boardContent}>
        <div className={styles.boardTitle}>
          <Heading as="h3" size="h3">
            {item.title}
          </Heading>
          <Text size="md" className={styles.boardReviewVendor}>
            by {item.vendor}
          </Text>
        </div>
        <div className={styles.boardActions}>
          {item.links.map(([text, url], index) => (
            <Button href={url} key={index} variant={index === 0 ? "primary" : "secondary"}>
              {index === 0 && <Icon name="github" size={16} color="white" />}
              {text}
            </Button>
          ))}
        </div>
        <Text size="md" color="secondary" dangerouslySetInnerHTML={{ __html: item.description }}></Text>
        <Text size="sm" color="tertiary" className={styles.boardFeatures}>
          {Object.entries(item.features).map(([key, value], index) => (
            <span key={index} className={styles.boardFeature}>
              <strong>{key}: </strong>
              {value}
            </span>
          ))}
        </Text>
      </div>
    </div>
  );
};

const BoardReview = ({ item }) => {
  const formattedDate = format(new Date(item.date), "MMM dd, yyyy");

  return (
    <Link
      id={slugify(item.title, { lower: true })}
      className={styles.boardReview}
      href={item.links[0][1]}
      data-cert={item.certificate}>
      <div className={styles.boardReviewContent}>
        <div className={styles.boardReviewHeader}>
          <Chip className={styles.boardReviewChip}>{item.certificate} certification</Chip>
          <Text size="xs" color="tertiary">
            {formattedDate}
          </Text>
        </div>
        <div className={styles.boardReviewLogo}>
          <Image
            src={`/images/boards/logos/${slugify(item.logo, { lower: true })}.png`}
            fill={true}
            style={{ objectFit: "contain", objectPosition: "left center" }}
            alt={`${item.vendor} logo`}
          />
        </div>

        <div className={styles.boardReviewTitle}>
          <Heading as="h3" size="h4">
            {item.title}
          </Heading>
        </div>
        <Text
          size="md"
          color="secondary"
          className={styles.boardReviewDesc}
          dangerouslySetInnerHTML={{ __html: item.description }}></Text>
      </div>
    </Link>
  );
};

export default function Boards() {
  return (
    <>
      <Meta title="Supported Boards — LVGL" />
      <Section className={styles.hero}>
        <Heading as="h1" size="h1">
          <span style={{ color: "var(--color-accent)" }}>Ready-to-use projects</span> maintained by us
        </Heading>

        <Text size="lg" color="secondary">
          LVGL works with any hardware from 100 MHz MCUs to multi-core Linux-based MPUs. Leading chip vendors already
          support LVGL in their ecosystem. We also provide ready-to-use projects that offer seamless integration. These
          projects include up-to-date repositories, responsive support, and extensive documentation.
        </Text>

        <Text size="sm" color="tertiary" className={styles.heroCTA}>
          <strong>Do you have HMI Boards?</strong>
          <br />
          Join our <Link href="#project-maintenance-program">Project Maintenance Program</Link> to enjoy all the
          benefits for a tailored experience for your board.
        </Text>
      </Section>

      <Section id="featured" className={styles.boards}>
        <Heading as="h2" size="h2" href="#featured">
          Featured
        </Heading>
        <div className={styles.boardsGrid}>
          {boardsData
            .filter((board, i) => board.type === "repository")
            .map((item, index) => (
              <Board key={index} item={item} />
            ))}
        </div>
      </Section>

      <Section id="board-reviews" className={styles.boardReviews}>
        <Heading as="h2" size="h2" href="#board-reviews">
          Board reviews &amp; certifications
        </Heading>
        <div className={styles.boardReviewsGrid}>
          {boardsData
            .filter((board, i) => board.type === "review")
            .map((item, index) => (
              <BoardReview key={index} item={item} />
            ))}
        </div>
      </Section>

      <FeatureBlock id="project-maintenance-program" theme="green" className={styles.support}>
        <FeatureBlockContent>
          <Heading as="h2" size="h2" color="tertiary">
            Project Maintenance Program
          </Heading>
          <Text color="secondary">
            Make it easy to get started with your HMI board and LVGL. We can maintain a GitHub repository where we keep
            LVGL updated, optimize performance, add an easy-to-follow user guide, respond to user issues, and record a
            video to showcase your device in action.
          </Text>
          <Button size="lg" href="/services#project-maintenance-program">
            Learn more
          </Button>
        </FeatureBlockContent>
        <FeatureBlockVisual bgColor="quarternary" className={styles.supportVisual}>
          <img
            loading="lazy"
            src="/images/boards/board-support-program.png"
            width={1440}
            height={1440}
            alt="Board Support Program"
          />
        </FeatureBlockVisual>
      </FeatureBlock>
    </>
  );
}
