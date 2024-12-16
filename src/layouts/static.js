import { Heading, Section } from "@/components/common";
import styles from "./static.module.css";

const Static = ({ theme = "light", title, children }) => (
  <Section className={styles.wrapper} data-theme={theme}>
    <div className={styles.titleWrapper}>
      {title && (
        <Heading as="h1" size="h1" className={styles.title}>
          <span dangerouslySetInnerHTML={{ __html: title }}></span>
        </Heading>
      )}
    </div>
    <div className={styles.contentWrapper}>{children}</div>
  </Section>
);

export default Static;
