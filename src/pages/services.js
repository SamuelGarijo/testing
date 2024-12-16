import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

import { Section, Heading, Text, RichText, Button, Icon, Meta } from "@/components/common";

import styles from "./services.module.css";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const services = document.querySelectorAll(`.${styles.service}`);
      const servicePositions = Array.from(services).map((service) =>
        Math.round(service.getBoundingClientRect().top - 144)
      );

      let index = activeIndex;
      servicePositions.forEach((position, i) => {
        if (position <= 5) {
          // 5 is the threshold for the service to be considered in view
          index = i;
        }
      });

      setActiveIndex(index === -1 ? services.length - 1 : index);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const selectedLink = document.querySelector(`.${styles.serviceLink}.${styles.selected}`);
    const selector = document.querySelector(`.${styles.servicesAsideSelector}`);

    selector.style.top = `${selectedLink.offsetTop}px`;
    selector.style.height = `${selectedLink.offsetHeight}px`;
  }, [activeIndex]);

  return (
    <>
      <Meta title="Services — LVGL" />
      <Section>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <Heading as="h1" size="h1">
              Our Services
            </Heading>

            <Text size="lg" color="secondary">
              We offer four service designed to help you leverage the full potential of LVGL’s powerful graphics
              library. Whether you need hardware support, bespoke UI development or expert consultancy, our team and
              global partner network are here to ensure your projects succeed.
            </Text>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroVisualInner}>
              <Spline scene="https://prod.spline.design/9dZSwZpMj98oO-es/scene.splinecode" />
            </div>
          </div>
        </div>
      </Section>

      <Section className={styles.services}>
        <aside className={styles.servicesAside}>
          <a
            href="#embedded-ui-development-by-partners"
            className={`${styles.serviceLink} ${activeIndex === 0 ? styles.selected : ""}`}>
            Embedded
            <br />
            UI Development
            <br />
            by our Global
            <br />
            Partner Network
          </a>
          <a
            href="#embedded-ui-development-by-lvgl"
            className={`${styles.serviceLink} ${activeIndex === 1 ? styles.selected : ""}`}>
            Embedded
            <br />
            UI Development
            <br />
            by LVGL
          </a>
          <a
            href="#project-maintenance-program"
            className={`${styles.serviceLink} ${activeIndex === 2 ? styles.selected : ""}`}>
            Project
            <br />
            Maintenance
            <br />
            Program
          </a>
          <a
            href="#official-partner-program"
            className={`${styles.serviceLink} ${activeIndex === 3 ? styles.selected : ""}`}>
            Official Partner
            <br />
            Program
          </a>
          <a href="#consultancy" className={`${styles.serviceLink} ${activeIndex === 4 ? styles.selected : ""}`}>
            Consultancy
          </a>
          <div className={styles.servicesAsideSelector} />
        </aside>

        <div className={styles.servicesContent}>
          <div
            id="embedded-ui-development-by-partners"
            className={`${styles.service} ${activeIndex === 0 ? styles.selected : ""}`}>
            <Heading as="h2" size="h3" className={styles.serviceTitle} href="#embedded-ui-development-by-partners">
              Embedded UI Development
              <br />
              <span style={{ color: "rgb(var(--color-green-600-rgb))" }}>by our Global Partner Network</span>
            </Heading>
            <div className={styles.serviceContent}>
              <RichText size="sm" type="html">
                <Text size="md">
                  Due to high demand, LVGL can only take on 8 to 10 projects per year. If we’re unavailable, our trusted
                  partners - we’ve worked with ourselves - offer top-notch UI development services. Recommended partners
                  meet our high standards.
                </Text>
                <Text size="xl" className={styles.serviceBenefitsHeading}>
                  <strong>Benefits:</strong>
                </Text>
                <ul>
                  <li>Access to a diverse pool of talented developers.</li>
                  <li>Flexibility to choose the partner that best fits your project needs.</li>
                  <li>High-quality solutions delivered by experienced professionals.</li>
                </ul>
              </RichText>
              <div className={styles.serviceActions}>
                <Button size="md" href="#contact">
                  Get in touch
                </Button>
              </div>
            </div>
            <div className={styles.servicePricing}>
              <Heading as="h4" size="h6" className={styles.servicePricingCaption}>
                Pricing
              </Heading>
              <Heading as="h3" size="h2">
                Custom
              </Heading>
              <Text size="2xs" color="secondary" className={styles.servicePricingNote}>
                <strong>Reach out</strong> to discuss your project and get connected with a suitable partner.
              </Text>
            </div>
          </div>

          <div
            id="embedded-ui-development-by-lvgl"
            className={`${styles.service} ${activeIndex === 1 ? styles.selected : ""}`}>
            <Heading as="h2" size="h3" className={styles.serviceTitle} href="#embedded-ui-development-by-lvgl">
              Embedded UI Development <span style={{ color: "rgb(var(--color-green-600-rgb))" }}>by LVGL</span>
            </Heading>
            <div className={styles.serviceContent}>
              <RichText size="sm" type="html">
                <Text size="md">
                  Let our in-house experts design and develop your user interfaces. Our team leverages deep knowledge of
                  LVGL to create.
                </Text>
                <Text size="xl" className={styles.serviceBenefitsHeading}>
                  <strong>Benefits:</strong>
                </Text>
                <ul>
                  <li>Custom UI designs</li>
                  <li>Interactive prototypes</li>
                  <li>Production-ready code</li>
                </ul>
              </RichText>
              <div className={styles.serviceActions}>
                <Button size="md" href="#contact">
                  Get in touch
                </Button>
              </div>
            </div>
            <div className={styles.servicePricing}>
              <Heading as="h4" size="h6" className={styles.servicePricingCaption}>
                Pricing
              </Heading>
              <Heading as="h3" size="h2">
                $150
              </Heading>
              <Text size="sm" color="secondary">
                per hour
              </Text>
            </div>
          </div>

          <div
            id="project-maintenance-program"
            className={`${styles.service} ${activeIndex === 2 ? styles.selected : ""}`}>
            <Heading as="h2" size="h3" className={styles.serviceTitle} href="#project-maintenance-program">
              Project Maintenance Program
            </Heading>
            <div className={styles.serviceContent}>
              <RichText size="sm" type="html">
                <Text size="md">
                  Ensure your HMI boards work smoothly with LVGL. We host ready-to-use projects and optimize performance
                  for your boards.
                </Text>
                <Text size="xl" className={styles.serviceBenefitsHeading}>
                  <strong>Benefits:</strong>
                </Text>
                <ul>
                  <li>
                    <strong>Hosting:</strong> Ready-to-use GitHub project hosted for each board
                  </li>
                  <li>
                    <strong>Maintenance:</strong> Repositories kept up to date
                  </li>
                  <li>
                    <strong>Support:</strong> GitHub issue support and vendor contact if needed
                  </li>
                  <li>
                    <strong>Documentation:</strong> Detailed README for easy setup
                  </li>
                  <li>
                    <strong>Video:</strong> Benchmark demo video recorded and shared
                  </li>
                  <li>
                    <strong>Marketing:</strong> Promotion through all LVGL channels
                  </li>
                </ul>
              </RichText>
              <div className={styles.serviceActions}>
                <Button size="md" href="#contact">
                  Get in touch
                </Button>
              </div>
            </div>
            <div className={styles.servicePricing}>
              <Heading as="h4" size="h6" className={styles.servicePricingCaption}>
                Cost
              </Heading>
              <Heading as="h3" size="h2">
                $5,000
              </Heading>
              <Text size="sm" color="secondary">
                per board, one-time fee.
              </Text>
              <Text size="2xs" color="secondary" className={styles.servicePricingNote}>
                <strong>Support:</strong> Vendor provides FAE connection for quick issue resolution.
              </Text>
            </div>
          </div>

          <div
            id="official-partner-program"
            className={`${styles.service} ${activeIndex === 3 ? styles.selected : ""}`}>
            <Heading as="h2" size="h3" className={styles.serviceTitle} href="#official-partner-program">
              Official Partner Program
            </Heading>
            <div className={styles.serviceContent}>
              <RichText size="sm" type="html">
                <Text size="md">
                  A comprehensive collaboration opportunity designed for chip vendors seeking a deep partnership with
                  LVGL. This program helps your users get started with LVGL easily and ensures they maximize the
                  potential of your chips.
                </Text>
                <Text size="xl" className={styles.serviceBenefitsHeading}>
                  <strong>Benefits:</strong>
                </Text>
                <ul>
                  <li>
                    <strong>Tech Support:</strong> Built-in support for your GPU and/or LCD peripherals.
                  </li>
                  <li>
                    <strong>Documentation:</strong> Detailed getting started guide for your SDK, IDE, and technology.
                  </li>
                  <li>
                    <strong>Co-Marketing:</strong> Sharing your news on LVGL’s marketing channels.
                  </li>
                  <li>
                    <strong>Workshops:</strong> Participation in your workshops.
                  </li>
                  <li>
                    <strong>Recognition:</strong> Your logo featured on LVGL’s website as an official partner.
                  </li>
                  <li>
                    <strong>Board Support:</strong> Hosting and supporting two development boards included.
                  </li>
                </ul>
              </RichText>
              <div className={styles.serviceActions}>
                <Button size="md" href="#contact">
                  Get in touch
                </Button>
              </div>
            </div>
            <div className={styles.servicePricing}>
              <Heading as="h4" size="h6" className={styles.servicePricingCaption}>
                Cost
              </Heading>
              <Heading as="h3" size="h2">
                $24,000
              </Heading>
              <Text size="sm" color="secondary">
                per year
                <br />
                or <strong>$2,000 per month</strong> for a twelve-month commitment.
              </Text>
              <Text size="2xs" color="secondary" className={styles.servicePricingNote}>
                <strong>Support:</strong> Vendor provides connection to FAE(s) to resolve technical issues quickly.
              </Text>
            </div>
          </div>

          <div id="consultancy" className={`${styles.service} ${activeIndex === 4 ? styles.selected : ""}`}>
            <Heading as="h2" size="h3" className={styles.serviceTitle} href="#consultancy">
              Consultancy
            </Heading>
            <div className={styles.serviceContent}>
              <RichText size="sm" type="html">
                <Text size="md">
                  Our consultancy services are perfect for projects needing expert guidance. Whether you’re starting a
                  new project or optimizing an existing one, we provide:
                </Text>
                <ul>
                  <li>Strategic advice on integrating and utilizing LVGL</li>
                  <li>Performance optimization and best practices</li>
                  <li>Troubleshooting and problem-solving for complex issues</li>
                </ul>
              </RichText>
              <div className={styles.serviceActions}>
                <Button size="md" href="#contact">
                  Get in touch
                </Button>
              </div>
            </div>
            <div className={styles.servicePricing}>
              <Heading as="h4" size="h6" className={styles.servicePricingCaption}>
                Pricing
              </Heading>
              <Heading as="h3" size="h2">
                $150
              </Heading>
              <Text size="sm" color="secondary">
                per hour
              </Text>
            </div>
          </div>
        </div>
      </Section>

      <Section id="why-LVGL" fillView={true} data-bg="primary" className={styles.whyLVGL}>
        <Heading as="h2" size="h2" color="primary" center={true} href="#why-LVGL">
          Why Work with LVGL?
        </Heading>
        <div className={styles.whyLVGLFeatures}>
          <div className={styles.whyLVGLFeature}>
            <Icon name="expertise" color="primary" />
            <Heading as="h3" size="h4">
              Expertise
            </Heading>
            <Text size="sm" color="secondary">
              As the creators of LVGL, we offer unparalleled knowledge and experience.
            </Text>
          </div>

          <div className={styles.whyLVGLFeature}>
            <Icon name="quality" color="primary" />
            <Heading as="h3" size="h4">
              Quality
            </Heading>
            <Text size="sm" color="secondary">
              We maintain high standards to ensure your projects are efficient and reliable.
            </Text>
          </div>

          <div className={styles.whyLVGLFeature}>
            <Icon name="flexibility" color="primary" />
            <Heading as="h3" size="h4">
              Flexibility
            </Heading>
            <Text size="sm" color="secondary">
              Our range of services caters to various needs, from ad-hoc support to comprehensive partnership.
            </Text>
          </div>

          <div className={styles.whyLVGLFeature}>
            <Icon name="globe" color="primary" />
            <Heading as="h3" size="h4">
              Global Reach
            </Heading>
            <Text size="sm" color="secondary">
              Our partner network expands our capabilities and ensures you get the best resources available worldwide.
            </Text>
          </div>
        </div>
        <Button size="lg" href="#contact" style={{ alignSelf: "center" }}>
          Get in touch
        </Button>
      </Section>
    </>
  );
}
