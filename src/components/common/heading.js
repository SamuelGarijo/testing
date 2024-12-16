import styles from "./heading.module.css";

const Heading = ({
  as: Component = "h1",
  size = "h1",
  color = "base",
  children,
  href,
  center,
  className,
  ...props
}) => {
  // Adjust the headingStyles to exclude className
  const headingStyles = `${styles[size]} ${styles[`color-${color}`]} ${center ? styles.center : ""}`.trim();

  const content = (
    <Component className={headingStyles} {...props}>
      {children}
    </Component>
  );

  // Apply className to the anchor tag when href is present
  return href ? (
    <a href={href} className={`${styles.link} ${className || ""}`.trim()}>
      {content}
    </a>
  ) : (
    // Apply className to the Component when href is not present
    <Component className={`${headingStyles} ${className || ""}`.trim()} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
