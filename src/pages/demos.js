import Link from "next/link";
import { createRef, forwardRef } from "react";

import {
  Section,
  Hero,
  StickyNav,
  RichText,
  Text,
  Heading,
  Icon,
  FeatureGrid,
  FeatureGridItem,
  LVGLEmbed,
  Meta,
} from "@/components/common";
import styles from "./demos.module.css";
import demosData from "@/data/demos.json";

const blockRefs = demosData.map(() => createRef());

const DemoBlock = forwardRef(({ children, theme, width, height, mask = "roundedRect", res, src, title }, ref) => {
  return (
    <div ref={ref} className={styles.demoBlock}>
      <div className={styles.demoBlockInner}>{children}</div>
      <div className={styles.demoBlockDemo} data-theme={theme}>
        <div
          className={`${styles.demoBlockDemoWrapper} ${styles[mask]}`}
          style={{
            maxWidth: `${width}px`,
            maxHeight: `${height}px`,
            aspectRatio: `${width} / ${height}`,
          }}>
          <LVGLEmbed src={src} title={title} width={width} height={height} res={res} />
        </div>
      </div>
    </div>
  );
});
DemoBlock.displayName = "DemoBlock";

export default function Demos() {
  return (
    <>
      <Meta title="Demos — LVGL" />
      <Hero
        title="Interactive Demos"
        blurb="See what kind of UIs you can do with LVGL"
        theme="blue"
        splineUrl="https://prod.spline.design/5Ylu99rrVSXrZQ0e/scene.splinecode"
      />

      <Section>
        <FeatureGrid>
          <FeatureGridItem>
            <Icon name="browser" color="teal" type="illustrative" />
            <Heading as="h3" size="h4">
              Fully functional UIs in your browser
            </Heading>
            <Text size="md" color="tertiary">
              UIs created with LVGL really work on any platform. We have compiled our demos to HTML files to let you try
              them out in your browser.
            </Text>
          </FeatureGridItem>
          <FeatureGridItem>
            <Icon name="lvgl" color="purple" type="illustrative" />
            <Heading as="h3" size="h4">
              Designed and implemented by us
            </Heading>
            <Text size="md" color="tertiary">
              If you are about hiring us for graphics design or UI implementation services check out these demos as
              reference.
            </Text>
          </FeatureGridItem>
        </FeatureGrid>
      </Section>

      <Section>
        <StickyNav className={styles.stickyNav}>
          {demosData.map((item, index) => (
            <DemoBlock ref={blockRefs[index]} key={index} index={index} {...item}>
              <Heading as="h3" size="h3" color="primary">
                {item.title}
              </Heading>
              <RichText type="html" size="md" color="tertiary" html={item.description} />
            </DemoBlock>
          ))}
        </StickyNav>
      </Section>
    </>
  );
}
