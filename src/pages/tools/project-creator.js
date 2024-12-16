import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";

import { detectOS } from "@/utils/detectOS";

import { Section, Meta, Faq, FaqItem, Button, Heading, RichText, Text, Icon } from "@/components/common";
import {} from "@/components/common";
import styles from "./project-creator.module.css";

import changelogData from "@/data/project-creator-changelog";

const CURRENT_VERSION = changelogData[0].version;

const ProjectCreator = () => {
  const [os, setOS] = useState("Windows");
  const featureRef = useRef([]);

  useEffect(() => {
    setOS(detectOS());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    });

    featureRef.current.forEach((feature) => observer.observe(feature));
    return () => observer.disconnect();
  }, []);

  const partnerClassName = `${styles.partner} reveal`;

  const DownloadButtonWithDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useState(() => {
      setOS(detectOS());
    }, []);

    const getDownloadLink = (os) => {
      switch (os) {
        case "MacOS Intel":
          return {
            label: "Download for macOS Intel",
            url: `https://github.com/lvgl/lvgl-project-creator/releases/download/v${CURRENT_VERSION}/project-creator-macos-x64.zip`,
          };
        case "MacOS Silicon":
          return {
            label: "Download for macOS Silicon",
            url: `https://github.com/lvgl/lvgl-project-creator/releases/download/v${CURRENT_VERSION}/project-creator-macos-arm64.zip`,
          };
        case "Linux":
          return {
            label: "Download for Linux",
            url: `https://github.com/lvgl/lvgl-project-creator/releases/download/v${CURRENT_VERSION}/project-creator-linux.zip`,
          };
        default:
          return {
            label: "Download for Windows",
            url: `https://github.com/lvgl/lvgl-project-creator/releases/download/v${CURRENT_VERSION}/project-creator-windows.zip`,
          };
      }
    };

    const handleDropdownToggle = (e) => {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    };

    return (
      <div className={styles.downloadButtonWrapper}>
        <Button
          id="download-button-os"
          href={getDownloadLink(os).url}
          className={styles.downloadButton}
          variant="primary">
          {getDownloadLink(os).label}
        </Button>
        <Button className={styles.dropdownButton} variant="primary" onClick={handleDropdownToggle}>
          <Icon name="select" size={16} title="Arrow" fill="none" />
        </Button>
        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            <Link
              id="project-creator-download-windows"
              className={styles.dropdownMenuItem}
              href={getDownloadLink("Windows").url}
              data-gtm-download={getDownloadLink("Windows").label}>
              {getDownloadLink("Windows").label}
            </Link>
            <Link
              id="project-creator-download-linux"
              className={styles.dropdownMenuItem}
              href={getDownloadLink("Linux").url}
              data-gtm-download={getDownloadLink("Windows").label}>
              {getDownloadLink("Linux").label}
            </Link>
            <Link
              id="project-creator-download-macos-intel"
              className={styles.dropdownMenuItem}
              href={getDownloadLink("MacOS Intel").url}
              data-gtm-download={getDownloadLink("Windows").label}>
              {getDownloadLink("MacOS Intel").label}
            </Link>
            <Link
              id="project-creator-download-macos-silicon"
              className={styles.dropdownMenuItem}
              href={getDownloadLink("MacOS Silicon").url}
              data-gtm-download={getDownloadLink("Windows").label}>
              {getDownloadLink("MacOS Silicon").label}
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Meta title="LVGL — Download Project Creator" image="https://lvgl.io/images/opengraph/project-creator.png" />

      <Section className={styles.hero} fillView={true} data-theme="purple">
        <div className={styles.heroWrapper}>
          <div className={styles.heroTitleWrapper}>
            <Image
              src="/images/tools/project-creator/app-icon.png"
              alt="Project Creator icon"
              width="96"
              height="96"
              className={styles.appIcon}
            />
            <Heading className={styles.heroTitle} as="h1" size="h1">
              <span className={styles.heroTitleGrad}>Kickstart</span> your LVGL
              <br />
              projects with ease
            </Heading>
            <Text className={styles.heroLead} color="primary" size="lg">
              Accelerate your LVGL development with our new Project Creator. Select, configure, and launch your projects
              in just a few clicks. It works on Windows, Linux, Mac and in VSCode too. More projects are coming soon! 🚀
            </Text>
          </div>
          <div className={styles.heroActions}>
            <div className={styles.heroPrimaryActions}>
              <DownloadButtonWithDropdown os={os} />
              <Button
                id="project-creator-install-vscode"
                className={styles.vscodeExtension}
                variant="secondary"
                size="sm"
                href="https://marketplace.visualstudio.com/items?itemName=LVGL.lvgl-project-creator-vscode">
                <Icon name="vscode" size={24} title="VSCode icon" fill="none" />
                <span>VSCode Extension</span>
              </Button>
            </div>
            <Text className={styles.heroActionsInfo} size="sm">
              <span>Version {CURRENT_VERSION}</span>
              <span className={styles.actionsSeparator}> — </span>
              <Link href="#changelog" className="muted">
                Changelog
              </Link>
            </Text>
            <div className={styles.heroSecondaryActions}></div>
          </div>
          <div className={styles.appScreenshots}>
            <Image
              src={`/images/tools/project-creator/start-screen-${CURRENT_VERSION}.png`}
              alt={`Project Creator ${CURRENT_VERSION} start screen screenshot`}
              width="960"
              height="640"
              className={styles.appScreenshot}
              unoptimized
            />
            <Image
              src={`/images/tools/project-creator/overlay-${CURRENT_VERSION}.png`}
              alt={`Project Creator ${CURRENT_VERSION} project details overlay screenshot`}
              width="672"
              height="459"
              className={styles.appOverlayScreenshot}
              unoptimized
            />
          </div>
        </div>
      </Section>

      <Section id="features" className={styles.features}>
        <Heading as="h2" size="h2" href="#features">
          Features
        </Heading>
        <div className={styles.featuresItems}>
          <div
            ref={(el) => (featureRef.current[0] = el)}
            style={{ "--i": 0 }}
            className={`${styles.featuresItem} reveal`}>
            <Icon name="quality" color="primary" />
            <Heading as="h3" size="h4">
              Just works
            </Heading>
            <Text size="sm" color="secondary">
              Works on any OS, and in VSCode without git or any other extra tools.
            </Text>
          </div>

          <div
            ref={(el) => (featureRef.current[1] = el)}
            style={{ "--i": 1 }}
            className={`${styles.featuresItem} reveal`}>
            <Icon name="rocket" color="primary" />
            <Heading as="h3" size="h4">
              Faster than git clone
            </Heading>
            <Text size="sm" color="secondary">
              Pre-packaged with LVGL, it saves you time by skipping repetitive downloads.
            </Text>
          </div>

          <div
            ref={(el) => (featureRef.current[2] = el)}
            style={{ "--i": 2 }}
            className={`${styles.featuresItem} reveal`}>
            <Icon name="project-creator" color="primary" />
            <Heading as="h3" size="h4">
              Tailor to your needs
            </Heading>
            <Text size="sm" color="secondary">
              Customize your project’s initial setup through an intuitive and user-friendly interface.
            </Text>
          </div>
        </div>
      </Section>
      <Section>
        <Faq className={styles.faq}>
          <FaqItem question="Will you add more projects?" opened={true}>
            <p>
              Yes, we have started working on adding the LVGL projects from the major chip vendors’ SDKs and RTOS
              projects. Stay tuned, hundreds of projects will be available soon.
            </p>
          </FaqItem>
          <FaqItem question="Can I submit my own LVGL project?">
            <p>
              You can’t at this moment. We added projects for which we know that they will be maintained either by us or
              by a mature project or vendor. However if you would like to see a specific board or project,{" "}
              <Link href="#contact">contact us</Link>, and we will also contact the related manufacturer or maintainer.{" "}
            </p>
          </FaqItem>
          <FaqItem question="How can I give feedback and ask for help?">
            <p>
              Please use the{" "}
              <Link href="https://forum.lvgl.io/c/project-creator" className="muted">
                Project Creator
              </Link>{" "}
              category on our Forum.
            </p>
          </FaqItem>
          <FaqItem question="Is this tool open source?">
            <p>Not yet, but we are considering making it open source in the near future.</p>
          </FaqItem>
        </Faq>
      </Section>
      <Section id="changelog" fillView={true} className={styles.changelog}>
        <Heading as="h2" size="h2">
          Changelog
        </Heading>
        {changelogData.map((item, index) => (
          <div key={index} className={styles.changelogItem}>
            <div className={styles.changelogItemDateWrapper}>
              <Text className={styles.changelogItemDate} size="md" color="quarternary">
                {item.date}
              </Text>
            </div>
            <div className={styles.changelogItemContent}>
              <Heading as="h3" size="h4" className={styles.changelogItemVersion}>
                Version {item.version}
              </Heading>
              <Heading as="h4" size="h3">
                {item.title}
              </Heading>
              <RichText size="md" type="markdown">
                {item.content}
              </RichText>
            </div>
          </div>
        ))}
      </Section>
    </>
  );
};

export default ProjectCreator;
