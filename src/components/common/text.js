import styles from "./text.module.css";

const Text = ({ as: Component = "p", className, size = "lg", color = "inherit", children, ...props }) => {
  let classNames = `${styles.text} ${styles[size]} ${styles[color]} ${className || ""}`.trim();

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};

export default Text;
