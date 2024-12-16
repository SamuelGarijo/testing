import Spline from "@splinetool/react-spline";
import { Section, Heading, Text } from "@/components/common";

import styles from "./hero.module.css";

const SplineBg = ({ splineUrl }) => (
  <>
    <div className={styles.heroBg}>
      <Spline scene={splineUrl} />
    </div>
  </>
);

export default function Hero({
  className = "",
  title = "Title",
  blurb = "blurb",
  theme = "teal",
  splineUrl,
  ...props
}) {
  const classNames = `${styles.hero} ${className}`.trim();
  return (
    <Section fillView={true} className={classNames} theme={theme}>
      {splineUrl ? <SplineBg splineUrl={splineUrl} /> : null}
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Heading>{title}</Heading>
          <Text>{blurb}</Text>
        </div>
      </div>
    </Section>
  );
}
