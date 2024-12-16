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
import styles from "./features.module.css";
import featuresData from "@/data/features.json";

const blockRefs = featuresData.map(() => createRef());

const DemoBlock = forwardRef(({ children, theme, width, height, res, src, title }, ref) => {
  return (
    <div ref={ref} className={styles.demoBlock}>
      <div className={styles.demoBlockInner}>{children}</div>
      <div className={styles.demoBlockDemo} data-theme={theme}>
        <div
          className={styles.demoBlockDemoWrapper}
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

export default function Features() {
  return (
    <>
      <Meta title="Features — LVGL" />
      <Hero
        title="Features"
        blurb="Make UI development easier with 30+ widgets, anti-aliasing, animations, multi language, Arabic and Persian text, encoder and keypad usage, etc."
        theme="purple"
        splineUrl="https://prod.spline.design/4NXbuvetT56i85HA/scene.splinecode"
      />

      <Section>
        <Heading as="h2" size="h2">
          Portability
        </Heading>
        <FeatureGrid>
          <FeatureGridItem>
            <Icon name="open-source" color="teal" type="illustrative" />
            <Heading as="h3" size="h4">
              It’s open-source
            </Heading>
            <Text size="md" color="tertiary">
              LVGL is fully open source which has several advantages. First, it gives you control over the library
              because you can not only see, modify, compile and debug the underlying source code but you can fully
              obtain it. Once you download it’s yours. This independence from a single provider is a huge value. Besides
              that open-source encourages collaboration and sharing of knowledge. Developers worldwide contribute to
              improving the software, making it more reliable and feature-rich to solve real-life problems.
            </Text>
          </FeatureGridItem>
          <FeatureGridItem>
            <Icon name="rocket" color="purple" type="illustrative" />
            <Heading as="h3" size="h4">
              It’s free
            </Heading>
            <Text size="md" color="tertiary">
              LVGL is distributed under the MIT license which allows users to freely use, modify, and distribute the
              software without imposing complicated restrictions or limitations. It provides flexibility for developers
              and businesses to incorporate the software into their projects, even for commercial purposes, while
              maintaining attribution to the original authors.
            </Text>
          </FeatureGridItem>
        </FeatureGrid>
      </Section>

      <Section>
        <div className={styles.requirements} data-theme="teal">
          <div className={styles.requirementsInner}>
            <header>
              <Heading as="h3" size="h4">
                Minimal requirements
              </Heading>
              <Text>LVGL runs on any modern MCU or MPU.</Text>
            </header>
            <div className={styles.requirementsGrid}>
              <div className={styles.requirementsGridCol}>
                <RichText type="html" size="sm" color="tertiary">
                  <p>
                    <strong>Architecture:</strong> 16, 32 or 64 bit
                  </p>
                  <p>
                    <strong>Clock speed:</strong> &gt; 64MHz
                  </p>
                  <p>
                    <strong>RAM:</strong>
                    <br />
                    4kB + 150byte / widget (~48kB for a UI with a few screens)
                  </p>
                  <p>
                    <strong>Flash:</strong>
                    <br />
                    ~100kB for LVGL (depends on the enabled features)
                  </p>
                  <p>
                    <strong>Draw buffer:</strong> &gt; 1/10 screen size buffer for rendering
                  </p>
                  <p>
                    <strong>Frame buffer:</strong>
                    <br />
                    at least 1 frame buffer in a display controller, internal- or external RAM
                  </p>
                  <p>
                    <strong>Compiler:</strong> C99 or higher
                  </p>
                  <p>
                    <strong>Build system:</strong>
                    <br />
                    LVGL has no external dependencies. Just copy it into your project and compile it with the other
                    files of your project
                  </p>
                </RichText>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Heading as="h2" size="h2" align="center">
          UI Features
        </Heading>

        <StickyNav className={styles.stickyNav}>
          {featuresData.map((feature, index) => (
            <DemoBlock ref={blockRefs[index]} key={index} index={index} {...feature}>
              <Heading as="h3" size="h3" color="primary">
                {feature.title}
              </Heading>
              <RichText type="html" size="md" color="tertiary" html={feature.description} />
            </DemoBlock>
          ))}
        </StickyNav>
      </Section>

      <Section paddingBottom={true}>
        <Heading as="h2" size="h2">
          Drivers
        </Heading>
        <FeatureGrid>
          <FeatureGridItem>
            <Icon name="device" color="red" type="illustrative" />
            <Heading as="h3" size="h4">
              Displays
            </Heading>
            <Text size="md" color="tertiary">
              To make your display work with LVGL all you need is a function which can copy the rendered image to the
              display. If you have it you can integrate LVGL in 10 minutes.
              <br />
              <br />
              You can choose from multiple buffering strategies including partial refreshing, double buffering, and many
              others.
              <br />
              <br />
              Other features like rendering on transparent background to create OSD menus, multiple display support, or
              custom color format handling makes LVGL really versatile and powerful.
            </Text>
          </FeatureGridItem>
          <FeatureGridItem>
            <Icon name="mouse" color="green" type="illustrative" />
            <Heading as="h3" size="h4">
              Input devices
            </Heading>
            <Text size="md" color="tertiary">
              Input devices can be also integrated via a single “read callback” that LVGL will call to get the state of
              the given input device.
              <br />
              <br />
              Beside touch pad and mouse the LVGL UIs can be used with keypad, keyboard (“Tab navigation”) or even a
              single rotary encoder. External buttons can be integrated to click widgets on the UI directly.
            </Text>
          </FeatureGridItem>
        </FeatureGrid>
      </Section>
    </>
  );
}
