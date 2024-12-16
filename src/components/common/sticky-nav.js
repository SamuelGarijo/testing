import { useState, useEffect, useRef } from "react";
import styles from "./sticky-nav.module.css";
import { Icon } from "@/components/common";

const StickyNav = ({ children, className, ariaLabel = "Inner navigation" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const classNames = `${styles.wrapper} ${className || ""}`.trim();
  const navRef = useRef(null);
  const navItemsContainerRef = useRef(null);
  const navItemsRef = useRef([]);
  const blockRefs = useRef([]);

  const scrollToBlock = (index) => {
    const element = blockRefs.current[index];
    element.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(styles.isIntersecting, entry.isIntersecting);
        });
        const intersectingEntries = blockRefs.current.filter((blockRef) =>
          blockRef.current.classList.contains(styles.isIntersecting)
        );

        if (intersectingEntries.length > 0) {
          const navBottom = navRef.current.getBoundingClientRect().bottom;
          const closestEntry = intersectingEntries.reduce((closestEntry, currentEntry) => {
            const currentTop = currentEntry.current.getBoundingClientRect().top;
            const closestTop = closestEntry.current.getBoundingClientRect().top;
            return Math.abs(currentTop - navBottom) < Math.abs(closestTop - navBottom) ? currentEntry : closestEntry;
          }, intersectingEntries[0]);
          const index = blockRefs.current.findIndex((ref) => ref.current === closestEntry.current);
          setActiveIndex(index);
        }
      },
      { threshold: [0.0, 0.25, 0.5, 0.75, 1] }
    );

    blockRefs.current.forEach((blockRef) => {
      observer.observe(blockRef.current);
    });

    return () => {
      observer.disconnect();
    };
  }, [blockRefs]);

  useEffect(() => {
    const navContainerRef = navItemsContainerRef.current;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = navItemsContainerRef.current;
      const isLeftEnd = scrollLeft === 0;
      const isRightEnd = scrollLeft === scrollWidth - clientWidth;
      const scrollable = scrollWidth - clientWidth > 0;

      navRef.current.classList.toggle(styles.isLeftEnd, scrollable && isLeftEnd);
      navRef.current.classList.toggle(styles.isRightEnd, scrollable && isRightEnd);
      navRef.current.classList.toggle(styles.scrollable, scrollable);
    };

    navContainerRef.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      navContainerRef.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (navItemsRef.current[activeIndex]) {
      const navItem = navItemsRef.current[activeIndex];
      const navContainer = navItemsContainerRef.current;

      const navItemRect = navItem.getBoundingClientRect();
      const navContainerRect = navContainer.getBoundingClientRect();

      if (navItemRect.left < navContainerRect.left || navItemRect.right > navContainerRect.right) {
        navContainer.scrollLeft = navItem.offsetLeft - navContainer.offsetWidth / 2 + navItem.offsetWidth / 2;
      }
    }
  }, [activeIndex]);

  return (
    <div className={classNames}>
      <div ref={navRef} role="navigation" aria-label={ariaLabel} className={styles.navBar}>
        <div ref={navItemsContainerRef} className={styles.navBarItems}>
          {children.map((child, index) => {
            const { iconLabel, icon } = child.props;
            blockRefs.current[index] = child.ref;
            return (
              <button
                ref={(el) => (navItemsRef.current[index] = el)}
                className={`${styles.navBarItem} ${index === activeIndex ? styles.active : ""}`}
                key={index}
                onClick={() => scrollToBlock(index)}>
                <Icon name={icon} type="" />
                {iconLabel}
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default StickyNav;
