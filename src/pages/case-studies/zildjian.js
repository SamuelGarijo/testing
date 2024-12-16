import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import useThemeStore from "@/store/useThemeStore";

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
import { Meta, Section, Text, RichText, Button, LazyVideo } from "@/components/common";
import YoutubeEmbed from "@/components/common/youtube-embed";

import styles from "./zildjian.module.css";

const Zildjian = () => {
  const [showMore, setShowMore] = useState(false);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setMainClass = useThemeStore((state) => state.setMainClass);
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  const previousThemeRef = useRef(theme);

  useEffect(() => {
    previousThemeRef.current = theme;

    setTheme("dark");
    setMainClass(styles.page);

    const handleRouteChangeStart = () => {
      setTheme(previousThemeRef.current);
      setMainClass("");
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.events]);

  const handleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <CaseStudy>
      <Meta
        title="Powered by LVGL: Unparalleled Drumming Realism:
Zildjian’s ALCHEM-E Electronic Drum Kit"
        image="https://lvgl.io/images/opengraph/case-studies-zildjian.png"
      />
      <Hero
        title="Unparalleled Drumming Realism:
Zildjian’s ALCHEM-E Electronic Drum Kit"
        industry="Musical instruments"
        clientName="Avedis Zildjian Co."
        clientUrl="zildjian.com"
        clientLogo="/images/case-studies/zildjian/logo.svg"
        logoClassName={styles.logo}
        className={styles.hero}>
        <Image
          src="/images/case-studies/zildjian/hero-image.webp"
          alt="Zildjian ALCHEM-E Electronic Drum Kit"
          width={800}
          height={550}
          className={styles.heroImage}
        />
      </Hero>

      <Block title="Problem / Solution">
        <RichText type="html" color="secondary">
          Zildjian, founded in 1623 is the largest cymbal manufacturer in the world, and a true icon among musicians.
          They sought to create an electronic drum kit that seamlessly bridged the gap between acoustic and electronic
          drumming. The core challenge was to develop a user interface for the E-VAULT module that was both intuitive
          and visually appealing, while also being highly responsive and efficient. By integrating LVGL, Zildjian was
          able to overcome these challenges and deliver an exceptional user experience.
        </RichText>
      </Block>

      <Section className={styles.gallery1}>
        <Testimonial
          className={styles.testimonial}
          theme="orange"
          quote={`LVGL has been instrumental in bringing our vision for the Zildjian ALCHEM-E <span class='${styles.nowrap}'>E-VAULT</span> module to life. The framework's flexibility and performance allowed us to create a highly intuitive and visually stunning interface that perfectly complements the innovative features of our product. LVGL's efficiency in development and its ability to handle complex graphics have been game-changers for us.`}
          company="Zildjian"
          name="Dr. Carl Boland"
          jobTitle="Software Quality Assurance Engineer"></Testimonial>
        <YoutubeEmbed embedId="IJIM8jNrM58" />
      </Section>

      <Block id="key-results" title="Key Results">
        <RichText type="html" color="secondary">
          <KeyResults>
            <KeyResult
              title="Innovative User Experience"
              description="LVGL enabled the creation of groundbreaking, intuitive user interfaces for electronic drum kits, setting a new standard for the industry. Even on resource-constrained microcontrollers, we were able to develop highly interactive and visually appealing displays."
            />

            <KeyResult
              title="Significant Cost Savings"
              description="The open-source nature of LVGL eliminated licensing fees, resulting in substantial cost savings for Zildjian.
"
            />
            <KeyResult
              title="Seamless Integration"
              description="LVGL’s flexibility allowed for effortless integration with existing software modules, streamlining the development process.
"></KeyResult>

            <KeyResult
              title="Accelerated Time-to-Market"
              description="Through our development services, we provided Zildjian with screen templates and widget components based on their requirements, which were then used by their team to build the UI. LVGL also offered valuable input on the project, contributing to an efficient development process that reduced time-to-market."
            />
          </KeyResults>
        </RichText>
      </Block>
      <Block id="technical-wins" title="Technical Wins">
        <RichText type="html" color="secondary">
          <ul>
            <li>
              <strong>Flexible Customization:</strong> LVGL’s open-source nature allowed for tailored modifications to
              meet Zildjian’s specific design requirements and brand identity.
            </li>
            <li>
              <strong>Optimized Performance:</strong> Efficient memory management and the offloading of graphics
              processing to NXP VG-Lite ensured smooth performance on the embedded hardware.
            </li>
            <li>
              <strong>Enhanced User Experience:</strong> Custom-designed graphical elements, seamlessly integrated with
              touch input, created an immersive drumming experience.
            </li>
          </ul>
        </RichText>
      </Block>

      <Block id="Specs" title="Technical Specifications">
        <SpecsTable>
          <SpecsHeader>
            <div>ALCHEM-E Electronic Drum Kit</div>
          </SpecsHeader>
          <SpecsGroup title="General Information">
            <SpecsItem label="MCU/MPU">
              <div>NXP</div>
            </SpecsItem>
            <SpecsItem label="Display">
              <div>5” Touchscreen LCD, 1280x720</div>
            </SpecsItem>
            <SpecsItem label="Connectivity">
              <div>Bluetooth Audio 5.0</div>
            </SpecsItem>
            <SpecsItem label="Power">
              <div>DC 12V 2A</div>
            </SpecsItem>
          </SpecsGroup>
        </SpecsTable>
      </Block>

      <Block title="Future Projects">
        <RichText type="html" color="secondary">
          <Text>
            Zildjian plans to leverage LVGL for future product developments, including expanding the ALCHEM-E lineup and
            exploring new electronic percussion instruments.
          </Text>
        </RichText>
      </Block>

      <Section className={styles.gallery2}>
        <div className={styles.gallery2Items}>
          <Image
            src="/images/case-studies/zildjian/gallery-1.webp"
            alt="ALCHEM-E Module"
            width={1500}
            height={720}
            className={styles.gallery2Item1}
          />
          <Image
            src="/images/case-studies/zildjian/gallery-2.webp"
            alt="ALCHEM-E Cymbals"
            width={1500}
            height={720}
            className={styles.gallery2Item2}
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

export default Zildjian;
