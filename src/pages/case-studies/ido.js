import Image from "next/image";
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
import styles from "./ido.module.css";
import { useState } from "react";

const Ido = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <CaseStudy>
      <Meta
        title="Powered by LVGL: Redefining IDO‘s Smartwatch User Interfaces — Case Studies — LVGL"
        image="https://lvgl.io/images/opengraph/case-studies-ido.png"
      />
      <Hero
        title="Redefining IDO‘s Smartwatch User Interfaces"
        industry="Smart Wearables"
        clientName="Shenzhen DO Intelligent<br/>Technology Co., Ltd"
        clientUrl="www.idoosmart.com"
        clientLogo="/images/case-studies/ido/logo.png"
        logoClassName={styles.logo}>
        <Image
          src="/images/case-studies/ido/hero-watch1.png"
          alt="IDO Smartwatch"
          width={368}
          height={460}
          className={styles.heroImage1}
        />
        <Image
          src="/images/case-studies/ido/hero-watch2.png"
          alt="IDO Smartwatch"
          width={334}
          height={380}
          className={styles.heroImage2}
        />
      </Hero>

      <Block title="Problem / Solution">
        <RichText type="html" color="secondary">
          <Text>
            IDO, a leading smartwatch manufacturer in China, faced significant challenges with their old UI development
            tool, Doui. Key issues included inadequate screen refresh rates and scrolling smoothness, along with
            difficulties in creating modern, interactive interfaces.
          </Text>
          <Text>
            Seeking to improve user experience and development efficiency, IDO integrated LVGL, resulting in impressive
            advancements across their smartwatch lineup. LVGL enabled the creation of stunning UIs, accelerated
            time-to-market with reusable code, and reduced costs due to its open-source nature.
          </Text>
        </RichText>
      </Block>

      <Section className={styles.gallery1}>
        <Testimonial
          className={styles.testimonial}
          theme="red"
          quote="LVGL’s rich set of features, high performance, and flexibility makes it an excellent choice for our sophisticated GUIs. The support and documentation provided by the LVGL community ensures a smooth integration process. Overall, LVGL has significantly improved our product quality and development efficiency."
          company="IDO"
          avatarSrc="/images/case-studies/ido/hathaway-xie.png"
          name="Hathaway Xie"
          jobTitle="Smartwatch ODM&OEM Account Manager"
          email="hathaway@idoocn.com">
          <div className={styles.businessCard}>
            <Image
              src="/images/case-studies/ido/bc-front.png"
              alt="Business card front"
              width={386}
              height={227}
              className={styles.businessCardFront}
            />
            <Image
              src="/images/case-studies/ido/bc-back.png"
              alt="Business card back"
              width={386}
              height={227}
              className={styles.businessCardBack}
            />
          </div>
        </Testimonial>

        <div className={styles.gallery1Items}>
          <Image
            src="/images/case-studies/ido/gallery-1.png"
            alt="IDO Smartwatch UI"
            width={241}
            height={282}
            className={styles.gallery1Item1}
          />
          <Image
            src="/images/case-studies/ido/gallery-2.png"
            alt="IDO Smartwatch UI"
            width={241}
            height={282}
            className={styles.gallery1Item2}
          />
          <LazyVideo
            src="/images/case-studies/ido/gallery-video1v2.mp4"
            width="1280"
            height="720"
            className={styles.gallery1Item3}
          />
        </div>
      </Section>

      <Block id="key-results" title="Key Results">
        <RichText type="html" color="secondary">
          <Text>The integration of LVGL led to notable outcomes for IDO:</Text>
          <KeyResults>
            <KeyResult
              title="Stunning UIs / Enhanced User Experience"
              description="Enabled the creation of modern, user-friendly interfaces for a range of devices."
            />

            <KeyResult
              title="Faster Time-to-Market / Accelerated Development"
              description="Ownership of source code and reusable components accelerated development cycles."
            />

            <KeyResult
              title="Broader Reach"
              description="Scaled easily, allowing entry into new markets and expanding product offerings."
            />

            <KeyResult
              title="Reduced Costs"
              description="Being free and open-source, LVGL minimized resource requirements and development expenses."
            />
          </KeyResults>
        </RichText>
      </Block>
      <Block id="technical-wins" title="Technical Wins">
        <RichText type="html" color="secondary">
          <ul>
            <li>Portability and scalability across more than 10 products with different hardware</li>
            <li>Reusable widgets and UI components across multiple devices</li>
            <li>60 FPS and maintaining touch responsiveness speed</li>
            <li>GPU support and asynchronous rendering to keep CPU usage low</li>
            <li>Deep customization of widgets to meet internal design requirements</li>
          </ul>
        </RichText>
      </Block>

      <Block id="Specs" title="Technical Specifications">
        <SpecsTable>
          <SpecsHeader>
            <div>GTX10</div>
            <div>GTX12</div>
          </SpecsHeader>
          <SpecsGroup title="MCU/MPU Specifications">
            <SpecsItem label="Manufacturer">
              <div>ACTIONS</div>
              <div>Silfi</div>
            </SpecsItem>
            <SpecsItem label="Model number">
              <div>ATS3085S</div>
              <div>SF32LB563</div>
            </SpecsItem>
            <SpecsItem label="Core architecture">
              <div>ARM MSTAR processor Core</div>
              <div>Arm Cortex‐M33 STAR‐MC1</div>
            </SpecsItem>
            <SpecsItem label="Clock speed">
              <div>192MHz(Max)</div>
              <div>240MHZ(Max)</div>
            </SpecsItem>
            <SpecsItem label="Number of cores">
              <div>1</div>
              <div>2</div>
            </SpecsItem>
            <SpecsItem label="Memory">
              <div>1168KB</div>
              <div>RAM: 800KB</div>
            </SpecsItem>
            <SpecsItem label="Peripherals">
              <div>Bluetooth</div>
              <div>蓝牙</div>
            </SpecsItem>
            <SpecsItem label="Power consumption">
              <div>
                22uA/192MHz
                <br />
                sleep:2uA
              </div>
              <div>– CoreMark power: &lt;34uA/MHz @3.3V</div>
            </SpecsItem>
          </SpecsGroup>

          {showMore && (
            <>
              <SpecsGroup title="Display panel">
                <SpecsItem label="Type">
                  <div>AMOLED</div>
                  <div>AMOLED</div>
                </SpecsItem>
                <SpecsItem label="Size">
                  <div>1.85 &quot;</div>
                  <div>1.9 &quot;</div>
                </SpecsItem>
                <SpecsItem label="Resolution">
                  <div>390*450</div>
                  <div>410*494</div>
                </SpecsItem>
                <SpecsItem label="Refresh rate">
                  <div>60FPS</div>
                  <div>60FPS</div>
                </SpecsItem>
                <SpecsItem label="Touch technology">
                  <div>Capacitive</div>
                  <div>Capacitive</div>
                </SpecsItem>
              </SpecsGroup>
              <SpecsGroup title="Storage">
                <SpecsItem label="Type">
                  <div>NAND Flash</div>
                  <div>NAND Flash</div>
                </SpecsItem>
                <SpecsItem label="Capacity">
                  <div>1Gb</div>
                  <div>512Mb</div>
                </SpecsItem>
              </SpecsGroup>
              <SpecsGroup title="Power management IC (PMIC)">
                <SpecsItem label="Manufacturer">
                  <div>ACTIONS</div>
                  <div>ETA Semiconductor Limited</div>
                </SpecsItem>
                <SpecsItem label="Model">
                  <div>ATS3085S</div>
                  <div>ETA5071V330DF1E</div>
                </SpecsItem>
                <SpecsItem label="Voltage regulation capabilities">
                  <div>1.8V 150mA</div>
                  <div>3.3V 300mA</div>
                </SpecsItem>
              </SpecsGroup>
              <SpecsGroup title="Connectivity">
                <SpecsItem label="Bluetooth">
                  <div>BLE5.3</div>
                  <div>BLE5.3</div>
                </SpecsItem>
              </SpecsGroup>
              <SpecsGroup title="Battery">
                <SpecsItem label="Battery Type">
                  <div>Li-Po</div>
                  <div>Li-Po</div>
                </SpecsItem>
                <SpecsItem label="Capacity">
                  <div>300mAh/</div>
                  <div>350mAh/</div>
                </SpecsItem>
                <SpecsItem label="Voltage">
                  <div>3.8V</div>
                  <div>3.85V</div>
                </SpecsItem>
                <SpecsItem label="Charging specifications">
                  <div>Magnetic contact charging</div>
                  <div>Magnetic contact charging</div>
                </SpecsItem>
              </SpecsGroup>
              <SpecsGroup title="General Information">
                <SpecsItem label="Assembly process">
                  <div>Confidential</div>
                  <div>Confidential</div>
                </SpecsItem>
                <SpecsItem label="Water resistance">
                  <div>IP68</div>
                  <div>3ATM/5ATM</div>
                </SpecsItem>
              </SpecsGroup>
            </>
          )}

          <Button variant="secondary" size="sm" href="#" target="_blank" onClick={handleShowMore}>
            {showMore ? "Show less" : "Show more"}
          </Button>
        </SpecsTable>
      </Block>

      <Block title="Future Projects">
        <RichText type="html" color="secondary">
          <Text>
            IDO plans to use LVGL for upcoming projects, including next-generation smartwatches with advanced features
            and new niche products like kids’ and sports watches.
          </Text>
        </RichText>
      </Block>

      <Section className={styles.gallery2}>
        <div className={styles.gallery2Items}>
          <Image
            src="/images/case-studies/ido/gallery-3.png"
            alt="IDO Smartwatch UI"
            width={393}
            height={511}
            className={styles.gallery2Item1}
          />
          <LazyVideo
            src="/images/case-studies/ido/gallery-video2.mp4"
            width="607"
            height="1080"
            className={styles.gallery2Item2}
          />
          <Image
            src="/images/case-studies/ido/gallery-4.png"
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

export default Ido;
