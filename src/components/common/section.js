import styles from "./section.module.css";

const Section = ({
  children,
  className = "",
  fillView = false,
  paddingBottom = false,
  wrapperSize = "lg",
  layout,
  theme,
  ...props
}) => {
  const sectionClassNames = `${styles.section} ${className} ${fillView ? styles.fillView : ""} ${
    paddingBottom ? styles.paddingBottom : ""
  } ${layout && !fillView ? styles[layout] : ""}`.trim();

  return (
    <section className={sectionClassNames} {...(theme ? { "data-theme": theme } : {})} {...props}>
      {fillView ? (
        <div className={`${styles.wrapper} ${styles["wrapper-" + wrapperSize]} ${layout ? styles[layout] : ""}`.trim()}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export const SectionHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.header} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const SectionContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.content} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Section;
