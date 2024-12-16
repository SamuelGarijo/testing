import styles from "./feature-block.module.css";

export const FeatureBlockContent = ({ children, bgColor = "primary", ...props }) => {
  const classNames = `${styles.featureContentWrapper} ${styles[bgColor]}`.trim();
  return (
    <div className={classNames} {...props}>
      <div className={styles.featureContent}>{children}</div>
    </div>
  );
};

export const FeatureBlockVisual = ({ children, className = "", bgColor = "primary", ...props }) => {
  const classNames = `${styles.featureVisual} ${styles[bgColor]} ${className}`.trim();
  return (
    <div className={classNames} {...props}>
      <div className={styles.featureVisualWrapper}>{children}</div>
    </div>
  );
};

export default function FeatureBlock({ className = "", theme, children, ...props }) {
  const sectionClassNames = `fill-view ${styles.wrapper} ${className}`.trim();
  return (
    <section className={sectionClassNames} {...(theme ? { "data-theme": theme } : {})} {...props}>
      {children}
    </section>
  );
}
