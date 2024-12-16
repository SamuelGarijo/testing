import { useRef, useEffect, useState } from "react";
import styles from "./tabs.module.css";

export const TabPanel = ({ className, children, count, id, isActive }) => {
  const classNames = `${styles.tabPanel} ${className || ""}`.trim();

  return (
    <div
      className={classNames}
      role="tabpanel"
      hidden={!isActive}
      id={`${id ? `${id}-` : ""}panel-${count}`}
      aria-labelledby={`${id ? `${id}-` : ""}tab-${count}`}>
      {children}
    </div>
  );
};

export const Tabs = ({ children, className, id, tabsData, activeTabIndex = 0, setActiveTab }) => {
  const classNames = `${styles.wrapper} ${className || ""}`.trim();
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const containerRefCurrent = containerRef.current;
    const resizeObserver = new ResizeObserver(() => {
      const activeElement = containerRef.current.children[activeTabIndex];
      setHeight(activeElement.offsetHeight);
    });

    resizeObserver.observe(containerRefCurrent);
    return () => {
      resizeObserver.unobserve(containerRefCurrent);
    };
  }, [activeTabIndex, containerRef]);

  return (
    <div className={classNames}>
      <div role="tablist" className={styles.tabList}>
        {children.map((child, index) => {
          const { label } = child.props;
          const isActive = index === activeTabIndex;

          return (
            <button
              className={styles.tab}
              role="tab"
              key={index}
              id={`${id ? `${id}-` : ""}tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${id ? `${id}-` : ""}panel-${index}`}
              onClick={() => setActiveTab(index)}>
              {label}
            </button>
          );
        })}
      </div>
      <div style={{ height: `${height}px`, transition: "height 0.4s var(--ease-out-expo)" }} ref={containerRef}>
        {children}
      </div>
    </div>
  );
};
