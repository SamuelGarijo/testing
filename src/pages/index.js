import Image from "next/image";
import { OfficialPartners, FeatureBlock, Text, Button, Heading, Testimonials, Meta } from "@/components/common";
import { FeatureBlockContent } from "@/components/common/feature-block";
import { Hero, Boards, Support, Demo } from "@/components/home";
import styles from "./index.module.css";

export default function Home() {
  return (
    <>
      <Meta />
      <Hero />
      <OfficialPartners />
      <FeatureBlock theme="green" className="block-negative-margin-bottom">
        <FeatureBlockContent bgColor="quarternary">
          <Demo />
        </FeatureBlockContent>
        <FeatureBlockContent>
          <Heading as="h2" size="h2" color="primary">
            <span style={{ color: "var(--color-tertiary)" }}>Smartphone-like</span>
            <br />
            UIs in kilobytes
          </Heading>
          <Text>
            30+ built-in widgets, 100+ style properties, web inspired layout managers, and a typography system
            supporting many languages. All these features fit in a very small memory footprint.
          </Text>
          <div className={styles.actions}>
            <Button size="lg" href="/features">
              Features
            </Button>
            <Button size="lg" variant="secondary" href="/demos">
              Demos
            </Button>
          </div>
        </FeatureBlockContent>
      </FeatureBlock>
      <Support className="block-negative-margin-bottom" />
      <Boards />

      <Testimonials theme="purple" />

      <FeatureBlock theme="teal" className={styles.services}>
        <FeatureBlockContent>
          <Heading as="h2" size="h2" color="accent">
            Work with us
          </Heading>
          <Text>
            We have a great network of people and companies who can help you designing and developing your UIs,
            implementing drivers, or the whole application.
          </Text>
          <Text>
            Besides that, we are keen to work together with chip vendors and board manufacturers to ensure LVGL runs
            smoothly on their devices.
          </Text>
          <Text>
            Via our websites, GitHub and newsletters, we can reach tens of thousands of UI-interested people to promote
            your technology and devices.
          </Text>
          <Text>Don‘t hesitate to contact us to explore how we can work together.</Text>
          <Button size="lg" href="/services">
            Read more
          </Button>
        </FeatureBlockContent>

        <div className={styles.visual}>
          <div className={styles.splineWrapper}>
            <Image
              src="/images/home/work-with-us-cover.webp"
              width={1600}
              height={1600}
              quality={95}
              alt="Work with us"
            />
          </div>
        </div>
      </FeatureBlock>
    </>
  );
}
