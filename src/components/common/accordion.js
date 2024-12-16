import React, { forwardRef, useState, useEffect, useRef, useCallback } from "react";
import styles from "./accordion.module.css";

export const AccordionHeader = forwardRef(({ children, onClickCallback }, ref) => {
  return (
    <div ref={ref} className={styles.itemHeader} onClick={onClickCallback} tabIndex="0">
      <header>{children}</header>
      <div className={styles.toggle}></div>
    </div>
  );
});

AccordionHeader.displayName = "AccordionHeader";

export const AccordionBody = ({ children }) => {
  return <div className={styles.itemBody}>{children}</div>;
};

export const AccordionItem = ({ id, opened = false, onToggle, children }) => {
  const headerRef = useRef();

  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  useEffect(() => {
    const calcAccordionItemHeight = () => {
      if (!headerRef.current) return;

      const header = headerRef.current;
      const item = header.parentNode;
      const body = header.nextElementSibling;

      if (!item || !body) return;

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
    requestAnimationFrame(calcAccordionItemHeight);

    return () => {
      window.removeEventListener("resize", calcAccordionItemHeight);
    };
  }, []);

  return (
    <div id={id} className={styles.item} aria-expanded={opened}>
      {React.Children.map(children, (child) => {
        if (child?.type === AccordionHeader) {
          return React.cloneElement(child, {
            ref: headerRef,
            onClickCallback: handleToggle,
          });
        }
        return child;
      })}
    </div>
  );
};

const Accordion = ({ className, id, children }) => {
  const [openItemId, setOpenItemId] = useState(null);

  const handleToggle = useCallback((itemId) => {
    setOpenItemId((prev) => {
      const newId = prev === itemId ? null : itemId;

      if (newId) {
        // Update URL hash
        window.history.pushState(null, "", `#${newId}`);

        // Scroll to the element after a brief delay to allow for expansion
        setTimeout(() => {
          const element = document.getElementById(newId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const absoluteTop = rect.top + scrollTop;
            const marginTop = parseInt(getComputedStyle(element).scrollMarginTop, 10) || 0;

            window.scrollTo({
              top: absoluteTop - marginTop,
              behavior: "smooth",
            });
          }
        }, 400); // Shorter delay for click response
      } else {
        window.history.pushState(null, "", window.location.pathname);
      }

      return newId;
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setOpenItemId(hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const absoluteTop = rect.top + scrollTop;
            const marginTop = parseInt(getComputedStyle(element).scrollMarginTop, 10) || 0;

            window.scrollTo({
              top: absoluteTop - marginTop,
              behavior: "smooth",
            });
          }
        }, 400);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const classNames = `${styles.items} ${className || ""}`.trim();

  return (
    <div id={id} className={classNames}>
      {React.Children.map(children, (child) => {
        if (child?.type === AccordionItem) {
          return React.cloneElement(child, {
            opened: child.props.id === openItemId,
            onToggle: handleToggle,
          });
        }
        return child;
      })}
    </div>
  );
};

export default Accordion;
