import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heading, Section, Text, Icon } from "@/components/common";
import styles from "./case-study.module.css";

export const Hero = ({
  title,
  industry = "",
  clientName,
  clientUrl,
  clientLogo,
  className = "",
  logoClassName = "",
  children,
}) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <Section className={`${styles.hero} ${className}`.trim()} fillView={true}>
      <div className={styles.heroWrapper}>
        <div className={styles.titleWrapper}>
          {title && (
            <>
              <Heading as="h2" size="h4" className={styles.subtitle}>
                Powered by LVGL
              </Heading>
              <Heading as="h1" size="h1" className={styles.title}>
                <span dangerouslySetInnerHTML={{ __html: title }}></span>
              </Heading>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <Heading as="h3" size="h7">
                    Industry
                  </Heading>
                  <Heading as="h4" size="h4" className={styles.industry}>
                    {industry}
                  </Heading>
                </div>
                <div className={styles.metaItem}>
                  <Heading as="h3" size="h7">
                    Share this story:
                  </Heading>
                  <div className={styles.socialLinks}>
                    <Link
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Icon name="x" alt="Twitter" size={20} title="X" />
                    </Link>
                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Icon name="facebook" alt="Facebook" size={20} title="Facebook" />
                    </Link>
                    <Link
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Icon name="linkedin" alt="LinkedIn" size={20} title="LinkedIn" />
                    </Link>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <Heading as="h3" size="h7">
                    Client
                  </Heading>
                  <div className={`${styles.clientLogoWrapper} ${logoClassName}`.trim()}>
                    <Image src={clientLogo} alt={`${clientName} logo`} fill />
                  </div>
                  <Text size="xs">
                    <span dangerouslySetInnerHTML={{ __html: clientName }} />
                    <br />
                    <Link className="muted" href={"https://" + clientUrl}>
                      {clientUrl}
                    </Link>
                  </Text>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.heroImages}>{children}</div>
      </div>
    </Section>
  );
};

export const Block = ({ title, children }) => (
  <Section className={styles.block}>
    <div className={styles.blockWrapper}>
      {title && (
        <Heading as="h2" size="h2" className={styles.blockTitle}>
          {title}
        </Heading>
      )}
      {children}
    </div>
  </Section>
);

export const BlockActions = ({ children }) => <div className={styles.blockActions}>{children}</div>;

export const KeyResults = ({ children }) => <div className={styles.keyResults}>{children}</div>;

export const KeyResult = ({ title, description, children }) => (
  <div className={styles.keyResult}>
    <div className={styles.keyResultIcon}>
      <Icon name="quality" size={32} title="Check" />
    </div>
    <div className={styles.keyResultContent}>
      <Heading as="h3" size="h4">
        {title}
      </Heading>
      <Text size="md" color="tertiary">
        {description}
        {children}
      </Text>
    </div>
  </div>
);

export const Testimonial = ({
  className,
  theme = "teal",
  quote,
  name,
  company,
  jobTitle,
  email,
  avatarSrc,
  children,
  ...props
}) => {
  const testimonialStyles = `${styles.testimonial} ${className || ""}`.trim();
  return (
    <div className={testimonialStyles} data-theme={theme}>
      <div className={styles.quoteWrapper}>
        <p className={styles.quote} dangerouslySetInnerHTML={{ __html: quote }} />
        <div className={styles.clientWrapper}>
          {avatarSrc && (
            <div className={styles.avatar}>
              <Image src={avatarSrc} alt={name} width={64} height={64} />
            </div>
          )}
          <div className={styles.client}>
            <div className={styles.name}>
              {name}, {company}
            </div>
            <div className={styles.jobTitle}>{jobTitle}</div>
            {email && (
              <Link href={"mailto:" + email} className={styles.email}>
                {email}
              </Link>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export const SpecsTable = ({ children }) => <div className={styles.specsTable}>{children}</div>;
export const SpecsHeader = ({ children }) => (
  <header className={styles.specsHeader}>
    <div className={styles.specsHeaderSpacing}></div>
    <div className={styles.specsHeaderCells}>{children}</div>
  </header>
);
export const SpecsGroup = ({ title, children }) => (
  <div className={styles.specsGroup}>
    <div className={styles.specsGroupHeader}>{title}</div>
    <div className={styles.specsGroupItems}>{children}</div>
  </div>
);
export const SpecsItem = ({ label, children }) => (
  <div className={styles.specsItem}>
    <div className={styles.specsItemLabel}>{label}</div>
    <div className={styles.specsItemValues}>{children}</div>
  </div>
);

const CaseStudy = ({ children }) => <>{children}</>;

export default CaseStudy;
