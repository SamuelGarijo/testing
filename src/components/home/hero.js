import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Heading, Text, Code, LVGLEmbed, Icon } from "@/components/common";
import styles from "./hero.module.css";

export default function Hero({ className, ...props }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [activeTab]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setIsRevealed(false);
    setIsOpened(false);
  };

  const handleCodeClick = () => {
    setIsOpened(!isOpened);
  };

  const classNames = `${styles.wrapper} ${className || ""}`.trim();

  return (
    <section className={classNames}>
      <div className={styles.content}>
        <Heading>
          Light and Versatile
          <br />
          <span className={styles.headingGradient}>Graphics Library</span>
        </Heading>
        <Text color="tertiary">
          LVGL is the most popular free and open-source embedded graphics library to create beautiful UIs for any MCU,
          MPU and display type.
        </Text>
        <Text color="tertiary">
          From consumer electronics to industrial automation, any application can leverage LVGL&apos;s 30+ built-in widgets, 100+ style properties, web-inspired layouts, and typography system supporting many languages.
        </Text>
        <div className={styles.actions}>
          <Button size="lg" href="https://docs.lvgl.io/master/get-started/">
            Get Started
          </Button>
          <Button size="lg" href="/services" variant="secondary">
            Our Services
          </Button>
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.examples}>
          <div
            className={`${styles.example} ${activeTab === 0 ? styles.isActive : ""} ${
              activeTab === 0 && isRevealed ? styles.isRevealed : ""
            } ${activeTab === 0 && isOpened ? styles.isOpened : ""}`}>
            <div className={styles.codeWrapper} onClick={() => handleCodeClick()}>
              <Code url="/demos/arc/arc_example.c" language="clike" className={styles.code} />
            </div>
            <div className={styles.example1}>
              <Image
                className={styles.example1Bg}
                src="/images/home/hero-watch.png"
                width={480}
                height={480}
                priority={true}
                quality={90}
                alt="Watch background with blank screen"
              />
              <div className={styles.example1Embed}>
                <LVGLEmbed
                  src="/demos/arc/index.html"
                  active={activeTab === 0}
                  title="Demo"
                  width={192}
                  height={192}
                  res="2x"
                />
              </div>
            </div>
          </div>
          <div
            className={`${styles.example} ${activeTab === 1 ? styles.isActive : ""} ${
              activeTab === 1 && isRevealed ? styles.isRevealed : ""
            } ${activeTab === 1 && isOpened ? styles.isOpened : ""}`}>
            <div className={styles.codeWrapper} onClick={() => handleCodeClick()}>
              <Code url="/demos/button/button_example.c" language="clike" className={styles.code} />
            </div>
            <div className={styles.example1}>
              <Image
                className={styles.example1Bg}
                src="/images/home/hero-watch.png"
                width={480}
                height={480}
                priority={true}
                quality={90}
                alt="Watch background with blank screen"
              />
              <div className={styles.example1Embed}>
                <LVGLEmbed
                  src="/demos/button/index.html"
                  active={activeTab === 1}
                  title="Demo"
                  width={192}
                  height={192}
                  res="2x"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.demoSelector}>
          <div
            className={`${styles.demoSelectorItem} ${activeTab === 0 ? styles.active : ""}`}
            onClick={() => handleTabClick(0)}>
            arc_example.c
          </div>
          <div
            className={`${styles.demoSelectorItem} ${activeTab === 1 ? styles.active : ""}`}
            onClick={() => handleTabClick(1)}>
            button_example.c
          </div>
          <Link href="/demos" className={`${styles.demoSelectorItem} ${styles.demoLink}`}>
            More examples <Icon size={16} name="arrow" title="more" fill="none" />
          </Link>
        </div>
      </div>
    </section>
  );
}
