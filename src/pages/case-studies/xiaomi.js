import Image from "next/image";
import Link from "next/link";
import { CaseStudy } from "@/layouts";
import {
  Hero,
  Block,
  BlockActions,
  KeyResults,
  KeyResult,
  Testimonial,
  SpecsTable,
  SpecsGroup,
  SpecsHeader,
  SpecsItem,
} from "@/layouts/case-study";
import { Meta, Section, Heading, Text, RichText, Button, LazyVideo } from "@/components/common";
import styles from "./xiaomi.module.css";
import { useState } from "react";

const Xiaomi = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <CaseStudy>
      <Meta
        title="Powered by LVGL: Unlocking Peak Performance with Xiaomi Watch S1 Pro — Case Studies — LVGL"
        image="https://lvgl.io/images/opengraph/case-studies-xiaomi.png"
      />
      <Hero
        title="Unlocking Peak Performance with Xiaomi Watch S1 Pro"
        industry="Smart Wearables"
        clientName="Xiaomi Communications Co., Ltd."
        clientUrl="www.mi.com"
        clientLogo="/images/case-studies/xiaomi/logo.svg"
        logoClassName={styles.logo}
        className={styles.hero}>
        <Image
          src="/images/case-studies/xiaomi/hero-image.png"
          alt="Xiaomi Watch S1 Pro"
          width={1000}
          height={873}
          className={styles.heroImage}
          priority
        />
      </Hero>

      <Block title="Problem / Solution">
        <RichText type="html" color="secondary">
          <Text>Xiaomi faced three challenges:</Text>
          <ol>
            <li>Maintaining a consistent user experience across a diverse product range built on varying hardware. </li>
            <li>Delivering superior graphical performance and user experience in a highly competitive market. </li>
            <li>Controlling costs by avoiding licensing / royalty fees due to high sales volume.</li>
          </ol>
          <Text>
            By integrating LVGL into Xiaomi HyperOS, Xiaomi achieved a unified UI that efficiently performed across
            different devices, from resource-constrained microcontrollers to high-powered processors. LVGL’s open-source
            nature coupled with its free licensing model helped Xiaomi avoid unnecessary expenses.
          </Text>
        </RichText>
      </Block>

      <Section className={styles.gallery1}>
        <Testimonial
          className={styles.testimonial}
          theme="orange"
          quote="LVGL has been instrumental in crafting the Xiaomi Watch S1 Pro’s user interface. The framework’s flexibility, performance and openness allowed us to create a visually stunning and highly responsive UI that seamlessly integrates with the watch's advanced features. LVGL has empowered us to deliver exceptional user experience for fitness enthusiasts of all levels."
          company=" Xiaomi"
          name="Yaoyao Gu"
          jobTitle="General Manager, System Platform Division"></Testimonial>

        <div className={styles.gallery1Items}>
          <Image
            src="/images/case-studies/xiaomi/gallery-1.png"
            alt="Xiaomi S1 Pro Smartwatch UI"
            width={246}
            height={494}
            className={styles.gallery1Item1}
          />
          <LazyVideo
            src="/images/case-studies/xiaomi/gallery-video1.mp4"
            width="1280"
            height="720"
            className={styles.gallery1Item2}
          />
        </div>
      </Section>

      <Block id="key-results" title="Key Results">
        <RichText type="html" color="secondary">
          <KeyResults>
            <KeyResult
              title="Cost Reduction"
              description="Eliminated licensing and royalty fees due to LVGL’s open-source nature."
            />

            <KeyResult
              title="Enhanced Portability"
              description="Successfully deployed LVGL across diverse hardware platforms on both MCUs and MPUs, with or without GPUs."
            />
            <KeyResult title="Improved UI Quality">
              Created{" "}
              <Link href="https://ifdesign.com/en/winner-ranking/project/xiaomi-watch-s1-pro/571347" className="muted">
                design-award winning
              </Link>
              , visually striking, high-performance UIs featuring smooth animations and rapid response times.
            </KeyResult>

            <KeyResult
              title="Accelerated Development"
              description="Direct contributions allowed Xiaomi to influence LVGL’s development, and align the framework with their specific needs."
            />

            <KeyResult
              title="Flexible Integration"
              description="Seamlessly incorporated LVGL into Xiaomi’s complex and custom development workflows."
            />
          </KeyResults>
        </RichText>
      </Block>
      <Block id="technical-wins" title="Technical Wins">
        <RichText type="html" color="secondary">
          <ul>
            <li>
              <strong>Highly responsive touch interface:</strong> LVGL facilitates a smooth and intuitive user
              experience for navigating the watch’s various features.
            </li>
            <li>
              <strong>Customizable watch faces:</strong> The framework empowers users to personalize their watch face
              for a unique and stylish look.
            </li>
            <li>
              <strong>Advanced health and fitness tracking:</strong> Leveraging LVGL’s data visualization capabilities
              and Xiaomi’s algorithm expertise, the watch provides accurate and informative fitness metrics.
            </li>
            <li>
              <strong>Efficient memory management:</strong> The framework optimizes memory usage, ensuring smooth
              performance even on a smartwatch platform.
            </li>
          </ul>
        </RichText>
      </Block>

      <Block title="Future Projects">
        <RichText type="html" color="secondary">
          <Text>
            Xiaomi’s continued commitment to LVGL, coupled with the frameworks growing capabilities, positions the
            company at the forefront of wearable technology.The S3, S4 and Xiaomi Smart Band 9 watches are all running
            with LVGL, and we can expect to see even more groundbreaking smartwatch innovations in the future.
          </Text>
        </RichText>
      </Block>

      <Section className={styles.gallery2}>
        <div className={styles.gallery2Items}>
          <Image
            src="/images/case-studies/xiaomi/gallery-3.png"
            alt="IDO Smartwatch UI"
            width={393}
            height={511}
            className={styles.gallery2Item1}
          />
          <LazyVideo
            src="/images/case-studies/xiaomi/gallery-video2.mp4"
            width="607"
            height="1080"
            className={styles.gallery2Item2}
          />
          <Image
            src="/images/case-studies/xiaomi/gallery-4.png"
            alt="IDO Smartwatch UI"
            width={393}
            height={511}
            className={styles.gallery2Item3}
          />
        </div>
      </Section>

      <Block title="Ready to transform your UI?">
        <RichText type="html" color="secondary">
          <Text>
            If you’re facing similar challenges with your current UI tools or looking to enhance your product’s user
            experience, LVGL can help. Discover how our open-source, high-performance framework can revolutionize your
            development process and drive significant improvements in your projects.
          </Text>
          <Text>
            <strong>Contact us today</strong> to learn more about how LVGL can make a difference for your company. We’re
            eager to hear your story and explore how we can support your goals.
          </Text>
        </RichText>
        <BlockActions>
          <Button href="#contact">Get in touch</Button>
        </BlockActions>
      </Block>
    </CaseStudy>
  );
};

export default Xiaomi;
