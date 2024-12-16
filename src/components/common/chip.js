import styles from "./chip.module.css";

const Chip = ({ children, className, ...props }) => {
  const classNames = `${styles.chip} ${className || ""}`.trim();
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export default Chip;
