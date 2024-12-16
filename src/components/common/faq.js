import { useState, useEffect, useRef, useCallback } from "react";
import { Heading, RichText } from "@/components/common";

import styles from "./faq.module.css";

export const FaqItem = ({ className, question, opened = false, children }) => {
  const [isOpen, setIsOpen] = useState(opened);
  const toggleOpen = useCallback(() => setIsOpen((prevIsOpen) => !prevIsOpen), []);
  const questionRef = useRef();

  useEffect(() => {
    const calcAccordionItemHeight = () => {
      const header = questionRef.current;
      const item = header.parentNode;
      const body = header.nextElementSibling;
      const itemStyle = getComputedStyle(item);
      item.style.setProperty(
        "--min-height",
        `${header.offsetHeight + parseInt(itemStyle.paddingTop, 10) + parseInt(itemStyle.paddingBottom, 10)}px`
      );
      item.style.setProperty(
        "--max-height",
        `${
          header.offsetHeight +
          body.offsetHeight +
          parseInt(itemStyle.paddingTop, 10) +
          parseInt(itemStyle.paddingBottom, 10)
        }px`
      );
    };

    window.addEventListener("resize", calcAccordionItemHeight);
    calcAccordionItemHeight();

    return () => {
      window.removeEventListener("resize", calcAccordionItemHeight);
    };
  }, [toggleOpen]);

  return (
    <div className={styles.item} aria-expanded={isOpen}>
      <div className={styles.question} onClick={toggleOpen} ref={questionRef} tabIndex="0">
        <Heading as="h4" size="h4">
          {question}
        </Heading>
        <div className={styles.toggle}></div>
      </div>
      <RichText className={styles.answer} type="html" size="md">
        {children}
      </RichText>
    </div>
  );
};

const Faq = ({ className, children }) => {
  const classNames = `${styles.wrapper} ${className || ""}`.trim();

  return (
    <div className={classNames}>
      <Heading as="h2" size="h2" className={styles.title}>
        Frequently
        <br />
        Asked Questions
      </Heading>
      <div className={styles.items}>{children}</div>
    </div>
  );
};

export default Faq;
