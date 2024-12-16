import { useState } from "react";
import SVG from "react-inlinesvg";

import { Heading, Text } from "@/components/common";
import { Tabs, TabPanel } from "@/components/common/tabs";
import styles from "./support.module.css";

import data from "@/data/support.json";

const ACTIVE_TAB_INDEX = 0;

const SupportItem = ({ name, logo, url, index }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="reveal in-view" style={{ "--i": index }}>
      <SVG src={logo} alt={name} className={styles.supportItem} />
    </a>
  );
};

export function TabComponent({ data }) {
  const [activeTabIndex, setActiveTab] = useState(ACTIVE_TAB_INDEX);

  return (
    <Tabs className={styles.tabs} id={styles.tabs} activeTabIndex={activeTabIndex} setActiveTab={setActiveTab}>
      {data.map((item, index) => {
        const { label, items } = item;
        const isActive = index === activeTabIndex;

        return (
          <TabPanel
            label={label}
            key={index}
            count={index}
            id={styles.tabs}
            isActive={isActive}
            className={styles.tabPanel}>
            {items.map((item, i) => {
              const name = item[0];
              const logo = item[1];
              const url = item[2];

              return <SupportItem key={i} name={name} logo={logo} url={url} index={i} />;
            })}
          </TabPanel>
        );
      })}
    </Tabs>
  );
}

export default function Support({ className, theme, ...props }) {
  const classNames = `${styles.wrapper} ${className || ""}`.trim();
  return (
    <section className={classNames} {...(theme ? { "data-theme": theme } : {})} {...props}>
      <header className={styles.header}>
        <Heading as="h2" size="h2" className={styles.headerHeading}>
          Any device, any OS, any display
        </Heading>
        <Text color="tertiary" className={styles.headerBlurb}>
          LVGL is fully open-source and has no external dependencies which makes its porting incredibly simple. It works
          with any modern MCU or MPU and can be used with any (RT)OS or bare metal setup to drive ePaper, monochrome,
          OLED, or TFT displays, and even monitors. Besides, it‘s free even for commercial projects.
        </Text>
      </header>
      <TabComponent data={data} />
    </section>
  );
}
